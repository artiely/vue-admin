<template>
  <!-- 基本表格 -->
  <div>
    <a-card>
      <h1>基本表格</h1>
      <v-create-table2
        :sourceData="columns"
        :tableData="data"
        :loading="loading"
        @handle-edit="handleEdit"
      >
        <template v-slot:userinfo.name="{row}">
          <a-popover :title="row.userinfo.name+' 的信息'">
            <template slot="content">
              <p>电话：{{row.userinfo.tel}}</p>
              <p>邮箱：{{row.userinfo.email}}</p>
              <p>生日：{{row.userinfo.birthday}}</p>
              <p>地址：{{row.userinfo.province}}</p>
              <p>描述：{{row.userinfo.desc}}</p>
              <p style="max-width:400px">备注：{{row.userinfo.remark}}</p>
            </template>
            <a-avatar :style="{backgroundColor:row.userinfo.color}">{{row.userinfo.name.split('')[0]}}</a-avatar>
            {{row.userinfo.name}}
          </a-popover>
        </template>
        <template v-slot:order.rate="{row}">
          <a-rate :value="row.order.rate" disabled />
        </template>
      </v-create-table2>
    </a-card>
    <v-create-form
      :sourceData="columns"
      :defaultData="defaultData"
      model="modal"
      v-model="showForm"
    ></v-create-form>
  </div>
</template>
<script>
const columns = [
  // input基本使用
  {
    title: '用户',
    dataIndex: 'userinfo.name',
    width: 180,
    tooltip: true,
    fixed: 'left',
    sortable: true,
    formOptions: {
      el: 'input'
    },
    sorter: (a, b) => a.name - b.name
  },
  // input.search
  {
    title: '手机号',
    dataIndex: 'userinfo.tel',
    width: 150,
    formOptions: {
      el: 'input'
    }
  },
  {
    title: '执照',
    dataIndex: 'userinfo.motor.licence',
    width: 150,
    formOptions: {
      el: 'input'
    }
  },
  // 自定义
  {
    title: '备注',
    dataIndex: 'order.remark',
    tooltip: true,
    width: 100,
    formOptions: {
      el: 'textarea'
    }
  },
  // 星级
  {
    title: '星级',
    dataIndex: 'order.rate',
    width: 200,
    formOptions: {
      el: 'rate'
    }
  },
  // 日期
  {
    title: '日期',
    dataIndex: 'order.createtime',
    width: 200,
    formOptions: {
      el: 'datepicker',
      options: {}
    }
  }
]

export default {
  data () {
    return {
      data: [],
      columns,
      loading: false,
      showForm: false,
      defaultData: {}
    }
  },
  created () {
    this.$api.ORDER_LIST().then(v => {
      this.data = v.list
    })
  },
  methods: {
    handleEdit (text, record) {
      console.log('TCL: handleEdit -> record', record)
      console.log('TCL: handleEdit -> text', text)
      this.showForm = true
      this.defaultData = record
    }
  }
}
</script>
