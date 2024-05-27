<template>
  <div>
    <div class="filter-container">
      <el-select
        v-model="queryComputed.sex"
        clearable
        filterable
        placeholder="性别"
        size="large"
        class="filter-item"
      >
        <el-option
          v-for="item in Sexoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.sizhen"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="四诊信息"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in sizhenOptions"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        />
      </el-select>

      <el-select
        v-model="queryComputed.shexiang"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="舌象信息"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.maixiang"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="脉象信息"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.xiyi"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="西医疾病"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.zhongyi"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="中医疾病"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.zhenghou"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="症候"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.zhizezf"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="治则治法"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.fangji"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="方剂名称"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.zhongyao"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="中药名称"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.xuewei"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="穴位名称"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.chufangys"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="处方医师"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.fangjilb"
        filterable
        clearable
        remote
        reserve-keyword
        allow-create
        default-first-option
        placeholder="方剂类别"
        size="large"
        :remote-method="remoteMethod"
        :loading="loading"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.jixing"
        filterable
        clearable
        placeholder="剂型"
        size="large"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.geiyaotj"
        filterable
        clearable
        placeholder="给药途径"
        size="large"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="queryComputed.chuchu"
        filterable
        clearable
        placeholder="出处"
        size="large"
        class="filter-item"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getCateList, getSelectListById } from '@/api/system/Shuyu.js'
import { ElMessage } from 'element-plus'

const list = ref([])
const options = ref([])
const sizhenOptions = ref([])
// const maixiangOptions = ref([])
// const xiyiOptions = ref([])
// const zhenghouOptions = ref([])
// const zhongyiOptions = ref([])
// const xueweiOptions = ref([])
// const chufangysOptions = ref([])
// const fangjilbOptions = ref([])
// const jixingOptions = ref([])
// const geiyaotjOptions = ref([])
// const chuchuOptions = ref([])
const Sexoptions = ref([
  {
    label: '男',
    value: '男'
  },
  {
    label: '女',
    value: '女'
  }
])

const getSizhenList = () => {
  getSelectListById(1).then(res => {
    sizhenOptions.value = res.data.data
  })
}

const categoryList = ref([])

const getCategoryList = () => {
  getCateList().then(res => {
    if (res.data.code === 200) {
      categoryList.value = res.data.data
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}

const props = defineProps({
  listQuery: {
    type: Object,
    default() {
      return {}
    }
  }
})
const emits = defineEmits(['update:listQuery'])
const loading = ref(false)

const queryComputed = computed({
  get() {
    return props.listQuery || {}
  },
  set(v) {
    emits('update:listQuery', v)
  }
})
onMounted(() => {
  getCategoryList()
  getSizhenList()
  list.value = states.map(item => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})

const remoteMethod = query => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = list.value.filter(item => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    options.value = []
  }
}

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]
</script>

<style lang="scss" scoped>
.filter-container {
  display: flex;
  flex-wrap: wrap;
}
.filter-item {
  width: 220px;
  margin-top: 10px;
  margin-right: 10px;
}
</style>
