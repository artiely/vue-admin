<template>
  <a-locale-provider :locale="locale">
    <div id="app">
     <router-view
        class="router-view"
        :key="$route.fullpath"
      />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { mediaQuery } from '@/common/observable'
export default {
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {
    mediaQuery()
  }

}
</script>
<style>
#app{
  height: 100%;
}
</style>
