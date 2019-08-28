
<template>
  <div class="scrollbar">
    <VuePerfectScrollbar
      class="scroll-area"
      v-once
      :settings="settings"
      @ps-scroll-y="scrollHandle"
    >
      <div height="720" width="1280">
        <h1 v-for="i in 100" :key="i">{{i}}</h1>
      </div>
    </VuePerfectScrollbar>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'scrollbar',
  components: { VuePerfectScrollbar },
  data () {
    return {
      settings: {
        maxScrollbarLength: 60
      }
    }
  },
  computed: {},
  watch: {},
  /*
  beforeCreate
  created
  beforeMount
  mounted
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  destroyed
  errorCaptured
   */
  created () {},
  methods: {
    scrollHandle (evt) {
    }
  }
}
</script>
<style lang="less" scoped>
.scrollbar {
  .scroll-area {
    position: relative;
    margin: auto;
    width: 400px;
    height: 300px;
    background: #eee;
  }

}
</style>
