<template>
  <div class="filterbox" v-on-clickaway="blur">
    <a-input
      size="large"
      class="filter-input"
      ref="input"
      @focus="focus"
      v-model="keywords"
      :placeholder="placeholder"
    >
      <a-icon slot="prefix" type="search" class="filter-search" />
      <a-icon slot="suffix" type="close-circle" @click="emitEmpty" />
    </a-input>
    <div class="filterbox-group" v-show="show" :key="1">
      <div class="filterbox-item" v-for="(filterItem,index) in data" :key="index">
        <!-- 自定义时间 -->
        <template v-if="filterItem.type=='date-range-picker'">
          <v-date-range-picker @change="dateChange">
            <a-badge :dot="data[index].defaultValue.filter(v=>v).length?true:false">{{filterItem.label}}</a-badge>
            <v-icon name="icon-xiala" class="fr"></v-icon>
          </v-date-range-picker>
        </template>
        <a-popover v-else placement="bottomLeft" :getPopupContainer="(e)=>e.parentNode">
          <template slot="content">
            <!-- 多选 -->
            <a-checkbox-group v-if="filterItem.type=='checkbox'" v-model="data[index].defaultValue">
              <a-row v-for="(item,i) in filterItem.options" :key="i">
                <a-col>
                  <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
            <!-- 单选 -->
            <a-radio-group v-else-if="filterItem.type=='radio'" v-model="data[index].defaultValue">
              <a-row v-for="(item,i) in filterItem.options" :key="i">
                <a-col>
                  <a-radio :value="item.value">{{item.label}}</a-radio>
                </a-col>
              </a-row>
            </a-radio-group>
          </template>
          <div>
            <a-badge :dot="filterItem.type=='radio'&&data[index].defaultValue?true:false">
              {{filterItem.label}}
              <a-badge
                v-if="filterItem.type=='checkbox'"
                class="checkbox-badge"
                :count="data[index].defaultValue.length"
              />
            </a-badge>
            <v-icon name="icon-xiala" class="fr"></v-icon>
          </div>
        </a-popover>
      </div>
    </div>
    <!-- tags -->
    <div class="filter-tags" v-if="hasTag">
      <span v-for="(item,j) in data" :key="j">
        <span v-if="item.type=='date-range-picker'">
          <span>
            <a-tag
              closable
              @close="closeTime(j)"
              v-if="item.defaultValue.length"
            >
            {{item.defaultValue.join(' ~ ')}}
            </a-tag>
          </span>
        </span>
        <span v-else>
          <template v-for="(sub,i) in item.options">
            <template v-if="item.type=='checkbox'">
              <a-tag
                closable
                :key="i"
                v-if="item.defaultValue.indexOf(sub.value)!=-1"
                @close="closeCheck(eq,sub.value)"
              >{{sub.label}}</a-tag>
            </template>
            <template v-else-if="item.type=='radio'">
              <a-tag
                closable
                :key="i"
                v-if="item.defaultValue==sub.value"
                @close="closeRadio(eq,sub.value)"
              >{{sub.label}}</a-tag>
            </template>
          </template>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  name: 'v-filter',
  mixins: [clickaway],
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    dataIndex: {
      type: String,
      default: 'keywords'
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      show: false,
      keywords: '',
      timer: null
    }
  },
  watch: {
    keywords: {
      handler () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.finalFilter()
        }, 400)
      }
    },
    data: {
      handler (val) {
        this.finalFilter()
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    hasTag () {
      let values = Object.values(this.value)
      let len = values.filter(v => {
        return v && v.toString().length
      })
      return !!len.length
    }
  },
  methods: {
    dateChange (dateString) {
      let index = this.data.findIndex(el => el.type === 'date-range-picker')
      this.data[index].defaultValue.splice(0, 2, ...dateString)
      this.$set(this.data[index], 'defaultValue', dateString)
      this.data[index].defaultValue = dateString
    },
    closeTime (j) {
      this.data[j].defaultValue.splice(0)
    },
    finalFilter () {
      let obj = {}
      this.data.map(v => {
        obj[v.dataIndex] = v.defaultValue
      })
      obj[this.dataIndex] = this.keywords
      this.$emit('input', obj)
    },
    emitEmpty (e) {
      this.$refs.input.focus()
      this.keywords = ''
    },
    focus () {
      this.show = true
    },
    blur () {
      this.show = false
    },
    closeCheck (eq, val) {
      let index = this.data[eq].defaultValue.indexOf(val)
      this.data[eq].defaultValue.splice(index, 1)
    },
    closeRadio (eq, val) {
      this.data[eq].defaultValue = null
    }
  }
}
</script>

<style lang="less" >
@import "../../assets/styles/var.less";
.filterbox {
  background: @input-bg;
  border-radius: 4px;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
  // overflow: hidden;
  .filter-tags {
    padding: 10px 20px;
    border-top: 1px solid #d5d5d5;
  }
  .filter-search {
    font-size: 16px;
  }
  .filter-input .ant-input {
    border: 0;
    outline: none;
    box-shadow: none;
  }
  .filterbox-group {
    border-top: 1px solid #d5d5d5;
    display: flex;
    // background: @background-color-base;
    .filterbox-item {
      font-size: 14px;
      padding: 10px;
      min-width: 100px;
      border-right: 1px solid #eee;
      .checkbox-badge {
        transform: scale(0.8);
        vertical-align: text-top;
      }
    }
  }
}
</style>
