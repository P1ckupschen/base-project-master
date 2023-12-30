import fs from 'fs'
// 解决 出现new dependency reload 错误
const optimizeDepsElementPlusIncludes = ['element-plus/es']
fs.readdirSync('node_modules/element-plus/es/components').map((dirname) => {
  fs.access(
    `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
    (err) => {
      if (!err) {
        optimizeDepsElementPlusIncludes.push(
          `element-plus/es/components/${dirname}/style/css`
        )
      }
    }
  )
})
export default optimizeDepsElementPlusIncludes
