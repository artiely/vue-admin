<template>
<div :style="styleWidth">
  <div class="avatar-group" :style="style">
    <a-tooltip  v-for="(item,index) in list" :key="index">
    <template slot='title'>
      {{item.label}}
    </template>
    <a-avatar :size="size" class="artiely-avatar " :style="{left:(index*50)+'%'}" :class="index!==0?'ml':''"  :src="item.url" />
  </a-tooltip>
    <a-avatar :size="size" class="artiely-avatar ml" :style="{left:(list.length*50)+'%'}" v-if="avatarList.length>maxlength"   >+{{avatarList.length-maxlength}}</a-avatar>
  </div>
</div>

</template>

<script>
export default {
  name: 'v-avatar-group',
  props: {
    avatarList: {
      type: Array,
      default () {
        return [
        ]
      }
    },
    maxlength: {
      type: [Number, String]
    },
    size: {
      type: Number,
      default: 30
    }
  },
  computed: {
    list () {
      if (this.avatarList.length > Number(this.maxlength)) {
        return this.avatarList.slice(0, Number(this.maxlength))
      }
      return this.avatarList
    },
    style () {
      return {
        width: this.size + 'px',
        height: this.size + 'px'

      }
    },
    styleWidth () {
      let len = this.maxlength ? this.maxlength : this.avatarList.length
      let w = (Number(len) + 2) * (this.size / 2)
      return {
        display: 'inline-block',
        width: w + 'px',
        fontSize: 0
      }
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
.avatar-group{
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  .artiely-avatar{
    position: relative;
    border: 1px solid #fff;
    background: #eee;
    user-select: none;
    cursor: pointer;
    position: absolute;
      top: 0;
    &.ml{
      // margin-left: -8%;
      position: absolute;
      top: 0;
      // left: -8%;
    }
    .ant-avatar-string{
      color: @primary-color;
      font-weight: bold;
    }
  }
}

</style>
