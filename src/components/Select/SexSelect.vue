<template>
  <div class="flex flex-wrap gap-4 items-center">
    <el-select
      v-model="value"
      placeholder="选择性别"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in sexOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: null
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

const sexOptions = [
  {
    value: '男',
    label: '男'
  },
  {
    value: '女',
    label: '女'
  }
]
</script>
