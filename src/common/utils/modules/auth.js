// 移出登录信息
export function removeToken () {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('storeid')
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

export function getVersion () {
  return ''
}
