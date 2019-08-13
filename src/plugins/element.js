import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueMarkdown from 'vue-markdown'
// 引入
import MarkdownRun from 'vue-markdown-run'
// import Print from 'vue-print-nb'

// Vue.use(Print)
// Vue.use(VueMarkdown)
Vue.component('vue-markdown', VueMarkdown)
// 全局注入
Vue.use(MarkdownRun)
Vue.use(ElementUI)
Vue.use(VuePerfectScrollbar)
Vue.use(iView)
