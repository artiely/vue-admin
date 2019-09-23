import Vue from 'vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moment from 'moment'
import 'moment/locale/zh-cn'
import VueTheMask from 'vue-the-mask'
// import MaskedInput from 'vue-text-mask'
import VueAMap from 'vue-amap'
import LazyRender from 'vue-lazy-render'
// Vue.component('masked-input', MaskedInput);
moment.locale('zh-cn')
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'b3607bdac4fe604b02cc70160937c6f0',
  plugin: [
    'Autocomplete',
    'PlaceSearch',
    'Scale',
    'OverView',
    'ToolBar',
    'MapType',
    'PolyEditor',
    'CircleEditor',
    'Geolocation'
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  zoom: 15
})
Vue.use(LazyRender)
// 全局注入
Vue.use(VuePerfectScrollbar)
Vue.use(VueTheMask)
