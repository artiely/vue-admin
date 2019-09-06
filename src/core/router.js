import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import { anthNavTabs } from '@layouts'
import baseRoutes from './baseRoutes'
import configs from '@config'
import path from 'path'
Vue.use(Router)
NProgress.configure({
  showSpinner: false
})
let routes = []
const routerContext = require.context('@router/modules', true, /\.js$/)
routerContext.keys().forEach(route => {
  const routerModle = routerContext(route)
  routes = [...routes, ...(routerModle.default || routerModle), ...baseRoutes]
})
console.log(path.resolve(__dirname, 'src/utils'))

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes
})
// router.addRoutes(routes)
// 将路由处理成菜单

router.beforeEach((to, from, next) => {
  // 第一步鉴权
  // 第二步写入navtabs
  // layout.homeReload=true
  NProgress.start()
  if (configs.router_auth) {
    configs.router_before_each(to, from, next)
  } else {
    next()
  }
  anthNavTabs(to)
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export { routes }
export default router
