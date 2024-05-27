<template>
  <el-tree
    ref="treeRef"
    style="max-width: 600px"
    :data="data"
    show-checkbox
    default-expand-all
    node-key="perms"
    highlight-current
    :props="defaultProps"
    @check-change="handleChange"
  />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElTree } from 'element-plus'
import { getAllPermsAndMenus } from '@/api/system/role.js'

const treeRef = ref()

const props = defineProps({
  modelValue: {
    type: Array
  }
})
const emits = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue || []
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
const getCheckedKeys = () => {
  let data = []
  data = treeRef.value.getCheckedKeys(false)
  data.concat(treeRef.value.getHalfCheckedKeys(false))
  value.value = data
}
const setCheckedKeys = val => {
  treeRef.value.setCheckedKeys(val, false)
}

const defaultProps = {
  children: 'children',
  label: 'name'
}

const getAllMenuNodes = () => {
  getAllPermsAndMenus().then(res => {
    if (res.data.code === 200) {
      data.value = res.data.data
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}
const handleChange = val => {
  console.log(val)
  getCheckedKeys()
}
onMounted(() => {
  getAllMenuNodes()
})

defineExpose({ setCheckedKeys })
const data = ref()
</script>
