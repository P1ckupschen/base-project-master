import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const useAutoImport = () => {
  return AutoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    resolvers: [
      ElementPlusResolver()
      // {
      //   importStyle: 'sass'
      // }
    ],
    eslintrc: {
      enabled: true
    }
  })
}

export default useAutoImport
