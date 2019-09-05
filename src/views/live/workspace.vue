
<template>
  <div class="workspace">
    123
    <a-button @click="guide">开始引导</a-button>
    <div id="id1">
      <v-iconbox v-model="iconname"/>
    </div>456
    <v-avatar-group></v-avatar-group>
    <v-count-to :endVal="1000000" style="font-size:24px;"></v-count-to>
    <a-iconfont type="icon-xiaoxi"></a-iconfont>自定义指令和过滤器
    <p>无单位万字</p>
    <div class="money" v-currency="10000.34" id="id2"></div>
    <p>万以下</p>
    <div class="money" v-currency:w="{value:99}"></div>
    <p>万以上</p>
    <div class="money" v-currency:w="{value:1200003}"></div>
    <a-date-picker />
    <p>亿以上</p>
    <div class="money" v-currency:w="{value:12000037889}" id="id3"></div>
    <p>单位与数字的比例</p>
    <div class="money" v-currency:w="{value:82000037889,zoom:0.7}"></div>
    <p>无分隔符</p>
    <div class="money" v-currency:w="{value:82037889,zoom:0.7,separator:''}" id="id4"></div>
    <p>不保留小数位</p>
    <div class="money" v-currency:w="{value:82037889,zoom:0.7,separator:'',decimals:0}"></div>
    <p>不要货币符号</p>
    <div class="money" v-currency:w="{value:82037889,zoom:0.7,separator:'',decimals:0,pre:''}"></div>
    <p>自定义单位</p>
    <div class="money" v-currency:w="{value:82037889,zoom:0.7,separator:'',decimals:0,unit:'圆'}"></div>
    <p>自定义货币符号</p>
    <div class="money" v-currency="{value:82037889,zoom:1,separator:',',decimals:2,pre:'€'}"></div>
    <a-range-picker
      :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
      showTime
      format="YYYY/MM/DD HH:mm:ss"
    />
    <div style="height:1000px;" ref="123"></div>
    <v-guide :steps="steps" ref="guide"></v-guide>
  </div>
</template>
<script>
import moment from 'moment'
const steps = [
  {
    element: '#id1',
    popover: {
      className: 'first-step-popover-class',
      title: 'Title on Popover',
      description: 'Body of the popover',
      position: 'bottom'
    }
  },
  {
    element: '#id2',
    popover: {
      title: 'Title on Popover',
      description: 'Body of the popover',
      position: 'top'
    }
  },
  {
    element: '#id3',
    popover: {
      title: 'Title on Popover',
      description: 'Body of the popover',
      position: 'top'
    }
  }
]
export default {
  name: 'workspace',
  components: {},
  data () {
    return {
      moment: Object.freeze(moment),
      steps,
      iconname: ''
    }
  },
  computed: {},
  watch: {},
  /*
  beforeCreate
  created
  beforeMount
  mounted
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  destroyed
  errorCaptured
   */
  created () {
  },
  mounted () {
    this.$nextTick(() => {})
  },
  methods: {
    guide () {
      this.$refs.guide.start()
    }
  }
}
</script>
<style lang="less" scoped>
.workspace {
  .money {
    font-size: 30px;
  }
}
</style>
