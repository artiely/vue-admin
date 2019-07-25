import Vue from 'vue'
import { currency } from '../filter'
import { isObject } from '../utils'
// 元素级别的权限
Vue.directive('isAuth', {
  bind: function (el, binding) {
    let isAuth =
      JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(
        binding.value
      ) !== -1 || false
    if (!isAuth) {
      el.style.display = 'none'
    }
  },
  update: function (el, binding) {
    let isAuth =
      JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(
        binding.value
      ) !== -1 || false
    if (!isAuth) {
      el.style.display = 'none'
    }
  }
})
// 删除html
Vue.directive('delHtmlTag', {
  bind: function (el, binding, vnode) {
    let str = el.innerText
    el.innerHTML = str.replace(/<[^>]+>/g, '')
  },
  update: function (el, binding, vnode) {
    let str = el.innerText
    el.innerHTML = str.replace(/<[^>]+>/g, '')
  }
})

Vue.directive('exp', {
  bind: function (el, binding, vnode) {
    console.log('TCL: vnode', vnode)
    let keywords = binding.value
    console.log('TCL: binding', binding)
    let allText = el.innerText
    // console.log(el)
    console.log('TCL: el', el)
    // let res = allText.replace(
    //   keywords,
    //   `<span style="color:red">${keywords}</span>`
    // )
    // el.innerHTML = res
  },
  update: function (el, binding, vnode) {
    let keywords = binding.value
    let allText = el.innerText
    // let res = allText.replace(
    //   keywords,
    //   `<span style="color:red">${keywords}</span>`
    // )
    // el.innerHTML = res
  }
})

// 格式化金额 展示小羊角 参数 v-currency="1000" 或 v-currency="{value:1000,decimals:0}" 需要设置未数的时候用对象格式
/**
 * v-currency="{value:1000,decimals:0}" ->1,000
 * v-currency="{value:1000,decimals:2}" ->1,000.00
 * v-currency:w="{value:1000,decimals:2}" ->1,000.00
 * v-currency:w="{value:10000,decimals:2}" ->1.00万
 */
function format(el, binding) {
  let w = binding.arg && binding.arg === 'w'
  let formatMoney = 0

  let value = 0 // 默认的金额
  let pre = '￥' // 默认的货币符号
  let unit = '元' // 默认的结尾货币单位
  let decimals = 2 // 默认的保留小数点后几位
  let style = true // 是否前后符号单位小于数字
  let zoom = 0.5 // 数字与单位的比例

  if (isObject(binding.value)) {
    decimals = binding.value.decimals !== undefined ? binding.value.decimals : 2
    value = binding.value.value || 0
    unit = binding.value.unit || ''
    style = binding.value.style !== undefined ? binding.value.style : true
    pre = binding.value.pre !== undefined ? binding.value.pre : '￥'
    zoom = binding.value.zoom || 0.5
  } else {
    value = binding.value || 0
  }
  let myStyle = style ? `font-size:${zoom}em` : ''
  if (w) {
    let len = parseInt(value).toString().length
    if (value < 0) {
      len = len - 1
    }
    if (len > 10) {
      value = value / 1000000000
      formatMoney = currency(value, '', decimals)
      el.innerHTML = `<span style="font-family:DINPro-Medium"><span  style=${myStyle}>${pre}</span>${formatMoney}<span style=${myStyle}>亿${unit}</span></span>`
    } else if (len > 8) {
      value = value / 10000000
      formatMoney = currency(value, '', decimals)
      el.innerHTML = `<span style="font-family:DINPro-Medium"><span  style=${myStyle}>${pre}</span>${formatMoney}<span style=${myStyle}>千万${unit}</span></span>`
    } else if (len > 6) {
      value = value / 1000000
      formatMoney = currency(value, '', decimals)
      el.innerHTML = `<span style="font-family:DINPro-Medium"><span  style=${myStyle}>${pre}</span>${formatMoney}<span style=${myStyle}>百万${unit}</span></span>`
    } else if (len > 4) {
      value = value / 10000
      formatMoney = currency(value, '', decimals)
      el.innerHTML = `<span style="font-family:DINPro-Medium"><span  style=${myStyle}>${pre}</span>${formatMoney}<span style=${myStyle}>万${unit}</span></span>`
    } else {
      formatMoney = currency(value, '', decimals)
      el.innerHTML = `<span style="font-family:DINPro-Medium"><span  style=${myStyle}>${pre}</span>${formatMoney}<span style=${myStyle}>${unit}</span></span>`
    }
  } else {
    formatMoney = currency(value, '', decimals)
    el.innerHTML = `<span style="font-family:DINPro-Medium"><span style=${myStyle}>${pre}</span>${formatMoney}<span style=${myStyle}>${unit}</span></span>`
  }
}
Vue.directive('currency', {
  bind: function (el, binding, vnode) {
    format(el, binding)
  },
  update: function (el, binding, vnode) {
    format(el, binding)
  }
})
