<template>
  <div class="logo">
    <img :src="logoUrl" alt="logo">  <h1 v-if="!layout.isCollapse&&!isCollapse" >{{logoText}}</h1>
  </div>
</template>

<script>
import { layout } from '@layouts'
export default {
  name: 'v-logo',
  props: {
    logoUrl: {
      type: String,
      default: require('../../assets/img/logo.svg')
    },
    logoText: {
      type: String,
      default: 'Ant Desgin Pro'
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      layout
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
.logo {
  height: 32px;
  margin: 16px;
  text-align: center;
  transition: all .3s;
  overflow: hidden;
  user-select: none;
  img{
    width: 32px;
    // height: 100%;
  }
  h1{
    display: inline-block;
    margin: 0 0 0 12px;
    color: @primary-color;
    font-size: 20px;
    vertical-align: middle;
  }
}
</style>
