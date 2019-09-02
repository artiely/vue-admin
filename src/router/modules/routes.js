import { loader } from '@core'
import { App, Home } from '@layouts'
export default [
  {
    path: '/',
    name: 'home',
    redirect: '/analysis',
    component: Home,
    meta: {
      title: '现场管理',
      icon: 'icon-shop_fill'
    },
    children: [
      // {
      //   path: '/index',
      //   name: 'index',
      //   component: loader('views/live/workspace.vue'),
      //   meta: {
      //     auth: true,
      //     title: '工作台',
      //     icon: 'icon-tasklist'
      //   }
      // },
      {
        path: 'http://www.baidu.com',
        meta: {
          auth: true,
          title: '跳转外链百度',
          icon: 'icon-tasklist'
        }
      },

      {
        path: '/workplace',
        name: 'workplace',
        component: loader('views/dashboard/workplace'),
        meta: {
          auth: true,
          title: 'workplace',
          icon: 'icon-mobilephone'
        }
      },
      {
        path: '/analysis',
        name: 'analysis',
        component: loader('views/dashboard/analysis'),
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
      title: '表格表单',
      icon: 'icon-redpacket'
    },
    children: [
      {
        path: '/crud',
        name: 'crud',
        component: loader('views/crud/crud.vue'),
        meta: {
          auth: true,
          title: '表单生成器',
          icon: 'icon-task'
        }
      },
      // {
      //   path: '/index2',
      //   name: 'index2',
      //   component: loader('views/live/workspace.vue'),
      //   meta: {
      //     auth: true,
      //     title: '首页',
      //     icon: 'icon-supply'
      //   }
      // },
      // {
      //   path: '/scrollbar',
      //   name: 'scrollbar',
      //   component: loader('views/live/scrollbar.vue'),
      //   meta: {
      //     auth: true,
      //     title: 'scrollbar',
      //     icon: 'icon-questions'
      //   }
      // },
      // {
      //   path: '/index3',
      //   name: 'index3',
      //   component: loader('views/live/workspace.vue'),
      //   meta: {
      //     auth: true,
      //     title: '首页',
      //     icon: 'icon-publishgoods_fill',
      //     hide: true
      //   }
      // },
      // {
      //   path: '/antd-table',
      //   name: 'antd-table',
      //   component: loader('views/live/antd-table.vue'),
      //   meta: {
      //     auth: true,
      //     title: '表格生成器',
      //     icon: 'icon-publishgoods_fill'
      //   }
      // },
      {
        path: '/antd-table-creater',
        name: 'antd-table-creater',
        component: loader('views/crud/antd-table-creater.vue'),
        meta: {
          auth: true,
          title: '表格生成器',
          icon: 'icon-publishgoods_fill'
        }
      },
      {
        path: '/antd-table-creater2',
        name: 'antd-table-creater2',
        component: loader('views/crud/antd-table-creater2.vue'),
        meta: {
          auth: true,
          title: '高级表格',
          icon: 'icon-publishgoods_fill'
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
        component: loader('views/result/error.vue'),
        meta: {
          title: '失败',
          icon: 'icon-warning'
        }
      },
      {
        path: '/success',
        name: 'success',
        component: loader('views/result/success.vue'),
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
        component: loader('views/auth/login.vue'),
        meta: {
          title: '登录页',
          icon: 'icon-addressbook'
        }
      },
      {
        path: '/login2',
        name: 'login2',
        component: loader('views/auth/login2.vue'),
        meta: {
          title: '登录页2',
          icon: 'icon-addressbook'
        }
      },
      {
        path: '/register',
        name: 'register',
        component: loader('views/auth/register.vue'),
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
        path: '/e403',
        name: 'e403',
        component: loader('packages/exception/403.vue'),
        meta: {
          title: '403',
          icon: 'icon-xiaomi'
        }
      },
      {
        path: '/e404',
        name: 'e404',
        component: loader('packages/exception/404.vue'),
        meta: {
          title: '404',
          icon: 'icon-xiaomi'
        }
      },
      {
        path: '/e500',
        name: 'e500',
        component: loader('packages/exception/500.vue'),
        meta: {
          title: '500',
          icon: 'icon-xiaomi'
        }
      },
      {
        path: '/e600',
        name: 'e600',
        component: loader('packages/exception/600.vue'),
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
        component: loader('views/user/user'),
        meta: {
          auth: true,
          title: 'userinfo',
          icon: 'icon-people'
        }
      },
      {
        path: '/todo',
        name: 'todo',
        component: loader('views/user/todo'),
        meta: {
          auth: true,
          title: 'todo',
          icon: 'icon-other'
        }
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: loader('views/user/calendar'),
        meta: {
          auth: true,
          title: 'calendar',
          icon: 'icon-createtask'
        }
      },
      {
        path: '/help',
        name: 'help',
        component: loader('views/user/help'),
        meta: {
          auth: true,
          title: 'help',
          icon: 'icon-customerservice'
        }
      },
      {
        path: '/handler-over',
        name: 'handler-over',
        component: loader('views/user/handler-over'),
        meta: {
          auth: true,
          title: 'handler-over',
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
        component: loader('views/tools/filter'),
        meta: {
          auth: true,
          title: '过滤器',
          icon: 'icon-shaixuan'
        }
      },
      {
        path: '/directive',
        name: 'directive',
        component: loader('views/tools/directive'),
        meta: {
          auth: true,
          title: '自定义指令',
          icon: 'icon-other'
        }
      }
    ]
  },
  {
    path: '/widgets-home',
    name: 'widgets-home',
    component: Home,
    meta: {
      auth: true,
      title: '组件使用',
      icon: 'icon-manage'
    },
    children: [
      {
        path: '/captcha',
        name: 'captcha',
        component: loader('views/widgets/captcha'),
        meta: {
          auth: true,
          title: '验证码组件',
          icon: 'icon-anquan'
        }
      },
      {
        path: '/amount',
        name: 'amount',
        component: loader('views/widgets/amount'),
        meta: {
          auth: true,
          title: '金额组件',
          icon: 'icon-yulebao'
        }
      },
      {
        path: '/iconbox',
        name: 'iconbox',
        component: loader('views/widgets/iconbox'),
        meta: {
          auth: true,
          title: '图标组件',
          icon: 'icon-eit'
        }
      },
      {
        path: '/avatar-group',
        name: 'avatar-group',
        component: loader('views/widgets/avatar-group'),
        meta: {
          auth: true,
          title: '头像组组件',
          icon: 'icon-emoji'
        }
      },
      {
        path: '/guide',
        name: 'guide',
        component: loader('views/widgets/guide'),
        meta: {
          auth: true,
          title: '向导组件',
          icon: 'icon-flag'
        }
      },
      {
        path: '/filterbox',
        name: 'filterbox',
        component: loader('views/widgets/filterbox'),
        meta: {
          auth: true,
          title: '筛选组件',
          icon: 'icon-shaixuan'
        }
      },
      {
        path: '/mask',
        name: 'mask',
        component: loader('views/widgets/mask'),
        meta: {
          auth: true,
          title: '格式化输入内容',
          icon: 'icon-shaixuan'
        }
      },
      {
        path: '/city-picker',
        name: 'city-picker',
        component: loader('views/widgets/city-picker'),
        meta: {
          auth: true,
          title: '城市选择器',
          icon: 'icon-supply'
        }
      }
    ]
  },
  {
    path: '/plugin-home',
    name: 'plugin-home',
    component: Home,
    meta: {
      auth: true,
      title: '插件使用',
      icon: 'icon-tools'
    },
    children: [
      {
        path: '/print',
        name: 'print',
        component: loader('views/plugin/print'),
        meta: {
          auth: true,
          title: '打印',
          icon: 'icon-weibiaoti526'
        }
      },
      {
        path: '/api-test',
        name: 'api-test',
        component: loader('views/plugin/api-test'),
        meta: {
          auth: true,
          title: '接口管理',
          icon: 'icon-supply'
        }
      },
      {
        path: '/amap',
        name: 'amap',
        component: loader('views/map/amap'),
        meta: {
          auth: true,
          title: '高德地图',
          icon: 'icon-supply'
        }
      }
    ]
  },
  {
    path: '/router-home',
    name: 'router-home',
    component: Home,
    meta: {
      auth: true,
      title: '路由嵌套',
      icon: 'icon-lubiaosignpost3'
    },
    children: [
      {
        path: '/print1',
        name: 'print1',
        component: loader('views/plugin/print'),
        meta: {
          auth: true,
          title: '一级菜单',
          icon: 'icon-lubiaosignpost3'
        },
        children: [
          {
            path: '/api-test1',
            name: 'api-test1',
            component: loader('views/plugin/api-test'),
            meta: {
              auth: true,
              title: '二级菜单',
              icon: 'icon-lubiaosignpost3'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/level1',
    name: 'level1',
    component: loader('views/widgets/level1'),
    meta: {
      auth: true,
      title: '一级可点击菜单',
      icon: 'icon-lubiaosignpost3'
    }
  }
]
