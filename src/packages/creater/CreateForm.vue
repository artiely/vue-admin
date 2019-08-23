<template>
<div>
    <a-modal
      v-if="model=='modal'"
      title="Title"
      :visible="value"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      :width="layout.isMobile?'90%':'70%'"
      @cancel="handleCancel"
    >
      <v-create-form-view ref="createForm" :sourceData="sourceData" :defaultData="defaultData">
      </v-create-form-view>
    </a-modal>
    <a-drawer
      v-else-if="model=='drawer'"
      title="Basic Drawer"
      wrapClassName="create-form-drawer"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="value"
      :width="layout.isMobile?'90%':'70%'"
    >
     <v-create-form-view ref="createForm" :sourceData="sourceData" :defaultData="defaultData"></v-create-form-view>
     <div class="create-form-footer">
       <a-button class="pull-right" type="primary" @click="handleOk">ok</a-button>
     </div>
    </a-drawer>
    <v-create-form-view ref="createForm" v-else :sourceData="sourceData" :defaultData="defaultData"></v-create-form-view>
</div>

</template>

<script>
import { layout } from '@layouts'
export default {
  name: 'v-create-form',
  props: {
    sourceData: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: Boolean,
    model: String,
    confirmLoading: Boolean,
    defaultData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    labelCol: {
      type: [Number, String],
      default: 5
    },
    wrapperCol: {
      type: [Number, String],
      default: 18
    },
    // 表单的尺寸
    size: {
      type: String,
      default: 'large'
    }
  },
  data () {
    return {
      layout
    }
  },
  methods: {
    onClose () {
      this.$emit('input', false)
    },
    handleOk (e) {
      this.$refs.createForm.handleSubmit(e)
    },
    handleCancel (e) {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="less" >
.create-form-footer{
  padding: 10px 16px;
  position: absolute;
  bottom: 0;
  width: 100%;
  right:10px;
  border-top: 1px solid #e8e8e8;
  background: #fff;
}
.create-form-drawer .ant-drawer-body{
  height: calc(100vh - 100px) ;
}
.create-form-drawer .ant-drawer-content-wrapper{
  height: 100vh;
  overflow: hidden
}
</style>
