<template>
  <v-card>
    <a-alert message="图标组件" description="用于菜单管理等需要使用图标的场景" type="info" showIcon></a-alert>
    <a-divider>默认（根据所选属性自动复制到剪贴板）</a-divider>
    <v-iconbox></v-iconbox>
    <a-divider>获取选择的值</a-divider>
    {{icon}}
    <v-iconbox v-model="icon"></v-iconbox>
    <a-divider>指定选择类型</a-divider>
    <v-iconbox v-model="icon" selectType="name"></v-iconbox>

    <a-divider>自定义输入框</a-divider>
    <v-iconbox v-model="icon" selectType="name">
      <a-button>选择的内容是{{icon}}</a-button>
    </v-iconbox>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      icon: ''
    }
  }
}
</script>

<style>
</style>
