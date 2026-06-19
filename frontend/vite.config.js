import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/tasks': 'http://backend:5000',
      '/auth': 'http://backend:5000'
    }
  }
})
