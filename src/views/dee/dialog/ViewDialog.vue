<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="props.title" :key="new Date().getTime()">
      <el-form ref="coeRef" :model="temp" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <span>{{ temp.name }}</span>
        </el-form-item>
        <el-form-item label="工号" prop="code">
          <span>{{ temp.code }}</span>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <span>{{ temp.username }}</span>
        </el-form-item>
        <el-form-item label="角色分配" prop="roleIds">
          <RoleSelect v-model="temp.roleIds" :disabled="disabled"></RoleSelect>
        </el-form-item>
        <el-form-item label="备注">
          <span>{{ temp.remark }}</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span>{{ temp.createTime }}</span>
        </el-form-item>
        <el-form-item label="更新时间">
          <span>{{ temp.updateTime }}</span>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getDetailById } from '@/api/system/account.js'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import RoleSelect from '@/components/Select/RoleSelect.vue'
const props = defineProps(['title'])
const disabled = true
const dialogVisible = ref(false)
const initialState = {
  id: null,
  name: '',
  username: '',
  createTime: '',
  updateTime: '',
  roleIds: [],
  status: null,
  code: '',
  sex: null,
  remark: ''
}
const temp = reactive({ ...initialState })
const coeRef = ref()
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

defineExpose({ open })
// const checkAll = ref(false)
// const isIndeterminate = ref(true)
</script>

<style lang="scss" scoped></style>
