
// 获取基本的url通过打包模式区分
const MODE = process.env.VUE_APP_MODE
let BASE_URL = ''
switch (MODE) {
  case 'dev':
    // 开发模式一般为空
    BASE_URL = 'api/'
    break
  case 'test':
    // 本地测试模式
    BASE_URL = ''
    break
  case 'production':
    // 线上测试
    BASE_URL = ''
    break
  case 'release':
    // 发版
    BASE_URL = ''
    break
}
console.log(
  '%c当前的环境是' + process.env.NODE_ENV,
  'font-size:24px;color:#fff;background:red'
)
console.log(
  '%c当前的模式是' + process.env.VUE_APP_MODE,
  'font-size:24px;color:#fff;background:red'
)
console.log(
  '%c当前的基础路径是' + BASE_URL,
  'font-size:24px;color:#fff;background:red'
)

export default BASE_URL
