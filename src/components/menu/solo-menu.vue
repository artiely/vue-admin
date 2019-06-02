<template>
  <div>
    <div class="logo" />
    <a-menu
      :default-selected-keys="['/index']"
      :default-open-keys="['/']"
      mode="inline"
      theme="dark"
      v-model="selectedKeys"
      :inline-collapsed="collapsed"
      @select="select"
    >
      <template v-for="item in menu">
        <template v-if="!item.meta.hide">
          <a-menu-item
            v-if="!item.children&&!item.meta.hide"
            :key="item.path"
          >
            <a-icon type="pie-chart" />
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
import menu from '@/router/modules/routes'
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
    theme: {
      type: String,
      default: 'dark'
    }
  },
  data () {
    return {
      collapsed: false,
      selectedKeys: [this.$route.path],
      menu
    }
  },

  methods: {
    select ({ item, key, selectedKeys }) {
      this.$router.push(key)
    }
  }
}
</script>

<style>
.logo {
   height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
.ant-menu-horizontal > .ant-menu-item, .ant-menu-horizontal > .ant-menu-submenu{
  top: 16px;
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item, .ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu{
  top: 10px;
}
</style>
