<template >
  <span></span>
</template>

<script>
import 'driver.js/dist/driver.min.css'
import Driver from 'driver.js'
export default {
  name: 'v-guide',
  props: {
    steps: {
      type: Array,
      default () {
        return []
      }
    },
    onNext: Function,
    onPrevious: Function
  },
  data () {
    return {
      driver: null
    }
  },
  methods: {
    start () {
      this.driver = new Driver({
        className: 'scoped-class', // className to wrap driver.js popover
        animate: true, // Animate while changing highlighted element
        opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
        padding: 10, // Distance of element from around the edges
        allowClose: false, // Whether clicking on overlay should close or not
        overlayClickNext: false, // Should it move to next step on overlay click
        doneBtnText: '完成', // Text on the final button
        closeBtnText: '关闭', // Text on the close button for this step
        nextBtnText: '下一步', // Next button text for this step
        prevBtnText: '上一步',
        onNext: this.onNext,
        onPrevious: this.onPrevious
      })

      // Define the steps for introduction
      this.driver.defineSteps(this.steps)
      // Start the introduction
      this.driver.start()
    }
  }
}
</script>

<style>

</style>
