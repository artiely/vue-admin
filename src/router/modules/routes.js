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
      },
      {
        path: '/crud',
        name: 'crud',
        component: loading('views/crud/crud.vue'),
        meta: {
          auth: true,
          title: '自动生成表单',
          icon: ''
        }
      },
      {
        path: '/table-demo1',
        name: 'table-demo1',
        component: loading('views/table-demo/table-demo1.vue'),
        meta: {
          auth: true,
          title: '自动生成表格',
          icon: ''
        }
      }
    ]
  },
  {
    path: '/i',
    name: 'live',
    component: Home,
    meta: {
      title: '现场管理'
    },
    children: [
      {
        path: '/index2',
        name: 'index2',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '首页',
          icon: ''
        }
      },
      {
        path: '/index3',
        name: 'index3',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '首页',
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
