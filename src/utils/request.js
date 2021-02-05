import Vue from 'vue'
import axios from 'axios'
import { ACCESS_TOKEN, AUHTORIZATION } from '@/store/mutation-types'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000
})

const err = error => {
  return Promise.reject(error)
}

service.interceptors.request.use(
  config => {
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (token) {
      config.headers[AUHTORIZATION] = token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(response => {
  const { code, data } = response
  return code < 300 ? data : err({ response })
}, err)

export default service
