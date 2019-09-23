<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <full-menu />
    <a-layout :style="layoutFixed">
      <a-layout-header style="padding: 0" :style="headerFixed">
        <v-header>
          <a-icon
            class="trigger"
            :style="{cursor:flag?'pointer':'not-allowed'}"
            :type="layout.isCollapse ? 'menu-unfold' : 'menu-fold'"
            @click="handleClick"
          />
          <common-header></common-header>
        </v-header>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px;" class="layout1-content" :style="contentFixed">
        <!-- 面包屑 -->
        <!-- <breadcrumb /> -->
        <div>
          <slot />
        </div>
      </a-layout-content>
      <v-footer></v-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import fullMenu from '../menu/full-menu'
// import breadcrumb from '../breadcrumb'
import { layout } from '../observable/layout'
import VFooter from './footer'
import VHeader from './header1'
import commonHeader from './common-header'
import utils from '@/common/utils'
let { pxtorem } = utils

let {
  navTabsHeight,
  headerHeight,
  layoutTransition,
  collapsedWidth,
  menuWidth
} = layout

let collapsedWidthRem = pxtorem(collapsedWidth)
let menuWidthRem = pxtorem(menuWidth)
let navTabsHeightRem = pxtorem(navTabsHeight)
let headerHeightRem = pxtorem(headerHeight)
let navTabsHeightAddHeaderHeightRem = pxtorem(navTabsHeight + headerHeight)

export default {
  components: {
    fullMenu,
    VHeader,
    VFooter,
    commonHeader
  },
  data () {
    return {
      layout,
      scrollTop: 0,
      flag: true,
      o: null,
      timer: null
    }
  },
  computed: {
    // 左边的距离
    marginLeft () {
      if (this.layout.breakPoint === 'xs' || this.layout.breakPoint === 'sm') {
        return 0
      }
      let ml = this.layout.isCollapse ? collapsedWidthRem : menuWidthRem
      return ml
    },
    layoutFixed () {
      if (this.layout.layoutMode === 'flow') {
        return null
      } else {
        return {
          'margin-left': this.marginLeft,
          transition: layoutTransition
        }
      }
    },
    headerFixed () {
      if (this.layout.layoutMode === 'flow') {
        return null
      } else {
        return {
          position: 'fixed',
          left: this.marginLeft,
          right: 0,
          top: 0,
          zIndex: 99,
          transition: layoutTransition
        }
      }
    },
    contentFixed () {
      if (this.layout.layoutMode === 'flow') {
        if (this.layout.isNavTabs) {
          return { marginTop: navTabsHeightRem }
        } else {
          return { marginTop: '16px' }
        }
      } else {
        if (this.layout.isNavTabs) {
          return { marginTop: navTabsHeightAddHeaderHeightRem }
        } else {
          return { marginTop: headerHeightRem }
        }
      }
    }
  },
  mounted () {
    this.o = document.querySelector('.ant-layout-sider')
  },
  methods: {
    callBack () {
      this.flag = true
      this.o && this.o.removeEventListener('transitionend', this.callBack)
    },
    handleClick () {
      this.o && this.o.addEventListener('transitionend', this.callBack)
      if (this.flag) {
        layout.isCollapse = !layout.isCollapse
        this.flag = false
      }
      this.timer = setTimeout(() => { this.flag = true }, 200)
    }
  },
  destroyed () {
    this.o && this.o.removeEventListener('transitionend', this.callBack)
    clearTimeout(this.timer)
    this.timer = null
    console.log('TCL: destroyed -> this.timer', this.timer)
  }
}
</script>

<style lang="less">
@import "../../assets/styles/var.less";
#components-layout-demo-side {
  min-height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      background: fade(@primary-color, 10%);
    }
  }
}
</style>
