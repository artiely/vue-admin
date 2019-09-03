<template>
  <a-card>
    <!-- FIXME:这个组件太大 暂不使用 -->
    <!-- <vue-markdown :source="msg" ></vue-markdown> -->

  </a-card>
</template>

<script>
import markdown from '../../../README.md'
// import VueMarkdown from 'vue-markdown'
// import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
// import $ from 'jquery'
export default {
  components: {
    // VueMarkdown
    // markdown
  },
  data () {
    return {
      msg: markdown
    }
  },
  mounted () {
    this.$nextTick(() => {
      // hljs.configure({ useBR: true })
      // $('pre code').each(function (i, block) {
      //   hljs.highlightBlock(block)
      // })
    })
  }
}
</script>

<style scoped>
</style>
