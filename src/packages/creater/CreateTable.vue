<template>
  <a-spin :spinning="loading||!reRender" :style="{minHeight:tableBoxHeight+'px'}">
    <template v-if="tableData.length&&reRender">
      <div ref="tableBox">
        <a-table
          :rowSelection="rowSelection"
          :columns="columns"
          :indentSize="0"
          :dataSource="tableData"
          :bordered="bordered"
          :size="size"
          ref="table"
          :loading="!reRender"
          :rowKey="rowKey"
          :scroll="{x:width}"
          v-resize.debounce.500="getDomWidth"
        >
          <template slot-scope="text, record" :slot="item.slot" v-for="item in columns">
            <div :style="{width:item.width+'px'}" :key="item.dataIndex" >
              <slot :name="item.slot" :row="record" :header="item">
                <template v-if="item.slot=='action'">
                  <div :style="{width:item.width+'px'}" >
                    <a href="javascript:void(0);">
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
                  </div>
                </template>
                <template v-else>
                  <div v-if="item.tooltip" >
                    <a-tooltip>
                      <template slot="title">{{text}}</template>
                      <div class="textover1" :style="{width:item.width+'px'}">{{text}}</div>
                    </a-tooltip>
                  </div>
                  <div
                    v-else
                    class="textover1"
                    :style="{width:item.width+'px'}"
                  >{{text}}</div>
                </template>
              </slot>
            </div>
          </template>
        </a-table>
      </div>
      <div class="clearfix" style="padding:20px 0">
        <!-- <a-pagination class="fr" :total="50" showSizeChanger showQuickJumper /> -->
      </div>
    </template>
    <a-card :loading="loading" v-else :style="{minHeight:tableBoxHeight+'px'}">暂无数据</a-card>

  </a-spin>
</template>
<script>
import { layout } from '@layouts'
export default {
  name: 'v-create-table',
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
    rowKey: Function,
    loading: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'default'
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      reRender: true,
      tableBoxWidth: 0,
      tableBoxHeight: 0,
      layout
    }
  },
  watch: {
    size (val) {
      this.reRender = false
      this.$nextTick(() => {
        this.reRender = true
      })
    },
    'layout.isCollapse' (val) {
      this.reRender = false
      this.$nextTick(() => {
        this.reRender = true
        // setTimeout(() => {
        // }, 317)
      })
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
      let tdPadding = this.size === 'small' ? 16 : 32
      this.sourceData.map(v => {
        if (!v.hidden) {
          w += v.width + tdPadding
        }
      })
      return w + 200 + 32
    },
    columns () {
      // 滚动宽度小于容器宽度的时候去掉fixed
      return this.sourceData
        .map((v, i) => {
          if (i === 0 && this.width > this.tableBoxWidth) {
            v.fixed = 'left'
          } else {
            v.fixed = false
          }

          v.key = v.dataIndex
          v.slot = v.dataIndex
          v.scopedSlots = { customRender: v.dataIndex }
          return v
        })
        .filter(v => {
          return !v.hidden
        })
        .concat([
          {
            title: '操作',
            key: 'operation',
            width: 200,
            fixed: this.width < this.tableBoxWidth ? false : 'right',
            slot: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ])
    }
  },

  methods: {
    getDomWidth () {
      console.log('>>>>>>>>>>>>>>>>>>>>>>')
      this.tableBoxWidth = this.$refs.tableBox.clientWidth
      this.tableBoxHeight = this.$refs.tableBox.clientHeight
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
