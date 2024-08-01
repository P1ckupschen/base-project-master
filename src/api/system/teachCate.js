import request from '@/utils/request'

export function fetchSelectList() {
  return request({
    url: '/teachCate/getSelectList',
    method: 'get'
  })
}

export function getList(query) {
  return request({
    url: '/teachCate/getList',
    method: 'get',
    params:
      query
  })
}

export function getDetailById(id) {
  return request({
    url: '/teachCate/getDetailById',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function createTeachCate(data) {
  return request({
    url: '/teachCate/insert',
    method: 'post',
    data
  })
}

export function updateTeachCate(data) {
  return request({
    url: '/teachCate/update',
    method: 'post',
    data
  })
}

export function deleteTeachCate(data) {
  return request({
    url: '/teachCate/delete',
    method: 'post',
    data
  })
}
