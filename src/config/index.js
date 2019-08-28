import router from '@router'
import utils from '@utils'
import qs from 'qs'
console.log(
  '%c当前的环境是' + process.env.NODE_ENV,
  'font-size:24px;color:#fff;background:red'
)
console.log(
  '%c当前的模式是' + process.env.VUE_APP_MODE,
  'font-size:24px;color:#fff;background:red'
)

const MODE = process.env.VUE_APP_MODE
let BASE_URL = ''
switch (MODE) {
  case 'dev':
    // 开发模式一般为空
    BASE_URL = 'api/'
    break
  case 'test':
    // 本地测试模式
    BASE_URL = 'api/'
    break
  case 'production':
    // 线上测试
    BASE_URL = 'api/'
    break
  case 'release':
    // 发版
    BASE_URL = 'api/'
    break
}
export default {
  // api请求地址的根路径
  api_url: BASE_URL,

  api_timeout: 10000,
  api_header: {
    'Cache-Control': 'no-cache',
    'Content-type': 'application/x-www-form-urlencoded'
  },
  //   设置请求头
  api_set_config: config => {
    config.data = qs.stringify(config.data, {
      arrayFormat: 'indices',
      allowDots: true
    })
    return config
  },
  //   请求错误自定义
  api_error_handler: error => {
    const responseCode = error.response.data.status
    switch (responseCode) {
      case 4:
        router.replace({
          name: 'login',
          params: { message: '您已在其他地方登录，或登录信息失效，请重新登录' }
        })
        utils.removeToken()
        break
      default:
    }
  },
  //   请求之前的处理（如判断当前是否有网络等）
  api_before_fetch: () => {
    if (!navigator.onLine) {
      this.$message.warning('请检查当前网络！')
    }
  },
  //   是否开启路由鉴权
  router_auth: true,
  router_before_each: (to, from, next) => {
  // let { token } = getToken()
  // if (to.meta.auth) {
  //   // 有用户信息
  //   if (token) {
  //     next({
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   } else {
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   }
  // } else {
  //   next()
  // }
    next()
  }
}
