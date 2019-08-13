<template>
  <div class="artiely-chat" v-if="value">
    <div class="chat-custom-wrapper">
      <a-list itemLayout="horizontal" :dataSource="data" size="small">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta
            :description="'15926290460'|telFormat()"
          >
            <a slot="title">{{item.title}}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <div class="chat-content-wrapper">
      <div class="chat-list"></div>
      <div class="chat-input">
        <a-divider></a-divider>
        <a-textarea placeholder="Autosize height with minimum and maximum number of lines" :autosize="{ minRows: 2, maxRows: 6 }" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-chat",
  props: {
    value: Boolean
  },
  data() {
    return {
      data: [
        {
          title: "用户1"
        },
        {
          title: "用户2"
        },
        {
          title: "用户3"
        },
        {
          title: "用户4"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.artiely-chat {
  height: 500px;
  width: 600px;
  position: fixed;
  right: 0;
  z-index: 999;
  bottom: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 22px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
  .chat-custom-wrapper {
    flex: 1;
    padding-left: 10px;
    background: #fff;
  }
  .chat-content-wrapper {
    flex: 2;
    background: #eee;
    display: flex;
    flex-direction: column;
    .chat-list{
      flex: 3
    }
    .chat-input{
      flex: 1;
      background: #fff;
    }
  }
}
</style>
