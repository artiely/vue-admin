import fetch from './fetch'
let apiSource = {}
function initApi (argu) {
  const apiContext = require.context('./modules/', true, /\.js$/)
  let apiList = []

  apiContext.keys().forEach(api => {
    const apiModle = apiContext(api)
    apiList = { ...apiList, ...(apiModle.default || apiModle) }
  })
  apiSource = apiList
  let apiNameList = Object.keys(apiList)
  let obj = {}
  apiNameList.map(v => {
    obj[v] = params => {
      let oldData = apiList[v].defaultData || {}
      let newParams = params || {}
      apiList[v].data = { ...oldData, ...newParams }
      return fetch(apiList[v], argu)
    }
  })
  return obj
}
let apiList = initApi()
let api = { ...apiList }
const Api = function (Vue) {
  if (Api.installed) return
  Api.installed = true
  Object.defineProperties(Vue.prototype, {
    $api: {
      get () {
        return api
      }
    }
  })
}
/**
 * Api是vue注册的组件 在vue实例中通过this.$api访问
 * api是在非vue实例即js环境中使用 通 api.xxx 访问
 * apiSource是未处理的接口源数据 主要暴露给api管理模块
 */
export { api, Api, apiSource }
