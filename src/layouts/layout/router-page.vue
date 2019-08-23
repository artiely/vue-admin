<template>
  <transition name="slide-fade">
    <router-view
      v-if="layout.refreshLoad"
      id="router-view"
      :style="{ padding: '24px', minHeight: '360px' }"
    />
  </transition>
</template>

<script>
import { layout } from '@/common/observable/layout'
export default {
  data () {
    return {
      layout,
      timer: null
    }
  },
  methods: {
    handle () {
      this.$nextTick(() => {
        let E = new Event('resize')
        window.dispatchEvent(E)
      })
    }
  },
  mounted () {
    // 路由有2s的动画，可能导致表格组件渲染不对齐
    this.timer = setTimeout(() => {
      this.handle()
    }, 300)
  },
  destroyed () {
    clearTimeout(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less" scoped>
.slide-fade-enter {
  transform: translateY(40px);
  opacity: 0.1;
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
