<template>
  <div>
    <vue-easy-print table-show ref="easyPrint">
      <div >
        <p>葫芦娃，葫芦娃</p>
        <p>一根藤上七朵花</p>
        <p>小小树藤是我家 啦啦啦啦</p>
        <p>啦啦啦啦</p>
        <p>...</p>
      </div>
    </vue-easy-print>
    <a-button @click="print">打印</a-button>
  </div>
</template>

<script>
import vueEasyPrint from 'vue-easy-print'
export default {
  components: {
    vueEasyPrint
  },
  data () {
    return {}
  },
  methods: {
    print () {
      this.$refs.easyPrint.print()
    }
  }
}
</script>

<style>
</style>
