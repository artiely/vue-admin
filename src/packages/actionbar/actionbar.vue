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

<style lang="less">
@import '../../assets/styles/var.less';
.action-box {
    background: fade(@component-background,90%);
    padding: 10px;
    box-shadow: 0 4px 3px -3px rgba(10, 10, 10, 0.1);
    position: relative;
    z-index: 100;
    border-radius: 4px;
  }
</style>
