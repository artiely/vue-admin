module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // 'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'standard/no-callback-literal': 'off',
    'no-eval': 'off',
    'no-tabs': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
