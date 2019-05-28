# 路由配置相关说明
```js
;[
  {
    path: '/', // 页面跳转路径必须唯一
    name: 'home', // 页面的name值，与view下的每个.vue的name一一对应用于缓存等场景
    redirect: '/index',
    component: Home, // 一级菜单的组件均为Home
    meta: {
      title: '现场管理'// 用于菜单的名字，面包屑和选项卡
    },
    children: [
      {
        path: '/index',
        name: 'index',
        component: loading('views/live/workspace.vue'),
        meta: {
          auth: true,//表示是否需要登录才能访问的页面
          title: '工作台',
          icon: '' // 菜单的icon
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
      hide: true // 是否展示在菜单中
    }
  }
]
```
