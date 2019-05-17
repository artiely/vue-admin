import loading from '../loading'
export default [
  {
    path: '/',
    name: 'home',
    redirect: '/index',
    component: loading('components/layout/default.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: loading('views/About.vue'),
        meta: {
          auth: true,
          title: '关于',
          icon: ''
        }
      }
    ]
  }
]
