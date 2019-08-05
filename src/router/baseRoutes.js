import loading from './loading'
// import Layout from '@/components/layout/default.vue'
// console.log('TCL: Layout', Layout)
export default [
  // {
  //   path: "/base",
  //   name: "base",
  //   component: Layout,
  //   meta: {
  //     title: "基本路由",
  //     icon: "dingding",
  //     hide: true
  //   },
  //   children: [
  //     {
  //       path: "/redirect",
  //       name: "redirect",
  //       component: loading("components/layout/redirect.vue"),
  //       meta: {
  //         title: "重定向",
  //         hide: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/redirect',
    name: 'redirect',
    component: loading('components/layout/redirect.vue'),
    meta: {
      title: '重定向',
      hide: true
    }
  },
  {
    path: '/lock',
    name: 'lock',
    component: loading('components/layout/lock.vue'),
    meta: {
      title: '页面锁定',
      hide: true
    }
  }
  // {
  //   path: "/*",
  //   name: "notFount",
  //   // component: loading("views/auth/notFount.vue"),
  //   redirect:'/index',
  //   meta: {
  //     title: "该页面不存在",
  //     hide: true
  //   }
  // }
]
