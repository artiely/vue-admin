<template>
  <a-layout-sider
    breakpoint="xl"
    collapsible
    :trigger="null"
    :collapsed-width="collapsedWidth"
    v-model="layout.isCollapse"
    width="256px"
    :style="layout.layoutMode=='fixed'?{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }:''"
  >
    <solo-menu />
  </a-layout-sider>
</template>

<script>
import soloMenu from '../menu/solo-menu'
import { layout } from '../../common/observable/layout'
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
      layout
    }
  }
}
</script>

<style>

</style>
