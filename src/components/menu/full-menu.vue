<template>
  <a-drawer
    :wrap-class-name="layout.menuTheme==='dark'?'my-draw-menu-dark':'my-draw-menu-light'"
    v-if="layout.isMobile"
    :visible="!layout.isCollapse"
    :closable="false"
    get-container="body"
    mask-closable
    placement="left"
    :width="pxtorem(layout.menuWidth)"
    @close="handleChange"
  >
    <solo-menu />
    <div v-if="trigger" class="menu-drawer-index-handle" :style="{left:pxtorem(layout.menuWidth)}" slot="handle" @click="toggle">
      <a-icon type="menu-fold" v-if="!layout.isCollapse" />
      <a-icon type="menu-unfold" v-else />
    </div>
  </a-drawer>
  <sider-menu v-else />
</template>

<script>
import siderMenu from './sider-menu'
import soloMenu from './solo-menu'
import { layout } from '@/common/observable/layout'
import { pxtorem } from '@/common/utils'
export default {
  name: 'FullMenu',
  components: {
    siderMenu,
    soloMenu
  },
  props: {
    trigger: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pxtorem,
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
            this.collapsedWidth = this.layout.collapsedWidth
            break
          case 'sm':
          case 'xs':
            this.collapsedWidth = 0
            break
          default:
            this.collapsedWidth = this.layout.collapsedWidth
        }
      }
    }
  },
  methods: {
    handleChange () {
      layout.isCollapse = true
    },
    toggle () {
      layout.isCollapse = !layout.isCollapse
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
@import "../../assets/styles/var.less";
.menu-drawer-index-handle {
  position: absolute;
  top: 62px;
  background: @menu-background-dark;
  width: 40px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 0px 4px 4px 0px;
  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}

.my-draw-menu-dark {
  .ant-drawer-body {
  padding: 0;
}
  .ant-drawer-content {
    background: @menu-background-dark !important;
  }
}
.my-draw-menu-light {
  .ant-drawer-body {
    padding: 0;
  }
  .ant-drawer-content {
    background: @menu-background-light !important;
  }
}
</style>
