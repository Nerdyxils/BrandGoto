import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-qr',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'qr.html'),
      },
    },
  },
  base: '/', // This will be overridden by the subdomain
}) 