<template>
  <span class="md-amount" :class="{numerical: !isCapital}">
    <template
      v-if="!isCapital"
    >{{ formatValue | doPrecision(legalPrecision, isRoundUp) | doFormat(hasSeparator, separator) }}</template>
    <template v-else>{{ formatValue | doPrecision(4, isRoundUp) | doCapital }}</template>
  </span>
</template>

<script>
import utils from '@/common/utils'

import numberCapital from './number-capital'
let { inBrowser, Animate, formatValueByGapStep } = utils
console.log('utils', utils)
console.log('inBrowser', inBrowser)
console.log('Animate', Animate)
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
      default: false
    },
    separator: {
      type: String,
      default: ','
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
    }
  },

  data () {
    return {
      formatValue: 0,
      isMounted: false
    }
  },
  filters: {
    doPrecision (value, precision, isRoundUp) {
      const exponentialForm = Number(`${value}e${precision}`)
      const rounded = isRoundUp
        ? Math.round(exponentialForm)
        : Math.floor(exponentialForm)
      return Number(`${rounded}e-${precision}`).toFixed(precision)
    },
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

<style lang="less">
.md-amount {
  &.numerical {
    font-family: DINPro-Medium;
  }
}
</style>
