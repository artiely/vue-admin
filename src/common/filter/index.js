import moment from 'moment'
/**
 * 隐藏姓名 手机号 身份证 银行卡 等中间字符信息
 * @param str
 * @returns {*}
 */
export function star (value) {
  let str = value.toString()
  if (str.length > 0 && str.length < 3) {
    return '*' + str.substring(1)
  } else if (str.length > 5 && str.length < 12) {
    return str.substr(0, 3) + '****' + str.substr(-4)
  } else if (str.length > 14) {
    return str.substr(0, 4) + '***********' + str.substr(-4)
  } else {
    return str
  }
}

/* 格式货币 */
const digitsRE = /(\d{3})(?=\d)/g

export function currency (value, currency, decimals, separator = '') {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : `￥`
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  var i = _int.length % 3
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? separator : '') : ''
  var _float = decimals ? stringified.slice(-1 - decimals) : ''
  var sign = value < 0 ? '-' : ''
  return (
    sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
  )
}

/**
 * 格式化时间
 * @param time
 * @param format
 * @returns {*}
 */
export function timeFormat (time, format) {
  if (!time) return ''
  format = format != null ? format : 'YYYY-MM-DD HH:mm:ss'
  return moment(time).format(format)
}
/* 格式化显示手机号 159 9999 9999
show boolean 表示是否隐藏中间的手机号 默认false
*/
export function telFormat (tel, show) {
  if (!tel) return ''
  let startTel = tel.slice(0, 3)
  let midTel
  if (show) {
    midTel = '****'
  } else {
    midTel = tel.slice(3, 7)
  }
  let endTel = tel.slice(7, 11)
  return `${startTel} ${midTel} ${endTel}`
}

/**
 * 格式化时间 -> 转化为天
 * @param time
 * @param format
 * @returns {*}
 */
export function timeFormatToDays (time) {
  if (!time) return ''
  return moment(time).diff(moment(), 'days') + 1
}
/**
 * 格式化车牌 -> 鄂A88888 ->  鄂A 88888
 * @param time
 * @param format
 * @returns {*}
 */
export function carIdFormat (val) {
  if (!val) return ''
  let pre = val.slice(0, 2)
  let end = val.slice(2)
  return `${pre} ${end}`
}
/* 结算方式 */
export function chargeType (val) {
  if (!val) return ''
  switch (val) {
    case '0':
      return '其他'
    case '1':
      return '现金'
    case '2':
      return '银行/卡'
    case '3':
      return '支付宝'
    case '4':
      return '微信'
    case '5':
      return '储值账户'
    case '6':
      return '折扣卡'
    case '7':
      return '次卡'
    case '8':
      return '线上收款'
  }
}
/* 业务类型 */
export function serviceTypeFormat (val) {
  let serviceType = '--'
  if (!val) return
  switch (val) {
    case '0':
      serviceType = '收款单'
      break
    case '1':
      serviceType = '付款单'
      break
    case '2':
      serviceType = '记一笔'
      break
    case '3':
      serviceType = '库存盘点'
      break
    case '4':
      serviceType = '账户期初'
      break
    case '5':
      serviceType = '出入库'
      break
    case '6':
      serviceType = '销售订单'
      break
    case '7':
      serviceType = '充值'
      break
    case '8':
      serviceType = '办卡'
      break
    case '9':
      serviceType = '直接收银'
      break
    case '12':
      serviceType = '提现服务费'
      break
  }
  return serviceType
}

/* 客户来源/办理类型 */
export function srcType (val) {
  if (!val) return
  switch (val) {
    // <!-- dealType;   // 办理类型（1店员新增/2批量导入/3充值办卡/4领优惠券） -->
    case '1':
      return '主动新增'
    case '2':
      return '开单新增'
    case '3':
      return '充卡新增'
    case '4':
      return '收银新增'
    case '5':
      return '领券新增'
  }
}

/* 会员卡消费记录来源业务类型 */
export function srcBusType (val) {
  if (!val) return
  switch (val) {
    // "A1 充值活动 "A2 直接充值 "A3 批量导入 "A4 充值活动赠送 "D1 开单划卡
    case 'A1':
      return '充值活动'
    case 'A2':
      return '直接充值'
    case 'A3':
      return '批量导入'
    case 'A4':
      return '充值活动赠送'
    case 'D1':
      return '销售订单'
  }
}
