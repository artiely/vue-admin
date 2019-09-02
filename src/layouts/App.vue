<template>
    <div id="app">
      <template v-if="layout.appReload">
  <a-locale-provider :locale="locale">
    <a-config-provider :getPopupContainer="getPopupContainer">
      <router-view
        class="router-view"
        :key="$route.fullpath"
      />
    </a-config-provider>
  </a-locale-provider>
  </template>
    </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { mediaQuery, layout } from '@layouts'
export default {
  props: {
    abc: Object
  },
  data () {
    return {
      layout,
      locale: zhCN
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  mounted () {
    mediaQuery()
  },
  methods: {
    getPopupContainer (trigger) {
      if (layout.layout === 'layout1') {
        return document.body
      } else if (layout.layout === 'layout2') {
        return trigger.parentNode
      }
    }
  }

}
</script>
<style>
#app{
  height: 100%;
}
</style>
