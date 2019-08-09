<template>
  <div :id="id"></div>
</template>

<script>
import G2 from '@antv/g2'
var data = [
  {
    year: '1951 年',
    sales: 38
  },
  {
    year: '1952 年',
    sales: 52
  },
  {
    year: '1956 年',
    sales: 61
  },
  {
    year: '1957 年',
    sales: 145
  },
  {
    year: '1958 年',
    sales: 48
  },
  {
    year: '1959 年',
    sales: 38
  },
  {
    year: '1960 年',
    sales: 38
  },
  {
    year: '1962 年',
    sales: 38
  },
  {
    year: '1963 年',
    sales: 100
  },
  {
    year: '1964 年',
    sales: 38
  },
  {
    year: '1965 年',
    sales: 38
  },
  {
    year: '1966 年',
    sales: 38
  }
]
export default {
  props: {
    id: String
  },
  data () {
    return {
      chart: null,
      timer: null
    }
  },
  mounted () {
    this.chart = new G2.Chart({
      container: this.id,
      forceFit: true,
      height: 300
    })
    this.chart.source(data)
    this.chart.scale('sales', {
      tickInterval: 20
    })
    this.chart.interval().position('year*sales')
    this.chart.render()
  }
}
</script>

<style>
</style>
