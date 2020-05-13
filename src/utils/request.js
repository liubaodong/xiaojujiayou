import axios from 'axios'
// 全局状态
// const $404 = 404
// const $401 = 401
// const $500 = 500
// const $502 = 502
const isTest = true
const baseURL = 'http://59.110.22.161:8081'
// const baseURL = 'http://localhost:8081'

// 创建 axios 实例
const instance = axios.create({
  // baseURL: process.env.VUE_APP_API, // 基础url,如果是多环境配置这样写，也可以像下面一行的写死。
  baseURL,
  timeout: 6000 // 请求超时时间
});
// 同一错误处理
const errorData = ({ err = '', cb }) => {
  if(process.env.NODE_ENV === "development"){
    throw new Error(err)
  } else {
    throw new Error('Network Error')
  }
}

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 处理 token 公共请求拦截
  // console.log('req', config)

  return config
},
err => {
  // console.log('err', err)
  return Promise.reject(err)
})
// 添加响应拦截器
instance.interceptors.response.use(config => {
  // 统一处理响应状态  404 401 500 502 ...
  // console.log('rsp', config)

  return config.data
},
err => {
  // console.log('err', err)
  return Promise.reject(err)
});

export default instance
