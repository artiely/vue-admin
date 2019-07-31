<template>
  <div style="padding:10px">

     <!-- apex -->
    <a-row :gutter="24" style="margin-bottom:24px;">
      <a-col :xs="24" :sm="24" :md="6" :lg="6">
        <a-card :bordered="false"  hoverable>
          <chart-min-chart slot="cover" id="spark1"/>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="6" :lg="6">
        <a-card :bordered="false"  hoverable>
          <chart-min-chart slot="cover" id="chart6"/>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="6" :lg="6">
        <a-card :bordered="false" hoverable>
          <chart-min-chart slot="cover" id="chart8"/>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="6" :lg="6">
        <a-card :bordered="false" hoverable>
          <chart-min-chart slot="cover" id="chart9"/>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-bottom:24px;">
      <a-col :xs="24" :sm="24" :md="12" :lg="12">
        <a-card :bordered="false" hoverable>
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

import ApexCharts from 'apexcharts'
import dashed from './apex-charts/dashed'
import splineArea from './apex-charts/spline-area'
import columnCharts from './apex-charts/column-charts'
import lineArea from './apex-charts/line-area'
import chartMinChart from './template/chart-min-chart'
export default {
  components: {
    dashed,
    splineArea,
    columnCharts,
    lineArea,
    chartMinChart
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  mounted () {
    // alert(1)
    this.$nextTick(() => {
      this.renderChart()
      this.renderChart2()
      this.renderChart3()
      this.renderChart4()
    })
  },
  methods: {
    renderChart () {
      var randomizeArray = function (arg) {
        var array = arg.slice()
        var currentIndex = array.length
        var temporaryValue; var randomIndex

        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex -= 1

          temporaryValue = array[currentIndex]
          array[currentIndex] = array[randomIndex]
          array[randomIndex] = temporaryValue
        }

        return array
      }

      // data for the sparklines that appear below header area
      var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46]
      var spark1 = {
        chart: {
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3
        },
        series: [{
          data: randomizeArray(sparklineData)
        }],
        yaxis: {
          min: 0
        },
        colors: ['#DCE6EC'],
        title: {
          text: '$424,652',
          offsetX: 0,
          style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title'
          }
        },
        subtitle: {
          text: 'Sales',
          offsetX: 0,
          style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title'
          }
        }
      }

      spark1 = new ApexCharts(document.querySelector('#spark1'), spark1)
      spark1.render()
    },
    renderChart2 () {
      var options4 = {
        chart: {
          type: 'area',
          height: 55,
          sparkline: {
            enabled: true
          }
        },
        colors: ['#DCE6EC'],
        fill: {
          opacity: 0.3
        },
        series: [{
          data: [15, 75, 47, 65, 14, 2, 41, 54, 4, 27, 15]
        }],
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
      new ApexCharts(document.querySelector('#chart6'), options4).render()
    },
    renderChart3 () {
      var options8 = {
        chart: {
          type: 'bar',
          height: 55,
          sparkline: {
            enabled: true
          }
        },
        fill: {
          opacity: 0.3
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        series: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          crosshairs: {
            width: 1
          }
        },
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
      new ApexCharts(document.querySelector('#chart8'), options8).render()
    },
    renderChart4 () {
      var options3 = {
        chart: {
          type: 'area',
          height: 55,
          sparkline: {
            enabled: true
          }
        },
        series: [{
          data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
        }],
        fill: {
          opacity: 0.3
        },
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
      new ApexCharts(document.querySelector('#chart9'), options3).render()
    }
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
