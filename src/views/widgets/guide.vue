<template>
  <div>
    <v-card>
      <a-button @click="guide" type="primary">点我开启向导</a-button>
      <a-divider></a-divider>
      <a-alert
        id="id1"
        message="Error"
        description="This is an error message about copywriting."
        type="error"
        showIcon
      />
      <a-divider></a-divider>
      <a-list itemLayout="horizontal" :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item" id="id2">
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <a-divider></a-divider>
      <a-comment id="id3">
        <template slot="actions">
          <span>
            <a-tooltip title="Like">
              <a-icon
                type="like"
                :theme="action === 'liked' ? 'filled' : 'outlined'"
                @click="like"
              />
            </a-tooltip>
            <span style="padding-left: '8px';cursor: 'auto'">{{likes}}</span>
          </span>
          <span>
            <a-tooltip title="Dislike">
              <a-icon
                type="dislike"
                :theme="action === 'disliked' ? 'filled' : 'outlined'"
                @click="dislike"
              />
            </a-tooltip>
            <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
          </span>
          <span>Reply to</span>
        </template>
        <a slot="author">Han Solo</a>
        <a-avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
          slot="avatar"
        />
        <p
          slot="content"
        >We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
        <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{moment().fromNow()}}</span>
        </a-tooltip>
      </a-comment>
    </v-card>
    <v-guide :steps="steps" ref="guide"></v-guide>
  </div>
</template>

<script>
import moment from 'moment'
const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]
const steps = [
  {
    element: '#id1',
    popover: {
      className: 'first-step-popover-class',
      title: '提示说明模块',
      description: '当某个页面需要向用户显示警告的信息时。',
      position: 'bottom'
    }
  },
  {
    element: '#id2',
    popover: {
      title: '通用列表。',
      description:
        '最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。',
      position: 'top'
    }
  },
  {
    element: '#id3',
    popover: {
      title: '评论组件',
      description: '评论组件可用于对事物的讨论，例如页面、博客文章、问题等等。',
      position: 'top'
    }
  }
]
export default {
  data () {
    return {
      data,
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
      steps: Object.freeze(steps)
    }
  },
  methods: {
    like () {
      this.likes = 1
      this.dislikes = 0
      this.action = 'liked'
    },
    dislike () {
      this.likes = 0
      this.dislikes = 1
      this.action = 'disliked'
    },
    guide () {
      this.$refs.guide && this.$refs.guide.start()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
