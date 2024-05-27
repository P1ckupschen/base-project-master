<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="props.title" :key="new Date().getTime()">
      <el-form :model="temp" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="temp.name" size="large"></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别">
          <SexSelect v-model="temp.sex"></SexSelect>
        </el-form-item> -->
        <el-form-item label="状态" v-if="props.title === '修改'">
          <StatusSwitch v-model="temp.status"></StatusSwitch>
        </el-form-item>
        <el-form-item label="账号" v-if="props.title === '新建'">
          <el-input v-model="temp.username"></el-input>
        </el-form-item>
        <el-form-item label="账号" v-if="props.title === '修改'">
          <span>{{ temp.username }}</span>
        </el-form-item>
        <el-form-item label="角色分配">
          <RoleSelect v-model="temp.roleIds"></RoleSelect>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item lable="创建时间" v-if="props.title === '修改'">
          <span>{{ temp.createTime }}</span>
        </el-form-item>
        <el-form-item lable="更新时间" v-if="props.title === '修改'">
          <span>{{ temp.updateTime }}</span>
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
import { updateAccount, createAccount, getDetailById } from '@/api/system/account.js'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import StatusSwitch from '@/components/switch/StatusSwitch.vue'
import RoleSelect from '@/components/Select/RoleSelect.vue'
const props = defineProps(['title'])
const dialogVisible = ref(false)
const initialState = {
  id: null,
  name: '',
  username: '',
  createTime: '',
  updateTime: '',
  roleIds: [],
  status: null,
  sex: null,
  remark: ''
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
  updateAccount(temp).then(res => {
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
  createAccount(temp).then(res => {
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
