<template>
  <div>
    <a-button @click="visible=true">输入验证码</a-button>
    <v-captcha :visible="visible"></v-captcha>
  </div>
</template>

<script>
export default {
  data(){
    return {
      visible:false
    }
  }
}
</script>

<style>

</style>
