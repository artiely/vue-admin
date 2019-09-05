<template>
  <transition name="slide-fade">
    <router-view
      v-if="layout.homeReload"
      id="router-view"
      :style="{ padding: '24px', minHeight: '360px' }"
    />
  </transition>
</template>

<script>
import { layout } from '@layouts'
export default {
  data () {
    return {
      layout
    }
  },
  methods: {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="less" scoped>
#router-view{
  position: relative;
}
.slide-fade-enter {
  transform: translateY(100px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
  opacity: 0.6;
}
.slide-fade-leave {
  display: none;
}
.slide-fade-leave-active {
  display: none;
}
</style>
