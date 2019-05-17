import fetch from './fetch'
function initApi (argu) {
  const apiContext = require.context('./modules/', true, /\.js$/)
  let apiList = []

  apiContext.keys().forEach(api => {
    const apiModle = apiContext(api)
    apiList = { ...apiList, ...(apiModle.default || apiModle) }
  })

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
export { api, Api }
