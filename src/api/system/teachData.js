import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/teach/getList',
    method: 'get',
    params:
      query
  })
}

export function getDetailById(id) {
  return request({
    url: '/teach/getDetailById',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function createTeach(data) {
  return request({
    url: '/teach/insert',
    method: 'post',
    data
  })
}

export function updateTeach(data) {
  return request({
    url: '/teach/update',
    method: 'post',
    data
  })
}

export function deleteTeach(data) {
  return request({
    url: '/teach/delete',
    method: 'post',
    data
  })
}
