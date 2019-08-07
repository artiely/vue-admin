<template>
  <div class="logo">
    <img :src="require('../../assets/img/logo.svg')" alt="">  <h1 v-if="!layout.isCollapse">Ant Desgin Pro</h1>
  </div>
</template>

<script>
import { layout } from '@/common/observable/layout'
export default {
  data () {
    return {
      layout
    }
  }
}
</script>

<style lang="less">
.logo {
  height: 32px;
  margin: 16px;
  text-align: center;
  color: #eee;
  transition: all .3s;
  overflow: hidden;
  img{
    height: 100%;
  }
  h1{
    display: inline-block;
    margin: 0 0 0 12px;
    color: #fff;
    font-size: 20px;
    vertical-align: middle;
    // font-family: 'DINPro-Medium';
  }
}
</style>
