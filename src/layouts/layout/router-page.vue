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
  mounted () {},
  destroyed () {}
}
</script>

<style lang="less" scoped>
#router-view {
  position: relative;
}
.slide-fade-enter {
  transform: translate3D(0, -100px, 0);
  opacity: 0;
}
.slide-fade-enter-active {
  transform: translate3D(0, 40, 0);
  transition: transform 0.2s cubic-bezier(0.1, 0.88, 0.45, 0.94);
  opacity: 0.6;
}
.slide-fade-leave {
  display:none
}
.slide-fade-leave-active {
   display:none
}
</style>
