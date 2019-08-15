<template>
  <div class="filterbox" v-on-clickaway="blur">
    <a-input
      size="large"
      class="filter-input"
      @focus="focus"
      :placeholder="mainInput.label||placeholder"
    >
      <a-icon slot="prefix" type="search" class="filter-search" />
    </a-input>
    <div class="filterbox-group" v-show="show">
      <div class="filterbox-item" v-for="(filterItem,index) in finalData" :key="index">
        <a-popover placement="bottomLeft" :getPopupContainer="(e)=>e.parentNode">
          <template slot="content">
            <a-checkbox-group v-if="filterItem.type=='checkbox'">
              <a-row v-for="(item,i) in filterItem.options" :key="i">
                <a-col>
                  <a-checkbox :value="item" @change="handleChange(item ,i,finalData)">{{item.label}}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
            <a-radio-group v-else-if="filterItem.type=='radio'">
              <a-row v-for="(item,i) in filterItem.options" :key="i">
                <a-col>
                  <a-radio :value="item">{{item.label}}</a-radio>
                </a-col>
              </a-row>
            </a-radio-group>
          </template>
          <a>
            <a-badge :dot="filterItem.type=='radio'&&selectData.options?true:false">
              {{filterItem.label}}
              <!-- <a-badge
                v-if="filterItem.type=='checkbox'"
                class="checkbox-badge"
                :count="selectData.options.length"
              />-->
            </a-badge>
            <v-icon name="icon-xiala" class="fr"></v-icon>
          </a>
        </a-popover>
      </div>
    </div>
    <div>
      <!-- <div v-for="(item,eq) in finalData" :key="eq">
        <template v-for="(sub,i) in item.options">
          <a-tag closable :key="i">{{sub.label}}</a-tag>
        </template>
      </div>-->
    </div>
    <v-pre-code>{{selectData}}</v-pre-code>
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
      finalFilter: {},
      selectData: {}
    }
  },
  watch: {
    //   遍历出最终提交的数据结构
    data: {
      handler (val) {
        // let obj = {};
        // let newObj=[]
        // this.data.map(v => {
        //   obj[v.dataIndex] = v.defaultValue || null;
        //   newObj.options=[]
        //   newObj.dataIndex=v.dataIndex
        // });
        // this.finalFilter = obj;
        // let obj = val.map(v => {
        //   v.options = [];
        //   return v;
        // });
        // this.selectData = obj;
      },
      deep: true,
      immediate: true
    },
    finalFilter: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    //   确定输入框的字段
    mainInput () {
      return this.data.filter(v => {
        return v.type === 'input'
      })[0]
    },
    // 处输入框以外的选择字段
    finalData () {
      return this.data.filter(v => {
        return v.type !== 'input'
      })
    }
  },
  methods: {
    focus () {
      this.show = true
    },
    blur () {
      this.show = false
    },
    handleChange (a, b, c) {
      console.log('TCL: handleChange -> e', a, b, c)
    },
    handleChange1 (s) {
      console.log('TCL: s', s)
    }
  }
}
</script>

<style lang="less" >
.filterbox {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
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
    background: #fff;
    .filterbox-item {
      font-size: 14px;
      padding: 10px;
      width: 120px;
      border-right: 1px solid #eee;
      .checkbox-badge {
        transform: scale(0.8);
        vertical-align: text-top;
      }
    }
  }
}
</style>
