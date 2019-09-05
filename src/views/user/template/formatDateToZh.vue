<template >
  <div class="format-cn">
    {{chinaDate.gzDay}}
    {{chinaDate.IDayCn}}
    <a-tag color="purple" v-if="chinaDate.lunarValue" style="display:inline-block">{{chinaDate.lunarValue}}</a-tag>
  </div>
</template>

<script>
import moment from 'moment'
import calendar from '../lib/calendar.js'
export default {
  props: {
    date: Object
  },
  data () {
    return {
      moment: Object.freeze(moment),
      calendar: Object.freeze(calendar),
      festival: Object.freeze({
        lunar: {
          '01-01': '春节',
          '01-15': '元宵节',
          '02-02': '龙头节',
          '05-05': '端午节',
          '07-07': '七夕节',
          '07-15': '中元节',
          '08-15': '中秋节',
          '09-09': '重阳节',
          '10-01': '寒衣节',
          '10-15': '下元节',
          '12-08': '腊八节',
          '12-23': '祭灶节'
        },
        gregorian: {
          '01-01': '元旦',
          '02-14': '情人节',
          '03-08': '妇女节',
          '03-12': '植树节',
          '04-05': '清明节',
          '05-01': '劳动节',
          '05-04': '青年节',
          '06-01': '儿童节',
          '07-01': '建党节',
          '08-01': '建军节',
          '09-10': '教师节',
          '10-01': '国庆节',
          '12-24': '平安夜',
          '12-25': '圣诞节'
        }
      })
    }
  },
  computed: {
    chinaDate () {
      let dateArr = moment(this.date).format('YYYY-MM-DD').split('-')
      let lunarInfo = calendar.solar2lunar(dateArr[0], dateArr[1], dateArr[2])
      let m = dateArr[1]; let d = dateArr[2]
      function addZero (val) {
        return val.toString().length > 2 ? val : '0' + val
      }
      let lunarValue
      if (this.festival.lunar[addZero(lunarInfo.lMonth) + '-' + addZero(lunarInfo.lDay)] !== undefined) {
        lunarValue = this.festival.lunar[addZero(lunarInfo.lMonth) + '-' + addZero(lunarInfo.lDay)]
      } else if (this.festival.gregorian[m + '-' + d] !== undefined) {
        lunarValue = this.festival.gregorian[m + '-' + d]
      } else {
        lunarValue = null
      }
      return { ...lunarInfo, lunarValue }
    }
  }
}
</script>

<style lang="less" scoped>
.format-cn{
  text-align: right;
  font-size: 10px;
}
</style>
