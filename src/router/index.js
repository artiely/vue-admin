import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
// import { getToken } from '@/common/utils'
import { anthNavTabs } from '@layouts'
import baseRoutes from './baseRoutes'
import store from '../store'
Vue.use(Router)
NProgress.configure({
  showSpinner: false
})
let routes = []
const routerContext = require.context('./modules', true, /\.js$/)

routerContext.keys().forEach(route => {
  const routerModle = routerContext(route)
  routes = [
    ...routes,
    ...(routerModle.default || routerModle),
    ...baseRoutes
  ]
})

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes
})
// 将路由处理成菜单

store.commit('sys/setMenu', routes)

router.beforeEach((to, from, next) => {
  // 第一步鉴权
  // 第二步写入navtabs
  NProgress.start()
  anthNavTabs(to)

  // let { token } = getToken()
  // if (to.meta.auth) {
  //   // 有用户信息
  //   if (token) {
  //     next({
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   } else {
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   }
  // } else {
  //   next()
  // }
  next()
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export { routes }
export default router
