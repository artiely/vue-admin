<template>
<div class="layout-nav-tabs-wrapper">
   <a-tabs  :type="type" animated  class="layout-nav-tabs"  :activeKey="activeKey" @change="handleNavTab">
    <a-tab-pane :key="item.path" v-for="item in panes">
      <span slot="tab">
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        {{item.meta.title}}
        <a-icon type="close-circle" class="nav-tabs-close-icon" @click="del(item)"/>
      </span>
    </a-tab-pane>
  </a-tabs>
  <div class="layout-nav-tabs-actions">
    <a-dropdown>
    <a-menu slot="overlay" @click="handleMenuClick">
      <a-menu-item key="1"><a-icon type="user" />关闭当前标签</a-menu-item>
      <a-menu-item key="2"><a-icon type="user" />刷新当前标签</a-menu-item>
      <a-menu-item key="3"><a-icon type="user" />关闭其他标签</a-menu-item>
      <a-menu-item key="4"><a-icon type="user" />关闭所有标签</a-menu-item>
      <a-menu-divider />
      <a-menu-item key="line"><a-icon type="user" />内联模式</a-menu-item>
      <a-menu-item key="card"><a-icon type="user" />卡片模式</a-menu-item>
    </a-menu>
    <div class="layout-nav-tabs-actions-inner">
    <a-icon type="down-square" />
    </div>
  </a-dropdown>
  </div>
  </div>
</template>

<script>
import { navTabs } from '@/common/observable/navTabs'
export default {
  data () {
    return {
      panes: navTabs.navTabs,
      type: 'card'
    }
  },
  computed: {
    activeKey () {
      return this.$route.path
    }
  },
  methods: {
    del (item) {
      alert('删除')
    },
    handleNavTab (path) {
      this.$router.push({ path })
    },
    handleMenuClick (e) {
      switch (e.key) {
        case 'line':
          this.type = 'line'
          break
        case 'card':
          this.type = 'card'
          break
      }
    }
  }
}
</script>

<style lang="less">
.layout-nav-tabs-wrapper{
  display: flex;
  background: #f9f9f9;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  z-index: 100;
  user-select:none;
  .layout-nav-tabs{
    flex: 1;
  }
  .layout-nav-tabs-actions{
    width: 32px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
    background: #f9f9f9;
    cursor: pointer;
    font-size: 12px;
    .layout-nav-tabs-actions-inner{
      width: 100%;
      height: 100%;
    }
  }
}
.layout-nav-tabs{
  .ant-tabs-bar{
    margin: 0;
    border: 0;
  }
  .nav-tabs-close-icon{
    position: absolute;
    right: -2px;
    top: 12px;
    display: none;
  }
  .ant-tabs-tab:hover{
    .nav-tabs-close-icon{
      display: block
    }
  }
  .ant-tabs-tab-prev{
    box-shadow: 1px 0 6px rgba(0, 21, 41, 0.20);
    background: #f8f8f8;
  }
  .ant-tabs-tab-next{
  box-shadow: -1px 0 6px rgba(0, 21, 41, 0.20);
  background: #f8f8f8;
  }
  .ant-tabs-nav .ant-tabs-tab{
    height: 41px;
    line-height: 40px;
    padding: 0 30px;
    margin: 0;
    border: 1px solid transparent;
  }
  &.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab{
    padding: 0 30px;
    border-radius: 0;
    margin-right:-1px;
    font-weight: 500;
    border-top: 1px solid #fff;

  }
}

</style>
