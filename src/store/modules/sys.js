/**
 * 系统store
 * 主要包含布局主题语音等
 */
import Cookies from 'js-cookie'

import 'moment/locale/zh-cn'
import { api } from '@/api'
// initial state
const state = {
  /**
   * 布局
   */
  layoutFixed: true,
  // menuFixed: false,
  isCollapse: false, // 控制菜单状态是否收起 true时收起
  // settingVisible: false, // 设置
  isMobile: false, // 是否小屏
  // documentBodyClientHeight: 0,

  /**
   * tab标签页
   */
  navTabs: [], // 标签栏
  isTabMode: true, // 是否是标签页模式
  activeTab: '',
  tempObj: {},
  currTabIndex: 0,
  breadcrumbMode: false,
  navTabsHeight: 45,
  /**
   * 主题
   */
  menu: [],
  // menuMode: 'inline', // 菜单模式
  // menuTheme: 'dark', // 菜单主题
  // headerTheme: 'light', // header主题
  language: 'zh_CN', // 语言
  password: '', // 简单加密后的密码（锁屏）
  isLock: false // 锁屏
}

// 给cookies设置默认值
let language = Cookies.get('language')
if (!language) {
  Cookies.set('language', state.language, { expires: 365 })
}

// getters
const getters = {
  activeTabObj: state => {
    // 通过当前的路径计算当前的tab对象
    const findIndex = element => {
      return element.path === state.activeTab
    }
    let index = state.navTabs.findIndex(findIndex)
    if (index !== -1 && state.navTabs.length !== 0) {
      return state.navTabs[index]
    }
    return {}
  }
}

// mutations
const mutations = {
  savePassword (state, payload) {
    // 简单MD5后的密码
    state.password = payload
  },
  isLock (state, payload) {
    state.isLock = payload
  },
  /*
  菜单相关
  */
  changeCollapse (state, payload) {
    // 当前菜单收展状态
    state.isCollapse = payload
  },
  changheMenuMode (state, payload) {
    // 菜单模式
    state.menuMode = state.menuMode === 'vertical' ? 'inline' : 'vertical'
  },
  /**
   * 标签页相关
   */
  setNavTabMode (state, payload) {
    // 标签页数组模式
    state.activeTab = payload.path
    const findIndex = element => {
      return element.path === payload.path
    }
    let index = state.navTabs.findIndex(findIndex)
    if (index === -1) {
      state.navTabs.push(payload)
    }
  },
  setActiveTab (state, payload) {
    // 当前的path
    state.activeTab = payload
  },
  changeTabMode (state, payload) {
    // 是否开启tab模式
    state.isTabMode = payload ? Boolean(payload) : !state.isTabMode
  },
  setCurrTag (state, payload) {
    // 当前的tab对象
    // 保存临时变量
    const findIndex = element => {
      return element.path === state.activeTab
    }
    let index = state.navTabs.findIndex(findIndex)
    state.currTabIndex = index
    if (index !== -1 && state.navTabs.length !== 0) {
      state.tempObj = state.navTabs[index]
      state.navTabs.splice(index, 1)
      if (state.navTabs.length === 0) {
        state.activeTab = '/dashboard/analysis'
      } else {
        state.activeTab = state.navTabs[state.navTabs.length - 1].path
      }
    }
  },
  closeOtherTags (state, payload) {
    // 关闭其他标签
    state.navTabs = state.navTabs.filter(v => {
      return v.path === state.activeTab
    })
  },
  refreshCurrTag (state, payload) {
    // 刷新当前标签
    state.navTabs.splice(state.currTabIndex, 0, state.tempObj)
    state.activeTab = state.tempObj.path
  },
  /**
   * 关闭当前标签
   * 找出当前标签的索引
   * 最后一个是不允许关闭的
   * 删除当前标签
   * 高亮前一个标签
   */
  closeCurrTag (state, payload) {
    // 关闭当前标签
    const findIndex = element => {
      return element.path === payload
    }
    let index = state.navTabs.findIndex(findIndex)
    if (state.navTabs.length <= 1) return
    if (index !== -1) {
      state.navTabs.splice(index, 1)

      if (index === 0) {
        state.activeTab = state.navTabs[index].path
      } else {
        state.activeTab = state.navTabs[index - 1].path
      }
    }
  },
  /**
   * 移除当前标签
   * 判断当前标签是否高亮
   * 不高亮直接移除 高亮的移除后 前一个变高亮
   */
  removeTag (state, payload) {
    // 移除某一个便签页不一定是当前页
    const findIndex = element => {
      return element.path === payload.path
    }
    let index = state.navTabs.findIndex(findIndex)
    if (state.navTabs.length <= 1) return
    if (index !== -1) {
      // 存在并且不是当前高亮的直接删除
      if (payload.path !== state.activeTab) {
        state.navTabs.splice(index, 1)
      } else {
        state.navTabs.splice(index, 1)
        if (index === 0) {
          state.activeTab = state.navTabs[index].path
        } else {
          state.activeTab = state.navTabs[index - 1].path
        }
      }
    }
  },
  breadcrumbMode (state, payload) {
    state.breadcrumbMode = payload || !state.breadcrumbMode
  },
  /*
  主题相关
  */
  changeHeaderTheme (state, payload) {
    // header主题
    state.headerTheme = state.headerTheme === 'dark' ? 'light' : 'dark'
  },
  changeMenuTheme (state, payload) {
    // 菜单主题
    state.menuTheme = state.menuTheme === 'dark' ? 'light' : 'dark'
  },
  /*
  设置收展状态
  */
  settingVisible (state, payload) {
    state.settingVisible = payload || !state.settingVisible
  },
  /*
  当前是否小屏
  */
  isMobile (state, payload) {
    state.isMobile = payload
  },
  /*
  布局
  */
  layout (state, payload) {
    state.layout = payload
    Cookies.set('layout', payload)
  },
  updateClientBodyHeight (state, payload) {
    state.documentBodyClientHeight = payload
  },
  layoutFixed (state, payload) {
    state.layoutFixed = payload || !state.layoutFixed
  },
  menuFixed (state, payload) {
    state.menuFixed = payload || !state.menuFixed
  },
  /*
  当前菜单(主要是注销时清空)
  */
  setMenu (state, payload) {
    state.menu = payload
  },

  // 设置语言
  setLanguage (state, payload) {
    state.language = payload
    state.navTabs = [] // 这里是为了解决navTabs 无法被翻译的问题 （FIXME: 可以重新匹配赋值）
    Cookies.set('language', payload, { expires: 365 })
    window.location.reload()
  }
}

// actions
const actions = {
  getMenuNav ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.MENU_NAV().then(res => {
        console.log('当前的菜单列表', res)
        resolve()
      })
    })
  },
  getMenuList ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.MENU_LIST().then(res => {
        console.log('当前的菜单列表2', res)
        resolve(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
