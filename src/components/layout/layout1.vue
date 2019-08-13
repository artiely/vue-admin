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
          <div class="fr" style="padding-right:20px">
            <v-button tip="点击新增一个订单" class="hidden-xs-only"><a-icon type="search" /></v-button>
            <v-button tip="查看今日订单"  class="hidden-xs-only"><a-iconfont  type="icon-commodity" /></v-button>
            <v-button tip="查看今日营业额"  class="hidden-xs-only"><a-iconfont type="icon-financial_fill" /></v-button>
            <v-button tip="预约消息" > <a-iconfont type="icon-wangwang" /></v-button>
            <v-button tip="代办事项"  class="hidden-xs-only"> <a-iconfont type="icon-time" /></v-button>
            <v-button :tip="screen?'退出全屏':'全屏'"  class="hidden-xs-only" @click="toggleScreen">  <a-iconfont :type="screen?'icon-smallscreen':'icon-send'" /></v-button>
            <v-button tip="锁屏" @click="$router.push('/lock')"  class="hidden-xs-only">  <a-iconfont type="icon-lock" /></v-button>
             <a-divider type="vertical" />
              <a-dropdown>
    <a class="ant-dropdown-link" href="#">
       <a-badge :count="99">
      <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
       </a-badge>
      Artiely <a-icon type="down" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item key="-1">
        <a rel="noopener noreferrer" @click="$router.push('/userinfo')" href="javascript:;">个人中心</a>
      </a-menu-item>
      <a-menu-item key="0">
        <a rel="noopener noreferrer" href="javascript:;"  @click="$router.push('/todo')">代办事项</a>
      </a-menu-item>
      <a-menu-item key="1">
        <a rel="noopener noreferrer" href="javascript:;"  @click="$router.push('/handler-over')">交班下班</a>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item key="2">
        <a rel="noopener noreferrer" href="javascript:;"  @click="$router.replace('/login')">退出登录</a>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item key="3" disabled>切换店铺</a-menu-item>
    </a-menu>
  </a-dropdown>
  <a-divider type="vertical" />
          </div>
        </v-header>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px;" class="layout1-content" :style="contentFixed">
        <!-- 面包屑 -->
        <!-- <breadcrumb /> -->
        <!-- <action-bar>
        </action-bar> -->
        <div >
          <router-page></router-page>
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
import utils from '@/common/utils'
import routerPage from './router-page'
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
    routerPage,
    // breadcrumb,
    VHeader,
    VFooter
    // actionBar
  },
  data () {
    return {
      layout,
      scrollTop: 0,
      screen: false
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
          this.$message.error({ content: '除了让你升级浏览器对方没什么好说的！', duration: 3 })
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
          this.$message.error({ content: '请升级浏览器，不然我是不会理你的！', duration: 3 })
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
</style>
