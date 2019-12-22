import axios from 'axios'
import { Message } from 'element-ui'
// axios拦截器-统一处理请求token 请求拦截
axios.interceptors.request.use(function (confug) {
  //   console.log(confug)
  let token = window.localStorage.getItem('user-token')
  confug.headers.Authorization = `Bearer ${token}`
  return confug
}, function () {

})

axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  console.log(error.request.status)
  let status = error.request.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      break
    case 404:
      message = '手机号不正确'
      break

    default:
      break
  }
  Message(message)
})

export default axios
