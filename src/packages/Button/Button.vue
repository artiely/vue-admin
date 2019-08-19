<template>
  <a-tooltip>
    <template slot="title" v-if="tip">{{tip}}</template>
    <a href="javascript:;" @click="handleClick" v-on-clickaway="away" class="artiely-button ghost" :class="active?'active':''">
      <slot />
    </a>
  </a-tooltip>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  mixins: [ clickaway ],
  name: 'v-button',
  props: {
    type: {
      type: String,
      default: 'ghost'
    },
    tip: String
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    handleClick (e) {
      this.active = true
      this.$emit('click', e)
    },
    away () {
      this.active = false
    }
  }
}
</script>

<style lang="less" >
@import "../../assets/styles/var.less";
.artiely-button {
  display: inline-block;
  cursor: pointer;
  height: 32px;
  line-height: 32px !important;
  padding: 0 10px;
  border-radius: 4px;
  text-decoration: none !important;
  .anticon {
    font-size: 22px !important;
    vertical-align: middle;
  }
  &.ghost {
    background: transparent;
    color: #959cb6;
    &:visited {
      background: fade(@primary-color,10%);
    }
    &:hover {
      background: fade(@primary-color,10%);
      color: @primary-color;
    }
    &.active {
      background: fade(@primary-color,10%);
    }
  }
}
</style>
