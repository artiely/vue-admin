<template>
  <div>
    <a-row  :gutter="24" style="margin-bottom:25px;">
      <a-col :xs="24" :sm="24" :md="8" :lg="8">
        <card-chart title="每日销售" :data="dataBar" :transform="transform" type="bar" subTitle="查看每个列以获取更多详细信息"></card-chart>
      </a-col>
      <a-col :xs="24" :sm="24" :md="8" :lg="8">
        <card-chart title="分享利益" :data="dataPie" type="pie" subTitle="利润在客户之间分享"></card-chart>
      </a-col>
      <a-col :xs="24" :sm="24" :md="8" :lg="8">
        <card-chart title="收入变化" :data="dataTriangle" type="triangle" subTitle="按城市划分的收入变化细分"></card-chart>
      </a-col>
    </a-row>
    <a-card>
      <div id="timeline-chart"></div>
    </a-card>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import cardChart from './template/card-chart'
let dataTriangle = [
  {
    type: '城市一',
    value: 20
  },
  {
    type: '城市二',
    value: 18
  },
  {
    type: '城市三',
    value: 32
  },
  {
    type: '城市四',
    value: 15
  },
  {
    type: 'Other',
    value: 15
  }
]

let dataPie = [
  {
    type: '分类一',
    value: 20
  },
  {
    type: '分类二',
    value: 18
  },
  {
    type: '分类三',
    value: 32
  },
  {
    type: '分类四',
    value: 15
  }
]
let dataBar = [
  {
    name: 'London',
    'Jan.': 18.9,
    'Feb.': 28.8,
    'Mar.': 39.3,
    'Apr.': 81.4,
    May: 47,
    'Jun.': 20.3,
    'Jul.': 24,
    'Aug.': 35.6,
    'Apr1.': 81.4
  },
  {
    name: 'Berlin',
    'Jan.': 12.4,
    'Feb.': 23.2,
    'Mar.': 34.5,
    'Apr.': 99.7,
    May: 52.6,
    'Jun.': 35.5,
    'Jul.': 37.4,
    'Aug.': 42.4,
    'Apr1.': 81.4
  }
]

let transform = {
  type: 'fold',
  fields: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.'
  ], // 展开字段集
  key: '月份', // key字段
  value: '月均降雨量' // value字段
}

export default {
  components: {
    cardChart
  },
  data () {
    return {
      dataTriangle:Object.freeze(dataTriangle),
      dataPie:Object.freeze(dataPie),
      transform:Object.freeze(transform),
      dataBar:Object.freeze(dataBar)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.render()
    })
  },
  methods: {
    render () {
      var options = {
        chart: {
          type: 'area',
          height: 300,
          foreColor: '#999',
          scroller: {
            enabled: true,
            track: {
              height: 7,
              background: '#e0e0e0'
            },
            thumb: {
              height: 10,
              background: '#94E3FF'
            },
            scrollButtons: {
              enabled: true,
              size: 9,
              borderWidth: 2,
              borderColor: '#008FFB',
              fillColor: '#008FFB'
            },
            padding: {
              left: 30,
              right: 20
            }
          },
          stacked: true,
          dropShadow: {
            enabled: true,
            enabledSeries: [0],
            top: -2,
            left: 2,
            blur: 5,
            opacity: 0.06
          }
        },
        colors: ['#00E396', '#0090FF'],
        stroke: {
          curve: 'smooth',
          width: 3
        },
        dataLabels: {
          enabled: false
        },
        series: [
          {
            name: 'Total Views',
            data: generateDayWiseTimeSeries(0, 18)
          },
          {
            name: 'Unique Views',
            data: generateDayWiseTimeSeries(1, 18)
          }
        ],
        markers: {
          size: 0,
          strokeColor: '#fff',
          strokeWidth: 3,
          strokeOpacity: 1,
          fillOpacity: 1,
          hover: {
            size: 6
          }
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          tickAmount: 4,
          min: 0,
          labels: {
            offsetX: 24,
            offsetY: -5
          },
          tooltip: {
            enabled: true
          }
        },
        grid: {
          padding: {
            left: -5,
            right: 5
          }
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        },
        fill: {
          type: 'solid',
          fillOpacity: 0.7
        }
      }

      var chart = new ApexCharts(
        document.querySelector('#timeline-chart'),
        options
      )

      chart.render()

      function generateDayWiseTimeSeries (s, count) {
        var values = [
          [4, 3, 10, 9, 29, 19, 25, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
          [2, 3, 8, 7, 22, 16, 23, 7, 11, 5, 12, 5, 10, 4, 15, 2, 6, 2]
        ]
        var i = 0
        var series = []
        var x = new Date('11 Nov 2012').getTime()
        while (i < count) {
          series.push([x, values[s][i]])
          x += 86400000
          i++
        }
        return series
      }
    }
  }
}
</script>

<style scoped>
</style>
