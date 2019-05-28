import Vue from 'vue'
import Skeleton from '@/packages/skeleton/Skeleton2'
console.log('TCL: Skeleton', Skeleton)

export default new Vue({
  components: {
    Skeleton
  },
  render: h => h(Skeleton)
})
