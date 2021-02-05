import request from '@/utils/request'

const api = {
  GET_USER_INFO: '/user/info'
}

export const getUserInfo = () => {
  return request({
    url: api.GET_USER_INFO,
    method: 'get'
  })
}
