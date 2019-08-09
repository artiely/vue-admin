export default {
  bind: function (el, binding, vnode) {
    console.log('TCL: vnode', vnode)
    console.log('TCL: binding', binding)
    console.log('TCL: el', el)
    // let str = el.innerText;
    // el.innerHTML = str.replace(/<[^>]+>/g, "");
  },
  update: function (el, binding, vnode) {
    // let str = el.innerText;
    // el.innerHTML = str.replace(/<[^>]+>/g, "");
  }
}
