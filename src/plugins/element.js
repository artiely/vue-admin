import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import forceFit from './forceFit.js'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
Vue.use(ElementUI)
Vue.use(VuePerfectScrollbar)
Vue.use(iView)
Vue.use(forceFit)
Vue.mixin({
  watch: {
    'layout.isCollapse': {
      handler () {
        console.log('this.$chart99999999999999', this.chart)
        setTimeout(() => {
          this.chart && this.chart.forceFit()
        }, 400)
      }
    }
  },
  mounted: function () {
  }
})
