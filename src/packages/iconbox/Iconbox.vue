<template>
    <a-popconfirm >
  <div class="iconbox" slot="title">
    <v-button v-for="item in data" >
    <v-icon :name="item"></v-icon>
    </v-button>
  </div>
    <a href="#">Delete</a>
  </a-popconfirm>
</template>

<script>

export default {
  name: 'iconbox',
  props: {
   
  },
  data () {
    return {
      data:[
        'icon-inport','icon-daochu','icon-download-fill','icon-weibiaoti526','icon-zhtn','icon-commodity','icon-int','icon-tools','icon-supply','icon-questions','icon-qianniudaidise','icon-budaidise','icon-decoration_fill','icon-shake','icon-marketing_fill','icon-financial_fill','icon-wangwang','icon-unfold','icon-packup','icon-transaction_fill','icon-shop_fill','icon-publishgoods_fill','icon-qianniu','icon-searchfill','icon-search','icon-workbench','icon-workbench_fill','icon-warning','icon-warning_fill','icon-video_fill','icon-video','icon-unlock','icon-unlock_fill','icon-undo','icon-trash_fill','icon-trash','icon-translation','icon-translation_fill','icon-time','icon-time_fill'
      ]
    }
  }
}
</script>

<style lang="less" >
.iconbox{
  width:400px
}

</style>
