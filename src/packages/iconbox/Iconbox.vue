<template>
     <a-popover>
       <span slot="title">
         <a-button size="small" :type="type==1?'primary':'default'" @click="type=1" style="margin-right:20px">复制标签</a-button>
         <a-button size="small" :type="type==2?'primary':'default'" @click="type=2">复制属性</a-button>
       </span>

      <span slot="icon"></span> <span slot="cancelText"></span><span slot="okText"></span>
  <div class="iconbox" slot="content">
    <v-button v-for="item in data" :key="item" @click="handleClick(item)" v-clipboard="{value:type==1?`<v-icon name='${item}' />`:item,success,error}">
    <v-icon :name="item"></v-icon>
    </v-button>
  </div>
    <a-input placeholder="default size" :value="currVal"><v-icon slot="addonBefore" :name="currVal"/></a-input>
  </a-popover>
</template>

<script>

export default {
  name: 'iconbox',
  props: {
    value: {
      type: String,
      default: 'icon-supply'
    }
  },
  data () {
    return {
      type: 1,
      data: [
        'icon-inport', 'icon-daochu', 'icon-download-fill', 'icon-weibiaoti526', 'icon-zhtn', 'icon-commodity', 'icon-int', 'icon-tools', 'icon-supply', 'icon-questions', 'icon-qianniudaidise', 'icon-budaidise', 'icon-decoration_fill', 'icon-shake', 'icon-marketing_fill', 'icon-financial_fill', 'icon-wangwang', 'icon-unfold', 'icon-packup', 'icon-transaction_fill', 'icon-shop_fill', 'icon-publishgoods_fill', 'icon-qianniu', 'icon-searchfill', 'icon-search', 'icon-workbench', 'icon-workbench_fill', 'icon-warning', 'icon-warning_fill', 'icon-video_fill', 'icon-video', 'icon-unlock', 'icon-unlock_fill', 'icon-undo', 'icon-trash_fill', 'icon-trash', 'icon-translation', 'icon-translation_fill', 'icon-time', 'icon-time_fill'
      ]
    }
  },
  computed: {
    currVal () {
      return this.value ? this.value : 'icon-supply'
    }
  },
  methods: {
    handleClick (val) {
      this.$emit('input', val)
    },
    success () {
      this.$message.info('已复制到剪切板')
    },
    error () {
      this.$message.info('复制失败')
    }
  }
}
</script>

<style lang="less" >
.iconbox{
  width:400px
}

</style>
