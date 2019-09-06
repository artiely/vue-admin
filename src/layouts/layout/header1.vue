<template>
  <div class="layout1-header" >
    <div class="layout1-header-inner">
      <slot></slot>
    </div>
    <nav-tabs v-if="layout.isNavTabs"></nav-tabs>
  </div>
</template>

<script>
import navTabs from './nav-tabs'
import { layout } from '@layouts'
export default {
  components: {
    navTabs
  },
  data () {
    return {
      layout,
      scrollTop: 0
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
.layout1-header-inner {
  position: relative;
  z-index: 101;
  box-shadow: 0 1px 3px rgba(0, 21, 41, 0.08);
}

</style>
