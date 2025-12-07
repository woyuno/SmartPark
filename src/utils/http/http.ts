import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
import { authStore } from '../../store/store'
const http: AxiosInstance = axios.create({
  baseURL: 'https://www.demo.com',
  timeout: 5000,
})
// 请求拦截器
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const stateToken = authStore.getState().stateToken
  if (stateToken) {
    config.headers['Authorization'] = `Bearer ${stateToken}`
  }
  return config
})
// 响应拦截器
http.interceptors.response.use((response: AxiosResponse) => {
  const res = response.data
  if (res.code !== 200) {
    message.error(res.code + ':' + res.message)
    return Promise.reject(new Error(res.message))
  }

  return response.data
})

export default http
