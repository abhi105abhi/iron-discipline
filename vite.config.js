import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'] // Fixes the glob warning
      },
      manifest: {
        name: 'Sudhar Ja - Iron Discipline',
        short_name: 'SudharJa',
        description: 'Forge Your Will.',
        theme_color: '#050505',
        background_color: '#050505',
        display: 'standalone'
      }
    })
  ]
});
