<template>
  <div>
    <div class="app-container fill">
      <div class="page-header">
        <SearchFilter v-model:listQuery="listQuery" :search="handleSearch"></SearchFilter>
        <el-button type="primary" @click="handleCreate">新建</el-button>
      </div>
      <div class="table-box mt16">
        <el-table :data="list" :border="true" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column fixed prop="name" label="医生名称" align="center"></el-table-column>
          <el-table-column
            prop="remark"
            label="医生描述"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button type="default" @click="handleEdit(scope.row)">修改</el-button>
              <el-button type="default" @click="handleReset(scope.row)">重置密码</el-button>
              <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box mt16">
        <el-pagination
          :background="background"
          layout="prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <deleteDialog ref="deleteRef" @delete="commitDelete()"></deleteDialog>
    <CreateOrEditDialog
      ref="coeRef"
      :title="textMap[key]"
      @get-table-list="getTableList"
    ></CreateOrEditDialog>
  </div>
</template>

<script setup>
import CreateOrEditDialog from './dialog/CreateOrEditDialog.vue'
import deleteDialog from '@/components/Dialog/deleteDialog.vue'
import SearchFilter from './filter/index.vue'
import { getList, deleteAccount, resetAccount } from '@/api/system/account.js'
import { ref, reactive, onMounted, toRaw } from 'vue'
import { ElMessage } from 'element-plus'
const total = ref(0)
const list = ref()
const background = ref(false)
const deleteRef = ref(null)
const coeRef = ref(null)
const key = ref()
const textMap = reactive({
  Create: '新建',
  Edit: '修改'
})
const listQuery = ref({
  pageNum: 1,
  pageSize: 10,
  name: '',
  status: null
})
const multipleSelection = ref([])
const handleSelectionChange = val => {
  multipleSelection.value = val
}
const handleSizeChange = val => {
  listQuery.value.pageSize = val
}
const handleCurrentChange = val => {
  listQuery.value.pageNum = val
}
const getTableList = () => {
  getList(listQuery.value).then(response => {
    // console.log(response.data.data)
    if (response.data.code === 200) {
      list.value = response.data.data.data
      total.value = response.data.data.total
    } else {
      ElMessage.error(response.data.data.msg)
    }
  })
}
const handleReset = row => {
  resetAccount(row.id).then(res => {
    // console.log(response.data.data)
    if (res.data.code === 200) {
      ElMessage.success(res.data.msg)
      getTableList()
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}
const handleEdit = row => {
  key.value = 'Edit'
  console.log(row)
  coeRef.value.open(toRaw(row).id)
}
const handleCreate = () => {
  key.value = 'Create'
  coeRef.value.open('')
}
const handleDelete = row => {
  deleteRef.value.open()
}
const commitDelete = () => {
  var ids = []
  multipleSelection.value.forEach(item => {
    ids.push(item.id)
  })
  deleteAccount(ids).then(res => {
    if (res.data.code === 200) {
      ElMessage.success(res.data.msg)
      getTableList()
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}
const handleSearch = () => {
  getTableList()
}
onMounted(() => {
  getTableList()
})
</script>

<style lang="scss" scoped></style>
