<template>
  <a-layout
    id="components-layout-demo-top"
    class="layout"
  >
    <a-layout-header  class="layout2-header" :class="layout.layoutMode==='fixed'?'fixed':''">
      <v-logo style="display:inline" :isCollapse="false"></v-logo>
      <common-header></common-header>
      <div class="layout2-menu" v-if="!layout.isMobile" :class="layout.menuTheme==='dark'?'dark':'light'" >
          <solo-menu
          :logo="false"
          class="layout2-solo-menu"
          mode="horizontal"
        />
      </div>
    </a-layout-header>
    <full-menu v-if="layout.isMobile" trigger />
    <div style="height:64px" v-if="layout.layoutMode==='fixed' && !layout.isMobile"></div>
    <a-layout-content :style="contentStyle" >
      <!-- 面包屑 -->
      <breadcrumb />
         <slot/>
    </a-layout-content>
    <v-footer></v-footer>
  </a-layout>
</template>
<script>
import soloMenu from '../menu/solo-menu'
import breadcrumb from '../breadcrumb'
import { layout } from '../observable/layout'
import fullMenu from '../menu/full-menu'
import VFooter from './footer'
// import routerPage from './router-page'
import commonHeader from './common-header'
import utils from '@utils'
const contentTop = utils.pxtorem(layout.headerHeight)
export default {
  components: {
    breadcrumb,
    // routerPage,
    soloMenu,
    fullMenu,
    VFooter,
    commonHeader
  },
  data () {
    return {
      layout
    }
  },
  computed: {
    contentStyle () {
      return {
        paddingTop: contentTop
      }
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
#components-layout-demo-top{
  min-height: 100%;
  .layout2-header{
    padding: 0;
    &.fixed{
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .layout2-menu{
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      background: @layout-sider-background;
      transition: all .28s;
      &.dark{
        background: @menu-background-dark;
      }&.light{
        background:@menu-background-light
      }
      .layout2-solo-menu{
        padding: 0 50px;
      }
    }
  }
}
#components-layout-demo-top .logo {
  // width: 120px;
  // height: 31px;
  // background: rgba(255,255,255,.2);
  // margin: 16px 24px 16px 0;
  // float: left;
  // display: none
}
</style>
