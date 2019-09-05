<template>
  <div style="height:100%">
    <component :is="layout" >
      <slot><router-page></router-page></slot>
    </component>
    <more-group></more-group>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
import layout1 from './layout1'
import layout2 from './layout2'
import moreGroup from './more-group'
import { layout } from '../observable/layout'
import scrollTop from './scroll-top'
import routerPage from './router-page'
export default {
  components: {
    layout1,
    layout2,
    moreGroup,
    scrollTop,
    routerPage
  },
  computed: {
    layout () {
      return layout.layoutShap
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
 .setting-drawer-index-handle {
    position: absolute;
    top: 240px;
    background: @primary-color;
    width: 48px;
    height: 48px;
    right: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    z-index: 1001;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;
    i {
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
  }
  #components-layout-demo-side{
    .ant-layout-header{
    position: relative;
    z-index: 99!important;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }
  .ant-layout-sider{
    position: relative;
    z-index: 100!important;
    box-shadow: 2px 0 6px rgba(0,21,41,.15);
    // background: @menu-background;
  }
  }

</style>
