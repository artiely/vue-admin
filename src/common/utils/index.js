// 获取版本号
export function getVersion () {
  let localVersion = process.env.VUE_APP_VERSION
  var __VERSION = localVersion || '3.0.0.0'
  return __VERSION
}
// 移出登录信息
export function removeToken () {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('storeid')
  window.sessionStorage.removeItem(getVersion())
}

// 设置登录信息
export function setToken (params) {
  window.localStorage.setItem('token', params.token)
  window.localStorage.setItem('storeid', params.storeid)
}
// 获取登录信息
export function getToken () {
  let token = localStorage.getItem('token') || ''
  let storeid = localStorage.getItem('storeid') || ''
  return { token, storeid }
}

export function isFunction (func) {
  return Object.prototype.toString.call(func) === '[object Function]'
}
export function isObject (func) {
  return Object.prototype.toString.call(func) === '[object Object]'
}
// document.addEventListener('visibilitychange', function () {
//   // 浏览器切换事件
//   if (document.visibilityState === 'hidden') {
//     document.title = '车边（冻结）'
//   } else {
//     document.title = '车边'
//     window.location.reload()
//   }
// })

let fontSize = parseFloat(document.querySelector('html').style.fontSize)
export function pxtorem (val) {
  return parseFloat(val) / fontSize + 'rem'
};
