<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="props.title">
      <el-form :model="temp" label-width="120px">

        <el-form-item label="报告编号">
          <el-input v-model="temp.report_code" ></el-input>
        </el-form-item>

        <el-form-item v-if="props.title === '修改'" label="查询码">
          <el-input v-model="temp.query_code" readonly></el-input>
        </el-form-item>

        <el-form-item label="委托单位">
          <el-input v-model="temp.entrust_company"></el-input>
        </el-form-item>

        <el-form-item label="报告名称">
          <el-input v-model="temp.report_name"></el-input>
        </el-form-item>

        <el-form-item label="产品名称">
          <el-input v-model="temp.product_name"></el-input>
        </el-form-item>

        <el-form-item label="报告状态">
          <el-tag v-if="temp.report_status === 1" class="ml-2" type="success">已发布</el-tag>
          <el-tag v-if="temp.report_status === 0" class="ml-2" type="warning">未发布</el-tag>
        </el-form-item>

        <el-form-item label="检测依据">
          <el-input v-model="temp.report_content" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="报告内容">
          <UploadPdf v-model="temp.report_url" ></UploadPdf>
        </el-form-item>

        <el-form-item label="签发时间">
          <DatePicker v-model="temp.report_time"></DatePicker>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false"> 取消 </el-button>
          <el-button type="primary"  @click="title === '修改'? updateCommit() : createCommit() "> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import DatePicker from '@/components/Common/DatePicker.vue'
import UploadPdf from '@/components/Upload/common/UploadPdf.vue'
import { reactive, ref } from 'vue'
import { updateReport, createReport, getOneById } from '@/api/system/report.js'
import { ElMessage } from 'element-plus'

const props = defineProps(['title'])
const dialogVisible = ref(false)

const initialState = {
  report_id: null,
  report_name: '',
  report_code: '',
  query_code: '',
  report_content: '',
  entrust_company: '',
  report_url: [],
  report_status: '',
  report_time: null,
  product_name: ''
}
const temp = reactive({ ...initialState })

function resetTemp() {
  Object.assign(temp, initialState)
}

const getDetail = (id) => {
  getOneById(id).then((res) => {
    if (res.data.code === 200) {
      Object.assign(temp, res.data.data)
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}

const open = (id) => {
  dialogVisible.value = true
  if (id !== '' && id !== 0) {
    getDetail(id)
  } else {
    resetTemp()
  }
}
const emits = defineEmits(['getTableList'])
// const changeMethod = (item) => {
//   console.log('change', item)
// }
const updateCommit = () => {
  updateReport(temp).then((res) => {
    if (res.data.code === 200) {
      ElMessage.success(res.data.msg)
      emits('getTableList')
      dialogVisible.value = false
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}
const createCommit = () => {
  createReport(temp).then((res) => {
    if (res.data.code === 200) {
      ElMessage.success(res.data.msg)
      emits('getTableList')
      dialogVisible.value = false
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}
defineExpose({ open })

</script>

<style lang="scss" scoped>

</style>
