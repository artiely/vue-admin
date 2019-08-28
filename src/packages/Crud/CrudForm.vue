<template>
  <div v-if="value">
    <a-modal
      :visible="value"
      @ok="handleSubmit"
      @cancel="cancel"
    >
      <div slot="title">
        <a-icon :type="icon" />
        &nbsp;{{ title }}
      </div>
      <a-form
        :form="formAction"
        @submit="handleSubmit"
      >
        <template v-for="(item) in columns">
          <a-form-item
            :key="item._uuid"
            v-if="item.formOptions"
            :label="item.title"
            :label-col="{ span: labelCol }"
            :wrapper-col="{ span: wrapperCol }"
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
                {rules: item.formOptions.rules,initialValue: decRow[item.dataIndex]}
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
                {rules: item.formOptions.rules,initialValue: decRow[item.dataIndex]}
              ]"
              :options="item.formOptions.options"
            />
            <!-- switch -->
            <a-switch
              v-else-if="item.formOptions.el=='switch'"
              :disabled="item._disabled"
              :size="size"
              v-decorator="[item.dataIndex, { valuePropName: 'checked',initialValue: Boolean(decRow[item.dataIndex])}]"
            />
            <!-- radio -->
            <a-radio-group
              v-else-if="item.formOptions.el=='radio'"
              :disabled="item._disabled"
              :size="size"
              v-decorator="[item.dataIndex,{initialValue: decRow[item.dataIndex]}]"
              :options="item.formOptions.options"
            />
            <!-- checkbox -->
            <template v-else-if="item.formOptions.el=='checkbox'">
              <a-checkbox-group
                :disabled="item._disabled"
                :size="size"
                v-decorator="[item.dataIndex,{initialValue: decRow[item.dataIndex]}]"
                :options="item.formOptions.options"
              />
            </template>
            <!-- range-picker -->
            <template
              v-else-if="item.formOptions.el=='datepicker' && item.formOptions.type=='range'"
            >
              <!-- moment(decRow[item.dataIndex]&&decRow[item.dataIndex][0]?decRow[item.dataIndex][0]:undefined),moment(decRow[item.dataIndex]&&decRow[item.dataIndex][1]?decRow[item.dataIndex][1]:undefined) -->
              <a-range-picker
                style="width:100%"
                :format="item.formOptions.format"
                v-decorator="[item.dataIndex,{rules: item.formOptions.rules,initialValue: []}]"
              />
            </template>
            <!-- datepicker -->
            <a-date-picker
              v-else-if="item.formOptions.el=='datepicker'"
              style="width:100%"
              :disabled="item._disabled"
              :size="size"
              :format="item.formOptions.format"
              v-decorator="[item.dataIndex, {rules: item.formOptions.rules,initialValue: moment(decRow[item.dataIndex])}]"
            />
            <!-- rate -->
            <a-rate
              v-else-if="item.formOptions.el=='rate'"
              allow-half
              v-decorator="[item.dataIndex,, {initialValue: decRow[item.dataIndex]}]"
            />
            <!-- textarea -->
            <a-textarea
              v-else-if="item.formOptions.el=='textarea'"
              v-decorator="[item.dataIndex,, {initialValue: decRow[item.dataIndex]}]"
              :rows="3"
            />
            <!-- slider -->
            <a-slider
              v-else-if="item.formOptions.el=='slider'"
              v-decorator="[item.dataIndex,, {initialValue: decRow[item.dataIndex]}]"
              :marks="item.formOptions.values"
            />
            <!-- tree -->
            <template v-else-if="item.formOptions.el=='tree'">
              <v-crud-tree
                v-decorator="[item.dataIndex,{rules: item.formOptions.rules}]"
                :field="item.dataIndex"
                :initial-value="decRow[item.dataIndex]"
                :tree-data="item.formOptions.values"
                @check-tree="checkTree"
              />
            </template>
          </a-form-item>
        </template>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import VCrudTree from './CrudTree'
import * as deepmerge from 'deepmerge'
// import uuid from 'uuid'
import moment from 'moment'
export default {
  name: 'VCrudForm',
  components: {
    VCrudTree
  },
  props: {
    sourceColumns: {
      type: Array,
      default: () => {
        return []
      }
    },
    asyncCols: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 从表格传进来的当前行的数据
    row: Object,
    // 新增和修改时的初始行数据
    asyncRow: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: Boolean,
    title: String,
    icon: {
      type: String,
      default: 'form'
    },
    isEdit: Boolean,
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
      // default: 'default'
      default: 'large'
    }
  },
  data () {
    return {
      formAction: this.$form.createForm(this),
      tempCols: this.sourceColumns,
      // 用于改造row数据
      decRow: this.row,
      moment
    }
  },
  watch: {
    asyncRow: {
      handler (val) {
        // 合并异步的row数据 并设置新的默认值

        this.decRow = { ...this.row, ...val }
      },
      deep: true,
      immediate: true
    },
    row: {
      handler (val) {
        this.decRow = { ...this.asyncRow, ...val }
      },
      deep: true,
      immediate: true
    },
    decRow: {
      handler () {
        // 这里设置默认值的时候得注意时间必须是moment对象 所以做了对应的处理
        this.$nextTick(() => {
          let keys = Object.keys(this.decRow || {})
          keys.map(v => {
            let obj = {}
            let field = v
            let value = this.decRow[field]
            let cols = this.columns
            cols.map(s => {
              if (
                s.dataIndex === v &&
                s.formOptions.el === 'datepicker' &&
                s.formOptions.type === 'range'
              ) {
                let start =
                  this.decRow[field] && this.decRow[field][0]
                    ? this.decRow[field][0]
                    : ''
                let end =
                  this.decRow[field] && this.decRow[field][1]
                    ? this.decRow[field][1]
                    : ''
                value = [moment(start), moment(end)]
              } else if (
                s.dataIndex === v &&
                s.formOptions.el === 'datepicker'
              ) {
                value = moment(this.decRow[field])
              }
            })
            obj[field] = value
            this.formAction.setFieldsValue(obj)
          })
        })
      },
      deep: true,
      immediate: true
    },
    columns: {
      handler () {
        if (this.value) {
          this.tempCols = this.concatCols()
        }
      }
    }
  },
  computed: {
    /* columns () {
      if (this.value) {
        // this.tempCols = this.concatCols()
        if (this.isEdit) {
          // 编辑
          return this.tempCols.filter(v => {
            if (
              !(
                (v.formOptions.visible &&
                  v.formOptions.visible.edit === false) ||
                v.formOptions.visible === false
              )
            ) {
              if (
                (v.formOptions.disabled && v.formOptions.disabled === true) ||
                (v.formOptions.disabled && v.formOptions.disabled.edit === true)
              ) {
                v._disabled = true
              } else {
                v._disabled = false
              }
              v._uuid = uuid()
              return v
            }
          })
        } else {
          // 新增
          return this.tempCols.filter(v => {
            if (
              !(
                (v.formOptions.visible &&
                  v.formOptions.visible.add === false) ||
                v.formOptions.visible === false
              )
            ) {
              if (
                (v.formOptions.disabled && v.formOptions.disabled === true) ||
                (v.formOptions.disabled && v.formOptions.disabled.add === true)
              ) {
                v._disabled = true
              } else {
                v._disabled = false
              }
              v._uuid = uuid()
              return v
            }
          })
        }
      }
    } */
  },
  methods: {
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
    cancel () {
      this.$emit('input', false)
    },
    concatCols () {
      // sourceColumns 异步数据与源数据合并
      return this.sourceColumns.map(v => {
        this.asyncCols.map(s => {
          if (v.dataIndex === s.dataIndex) {
            v = deepmerge(v, s)
          }
        })
        return v
      })
    },
    checkTree (field, checkedKeys) {
      // 点击树的时候给表单赋值
      var obj = {}
      obj[field] = checkedKeys
      this.formAction.setFieldsValue(obj)
    }
  }
}
</script>

<style scoped>
</style>
