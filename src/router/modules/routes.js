import loading from '../loading'
import Home from '@/components/layout/default.vue'
import App from '@/App.vue'
console.log('TCL: Home', Home)
export default [
  {
    path: '/',
    name: 'home',
    redirect: '/index',
    component: Home,
    meta: {
      title: '现场管理',
      icon: 'icon-xiaoxi'
    },
    children: [
      {
        path: '/index',
        name: 'index',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '工作台',
          icon: 'icon-zuanshi'
        }
      },
      {
        path: 'crud',
        name: 'crud',
        component: loading('views/crud/crud.vue'),
        meta: {
          auth: true,
          title: '自动生成表单',
          icon: 'icon-xunzhang'
        }
      },
      {
        path: '/table-demo1',
        name: 'table-demo1',
        component: loading('views/table-demo/table-demo1.vue'),
        meta: {
          auth: true,
          title: '自动生成表格',
          icon: 'icon-xiangji'
        }
      },
      {
        path: '/table-demo2',
        name: 'table-demo2',
        component: loading('views/table-demo/table-demo2.vue'),
        meta: {
          auth: true,
          title: '表格表单一起',
          icon: 'icon-wenjianjia'
        }
      },
      {
        path: '/table-ele',
        name: 'table-ele',
        component: loading('views/table-demo/table-ele.vue'),
        meta: {
          auth: true,
          title: '表格ele',
          icon: 'icon-dengpao'
        }
      },
      {
        path: '/workplace',
        name: 'workplace',
        component: loading('views/dashboard/workplace'),
        meta: {
          auth: true,
          title: 'workplace',
          icon: 'icon-xiangce'
        }
      },
      {
        path: '/analysis',
        name: 'analysis',
        component: loading('views/dashboard/analysis'),
        meta: {
          auth: true,
          title: 'analysis',
          icon: 'icon-dingdan'
        }
      }
    ]
  },
  {
    path: '/live-home',
    name: 'live-home',
    component: Home,
    meta: {
      title: '现场管理',
      icon: 'icon-gangbi'
    },
    children: [
      {
        path: '/index2',
        name: 'index2',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '首页',
          icon: 'icon-dianzan'
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
    path: '/result-home',
    name: 'result-home',
    component: Home,
    meta: {
      title: '结果页',
      icon: 'icon-gangbi'
    },
    children: [
      {
        path: '/error',
        name: 'error',
        component: loading('views/result/error.vue'),
        meta: {
          title: '失败',
          icon: 'icon-dianzan'
        }
      },
      {
        path: '/success',
        name: 'success',
        component: loading('views/result/success.vue'),
        meta: {
          title: '成功',
          icon: 'github'
        }
      }
    ]
  },
  {
    path: '/auth-home',
    name: 'auth-home',
    component: App,
    meta: {
      title: '鉴权页',
      icon: 'icon-gangbi'
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: loading('views/auth/login.vue'),
        meta: {
          title: '登录页',
          icon: 'icon-dianzan'
        }
      },
      {
        path: '/register',
        name: 'register',
        component: loading('views/auth/register.vue'),
        meta: {
          title: '注册页',
          icon: 'github'
        }
      }
    ]
  },
  {
    path: '/error-home',
    name: 'error-home',
    component: App,
    meta: {
      title: '错误页',
      icon: 'icon-gangbi'
    },
    children: [
      {
        path: '/403',
        name: '403',
        component: loading('views/exception/403.vue'),
        meta: {
          title: '403'
        }
      },
      {
        path: '/404',
        name: '404',
        component: loading('views/exception/404.vue'),
        meta: {
          title: '404'
        }
      },
      {
        path: '/500',
        name: '500',
        component: loading('views/exception/500.vue'),
        meta: {
          title: '500'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Home,
    meta: {
      auth: true,
      title: '用户中心',
      icon: 'ant-design',
      hidden: true
    },
    children: [
      {
        path: '/userinfo',
        name: 'userinfo',
        component: loading('views/user/user'),
        meta: {
          auth: true,
          title: 'userinfo',
          icon: 'line-chart',
          hidden: true
        }
      },
      {
        path: '/todo',
        name: 'todo',
        component: loading('views/user/todo'),
        meta: {
          auth: true,
          title: 'todo',
          icon: 'line-chart'
        }
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: loading('views/user/calendar'),
        meta: {
          auth: true,
          title: 'calendar',
          icon: 'line-chart'
        }
      },
      {
        path: '/help',
        name: 'help',
        component: loading('views/user/help'),
        meta: {
          auth: true,
          title: 'help',
          icon: 'line-chart'
        }
      }
    ]
  }
]
