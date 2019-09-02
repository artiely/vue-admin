<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <full-menu />
    <a-layout :style="layoutFixed">
      <a-layout-header style="padding: 0" :style="headerFixed">
        <v-header>
          <a-icon
            class="trigger"
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
          <slot/>
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
import utils from '@/common/utils'
import commonHeader from './common-header'
let { pxtorem } = utils

let { navTabsHeight: NAV_TABS_HEIGHT, headerHeight: HEADER_HEIGHT, layoutTransition: LAYOUT_TRANSITION } = layout
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
      scrollTop: 0
    }
  },
  computed: {
    // 左边的距离
    marginLeft () {
      if (this.layout.breakPoint === 'xs' || this.layout.breakPoint === 'sm') {
        return 0
      }
      let ml = this.layout.isCollapse
        ? pxtorem(layout.collapsedWidth)
        : pxtorem(layout.menuWidth)
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
          return { marginTop: pxtorem(NAV_TABS_HEIGHT) }
        } else {
          return { marginTop: '16px' }
        }
      } else {
        if (this.layout.isNavTabs) {
          return { marginTop: pxtorem(NAV_TABS_HEIGHT + HEADER_HEIGHT) }
        } else {
          return { marginTop: pxtorem(HEADER_HEIGHT) }
        }
      }
    }
  },
  methods: {
    handleClick () {
      layout.isCollapse = !layout.isCollapse
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
#components-layout-demo-side {
  min-height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover{
    background: fade(@primary-color,10%);

    }
  }
}
</style>
