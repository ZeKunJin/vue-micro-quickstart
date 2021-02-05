import request from '@/utils/request'

const api = {
  LOGIN: '/auth/login'
}

export const login = ({ username, password }) => {
  return request({
    url: api.LOGIN,
    method: 'post',
    data: { username, password }
  })
}
