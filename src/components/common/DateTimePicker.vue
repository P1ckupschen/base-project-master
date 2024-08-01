<template>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker
        v-model="transferValue"
        type="datetime"
        placeholder="选择日期"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </div>
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
const transferValue = computed({
  get() {
    return props.modelValue || null
  },
  set(v) {
    emits('update:modelValue', v)
  }
})
</script>
<style scoped></style>
