import Vue from 'vue'

export const navTabs = Vue.observable({
  navTabs: []
})

export const anthNavTabs = menu => {
  // 所有的鉴权条件符合后push进navtabs
  // 第一步判断是否存在
  // 存在就选中
  let path = menu.path
  const findPathIndex = (el) => {
    return el.path === path
  }
  let pathIndex = navTabs.navTabs.findIndex(findPathIndex)
  if (pathIndex === -1 && !menu.meta.hide) {
    navTabs.navTabs.push(menu)
  }
}
