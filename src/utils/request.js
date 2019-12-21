import axios from 'axios'

axios.interceptors.request.use(function (confug) {
//   console.log(confug)
  let token = window.localStorage.getItem('user-token')
  confug.headers.Authorization = `Bearer ${token}`
  console.log(confug)
  return confug
}, function (error) {
  console.log(error)
})

export default axios
