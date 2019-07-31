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
        </v-header>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px;" class="layout1-content" :style="contentFixed">
        <!-- 面包屑 -->
        <!-- <breadcrumb /> -->
        <action-bar>
        </action-bar>
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
import VHeader from './header'
import actionBar from './action-bar'
// 标签栏的高度
const NAV_TABS_HEIGHT = 45
// 头部的高度
const HEADER_HEIGHT = 64
// 菜单折叠的宽度
const MENU_COLLAPSE_WIDTH = 80
// 菜单展开的宽度
const MENU_UNCOLLAPSE_WIDTH = 256
// 布局改变的动画
const LAYOUT_TRANSOTION = 'all 0.2s'
// 拼接单位的方法
const joinunit = (val) => {
  return val + 'px'
}
export default {
  components: {
    fullMenu,
    // breadcrumb,
    VHeader,
    VFooter,
    actionBar
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
      if (
        this.layout.breakPoint === 'xs' ||
          this.layout.breakPoint === 'sm'
      ) {
        return 0
      }
      let ml = this.layout.isCollapse ? joinunit(MENU_COLLAPSE_WIDTH) : joinunit(MENU_UNCOLLAPSE_WIDTH)
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
        return { marginTop: joinunit(NAV_TABS_HEIGHT) }
      } else if (this.layout.isNavTabs) {
        return { marginTop: joinunit(NAV_TABS_HEIGHT + HEADER_HEIGHT) }
      } else {
        return { marginTop: joinunit(HEADER_HEIGHT) }
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
  background: rgba(255, 255, 255, 0.2);
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
