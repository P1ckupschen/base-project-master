<template>
  <div>
    <el-dialog title="提醒" v-model="deleteDialogVisible" style="text-align:center;">
      <span>删除不可恢复，您是否确认删除</span>
      <div class="delete-button-box">
        <span  class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteDialogVisible = false; handleDelete();">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const deleteDialogVisible = ref(false)
const emits = defineEmits(['delete'])

const handleDelete = () => {
  emits('delete')
}
const open = () => {
  deleteDialogVisible.value = true
}
defineExpose({ open })
</script>

<style lang="scss" scoped>
 .delete-button-box{
    margin-top: 16px;
 }
</style>
