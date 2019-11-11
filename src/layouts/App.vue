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
      locale: zhCN,
      timer: null
    }
  },
  watch: {
    layout: {
      handler (val) {
        localStorage.setItem('layout', JSON.stringify(val))
      },
      deep: true,
      immediate: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  mounted () {
    mediaQuery().init()
    document.addEventListener('visibilitychange', () => {
    // 浏览器切换事件
      if (document.visibilityState === 'hidden') {
        document.title = 'Artiely（冻结）'
      } else {
        document.title = 'Artiely'
        layout.appReload = false
        this.$nextTick(() => {
          layout.appReload = true
        })
      }
    })
  },
  methods: {
    getPopupContainer (trigger) {
      if (layout.layoutShap === 'layout1') {
        return document.body
      } else if (layout.layoutShap === 'layout2') {
        return trigger.parentNode
      }
    }
  },
  destroyed () {
    mediaQuery().remove()
    clearTimeout(this.timer)
    document.body.removeEventListener('visibilitychange', (event) => { event.preventDefault() }, false)
  }

}
</script>
<style>
#app{
  height: 100%;
}
</style>
