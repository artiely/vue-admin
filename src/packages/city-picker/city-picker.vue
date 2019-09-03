<template>
  <a-popover>
    <template slot="content">
      <h5>城市选择</h5>
      <!-- <a-input size="small" placeholder="搜索您的城市" v-model="keyword"></a-input> -->
      <ul class="vcp-tags">
        <template v-for="(item,i) in keys">
          <li v-if="item=='hot'" class="hot" @click="choiceTag(item)" :key="i">热门</li>
          <li v-else :key="i" @click="choiceTag(item)">{{ item }}</li>
        </template>
      </ul>
      <div class="vcp-list">
        <div>
          <ul>
            <li
              class="city-item textover1"
              @click="handleItem(citys)"
              v-for="citys in defaultView"
              :key="citys.name"
            >{{ citys.name }}</li>
          </ul>
        </div>
      </div>
    </template>
    <a-input :value="result.name" :placeholder="placeholder"></a-input>
  </a-popover>
</template>
<script>
import cityList from 'china-city-data'
// import _ from 'loadsh'
let keys = Object.keys(cityList)
keys.splice(-1)
keys.unshift('hot')
let defaultView = cityList['hot']
let values = Object.values(cityList)
values = [].concat.apply([], values)
console.log('TCL: values', values)
export default {
  name: 'v-city-picker',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    // 城市列表
    cityList: {
      type: Object,
      default: function () {
        return Object.freeze(cityList)
      }
    }
  },
  data () {
    return {
      keys,
      defaultView,
      keyword: '',
      result: {}
    }
  },
  methods: {
    handleItem (item) {
      this.result = item
      this.$emit('ok', item)
    },
    // 选择标签
    choiceTag (key) {
      this.defaultView = cityList[key]
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/var.less";
.vcp-tags {
  overflow: hidden;
  margin: 5px 0;
  li {
    box-sizing: border-box;
    width: 26px;
    line-height: 26px;
    margin-bottom: 1px;
    display: block;
    float: left;
    background-color: @component-background;
    text-align: center;
    margin-right: 1px;
    &.hot {
      width: 53px;
    }
    cursor: pointer;

    &:first-child {
      border-left: none;
    }

    &:hover {
      color: @primary-color;
    }

    &.z-on {
      background-color: @primary-color;
      color: #fff;
    }
  }
}
.vcp-list {
  max-width: 500px;
}
.city-item {
  width: 110px !important;
  display: inline-block;
  cursor: pointer;
  padding-left: 4px;
  &:hover {
    color: @primary-color;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
