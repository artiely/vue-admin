<template>
  <div>
    <v-card style="height:100vh">
      <a-alert message="为了拖拽流畅请在定位组件上包裹原生DOM，避免定位冲突" banner />
      <div style="height:40px">
        <a-button v-draggable="draggableValue">antd button (卡顿)</a-button>
      </div>
      <div v-drag="options" class="draggable-btn">
        <a-button>我是自定义指令拖拽 (不脱离文档流)</a-button>
      </div>

      <div v-draggable>
        <a-button>我是包裹了div(脱离了文档流)</a-button>
      </div>

      <a-button v-clipboard="{value:'我是复制的内容',success,error}">点我复制内容</a-button>

      <p>关键词高亮</p>
      <a-input v-model="keyword" placeholder="请输入关键词"></a-input>
      <div v-highlight="{value:tel,keyword:keyword,color:'#f86c6b'}"></div>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tel:
        ' 159 2629 0460 J ava是一门面向对象编程语言，不仅吸收了C++语言的各种优点，还摒弃了C++里难以理解的多继承、指针等概念，因此Java语言具有功能强大和简单易用两个特征。Java语言作为静态面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程',
      keyword: '',
      options: {
        trigger: '.draggable-btn',
        body: '.draggable-btn'
      },
      draggableValue: {
        onPositionChange: this.onPosChanged
      }
    }
  },
  methods: {
    onPosChanged: function (positionDiff, absolutePosition, event) {},
    success () {
      this.$message.info('已复制到粘贴板')
    },
    error () {
      this.$message.error('搞错了，再来')
    }

  }
}
</script>

<style>
</style>
