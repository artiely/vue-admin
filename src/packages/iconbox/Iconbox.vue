<template>
     <a-popover title="点击选择">
      <span slot="icon"></span> <span slot="cancelText"></span><span slot="okText"></span>
  <div class="iconbox" slot="content">
    <v-button v-for="item in data" @click="handleClick(item)">
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
    value:{
      type:String,
      default:'icon-supply'
    },
  },
  data () {
    return {
      data:[
        'icon-inport','icon-daochu','icon-download-fill','icon-weibiaoti526','icon-zhtn','icon-commodity','icon-int','icon-tools','icon-supply','icon-questions','icon-qianniudaidise','icon-budaidise','icon-decoration_fill','icon-shake','icon-marketing_fill','icon-financial_fill','icon-wangwang','icon-unfold','icon-packup','icon-transaction_fill','icon-shop_fill','icon-publishgoods_fill','icon-qianniu','icon-searchfill','icon-search','icon-workbench','icon-workbench_fill','icon-warning','icon-warning_fill','icon-video_fill','icon-video','icon-unlock','icon-unlock_fill','icon-undo','icon-trash_fill','icon-trash','icon-translation','icon-translation_fill','icon-time','icon-time_fill'
      ],
    }
  },
  computed:{
    currVal(){
      return this.value?this.value:'icon-supply'
    }
  },
  methods:{
    handleClick(val){
      this.$emit('input',val)
    }
  }
}
</script>

<style lang="less" >
.iconbox{
  width:400px
}

</style>
