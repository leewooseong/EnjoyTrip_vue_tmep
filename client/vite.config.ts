import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/users': {
        target: 'http://localhost:8080/users',
        rewrite: (path) => path.replace(/^\/users/, '')
      },
      '/board': {
        target: 'http://localhost:8080/board',
        rewrite: (path) => path.replace(/^\/board/, '')
      }
    }
  }
})
