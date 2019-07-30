import loading from '../loading'
import Home from '@/components/layout/default.vue'
console.log('TCL: Home', Home)
export default [
  {
    path: '/',
    name: 'home',
    redirect: '/index',
    component: Home,
    meta: {
      title: '现场管理',
      icon: 'weibo'
    },
    children: [
      {
        path: '/index',
        name: 'index',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '工作台',
          icon: 'android'
        }
      },
      {
        path: '/crud',
        name: 'crud',
        component: loading('views/crud/crud.vue'),
        meta: {
          auth: true,
          title: '自动生成表单',
          icon: 'apple'
        }
      },
      {
        path: '/table-demo1',
        name: 'table-demo1',
        component: loading('views/table-demo/table-demo1.vue'),
        meta: {
          auth: true,
          title: '自动生成表格',
          icon: 'windows'
        }
      },
      {
        path: '/table-demo2',
        name: 'table-demo2',
        component: loading('views/table-demo/table-demo2.vue'),
        meta: {
          auth: true,
          title: '表格表单一起',
          icon: 'ie'
        }
      },
      {
        path: '/table-ele',
        name: 'table-ele',
        component: loading('views/table-demo/table-ele.vue'),
        meta: {
          auth: true,
          title: '表格ele',
          icon: 'ie'
        }
      },
      {
        path: '/workplace',
        name: 'workplace',
        component: loading('views/dashboard/workplace'),
        meta: {
          auth: true,
          title: 'workplace',
          icon: 'laptop'
        }
      },
      {
        path: '/analysis',
        name: 'analysis',
        component: loading('views/dashboard/analysis'),
        meta: {
          auth: true,
          title: 'analysis',
          icon: 'line-chart'
        }
      }
    ]
  },
  {
    path: '/i',
    name: 'live',
    component: Home,
    meta: {
      title: '现场管理',
      icon: 'dingding'
    },
    children: [
      {
        path: '/index2',
        name: 'index2',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '首页',
          icon: 'chrome'
        }
      },
      {
        path: '/index3',
        name: 'index3',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '首页',
          icon: 'github',
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
