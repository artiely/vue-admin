<template>
  <div class="artiely-menu select-none">
    <v-logo v-if="logo" />
    <!-- :selectedKeys="selectedKeys" -->
    <a-menu
      :mode="mode"
      :selectedKeys="selectedKeys"
      :theme="layout.menuTheme"
      :openKeys="openKeys"
      @openChange="onOpenChange"
      @select="select"
    >
      <template v-for="item in menu">
        <template v-if="!item.meta.hide">
          <a-menu-item v-if="!item.children&&!item.meta.hide" :key="item.path">
            <a-iconfont :type="item.meta.icon" />
            <span v-if="!layout.isCollapse">{{ item.meta.title }}</span>
          </a-menu-item>
          <sub-menu :isCollapse="layout.isCollapse" v-else :menu-info="item" :key="item.path" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import subMenu from './sub-menu'
import { layout } from '../observable/layout'
import { routes } from '@router'
let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/
export default {
  components: {
    subMenu
  },
  name: 'SoloMenu',
  props: {
    mode: {
      type: String,
      default: 'inline'
    },
    logo: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      layout,
      collapsed: false,
      menu: Object.freeze(routes),
      openKeys: []
    }
  },
  watch: {
    'layout.isCollapse': {
      handler (val) {
        console.log('TCL: handler -> val', val)
        if (val) {
          this.openKeys = []
        }
      },
      immediate: true
    }
  },
  created () {
    console.log('TCL: created -> layout', layout.isCollapse)
  },
  computed: {
    selectedKeys () {
      return [this.$route.path]
    }
  },
  methods: {
    select ({ item, key, selectedKeys }) {
      let bool = reg.test(key)
      if (bool) {
        window.open(key, '_blank')
      } else {
        this.$router.push(key)
      }
    },
    onOpenChange (openKeys) {
      console.log('TCL: onOpenChange -> openKeys', openKeys)
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      console.log('TCL: onOpenChange -> latestOpenKey', latestOpenKey)
      const findIndex = (el) => {
        return el.path === latestOpenKey
      }
      let index = this.menu.findIndex(findIndex)
      console.log('TCL: onOpenChange -> index', index)
      if (index === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
  },
  deactivated () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" >
.artiely-menu {
  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    opacity: 0.8;
  }
}
.ant-menu-inline-collapsed > .ant-menu-item,
.ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-item,
.ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-submenu
  > .ant-menu-submenu-title,
.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
  padding: 0 1rem !important;
}
</style>
