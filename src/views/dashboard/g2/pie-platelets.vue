<template>
  <div :id="id"></div>
</template>

<script>
import uuid from 'uuid'
import G2 from '@antv/g2'
export default {
  data () {
    return {
      id: 'uuid' + uuid()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.renderChart()
    })
  },
  methods: {
    renderChart () {
      var data = [
        {
          type: '分类一',
          value: 27
        },
        {
          type: '分类二',
          value: 25
        },
        {
          type: '分类三',
          value: 18
        },
        {
          type: '分类四',
          value: 15
        },
        {
          type: '分类五',
          value: 10
        },
        {
          type: 'Other',
          value: 5
        }
      ]

      // 根据比例，获取两点之间的点
      function getPoint (p0, p1, ratio) {
        return {
          x: (1 - ratio) * p0.x + ratio * p1.x,
          y: (1 - ratio) * p0.y + ratio * p1.y
        }
      }

      var pointRatio = 0.7 // 设置开始变成圆弧的位置 0.7
      // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
      var sliceNumber = 0.005

      // 自定义 other 的图形，增加两条线
      G2.Shape.registerShape('interval', 'platelet', {
        draw: function draw (cfg, container) {
          cfg.points[1].y = cfg.points[1].y - sliceNumber
          cfg.points[2].y = cfg.points[2].y - sliceNumber
          var centerPoint = {
            x: cfg.points[3].x,
            y: (cfg.points[2].y + cfg.points[3].y) / 2
          }
          centerPoint = this.parsePoint(centerPoint)
          var points = this.parsePoints(cfg.points)
          var path = []
          var tmpPoint1 = getPoint(points[0], points[3], pointRatio)
          var tmpPoint2 = getPoint(points[1], points[2], pointRatio)
          path.push(['M', points[0].x, points[0].y])
          path.push(['L', tmpPoint1.x, tmpPoint1.y])
          path.push([
            'Q',
            points[3].x,
            points[3].y,
            centerPoint.x,
            centerPoint.y
          ])
          path.push(['Q', points[2].x, points[2].y, tmpPoint2.x, tmpPoint2.y])
          path.push(['L', points[1].x, points[1].y])
          path.push(['z'])
          return container.addShape('path', {
            attrs: {
              fill: cfg.color,
              path: path
            }
          })
        }
      })

      var chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 400,
        padding: [70, 70]
      })

      chart.source(data)
      chart.coord('theta')
      chart
        .intervalStack()
        .position('value')
        .color('type')
        .shape('platelet')
        .label('type')

      chart.render()
    }
  }
}
</script>

<style>
</style>
