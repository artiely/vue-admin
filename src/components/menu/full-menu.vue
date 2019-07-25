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
    <div
        v-if="trigger"
        class="menu-drawer-index-handle"
        slot="handle"
        @click="toggle"
      >
        <a-icon
          type="menu-fold"
          v-if="!layout.isCollapse"
        />
        <a-icon
          type="menu-unfold"
          v-else
        />
      </div>
  </a-drawer>
  <sider-menu
    v-else
    :is-collapse="layout.isCollapse"
    :collapsed-width="collapsedWidth"
  />
</template>

<script>
import siderMenu from './sider-menu'
import soloMenu from './solo-menu'
import { layout } from '@/common/observable'
export default {
  name: 'FullMenu',
  components: {
    siderMenu,
    soloMenu
  },
  props:{
    trigger:{
      type:Boolean,
      default:false
    }
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
    },
    toggle(){
      layout.isCollapse = !layout.isCollapse
    }
  },
  mounted () {

  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
.my-draw-menu {
  .menu-drawer-index-handle{
    position: absolute;
    top: 62px;
    background: @menu-background;
    width: 40px;
    height: 48px;
    left: 256px;
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
  .ant-drawer-body {
    padding: 0;
  }
  .ant-drawer-content {
    background: @menu-background !important;
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
