<template>
  <div>
    <div  class="app-container fill">
      <div class="page-header">
        <el-input style="display: inline;" v-model="listQuery.keyword" placeholder="请输入报告编号"></el-input>
        <el-button @click="getTableList">筛选</el-button>
        <el-button type="primary" @click="handleCreate">新建</el-button>
      </div>
      <div class="table-box mt16">
        <el-table :data="list" :border="true">
          <el-table-column prop="report_id" label="ID" align="center"></el-table-column>
          <el-table-column
            prop="report_code"
            label="报告编号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="report_name"
            label="报告名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="report_status"
            label="状态"
            align="center"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.report_status === 1" class="ml-2" type="success">已发布</el-tag>
              <el-tag v-if="scope.row.report_status === 0" class="ml-2" type="warning">未发布</el-tag>
            </template>

          </el-table-column>
          <el-table-column label="操作" min-width="160" align="center">
            <template #default="scope">
              <el-button type="default" @click="handleEdit(scope.row)">修改</el-button>
              <el-button type="primary" @click="handleSend(scope.row)">发布</el-button>
              <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box mt16">
        <el-pagination :background="background"
                       layout="prev, pager, next"
                       :total="total"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange" />
      </div>

    </div>
    <deleteDialog ref='deleteRef' @delete="commitDelete()"></deleteDialog>
    <CreateOrEditDialog ref="coeRef" :title="textMap[key]" @get-table-list="getTableList"></CreateOrEditDialog>
  </div>
</template>

<script setup>
import CreateOrEditDialog from './dialog/CreateOrEditDialog.vue'
import deleteDialog from '@/components/Dialog/deleteDialog.vue'
import { getList, deleteReport, sendReport } from '@/api/system/report.js'

// defineOptions({ name: 'PageHome' })
// const list = reactive({})
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
const Id = ref()
const listQuery = ref({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
  categoryId: ''
})

const handleSizeChange = (val) => {
  listQuery.value.pageSize = val
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  listQuery.value.pageNum = val
  console.log(`current page: ${val}`)
}
const getTableList = () => {
  getList(listQuery.value).then((response) => {
    console.log(response.data.data)
    if (response.data.code === 200) {
      list.value = response.data.data.data
      total.value = response.data.data.total
    } else {
      ElMessage.error(response.data.data.msg)
    }
  })
}
const handleEdit = (row) => {
  key.value = 'Edit'
  coeRef.value.open(toRaw(row).report_id)
}
const handleSend = (row) => {
  if (row.report_status === 1) {
    return
  } else {
    sendReport(row.report_id).then((res) => {
      if (res.data.code === 200) {
        ElMessage.success(res.data.msg)
        getTableList()
      } else {
        ElMessage.error(res.data.msg)
      }
    })
  }
}
const handleCreate = () => {
  key.value = 'Create'
  coeRef.value.open('')
}
const handleDelete = (row) => {
  Id.value = row.report_id
  deleteRef.value.open()
}
const commitDelete = () => {
  deleteReport(Id.value).then((res) => {
    if (res.data.code === 200) {
      ElMessage.success(res.data.msg)
      getTableList()
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}

onMounted(() => {
  getTableList()
})
</script>

<style lang="scss" scoped>

</style>
