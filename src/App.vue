<template>
  <a-locale-provider :locale="locale">
    <a-config-provider :getPopupContainer="getPopupContainer">
    <div id="app">
      <router-view
        class="router-view"
        :key="$route.fullpath"
      />
    </div>
    </a-config-provider>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { mediaQuery, layout } from '@/common/observable/layout'
export default {
  data () {
    return {
      locale: zhCN
    }
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
