import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIVE_AGENT_RECIPIENT = 'silas@brandgoto.com'

type LocalLeadPayload = {
  name?: string
  email?: string
  phone?: string
  company?: string
  message?: string
  interest?: string
  source?: string
  requestType?: string
}

const localLeadFunction = (env: Record<string, string>): Plugin => ({
  name: 'brandgoto-local-lead-function',
  configureServer(server) {
    server.middlewares.use('/.netlify/functions/lead', async (request, response) => {
      response.setHeader('Content-Type', 'application/json')
      response.setHeader('Cache-Control', 'no-store')

      if (request.method === 'OPTIONS') {
        response.statusCode = 204
        response.end()
        return
      }

      if (request.method !== 'POST') {
        response.statusCode = 405
        response.end(JSON.stringify({ error: 'Method not allowed' }))
        return
      }

      try {
        let rawBody = ''
        for await (const chunk of request) {
          rawBody += chunk.toString()
          if (rawBody.length > 20 * 1024) throw new Error('Request body too large')
        }

        const payload = JSON.parse(rawBody || '{}') as LocalLeadPayload
        const name = payload.name?.trim().slice(0, 200) || ''
        const email = payload.email?.trim().slice(0, 320) || ''
        const company = payload.company?.trim().slice(0, 200) || ''
        const message = (payload.message || payload.interest || '').trim().slice(0, 4000)

        if (!EMAIL_PATTERN.test(email) || !name || !message) {
          response.statusCode = 400
          response.end(JSON.stringify({ error: 'Name, valid email, and message are required' }))
          return
        }

        const resendApiKey = env.RESEND_API_KEY
        const fromEmail = env.LIVE_AGENT_FROM_EMAIL
        if (!resendApiKey || !fromEmail) {
          response.statusCode = 503
          response.end(JSON.stringify({ error: 'Local email delivery is not configured' }))
          return
        }

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [LIVE_AGENT_RECIPIENT],
            reply_to: email,
            subject: `BrandGoto ${payload.requestType === 'live_agent_ticket' ? 'live-agent request' : 'website lead'} from ${name}`,
            text: [
              'A visitor submitted a request through the BrandGoto website.',
              '',
              `Name: ${name}`,
              `Email: ${email}`,
              `Company: ${company || 'Not provided'}`,
              `Phone: ${payload.phone || 'Not provided'}`,
              `Source: ${payload.source || 'BrandGoto Website'}`,
              '',
              'Message:',
              message,
            ].join('\n'),
          }),
        })

        if (!emailResponse.ok) {
          console.error('Local Resend delivery failed with status:', emailResponse.status)
          response.statusCode = 502
          response.end(JSON.stringify({ error: 'Email provider rejected the request' }))
          return
        }

        response.statusCode = 200
        response.end(JSON.stringify({ ok: true, deliveryChannel: 'email' }))
      } catch (error) {
        console.error('Local lead delivery failed:', error instanceof Error ? error.message : 'Unknown error')
        response.statusCode = 500
        response.end(JSON.stringify({ error: 'Local lead delivery failed' }))
      }
    })
  },
})

// Plugin to filter out source map errors from node_modules
const filterSourceMapErrors = () => {
  return {
    name: 'filter-sourcemap-errors',
    enforce: 'pre' as const,
    configureServer() {
      // Intercept and filter source map errors
      const originalError = console.error
      console.error = (...args: unknown[]) => {
        const message = args.join(' ')
        // Filter out source map errors from node_modules
        if (message.includes('source map') && message.includes('node_modules')) {
          return // Suppress the error
        }
        originalError.apply(console, args)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [
      react(),
      filterSourceMapErrors(),
      localLeadFunction(env),
    ],
    build: {
      sourcemap: false,
      minify: 'esbuild', // Use esbuild for faster minification
      cssCodeSplit: true, // Split CSS into separate chunks
      rollupOptions: {
        treeshake: {
          moduleSideEffects: false,
        },
        output: {
          sourcemapIgnoreList: (sourcePath) => {
            // Ignore source maps from node_modules to prevent errors
            return sourcePath.includes('node_modules')
          },
        },
        onwarn(warning, warn) {
          // Suppress source map warnings from node_modules
          if (warning.message && warning.message.includes('source map')) {
            return
          }
          warn(warning)
        },
      },
      // Optimize asset handling
      assetsInlineLimit: 4096, // Inline small assets as base64
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    },
  }
})
