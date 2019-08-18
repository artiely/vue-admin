<template>
  <transition name="slide-fade">
    <router-view v-if="layout.refreshLoad" :style="{ padding: '24px', minHeight: '360px' }" />
  </transition>
</template>

<script>
import { layout } from '@/common/observable/layout'
export default {
  data () {
    return {
      layout
    }
  }
}
</script>

<style lang="less" scoped>
.slide-fade-enter {
  transform: translateY(40px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
  opacity: 0.6;
}
.slide-fade-leave{
  display: none;
}
.slide-fade-leave-active {
  display: none;
}
</style>
