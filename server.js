var express = require('express')
var app = express()
var path = require('path')
app.use(express.static(path.join(__dirname, '/dist')))
var localhost = require('address').ip()
var opn = require('opn')
const spdy = require('spdy')
const fs = require('fs')
var proxy = require('http-proxy-middleware')
let port = 3999
const http2options = {
  key: fs.readFileSync(path.resolve(__dirname , '../../http2-key/server.key') ),
  cert: fs.readFileSync(path.resolve(__dirname , '../../http2-key/server.crt'))
}
let options = {
  target: 'https://www.easy-mock.com/mock/5d5b9eddaf6abb3d1b4270ad', // 测试
  changeOrigin: true // 需要虚拟主机站点
}

let exampleProxy = proxy(options) // 开启代理功能，并加载配置
app.use('/api', exampleProxy) // 对地址为`/api`的请求全部转发
spdy
  .createServer(http2options, app).listen(port, () => {
  var uri = `http://${localhost}:${port}`
  console.log(uri)
  opn(uri)
})
