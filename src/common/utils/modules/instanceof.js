export function isFunction (func) {
  return Object.prototype.toString.call(func) === '[object Function]'
}
export function isObject (func) {
  return Object.prototype.toString.call(func) === '[object Object]'
}
export function isArray (func) {
  return Object.prototype.toString.call(func) === '[object Array]'
}
