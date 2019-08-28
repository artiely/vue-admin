<template>
  <!-- v-draggable="draggableValue" -->
  <div class="artiely-chat" v-if="value" v-drag="{trigger:'.chat-top',body:'.artiely-chat'}">
    <!-- 头部可拖拽 -->
    <div class="chat-top">
      <div class="top-l">
        <v-avatar-group :avatarList="list1" :maxlength="3" :size="20" style="margin-top:10px"></v-avatar-group>
        <span>排队中...</span>
      </div>
      <div class="top-m">谭杰</div>
      <div class="top-r">
        快捷回复
        <v-icon name="icon-smallscreen" @click.native="close"></v-icon>
      </div>
    </div>
    <!-- 主容器 -->
    <div class="chat-container">
      <!-- 客户列表 -->
      <div class="chat-custom-wrapper">
        <div class="custom-wrapper">
          <div class="custom-list" v-for="item in list2" :key="item.id">
            <a-avatar
              slot="avatar"
              :style="{background:item.color}"
            >{{item.name.split('')[0]}}</a-avatar>
            <div class="userinfo">
              <h1 class="name">{{item.name}}</h1>
              <h1 class="tel number">{{item.tel|telFormat()}}</h1>
            </div>
            <a-badge :count="item.count" class="message-count" />
          </div>
        </div>
      </div>
      <!-- 聊天面板 -->
      <div class="chat-content-wrapper">
        <div class="chat-list">
          <div class="chat-body">
            <div class="left">
              <div class="avatar">
                <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </div>
              <div class="message-box">
                <div class="message">你们这是什么服务态度啊！！！你们这是什么服务态度啊！！！你们这是什么服务态度啊！！！你们这是什么服务态度啊！！！</div>
              </div>
            </div>
            <div class="left">
              <div class="avatar">
                <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </div>
              <div class="message-box">
                <div class="message">你们这是什么服务态度啊！！！</div>
              </div>
            </div>
            <div class="right">
              <div class="message-box">
                <div class="message">亲~，您听我解释...</div>
              </div>
              <div class="avatar">
                <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <div class="input-action">
            <v-icon name="icon-picture"></v-icon>
            <v-emoji-picker @emoji="handleEmoji"><v-icon name="icon-emoji"></v-icon></v-emoji-picker>
          </div>
          <!-- 输入 -->
          <a-textarea
            placeholder="客户就是衣食父母~！"
            class="input-field"
            :autosize="{ minRows: 2, maxRows: 2 }"
            v-model="messageInfo"
          />
          <div class="send">
            <v-icon name="icon-fasong"></v-icon>
          </div>
        </div>
      </div>
      <!-- 快速回复 -->
      <div class="message-list">
        <ul>
          <li class="message-item" v-for="i in list" :key="i">{{i}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const list = [
  'Hello，周末愉快！很高兴为你效劳',
  '您好，欢迎光临本小店，请问您观看中哪些宝贝？我可以帮你介绍一下',
  '您好，欢迎光临足康乐旗舰店，很高兴为您服务,请问有什么可以帮助您！',
  '您好！请问有什么可以为您效劳吗？',
  '您好！欢迎光临足康乐旗舰店，请问可以帮助到您吗？',
  '您好！欢迎光临足康乐旗舰店，很高兴为您效劳！',
  '好吧，如果您相信我的个人意见，我给您推荐几款，存属个人意见哈，呵呵……',
  '我们的价格是最优惠的了',
  '你还有什么不了解或者不明白的地方吗？ ',
  '忘了告诉你，我这几天正好在促销，优惠很大的'
]
export default {
  name: 'v-chat',
  props: {
    value: Boolean
  },
  data () {
    return {
      list,
      messageInfo: '',
      list2: [],
      list1: [
        {
          url:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          label: '头像提示1'
        },
        {
          url:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          label: '头像提示2'
        },
        {
          url:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          label: '头像提示3'
        },
        {
          url:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          label: '头像提示4'
        },
        {
          url:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          label: '头像提示5'
        },
        {
          url:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          label: '头像提示6'
        }
      ],
      draggableValue: {
        handle: null
      }
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    },
    handleEmoji (emoji) {
      this.messageInfo += emoji
    },
    getData () {
      this.$api.USER_LIST().then(res => {
        this.list2 = res.list
      })
    }
  },
  mounted () {
    this.getData()
    this.draggableValue.handle = this.$refs.handle
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/var.less';
.artiely-chat {
  height: 500px;
  width: 800px;
  position: fixed;
  right: 0;
  z-index: 999;
  bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 22px rgba(0, 0, 0, 0.1);
  display: flex;
  background: fade(@background-color-base, 90%);
  flex-direction: column;
  overflow: hidden;
  .chat-top {
    height: 50px;
    padding-top: 10px;
    padding-left: 10px;
    display: flex;
    .top-l {
      width: 180px;
      display: flex;
      line-height: 40px;
    }
    .top-m {
      flex: 1;
      font-size: 18px;
      color: @text-color;
      line-height: 40px;
    }
    .top-r {
      width: 180px;
      text-align: center;
      line-height: 40px;
    }
    .icon-smallscreen {
      position: absolute;
      top: -10px;
      right: 0;
      font-size: 24px;
      cursor: pointer;
    }
  }
  .chat-container {
    display: flex;
    height: 450px;
    flex: 1;
  }
  .input-action {
    display: flex;
    padding-left: 10px;
    .iconfont {
      font-size: 24px;
      margin: 0 3px;
    }
  }
  .custom-list {
    display: flex;
    border-top: 1px solid @background-color-base;
    padding: 10px 0;
    .userinfo {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding-left: 5px;
      .name {
        font-size: 14px;
        color: @text-color-secondary;
        margin: 0;
      }
      .tel {
        font-size: 10px;
        color: #999;
      }
    }
    .message-count {
      transform: scale(0.8);
    }
  }
  .chat-custom-wrapper {
    display: flex;
    width: 180px;
    padding-left: 10px;
    flex-direction: column;
    .custom-action {
      height: 50px;
    }
  }
  .custom-wrapper {
    flex: 1;
    overflow-y: scroll;
  }
  .chat-content-wrapper {
    flex: 2;
    background: rgba(@layout-body-background, 0.9);
    display: flex;
    flex-direction: column;
    .chat-list {
      flex: 3;
      display: flex;
      flex-direction: column;
      .chat-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        .avatar {
          width: 40px;
        }
        .left {
          display: flex;
          padding-left: 5px;
          padding-right: 20px;
          padding-top: 40px;
          justify-content: flex-start;
          .message-box {
            flex: 1;
            display: flex;
            justify-content: flex-start;
          }
          .message {
            margin-left: 10px;
            background: rgba(#1690ff, 0.5);
            color: #fff;
            padding: 6px;
            border-radius: 4px;
            position: relative;
          }
        }
        .right {
          display: flex;
          padding-left: 20px;
          padding-right: 5px;
          padding-top: 40px;
          justify-content: flex-end;
          .message-box {
            flex: 1;
            display: flex;
            justify-content: flex-end;
          }
          .message {
            margin-right: 10px;
            background: rgba(#bbb);
            color: #fff;
            padding: 6px;
            border-radius: 4px;
            position: relative;
          }
        }
      }
    }
    .chat-input {
      flex: 1;
      background: @layout-body-background;
      display: flex;
      flex-direction: column;
      .input-field {
        flex: 1;
        border: none;
        outline: none;
        box-shadow: none;
        overflow-y: scroll;
      }
      .send {
        text-align: right;
        padding-right: 20px;
        .iconfont {
          font-size: 24px;
          cursor: pointer;
        }
      }
    }
  }
  .message-list {
    width: 180px;
    overflow-y: scroll;
    .message-item {
      background: @body-background;
      cursor: pointer;
      padding: 3px 8px;
      border-radius: 4px;
      margin: 5px 10px;
      &:hover {
        background: darken(@body-background,10%);
      }
    }
  }
}
</style>
