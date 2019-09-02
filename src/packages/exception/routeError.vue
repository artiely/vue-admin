<template>
<div class="router-error">
  <h1>页面找不到家了！</h1>
  <p>兄嘚~！你的路由地址可能配错了,具体错误请查看控制台 <a-button @click="$router.replace('/')" type="primary">返回首页</a-button></p>

  <img :src="require('../../assets/img/cute-gray-kitty.jpg')" alt="">
</div>
</template>

<script>
export default {
  name: 'router-error'
}
</script>

<style lang="less" scoped>
.router-error{
  width: 100%;
  h1{
    padding:40px;
    color: #333;
    font-size: 24px;
    font-weight: bold;
  }
  p{
    padding-left: 40px;
    color: #666;
    font-size: 16px;
  }
  img{
    width: 50%;
  }
}
</style>
