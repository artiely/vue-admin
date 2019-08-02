<template>
  <div style="padding:10px">
     <!-- apex -->
    <a-row :gutter="24" style="margin-bottom:24px;">
      <a-col :xs="24" :sm="24" :md="6" :lg="6">
          <chart-min-chart  color="#fd397a" :countValue="12542" desc="今日新增客户" type="line" separator="" :opacity="0.9"/>
      </a-col>
      <a-col :xs="24" :sm="24" :md="6" :lg="6">
          <chart-min-chart color="#fd7e14" :countValue="745874" desc="今日订单量" :data="[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]" separator=""/>
      </a-col>
      <a-col :xs="24" :sm="24" :md="6" :lg="6">
          <chart-min-chart color="#20c997" :countValue="156985" desc="剩余库存" type="bar" separator="" :data="[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]"/>
      </a-col>
      <a-col :xs="24" :sm="24" :md="6" :lg="6">
          <chart-min-chart color="#ffb822" :countValue="256545" desc="今日营业额" type="area" :decimals="2" prefix="￥"/>
      </a-col>
    </a-row>
     <a-row :gutter="24" style="margin-bottom:24px;">
      <a-col :xs="24" :sm="24" :md="12" :lg="12">
        <a-card :bordered="false" hoverable>
          <pie></pie>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12">
        <a-card :bordered="false" hoverable>
          <pie-platelets></pie-platelets>
        </a-card>
      </a-col>
    </a-row>

     <a-row :gutter="24" style="margin-bottom:24px;">
      <a-col :xs="24" :sm="24" :md="12" :lg="12">
        <a-card :bordered="false" hoverable>
          <pie-multi-level></pie-multi-level>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12">
        <a-card :bordered="false" hoverable>
          <point></point>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-bottom:24px;">
      <a-col :xs="24" :sm="24" :md="12" :lg="12">
        <a-card :bordered="false" hoverable >
          <dashed/>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12">
        <a-card :bordered="false" hoverable>
          <spline-area/>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="24" style="margin-bottom:24px;">
      <a-col :xs="24" :sm="24" :md="12" :lg="12">
        <a-card :bordered="false" hoverable>
          <column-charts/>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12">
        <a-card :bordered="false" hoverable>
          <line-area></line-area>
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>

<script>

import dashed from './apex-charts/dashed'
import splineArea from './apex-charts/spline-area'
import columnCharts from './apex-charts/column-charts'
import lineArea from './apex-charts/line-area'
import chartMinChart from './template/chart-min-chart'
import pie from './g2/pie'
import piePlatelets from './g2/pie-platelets'
import pieMultiLevel from './g2/pie-multi-level'
import point from './g2/point'
export default {
  components: {
    dashed,
    splineArea,
    columnCharts,
    lineArea,
    chartMinChart,
    pie,
    piePlatelets,
    pieMultiLevel,
    point
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="less">
.current-data {
  padding-right: 10px;
  > a {
    color: #777;
    padding: 0 10px;
    &.active {
      color: #1690ff;
    }
  }
}
.video-container {
  position: relative;
  width: 100%;
  .homepage-title {
    position: absolute;
    top: 50%;
    margin-top: -70px;
    width: 100%;
    z-index: 1;
  }
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(45, 57, 103, 0.6);
    img {
      width: 20px;
      height: 18px;
      position: absolute;
      bottom: 18px;
      left: 50%;
      margin-left: -10px;
      animation: updown 2s infinite;
      animation-timing-function: cubic-bezier(0.36, 0.72, 0.35, 0.92);
    }
  }
}
@keyframes updown {
  0% {
    bottom: 18px;
  }
  50% {
    bottom: 28px;
  }
  100% {
    bottom: 18px;
  }
}
</style>
