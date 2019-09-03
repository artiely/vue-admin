module.exports = {
  env: {
    // 新增插件配置
    development: {
      plugins: ['dynamic-import-node', '@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator']
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
