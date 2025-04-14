import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['337e-103-150-68-194.ngrok-free.app'],
    // hmr: {
    //   protocol: 'wss',
    //   host: '337e-103-150-68-194.ngrok-free.app',
    //   clientPort: 443,
    // }
  }
})
