<template>
  <div style="height:100%">
    <component :is="layout" />
    <a-drawer
      title="布局设置"
      :width="300"
      @close="onClose"
      placement="right"
      :visible="visible"
    >
      <div>
        <a-radio-group v-model="currLayout">
          <a-radio value="layout1">
            布局1
          </a-radio>
          <a-radio value="layout2">
            布局2
          </a-radio>
        </a-radio-group>
        <a-radio-group
          v-model="layoutMode"
          @change="onChange"
        >
          <a-radio value="flow">
            流式布局
          </a-radio>
          <a-radio value="fixed">
            固定布局
          </a-radio>
        </a-radio-group>
      </div>
      <div
        class="setting-drawer-index-handle"
        slot="handle"
        @click="toggle"
      >
        <a-icon
          type="setting"
          v-if="!visible"
        />
        <a-icon
          type="close"
          v-else
        />
      </div>
    </a-drawer>
  </div>
</template>

<script>
import layout1 from './layout1'
import layout2 from './layout2'
import { layout } from '../../common/observable'
export default {
  components: {
    layout1,
    layout2
  },
  data () {
    return {
      visible: false,
      currLayout: 'layout1',
      layoutMode: layout.layoutMode
    }
  },
  computed: {
    layout () {
      switch (this.currLayout) {
        case 'layout1':
          return layout1
        case 'layout2':
          return layout2
        default:
          return layout1
      }
    }
  },
  methods: {
    toggle () {
      this.visible = !this.visible
    },
    onClose () {
      this.visible = false
    },
    onChange () {
      layout.layoutMode = this.layoutMode
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
 .setting-drawer-index-handle {
    position: absolute;
    top: 240px;
    background: @primary;
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
  }
  }

</style>
