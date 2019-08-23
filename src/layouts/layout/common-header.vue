<template>
  <div class="fr header-right">
    <v-button tip="点击新增一个订单" class="hidden-xs-only">
      <a-icon type="search" />
    </v-button>
    <v-button tip="查看今日订单" class="hidden-xs-only">
      <a-iconfont type="icon-commodity" />
    </v-button>
    <v-button tip="查看今日营业额" class="hidden-xs-only">
      <a-iconfont type="icon-financial_fill" />
    </v-button>
    <v-button tip="预约消息">
      <a-iconfont type="icon-wangwang" />
    </v-button>
    <v-button tip="代办事项" class="hidden-xs-only">
      <a-iconfont type="icon-time" />
    </v-button>
    <v-button :tip="screen?'退出全屏':'全屏'" class="hidden-xs-only" @click="toggleScreen">
      <a-iconfont :type="screen?'icon-smallscreen':'icon-send'" />
    </v-button>
    <v-button tip="锁屏" @click="$router.push('/lock')" class="hidden-xs-only">
      <a-iconfont type="icon-lock" />
    </v-button>
    <a-divider type="vertical" />
    <a-dropdown>
      <a class="ant-dropdown-link" href="#">
        <a-badge :count="99">
          <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </a-badge>Artiely
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item key="-1">
          <a rel="noopener noreferrer" @click="$router.push('/userinfo')" href="javascript:;">个人中心</a>
        </a-menu-item>
        <a-menu-item key="0">
          <a rel="noopener noreferrer" href="javascript:;" @click="$router.push('/todo')">代办事项</a>
        </a-menu-item>
        <a-menu-item key="1">
          <a
            rel="noopener noreferrer"
            href="javascript:;"
            @click="$router.push('/handler-over')"
          >交班下班</a>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="2">
          <a rel="noopener noreferrer" href="javascript:;" @click="$router.replace('/login')">退出登录</a>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3" disabled>切换店铺</a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-divider type="vertical" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      screen: false
    }
  },
  methods: {
    toggleScreen () {
      if (!this.screen) {
        var docElm = document.documentElement
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen()
        } else {
          this.$message.error({
            content: '除了让你升级浏览器对方没什么好说的！',
            duration: 3
          })
        }
        this.screen = true
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else {
          this.$message.error({
            content: '请升级浏览器，不然我是不会理你的！',
            duration: 3
          })
        }
        this.screen = false
      }
    }
  }
}
</script>

<style scoped>
.header-right {
  height: 64px;
  overflow: hidden;
  padding-right: 20px;
}
</style>
