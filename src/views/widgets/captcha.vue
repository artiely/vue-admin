<template>
  <div>
    <a-button @click="visible=true">输入验证码 {{code}}</a-button>
    <v-captcha v-model="visible" :code.sync="code" mask></v-captcha>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      code: ''
    }
  }
}
</script>

<style>

</style>
