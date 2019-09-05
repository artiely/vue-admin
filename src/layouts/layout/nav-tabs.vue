<template>
  <div class="layout-nav-tabs-wrapper">
    <a-tabs
      :type="layout.navTabsShap==='capsule'?'card':layout.navTabsShap"
      animated
      class="layout-nav-tabs"
      :activeKey="activeKey"
      @change="handleNavTab"
      :class="layout.navTabsShap==='capsule'?'capsule':''"
    >
      <a-tab-pane :key="item.path" v-for="item in panes">
        <span slot="tab">
          <a-iconfont v-if="item.meta.icon" :type="item.meta.icon" />
          {{item.meta.title}}
          <a-icon
            type="close-circle"
            v-if="panes.length!=1"
            class="nav-tabs-close-icon"
            @click.prevent.stop="del(item)"
          />
        </span>
      </a-tab-pane>
    </a-tabs>
    <div class="layout-nav-tabs-actions">
      <a-dropdown>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="refresh-curr">
            <v-icon name="icon-refresh" />刷新当前标签
          </a-menu-item>
           <a-menu-item key="refresh-all">
            <v-icon name="icon-refresh" />刷新全部标签
          </a-menu-item>
          <a-menu-item key="close-curr" :disabled="panes.length==1">
            <v-icon name="icon-delete" />关闭当前标签
          </a-menu-item>
          <a-menu-item key="close-other" :disabled="panes.length==1">
            <v-icon name="icon-delete" />关闭其他标签
          </a-menu-item>
          <a-menu-item key="close-all" :disabled="panes.length==1">
            <v-icon name="icon-delete" />关闭所有标签
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="line">
            <v-icon name="icon-keyboard" />内联模式
          </a-menu-item>
          <a-menu-item key="card">
            <v-icon name="icon-label" />卡片模式
          </a-menu-item>
          <a-menu-item key="capsule">
            <v-icon name="icon-label" />胶囊模式
          </a-menu-item>
        </a-menu>
        <div class="layout-nav-tabs-actions-inner">
          <a-icon type="down-square" />
        </div>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { navTabs } from '../observable/navTabs'
import { layout } from '@layouts'
export default {
  data () {
    return {
      layout,
      panes: navTabs.navTabs,
      type: 'card',
      capsule: false // 胶囊模式
    }
  },
  computed: {
    activeKey () {
      return this.$route.path
    }
  },
  methods: {
    del (item) {
      /**
       * 只剩一个禁止删除
       * 找出对应的索引并删除
       * 删除后对应跳转的路由
       * 如果删除的不是当前标签不做响应
       * 如果删除当前标签并且当前标签不是最后一个则跳转至下一个标签，如果是最后一个标签则跳转至上一个
       */
      if (navTabs.navTabs.length === 1) return
      const findIndexPath = el => {
        return el.path === item.path
      }
      let index = navTabs.navTabs.findIndex(findIndexPath)
      if (index !== -1) {
        navTabs.navTabs.splice(index, 1)
      }

      let currPath = this.$route.path

      let navTabsLength = navTabs.navTabs.length
      if (item.path === currPath) {
        if (index === navTabsLength) {
          this.$router.push({ path: navTabs.navTabs[navTabsLength - 1].path })
        } else {
          this.$router.push({ path: navTabs.navTabs[index].path })
        }
      }
    },
    handleNavTab (path) {
      this.$router.push({ path })
    },
    handleMenuClick (e) {
      switch (e.key) {
        case 'line':
          layout.navTabsShap = 'line'
          break
        case 'card':
          layout.navTabsShap = 'card'
          break
        // 胶囊模式只是对样式的覆写
        case 'capsule':
          layout.navTabsShap = 'capsule'
          break
        case 'close-curr':
          this.closeCurr()
          break
        case 'close-all':
          this.closeAll()
          break
        case 'close-other':
          this.closeOther()
          break
        case 'refresh-curr':
          this.refreshCurr()
          break
        case 'refresh-all':
          this.refreshAll()
      }
    },
    closeCurr () {
      // 关闭当前标签
      let { currItem } = this.getCurrTab()
      this.del(currItem)
    },
    getCurrTab () {
      let currPath = this.$route.path
      const findIndexCurrPath = el => {
        return el.path === currPath
      }
      let currPathIndex = navTabs.navTabs.findIndex(findIndexCurrPath)
      let currItem = navTabs.navTabs[currPathIndex]
      return { currPathIndex, currItem }
    },
    closeOther () {
      // 关闭其他标签
      let { currItem } = this.getCurrTab()
      navTabs.navTabs.splice(0)
      navTabs.navTabs.splice(0, 0, currItem)
      this.$router.push(currItem.path)
    },
    closeAll () {
      navTabs.navTabs.splice(1)
      this.$router.push(navTabs.navTabs[0].path)
    },
    refreshCurr () {
      // 刷新当前标签
      layout.homeReload = false
      this.$nextTick(() => {
        layout.homeReload = true
      })
    },
    refreshAll () {
      // 刷新当前标签
      layout.appReload = false
      this.$nextTick(() => {
        layout.appReload = true
      })
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
.layout-nav-tabs-wrapper .layout-nav-tabs.capsule /deep/ .ant-tabs-tab {
  height: 30px !important;
  line-height: 30px !important;
  border-radius: 17px !important;
  border: 1px solid @nav-tab-bg !important;
  margin-top: 5px !important;
  margin-right: 5px !important;
  .nav-tabs-close-icon {
    top: 8px !important;
  }
  &.ant-tabs-tab-active {
    border-color: #1690ff !important;
  }
}
.layout-nav-tabs-wrapper {
  display: flex;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  z-index: 100;
  user-select: none;
  background: @nav-tab-bg;
  .layout-nav-tabs {
    flex: 1;
  }
  .layout-nav-tabs-actions {
    width: 32px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: @text-color;
    cursor: pointer;
    font-size: 12px;
    .layout-nav-tabs-actions-inner {
      width: 100%;
      height: 100%;
      .anticon{
        color: @text-color;
      }
    }
  }
}
.layout-nav-tabs {
  .ant-tabs-bar {
    margin: 0;
    border: 0;
  }
  .nav-tabs-close-icon {
    position: absolute;
    right: -2px;
    top: 12px;
    display: none;
  }
  .ant-tabs-tab:hover {
    .nav-tabs-close-icon {
      display: block;
    }
  }
  .ant-tabs-tab-prev {
    box-shadow: 1px 0 6px rgba(0, 21, 41, 0.2);
  }
  .ant-tabs-tab-next {
    box-shadow: -1px 0 6px rgba(0, 21, 41, 0.2);
  }
  .ant-tabs-nav .ant-tabs-tab {
    height: 41px;
    line-height: 40px;
    padding: 0 30px;
    margin: 0;
    border: 1px solid transparent;
  }
  &.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    padding: 0 30px 0 15px;
    border-radius: 0;
    margin-right: -1px;
    font-weight: 500;
  }
}
</style>
