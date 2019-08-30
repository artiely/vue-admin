import { notification } from 'ant-design-vue'
import configs from '@config'
import log from 'consola/src/browser'
// 是否生产环境
const PRODUCTION =
  process.env.VUE_APP_MODE === 'release' ||
  process.env.VUE_APP_MODE === 'production'

export default function errorHandler (error) {
  if (!error.response) {
    if (error.message && error.message.includes('timeout')) {
      log.error('超时了')
    } else if (error.message && error.message === '请求重复') {
      log.error('请求重复')
    } else if (error.message && error.message.includes('cancel')) {
      log.error('请求被取消')
    } else {
      log.error('请求失败', error)
    }
  } else {
    configs.api_error_handler && configs.api_error_handler(error)
    if (!PRODUCTION) {
      let url = error.response.config.url
      let params = error.response.config.data
      let code = error.response.status
      let status = error.response.data.status
      notification.error({
        message: '这是请求错误提示，只会出现在测试环境',
        duration: 0,
        description: h => (
          <div style="width:6rem;padding:.2rem;word-break: break-all">
            出错的url<p>{url}</p>参数<p>{params}</p>请求状态码<p>{code}</p>
            业务状态码<p>{status}</p>
          </div>
        ),
        onClick: () => {}
      })
    }
  }
}
