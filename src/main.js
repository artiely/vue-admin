import '@babel/polyfill'
import Vue from 'vue'
import { App } from '@layouts'
import router from '@router'
import store from '@store'
import Antd from 'ant-design-vue'
import './assets/styles/main.less'
import * as filters from './common/filter'
import './common/directive'
import { Api } from '@core'
import './packages'
import 'nprogress/nprogress.css'
import './plugins'

// import r from 'admin'
// console.log('TCL: r', r)
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(Api)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// let s = r('router/modules').getMain()
// console.log('TCL: s', s)

console.log('TCL: router', router)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
console.log(
  `
    █████▒█    ██  ▄████▄   ██ ▄█▀       ██████╗ ██╗   ██╗ ██████╗
 ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒        ██╔══██╗██║   ██║██╔════╝
 ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░        ██████╔╝██║   ██║██║  ███╗
 ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄        ██╔══██╗██║   ██║██║   ██║
 ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄       ██████╔╝╚██████╔╝╚██████╔╝
  ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒       ╚═════╝  ╚═════╝  ╚═════╝
  ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
  ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
           ░     ░ ░      ░  ░
`
)
