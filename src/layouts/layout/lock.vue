<template>
  <div class="lock-wrapper" @keyup.esc="back">
    <div id="clock">
      <p class="date">{{ date }}</p>
      <p class="time">{{ time }}</p>
      <div class="lock-input-wrapper">
        <input
          type="password"
          placeholder="输入密码解锁"
          v-model="password"
          @keyup.enter="back"
          autocomplete="off"
        >
      </div>
      <p class="text">DIGITAL CLOCK by Artiely</p>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  data () {
    return {
      time: '',
      date: '',
      password: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.render()
      let vm = this
      document.addEventListener('keyup', function (e) {
        if (e.keyCode === 27) {
          vm.back()
        }
      })
    })
  },
  methods: {
    back () {
      if (md5(this.password) === this.$store.state.sys.password) {
        this.$store.commit('sys/isLock', false)
        this.$router.replace({ name: 'workplace' })
      } else {
        const key = `open${Date.now()}`
        this.$notification.error({
          placement: 'topRight',
          message: '错误提示！',
          description: '密码错误！访问被拒绝！',
          duration: 5,
          btn: (
            <a-button type="primary" slot="btn" size="small">
              忘记密码？
            </a-button>
          ),
          key
        })
      }
    },
    render () {
      let vm = this
      var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      setInterval(updateTime, 1000)
      updateTime()
      function updateTime () {
        var cd = new Date()
        vm.time =
          zeroPadding(cd.getHours(), 2) +
          ':' +
          zeroPadding(cd.getMinutes(), 2) +
          ':' +
          zeroPadding(cd.getSeconds(), 2)
        vm.date =
          zeroPadding(cd.getFullYear(), 4) +
          '-' +
          zeroPadding(cd.getMonth() + 1, 2) +
          '-' +
          zeroPadding(cd.getDate(), 2) +
          ' ' +
          week[cd.getDay()]
      }

      function zeroPadding (num, digit) {
        var zero = ''
        for (var i = 0; i < digit; i++) {
          zero += '0'
        }
        return (zero + num).slice(-digit)
      }
    }
  }
}
</script>

<style lang="less">
.lock-wrapper {
  display: flex;
  flex: 1;
  height: 100vh;
  background: #0f3854;
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
  background-size: 100%;
}
.lock-input-wrapper {
  height: 60px;
  width: 200px;
  border-radius: 4px;
  border: 2px solid #0a2e38;
  margin: 0 auto;
  input {
    height: 100%;
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 24px;
    text-align: center;
  }
}

#clock {
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #daf6ff;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
#clock .time {
  letter-spacing: 0.05em;
  font-size: 80px;
  padding: 5px 0;
  font-family: 'DINPro-Medium';
}
#clock .date {
  letter-spacing: 0.1em;
  font-size: 24px;
}
#clock .text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}
</style>
