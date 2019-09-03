const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
// const webpack = require('webpack')
// const SentryPlugin = require('@sentry/webpack-plugin')
var ZipPlugin = require('zip-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)
const isProduction = process.env.NODE_ENV === 'production'

// const darkTheme = require('./theme/dark')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
// const theme = require('./theme/dark')
const options = {
  antDir: path.join(__dirname, './node_modules/ant-design-vue'),
  // src下的样式都打包到一起
  stylesDir: path.join(__dirname, './src'),
  varFile: path.join(__dirname, './node_modules/ant-design-vue/lib/style/themes/default.less'),
  // mainLessFile: path.join(__dirname, './src/styles/index.less'),
  mainLessFile: '',
  themeVariables: ['@primary-color'],
  indexFileName: false,
  generateOnce: false,
  lessUrl: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js',
  publicPath: ''
}

const themePlugin = new AntDesignThemePlugin(options)

const skeleton = new SkeletonWebpackPlugin({
  webpackConfig: {
    entry: {
      app: path.join(__dirname, './src/plugins/skeleton.js')
    }
  },
  minimize: true,
  quiet: true
})

const cdn = {
  css: [],
  js: []
}
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // modifyVars: {
        //   'primary-color': '#1DA57A',
        //   'link-color': '#1DA57A',
        //   'border-radius-base': '4px',
        //   'input-border-color': '#e2e5ec'
        // },
        // modifyVars: darkTheme,
        javascriptEnabled: true
      }
    }
  },
  // 打包到dist文件下
  outputDir: 'dist',
  publicPath: './',
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 静态资源目录
  assetsDir: 'static',
  configureWebpack: config => {
    config.plugins.push(themePlugin, skeleton)
    if (isProduction) {
      // config.externals = {
      // vue: 'Vue',
      // 'vue-router': 'VueRouter',
      // moment: 'moment',
      // 'ant-design-vue': 'antd',
      // jquery: '$',
      // axios: 'axios'
      // '@antv/g2': 'G2',
      // 'apexcharts': 'ApexCharts',
      // 'lodash': '_',
      // 'mavon-editor': 'mavon-editor',
      // 'wangEditor': 'E',
      // 'highlight.js': 'hljs',
      // }
      config.plugins.push(

        // 打包生产.gz包
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        }),
        // 添加自定义代码压缩配置
        // new UglifyJsPlugin({
        //   uglifyOptions: {
        //     warnings: false,
        //     compress: {
        //       drop_debugger: true,
        //       drop_console: true
        //     }
        //   },
        //   sourceMap: false,
        //   parallel: true
        // }),
        // 对打包文件进行压缩
        new ZipPlugin({
          path: path.join(__dirname, 'dist'),
          filename: 'dist.zip'
        })
        // 骨架的配置
        // new SkeletonWebpackPlugin({
        //   webpackConfig: {
        //     entry: {
        //       app: path.join(__dirname, './src/plugins/skeleton.js')
        //     }
        //   },
        //   minimize: true,
        //   quiet: true
        // })
        // Sentry 的配置
        // new SentryPlugin({
        //   include: './dist',
        //   release: process.env.VUE_APP_VERSION,
        //   configFile: 'sentry.properties',
        //   urlPrefix: '~/android_asset/dist/',
        //   ignore: ['dist.zip']
        // }),
        /* 精简moment打包体积 */
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      )
    }
  },
  // 加入markdown解析
  chainWebpack: config => {
    config.resolve.alias
      .set('@layouts', resolve('src/layouts'))
      .set('@router', resolve('src/router'))
      .set('@api', resolve('src/api'))
      .set('@store', resolve('src/store'))
      .set('@utils', resolve('src/common/utils'))
      .set('@config', resolve('src/config'))
      .set('@core', resolve('src/core'))
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('raw-loader')
    if (isProduction) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
  },
  devServer: {
    // open: true, // 启动服务后是否打开浏览器
    // https: false,
    hotOnly: false,
    compress: true, // 开启压缩
    // 设置让浏览器 overlay 同时显示警告和错误
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    // 代理
    proxy: {
      '/api': {
        target: 'https://www.easy-mock.com/mock/5d5b9eddaf6abb3d1b4270ad', // mock
        changeOrigin: true,
        pathRewrite: {
          // '^/ns-index': ''
        }
      }
    }
  }
}
