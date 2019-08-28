<template>
  <!-- 基本表格 -->
  <div>
    <a-card>
        <a-alert
      message="表格生成器"
      description="配置一段JSON即可完成支持CRUD的表格与表单，并且自动响应式"
      type="info"
      showIcon
    />
    <br>
      <v-create-table
        :sourceData="columns"
        :tableData="data"
        :loading="loading"
        @handle-edit="handleEdit"
      >
        <template v-slot:name="{row}">
          <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          {{row.name}}
        </template>
        <template v-slot:rate="{row}">
          <a-rate :value="row.rate" disabled />
        </template>
        <template v-slot:select="{row}">
          <a-popover title="Title">
            <template slot="content">
              <p>{{row.select}}</p>
              <p>{{row.select}}</p>
            </template>
            <a style="display:block;width:120px">更多信息点我</a>
          </a-popover>
        </template>
        <template v-slot:checkbox="{row}">
          <a-tag
            v-for="item in row.checkbox"
            :key="item"
            :color="item=='Apple'?'red':'pink'"
          >{{item}}</a-tag>
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
    title: '型号',
    dataIndex: 'name',
    width: 80,
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
    title: '手机号(固定长度)',
    dataIndex: 'input2',
    width: 150,
    formOptions: {
      el: 'input.search'
    }
  },
  // 自定义
  {
    title: '自定义(内容长)',
    dataIndex: 'input3',
    tooltip: true,
    width: 100,
    formOptions: {
      el: 'input'
    }
  },
  // 复选
  {
    title: '复选框',
    dataIndex: 'checkbox',
    width: 150,
    formOptions: {
      el: 'checkbox',
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' }
      ]
    },
    filters: [
      {
        text: 'Apple',
        value: 'Apple'
      },
      {
        text: 'Pear',
        value: 'Pear'
      }
    ],
    filterMultiple: true,
    filterMethod (value, row) {
    }
  },
  // 星级
  {
    title: '星级',
    dataIndex: 'rate',
    width: 200,
    formOptions: {
      el: 'rate'
    }
  },
  // 同步select值
  {
    title: '下拉框',
    className: 'select',
    dataIndex: 'select',
    width: 100,
    tooltip: true,
    formOptions: {
      el: 'select',
      options: [
        {
          label: 'John Brown',
          value: 'John Brown',
          disabled: true
        },
        {
          label: 'artiely',
          value: 'artiely'
        }
      ]
    }
  },
  // 异步select值
  {
    title: '异步下拉框',
    className: 'selectAsync',
    dataIndex: 'selectAsync',
    tooltip: true,
    width: 100,
    formOptions: {
      el: 'select',
      options: []
    }
  },
  // 输入框
  {
    title: '输入框',
    dataIndex: 'address',
    tooltip: true,
    width: 100,
    formOptions: {
      el: 'input'
    }
  },
  // 单选
  {
    title: '单选框',
    dataIndex: 'radio',
    width: 100,
    formOptions: {
      el: 'radio',
      options: [
        {
          label: 'John Brown',
          value: 'John Brown',
          disabled: true
        },
        {
          label: 'artiely',
          value: 'artiely'
        }
      ]
    }
  },
  // 开关
  {
    title: '开关',
    dataIndex: 'switch',
    width: 100,
    formOptions: {
      el: 'switch',
      checkedChildren: '开',
      unCheckedChildren: '关'
    }
  },

  // 日期
  {
    title: '日期',
    dataIndex: 'datepicker',
    width: 100,
    formOptions: {
      el: 'datepicker',
      options: {}
    }
  },
  // 时间
  {
    title: '时间',
    dataIndex: 'timepicker',
    width: 100,
    formOptions: {
      el: 'timepicker',
      options: {}
    }
  },
  // 级联
  {
    title: '级联',
    dataIndex: 'cascader',
    width: 100,
    tooltip: true,
    formOptions: {
      el: 'cascader',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // 文本域
  {
    title: '文本域',
    dataIndex: 'textarea',
    width: 100,
    formOptions: {
      el: 'textarea'
    }
  },
  // 滑块
  {
    title: '滑块',
    dataIndex: 'slider',
    width: 100,
    formOptions: {
      el: 'slider'
    }
  },
  // 上传
  {
    title: '上传',
    dataIndex: 'upload',
    tooltip: true,
    width: 100,
    formOptions: {
      el: 'upload',
      // 上传地址
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
    }
  },
  // 树
  {
    title: '树',
    dataIndex: 'tree',
    width: 100,
    formOptions: {
      el: 'tree',
      options: [
        {
          title: 'parent 1',
          key: '0-0',
          slots: {
            icon: 'smile'
          },
          children: [
            { title: 'leaf', key: '0-0-0', slots: { icon: 'meh' } },
            { title: 'leaf', key: '0-0-1', scopedSlots: { icon: 'custom' } }
          ]
        }
      ]
    }
  }
]

const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `${i}`,
    input2: `1592629046${i}`,
    input3: '这是一个完全自定义的输入框',
    select: '这是一个基本输入框',
    selectAsync: '这是一个异步数据输入框',
    address: 'New York No. 1 Lake Park',
    radio: 'artiely',
    switch: true,
    checkbox: ['Apple', 'Pear'],
    datepicker: '2019/10/20',
    timepicker: '23:59:59',
    cascader: ['zhejiang', 'hangzhou', 'xihu'],
    rate: 3,
    textarea: '这是一个文本域',
    slider: 30,
    upload: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ],
    tree: []
  })
}

export default {
  data () {
    return {
      data,
      columns,
      loading: false,
      showForm: false,
      defaultData: {}
    }
  },
  methods: {
    handleEdit (text, record) {
      this.showForm = true
      this.defaultData = record
    }
  }
}
</script>
