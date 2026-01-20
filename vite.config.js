import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jsx}'] // Added jsx to patterns
      },
      manifest: {
        name: 'SUDHAR JA',
        short_name: 'SudharJa',
        description: 'Forge Your Will.',
        theme_color: '#050505',
        background_color: '#050505',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
    
// vite.config.js
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'IRON DISCIPLINE',
    short_name: 'IronWill',
    display: 'standalone', // Yahi hai jo browser bar hataega
    orientation: 'portrait',
    background_color: '#000000',
    theme_color: '#cc0000',
    // ... baki icons wala part jo tune pehle dala tha
  }
})
