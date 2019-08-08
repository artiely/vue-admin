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
      icon: 'icon-shop_fill'
    },
    children: [
      {
        path: '/index',
        name: 'index',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '工作台',
          icon: 'icon-tasklist'
        }
      },
      {
        path: '/crud',
        name: 'crud',
        component: loading('views/crud/crud.vue'),
        meta: {
          auth: true,
          title: '自动生成表单',
          icon: 'icon-task'
        }
      },
      {
        path: '/table-demo1',
        name: 'table-demo1',
        component: loading('views/table-demo/table-demo1.vue'),
        meta: {
          auth: true,
          title: '自动生成表格',
          icon: 'icon-shielding'
        }
      },
      {
        path: '/table-demo2',
        name: 'table-demo2',
        component: loading('views/table-demo/table-demo2.vue'),
        meta: {
          auth: true,
          title: '表格表单一起',
          icon: 'icon-order'
        }
      },
      {
        path: '/table-ele',
        name: 'table-ele',
        component: loading('views/table-demo/table-ele.vue'),
        meta: {
          auth: true,
          title: '表格ele',
          icon: 'icon-order'
        }
      },
      {
        path: '/workplace',
        name: 'workplace',
        component: loading('views/dashboard/workplace'),
        meta: {
          auth: true,
          title: 'workplace',
          icon: 'icon-mobilephone'
        }
      },
      {
        path: '/analysis',
        name: 'analysis',
        component: loading('views/dashboard/analysis'),
        meta: {
          auth: true,
          title: 'analysis',
          icon: 'icon-picture'
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
      icon: 'icon-redpacket'
    },
    children: [
      {
        path: '/index2',
        name: 'index2',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '首页',
          icon: 'icon-supply'
        }
      },
      {
        path: '/scrollbar',
        name: 'scrollbar',
        component: loading('views/live/scrollbar.vue'),
        meta: {
          auth: true,
          title: 'scrollbar',
          icon: 'icon-questions'
        }
      },
      {
        path: '/index3',
        name: 'index3',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,
          title: '首页',
          icon: 'icon-publishgoods_fill',
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
      icon: 'icon-warning'
    },
    children: [
      {
        path: '/error',
        name: 'error',
        component: loading('views/result/error.vue'),
        meta: {
          title: '失败',
          icon: 'icon-warning'
        }
      },
      {
        path: '/success',
        name: 'success',
        component: loading('views/result/success.vue'),
        meta: {
          title: '成功',
          icon: 'icon-task'
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
      icon: 'icon-zhiwen'
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: loading('views/auth/login.vue'),
        meta: {
          title: '登录页',
          icon: 'icon-addressbook'
        }
      },
      {
        path: '/register',
        name: 'register',
        component: loading('views/auth/register.vue'),
        meta: {
          title: '注册页',
          icon: 'icon-addpeople'
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
      icon: 'icon-delete'
    },
    children: [
      {
        path: '/403',
        name: '403',
        component: loading('views/exception/403.vue'),
        meta: {
          title: '403',
          icon: 'icon-xiaomi'
        }
      },
      {
        path: '/404',
        name: '404',
        component: loading('views/exception/404.vue'),
        meta: {
          title: '404',
          icon: 'icon-xiaomi'
        }
      },
      {
        path: '/500',
        name: '500',
        component: loading('views/exception/500.vue'),
        meta: {
          title: '500',
          icon: 'icon-xiaomi'
        }
      },
      {
        path: '/600',
        name: '600',
        component: loading('views/exception/600.vue'),
        meta: {
          title: '路由配置错误',
          icon: 'icon-xiaomi'
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
      icon: 'icon-mine'
    },
    children: [
      {
        path: '/userinfo',
        name: 'userinfo',
        component: loading('views/user/user'),
        meta: {
          auth: true,
          title: 'userinfo',
          icon: 'icon-people'
        }
      },
      {
        path: '/todo',
        name: 'todo',
        component: loading('views/user/todo'),
        meta: {
          auth: true,
          title: 'todo',
          icon: 'icon-other'
        }
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: loading('views/user/calendar'),
        meta: {
          auth: true,
          title: 'calendar',
          icon: 'icon-createtask'
        }
      },
      {
        path: '/help',
        name: 'help',
        component: loading('views/user/help'),
        meta: {
          auth: true,
          title: 'help',
          icon: 'icon-customerservice'
        }
      }
    ]
  },
  {
    path: '/tools-home',
    name: 'tools-home',
    component: Home,
    meta: {
      auth: true,
      title: '工具使用',
      icon: 'icon-decoration_fill'
    },
    children: [
      {
        path: '/filter',
        name: 'filter',
        component: loading('views/tools/filter'),
        meta: {
          auth: true,
          title: '过滤器',
          icon: 'icon-people'
        }
      },
      {
        path: '/directive',
        name: 'directive',
        component: loading('views/tools/directive'),
        meta: {
          auth: true,
          title: '自定义指令',
          icon: 'icon-other'
        }
      }
    ]
  }
]
