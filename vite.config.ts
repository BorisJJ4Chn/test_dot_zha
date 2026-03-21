import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        page1: resolve(__dirname, 'games/page1/index.html'),
        page2: resolve(__dirname, 'games/page2/index.html'),
        page3: resolve(__dirname, 'games/page3/index.html'),
      },

      output: {
        // 入口 JS 自动放到 games/[页面名]/assets/
        entryFileNames: (chunk) => {
          if (chunk.name === 'main') {
            return 'assets/[name]-[hash].js'
          }
          return `games/${chunk.name}/assets/[name]-[hash].js`
        },

        // CSS / 图片等资源
        assetFileNames: (asset) => {
          const name = asset.name || ''
          if (name.includes('games/')) {
            return name
          }
          return 'assets/[name]-[hash][extname]'
        },

        // 公共 chunk 放在根目录 assets（不会破坏路径）
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    }
  },
  server: {
    open: true
  }
})
