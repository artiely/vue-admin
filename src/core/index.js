// export { default as loader } from './loader'
import loader from './loader'
// console.log("TCL: loader>>>>>>>>>>>>>>>>", loader)
import { api, Api, apiSource } from './api'
import fetch from './fetch'
export { loader, api, Api, apiSource, fetch }
export { default as router, routes } from './router'
