import router from '@/router'
import { removeToken } from '@/common/utils/index'
// 是否生产环境
const PRODUCTION = process.env.VUE_APP_MODE === 'release' || process.env.VUE_APP_MODE === 'production'

export default function errorHandler (error) {
  // 断网 或者 请求超时 状态
  if (!error.response) {
    // 请求超时状态
    if (error.message && error.message.includes('timeout')) {
      console.error('超时了')
    } else if (error.message && error.message === '请求重复') {
      console.error('请求重复')
    } else if (error.message && error.message.includes('cancel')) {
      console.error('请求被取消')
    } else {
      // 可以展示断网组件
      console.error('请求失败')
    }
  } else {
    const responseCode = error.response.data.status
    switch (responseCode) {
      case 4:
        // 跳转登录页
        router.replace({ name: 'login', params: { message: '您已在其他地方登录，或登录信息失效，请重新登录' } })
        removeToken()
        break
      default:
    }
    if (!PRODUCTION) {
      let url = error.response.config.url
      let params = error.response.config.data
      let code = error.response.status
      let status = error.response.data.status
      // 如果不是成产环境
      this.$notification.open({
        message: '这是请求错误提示，只会出现在测试环境',
        description: `<div style="width:6rem;padding:.2rem;word-break: break-all">出错的url<p >${url}</p>参数<p >${params}</p>请求状态码<p>${code}</p>业务状态码<p>${status}</p></div>`,
        onClick: () => {
          console.log('Notification Clicked!')
        }
      })
    }
  }
}
