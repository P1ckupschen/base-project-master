<template>
  <div>
    <el-switch
      v-model="value"
      class="ml-2"
      :active-value="1"
      :inactive-value="0"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: Number,
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
</script>

<style lang="scss" scoped></style>
