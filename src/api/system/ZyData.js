import request from '@/utils/request.js'

export function getList(listQuery) {
  return request({
    url: '/zydata/getList',
    method: 'post',
    data: listQuery
  })
}

// export function getList(listQuery) {
//   return request({
//     url: '/zydata/getList',
//     method: 'get',
//     params: listQuery
//   })
// }

export function getDetailById(id) {
  return request({
    url: '/zydata/getDetailById',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function getListForSelect() {
  return request({
    url: '/zydata/getListForSelect',
    method: 'get'
  })
}

export function updateZyData(data) {
  return request({
    url: '/zydata/update',
    method: 'put',
    data: data
  })
}

export function createZyData(data) {
  return request({
    url: '/zydata/insert',
    method: 'post',
    data: data
  })
}

export function deleteZyData(id) {
  return request({
    url: '/zydata/delete',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function deleteZyDatas(ids) {
  return request({
    url: '/zydata/deleteBatches',
    method: 'post',
    data: ids
  })
}

export function getExcelByIds(ids) {
  return request({
    url: '/zydata/getExcelByIds',
    method: 'post',
    data: ids,
    responseType: 'blob'
  })
}
export function getExcelByQuery(listQuery) {
  return request({
    url: '/zydata/getQueryExcel',
    method: 'post',
    data: listQuery,
    responseType: 'blob'
  })
}
