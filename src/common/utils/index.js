/**
 * 一个文件一个函数
 */
import './modules/animate'
const toolContext = require.context('./modules/', true, /\.js$/)
let utils = {}
toolContext.keys().forEach(tool => {
  const toolModle = toolContext(tool)
  utils = { ...utils, ...(toolModle.default || toolModle) }
})

export default utils
console.log('TCL: utils>>>>>>>>>>>>>>>>>>>>', utils)
// class utils
// document.addEventListener('visibilitychange', function () {
//   // 浏览器切换事件
//   if (document.visibilityState === 'hidden') {
//     document.title = '车边（冻结）'
//   } else {
//     document.title = '车边'
//     window.location.reload()
//   }
// })
