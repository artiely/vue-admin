<template>
  <div class="pre-code">
    <highlight :language="lang" v-if="highlight">
      <slot />
    </highlight>
    <prism :language="lang" v-else>
      <slot />
    </prism>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import Highlight from 'vue-highlight-component'
import Prism from 'vue-prism-component'

import 'prismjs'
import 'prismjs/themes/prism.css'
// Register the language if it's not supported by default
hljs.registerLanguage(
  'javascript',
  require('highlight.js/lib/languages/javascript')
)
export default {
  name: 'v-pre-code',
  props: {
    lang: {
      type: String,
      default: 'javascript'
    },
    highlight: Boolean
  },
  components: {
    Highlight,
    Prism
  }
}
</script>

<style src="highlight.js/styles/github.css"></style>
<style lang="less">
.pre-code {
  font-size: 16px;
}
</style>
