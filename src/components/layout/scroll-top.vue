<template>
  <div class="artiely-scroll-top" :class="show?'show':''" @click="scrollToTop">
    <v-icon name="icon-packup"></v-icon>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      show: false
    }
  },
  mounted () {
    $(window).on('scroll', () => {
      if ($(window).scrollTop() > $(window).height() / 2) {
        this.show = true
      } else {
        this.show = false
      }
    })
  },
  methods: {
    scrollToTop () {
      $('html,body').animate({ scrollTop: 0 }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.artiely-scroll-top {
  display: block;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 0px;
  right: 20px;
  cursor: pointer;
  z-index: 100;
  background: #5d78ff;
  box-shadow: 0 0 15px 1px rgba(69, 65, 78, 0.2);
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  transition: all 0.3s;
  user-select: none;
  opacity: 0;
  &.show {
    display: block;
    opacity: 0.5;
    bottom: 40px;
  }
  &:hover{
    opacity: 1;
  }
  .iconfont {
    color: #fff;
  }
}
</style>
