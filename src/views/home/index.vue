<template>
  <div>
    Home
    <div></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getUserInfo } from '@/api/auth/user'

const getUserInfoApi = () => {
  getUserInfo().then(res => {
    console.log(res)
  })
}
onMounted(() => {
  getUserInfoApi()
})
</script>
