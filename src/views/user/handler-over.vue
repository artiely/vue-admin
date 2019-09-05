<template>
  <div class="handler-over">

    <v-actionbar>
<a-button type="primary" size="large">交班</a-button>
<div slot="right">
  <a-button type="primary" size="large">交班</a-button>
</div>
    </v-actionbar>
    <div style="height:20px"></div>

    <a-row>
      <a-col :xs="24" :sm="24" :md="12">
        <a-card title="今日交班数据" hoverable :bordered="false">
           <h1>{{7300|currency()}} <span class="helper-text">总收银额</span></h1>
           <a-divider>概览</a-divider>
          <a-list itemLayout="vertical" size="small" :dataSource="data">
            <a-list-item class="list-item" slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="item.title">
                <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
                <div slot="avatar">
                  <v-icon :name="item.icon"></v-icon>
                </div>
              </a-list-item-meta>
              <div slot="extra">123</div>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
    <div style="height:500px"></div>
  </div>
</template>
<script>
const data = [
  {
    title: '今日开单量',
    icon: 'icon-commodity'
  },
  {
    title: '今日收银额',
    icon: 'icon-transaction_fill'
  },
  {
    title: '今日完工量',
    icon: 'icon-task'
  },
  {
    title: '今日待办事项',
    icon: 'icon-shielding'
  }
]
export default {
  data () {
    return {
      data: Object.freeze(data)
    }
  }

}
</script>
<style lang="less" scoped>
.helper-text{
  font-size: 14px;
  color: #666;
}
.handler-over {
  .ant-list-item-meta-avatar {
    .iconfont {
      font-size: 30px;
      color: #1690ff;
    }
  }

  .list-item {
    &:hover {
      // background: repeating-linear-gradient(
      //   45deg,
      //   #fff 0%,
      //   #fff 5%,
      //   #f0f0f0 5%,
      //   #f0f0f0 10%
      // );
    }
  }
}
</style>
