<template>
  <div class="chart-min-chart">
    <div :id="id" class="min-chart"></div>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  }
}
</script>

<style lang="less" scoped>
.chart-min-chart{
  width: 100%;
  height: 100%;
  min-height:160px;
  background: #fff;
  position: relative;
  overflow: hidden;
  .min-chart{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
