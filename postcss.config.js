module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 16,
      minPixelValue: 1,
      propWhiteList: []
    })
  ]
}
