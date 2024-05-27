import request from '@/utils/request'
export function Login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function Logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/user/getInfo',
    method: 'get'
  })
}
