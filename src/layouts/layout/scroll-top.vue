<template>
  <div class="artiely-scroll-top" >
    <a-back-top>
      <div class="ant-back-top-inner"><v-icon name="icon-packup"></v-icon></div>
    </a-back-top>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.artiely-scroll-top .ant-back-top{
  bottom: 40px;
}
.artiely-scroll-top .ant-back-top-inner {
  display: block;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 100;
  background: #5d78ff;
  box-shadow: 0 0 15px 1px rgba(69, 65, 78, 0.2);
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  transition: all 0.3s;
  user-select: none;
  opacity: 1;
  .iconfont{
    color: #fff;
  }
}
</style>
