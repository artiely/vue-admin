<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <solo-menu mode="horizontal" theme="dark"></solo-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }" v-for="i in 4" :key="i">Content</div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
import soloMenu from '../menu/solo-menu'
export default {
  components: {
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
