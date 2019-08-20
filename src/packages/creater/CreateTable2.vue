<template>
  <a-spin :spinning="loading">
    <template v-if="tableData.length">
      <div ref="tableBox">
      <a-table
        :rowSelection="rowSelection"
        :columns="columns"
        :indentSize="0"
        :dataSource="tableData"
        :bordered="false"
        ref="table"
        :scroll="{x:width}"
        v-resize.debounce.500="getDomWidth"
      >
        <template slot-scope="text, record" :slot="item.slot" v-for="item in columns">
          <slot :name="item.slot" :row="record">
            <template v-if="item.slot=='action'">
              <a href="javascript:void(0);" :key="item.dataIndex">
                <span @click="handleInfo(text, record)">详情</span>
                <a-divider type="vertical" />
                <span @click="handleEdit(text, record)">编辑</span>
                <a-divider type="vertical" />
                <a-popconfirm
                  v-if="tableData.length"
                  title="确定删除？"
                  @confirm="() => handleDel(text, record)"
                >
                  <span style="color:#f00">删除</span>
                </a-popconfirm>
              </a>
            </template>
            <template v-else>
              <div v-if="item.tooltip" :key="item.dataIndex">
                <a-tooltip>
                  <template slot="title">{{text}}</template>
                  <div class="textover1" :style="{width:item.width+'px'}">{{text}}</div>
                </a-tooltip>
              </div>
              <div v-else :key="item.dataIndex">{{text}}</div>
            </template>
          </slot>
        </template>
      </a-table>
      </div>
      <div class="clearfix" style="padding:20px 0">
        <!-- <a-pagination class="fr" :total="50" showSizeChanger showQuickJumper /> -->
      </div>
    </template>
    <a-card :loading="loading" v-else style="height:200px">暂无数据</a-card>
  </a-spin>
</template>
<script>
export default {
  name: 'v-create-table2',
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
    loading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    rowSelection () {
      return {
        columnWidth: '50px',
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
        }
      }
    },
    // 表格的固定宽之和用于滚动
    width () {
      let w = 0
      this.sourceData.map(v => {
        w += v.width
      })
      return w + 220
    },
    columns () {
      // 滚动宽度小于容器宽度的时候去掉fixed
      return this.sourceData
        .map(v => {
          v.fixed = this.width < this.tableBoxWidth ? false : v.fixed
          v.key = v.dataIndex
          v.slot = v.dataIndex
          v.scopedSlots = { customRender: v.dataIndex }
          return v
        })
        .concat([
          {
            title: '操作',
            key: 'operation',
            width: this.width < this.tableBoxWidth ? false : 200,
            fixed: this.width < this.tableBoxWidth ? false : 'right',
            slot: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ])
    }
  },
  data () {
    return {
      tableBoxWidth: 0
    }
  },
  methods: {
    getDomWidth () {
      this.tableBoxWidth = this.$refs.tableBox.clientWidth
      console.log('TCL: getDomWidth -> this.$refs.tableBox', this.$refs.tableBox)
    },
    handleEdit (text, record) {
      this.$emit('handle-edit', text, record)
      this.$emit('handleEdit', text, record)
    },
    handleInfo (text, record) {
      this.$emit('handle-info', text, record)
      this.$emit('handleInfo', text, record)
    },
    handleDel (text, record) {
      this.$emit('handle-del', text, record)
      this.$emit('handleDel', text, record)
    }
  }
}
</script>
