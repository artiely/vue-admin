<template>

<!--  name="slide-fade" -->
  <transition
    name="slide-fade"
    mode="out-in"
  >
  <!--  v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-on:enter-cancelled="enterCancelled"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave"
    v-on:leave-cancelled="leaveCancelled" -->
    <keep-alive>
    <router-view
      v-if="layout.homeReload"
      id="router-view"
      :style="{ padding: '24px', minHeight: '360px' }"
    />
    </keep-alive>
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
  mounted () {},
  destroyed () {}
}
</script>

<style lang="less" scoped>
#router-view {
  position: relative;
  // transform: translate3d(0,0,0);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  perspective: 1000;
}
.slide-fade-enter {
  // transform: translate3d(0, -100px, 0);
}
.slide-fade-enter-active {
  // transform: translate3d(0, 40px, 0);
  // transition: transform 0.2s cubic-bezier(0.1, 0.88, 0.45, 0.94);
}
.slide-fade-leave {
  // transform: translate3d(0, 0, 0);
}
.slide-fade-leave-active {
  // transform: translate3d(0, 0, 0);
}
</style>
