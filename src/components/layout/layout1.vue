<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <full-menu />
    <a-layout :style="layoutFixed">
      <a-layout-header style="background: #fff; padding: 0" :style="headerFixed">
        <v-header  >
          <a-icon
            class="trigger"
            :type="layout.isCollapse ? 'menu-unfold' : 'menu-fold'"
            @click="handleClick"
          />
          <div class="fr">
            <v-button tip="点击新增一个订单"><a-icon type="search" /></v-button>
            <v-button tip="查看今日订单"><a-iconfont  type="icon-commodity" /></v-button>
            <v-button tip="查看今日营业额"><a-iconfont type="icon-financial_fill" /></v-button>
            <v-button tip="预约消息"> <a-iconfont type="icon-wangwang" /></v-button>
            <v-button tip="代办事项"> <a-iconfont type="icon-time" /></v-button>
            <v-button tip="退出全屏">  <a-iconfont type="icon-smallscreen" /></v-button>
            <v-button tip="全屏">  <a-iconfont type="icon-send" /></v-button>

          </div>
        </v-header>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px;" class="layout1-content" :style="contentFixed">
        <!-- 面包屑 -->
        <!-- <breadcrumb /> -->
        <!-- <action-bar>
        </action-bar> -->
        <div >
          <transition name="slide-fade">
          <router-view :style="{ padding: '24px', minHeight: '360px' }" />
          </transition>
        </div>
      </a-layout-content>
      <v-footer></v-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import fullMenu from '../menu/full-menu'
// import breadcrumb from '../breadcrumb'
import { layout } from '../../common/observable/layout'
import VFooter from './footer'
import VHeader from './header1'
// import actionBar from './action-bar'

import { pxtorem } from '@/common/utils'

// 标签栏的高度
const NAV_TABS_HEIGHT = 45
// 头部的高度
const HEADER_HEIGHT = 64
// 布局改变的动画
const LAYOUT_TRANSOTION = 'all 0.2s'
export default {
  components: {
    fullMenu,
    // breadcrumb,
    VHeader,
    VFooter
    // actionBar
  },
  data () {
    return {
      layout,
      scrollTop: 0,
      screen:false
    }
  },
  computed: {
    // 左边的距离
    marginLeft () {
      if (
        this.layout.breakPoint === 'xs' ||
          this.layout.breakPoint === 'sm'
      ) {
        return 0
      }
      let ml = this.layout.isCollapse ? pxtorem(layout.collapsedWidth) : pxtorem(layout.menuWidth)
      return ml
    },
    layoutFixed () {
      if (this.layout.layoutMode === 'flow') {
        return null
      } else {
        return { 'margin-left': this.marginLeft, transition: LAYOUT_TRANSOTION }
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
    },
    toggleScreen () {
        if (!this.screen) {
          var docElm = document.documentElement
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen()
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen()
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen()
          } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen()
          } else {
            this.$message.error({content: '除了让你升级浏览器对方没什么好说的！', duration: 3})
          }
          this.screen = true
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          } else {
            this.$message.error({content: '请升级浏览器，不然我是不会理你的！', duration: 3})
          }
          this.screen = false
        }
      }
  }
}
</script>

<style lang="less">
#components-layout-demo-side {
  min-height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
}
#components-layout-demo-side .logo {
  height: 32px;
  background: #eee;
  margin: 16px;
}

.slide-fade-enter{
  transform: translateY(40px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .2s ease-out;
  opacity: 0.6;
}
.slide-fade-leave-active {
  opacity: 0.5;
}
</style>
