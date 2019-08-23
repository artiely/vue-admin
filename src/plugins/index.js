import Vue from 'vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueMarkdown from 'vue-markdown'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

Vue.component('vue-markdown', VueMarkdown)
// 全局注入
Vue.use(VuePerfectScrollbar)
