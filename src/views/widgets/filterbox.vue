<template>
  <div>
    <v-card>
      <v-filter v-model="filter" :data="data" placeholder="请输入客户名/客户手机号等查询"></v-filter>
      <!-- <pre>{{filter}}</pre> -->
      <v-pre-code>{{filter}}</v-pre-code>
    </v-card>
    <div style="height:1000px"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter: {},
      data: [
        {
          label: '结算方式',
          dataIndex: 'payType',
          defaultValue: ['1'],
          type: 'checkbox',
          options: [
            { label: '现金结算', value: '1' },
            { label: '微信结算', value: '2' },
            { label: '支付宝结算', value: '3' },
            { label: '银行卡结算', value: '4' },
            { label: '储值卡结算', value: '5' }
          ]
        },
        {
          label: '开单时间',
          dataIndex: 'startTime',
          defaultValue: '2',
          type: 'radio',
          options: [
            { label: '今日', value: '1' },
            { label: '本周', value: '2' },
            { label: '本月', value: '3' },
            { label: '上月', value: '4' },
            { label: '本年', value: '5' }
          ]
        },
        {
          label: '自定义时间',
          dataIndex: 'endTime',
          defaultValue: [],
          type: 'date-range-picker'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
