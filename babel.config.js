module.exports = {
  env: {
    // 新增插件配置
    development: {
      plugins: ['dynamic-import-node']
    }
  },
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry'
      }
    ]
  ]
}
