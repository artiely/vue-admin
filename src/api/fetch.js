import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import { removeToken, getToken } from '@/common/utils/index'

const CancelToken = axios.CancelToken
// 存储请求的映射
let requestMap = new Map()

// 是否成产环境
const PRODUCTION = process.env.VUE_APP_MODE === 'release' || process.env.VUE_APP_MODE === 'production'
// 获取基本的url通过打包模式区分
const MODE = process.env.VUE_APP_MODE
let BASE_URL = ''
switch (MODE) {
  case 'dev':
    BASE_URL = ''
    break
  case 'test':
    BASE_URL = ''
    break
  case 'release':
    BASE_URL = ''
    break
  case 'production':
    BASE_URL = ''
    break
}
console.log(
  '%c当前的环境是' + process.env.NODE_ENV,
  'font-size:24px;color:#fff;background:red'
)
console.log(
  '%c当前的模式是' + process.env.VUE_APP_MODE,
  'font-size:24px;color:#fff;background:red'
)
console.log(
  '%c当前的基础路径是' + BASE_URL,
  'font-size:24px;color:#fff;background:red'
)
window.addEventListener('offline', function (e) {
  // Toast.failed('当前网络已断开！')
})

export default function fetch(options, argu) {
  if (navigator && navigator.onLine) {
    // ...
  } else {
    // Toast.failed('请检查当前网络！')
    // return
  }
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/x-www-form-urlencoded'
    },
    validateStatus: function (status) {
      // return status >= 200 && status < 500 // default 国外标准restful需要
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
            status: 4
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
      // 断网 或者 请求超时 状态
      if (!error.response) {
        // 请求超时状态
        if (error.message && error.message.includes('timeout')) {
          console.error('超时了')
          // Toast.info('请求超时，请检查网络是否连接正常')
        } else if (error.message && error.message === '请求重复') {
          console.error('请求重复')
          // ...
        } else if (error.message && error.message.includes('cancel')) {
          console.error('请求被取消')
        } else {
          // 可以展示断网组件
          console.error('请求失败')
        }
        return Promise.reject(error)
      } else {
        const responseCode = error.response.data.status
        switch (responseCode) {
          case 4:
            // 跳转登录页
            router.replace({
              path: '/login'
            })
            removeToken()
            break
          default:
            // Toast.failed(error.response.data.statuMessage)
        }
        if (!PRODUCTION) {
          let url = error.response.config.url
          let params = error.response.config.data
          let code = error.response.status
          let status = error.response.data.status
          // 如果不是成产环境
          // Dialog.alert({
          //   title: '这是请求错误提示，只会出现在测试环境',
          //   content: `<div style="width:6rem;padding:.2rem;word-break: break-all">出错的url<p >${url}</p>参数<p >${params}</p>请求状态码<p>${code}</p>业务状态码<p>${status}</p></div>`,
          //   confirmText: '我知道了',
          //   onConfirm: () => console.log('[Dialog.failed] confirm clicked')
          // })
        }
        return Promise.reject(error)
      }
    }
  )

  // 请求处理
  return new Promise((resolve, reject) => {
    instance(options)
      .then(res => {
        if (res.status === 200) {
          if (res.data.status === 4) {
            router.replace({ name: 'login', params: { message: '您已在其他地方登录，或登录信息失效，请重新登录' } })
            removeToken('token')
          }
          resolve(res.data)
        } else if (res.status >= 500) {
          router.replace({ name: 'login', params: { message: '服务器繁忙，请稍后再试。' } })
          removeToken('token')
        } else {
          let data = res.data ? res.data : res
          reject(data)
        }
        return false
      })
      .catch(error => {
        console.error(`来自响应结果的错误:${error}`)
        reject(error)
      })
  })
}
