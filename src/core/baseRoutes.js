import loader from './loader'
import App from '../layouts/App.vue'
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
    path: '/sys-error',
    name: 'sys-error',
    component: App,
    meta: {
      title: '错误页',
      icon: 'icon-delete',
      hide: true
    },
    children: [
      {
        path: '/403',
        name: '403',
        component: loader('packages/exception/403.vue'),
        meta: {
          title: '403',
          icon: 'icon-xiaomi'
        }
      },
      {
        path: '/404',
        name: '404',
        component: loader('packages/exception/404.vue'),
        meta: {
          title: '404',
          icon: 'icon-xiaomi'
        }
      },
      {
        path: '/500',
        name: '500',
        component: loader('packages/exception/500.vue'),
        meta: {
          title: '500',
          icon: 'icon-xiaomi'
        }
      },
      {
        path: '/600',
        name: '600',
        component: loader('packages/exception/600.vue'),
        meta: {
          title: '路由配置错误',
          icon: 'icon-xiaomi'
        }
      }
    ]
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
