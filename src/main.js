import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './utils/dayjs'

import Vant from 'vant'
import 'vant/lib/index.css'
// 导入全局样式
import './styles/index.less'
// 自动设置rem基准值(html标签字体大小)
import 'amfe-flexible'
// 全局注册vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
