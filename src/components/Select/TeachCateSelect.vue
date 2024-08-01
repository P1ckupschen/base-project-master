<template>
  <div class="flex flex-wrap gap-4 items-center">
    <el-select
      v-model="value"
      clearable
      placeholder="选择类别"
      style="width: 240px"
      :disabled="props.disabled"
    >
      <el-option v-for="item in cateOptions" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { fetchSelectList } from '@/api/system/teachCate.js'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue || null
  },
  set(v) {
    emits('update:modelValue', v)
  }
})
const getSelectList = () => {
  fetchSelectList().then(res => {
    if (res.data.code === 200) {
      cateOptions.value = res.data.data
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}
onMounted(() => {
  getSelectList()
})
const cateOptions = ref([])
</script>
