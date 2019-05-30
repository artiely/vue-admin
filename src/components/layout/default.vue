<template>
  <div style="height:100%">
    <component :is="layout" />
    <a-drawer
      title="Basic Drawer"
      :width="300"
      @close="onClose"
      placement="right"
      :visible="visible"
    >
      <div>
        <a-radio-group v-model="currLayout">
          <a-radio value="layout2">
            布局1
          </a-radio>
          <a-radio value="layout3">
            布局2
          </a-radio>
          <a-radio value="layout4">
            布局3
          </a-radio>
          <a-radio value="layout5">
            布局4
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
import layout2 from './layout2'
import layout3 from './layout3'
import layout4 from './layout4'
import layout5 from './layout5'
import { layout } from '../../common/observable'
export default {
  components: {
    layout2, layout3, layout4, layout5
  },
  data () {
    return {
      visible: false,
      currLayout: 'layout2',
      layoutMode: layout.layoutMode
    }
  },
  computed: {
    layout () {
      switch (this.currLayout) {
        case 'layout2':
          return layout2
        case 'layout3':
          return layout3
        case 'layout4':
          return layout4
        case 'layout5':
          return layout5
        default:
          return layout5
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.visible = false
    })
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
 .setting-drawer-index-handle {
    position: absolute;
    top: 240px;
    background: #1890ff;
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
