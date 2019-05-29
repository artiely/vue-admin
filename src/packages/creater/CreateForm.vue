<template>
      <a-form :form="formAction" @submit="handleSubmit">
        <template v-for="(item) in sourceData" >
          <a-col  :xs="24" :sm="24" :md="12" :lg="12" :key="item._uuid">
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
              v-decorator="[
              item.dataIndex,
              {rules: item.formOptions.rules,initialValue: defaultData[item.dataIndex]}
            ]"
            />
            <!-- input.search -->
            <a-input-search
              v-if="item.formOptions.el=='input.search'"
              :disabled="item._disabled"
              :size="size"
              :placeholder="item.formOptions.placeholder"
              :type="item.formOptions.type"
              v-decorator="[
              item.dataIndex,
              {rules: item.formOptions.rules,initialValue: defaultData[item.dataIndex]}
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
            <!-- range-picker -->
            <!-- <template
              v-else-if="item.formOptions.el=='datepicker' && item.formOptions.type=='range'"
            >
              <a-range-picker
                style="width:100%"
                :format="item.formOptions.format"
                v-decorator="[item.dataIndex,{rules: item.formOptions.rules,initialValue: []}]"
              />
            </template> -->
            <!-- datepicker -->
            <a-date-picker
              v-else-if="item.formOptions.el=='datepicker'"
              style="width:100%"
              :disabled="item._disabled"
              :size="size"
              :format="item.formOptions.format"
              v-decorator="[item.dataIndex, {rules: item.formOptions.rules,initialValue: moment(defaultData[item.dataIndex])}]"
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
            <!-- rate -->
            <!-- <a-rate
              v-else-if="item.formOptions.el=='rate'"
              allowHalf
              v-decorator="[item.dataIndex,, {initialValue: decRow[item.dataIndex]}]"
            /> -->
            <!-- textarea -->
            <!-- <a-textarea
              v-else-if="item.formOptions.el=='textarea'"
              v-decorator="[item.dataIndex,, {initialValue: decRow[item.dataIndex]}]"
              :rows="3"
            ></a-textarea> -->
            <!-- slider -->
            <!-- <a-slider
              v-else-if="item.formOptions.el=='slider'"
              v-decorator="[item.dataIndex,, {initialValue: decRow[item.dataIndex]}]"
              :marks="item.formOptions.values"
            /> -->
            <!-- tree -->
            <!-- <template v-else-if="item.formOptions.el=='tree'">
              <v-crud-tree
                v-decorator="[item.dataIndex,{rules: item.formOptions.rules}]"
                :field="item.dataIndex"
                :initialValue="decRow[item.dataIndex]"
                :treeData="item.formOptions.values"
                @check-tree="checkTree"
              ></v-crud-tree>
            </template> -->
          </a-form-item>
            </slot>
          </a-col>
        </template>
        <a-button
        type="primary"
        html-type="submit"
      >
        Submit
      </a-button>
      </a-form>
</template>

<script>
// import * as deepmerge from 'deepmerge'
// import uuid from 'uuid'
import moment from 'moment'
export default {
  name: 'v-create-form',
  props: {
    sourceData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
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
    }
  },
  data () {
    return {
      moment,
      formAction: this.$form.createForm(this)
    }
  },
  computed: {
    /**
     * 当前行数据
     * 新增是当前行的数据为空，也可设置默认值
     * 编辑时当前行的数据为指定的数据集
     */
    decRow () {
      // 新增 当前行的数据从sourceData中取
      let decRow = {}
      this.sourceData.map(v => {
        decRow[v.dataIndex] = v.formOptions.value
      })
      return decRow
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.formAction.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('handle-submit', values)
          this.formAction.resetFields()
        } else {
          this.formAction.validateFieldsAndScroll()
        }
      })
    }
  }

}
</script>

<style scoped>
</style>
