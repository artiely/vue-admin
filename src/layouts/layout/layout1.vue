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
  navTabsHeight: NAV_TABS_HEIGHT,
  headerHeight: HEADER_HEIGHT,
  layoutTransition: LAYOUT_TRANSITION
} = layout

let collapsedWidthRem = pxtorem(layout.collapsedWidth)
let menuWidthRem = pxtorem(layout.menuWidth)
let navTabsHeightRem = pxtorem(NAV_TABS_HEIGHT)
let headerHeightRem = pxtorem(HEADER_HEIGHT)
let navTabsHeightAddHeaderHeightRem = pxtorem(NAV_TABS_HEIGHT + HEADER_HEIGHT)

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
      o: null
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
          transition: LAYOUT_TRANSITION
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
          transition: LAYOUT_TRANSITION
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
    handleClick () {
      let callBack = () => {
        this.flag = true
        this.o.removeEventListener('transitionend', callBack)
      }
      this.o.addEventListener('transitionend', callBack)
      if (this.flag) {
        layout.isCollapse = !layout.isCollapse
        this.flag = false
      }
    }
  },
  destroyed () {
    removeEventListener('transitionend')
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
