<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="props.title" :key="new Date().getTime()">
      <el-form :model="temp" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="temp.title" size="large"></el-input>
        </el-form-item>

        <!-- <el-form-item label="性别">
          <SexSelectVue v-model="temp.sex"></SexSelectVue>
        </el-form-item> -->
        <el-form-item label="记录人">
          <el-input v-model="temp.username" size="large"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <TeachCateSelect v-model="temp.categoryId"></TeachCateSelect>
        </el-form-item>
        <el-form-item label="时间">
          <DateTimePicker v-model="temp.time"></DateTimePicker>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="temp.summary" type="textarea" :rows="5" size="large"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.remark" size="large"></el-input>
        </el-form-item>
        <el-form-item label="文件">
          <UploadFile v-model="temp.url"></UploadFile>
        </el-form-item>
        <el-form-item label="创建时间" v-if="props.title === '修改'">
          <span>{{ temp.createTime }}</span>
        </el-form-item>
        <el-form-item label="更新时间" v-if="props.title === '修改'">
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
import { updateTeach, createTeach, getDetailById } from '@/api/system/teachData.js'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import UploadFile from '@/components/Upload/common/UploadFile.vue'
import TeachCateSelect from '@/components/Select/TeachCateSelect.vue'
import DateTimePicker from '@/components/common/DateTimePicker.vue'

const props = defineProps(['title'])
const dialogVisible = ref(false)
const initialState = {
  id: null,
  title: '',
  remark: '',
  summary: '',
  username: '',
  url: [],
  time: '',
  categoryId: 0
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
  updateTeach(temp).then(res => {
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
  createTeach(temp).then(res => {
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
