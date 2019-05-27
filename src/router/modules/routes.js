import loading from '../loading'
import Home from '@/components/layout/default.vue'
export default [
  {
    path: '/',
    name: 'home',
    redirect: '/index',
    component: Home,
    meta: {
      title: '现场管理'
    },
    children: [
      {
        path: '/index',
        name: 'index',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '工作台',
          icon: ''
        }
      }
    ]
  },
  {
    path: '/i',
    name: 'home',
    component: Home,
    meta: {
      title: '现场管理'
    },
    children: [
      {
        path: '/index2',
        name: 'index',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '工作台',
          icon: ''
        }
      },
      {
        path: '/index3',
        name: 'index',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '工作台',
          icon: '',
          hide: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: loading('views/auth/login.vue'),
    meta: {
      title: '登录页',
      hide: true
    }
  }
]
