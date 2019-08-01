<template>
  <a-layout-sider
    breakpoint="xl"
    collapsible
    :class="style"
    :trigger="null"
    :collapsed-width="pxtorem(collapsedWidth)"
    v-model="layout.isCollapse"
    :width="pxtorem(256)"
    :style="layout.layoutMode=='fixed'?{ overflow: 'hidden', height: '100vh', position: 'fixed', left: 0 }:''"
  >
    <solo-menu />
  </a-layout-sider>
</template>

<script>
import soloMenu from '../menu/solo-menu'
import { layout } from '../../common/observable/layout'
import { pxtorem } from '@/common/utils'
export default {
  name: 'SiderMenu',
  components: {
    soloMenu
  },
  props: {
    collapsedWidth: {
      type: Number,
      default: 80
    }
  },
  data () {
    return {
      layout,
      pxtorem
    }
  },
  computed: {
    style () {
      return [
        layout.menuTheme === 'dark' ? 'dark' : 'light',
        layout.isCollapse ? 'is-collapse' : ''
      ]
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
.ant-layout-sider{
  &.dark{
    background: @menu-background-dark!important;
  }
  &.light{
    background: @menu-background-light!important;
  }
  &.is-collapse{
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
