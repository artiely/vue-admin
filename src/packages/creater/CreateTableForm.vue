<template>
  <div>
    <v-create-table :sourceData="sourceData" :tableData="tableData">

    </v-create-table>
    <v-create-form model="modal" :sourceData="sourceData" :defaultData="rowData"></v-create-form>
  </div>
</template>

<script>
export default {
  name: 'v-create-table-form',
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
    }
  },
  data () {
    return {
      rowData: this.defaultData
    }
  }
}
</script>

<style>
</style>
