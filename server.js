var express = require('express')
var app = express()
var path = require('path')
app.use(express.static(path.join(__dirname, '/dist')))
var localhost = require('address').ip()
var opn = require('opn')
var proxy = require('http-proxy-middleware')
// var env = process.env.NODE_ENV || 'development'
// env = env.toLowerCase()
// 本地测试环境staging
let port = 3999
let options = {
  target: 'http://192.168.2.242:8091', // 测试
  // target: 'http://dppre.51chebian.com', // 预生产
  // target: 'http://192.168.2.201:8091',
  // target: 'http://192.168.2.138:8091',
  changeOrigin: true // 需要虚拟主机站点
}
let exampleProxy = proxy(options) // 开启代理功能，并加载配置
app.use('/store', exampleProxy) // 对地址为’/‘的请求全部转发
app.listen(port, () => {
  var uri = `http://${localhost}:${port}`
  console.log(uri)
  opn(uri)
})
