<template>
  <a-layout
    id="components-layout-demo-top"
    class="layout"
  >
    <a-layout-header class="layout5-header" :class="layout.layoutMode==='fixed'?'fixed':''">
      <solo-menu
        mode="horizontal"
        theme="dark"
      />
    </a-layout-header>
    <div style="height:64px" v-if="layout.layoutMode==='fixed'"></div>
    <a-layout-content style="padding: 0 50px">
      <!-- 面包屑 -->
      <breadcrumb />
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view />
        </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design Pro ©2019 Created by Artiely
    </a-layout-footer>
  </a-layout>
</template>
<script>
import soloMenu from '../menu/solo-menu'
import breadcrumb from '../breadcrumb'
import { layout } from '../../common/observable'
export default {
  components: {
    breadcrumb,
    soloMenu
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
    }
    .ant-menu-item, .ant-menu-submenu-title{
      height: 64px;
      line-height: 64px;
    }
    .ant-menu-dark .ant-menu-submenu-selected{
      background: #1890ff;
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
