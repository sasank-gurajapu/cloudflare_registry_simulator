import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cloudflare_registry_simulator/',
  server: {
    port: 5173,
    host: true
  }
})
