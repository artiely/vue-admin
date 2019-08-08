<template>
  <div>
    手机号码格式化
    18999999999
    <p>

    {{tel|telFormat()}}
    </p>
    <p>
      数据脱敏
    {{tel|telFormat(true)}}
    </p>
    <vue-markdown>
      SyntaxHighlighter by highlight.html:
      ```html
      <div></div>
      ```
    </vue-markdown>
    <vue-markdown>
      SyntaxHighlighter by highlight.js:
      ```js
      tel|telFormat()
      tel|telFormat(true)
      ```
    </vue-markdown>
    <vue-markdown>
# 过滤器基本使用

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley
    </vue-markdown>
    <markdown-run
    :mark="markdown"
    highlight-style-file-name="github"
  />
  <textarea name="" id="" cols="30" rows="10" ref="mark1">
  
  </textarea>
  </div>
</template>

<script>
import Vue from 'vue'
import markdown from './README.md'

export default {
  data () {
    return {
      tel: '18999999999',
      markdown
    }
  },
  mounted () {
    
  }
}
</script>

<style>
</style>
