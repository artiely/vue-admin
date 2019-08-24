<template>
  <v-card>

    <p>
手机号码格式化
<br>
    {{tel|telFormat()}}
    </p>
    <p>
      数据脱敏<br>
    {{tel|telFormat(true)}}
    </p>
    <p>
      车牌格式化
      <br>{{'粤A00000'|carIdFormat()}}
    </p>

  </v-card>
</template>

<script>
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
