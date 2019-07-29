import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
// import { getToken } from '@/common/utils'
import { anthNavTabs } from '@/common/observable/navTabs'
Vue.use(Router)
NProgress.configure({
  showSpinner: false
})
let routes = []
const routerContext = require.context('./modules', true, /\.js$/)

routerContext.keys().forEach(route => {
  const routerModle = routerContext(route)
  routes = [...routes, ...(routerModle.default || routerModle)]
})

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes
})

// export { routes as }
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
export default router
