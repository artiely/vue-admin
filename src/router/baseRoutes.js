import loading from './loading'
export default [
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
