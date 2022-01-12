import Vue from 'vue'
// 初始化dayjs相关配置
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用中文语言包
dayjs.locale('zh-cn')
// 配置使用处理相对时间
dayjs.extend(relativeTime)

// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
// console.log(dayjs('2021-12-31').from(dayjs()))

// 把处理相对时间的代码包装为全局过滤器
// 然后就可以在任何组件的模板中使用了
// 所谓的过滤器就是一个可以在模板中调用的函数
// 在组件的模板中使用过滤器：{{xxx|过滤器名称}}
// 管道符前面的内容会作为参数传递给过滤器函数
// 过滤器的返回值会渲染到使用过滤器的模板中
Vue.filter('relativeTime', value => {
  // console.log(value)
  return dayjs(value).from(dayjs())
})
