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
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
    onPosChanged: function (positionDiff, absolutePosition, event) {}
  }
}
</script>

<style>
</style>
