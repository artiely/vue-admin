/**
 * 支持断网提示
 * 请求取消
 * __noCancel字段可以让特殊的请求不被取消
 * 注意：取消请求并没有真正取消发送至服务的请求，而是取消了改请求的结果的处理，而且在B端产品中一般
 */
import axios from 'axios'
import qs from 'qs'
import { getToken } from '@/common/utils/index'
import BASE_URL from './base-url'
import errorHandler from './error-handler'
const CancelToken = axios.CancelToken
// 存储请求的映射
let requestMap = new Map()

window.addEventListener('offline', function (e) {
  this.$message.warning('当前网络已断开！')
})

export default function fetch (options, argu) {
  if (navigator && navigator.onLine) {
    // ...
  } else {
    this.$message.warning('请检查当前网络！')
  }
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/x-www-form-urlencoded'
    },
    validateStatus: function (status) {
      // return status >= 200 && status < 500 // default 标准restful需要
      return status === 200
    },
    responseType: 'json',
    responseEncoding: 'utf8', // default
    maxRedirects: 15, // default
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [
      data => {
        // 此处可以拦截某些状态做相应处理(如果返回数据为null就返回状态 4 直接到登录页)
        if (data) {
          return data
        } else {
          return {
            status: 500
          }
        }
      }
    ],
    timeout: 10000, // default is `0` (no timeout)
    withCredentials: false // default
  })

  /**
   * 请求前拦截
   * 用于处理需要在请求前的操作
   */

  instance.interceptors.request.use(
    config => {
      // 防重复提交(以最后也就是最新的一次请求为准)
      // 当前请求的地址 作为key
      const keyString = qs.stringify(Object.assign({}, { url: config.url }))
      // 如果存在相同的请求就关闭前面的请求（假设他还在请求中）
      if (requestMap.has(keyString)) {
        // 取消请求 当前配置传递到message
        requestMap.get(keyString)('请求重复', config)
        // 取消后不用删除被取消的记录 Map 对象相同的 key 会覆盖，及时之前的请求已经完成再次取消也是没有关系的只不过会走一次 catch
      }
      // 给每一个请求加上cancel token
      config.cancelToken = new CancelToken(cancel => {
        // 有__noCancel属性的请求不取消
        if (!config.data.__noCancel) {
          requestMap.set(keyString, cancel)
        }
      })

      Object.assign(config, { _keyString: keyString })

      let { token, storeid } = getToken()
      if (token) {
        config.headers.token = `${token}`
        config.headers.storeid = `${storeid}`
      }
      config.data = qs.stringify(config.data, {
        arrayFormat: 'indices',
        allowDots: true
      })

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  /**
   * 请求响应拦截
   * 用于处理需要在请求返回后的操作
   */

  instance.interceptors.response.use(
    response => {
      const responseCode = response.status
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      if (responseCode === 200) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    },
    error => {
      errorHandler(error)
    }
  )

  // 请求处理
  return new Promise((resolve, reject) => {
    instance(options)
      .then(res => {
        resolve(res.data)
        return false
      })
      .catch(error => {
        console.error(`来自响应结果的错误:${error}`)
        reject(error)
      })
  })
}
