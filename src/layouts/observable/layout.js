import Vue from 'vue'

export const layout = Vue.observable({
  // 响应式断点设置
  breakPoint: 'lg',
  // 是否小屏
  isMobile: false,
  // 菜单是否折叠
  isCollapse: false,
  // 布局模式 flow fixed
  layoutMode: 'flow',
  // 当前选择的布局
  layoutShap: 'layout1',
  // 是否展示标签页
  isNavTabs: true,
  // 菜单的主题
  menuTheme: 'dark',
  // 默认字体大小(不建议修改)
  fontSize: 16,
  // 菜单折叠的宽度
  collapsedWidth: 80,
  //  菜单的宽度
  menuWidth: 240,
  //  刷新当前页使用
  homeReload: true,
  // 这个应用重置
  appReload: true,
  // 标签页的高度
  navTabsHeight: 45,
  // 标签页的样式
  navTabsShap: 'card',
  // 头部的高度
  headerHeight: 64,
  // 菜单收起的动画和时间
  layoutTransition: 'all 0.2s'
})

let layoutStr = localStorage.getItem('layout')
try {
  let {
    isCollapse,
    layoutMode,
    layoutShap,
    isNavTabs,
    navTabsShap,
    menuTheme,
    fontSize
  } = JSON.parse(layoutStr)

  layout.isCollapse = isCollapse
  layout.layoutMode = layoutMode
  layout.layoutShap = layoutShap
  layout.isNavTabs = isNavTabs
  layout.menuTheme = menuTheme
  layout.fontSize = fontSize
  layout.navTabsShap = navTabsShap
  setFontSize(fontSize)
} catch (e) {}

export function setFontSize (val) {
  console.log('setFontSize', val)
  layout.fontSize = val || 16
  layout.collapsedWidth = (80 / 16) * val
  document.querySelector('html').style.fontSize = val + 'px'
}
export function mediaQuery () {
  const mediaQuery = {
    init () {
      var _this = this
      var timer = null
      _this.outputSize()
      window.addEventListener(
        'resize',
        () => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            _this.outputSize()
          }, 500)
        },
        false
      )
    },
    remove () {
      window.removeEventListener(
        'resize',
        event => {
          event.preventDefault()
        },
        false
      )
    },
    outputSize () {
      var result1 = window.matchMedia('(min-width:1200px)')
      var result2 = window.matchMedia('(min-width:992px)')
      var result3 = window.matchMedia('(min-width:768px)')
      if (result1.matches) {
        console.log('>=1200 大型设备 大台式电脑')
        layout.breakPoint = 'lg'
        layout.isMobile = false
      } else if (result2.matches) {
        console.log('992=< <=1200 中型设备 台式电脑')
        layout.breakPoint = 'md'
        layout.isMobile = false
      } else if (result3.matches) {
        console.log('768<= <=992 小型设备 平板电脑')
        layout.breakPoint = 'sm'
        layout.isMobile = true
      } else {
        console.log('<=768 超小设备 手机')
        layout.breakPoint = 'xs'
        layout.isMobile = true
      }
      console.log('TCL: outputSize -> layout.breakPoint', layout.breakPoint)
    }
  }
  return mediaQuery
}
