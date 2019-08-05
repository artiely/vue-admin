<template>
  <div>
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1" :tabPosition="tabPosition">
        <a-tab-pane tab="基本设置" key="1">
          <base-setting></base-setting>
        </a-tab-pane>
        <a-tab-pane tab="安全设置" key="2">
          <security/>
        </a-tab-pane>
        <a-tab-pane tab="个性化" key="3">
          <custom/>
        </a-tab-pane>
        <a-tab-pane tab="账户绑定" key="4">账户绑定</a-tab-pane>
        <a-tab-pane tab="新消息通知" key="5">新消息通知</a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import baseSetting from './settings/base-settings'
import custom from './settings/custom'
import security from './settings/security'
export default {
  components: {
    baseSetting,
    custom,
    security
  },
  data () {
    return {
      tabPosition: 'left',
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  computed: {
    isMobile () {
      return this.$store.state.sys.isMobile
    }
  },
  watch: {
    isMobile: {
      handler (val) {
        if (val) {
          this.tabPosition = 'top'
        } else {
          this.tabPosition = 'left'
        }
      }
    }
  }
}
</script>
