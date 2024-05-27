import { http } from '../../utils/request'

export function getCateList() {
  return http.get('/shuyu/getCateList', {})
}

export function getSelectListById(cid) {
  return http.get('/shuyu/getSelectListById', { id: cid })
}
