// 封装axios

import axios from 'axios'
import { useUserStore } from '@/store/user'
import router from '@/router'


// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
export const baseURL = import.meta.env.VITE_API_BASE_URL
// 创建一个新的axios实例
const service = axios.create({
  baseURL,
  timeout: 5000
})
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // const userStore = useUserStore()
    // if (userStore.token) {
    //   config.headers.Authorization = userStore.token
    // }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status >= 400) {
      return Promise.reject(response.data)
    }
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)


export default service;

