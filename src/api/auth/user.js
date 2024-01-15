import request from '@/utils/request'

export function Login(data) {
  return request({
    url: 'index.php/user/login',
    method: 'post',
    data: data
  })
}
