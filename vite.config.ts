import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin to filter out source map errors from node_modules
const filterSourceMapErrors = () => {
  return {
    name: 'filter-sourcemap-errors',
    enforce: 'pre' as const,
    configureServer(server) {
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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // More aggressive code splitting to reduce bundle size
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('swiper')) {
              return 'swiper';
            }
            if (id.includes('lucide-react')) {
              return 'lucide-icons';
            }
            // Split other large vendor chunks
            return 'vendor';
          }
        },
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
    // Tree shake unused exports
    treeshake: {
      moduleSideEffects: false,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})



