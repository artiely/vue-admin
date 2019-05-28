<template>
  <a-drawer
    :wrap-class-name="'my-draw-menu'"
    v-if="layout.isMobile"
    :visible="!layout.isCollapse"
    :closable="false"
    get-container="body"
    mask-closable
    placement="left"
    @close="handleChange"
  >
    <solo-menu />
  </a-drawer>
  <sider-menu
    v-else
    :is-collapse="layout.isCollapse"
    :collapsed-width="collapsedWidth"
  />
</template>

<script>
// import { mapState } from 'vuex'
import siderMenu from './sider-menu'
import soloMenu from './solo-menu'
import { layout } from '@/common/observable'
export default {
  name: 'FullMenu',
  components: {
    siderMenu,
    soloMenu
  },
  data () {
    return {
      collapsedWidth: 80,
      visible: true,

      layout
    }
  },
  watch: {
    'layout.breakPoint': {
      handler (val) {
        switch (val) {
          case 'lg':
          case 'md':
            this.collapsedWidth = 80
            break
          case 'sm':
          case 'xs':
            this.collapsedWidth = 0
            break
          default:
            this.collapsedWidth = 80
        }
      }
    }
  },
  methods: {
    handleChange () {
      layout.isCollapse = true
    }
  },
  mounted () {

  }
}
</script>

<style lang="less">
.my-draw-menu {
  .ant-drawer-body {
    padding: 0;
  }
  .ant-drawer-content {
    background: #001529 !important;
  }
}
.my-draw-menu-light {
  .ant-drawer-body {
    padding: 0;
  }
  .ant-drawer-content {
    background: #fff !important;
  }
}
</style>
