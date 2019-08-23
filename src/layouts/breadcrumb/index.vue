<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item
      v-for="item in $route.matched"
      :key="item.path"
    >
      <span v-if="item.name=='home'">
        首页
      </span>
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
