<template>
<!-- :columns="columns" -->
      <!-- :style="{width:item.width+'px'}" :scroll="{ x: 1500, y: 300 }" -->
  <a-table  :dataSource="tableData"  >
    <a-table-column
      :title="item.title"
      :dataIndex="item.dataIndex"
      :key="item.key"
      v-for="item in columns"
    >
      <template v-slot:[item.dataIndex]="record"> <span style="color: #1890ff">{{record}}</span></template>

    </a-table-column>
    <!-- <template v-slot:select="record">
      <div>{{record }}123</div>
    </template> -->

    <!-- <template v-for="item in columns"  v-slot:[item.dataIndex]="record" >
      <div style="color: #1890ff;"  class="textover1" :key="item.key" >{{record}}</div>
      </template> -->

       <!-- <a-table-column
        :dataIndex="item.dataIndex"
        :key="item.dataIndex"
        v-for="item in columns"
      >
      <template v-slot:[item.dataIndex]="record">
        <div style="color: #1890ff;"  class="textover1" >{{record}}</div>
      </template>
      </a-table-column> -->

  </a-table>
</template>
<script>
import uuid from 'uuid'
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
      columns: this.sourceData.map(v => {
        v.key = uuid()
        v.scopedSlots = {
          customRender: v.dataIndex
        }
        return v
      })
    }
  }
}
</script>
