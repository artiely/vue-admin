<template>
  <div class="avatar-group">
    <!-- <div > -->
    <a-tooltip  v-for="(item,index) in list" :key="index">
    <template slot='title'>
      {{item.label}}
    </template>
    <a-avatar  class="artiely-avatar " :class="index!==0?'ml':''"  :src="item.url" />
  </a-tooltip>
    <a-avatar  class="artiely-avatar ml" v-if="avatarList.length>maxlength"   >+{{avatarList.length-maxlength}}</a-avatar>
  <!-- </div> -->
    <!-- <a-avatar  class="artiely-avatar ml" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    <a-avatar  class="artiely-avatar ml" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> -->
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
          {
            url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            label: '头像提示1'
          },
          {
            url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            label: '头像提示2'
          },
          {
            url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            label: '头像提示3'
          },
          {
            url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            label: '头像提示4'
          },
          {
            url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            label: '头像提示5'
          },
          {
            url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            label: '头像提示6'
          }
        ]
      }
    },
    maxlength: {
      type: Number,
      default: 4
    }
  },
  computed: {
    list () {
      if (this.avatarList.length > this.maxlength) {
        return this.avatarList.slice(0, this.maxlength)
      }
      return this.avatarList
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/var.less';
.avatar-group{
  display: inline-block;
  position: relative;
  .artiely-avatar{
    position: relative;
    border: 1px solid #fff;
    background: #eee;
    user-select: none;
    cursor: pointer;
    &.ml{
      margin-left: -10px;
    }
    .ant-avatar-string{
      color: @primary;
      font-weight: bold;
    }
  }
}

</style>
