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
        <!-- <action-bar>
        </action-bar>-->
        <div>
          <slot>
          <!-- <router-page></router-page> -->
          </slot>
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
// import routerPage from './router-page'
import commonHeader from './common-header'
let { pxtorem } = utils

// 标签栏的高度
const NAV_TABS_HEIGHT = 45
// 头部的高度
const HEADER_HEIGHT = 64
// 布局改变的动画
const LAYOUT_TRANSOTION = 'all 0.2s'
export default {
  components: {
    fullMenu,
    // routerPage,
    // breadcrumb,
    VHeader,
    VFooter,
    commonHeader
    // actionBar
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
          transition: LAYOUT_TRANSOTION
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
          transition: LAYOUT_TRANSOTION
        }
      }
    },
    contentFixed () {
      if (this.layout.layoutMode === 'flow') {
        return { marginTop: pxtorem(NAV_TABS_HEIGHT) }
      } else if (this.layout.isNavTabs) {
        return { marginTop: pxtorem(NAV_TABS_HEIGHT + HEADER_HEIGHT) }
      } else {
        return { marginTop: pxtorem(HEADER_HEIGHT) }
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
