import { resolve } from 'node:path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import process from 'node:process'
const useSvgIconsPlugin = () => {
  return createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), 'src/assets/svg-icons')],
    symbolId: 'icon-[dir]-[name]'
  })
}

export default useSvgIconsPlugin
