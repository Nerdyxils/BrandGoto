import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin to filter out source map errors from node_modules
const filterSourceMapErrors = () => {
  return {
    name: 'filter-sourcemap-errors',
    enforce: 'pre' as const,
    configureServer(_server: unknown) {
      // Intercept and filter source map errors
      const originalError = console.error
      console.error = (...args: any[]) => {
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
export default defineConfig({
  plugins: [
    react(),
    filterSourceMapErrors(),
  ],
  build: {
    sourcemap: true, // Enable source maps for production debugging
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
    chunkSizeWarningLimit: 1000,
    // Optimize asset handling
    assetsInlineLimit: 4096, // Inline small assets as base64
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})



