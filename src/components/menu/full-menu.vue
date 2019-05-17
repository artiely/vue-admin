<template>
    <a-drawer
      :wrapClassName="'my-draw-menu'"
      v-if="layout.isMobile"
      :visible="!layout.isCollapse"
      :closable="false"
      getContainer="body"
      maskClosable
      placement="left"
      @close="handleChange"
    >
      <solo-menu></solo-menu>
    </a-drawer>
    <sider-menu v-else :isCollapse="layout.isCollapse" :collapsedWidth="collapsedWidth"/>
</template>

<script>
// import { mapState } from 'vuex'
import siderMenu from './sider-menu'
import soloMenu from './solo-menu'
import { layout } from '@/common/observable'
export default {
  name: 'full-menu',
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
