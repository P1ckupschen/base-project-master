import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/thesis/getList',
    method: 'get',
    params:
      query
  })
}

export function getDetailById(id) {
  return request({
    url: '/thesis/getDetailById',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function createThesis(data) {
  return request({
    url: '/thesis/insert',
    method: 'post',
    data
  })
}

export function updateThesis(data) {
  return request({
    url: '/thesis/update',
    method: 'post',
    data
  })
}

export function deleteThesis(data) {
  return request({
    url: '/thesis/delete',
    method: 'post',
    data
  })
}
