import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/account/getList',
    method: 'get',
    params:
      query
  })
}

export function getDetailById(id) {
  return request({
    url: '/account/getDetailById',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function createAccount(data) {
  return request({
    url: '/account/insert',
    method: 'post',
    data
  })
}

export function updateAccount(data) {
  return request({
    url: '/account/update',
    method: 'post',
    data
  })
}

export function deleteAccount(data) {
  return request({
    url: '/account/delete',
    method: 'post',
    data
  })
}
