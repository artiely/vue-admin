<template>
  <v-card>
      <a-alert
      message="表单生成器"
      description="一段JSON配置自动生成表单，支持view modal drawer"
      type="info"
      showIcon
    />
    <br>
    <v-create-form :sourceData="columns"  :defaultData="defaultData">
      <template v-slot:input3="{scope,value}">
        <a-form-item :label="scope.title" :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18 }">
          <a-input placeholder="123"  ref="userNameInput"  v-decorator="[
                scope.dataIndex,
                {rules: scope.formOptions.rules,initialValue: defaultData[scope.dataIndex]}
              ]">
            <a-icon slot="prefix" type="user" />
            <a-icon v-if="defaultData[scope.dataIndex]" slot="suffix" type="close-circle"  />
          </a-input>
        </a-form-item>
      </template>
    </v-create-form>
    <div>
      <a-button @click="visible=true">抽屉展示</a-button>
      <a-button @click="visible2=true">模态展示</a-button>
      <v-create-form v-model="visible" model="drawer" :sourceData="columns"  :defaultData="defaultData"></v-create-form>
      <v-create-form v-model="visible2" model="modal" :sourceData="columns"  :defaultData="defaultData"></v-create-form>
    </div>
  </v-card>
</template>

<script>
const columns = [
  // input基本使用
  {
    title: '输入框',
    dataIndex: 'name',
    width: 200,
    fixed: 'left',
    formOptions: {
      el: 'input',
      allowClear: true
    }
  },
  // input.search
  {
    title: '搜索框',
    dataIndex: 'input2',
    formOptions: {
      el: 'input.search'
    }
  },
  {
    title: '自定义',
    dataIndex: 'input3',
    formOptions: {
      el: 'input'
    }
  },
  // 同步select值
  {
    title: '下拉框',
    className: 'select',
    dataIndex: 'select',
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
    formOptions: {
      el: 'select',
      options: [
      ]
    }
  },
  {
    title: '输入框',
    dataIndex: 'address',
    formOptions: {
      el: 'input'
    }
  },
  {
    title: '单选框',
    dataIndex: 'radio',
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
    title: '开关',
    dataIndex: 'switch',
    formOptions: {
      el: 'switch',
      checkedChildren: '开',
      unCheckedChildren: '关'
    }
  },
  {
    title: '复选框',
    dataIndex: 'checkbox',
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
    title: '日期',
    dataIndex: 'datepicker',
    formOptions: {
      el: 'datepicker',
      options: {}
    }
  },
  {
    title: '时间',
    dataIndex: 'timepicker',
    formOptions: {
      el: 'timepicker',
      options: {}
    }
  },
  {
    title: '级联',
    dataIndex: 'cascader',
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
    title: '星级',
    dataIndex: 'rate',
    formOptions: {
      el: 'rate'
    }
  },
  {
    title: '文本域',
    dataIndex: 'textarea',
    formOptions: {
      el: 'textarea'
    }
  },
  {
    title: '滑块',
    dataIndex: 'slider',
    formOptions: {
      el: 'slider'
    }
  },
  {
    title: '上传',
    dataIndex: 'upload',
    formOptions: {
      el: 'upload',
      // 上传地址
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
    }
  },
  {
    title: '树',
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
export default {
  data () {
    return {
      visible: false,
      visible2: false,
      columns,
      // 初始值 新增时值为空，编辑时为对应的值
      defaultData: {
        name: '这是一个基本输入框',
        input2: '这是一个搜索输入框',
        input3: '这是一个完全自定义的输入框',
        select: '这是一个基本输入框',
        selectAsync: '这是一个异步数据输入框',
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
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }],
        tree: []
      }
    }
  },
  mounted () {
    // 异步的数据直接赋值
    setTimeout(() => {
      this.columns[4].formOptions.options = [
        {
          label: 'John Brown',
          value: 'John Brown'
        },
        {
          label: 'artiely',
          value: 'artiely'
        }
      ]
    }, 3000)
  }

}
</script>

<style>

</style>
