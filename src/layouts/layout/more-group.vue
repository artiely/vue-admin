<template>
  <div class="artiely-more-group">
    <a-card class="artiely-more-group-btn" :bodyStyle="{padding:0}" :bordered="false">
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
      <div class="item" >
        <v-icon name="icon-shoucang"></v-icon>
      </div>
      </a-tooltip>
      <a-tooltip placement="left">
        <template slot="title">
          联系我们
      </template>
      <div class="item" @click="handleChart">
        <v-icon name="icon-tishi"></v-icon>
      </div>
      </a-tooltip>
    </a-card>

     <a-drawer
      title="布局设置"
      :width="300"
      @close="onClose"
      placement="right"
      :visible="visible"
    >
      <div>
        <a-radio-group v-model="layout.layout">
          <a-radio value="layout1">
            布局1
          </a-radio>
          <a-radio value="layout2">
            布局2
          </a-radio>
        </a-radio-group>
        <a-radio-group
          v-model="layout.layoutMode"
        >
          <a-radio value="flow">
            流式布局
          </a-radio>
          <a-radio value="fixed">
            固定布局
          </a-radio>
        </a-radio-group>

        <a-radio-group
          v-model="layout.menuTheme"
        >
          <a-radio value="dark">
            黑色菜单
          </a-radio>
          <a-radio value="light">
            白色菜单
          </a-radio>
        </a-radio-group>
        <a-switch checkedChildren="tab开" unCheckedChildren="tab关" defaultChecked @change="navTabsChange"/>
        <div class="icon-wrapper">
    字体大小
    <a-slider :min="14" :max="20" @change="handleChange"  :value="layout.fontSize" />

  </div>
      </div>
    </a-drawer>
    <v-chat v-model="chartShow"></v-chat>
  </div>
</template>

<script>
import { layout, setFontSize } from '../observable/layout'
export default {
  data () {
    return {
      visible: false,
      chartShow: false,
      layout,
      value: 16
    }
  },
  methods: {
    handleChange: setFontSize,
    toggle () {
      this.visible = !this.visible
    },
    onClose () {
      this.visible = false
    },
    navTabsChange (val) {
      layout.isNavTabs = val
    },
    handleChart () {
      this.chartShow = true
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
.artiely-more-group {
  .artiely-more-group-btn {
    position: fixed;
    right: 0;
    top: 40%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 20px 0 rgba(@primary-color, 0.5);
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    z-index: 88;
    .item {
      width: 30px;
      height: 30px;
      margin: 5px;
      background: @component-background;
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
