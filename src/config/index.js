import router from '@router'
import utils from '@utils'
import qs from 'qs'
export default {
  // api请求地址的根路径
  api_url: 'api/',

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
  routes_auth: true
}
