<template>
  <div>
    <i-table :columns="columns" :data="tableData" size="small" ref="table" border  height="500" @on-selection-change="onSelectionChange">
      <template   slot-scope="{ row, index }" :slot="item.slot"   v-for="item in columns">
      <slot :name="item.slot" :row="row">
        <template>
            <div v-if="item.tooltip" :key="item.dataIndex">
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
      </slot>
        </template>
      <a slot="action" slot-scope="text, record, index">
        <span @click="handleEdit(text, record, index)">编辑</span>
        <a-divider type="vertical"/>
        <a-popconfirm
          v-if="tableData.length"
          title="确定删除？"
          @confirm="() => handleDel(text, record, index)"
        >
          <span style="color:#f00">删除</span>
        </a-popconfirm>
        <a-divider type="vertical"/>
        <span @click="handleInfo(text, record, index)">详情</span>
      </a>
    </i-table>
  </div>
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
    }
  },
  data () {
    return {
      columns: [{
        type: 'selection',
        width: 60,
        fixed: 'left',
        align: 'center'
      }].concat(this.sourceData.map(v => {
        v.key = v.dataIndex
        v.slot = v.dataIndex
        return v
      }).concat([
        {
          title: '操作',
          key: 'operation',
          width: 200,
          fixed: 'right',
          slot: 'action'
        }
      ]))
    }
  },
  methods: {
    onSelectionChange (selection) {
      console.log('TCL: onSelectionChange -> selection', selection)
    },
    handleEdit (text, record, index) {
      this.$emit('handle-edit', text, record, index)
    },
    handleInfo (text, record, index) {
      this.$emit('handle-info', text, record, index)
    },
    handleDel (text, record, index) {
      this.$emit('handle-del', text, record, index)
    }
  }
}
</script>
