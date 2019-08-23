<template>
  <a-layout-sider
    breakpoint="xl"
    collapsible
    :class="className"
    :trigger="null"
    :collapsed-width="collapsedWidth"
    v-model="layout.isCollapse"
    :width="pxtorem(layout.menuWidth)"
    :style="style"
  >
    <solo-menu />
  </a-layout-sider>
</template>

<script>
import soloMenu from '../menu/solo-menu'
import { layout } from '../../common/observable/layout'
import utils from '@/common/utils'
let { pxtorem } = utils
export default {
  name: 'SiderMenu',
  components: {
    soloMenu
  },
  data () {
    return {
      layout,
      pxtorem,
      collapsedWidth: 80
    }
  },
  computed: {
    className () {
      return [
        layout.menuTheme === 'dark' ? 'dark' : 'light',
        layout.isCollapse ? 'is-collapse' : ''
      ]
    },
    style () {
      return [
        layout.layoutMode === 'fixed' ? { overflow: 'hidden', height: '100vh', position: 'fixed', left: 0 } : '',
        layout.isCollapse ? { width: this.pxtorem(layout.collapsedWidth), maxWidth: this.pxtorem(this.layout.collapsedWidth), minWidth: this.pxtorem(this.layout.collapsedWidth), flex: `0 0 ${this.pxtorem(this.layout.collapsedWidth)}` } : ''
      ]
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
.ant-menu-inline-collapsed{
  width: 100%!important;
  text-align: center;
}
.ant-layout-sider{
  &.light{
    background: @menu-background-light!important;
  }
  &.dark{
    background: @menu-background-dark!important;
  }
  &.is-collapse{
    // width: 80px!important;
    // flex: 0 0 80px!important;
    // max-width: 80px!important;
    // min-width: 80px!important;
     .ant-layout-sider-children{
    // width: 97px;
    // overflow-y:hidden;
  }
  }
  .ant-layout-sider-children{
    // height: 100vh;
    // overflow-y:scroll;
    // width: 274px;
  }
}
</style>
