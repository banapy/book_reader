// import { notification } from 'antd'
import axios, { AxiosResponse } from 'axios'
// axios.defaults.baseURL = "http://localhost:7998"
export const baseURL = process.env.REACT_APP_BASE_URL
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 2000 // 超时时间
axios.interceptors.request.use(
  config => {
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      config.headers['Authorization'] = userInfo.token
      // config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  error => {
    // alert('请求超时，请稍后重试！')
    return Promise.reject(error)
  }
)
console.log("sdfasf")
// http响应拦截器
axios.interceptors.response.use(
  res => {
    // 10101是未登录状态码
    if (res.code === 401) { // 如果是未登录直接踢出去
      window.location.href = "/#/view/login"
      // localStorage.clear()
    }
    if (res.status !== 200) {
      console.error({
        message: "接口错误",
        description: ""
      })
    } else {
      if (res.code === -1) {
        console.error({
          message: "接口错误",
          description: res.data.msg
        })
      }
    }
    return res.data
  },
  error => {
    console.log(error)
    // alert('请求失败，请稍后重试！')
    return Promise.reject(error)
  }
)

export default axios