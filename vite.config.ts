import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true 
      },
      manifest: {
        name: "Sports News Application",
        short_name: "Sportsnews",
        icons: [
          {
            "src": "/Processing_3_logo.png",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          },
          {
            "src": "/Processing_3_logo.png",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/Processing_3_logo.png",
            "type": "image/png",
            "sizes": "32x32"
          },
          {
            "src": "/Processing_3_logo.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/Processing_3_logo.png",
            "type": "image/png",
            "sizes": "512x512",
            "purpose": "any maskable" // Icon format that ensures that your PWA icon looks great on all Android devices
          }
        ],
        theme_color: '#AAF',
      },
    }),
  ],
})
