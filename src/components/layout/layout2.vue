<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <full-menu></full-menu>
    <a-layout :style="layoutFixed" >
      <a-layout-header style="background: #fff; padding: 0" :style="headerFixed">
        <a-icon class="trigger" :type="layout.isCollapse ? 'menu-unfold' : 'menu-fold'" @click="handleClick"/>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px;" :style="contentFixed">
      <!-- 面包屑 -->
      <breadcrumb/>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
         <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import fullMenu from '../menu/full-menu'
import breadcrumb from '../breadcrumb'
import { layout } from '../../common/observable'
export default {
  components: {
    fullMenu,
    breadcrumb
  },
  data () {
    return {
      layout
    }
  },
  computed: {
    layoutFixed () {
      if (this.layout.layoutMode === 'flow') {
        return null
      } else {
        if (this.layout.breakPoint === 'xs' || this.layout.breakPoint === 'sm') {
          return { 'margin-left': '0' }
        }
        let ml = this.layout.isCollapse ? '80px' : '256px'
        return { 'margin-left': ml, transition: 'all 0.2s' }
      }
    },
    headerFixed () {
      if (this.layout.layoutMode === 'flow') {
        return null
      } else {
        return { position: 'fixed', zIndex: 1, width: '100%' }
      }
    },
    contentFixed () {
      if (this.layout.layoutMode === 'flow') {
        return null
      } else {
        return { marginTop: '64px' }
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
#components-layout-demo-side{
  min-height: 100%;
  .trigger{
    font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  }
}
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
</style>
