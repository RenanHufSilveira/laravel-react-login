import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],

  server: {
    // Proxy: requisições do frontend para /api, /sanctum são redirecionadas
    // para o Laravel. Do ponto de vista do browser, tudo é localhost:5173,
    // então não há cross-origin e o cookie XSRF-TOKEN funciona corretamente.
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/sanctum': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
