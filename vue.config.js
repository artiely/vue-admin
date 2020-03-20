const path = require('path')
const resolve = (file) => path.resolve(__dirname, file)
const isProduction = process.env.NODE_ENV === 'production'
const {
  themePlugin,
  skeleton,
  uglifyJsPlugin,
  compressionWebpackPlugin /*  zipPlugin  */
} = require('./webpack.config')

/*
const cdn = {
	css: [
		'https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.16/dist/antd.min.css',
		'https://cdn.jsdelivr.net/npm/driver.js@0.9.7/dist/driver.min.css'
	],
	js: [
		'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
		'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
		'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
		'https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js',
		'https://cdn.jsdelivr.net/npm/moment@2.24.0/locale/zh-cn.js',
		'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
		'https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.16/dist/antd.min.js',
		'https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js',
		'https://cdn.bootcss.com/highlight.js/9.15.10/highlight.min.js',
		// 'https://cdn.jsdelivr.net/npm/apexcharts',
		'https://cdn.jsdelivr.net/npm/@antv/g2@3.5.8-beta.3/build/g2.min.js',
		'https://cdn.jsdelivr.net/npm/@antv/data-set@0.10.2/build/data-set.min.js',
		'https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
		'https://cdn.jsdelivr.net/npm/driver.js@0.9.7/dist/driver.min.js',
		'https://cdn.jsdelivr.net/npm/vue-amap@0.5.10/dist/index.min.js'
		// 'https://cdn.jsdelivr.net/npm/vue-markdown@2.2.4/dist/vue-markdown.common.js',
		// 'https://cdn.jsdelivr.net/npm/vue-markdown@2.2.4/dist/vue-markdown.js',
	]
};
*/

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
  configureWebpack: (config) => {
    config.plugins.push(themePlugin, skeleton)
    if (isProduction) {
      /* config.externals = {
				vue: 'Vue',
				'vue-router': 'VueRouter',
				// FIXME: moment无效
				moment: 'moment',
				'moment/locale/zh-cn': 'moment.locale',
				'ant-design-vue': 'antd',
				jquery: '$',
				axios: 'axios',
				'@antv/g2': 'G2',
				'@antv/data-set': 'DataSet',
				// apexcharts: 'ApexCharts',
				lodash: '_',
				// "mavon-editor": "mavon-editor",
				// wangEditor: "E",
				'highlight.js': 'hljs',
				// "vue-markdown": "VueMarkdown",
				'driver.js': 'Driver',
				'vue-amap': 'VueAMap'
			}; */
      config.plugins.push(
        // 打包生产.gz包
        compressionWebpackPlugin,
        uglifyJsPlugin
        // 对打包文件进行压缩
        // zipPlugin
      )
    }
  },
  // 加入markdown解析
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@layouts', resolve('src/layouts'))
      .set('@router', resolve('src/router'))
      .set('@api', resolve('src/api'))
      .set('@store', resolve('src/store'))
      .set('@utils', resolve('src/common/utils'))
      .set('@config', resolve('src/config'))
      .set('@core', resolve('src/core'))
    config.module.rule('md').test(/\.md$/).use('vue-loader').loader('raw-loader')
    config.plugin('html').tap((args) => {
      args[0].cdn = cdn
      return args
    })
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          maxSize: 600 * 1024,
          minSize: 200 * 1024,
          chunks: 'initial' // only package third parties that are initially dependent
        },
        antDesignVue: {
          name: 'chunk-ant-design-vue', // split antdui into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          maxSize: 600 * 1024,
          minSize: 200 * 1024,
          test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          maxSize: 600 * 1024,
          minSize: 200 * 1024,
          reuseExistingChunk: true
        }
      }
    })
    config.optimization.runtimeChunk('single')
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
        pathRewrite: {}
      }
    }
  }
}
