import Vue from 'vue'
import { Draggable } from 'draggable-vue-directive'
import resize from 'vue-resize-directive'
const content = require.context('./modules', true, /\.js$/)
let modules = {}
content.keys().forEach(d => {
  const dModle = content(d)
  let dd = d.split('/')
  let name = dd[dd.length - 1].split('.js')[0]
  let namespace = {}
  namespace[name] = dModle.default
  modules = { ...modules, ...namespace }
})

Object.keys(modules).forEach(key => {
  Vue.directive(key, modules[key])
})
Vue.directive('draggable', Draggable)
Vue.directive('resize', resize)
