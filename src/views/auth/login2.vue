<template>
  <div class="v-bg">
    <a-modal
      :mask="false"
      v-model="centerDialogVisible"
      :maskClosable="false"
      centered
       width="400px"
      style="width:300px!important"
      :show-close="false"
      :modal="false"
      :footer="null"
      :closable="false"
      :keyboard="false"
      class="login-modal my-login-modal"
    >
      <a-spin :spinning="loading">
        <v-logo color="#333"></v-logo>
        <a-form :form="form">
          <!--  label='账号'  -->
          <a-form-item
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
            v-decorator="['username',{rules: [{ required: true, message: '请输入邮箱地址'}],initialValue:username}]"
          >
            <a-input placeholder="请输入邮箱地址" size="large">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <!--  label='密码' -->
          <a-form-item
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
            v-decorator="['password',{rules: [{ required: true, message: '请输入密码' }],initialValue:password}]"
          >
            <a-input placeholder="请输入密码" size="large" type="password">
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
          <a-form-item
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
            v-decorator="['captcha',{rules: [{ required: true, message: '请输入右侧验证码' }],initialValue:captcha}]"
          >
            <a-input
              placeholder="请输入右侧验证码"
              class="captch-img"
              size="large"
              autocomplete="off"
              :value="captcha"
            >
              <div slot="addonAfter">
                <img :src="captchPath" style="width:152px;cursor:pointer" @click="getCaptch">
              </div>
            </a-input>
          </a-form-item>
          <a-form-item
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
            style="margin-bottom:0"
          >
            <a-checkbox v-model="memory" @change="memory!=memory">记住密码</a-checkbox>
            <a href class="fr">忘记密码</a>
          </a-form-item>
        </a-form>
         <div >
        <a-button
          type="primary"
          @click="check"
          style="width:100%"
          size="large"
          :loading="loading"
        >登录</a-button>
        <a-button
          style="width:100%;margin:10px 0 0 0"
          size="large"
          :loading="loading"
          @click="toRegister"
        >立即注册</a-button>
      </div>
      </a-spin>

    </a-modal>
    <div id="particles-js"></div>
  </div>
</template>
<script>
import uuid from 'uuid'
import md5 from 'md5'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 }
}
export default {
  data () {
    return {
      memory: true,
      formItemLayout,
      centerDialogVisible: true,
      loading: false,
      username: 'admin',
      password: '',
      captcha: '',
      captchPath: '',
      uuid: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    menu () {
      return this.$store.state.sys.menu
    }
  },
  mounted () {
    this._animateBg()
    this.getCaptch()
  },
  methods: {
    toRegister () {
      this.$router.push('/register')
    },
    handleConfirmPassword (rule, value, callback) {
      const { getFieldValue } = this.form
      if (value && value !== getFieldValue('password')) {
        callback('两次输入不一致！')
      }
      // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      callback()
    },
    toLogin () {
      this.registerDialogVisible = false
      this.centerDialogVisible = true
      this.getCaptch()
    },
    check () {
      this.form.validateFields((err, vals) => {
        if (!err) {
          this.loading = true
          let { password } = vals
          this.$store.commit('sys/savePassword', md5(password))
          this.$store
            .dispatch('auth/login', { ...vals, uuid: this.uuid })
            .then(res => {
              this.getCaptch()
              this.loading = false
            })
            .catch(() => {
              this.getCaptch()
              this.loading = false
            })
        }
      })
    },
    beforeRouteLeave (to, from, next) {
      this.loading = false
    },
    getCaptch () {
      this.uuid = uuid()
      // this.captchPath = this.$api.CAPTCHA() + this.uuid
    },
    _animateBg () {
      /* global particlesJS */
      particlesJS(
        'particles-js',
        {
          particles: {
            number: {
              value: 6,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: '#1b1e34'
            },
            shape: {
              type: 'polygon',
              stroke: {
                width: 0,
                color: '#000'
              },
              polygon: {
                nb_sides: 6
              },
              image: {
                src: 'img/github.svg',
                width: 100,
                height: 100
              }
            },
            opacity: {
              value: 0.3,
              random: true,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 160,
              random: false,
              anim: {
                enable: true,
                speed: 10,
                size_min: 40,
                sync: false
              }
            },
            line_linked: {
              enable: false,
              distance: 200,
              color: '#ffffff',
              opacity: 1,
              width: 2
            },
            move: {
              enable: true,
              speed: 8,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: false,
                mode: 'grab'
              },
              onclick: {
                enable: false,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
        },
        function () {
          console.log('callback - particles.js config loaded')
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>

.my-login-modal {
  .ant-modal-content {
    border-radius: 0;
  }
}
.captch-img {
  .ant-input-group-addon {
    padding: 0;
  }
}
.v-bg {
  height: 100%;
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url('../../assets/fullstack.jpg');
}
.login-modal {
  .ant-modal-body {
    padding-bottom: 0 !important;
  }
}
canvas {
  display: block;
  /* vertical-align: bottom; */
} /* ---- particles.js container ---- */
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: none;
  background-image: url('');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
} /* ---- stats.js ---- */
.count-particles {
  background: #000022;
  position: absolute;
  top: 48px;
  left: 0;
  width: 80px;
  color: #13e8e9;
  font-size: 0.8em;
  text-align: left;
  text-indent: 4px;
  line-height: 14px;
  padding-bottom: 2px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
}
.js-count-particles {
  font-size: 1.1em;
}
#stats,
.count-particles {
  -webkit-user-select: none;
  margin-top: 5px;
  margin-left: 5px;
}
#stats {
  border-radius: 3px 3px 0 0;
  overflow: hidden;
}
.count-particles {
  border-radius: 0 0 3px 3px;
}
</style>
