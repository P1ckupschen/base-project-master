import request from '@/utils/request'

export function fetchRoleSelectList() {
  return request({
    url: '/role/getListForSelect',
    method: 'get'
  })
}

export function getList(query) {
  return request({
    url: '/role/getRoleList',
    method: 'get',
    params:
      query
  })
}

export function getDetailById(id) {
  return request({
    url: '/role/getDetailById',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function createRole(data) {
  return request({
    url: '/role/insert',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: '/role/delete',
    method: 'delete',
    params: {
      id
    }
  })
}

export function getAllPermsAndMenus() {
  return request({
    url: '/role/getAllSelectPermsAndMenus',
    method: 'get'
  })
}

export function getAllPerms() {
  return request({
    url: '/role/getAllSelectPermissions',
    method: 'get'
  })
}
