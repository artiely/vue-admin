<template>
  <div class="artiely-more-group">
    <a-card class="artiely-more-group-btn" :bodyStyle="{padding:0}" :bordered="false">
      <a-tooltip placement="left">
        <template slot="title">主题配置</template>
        <div class="item" @click="toggle">
          <v-icon name="icon-yixiangkan"></v-icon>
        </div>
      </a-tooltip>
      <a-tooltip placement="left">
        <template slot="title">文档说明</template>
        <div class="item">
          <v-icon name="icon-shoucang"></v-icon>
        </div>
      </a-tooltip>
      <a-tooltip placement="left">
        <template slot="title">联系我们</template>
        <div class="item" @click="handleChart">
          <v-icon name="icon-tishi"></v-icon>
        </div>
      </a-tooltip>
    </a-card>

    <a-drawer title="布局设置" :width="300" @close="onClose" placement="right" :visible="visible">
      <div>
        <h1>主题配置</h1>
        <div>
          <span
            class="theme-item"
            v-for="item in colorList"
            @click="handleItem(item)"
            :key="item.key"
            :style="{background:item.color}"
            :title="item.key"
          >
            <v-icon name="icon-right" v-if="currTheme.color===item.color" />
          </span>
        </div>
        <a-radio-group v-model="layout.menuTheme">
          <a-radio value="dark">黑色菜单</a-radio>
          <a-radio value="light">白色菜单</a-radio>
        </a-radio-group>
        <a-divider></a-divider>
        <h1>布局配置</h1>
        <a-radio-group v-model="layout.layoutShap">
          <a-radio value="layout1">布局1</a-radio>
          <a-radio value="layout2">布局2</a-radio>
        </a-radio-group>
        <div style="height:10px"></div>
        <a-radio-group v-model="layout.layoutMode">
          <a-radio value="flow">流式布局</a-radio>
          <a-radio value="fixed">固定布局</a-radio>
        </a-radio-group>
        <a-divider></a-divider>
        <h1>其他配置</h1>
        <v-cell title="标签页模式" onoff defaultChecked @change="navTabsChange"></v-cell>
        <v-cell title="色弱模式" onoff @change="colorWeakChange"></v-cell>
        <v-cell title="字体大小"  >
          <a-slider slot="right" :min="14" :max="20" @change="handleChange" :value="layout.fontSize" />
        </v-cell>
      </div>
    </a-drawer>
    <v-chat v-model="chartShow"></v-chat>
  </div>
</template>

<script>
import { layout, setFontSize } from '../observable/layout'
const colorList = [
  {
    key: '薄暮',
    color: '#F5222D'
  },
  {
    key: '火山',
    color: '#FA541C'
  },
  {
    key: '日暮',
    color: '#FAAD14'
  },
  {
    key: '明青',
    color: '#13C2C2'
  },
  {
    key: '极光绿',
    color: '#52C41A'
  },
  {
    key: '拂晓蓝（默认）',
    color: '#1890FF'
  },
  {
    key: '极客蓝',
    color: '#2F54EB'
  },
  {
    key: '酱紫',
    color: '#722ED1'
  }
]
export default {
  data () {
    return {
      visible: false,
      chartShow: false,
      colorList,
      layout,
      value: 16,
      currTheme: {
        key: '拂晓蓝（默认）',
        color: '#1890FF'
      }
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
    },
    handleItem (item) {
      this.currTheme = item
      window.less.modifyVars({ '@primary-color': item.color })
    },
    colorWeakChange (colorWeak) {
      colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
    }
  }
}
</script>

<style lang="less">
@import "../../assets/styles/var.less";
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
      .icon-yixiangkan {
        color: #1dc9b7;
      }
      .icon-shoucang {
        color: #374afb;
      }
      .icon-tishi {
        color: #fd397a;
      }
      &:hover {
        background: #ffb822;
        .iconfont {
          color: #fff;
        }
      }
      .anticon {
        font-size: 20px;
      }
    }
  }
}
.theme-item {
  width: 25px;
  height: 25px;
  color: #fff;
  margin-right: 6px;
  margin-bottom: 6px;
  display: inline-block;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
  line-height: 25px;
  overflow: hidden;
}
</style>
