import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import utils from '@/common/utils'
let { getVersion } = utils
Vue.use(Vuex)

const storeContext = require.context('@store/modules', true, /\.js$/)
let modules = {}
storeContext.keys().forEach(vuex => {
  const storeModle = storeContext(vuex)
  let store = vuex.split('/')
  let name = store[store.length - 1].split('.js')[0]
  let namespace = {}
  namespace[name] = storeModle.default
  modules = { ...modules, ...namespace }
})

let __VERSION = getVersion()
const store = new Vuex.Store({
  modules: modules,
  plugins: [
    createLogger(),
    createPersistedState({
      // key = 版本号
      key: __VERSION,
      storage: window.sessionStorage
    })
  ]
})
export default store
