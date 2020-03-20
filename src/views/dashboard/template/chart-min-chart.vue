<template>
  <div class="chart-min-chart-wrapper" >
    <a-card hoverable :bordered="false" :loading="loading">
      <div class="chart-min-chart">
        <div class="main">
          <v-count-to
            style="font-size:34px"
            :endVal="countValue"
            :separator="separator"
            :decimals="decimals"
            :prefix="prefix"
          ></v-count-to>
           <a-tooltip>
            <template slot='title'>
              说明
            </template>
            <a-icon type="question-circle" class="help-icon" />
          </a-tooltip>
          <p>{{desc}}</p>
        </div>
        <div :id="'uuid'+id" class="min-chart"></div>
      </div>
    </a-card>
  </div>
</template>

<script>
import uuid from 'uuid'
import ApexCharts from 'apexcharts'
import { layout } from '@layouts'
export default {
  props: {
    color: {
      type: String,
      default: '#DCE6EC'
    },
    separator: String,
    countValue: Number,
    decimals: Number,
    desc: String,
    prefix: String,
    opacity: {
      type: Number,
      default: 0.3
    },
    type: {
      type: String,
      default: 'area'
    },
    data: {
      type: Array,
      default () {
        return [15, 75, 47, 65, 14, 2, 41, 54, 4, 27, 15]
      }
    }
  },
  data () {
    return {
      id: uuid(),
      layout,
      loading: false
    }
  },
  watch: {
    'data': {
      handler () {
        this.renderChart()
      },
      deep: true
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.renderChart()
    // })
  },
  methods: {
    renderChart () {
      var options = {
        chart: {
          type: this.type,
          height: 55,
          sparkline: {
            enabled: true
          }
        },
        colors: [this.color],
        fill: {
          opacity: this.opacity
        },
        stroke: {
          width: [2],
          curve: 'smooth'
        },
        series: [
          {
            data: this.data ? this.data : [3, 4, 5, 7, 9]
          }
        ],
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
      }
      new ApexCharts(
        document.querySelector('#uuid' + this.id),
        options
      ).render()
    }
  }
}
</script>

<style lang="less" scoped>
.chart-min-chart-wrapper {
  margin-bottom: 25px;
  .chart-min-chart {
    width: 100%;
    height: 100%;
    min-height: 150px;
    position: relative;
    overflow: hidden;
    .main {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
    .help-icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    .min-chart {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
    }
  }
}
</style>
