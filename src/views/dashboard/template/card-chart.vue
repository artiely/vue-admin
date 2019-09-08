<template>
<div>
  <a-card  class="card-chart" :bodyStyle="{padding:0}">
    <h3 class="title">{{title}}</h3>
    <p class="sub-title">{{subTitle}}</p>
    <div :id="id" class="chart-box"></div>
  </a-card>
  </div>
</template>

<script>
import uuid from 'uuid'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
export default {
  name: 'card-chart',
  props: {
    title: String,
    subTitle: String,
    data: [Array, Object],
    type: String,
    transform: [Object],
    loading: Boolean
  },
  data () {
    return {
      id: 'uuid' + uuid(),
      chart: null
    }
  },
  watch: {
    data: {
      handler () {
        this.render()
      },
      deep: true
    }
  },
  mounted () {

  },
  methods: {
    render () {
      this.$nextTick(() => {
        if (this.type === 'bar') {
          this.renderChart()
        } else if (this.type === 'pie') {
          this.renderChartPie()
        } else if (this.type === 'triangle') {
          this.renderChartTriangle()
        }
      })
    },
    renderChart () {
      // 此处数据使用了按行组织的模式，所以需要使用 DataSet 的 fold 方法对数据进行加工

      var ds = new DataSet()
      var dv = ds.createView().source(this.data)
      dv.transform(this.transform)

      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 120,
        padding: [0, 0]
      })
      this.chart.source(dv)
      this.chart
        .intervalStack()
        .position(`${this.transform.key}*${this.transform.value}`)
        .color('name', ['#e1e1ef', '#20c997'])
      this.chart.render()
    },
    renderChartPie () {
      // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
      var sliceNumber = 0.01

      // 自定义 other 的图形，增加两条线
      G2.Shape.registerShape('interval', 'sliceShape', {
        draw: function draw (cfg, container) {
          var points = cfg.points
          var path = []
          path.push(['M', points[0].x, points[0].y])
          path.push(['L', points[1].x, points[1].y - sliceNumber])
          path.push(['L', points[2].x, points[2].y - sliceNumber])
          path.push(['L', points[3].x, points[3].y])
          path.push('Z')
          path = this.parsePath(path)
          return container.addShape('path', {
            attrs: {
              fill: cfg.color,
              path: path
            }
          })
        }
      })

      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 120,
        padding: [0, 'auto', 0, 0]
      })
      const view = this.chart.view({
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 0.8,
          y: 1
        }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
        // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
        padding: 0
      })
      this.chart.legend({
        position: 'right-center'
        // offsetX: -100
      })

      view.source(this.data)
      view.coord('theta', {
        innerRadius: 0.75
      })
      view.tooltip({
        showTitle: false
      })
      view
        .intervalStack()
        .position('value')
        .color('type')
        .shape('sliceShape')

      this.chart.render()
    },
    renderChartTriangle () {
      // 根据比例，获取两点之间的点
      function getPoint (p0, p1, ratio) {
        return {
          x: (1 - ratio) * p0.x + ratio * p1.x,
          y: (1 - ratio) * p0.y + ratio * p1.y
        }
      }
      var pointRatio = 0.7 // 设置开始变成三角形的位置 0.7

      // 自定义 other 的图形，增加两条线
      G2.Shape.registerShape('interval', 'triangleShape', {
        draw: function draw (cfg, container) {
          var centerPoint = {
            x: cfg.points[3].x,
            y: (cfg.points[2].y + cfg.points[3].y) / 2
          }
          centerPoint = this.parsePoint(centerPoint)

          var points = this.parsePoints(cfg.points)
          var tmpPoint1 = getPoint(points[0], points[3], pointRatio)
          var tmpPoint2 = getPoint(points[1], points[2], pointRatio)
          var path = []
          path.push(['M', points[0].x, points[0].y])
          path.push(['L', points[1].x, points[1].y])
          path.push(['L', tmpPoint2.x, tmpPoint2.y])
          path.push(['L', centerPoint.x, centerPoint.y])
          path.push(['L', tmpPoint1.x, tmpPoint1.y])
          path.push('Z')
          return container.addShape('path', {
            attrs: {
              fill: cfg.color,
              path: path,
              lineWidth: 1,
              stroke: 'white'
            }
          })
        }
      })

      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 120,
        padding: [0, 'auto', 0, 0]
      })
      const view = this.chart.view({
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 0.8,
          y: 1
        }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
        // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
        padding: 0
      })
      this.chart.legend({
        position: 'right-center'
        // offsetX: -100
      })
      view.source(this.data)
      view.coord('theta', {
        radius: 1
      })
      view
        .intervalStack()
        .position('value')
        .color('type')
        .shape('triangleShape')

      this.chart.render()
    }
  }
}
</script>

<style lang="less">
.card-chart {
  padding: 25px;
  height: 260px;
  border-radius: 4px;
  // border: 1px solid ;
  box-shadow: 0 0 13px 0 rgba(82, 63, 105, 0.05);
  position: relative;
  margin-bottom: 25px;
  .chart-box {
    position: absolute;
    left: 25px;
    right: 25px;
    bottom: 25px;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 0;
    color: #595d6e;
  }
  .sub-title {
    font-size: 12px;
    display: inline-block;
    color: #74788d;
  }
}
</style>
