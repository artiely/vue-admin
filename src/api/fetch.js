import axios from 'axios'
import qs from 'qs'
import router from '@/router'
// import { Toast } from 'mand-mobile'
import { removeToken, getToken } from '@/common/utils/index'
const CancelToken = axios.CancelToken
let requestMap = new Map()
let prevTime = new Date().getTime()
let BASE_URL = process.env.VUE_APP_BASE_URL
console.log(
  '%c当前的环境是' + process.env.NODE_ENV,
  'font-size:24px;color:#fff;background:red'
)
console.log(
  '%c当前的基础路径是' + process.env.VUE_APP_BASE_URL,
  'font-size:24px;color:#fff;background:red'
)

window.addEventListener('offline', function (e) {
  this.$message.warning('当前网络已断开！')
})
export default function fetch (options, argu) {
  if (navigator && navigator.onLine) {
    // ...
  } else {
    this.$message.warning('请检查当前网络！')
  }
  // 100ms以内的重复请求都会被清空
  let nowTime = new Date().getTime()
  if (nowTime - prevTime >= 500) {
    requestMap = new Map()
  }
  // 赋值下一次请求的时间
  prevTime = nowTime
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/x-www-form-urlencoded'
    },
    validateStatus: function (status) {
      return status >= 200 && status <= 500 // default 国外标准restful需要
      // return status === 200
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
      // 防重复提交(100ms以内我们防止相同的请求提交)
      const keyString = qs.stringify(
        Object.assign({}, { url: config.url, data: config.data })
      )
      if (requestMap.get(keyString)) {
        config.cancelToken = new CancelToken(cancel => {
          console.error('当前被关闭的请求', config.url, config.data)
          cancel('请求重复')
        })
      }
      requestMap.set(keyString, true)
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
          this.$message.warning('请求超时，请检查网络是否连接正常')
        } else if (error.message && error.message === '请求重复') {
          console.error('请求重复')
          // ...
        } else {
          // 可以展示断网组件
          console.error('断网了')
          this.$message.warning('请求失败，请检查网络是否已连接')
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
            this.$message.warning(error.response.data.statuMessage)
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
            router.replace({ name: 'login' })
            removeToken('token')
          }
          resolve(res.data)
        } else if (res.status >= 500) {
          router.replace({ name: 'login' })
          removeToken('token')
        } else {
          let data = res.data ? res.data : res
          reject(data)
        }
        return false
      })
      .catch(error => {
        this.$message.warning('服务器繁忙，请稍后再试。')
        reject(error)
      })
  })
}
