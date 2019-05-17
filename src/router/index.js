import Vue from 'vue'
import Router from 'vue-router'
// import { getToken } from '@/common/utils'
Vue.use(Router)

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

export default router
