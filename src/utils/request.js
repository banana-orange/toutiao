import axios from 'axios'
// axios拦截器-统一处理请求token 请求拦截
axios.interceptors.request.use(function (confug) {
//   console.log(confug)
  let token = window.localStorage.getItem('user-token')
  confug.headers.Authorization = `Bearer ${token}`
  console.log(confug)
  return confug
}, function (error) {
  console.log(error)
})

axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  console.log(error)
})

export default axios
