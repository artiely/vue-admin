<template>
  <!-- 基本表格 -->
  <div>
    <a-card>
      <a-alert message="高级表格" description="在表格生成器下支持自定义实现丰富的业务需求" type="info" showIcon />
      <br />
      <div>
        <a-button-group>
          <a-button type="primary" icon="cloud-download">导入数据</a-button>
          <a-button type="dashed" icon="cloud">备份到邮箱</a-button>
          <a-button type="dashed" icon="cloud-download">下载到本地</a-button>
          <a-popover title="显示设置">
            <template slot="content">
              <div style="width:200px">
                <v-cell onoff title="紧凑型" @change="onChangeSize"></v-cell>
                <v-cell
                  onoff
                  title="显示边框"
                  :defaultChecked="bordered==='bordered'"
                  @change="onChangeBorder"
                ></v-cell>
              </div>
              <p>显示字段</p>
              <div>
                <a-row>
                  <a-col :span="8" v-for="(item,index) in columns" :key="item.title">
                    <a-checkbox
                      :value="index"
                      :checked="!item.hidden"
                      :disabled="index===0"
                      @change="onChangeTableColumn"
                    >{{item.title}} {{item.hidden}}</a-checkbox>
                  </a-col>
                </a-row>
              </div>
            </template>
            <a-button type="default" icon="setting">显示</a-button>
          </a-popover>
        </a-button-group>
      </div>
      <br />
      <v-create-table
        :sourceData="columns"
        :tableData="data"
        :size="size"
        :rowKey="(record)=>record.userinfo.id"
        :bordered="bordered"
        :loading="loading"
        @handle-edit="handleEdit"
      >
        <!-- 用户信息 -->
        <template v-slot:userinfo.name="{row}">
          <a-popover :title="row.userinfo.name+' 的信息'">
            <template slot="content">
              <p>电话：{{row.userinfo.tel|telFormat()}}</p>
              <p>邮箱：{{row.userinfo.email}}</p>
              <p>生日：{{row.userinfo.birthday}}</p>
              <p>地址：{{row.userinfo.province}}</p>
              <p>描述：{{row.userinfo.desc}}</p>
              <p style="max-width:400px">备注：{{row.userinfo.remark}}</p>
            </template>
            <a-avatar
              :style="{backgroundColor:row.userinfo.color}"
            >{{row.userinfo.name.split('')[0]}}</a-avatar>
            {{row.userinfo.name}}
          </a-popover>
        </template>
        <!-- 手机号 -->
        <template v-slot:userinfo.tel="{row}">
          <a-tooltip placement="topLeft">
            <template slot="title">
              <span>点击复制</span>
            </template>
            <div
              class="select-none textover1 number"
              v-clipboard="{value:row.userinfo.tel,success:clipboardSuccess,error:clipboardError}"
            >{{row.userinfo.tel|telFormat()}}</div>
          </a-tooltip>
        </template>
        <!-- 星级 -->
        <template v-slot:order.rate="{row}">
          <a-rate :value="row.order.rate" disabled />
        </template>
      </v-create-table>
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
    width: 120,
    tooltip: true,
    fixed: 'left',
    sortable: true,
    formOptions: {
      el: 'input'
    }
  },
  // input.search
  {
    title: '手机号',
    dataIndex: 'userinfo.tel',
    width: 150,
    hidden: false,
    formOptions: {
      el: 'input'
    },
    sorter: (a, b) => a.userinfo.tel - b.userinfo.tel
  },
  {
    title: '执照',
    dataIndex: 'userinfo.motor.licence',
    width: 150,
    tooltip: true,
    hidden: true,
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
      loading: true,
      showForm: false,
      defaultData: {},
      size: 'default',
      bordered: false
    }
  },
  created () {
    this.$api.ORDER_LIST().then(v => {
      this.loading = false
      this.data = v.list
    })
  },
  methods: {
    onChangeTableColumn (val) {
      let cols = this.columns
      let i = val.target.value
      cols[i].hidden = cols[i].hidden ? !cols[i].hidden : true
      this.columns = [...cols]

      console.log('TCL: onChangeTableColumn -> val', val)
    },
    onChangeSize (val) {
      this.size = val ? 'small' : 'default'
    },
    onChangeBorder (val) {
      this.bordered = val
    },
    clipboardSuccess () {
      this.$message.info('已复制到粘贴板')
    },
    clipboardError () {
      this.$message.info('复制失败')
    },
    handleEdit (text, record) {
      console.log('TCL: handleEdit -> record', record)
      console.log('TCL: handleEdit -> text', text)
      this.showForm = true
      this.defaultData = record
    }
  }
}
</script>
