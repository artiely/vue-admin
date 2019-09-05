<template>
<v-card>
     <a-alert
      message="输入内容格式化"
      description="示例中展示了the-mask结合antd的表单一起使用"
      type="info"
      showIcon
    />
  <div>
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="手机号"
      >
        <the-mask
          :mask="['### #### ####']"
          class="v-input ant-input"
          @input="handleChangeTel"
          v-decorator="[
                'phone',
                {
                  'initialValue':'',
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                }
              ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="银行卡"
      >
        <the-mask
          :mask="['#### #### #### ####']"
          class="v-input ant-input"
          @input="handleChangeCard"
          v-decorator="[
                'card',
                {
                  'initialValue':'',
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                }
              ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="姓名"
      >
        <a-input
          v-decorator="[
          'name',
          {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          }
        ]"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
    <a-button type="primary" @click="check">Check</a-button>
    {{result}}
  </div>
  </v-card>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
}
export default {
  data () {
    return {
      formItemLayout: Object.freeze(formItemLayout),
      formTailLayout: Object.freeze(formTailLayout),
      result: {}
    }
  },
  computed: {
    form () {
      return this.$form.createForm(this)
    }
  },
  methods: {
    handleChangeTel (value) {
      this.form.setFieldsValue({
        phone: value
      })
    },
    handleChangeCard (value) {
      this.form.setFieldsValue({
        card: value
      })
    },
    check () {
      this.form.validateFields((err, values) => {
        this.form.setFieldsValue('phone')
        if (!err) {
          console.info('success', values)
          this.result = values
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
