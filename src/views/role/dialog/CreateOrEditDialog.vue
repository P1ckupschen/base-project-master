<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="props.title" :key="new Date().getTime()">
      <el-form :model="temp" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="temp.roleName" size="large"></el-input>
        </el-form-item>

        <el-form-item label="角色标识"> </el-form-item>
        <el-form-item label="菜单设置">
          <MenuTreeVue ref="MenuRef" v-model="temp.menusList"></MenuTreeVue>
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
import { updateRole, createRole, getDetailById } from '@/api/system/role.js'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import MenuTreeVue from '../../../components/Tree/MenuTree.vue'
const props = defineProps(['title'])
const dialogVisible = ref(false)
const MenuRef = ref(null)
const initialState = {
  roleId: null,
  roleName: '',
  remark: '',
  createTime: '',
  createUser: '',
  roleKey: '',
  menusList: []
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
      MenuRef.value.setCheckedKeys(temp.menusList)
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
  updateRole(temp).then(res => {
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
  createRole(temp).then(res => {
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
</script>

<style lang="scss" scoped></style>
