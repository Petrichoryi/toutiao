import axios from 'axios'
import store from '../store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  // 如果用户已经登录，给用户统一设置token信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 处理完之后一定要把token进行返回，否则请求就会停在这里
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
