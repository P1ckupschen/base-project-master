<template>
  <div>
    <div class="app-container fill">
      <div class="page-header">
        <!-- <FilterComponents v-model:listQuery="listQuery"></FilterComponents> -->
        <!-- <el-button @click="getTableList">筛选</el-button> -->
        <el-button type="primary" @click="handleCreate">新建</el-button>
        <el-button type="danger" @click="handleDelete">批量删除</el-button>
      </div>

      <!-- <div>
        <p @click="exportExcelByIds">勾选下载</p>
        <p @click="exportExcelByQuery">根据筛选条件下载</p>
      </div> -->
      <div class="table-box mt16">
        <el-table :data="list" :border="true" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column
            fixed
            prop="name"
            label="患者姓名"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            fixed
            prop="sex"
            label="性别"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="sizhen"
            label="四诊信息"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="shexiang"
            label="舌象信息"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="maixiang"
            label="脉象信息"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="xiyi"
            label="西医疾病"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="zhongyi"
            label="中医疾病"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="zhenghou"
            label="证候"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="zhizezf"
            label="治则治法"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="fangji"
            label="方剂名称"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="zhongyao"
            label="中药名称"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="xuewei"
            label="穴位名称"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="chufangys"
            label="处方医师"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="fangjilb"
            label="方剂类别"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="jixing"
            label="剂型"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="geiyaotj"
            label="给药途径"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="chuchu"
            label="出处"
            :show-overflow-tooltip="true"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column label="操作" min-width="160" align="center">
            <template #default="scope">
              <el-button type="default" @click="handleEdit(scope.row)">修改</el-button>
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
import { getList, deleteZyDatas } from '@/api/system/ZyData.js'
// import FilterComponents from '@/components/filter/index.vue'
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
  sex: '',
  sizhen: '',
  shexiang: '',
  maixiang: '',
  xiyi: '',
  zhongyi: '',
  zhenghou: '',
  zhizezf: '',
  fangji: '',
  zhongyao: '',
  xuewei: '',
  chufangys: '',
  fangjilb: '',
  jixing: '',
  geiyaotj: '',
  chuchu: ''
})
const multipleSelection = ref([])
const handleSelectionChange = val => {
  multipleSelection.value = val
}
const handleSizeChange = val => {
  listQuery.value.pageSize = val
  getTableList()
  // console.log(`${val} items per page`)
}
const handleCurrentChange = val => {
  listQuery.value.pageNum = val
  getTableList()
  // console.log(`current page: ${val}`)
}
const getTableList = () => {
  getList(listQuery.value).then(response => {
    console.log(response.data.data)
    if (response.data.code === 200) {
      list.value = response.data.data.data
      total.value = response.data.data.total
    } else {
      ElMessage.error(response.data.data.msg)
    }
  })
}
const handleEdit = row => {
  key.value = 'Edit'
  coeRef.value.open(toRaw(row).id)
}
const handleCreate = () => {
  key.value = 'Create'
  coeRef.value.open('')
}
const deleteId = ref()
const handleDelete = row => {
  deleteId.value = row.id
  deleteRef.value.open()
}
const commitDelete = () => {
  var ids = []
  multipleSelection.value.forEach(item => {
    ids.push(item.id)
  })
  if (ids.length === 0) {
    ids.push(deleteId.value)
  }
  deleteZyDatas(ids).then(res => {
    if (res.data.code === 200) {
      ElMessage.success(res.data.msg)
      getTableList()
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}
// const exportExcelByIds = () => {
//   if (multipleSelection.value.length === 0) {
//     ElMessage.error('请选择要导出的数据')
//     return
//   }
//   const ids = []
//   multipleSelection.value.forEach(item => {
//     ids.push(item.id)
//   })
//   getExcelByIds(ids).then(res => {
//     const blob = new Blob([res], {
//       type: 'application/octet-stream; charset=utf-8'
//     })
//     const url = URL.createObjectURL(blob)
//     console.log(url)
//     const a = document.createElement('a')
//     a.href = url
//     a.download = '中医数据.xlsx'
//     a.click()
//     URL.revokeObjectURL(url)
//   })
// }

// const exportExcelByQuery = () => {
//   getExcelByQuery(listQuery.value).then(res => {
//     const blob = new Blob([res], {
//       type: 'application/octet-stream; charset=utf-8'
//     })
//     const url = URL.createObjectURL(blob)
//     console.log(url)
//     const a = document.createElement('a')
//     a.href = url
//     a.download = '中医数据.xlsx'
//     a.click()
//     URL.revokeObjectURL(url)
//   })
// }
onMounted(() => {
  getTableList()
})
</script>

<style lang="scss" scoped></style>
