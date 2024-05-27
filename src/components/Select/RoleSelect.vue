<template>
  <div class="flex flex-wrap gap-4 items-center">
    <el-select v-model="value" multiple placeholder="选择角色" size="large" style="width: 240px">
      <el-option
        v-for="item in roleOptions"
        :key="item.roleId"
        :label="item.roleName"
        :value="item.roleId"
      />
    </el-select>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { fetchRoleSelectList } from '@/api/system/role.js'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
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
  fetchRoleSelectList().then(res => {
    if (res.data.code === 200) {
      roleOptions.value = res.data.data
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}
onMounted(() => {
  getSelectList()
})
const roleOptions = ref([])
</script>
