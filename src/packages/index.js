import Vue from 'vue'

const componentsContext = require.context('./', true, /index\.js$/)

componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  if (component.startsWith('./index')) {
    return
  }
  const ctrl = componentConfig.default || componentConfig
  Vue.component(ctrl.name, ctrl)
})
