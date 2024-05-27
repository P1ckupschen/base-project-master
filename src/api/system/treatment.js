import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/treat/getList',
    method: 'get',
    params:
      query
  })
}

export function getDetailById(id) {
  return request({
    url: '/treat/getDetailById',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function createTreatment(data) {
  return request({
    url: '/treat/insert',
    method: 'post',
    data
  })
}

export function updateTreatment(data) {
  return request({
    url: '/treat/update',
    method: 'post',
    data
  })
}

export function deleteTreatment(data) {
  return request({
    url: '/treat/delete',
    method: 'post',
    data
  })
}
