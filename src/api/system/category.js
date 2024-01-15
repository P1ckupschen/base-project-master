import { request } from '../../utils/request'

export function getList() {
  return request({
    url: 'index.php/product/category/getList',
    method: 'get'
  })
}

export function getListForSelect() {
  return request({
    url: 'index.php/product/category/getListForSelect',
    method: 'get'
  })
}

export function updateCategory(data) {
  return request({
    url: 'index.php/product/category/update',
    method: 'put',
    data: data
  })
}

export function createCategory(data) {
  return request({
    url: 'index.php/product/category/create',
    method: 'post',
    data: data
  })
}

export function deleteCategory(id) {
  return request({
    url: 'index.php/product/category/delete',
    method: 'delete',
    params: {
      id: id
    }
  })
}
