<template>
  <div>
    <div class="page-wrapper">
      <CategoryTreeSelect v-model="listQuery.categoryId" style="width: 300px;" :select-list="selectList" :default-props="defaultProps" :strict-flag="strictFlag"></CategoryTreeSelect>
      <el-button @click="getTableList">筛选</el-button>
      <el-button type="primary" @click="handleCreate">新建</el-button>
    </div>
    <div  class="app-container fill">
      <el-table :data="list" :border="true">
        <el-table-column prop="product_id" label="ID" align="center"></el-table-column>
        <el-table-column
          prop="product_name"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" min-width="160" align="center">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">修改</el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <Upload></Upload>
</template>

<script setup>
import Upload from '@/components/Upload/index.vue'
defineOptions({ name: 'PageHome' })
const listQuery = ref({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
  categoryId: ''
})
</script>
