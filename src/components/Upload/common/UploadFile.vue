<template>
  <el-upload
    class="upload-box"
    v-model:file-list="value"
    :action="actionUrl"
    multiple
    :limit="props.limit"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    :on-preview="handlePreview"
    :headers="getHeaders()"
  >
    <el-button type="primary">点击上传</el-button>
  </el-upload>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { uploadFileUrl, deleteFile, filePublicHost } from '@/api/common/upload'
import { getHeaders } from '@/utils/request.js'
const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return []
    }
  },
  limit: {
    type: Number,
    default: 1
  }
})
const actionUrl = ref(uploadFileUrl)
const emits = defineEmits(['update:modelValue'])

const handleRemove = file => {
  const uid = file.uid
  // const target = value.value.find((pic) => pic.uid === uid)
  // console.log(target)
  // if (target) {
  console.log(file)
  deleteFile({ path: file.path })
  // }
  const newList = value.value.filter(item => item.uid !== uid)
  value.value = newList
}

const beforeUpload = uploadFile => {
  const isType =
    uploadFile.type === 'application/pdf' ||
    uploadFile.type === 'image/png' ||
    uploadFile.type === 'image/jpeg' ||
    uploadFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    uploadFile.type === 'application/msword' ||
    uploadFile.type === 'application/vnd.ms-excel' ||
    uploadFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  const isLt20M = uploadFile.size / 1024 / 1024 < 20
  if (!isType) {
    ElMessage.error('仅支持jpg,jpeg,png,pdf,doc,docx,xlsx,xls格式！')
    return false
  }
  if (!isLt20M) {
    ElMessage.error('上传文件大小不能超过 20MB!')
    return false
  }
}

const handleSuccess = (res, uploadFile) => {
  console.log(res)
  const list = value.value.map(item => {
    if (item.uid === uploadFile.uid) {
      return {
        uid: uploadFile.uid,
        name: uploadFile.name,
        path: res.data
      }
    }
    return item
  })
  value.value = list
}

const handleExceed = () => {
  ElMessage.warning('最多只能上传' + props.limit + '个文件')
}

const handlePreview = v => {
  // todo 本地看不到图片 需添加/backend
  window.open(filePublicHost + v.path)
}

const value = computed({
  get() {
    return props.modelValue || []
  },
  set(v) {
    emits('update:modelValue', v)
  }
})
</script>

<style lang="scss" scoped>
.upload-box {
  width: 100%;
}
</style>
