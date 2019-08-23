<template>
  <div style="height:100%">
    <component :is="layout" />
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
export default {
  name: 'Home',
  components: {
    layout1,
    layout2,
    moreGroup,
    scrollTop
  },
  computed: {
    layout () {
      return layout.layout
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
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    // background: @menu-background;
  }
  }

</style>
