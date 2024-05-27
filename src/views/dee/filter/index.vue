<template>
  <div class="search-container">
    <el-form ref="searchRef" :model="queryComputed" :inline="true">
      <el-form-item>
        <el-input v-model="queryComputed.name" placeholder="输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import { computed } from 'vue'

const props = defineProps({
  listQuery: {
    type: Object,
    default() {
      return {}
    }
  },
  search: {
    type: Function,
    default: () => {}
  }
})
const emits = defineEmits(['update:listQuery'])

const queryComputed = computed({
  get() {
    return props.listQuery || {}
  },
  set(v) {
    emits('update:listQuery', v)
  }
})
// onMounted(() => {
//   getCategoryList()
//   getSizhenList()
//   list.value = states.map(item => {
//     return { value: `value:${item}`, label: `label:${item}` }
//   })
// })
</script>

<style lang="scss" scoped>
.search-container {
  padding: 20px 30px 0;
  background-color: #fff;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
