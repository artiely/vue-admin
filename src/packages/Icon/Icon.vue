<template>
  <svg
    class="icon"
    aria-hidden="true"
    v-if="symbol"
  >
    <use :xlink:href="'#' + name" />
  </svg>
  <i
    v-else
    class="iconfont"
    :class="name"
  />
</template>
<script>
export default {
  name: 'VIcon',
  props: {
    name: {
      type: String,
      default: ''
    },
    symbol: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
