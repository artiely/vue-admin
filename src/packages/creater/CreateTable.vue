<template>
  <a-spin :spinning="loading">
    <template v-if="tableData.length">
    <i-table :columns="columns" :data="tableData" size="small" ref="table" border height="500" @on-selection-change="onSelectionChange">
      <template slot-scope="{ row, index }" :slot="item.slot" v-for="item in columns">
        <slot :name="item.slot" :row="row">
          <template>
            <div v-if="item.tooltip" :key="item.dataIndex" >
              <a-tooltip>
                <template slot='title'>
                  {{row[item.dataIndex]}}
                </template>
                <div class="textover1">
                  {{row[item.dataIndex]}}
                </div>
              </a-tooltip>
            </div>
            <div v-else :key="item.dataIndex">
              {{row[item.dataIndex]}}
            </div>
          </template>
          <template v-if="item.slot=='action'" >
            <a href="javascript:void(0);" :key="item.dataIndex">
              <span @click="handleInfo(row, index)">详情</span>
              <a-divider type="vertical" />
              <span @click="handleEdit(row, index)">编辑</span>
              <a-divider type="vertical" />
              <a-popconfirm v-if="tableData.length" title="确定删除？" @confirm="() => handleDel(row, index)">
                <span style="color:#f00">删除</span>
              </a-popconfirm>
            </a>
          </template>
        </slot>
      </template>
    </i-table>
    <div class="clearfix" style="padding:20px 0">
      <a-pagination class="fr" :total="50" showSizeChanger showQuickJumper />
    </div>
    </template>
    <a-card :loading="loading" v-else style="height:200px">
      暂无数据
    </a-card>
  </a-spin>
</template>
<script>
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
    loading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 50,
          fixed: 'left',
          align: 'center'
        }
      ].concat(
        this.sourceData
          .map(v => {
            v.key = v.dataIndex
            v.slot = v.dataIndex
            return v
          })
          .concat([
            {
              title: '操作',
              key: 'operation',
              width: 200,
              fixed: 'right',
              slot: 'action'
            }
          ])
      )
    }
  },
  methods: {
    onSelectionChange (selection) {
      console.log('TCL: onSelectionChange -> selection', selection)
    },
    handleEdit (row, index) {
      this.$emit('handle-edit', row, index)
    },
    handleInfo (row, index) {
      this.$emit('handle-info', row, index)
    },
    handleDel (row, index) {
      this.$emit('handle-del', row, index)
    }
  }
}
</script>
