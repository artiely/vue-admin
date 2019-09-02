<template>
  <a-breadcrumb style="margin: 16px 20px">
    <a-breadcrumb-item
      v-for="item in $route.matched"
      :key="item.path"
    >
      <span >{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
