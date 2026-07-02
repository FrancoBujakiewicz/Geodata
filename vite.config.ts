import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  root: 'frontend/src',
  plugins: [
    viteSingleFile(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mi Aplicación PWA',
        short_name: 'MiApp',
        description: 'Una app empaquetada en un solo archivo',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png', // Asegúrate de tener este icono en tu carpeta public/
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
