import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server:{
    port:3000,
    // proxy:{
    //   '/api':{
    //     target:'http://localhost:8000',
    //     secure:false,
    //     rewrite:(path)=>path.replace(/^\/api/,'')
    //   }
    // }
  },
  plugins: [
    tailwindcss(),
    vue()
  ],
   resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
