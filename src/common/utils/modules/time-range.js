import moment from 'moment'
// 返回时间范围
/**
 *
 * 参数值String day 返回今日的时间范围
 * 参数值String week 返回本周的时间范围
 * 参数值String month 返回本月的时间范围
 * 参数值String prevMonth 返回上月的时间范围
 * 参数值String season 返回本季度的时间范围
 * 参数值String prevSeason 返回上季度的时间范围
 * 参数值String year 返回本年度的时间范围
 * 参数值String prevYear 返回本年度的时间范围
 */
export function timeRange (timeType) {
  let startTime
  let endTime
  switch (timeType) {
    case 'day':
      startTime =
        moment()
          .startOf('day')
          .format('YYYY-MM-DD') + ' 00:00:00'
      endTime = moment().format('YYYY-MM-DD') + ' 23:59:59'
      break
    case 'week':
      startTime =
        moment()
          .startOf('week')
          .format('YYYY-MM-DD') + ' 00:00:00'
      endTime = moment().format('YYYY-MM-DD') + ' 23:59:59'
      break
    case 'month':
      startTime =
        moment()
          .startOf('month')
          .format('YYYY-MM-DD') + ' 00:00:00'
      endTime = moment().format('YYYY-MM-DD') + ' 23:59:59'
      break
    case 'prevMonth':
      startTime =
        moment()
          .subtract(1, 'month')
          .startOf('month')
          .format('YYYY-MM-DD') + ' 00:00:00'
      endTime =
        moment()
          .subtract(1, 'month')
          .endOf('month')
          .format('YYYY-MM-DD') + ' 23:59:59'
      break
    case 'year':
      startTime =
        moment()
          .startOf('year')
          .format('YYYY-MM-DD') + ' 00:00:00'
      endTime = moment().format('YYYY-MM-DD') + ' 23:59:59'
      break
  }
  return [startTime, endTime]
}
