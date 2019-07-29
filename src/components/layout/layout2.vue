<template>
  <a-layout
    id="components-layout-demo-top"
    class="layout"
  >
    <a-layout-header v-if="!layout.isMobile" class="layout5-header" :class="layout.layoutMode==='fixed'?'fixed':''">
      <solo-menu
        mode="horizontal"
        theme="dark"
      />
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
#components-layout-demo-top{
  min-height: 100%;
  .layout5-header{
    &.fixed{
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .ant-menu-item, .ant-menu-submenu-title{
      height: 64px;
      line-height: 64px;
    }
    .ant-menu-dark .ant-menu-submenu-selected{
      // background: #1890ff;
    }
  }
}
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
