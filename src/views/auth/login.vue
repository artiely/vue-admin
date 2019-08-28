<template>
  <div class="v-bg login">
    <a-modal
      :mask="false"
      v-model="centerDialogVisible"
      :width="layout.breakPoint!=='lg'?'400px':'1000px'"
      :maskClosable="false"
      centered
      :bodyStyle="{padding:0}"
      wrapClassName="my-login-modal"
      :footer="null"
      :show-close="false"
      :modal="false"
      :closable="false"
      :keyboard="false"
      class="login-modal"
    >
    <div style="display:flex">
      <div class="hidden-md-and-down" style="flex:2">
         <a-carousel autoplay>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </a-carousel>
      </div>
      <div style="flex:1">
         <a-spin :spinning="loading">
            <div style="padding:40px" class="login1">
              <v-logo color="#333" />
              <a-form :form="form">
                <!--  label='账号'  -->
                <a-form-item
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  v-decorator="['username',{rules: [{ required: true, message: '请输入邮箱地址'}],initialValue:username}]"
                >
                  <a-input placeholder="请输入邮箱地址" size="large">
                    <a-icon slot="prefix" type="user"  />
                  </a-input>
                </a-form-item>
                <!--  label='密码' -->
                <a-form-item
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  v-decorator="['password',{rules: [{ required: true, message: '请输入密码' }],initialValue:password}]"
                >
                  <a-input placeholder="请输入密码" size="large" type="password">
                    <a-icon slot="prefix" type="lock"  />
                  </a-input>
                </a-form-item>
                <a-form-item
                  :labelCol="formItemLayout.labelCol"
                  :wrapperCol="formItemLayout.wrapperCol"
                  style="margin-bottom:0"
                >
                  <a-checkbox v-model="memory" @change="memory!=memory">下次自动登录</a-checkbox>
                </a-form-item>
              </a-form>

              <a-button
                type="primary"
                @click="check"
                style="width:100%;margin-bottom:10px"
                size="large"
                :loading="loading"
              >登录</a-button>
              <a
                @click="toRegister"
              >还没有账号？立即注册</a>

              <a href class="fr">忘记密码</a>
              <div style="padding-top:50px">
                为了您的流畅体验和避免广告骚扰，我们推荐您使用chrome浏览器，<a href="">点击下载</a>
              </div>
            </div>
          </a-spin>
      </div>
    </div>
    </a-modal>
    <div id="particles-js"></div>
  </div>
</template>
<script>
import uuid from 'uuid'
import md5 from 'md5'
import { layout } from '@layouts'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 }
}
export default {
  data () {
    return {
      layout,
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
          'particles': {
            'number': {
              'value': 80,
              'density': {
                'enable': true,
                'value_area': 800
              }
            },
            'color': {
              'value': '#888888'
            },
            'shape': {
              'type': 'circle',
              'stroke': {
                'width': 0,
                'color': '#000000'
              },
              'polygon': {
                'nb_sides': 5
              },
              'image': {
                'src': 'img/github.svg',
                'width': 100,
                'height': 100
              }
            },
            'opacity': {
              'value': 0.5,
              'random': false,
              'anim': {
                'enable': false,
                'speed': 1,
                'opacity_min': 0.1,
                'sync': false
              }
            },
            'size': {
              'value': 3,
              'random': true,
              'anim': {
                'enable': false,
                'speed': 40,
                'size_min': 0.1,
                'sync': false
              }
            },
            'line_linked': {
              'enable': true,
              'distance': 150,
              'color': '#999999',
              'opacity': 0.4,
              'width': 1
            },
            'move': {
              'enable': true,
              'speed': 6,
              'direction': 'none',
              'random': false,
              'straight': false,
              'out_mode': 'out',
              'bounce': false,
              'attract': {
                'enable': false,
                'rotateX': 600,
                'rotateY': 1200
              }
            }
          },
          'interactivity': {
            'detect_on': 'canvas',
            'events': {
              'onhover': {
                'enable': true,
                'mode': 'repulse'
              },
              'onclick': {
                'enable': true,
                'mode': 'push'
              },
              'resize': true
            },
            'modes': {
              'grab': {
                'distance': 400,
                'line_linked': {
                  'opacity': 1
                }
              },
              'bubble': {
                'distance': 400,
                'size': 40,
                'duration': 2,
                'opacity': 8,
                'speed': 3
              },
              'repulse': {
                'distance': 200,
                'duration': 0.4
              },
              'push': {
                'particles_nb': 4
              },
              'remove': {
                'particles_nb': 2
              }
            }
          },
          'retina_detect': true
        },
        function () {
          console.log('callback - particles.js config loaded')
        }
      )
    }
  }
}
</script>
<style lang="less" >
/* For demo */
.ant-carousel{
  width: 667px;
}
.ant-carousel /deep/ .slick-slide {
  text-align: center;
  height: 500px;
  line-height: 500px;
  background: #364d79;
  overflow: hidden;
}
.login1 /deep/ .ant-form-item-control /deep/ .ant-input{
  border: none;
  border-bottom:1px solid #1690ff;
  border-radius: 0;
}
.ant-carousel /deep/ .slick-slide h3 {
  color: #fff;
}
.v-bg {
  height: 100%;
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background: #eee;
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
  background-image: url("");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
} /* ---- stats.js ---- */
</style>
