<template>
  <div>
    <a-affix :offsetTop="top">
        <div class="action-box clearfix">
          <slot/>
          <div class="fr">

          <slot name="right"/>
          </div>
        </div>
      </a-affix>
  </div>
</template>

<script>
import { layout } from '@/common/observable/layout'
export default {
  name: 'v-actionbar',
  computed: {
    top () {
      return layout.layoutMode === 'flow' ? 0 : 104
    }
  }
}
</script>

<style>

</style>
