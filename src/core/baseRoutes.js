import loader from './loader'
export default [
  {
    path: '/lock',
    name: 'lock',
    component: loader('layouts/layout/lock.vue'),
    meta: {
      title: '页面锁定',
      hide: true
    }
  },
  {
    path: '*',
    name: 'notFount',
    component: loader('views/exception/404.vue'),
    meta: {
      title: '该页面不存在',
      hide: true
    }
  }
]
