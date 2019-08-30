// export { default as loader } from './loader'
import loader from './loader'
// console.log("TCL: loader>>>>>>>>>>>>>>>>", loader)
import { api, Api, apiSource } from './api'
import fetch from './fetch'
import store from './store'
export { loader, api, Api, apiSource, fetch, store }
export { default as router, routes } from './router'
