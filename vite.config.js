import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import useVitePlugins from './vite-plugins'
import ElementPlus from 'unplugin-element-plus/vite'
import optimizeDepsElementPlusIncludes from './optimize/optimizeDepsElementPlusIncludes'
// // https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    useVitePlugins(),
    ElementPlus({
      useSource: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  optimizeDeps: {
    include: optimizeDepsElementPlusIncludes
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/element/index.scss" as *;`
      }
    }
  },
  // 开发环境代理配置，请更换target为后端服务器地址
  server: {
    host: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/dev-api': {
        target: 'http://192.168.0.220:7101',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/dev-api/, '')
      }
    }
  },
  build: {
    // 当生产环境浏览器版本较低时，请改为es2015
    target: 'modules'
  }
})
