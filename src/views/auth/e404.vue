<template>
<div>
  <h1 class="notfound">页面找不到</h1>
  <p ><router-link tag="div" class="back-index"  to="/index">返回到首页或登录页</router-link></p>
</div>
</template>
<style>
.notfound{
  font-size: 40px;
  text-align: center;
  color: #fff;
}
.back-index{
  text-align: center;
  color: #f8f8f8;
  cursor: pointer;
}
</style>
