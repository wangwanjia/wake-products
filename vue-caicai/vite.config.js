import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server:{
    port:3000,
    proxy:{
        '/api':{
          target:'http://localhost:4000',
          secure:false,
          changeOrigin:true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/uploads':{
          target:'http://localhost:4000',
          secure:false,
          changeOrigin:true,
          rewrite: (path) => path.replace(/^\/uploads/, ''),
        }
    }
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
  build: {
    rollupOptions: {
      output: {
        // 设置文件名格式，使用哈希值代替原文件名
        entryFileNames: 'assets/[hash].js',
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]'
      }
    }
  }
})
