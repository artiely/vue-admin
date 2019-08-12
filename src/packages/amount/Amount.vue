<template>
  <span class="md-amount " :class="{numerical: !isCapital}">
    <!-- 其他 -->
    <template
      v-if="!isCapital"
    >
    <span v-if="prefix" :style="{fontSize:prefixSize+'em'}">{{prefix}}</span>
    <span class="number">{{ formatValue | doPrecision(legalPrecision, isRoundUp) | doFormat(hasSeparator, separator) }}</span>
    <span v-if="suffix" :style="{fontSize:suffixSize+'em'}">{{suffix}}</span>
    </template>
    <!-- 大写 -->
    <template v-else>{{ formatValue | doPrecision(4, isRoundUp) | doCapital }}</template>
  </span>
</template>

<script>
import utils from '@/common/utils'

import numberCapital from './number-capital'
let { inBrowser, Animate, formatValueByGapStep } = utils
export default {
  name: 'v-amount',
  props: {
    value: {
      type: Number,
      default: 0
    },
    precision: {
      type: Number,
      default: 2
    },
    isRoundUp: {
      type: Boolean,
      default: true
    },
    hasSeparator: {
      type: Boolean,
      default: true
    },
    separator: {
      type: String,
      default: ''
    },
    isAnimated: {
      type: Boolean,
      default: false
    },
    transition: {
      type: Boolean,
      default: false
    },
    isCapital: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 1000
    },
    prefix: {
      type: String,
      default: ''
    },
    prefixSize: {
      type: Number,
      default: 1
    },
    suffix: {
      type: String,
      default: ''
    },
    suffixSize: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      formatValue: 0,
      isMounted: false
    }
  },
  filters: {
    /**
     * doPrecision格式化保留的小数位
     * value 原始值
     * precision 小数点的保留位数
     * isRoundUp 是否四舍五入
     */
    doPrecision (value, precision, isRoundUp, simple) {
      const exponentialForm = Number(`${value}e${precision}`)
      const rounded = isRoundUp
        ? Math.round(exponentialForm)
        : Math.floor(exponentialForm)
      return Number(`${rounded}e-${precision}`).toFixed(precision)
    },
    /**
     * 是否加入千分符
     */
    doFormat (value, hasSeparator, separator) {
      if (!hasSeparator) {
        return value
      }

      const numberParts = value.split('.')
      const integerValue = numberParts[0]
      const decimalValue = numberParts[1] || ''
      const formateValue = formatValueByGapStep(
        3,
        integerValue,
        separator,
        'right',
        0,
        1
      )
      return decimalValue
        ? `${formateValue.value}.${decimalValue}`
        : `${formateValue.value}`
    },
    doCapital (value) {
      return numberCapital(value)
    }
  },

  watch: {
    value: {
      handler (val, oldVal) {
        /* istanbul ignore if  */
        if (!inBrowser && !this.isMounted) {
          this.formatValue = val
          return
        }
        if (this.isAnimated || this.transition) {
          this.$_doAnimateDisplay(oldVal, val)
        } else {
          this.formatValue = val
        }
      },
      immediate: true
    }
  },

  computed: {
    legalPrecision () {
      return this.precision > 0 ? this.precision : 0
    }
  },

  mounted () {
    this.isMounted = true
  },

  methods: {
    // MARK: private methods
    $_doAnimateDisplay (fromValue = 0, toValue = 0) {
      /* istanbul ignore next  */
      const step = percent => {
        if (percent === 1) {
          this.formatValue = toValue
          return
        }
        this.formatValue = fromValue + (toValue - fromValue) * percent
      }

      /* istanbul ignore next  */
      const verify = id => id
      Animate.start(step, verify, () => {}, this.duration)
    }
  }
}
</script>
