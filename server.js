var express = require('express')
var app = express()
var path = require('path')
app.use(express.static(path.join(__dirname, '/dist')))
var localhost = require('address').ip()
// const spdy = require('spdy')
var opn = require('opn')
const https = require('https')
const http = require('http')
const fs = require('fs')
var proxy = require('http-proxy-middleware')
const http2options = {
  key: fs.readFileSync(path.resolve(__dirname, './key/3140499_08tj.com.key')),
  cert: fs.readFileSync(path.resolve(__dirname, './key/3140499_08tj.com.pem'))
}
// const h2options = {
//   key: fs.readFileSync(__dirname + '../key/server.key'),
//   cert:  fs.readFileSync(__dirname + '../key/server.crt')
// }
let options = {
  target: 'https://www.easy-mock.com/mock/5d5b9eddaf6abb3d1b4270ad', // 测试
  changeOrigin: true // 需要虚拟主机站点
}
// spdy
//   .createServer(h2options, app).listen('80',()=>{
//     var uri = `http://${localhost}:80`
//     console.log(uri)
//     opn(uri)
//   })

let exampleProxy = proxy(options) // 开启代理功能，并加载配置
app.use('/api', exampleProxy) // 对地址为`/api`的请求全部转发
https
  .createServer(http2options, app).listen('443', () => {
    var uri = `http://${localhost}:443`
    console.log(uri)
    opn(uri)
  })
http.createServer(app).listen('80', () => {
  var uri = `http://${localhost}:80`
  console.log(uri)
  opn(uri)
})
