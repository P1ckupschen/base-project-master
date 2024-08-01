<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="props.title" :key="new Date().getTime()">
      <el-form :model="temp" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="temp.name" size="large"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="title === '修改' ? updateCommit() : createCommit()">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { updateTeachCate, createTeachCate, getDetailById } from '@/api/system/teachCate.js'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const props = defineProps(['title'])
const dialogVisible = ref(false)
const initialState = {
  id: null,
  name: ''
}
const temp = reactive({ ...initialState })

function resetTemp() {
  Object.assign(temp, initialState)
}

const getDetail = id => {
  getDetailById(id).then(res => {
    if (res.data.code === 200) {
      console.log(res.data.data)
      Object.assign(temp, res.data.data)
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}

const open = id => {
  if (id !== '' && id !== 0) {
    getDetail(id)
  } else {
    resetTemp()
  }
  dialogVisible.value = true
}

const emits = defineEmits(['getTableList'])
const updateCommit = () => {
  updateTeachCate(temp).then(res => {
    if (res.data.code === 200) {
      ElMessage.success('操作成功')
      emits('getTableList')
      dialogVisible.value = false
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}
const createCommit = () => {
  createTeachCate(temp).then(res => {
    if (res.data.code === 200) {
      ElMessage.success('操作成功')
      emits('getTableList')
      dialogVisible.value = false
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}
defineExpose({ open })
// const checkAll = ref(false)
// const isIndeterminate = ref(true)
</script>

<style lang="scss" scoped></style>
