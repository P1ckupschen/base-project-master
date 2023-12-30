<template>
  <el-config-provider :size="size" :locale="zhCn">
    <RouterView></RouterView>
  </el-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import useAppStore from './stores/modules/app'
import { computed } from 'vue'
defineOptions({ name: 'App' })
const appStore = useAppStore()
const size = computed(() => appStore.size)
</script>
<style></style>
