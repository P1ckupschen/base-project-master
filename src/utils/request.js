import axios from 'axios'
import { getToken } from './cookie'
// import errorCode from '../config/error-code'
// import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'
import { whatDevTech } from './prod'
import router from '../router'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.headers['Content-Type'] = 'multipart/form-data'

// 创建axios实例
const request = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分 whatDevTech判断php还是java
  baseURL: import.meta.env.VITE_APP_BASE_API + whatDevTech(),
  // 超时
  timeout: 20000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    if (getToken()) {
      // config.headers['sys-token'] = 'Bearer ' + getToken()
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  res => {
    // 如果返回二进制数据，则不做处理
    const responseTypes = ['blob', 'arraybuffer']
    if (responseTypes.includes(res.request.responseType)) return res.data

    // const code = res.data.code || 200
    // const msg = res.data.message || errorCode[code] || errorCode['default']

    // if (code !== 200) {
    //   ElMessage.error(msg)
    //   return Promise.reject(new Error(msg))
    // }

    // return res.data
    console.log(res)
    if (res.data.code === 302 || res.data.code === 300) {
      // Storage.localRemove('ADMIN_TOKEN') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
      // Cookies.remove('ADMIN_TOKEN')
      Cookies.remove('sys-token')
      router.push({ path: '/login' })
      // res.replace({
      //   path: '/login' // 到登录页重新获取token
      // })
    }
    return res
  },
  err => Promise.reject(err)
)

export const http = request
export default request
export const getHeaders = () => {
  const token = getToken()
  return {
    Authorization: 'Bearer ' + token
    // 'sys-token': 'Bearer ' + token
  }
}
