<template>
  <a-card :bodyStyle="{padding:0}">
    <a-switch checkedChildren="农历开" unCheckedChildren="农历关" v-model="lunarInfoShow" :loading="loading"/>
    <a-calendar>
      <ul class="events" slot="dateCellRender" slot-scope="value">
        <format-date-to-zh v-if="lunarInfoShow" :date="value"></format-date-to-zh>
        <a-popover title="事件详情">
          <template slot="content">
            <li v-for="item in getListData(value)" :key="item.content">
              <a-badge :status="item.type" :text="item.content" />
            </li>
          </template>
          <template v-if="getListData(value).length<=2">
            <li v-for="item in getListData(value).slice(0,2)" :key="item.content">
              <a-badge :status="item.type" :text="item.content" />
            </li>
          </template>
          <template v-else>
            <li v-for="item in getListData(value).slice(0,1)" :key="item.content">
              <a-badge :status="item.type" :text="item.content" />
            </li>
            <a-badge
              :count="`${getListData(value).length-1} 个更多事件`"
              :numberStyle="{backgroundColor: '#52c41a'} "
              v-if="getListData(value).length&&getListData(value).length>2"
            />
          </template>
        </a-popover>
      </ul>
      <template slot="monthCellRender" slot-scope="value">
        <div v-if="getMonthData(value)" class="notes-month">
          <section>{{getMonthData(value)}}</section>
          <span>Backlog number</span>
        </div>
      </template>
    </a-calendar>
  </a-card>
</template>
<script>
import calendar from './lib/calendar.js'
import moment from 'moment'
import formatDateToZh from './template/formatDateToZh'
export default {
  components: {
    formatDateToZh
  },
  data () {
    return {
      moment: Object.freeze(moment),
      calendar,
      lunarInfoShow: false,
      loading: false,
      timer: null
    }
  },
  watch: {
    lunarInfoShow (val) {
      if (val) {
        this.loading = true
        this.timer = setTimeout(() => {
          this.loading = false
        }, 2000)
      }
    }
  },
  methods: {
    getListData (value) {
      let listData
      switch (value.date()) {
        case 8:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' }
          ]
          break
        case 10:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
            { type: 'error', content: 'This is error event.' }
          ]
          break
        case 15:
          listData = [
            { type: 'warning', content: 'This is warning event' },
            {
              type: 'success',
              content: 'This is very long usual event。。....'
            },
            { type: 'error', content: 'This is error event 1.' },
            { type: 'error', content: 'This is error event 2.' },
            { type: 'error', content: 'This is error event 3.' },
            { type: 'error', content: 'This is error event 4.' }
          ]
          break
        default:
      }
      return listData || []
    },

    getMonthData (value) {
      if (value.month() === 8) {
        return 1394
      }
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>
<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
