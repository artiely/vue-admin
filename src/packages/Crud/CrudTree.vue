<template>
  <a-tree
    checkable
    multiple
    default-expand-all
    auto-expand-parent
    v-model="defaultVal"
    show-line
    :tree-data="treeData"
    @check="checkTree"
  />
</template>

<script>
export default {
  name: 'VCrudTree',
  props: {
    treeData: Array,
    field: String,
    initialValue: Array
  },
  data () {
    return {
      defaultVal: this.initialValue
    }
  },
  watch: {
    initialValue: {
      handler (val) {
        this.defaultVal = val
      }
    },
    deep: true
  },
  methods: {
    checkTree (checkedKeys, e) {
      this.$emit('check-tree', this.field, checkedKeys, e)
    }
  }
}
</script>

<style>
</style>
