import request from '@/utils/request.js'

export function getList(listQuery) {
  return request({
    url: 'index.php/website/getlist',
    method: 'get',
    params: listQuery
  })
}

export function getOneById(id) {
  return request({
    url: 'index.php/website/getOneById',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function getListForSelect() {
  return request({
    url: 'index.php/website/getListForSelect',
    method: 'get'
  })
}

export function updateReport(data) {
  return request({
    url: 'index.php/website/update',
    method: 'put',
    data: data
  })
}

export function sendReport(id) {
  return request({
    url: 'index.php/website/send',
    method: 'put',
    params: {
      id: id
    }
  })
}

export function createReport(data) {
  return request({
    url: 'index.php/website/create',
    method: 'post',
    data: data
  })
}

export function deleteReport(id) {
  return request({
    url: 'index.php/website/delete',
    method: 'delete',
    params: {
      id: id
    }
  })
}
