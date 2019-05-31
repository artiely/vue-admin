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
          title: 'crud',
          icon: ''
        }
      },
      {
        path: '/order-case',
        name: 'order-case',
        component: loading('views/order-case/order-case.vue'),
        meta: {
          auth: true,
          title: 'order-case',
          icon: ''
        }
      },
      {
        path: '/table-demo1',
        name: 'table-demo1',
        component: loading('views/table-demo/table-demo1.vue'),
        meta: {
          auth: true,
          title: 'table-demo1',
          icon: ''
        }
      },
      {
        path: '/table-demo2',
        name: 'table-demo2',
        component: loading('views/table-demo/table-demo2.vue'),
        meta: {
          auth: true,
          title: 'table-demo2',
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
