import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueMarkdown from 'vue-markdown'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

Vue.component('vue-markdown', VueMarkdown)
// 全局注入
Vue.use(ElementUI)
Vue.use(VuePerfectScrollbar)
Vue.use(iView)
