<template>
  <div>
    <v-create-form :sourceData="columns"  :defaultData="defaultData">
      <template v-slot:input3="{scope,value}">
        <!-- 自定义表单3 -->
        <a-form-item :label="scope.title" :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18 }">
          <a-input placeholder="Basic usage"  ref="userNameInput"  v-decorator="[
                scope.dataIndex,
                {rules: scope.formOptions.rules,initialValue: defaultData[scope.dataIndex]}
              ]">
            <a-icon slot="prefix" type="user" />
            <a-icon v-if="defaultData[scope.dataIndex]" slot="suffix" type="close-circle"  />
          </a-input>
        </a-form-item>
      </template>
    </v-create-form>
  </div>
</template>

<script>
const columns = [
  // input基本使用
  {
    title: 'input',
    dataIndex: 'name',
    formOptions: {
      el: 'input'
    }
  },
  // input.search
  {
    title: 'input.search',
    dataIndex: 'input2',
    formOptions: {
      el: 'input.search'
    }
  },
  {
    title: 'input3',
    dataIndex: 'input3',
    formOptions: {
      el: 'input'
    }
  },
  // 同步select值
  {
    title: 'select',
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
    title: 'selectAsync',
    className: 'selectAsync',
    dataIndex: 'selectAsync',
    formOptions: {
      el: 'select',
      options: [
      ]
    }
  },
  {
    title: 'Address',
    dataIndex: 'address',
    formOptions: {
      el: 'input'
    }
  },
  {
    title: 'radio',
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
    title: 'switch',
    dataIndex: 'switch',
    formOptions: {
      el: 'switch',
      checkedChildren: '开',
      unCheckedChildren: '关'
    }
  },
  {
    title: 'checkbox',
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
    title: 'datepicker',
    dataIndex: 'datepicker',
    formOptions: {
      el: 'datepicker',
      options: {}
    }
  },
  {
    title: 'timepicker',
    dataIndex: 'timepicker',
    formOptions: {
      el: 'timepicker',
      options: {}
    }
  }
]
export default {
  data () {
    return {
      columns,
      // 初始值 新增时值为空，编辑时为对应的值
      defaultData: {
        name: '1',
        input2: '1',
        input3: '1',
        select: 'John Brown',
        selectAsync: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
        radio: 'artiely',
        switch: true,
        checkbox: [],
        datepicker: '2019/10/20',
        timepicker: '23:59:59'
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
