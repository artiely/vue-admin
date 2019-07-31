<template>
  <div>
    <!-- table -->
    <template>
      <a-card
        @click="delegateCick"
        :bordered="false"
      >
        <slot
          :columns="columns"
          :dataSource="dataSource"
        >
          <div
            style="padding-bottom:8px"
            class="clearfix"
          >
            <a-button
              type="primary"
              @click="handleAdd"
            >
              新增
            </a-button>
          </div>
          <a-table
            :columns="columns"
            :data-source="dataSource"
            :pagination="false"
            :loading="loading"
            size="large"
            :bordered="false"
          >
            <a
              slot="action"
              slot-scope="text, record, index"
            >
              <span @click="handleEdit(text, record, index)">编辑</span>
              <a-divider type="vertical" />
              <a-popconfirm
                v-if="dataSource.length"
                title="确定删除？"
                @confirm="() => handleDel(text, record, index)"
              >
                <span style="color:#f00">删除</span>
              </a-popconfirm>
              <a-divider type="vertical" />
              <span @click="handleInfo(text, record, index)">详情</span>
            </a>
          </a-table>
          <div
            class="clearfix"
            style="padding-top:8px"
          >
            <a-pagination
              class="pull-right"
              v-model="page"
              show-size-changer
              :total="totalCount"
              :page-size="pageSize"
              @showSizeChange="showSizeChange"
              @change="pageChange"
            />
          </div>
        </slot>
      </a-card>
    </template>
    <!-- form -->
    <v-crud-form
      @handle-submit="handleSubmit"
      :async-cols="asyncCols"
      v-model="actionVisible"
      :source-columns="sourceColumns"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :row="row"
      :async-row="asyncRow"
      :title="title"
      :icon="icon"
      :is-edit="isEdit"
    />
  </div>
</template>

<script>
import VCrudForm from './CrudForm'
export default {
  name: 'VCrud',
  components: {
    VCrudForm
  },
  props: {
    // 源数据 schema
    sourceColumns: Array,
    // 源数据
    dataSource: Array,
    // 加载中
    loading: Boolean,
    // 异步的行数据
    asyncRow: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 异步的模型数据
    asyncCols: Array,
    labelCol: {
      type: [Number, String],
      default: 5
    },
    wrapperCol: {
      type: [Number, String],
      default: 18
    },
    // 总页码
    totalCount: {
      type: [Number, String],
      default: 10
    }
  },
  data () {
    return {
      // 模态展示
      actionVisible: false,
      row: {},
      isEdit: false,
      icon: '',
      title: '',
      page: 1,
      pageSize: 10,
      columns: this.sourceColumns
        .filter(v => {
          if (!v.hidden) {
            return v
          }
        })
        .concat([
          {
            title: '操作',
            key: 'operation',
            width: 200,
            scopedSlots: { customRender: 'action' }
          }
        ])
    }
  },
  methods: {
    handleSubmit (values) {
      this.$emit('handle-submit', values, this.isEdit)
      this.actionVisible = false
    },
    handleEdit (text, record, index) {
      this.row = record
      this.title = '编辑'
      this.icon = 'form'
      this.actionVisible = true
      this.isEdit = true
      this.$emit('handle-edit', text, record, index)
    },
    handleAdd () {
      this.row = {}
      this.title = '新增'
      this.icon = 'plus-square'
      this.actionVisible = true
      this.isEdit = false
      this.$emit('handle-add')
    },
    handleInfo (text, record, index) {
      this.$emit('handle-info', text, record, index)
    },
    handleDel (text, record, index) {
      this.$emit('handle-delete', text, record, index)
    },
    pageChange (page, pageSize) {
      this.page = page
      this.pageSize = pageSize
      this.$emit('handle-page', page, pageSize)
    },
    showSizeChange (current, size) {
      this.page = current
      this.pageSize = size
      this.$emit('handle-page', current, size)
    },
    delegateCick (e) {
      let index = e.target.dataset.index
      let type = e.target.dataset.type
      let text = this.dataSource[index]
      let record = this.dataSource[index]
      if (type) {
        if (type === 'edit' && index !== undefined) {
          this.handleEdit(text, record, index)
        } else if (type === 'add') {
          this.handleAdd(text, record, index)
        } else if (type === 'delete' && index !== undefined) {
          this.handleDel(text, record, index)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
