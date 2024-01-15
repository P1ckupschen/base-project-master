import { setToken } from '@/utils/cookie'
import { defineStore } from 'pinia'
import { Login } from '@/api/auth/user.js'
import { reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
const useUserStore = defineStore('user', () => {
  const state = reactive({
    username: ''
  })

  const login = (form) => {
    return new Promise(resolve => {
      // 这里应该调后台接口
      Login(form).then((res) => {
        if (res.data.code === 200) {
          setToken(res.data.data)
          resolve(res.data.msg)
        } else {
          ElMessage({
            type: 'error',
            message: '账号或密码错误'
          })
        }
      })
    })
  }

  return {
    ...toRefs(state),
    login
  }
})

export default useUserStore
