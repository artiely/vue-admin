<template>
  <div>
    <span @mouseenter="handleHover">
      <slot />
    </span>
    <a-range-picker
      @change="onChange"
      ref="v-date-range-picker"
      class="v-date-range-picker"
      :open="open"
      close
      :getCalendarContainer="(e)=>e.parentNode"
    >
      <template slot="renderExtraFooter">
        <slot name="footer">
          <a-button-group size="small">
            <a-button
              type="primary"
              @click="handleTimeLink(time)"
              v-for="(time,k) in options"
              :key="k"
            >{{time.label}}</a-button>
            <a-button @click="colseTime">清空</a-button>
          </a-button-group>
        </slot>
      </template>
    </a-range-picker>
  </div>
</template>

<script>
import utils from '@utils'
export default {
  name: 'v-date-range-picker',
  data () {
    return {
      open: false,
      options: [
        { label: '今日', value: 'day' },
        { label: '本周', value: 'week' },
        { label: '本月', value: 'month' },
        { label: '上月', value: 'prevMonth' },
        { label: '本年', value: 'year' }
      ]
    }
  },
  methods: {
    onChange (date, dateString) {
      this.open = false
      dateString = [`${dateString[0]} 00:00:00`, `${dateString[1]} 23:59:59`]
      this.$emit('change', dateString)
    },
    handleHover () {
      this.open = true
    },
    colseTime () {
      this.open = false
      this.$emit('change', [])
    },
    handleTimeLink (item) {
      this.open = false
      let dateString = utils.timeRange(item.value)
      this.$emit('change', dateString)
    }
  }
}
</script>

<style lang="less" >
.v-date-range-picker {
  // display: none;
  .ant-calendar-picker-input {
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
    opacity: 0;
  }
}
</style>
