<template>
  <div class="artiely-menu select-none">
    <logo></logo>
    <a-menu
      :mode="mode"
      :theme="layout.menuTheme"
      :selectedKeys="selectedKeys"
       @openChange="onOpenChange"
      @select="select"
    >
      <template v-for="item in menu">
        <template v-if="!item.meta.hide">
          <a-menu-item
            v-if="!item.children&&!item.meta.hide"
            :key="item.path"
          >
            <a-iconfont  :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
          <sub-menu
            v-else
            :menu-info="item"
            :key="item.path"
          />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import subMenu from './sub-menu'
import { layout } from '@/common/observable/layout'
import logo from '../layout/logo'
export default {
  components: {
    subMenu,
    logo
  },
  name: 'SoloMenu',
  props: {
    mode: {
      type: String,
      default: 'inline'
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  data () {
    return {
      layout,
      collapsed: false
    }
  },
  watch: {
    'layout.isCollapse': {
      handler () {
        let E = new Event('resize')
        window.dispatchEvent(E)
      }
    }
  },
  computed: {
    selectedKeys () {
      return [this.$route.path]
    },
    menu () {
      return this.$store.state.sys.menu
    },
    openKeys: {
      get () {
        return [this.$route.path]
      },
      set () {

      }
    }
  },
  methods: {
    select ({ item, key, selectedKeys }) {
      this.$router.push(key)
    },
    onOpenChange (openKeys) {

      // const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      // const findIndex=(el)=>{
      //   return el.path===latestOpenKey
      // }
      // let index = this.menu.findIndex(findIndex)
      // if (index === -1) {
      //   this.openKeys = openKeys
      // } else {
      //   this.openKeys = latestOpenKey ? [latestOpenKey] : []
      // }
    }
  }
}
</script>

<style lang="less" >

.artiely-menu{
  .ant-menu-item .anticon, .ant-menu-submenu-title .anticon{
    opacity: .8;
  }
}
.ant-menu-inline-collapsed > .ant-menu-item, .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item, .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-submenu > .ant-menu-submenu-title, .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title{
  padding: 0 1rem!important;
}
</style>
