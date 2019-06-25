<template>
  <a-layout
    id="components-layout-demo-top"
    class="layout"
  >
    <a-layout-header>
      <solo-menu
        mode="horizontal"
        theme="dark"
      />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <!-- 面包屑 -->
      <breadcrumb />
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view />
        </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
import soloMenu from '../menu/solo-menu'
import breadcrumb from '../breadcrumb'
export default {
  components: {
    breadcrumb,
    soloMenu
  }
}
</script>

<style>
#components-layout-demo-top{
  min-height: 100%
}
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
