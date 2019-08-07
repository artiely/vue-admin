
// 元素级别的权限
// Vue.directive('isAuth', {
//   bind: function (el, binding) {
//     let isAuth =
//       JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(
//         binding.value
//       ) !== -1 || false
//     if (!isAuth) {
//       el.style.display = 'none'
//     }
//   },
//   update: function (el, binding) {
//     let isAuth =
//       JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(
//         binding.value
//       ) !== -1 || false
//     if (!isAuth) {
//       el.style.display = 'none'
//     }
//   }
// })

export default {
  bind: function (el, binding) {
    let isAuth =
      JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(
        binding.value
      ) !== -1 || false
    if (!isAuth) {
      el.style.display = 'none'
    }
  },
  update: function (el, binding) {
    let isAuth =
      JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(
        binding.value
      ) !== -1 || false
    if (!isAuth) {
      el.style.display = 'none'
    }
  }
}
