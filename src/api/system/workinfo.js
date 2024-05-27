import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/work/getList',
    method: 'get',
    params:
      query
  })
}

export function getDetailById(id) {
  return request({
    url: '/work/getDetailById',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function createWorkinfo(data) {
  return request({
    url: '/work/insert',
    method: 'post',
    data
  })
}

export function updateWorkinfo(data) {
  return request({
    url: '/work/update',
    method: 'post',
    data
  })
}

export function deleteWorkinfo(data) {
  return request({
    url: '/work/delete',
    method: 'post',
    data
  })
}
