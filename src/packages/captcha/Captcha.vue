<template>
  <a-modal
      v-model="visible"
      :footer="null"
      centered
    >
     <v-codebox values="1234"></v-codebox>
    </a-modal>
</template>

<script>
export default {
  name:'v-captcha',
  props:{
    visible:Boolean
  }
}
</script>

<style>

</style>
