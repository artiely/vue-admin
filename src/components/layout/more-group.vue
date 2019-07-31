<template>
  <div class="artiely-more-group">
    <div class="artiely-more-group-btn">
      <a-tooltip placement="left">
        <template slot="title">
          主题配置
      </template>
      <div class="item" @click="toggle">
        <v-icon name="icon-yixiangkan"></v-icon>
      </div>
      </a-tooltip>
      <a-tooltip placement="left">
        <template slot="title">
          文档说明
      </template>
      <div class="item">
        <v-icon name="icon-shoucang"></v-icon>
      </div>
      </a-tooltip>
      <a-tooltip placement="left">
        <template slot="title">
          联系我们
      </template>
      <div class="item">
        <v-icon name="icon-tishi"></v-icon>
      </div>
      </a-tooltip>
    </div>

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
        <a-switch checkedChildren="tab开" unCheckedChildren="tab关" defaultChecked @change="navTabsChange"/>
      </div>
      <!-- <div
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
      </div> -->
    </a-drawer>
  </div>
</template>

<script>
import { layout } from '../../common/observable/layout'
export default {
  data () {
    return {
      visible: false,
      layoutMode: layout.layoutMode,
      currLayout: layout.layout
    }
  },
  watch: {
    currLayout: {
      handler (val) {
        layout.layout = val
      }
    }
  },
  //  computed: {
  //   layout () {
  //     switch (layout.layout) {
  //       case 'layout1':
  //         return layout1
  //       case 'layout2':
  //         return layout2
  //       default:
  //         return layout1
  //     }
  //   }
  // },
  methods: {
    toggle () {
      this.visible = !this.visible
    },
    onClose () {
      this.visible = false
    },
    onChange () {
      layout.layoutMode = this.layoutMode
    },
    navTabsChange (val) {
      layout.isNavTabs = val
    }
  }
}
</script>

<style lang="less">
.artiely-more-group {
  .artiely-more-group-btn {
    position: fixed;
    right: 0;
    top: 40%;
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 0 50px 0 rgba(82, 63, 105, 0.15);
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    z-index: 88;
    .item {
      width: 30px;
      height: 30px;
      margin: 10px;
      background: #f4f4f8;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      border-radius: 4px;
      .icon-yixiangkan{
        color: #1dc9b7
      }
      .icon-shoucang{
        color: #374afb
      }
      .icon-tishi{
        color: #fd397a
      }
      &:hover {
        background: #ffb822;
        .iconfont{
          color: #fff;
        }
      }
      .anticon {
        font-size: 20px;
      }
    }
  }
}
</style>
