export default {
  bind: function (el, binding, vnode) {
    let str = el.innerText
    el.innerHTML = str.replace(/<[^>]+>/g, '')
  },
  update: function (el, binding, vnode) {
    let str = el.innerText
    el.innerHTML = str.replace(/<[^>]+>/g, '')
  }
}
