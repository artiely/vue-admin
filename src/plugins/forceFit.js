
exports.install = (Vue, options) => {
  Vue.prototype.forceFit = {
    forceFit: () => {
      console.log('123')
    }
  }
}
