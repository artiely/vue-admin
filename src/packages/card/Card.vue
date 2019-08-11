<template>
  <a-card class="artiely-card" :bordered="false" hoverable>
    <slot/>
  </a-card>
</template>

<script>
export default {
  name: 'v-card'
}
</script>

<style>
.artiely-card{
  font-size: 24px
}
</style>
