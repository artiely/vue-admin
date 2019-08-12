<template>
  <a-modal :visible="value" :footer="null" :maskClosable="false" centered class="captcha" @cancel="cancel">
    <h1>{{title}}</h1>
    <p>{{desc}}</p>
    <v-codebox v-model="tempCode" :mask="mask" :maxlength="maxlength"></v-codebox>
  </a-modal>
</template>

<script>
export default {
  name: 'v-captcha',
  props: {
    value: Boolean,
    code: { type: String, default: '' },
    maxlength: [Number, String],
    title: {
      type: String,
      default: '请输入验证码'
    },
    mask: Boolean,
    desc: {
      type: String,
      default: '验证码已发送'
    }
  },
  data () {
    return {
      tempCode: this.code
    }
  },
  watch: {
    tempCode: {
      handler (val) {
        this.$emit('update:code', val)
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="less">
.captcha {
  .ant-modal-body {
    text-align: center;
    p {
      padding-bottom: 20px;
    }
  }
  .ant-modal-content {
    min-width: 320px;
  }
}
</style>
