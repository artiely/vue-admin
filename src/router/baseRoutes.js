import loading from './loading'
export default [
  {
    path: '/lock',
    name: 'lock',
    component: loading('layouts/layout/lock.vue'),
    meta: {
      title: '页面锁定',
      hide: true
    }
  },
  {
    path: '*',
    name: 'notFount',
    component: loading('views/exception/404.vue'),
    meta: {
      title: '该页面不存在',
      hide: true
    }
  }
]
