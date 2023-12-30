import { setToken } from '@/utils/cookie'
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
const useUserStore = defineStore('user', () => {
  const state = reactive({
    username: ''
  })

  const login = (form) => {
    return new Promise(resolve => {
      // 这里应该调后台接口
      console.log('TODO待使用后端接口', form)
      setToken('TOKEN:test20230814151453')
      resolve()
    })
  }

  return {
    ...toRefs(state),
    login
  }
})

export default useUserStore
