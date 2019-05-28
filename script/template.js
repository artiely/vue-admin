// template.js
module.exports = {
  vueTemplate: compoenntName => {
    compoenntName = compoenntName.split('.')[0]
    return `
<template>
  <div class="${compoenntName}">
    ${compoenntName}组件
  </div>
</template>
<script>
export default {
  name: '${compoenntName}',
  components:{},
  data(){
    return {
    }
  },
  computed:{},
  watch:{},
  /*
  beforeCreate
  created
  beforeMount
  mounted
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  destroyed
  errorCaptured
   */
  created(){},
  methods:{}
}
</script>
<style lang="less" scoped>
.${compoenntName} {

}
</style>
`
  },
  entryTemplate: `import Main from './main.vue'
export default Main`
}
