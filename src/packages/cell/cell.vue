<template>
  <div class="cell-wrapper">
    <div class="left" v-if="title"><span>{{title}}</span></div>
    <div class="right">
        <span>
      <v-icon v-if="link" name="icon-enter"></v-icon>
      <a-switch v-else-if="onoff" :defaultChecked="defaultChecked" @change="change"></a-switch>
      <span v-else>
        <slot name="right"></slot>
      </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-cell',
  props: {
    title: String,
    defaultChecked: Boolean,
    link: {
      type: Boolean,
      default: false
    },
    onoff: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="less" scoped>
.cell-wrapper {
  display: flex;
  padding: 4px 0;
  min-height: 40px;
  .left {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 14px;
  }
  .right {
    flex: 1;
    text-align: right;
    display: flex;
    justify-content:center;
    flex-direction: column;
  }
}
</style>
