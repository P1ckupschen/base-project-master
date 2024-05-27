import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/course/getList',
    method: 'get',
    params:
      query
  })
}

export function getDetailById(id) {
  return request({
    url: '/course/getDetailById',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function createCourseware(data) {
  return request({
    url: '/course/insert',
    method: 'post',
    data
  })
}

export function updateCourseware(data) {
  return request({
    url: '/course/update',
    method: 'post',
    data
  })
}

export function deleteCourseware(data) {
  return request({
    url: '/course/delete',
    method: 'post',
    data
  })
}
