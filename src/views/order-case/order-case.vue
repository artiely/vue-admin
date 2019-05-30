<template>
  <v-create-table :sourceData="columns" :tableData="data"></v-create-table>
</template>
<script>
// const columns = [
//   { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
//   { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
//   { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
//   { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
//   { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
//   { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
//   { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
//   { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
//   { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
//   { title: 'Column 8', dataIndex: 'address', key: '8' },
//   {
//     title: 'Action',
//     key: 'operation',
//     fixed: 'right',
//     width: 100,
//     scopedSlots: { customRender: 'action' },
//   },
// ];

const columns = [
  // input基本使用
  {
    title: 'input',
    dataIndex: 'name',
    width: 100,
    fixed: 'left',
    formOptions: {
      el: 'input'
    }
  },
  // input.search
  {
    title: 'input.search',
    dataIndex: 'input2',
    width: 100,
    formOptions: {
      el: 'input.search'
    }
  },
  {
    title: 'input3',
    dataIndex: 'input3',
    width: 100,
    formOptions: {
      el: 'input'
    }
  },
  // 同步select值
  {
    title: 'select',
    className: 'select',
    dataIndex: 'select',
    width: 100,
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
    title: 'selectAsync',
    className: 'selectAsync',
    dataIndex: 'selectAsync',
    width: 100,
    formOptions: {
      el: 'select',
      options: [
      ]
    }
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: 100,
    formOptions: {
      el: 'input'
    }
  },
  {
    title: 'radio',
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
  {
    title: 'switch',
    dataIndex: 'switch',
    width: 100,
    formOptions: {
      el: 'switch',
      checkedChildren: '开',
      unCheckedChildren: '关'
    }
  },
  {
    title: 'checkbox',
    dataIndex: 'checkbox',
    width: 100,
    formOptions: {
      el: 'checkbox',
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' }
      ]
    }
  },
  {
    title: 'datepicker',
    width: 100,
    dataIndex: 'datepicker',
    formOptions: {
      el: 'datepicker',
      options: {}
    }
  },
  {
    title: 'timepicker',
    dataIndex: 'timepicker',
    width: 100,
    formOptions: {
      el: 'timepicker',
      options: {}
    }
  },
  {
    title: 'cascader',
    dataIndex: 'cascader',
    width: 100,
    formOptions: {
      el: 'cascader',
      options: [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [{
            value: 'xihu',
            label: 'West Lake'
          }]
        }]
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
          children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }]
        }]
      }]
    }
  },
  {
    title: 'rate',
    dataIndex: 'rate',
    width: 100,
    formOptions: {
      el: 'rate'
    }
  },
  {
    title: 'textarea',
    width: 100,
    dataIndex: 'textarea',
    formOptions: {
      el: 'textarea'
    }
  },
  {
    title: 'slider',
    width: 100,
    dataIndex: 'slider',
    formOptions: {
      el: 'slider'
    }
  },
  {
    title: 'upload',
    width: 100,
    dataIndex: 'upload',
    formOptions: {
      el: 'upload',
      // 上传地址
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
    }
  },
  {
    title: 'tree',
    width: 100,
    dataIndex: 'tree',
    formOptions: {
      el: 'tree',
      options: [{
        title: 'parent 1',
        key: '0-0',
        slots: {
          icon: 'smile'
        },
        children: [
          { title: 'leaf', key: '0-0-0', slots: { icon: 'meh' } },
          { title: 'leaf', key: '0-0-1', scopedSlots: { icon: 'custom' } }]
      }]
    }
  }
]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `${i}这是一个基本输入框`,
    input2: '这是一个搜索输入框',
    input3: '这是一个完全自定义的输入框',
    select: '这是一个基本输入框',
    selectAsync: '这是一个异步数据输入框',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
    radio: 'artiely',
    switch: true,
    checkbox: [],
    datepicker: '2019/10/20',
    timepicker: '23:59:59',
    cascader: ['zhejiang', 'hangzhou', 'xihu'],
    rate: 3,
    textarea: '这是一个文本域',
    slider: 30,
    upload: [{
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      tree: ''
    }]
  })
}

export default {
  data () {
    return {
      data,
      columns
    }
  }
}
</script>
