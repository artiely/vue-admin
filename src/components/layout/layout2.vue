<template>
  <a-layout
    id="components-layout-demo-top"
    class="layout"
  >
    <a-layout-header v-if="!layout.isMobile" class="layout2-header" :class="layout.layoutMode==='fixed'?'fixed':''">
      <div class="layout2-menu" :class="layout.menuTheme==='dark'?'dark':'light'">
          <solo-menu
          class="layout2-solo-menu"
          mode="horizontal"
          theme="light"
        />
      </div>
    </a-layout-header>
    <full-menu v-else trigger />
    <div style="height:64px" v-if="layout.layoutMode==='fixed' && !layout.isMobile"></div>
    <a-layout-content style="padding: 0 50px" >
      <!-- 面包屑 -->
      <breadcrumb />
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view />
        </div>
    </a-layout-content>
    <v-footer></v-footer>
  </a-layout>
</template>
<script>
import soloMenu from '../menu/solo-menu'
import breadcrumb from '../breadcrumb'
import { layout } from '../../common/observable/layout'
import fullMenu from '../menu/full-menu'
import VFooter from './footer'
export default {
  components: {
    breadcrumb,
    soloMenu,
    fullMenu,
    VFooter
  },
  data () {
    return {
      layout
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
#components-layout-demo-top{
  min-height: 100%;
  .layout2-header{
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
      &.dark{
        background: @menu-background-dark;
      }
      &.light{
        background: @menu-background-light
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
  display: none
}
</style>
