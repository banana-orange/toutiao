import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'

Vue.config.productionTip = false
Vue.use(elementui)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
