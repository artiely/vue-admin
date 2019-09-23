<template>
  <a-drawer
    :wrap-class-name="`my-draw-menu ${layout.menuTheme==='dark'?'dark':'light'}`"
    v-if="layout.isMobile"
    :visible="!layout.isCollapse"
    :closable="false"
    mask-closable
    placement="left"
    :width="layout.menuWidth"
    @close="handleChange"
  >
    <solo-menu logo />
    <div
      v-if="trigger"
      class="menu-drawer-index-handle"
      :style="{left:menuWidth}"
      slot="handle"
      @click="toggle"
    >
      <a-icon type="menu-fold" v-if="!layout.isCollapse" />
      <a-icon type="menu-unfold" v-else />
    </div>
  </a-drawer>
  <sider-menu v-else />
</template>

<script>
import siderMenu from './sider-menu'
import soloMenu from './solo-menu'
import { layout } from '@layouts'
import utils from '@/common/utils'
let { pxtorem } = utils
export default {
  name: 'FullMenu',
  components: {
    siderMenu,
    soloMenu
  },
  props: {
    // 是否展示trigger按钮
    trigger: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collapsedWidth: 80,
      visible: true,
      layout,
      menuWidth: pxtorem(layout.menuWidth)
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
  created () {
    // 小屏打开时折叠起菜单解决无法初始化style属性的问题，如果想打开可在mounted中设置为false
    if (layout.isMobile) {
      layout.isCollapse = true
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
    // layout.isCollapse=false
  }
}
</script>

<style lang="less">
@import "../../assets/styles/var.less";
.menu-drawer-index-handle {
  position: absolute;
  top: 62px;
  background: @primary-color;
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

.my-draw-menu {
  .ant-drawer-content {
    .ant-drawer-body {
      padding: 0 !important;
    }
  }
  &.light {
    .ant-drawer-wrapper-body {
      background: @menu-background-light;
    }
  }
  &.dark {
    .ant-drawer-wrapper-body {
      background: @menu-background-dark;
    }
  }
}
</style>
