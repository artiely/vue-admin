const path = require('path')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')
const SentryPlugin = require('@sentry/webpack-plugin')
// 主题插件
const options = {
  antDir: path.join(__dirname, './node_modules/ant-design-vue'),
  // src下的样式都打包到一起
  stylesDir: path.join(__dirname, './src'),
  varFile: path.join(
    __dirname,
    './node_modules/ant-design-vue/lib/style/themes/default.less'
  ),
  // mainLessFile: path.join(__dirname, './src/styles/index.less'),
  mainLessFile: '',
  themeVariables: ['@primary-color'],
  indexFileName: false,
  generateOnce: false,
  lessUrl: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js',
  publicPath: ''
}
exports.themePlugin = new AntDesignThemePlugin(options)
// 骨架插件
exports.skeleton = new SkeletonWebpackPlugin({
  webpackConfig: {
    entry: {
      app: path.join(__dirname, './src/plugins/skeleton.js')
    }
  },
  minimize: true,
  quiet: true
})

// 自定义压缩配置
exports.uglifyJsPlugin = new UglifyJsPlugin({
  uglifyOptions: {
    warnings: false,
    compress: {
      drop_debugger: true,
      drop_console: true
    }
  },
  sourceMap: false,
  parallel: true
})
// 打包生产.gz包
const productionGzipExtensions = ['js', 'css']
exports.compressionWebpackPlugin = new CompressionWebpackPlugin({
  algorithm: 'gzip',
  test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
  threshold: 10240,
  minRatio: 0.8
})
// 对打包文件进行压缩
exports.zipPlugin = new ZipPlugin({
  path: path.join(__dirname, 'dist'),
  filename: 'dist.zip'
})
exports.sentryPlugin = new SentryPlugin({
  include: './dist',
  release: process.env.VUE_APP_VERSION,
  configFile: 'sentry.properties',
  urlPrefix: '~/android_asset/dist/',
  ignore: ['dist.zip']
})
