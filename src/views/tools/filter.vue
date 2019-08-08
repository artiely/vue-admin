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
  </div>
</template>

<script>
export default {
  data () {
    return {
      tel: '18999999999'
    }
  }
}
</script>

<style>
</style>
