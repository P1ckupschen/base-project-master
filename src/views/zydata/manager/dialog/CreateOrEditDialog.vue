<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="props.title">
      <el-form :model="temp" label-width="120px">

        <el-form-item label="患者姓名">
          <el-input v-model="temp.name" size="large"></el-input>
        </el-form-item>

        <el-form-item label="性别select">
          <el-input v-model="temp.sex" size="large"></el-input>
        </el-form-item>

        <el-form-item label="四诊信息">
          <el-input v-model="temp.sizhen" size="large"></el-input>
        </el-form-item>

        <el-form-item label="舌象信息">
          <el-input v-model="temp.shexiang" size="large"></el-input>
        </el-form-item>

        <el-form-item label="脉象信息">
          <el-input v-model="temp.maixiang" size="large"></el-input>
        </el-form-item>

        <el-form-item label="西医疾病">
          <el-input v-model="temp.xiyi" size="large"></el-input>
        </el-form-item>

        <el-form-item label="中医疾病">
          <el-input v-model="temp.zhongyi" size="large"></el-input>
        </el-form-item>

        <el-form-item label="症候">
          <el-input v-model="temp.zhenghou" size="large"></el-input>
        </el-form-item>

        <el-form-item label="治则治法">
          <el-input v-model="temp.zhizezf" size="large"></el-input>
        </el-form-item>

        <el-form-item label="方剂名称">
          <el-input v-model="temp.fangji" size="large"></el-input>
        </el-form-item>

        <el-form-item label="中药名称">
          <el-input v-model="temp.zhongyao" size="large"></el-input>
        </el-form-item>

        <el-form-item label="穴位名称">
          <el-input v-model="temp.xuewei" size="large"></el-input>
        </el-form-item>

        <el-form-item label="处方医师">
          <el-input v-model="temp.chufangys" size="large"></el-input>
        </el-form-item>

        <el-form-item label="方剂类别">
          <el-input v-model="temp.fangjilb" size="large"></el-input>
        </el-form-item>

        <el-form-item label="剂型">
          <el-input v-model="temp.jixing" size="large"></el-input>
        </el-form-item>

        <el-form-item label="给药途径">
          <el-input v-model="temp.geiyaotj" size="large"></el-input>
        </el-form-item>

        <el-form-item label="出处">
          <el-input v-model="temp.chuchu" size="large"></el-input>
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
import { reactive, ref } from 'vue'
import { updateZyData, createZyData, getDetailById } from '@/api/system/ZyData.js'
import { ElMessage } from 'element-plus'

const props = defineProps(['title'])
const dialogVisible = ref(false)

const initialState = {
  id: '',
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
}
const temp = reactive({ ...initialState })

function resetTemp() {
  Object.assign(temp, initialState)
}

const getDetail = (id) => {
  getDetailById(id).then((res) => {
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
  updateZyData(temp).then((res) => {
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
  createZyData(temp).then((res) => {
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

<style lang="scss" scoped>

</style>
