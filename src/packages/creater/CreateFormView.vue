<template>
  <a-spin :spinning="loading">
    <a-form :form="formAction" @submit="handleSubmit" class="form">
      <a-row>
        <template v-for="(item) in sourceData">
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :key="item._uuid">
            <slot :name="item.dataIndex" :scope="item" :value="defaultData[item.dataIndex]">
              <a-form-item
                :key="item._uuid"
                v-if="item.formOptions"
                :label="item.title"
                :labelCol="{ span: labelCol }"
                :wrapperCol="{ span: wrapperCol }"
              >
                <!-- input -->
                <a-input
                  v-if="item.formOptions.el=='input'"
                  :disabled="item._disabled"
                  :size="size"
                  :placeholder="item.formOptions.placeholder"
                  :type="item.formOptions.type"
                  :ref="item.dataIndex"
                  v-decorator="[
              item.dataIndex,
              {rules: item.formOptions.rules,initialValue: myQs(item.dataIndex)}
            ]"
                >
                  <!-- v-if="formAction.getFieldsValue([item.dataIndex]).length" -->
                  <a-icon
                    v-if="item.formOptions.allowClear&&formAction.getFieldsValue([item.dataIndex])[item.dataIndex]&&formAction.getFieldsValue([item.dataIndex])[item.dataIndex].length"
                    slot="suffix"
                    theme="filled"
                    type="close-circle"
                    @click="emitEmpty(item.dataIndex)"
                  />
                </a-input>
                <!-- input.search -->
                <a-input-search
                  v-if="item.formOptions.el=='input.search'"
                  :disabled="item._disabled"
                  :size="size"
                  :placeholder="item.formOptions.placeholder"
                  :type="item.formOptions.type"
                  v-decorator="[
              item.dataIndex,
              {rules: item.formOptions.rules,initialValue: myQs(item.dataIndex)}
            ]"
                />
                <!-- select -->
                <a-select
                  v-else-if="item.formOptions.el=='select'"
                  :disabled="item._disabled"
                  :size="size"
                  :placeholder="item.formOptions.placeholder"
                  :mode="item.formOptions.type"
                  v-decorator="[
          item.dataIndex,
          {rules: item.formOptions.rules,initialValue: defaultData[item.dataIndex]}
        ]"
                  :options="item.formOptions.options"
                ></a-select>
                <!-- switch -->
                <a-switch
                  v-else-if="item.formOptions.el=='switch'"
                  :disabled="item._disabled"
                  :size="size"
                  :checkedChildren="item.formOptions.checkedChildren"
                  :unCheckedChildren="item.formOptions.unCheckedChildren"
                  v-decorator="[item.dataIndex, { valuePropName: 'checked',initialValue: Boolean(defaultData[item.dataIndex])}]"
                />
                <!-- radio -->
                <a-radio-group
                  v-else-if="item.formOptions.el=='radio'"
                  :disabled="item._disabled"
                  :size="size"
                  v-decorator="[item.dataIndex,{initialValue: defaultData[item.dataIndex]}]"
                  :options="item.formOptions.options"
                ></a-radio-group>
                <!-- checkbox -->
                <template v-else-if="item.formOptions.el=='checkbox'">
                  <a-checkbox-group
                    :disabled="item._disabled"
                    :size="size"
                    v-decorator="[item.dataIndex,{initialValue: defaultData[item.dataIndex]}]"
                    :options="item.formOptions.options"
                  ></a-checkbox-group>
                </template>
                <!-- datepicker -->
                <a-date-picker
                  v-else-if="item.formOptions.el=='datepicker'"
                  style="width:100%"
                  :disabled="item._disabled"
                  :size="size"
                  :format="item.formOptions.format"
                  v-decorator="[item.dataIndex, {rules: item.formOptions.rules,initialValue: moment(myQs(item.dataIndex))}]"
                />
                <!-- timepicker -->
                <a-time-picker
                  v-else-if="item.formOptions.el=='timepicker'"
                  style="width:100%"
                  :disabled="item._disabled"
                  :size="size"
                  :format="item.formOptions.format"
                  v-decorator="[item.dataIndex, {rules: item.formOptions.rules,initialValue: moment(defaultData[item.dataIndex],'HH:mm:ss')}]"
                />
                <!-- cascader -->
                <a-cascader
                  v-else-if="item.formOptions.el=='cascader'"
                  :options="item.formOptions.options"
                  v-decorator="[item.dataIndex, {rules: item.formOptions.rules,initialValue:defaultData[item.dataIndex]}]"
                />
                <!-- rate -->
                <a-rate
                  v-else-if="item.formOptions.el=='rate'"
                  allowHalf
                  v-decorator="[item.dataIndex, {rules: item.formOptions.rules,initialValue: myQs(item.dataIndex)}]"
                />
                <!-- textarea -->
                <a-textarea
                  v-else-if="item.formOptions.el=='textarea'"
                  v-decorator="[item.dataIndex, {rules: item.formOptions.rules,initialValue: myQs(item.dataIndex)}]"
                  :rows="3"
                ></a-textarea>
                <!-- slider -->
                <a-slider
                  v-else-if="item.formOptions.el=='slider'"
                  v-decorator="[item.dataIndex, {initialValue: defaultData[item.dataIndex]}]"
                />
                <!-- upload -->
                <div class="clearfix" v-else-if="item.formOptions.el=='upload'">
                  <a-upload
                    :action="item.formOptions.action"
                    listType="picture-card"
                    @preview="handlePreview"
                    @change="handleChange"
                    :remove="handleRemove"
                    v-decorator="[item.dataIndex, {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                  initialValue: defaultData[item.dataIndex]
                }]"
                  >
                    <div v-if="defaultData[item.dataIndex].length < 3">
                      <a-icon type="plus" />
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </a-upload>
                  <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                  </a-modal>
                </div>
                <!-- tree -->
                <template v-else-if="item.formOptions.el=='tree'">
                  <a-tree
                    multiple
                    defaultExpandAll
                    @select="onSelect"
                    @expand="onExpand"
                    v-decorator="[item.dataIndex,{valuePropName: 'checkedKeys',rules: item.formOptions.rules,
                initialValue: defaultData[item.dataIndex]}]"
                    :treeData="item.formOptions.options"
                  ></a-tree>
                </template>
              </a-form-item>
            </slot>
          </a-col>
        </template>
      </a-row>
      <!-- <a-row>
          <a-col offset="8">
        <a-button
        type="primary"
        html-type="submit"
      >
        Submit
      </a-button>
        </a-col>
      </a-row>-->
    </a-form>
  </a-spin>
</template>

<script>
import moment from 'moment'
import qs from 'qs'
export default {
  name: 'v-create-form-view',
  props: {
    sourceData: {
      type: Array,
      default: () => {
        return []
      }
    },
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
      default: 'default'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      qs,
      moment,
      formAction: this.$form.createForm(this, {
        onValuesChange: this.onValuesChange
      }),
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
    onValuesChange (props, values) {
      //
    },
    myQs (s) {
      return eval('this.defaultData.' + s)
    },
    emitEmpty (value) {
      this.formAction.setFieldsValue({ [value]: '' })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.formAction.validateFields((err, values) => {
        if (!err) {
          this.$emit('handle-submit', values)
          this.formAction.resetFields()
        } else {
          this.formAction.validateFieldsAndScroll()
        }
      })
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
      this.formAction.setFieldsValue({ upload: fileList })
    },
    handleRemove (file) {
      console.log('TCL: remove -> file', file)
    },
    normFile (e) {
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    onSelect (keys) {
      console.log('Trigger Select', keys)
    },
    onExpand () {
      console.log('Trigger Expand')
    }
  }
}
</script>

<style scoped>
.form .anticon-close-circle {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
  font-size: 12px;
}
.form .anticon-close-circle:hover {
  color: #999;
}
.form .anticon-close-circle:active {
  color: #666;
}
</style>
