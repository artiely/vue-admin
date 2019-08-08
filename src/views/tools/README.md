


```html vue-run
<template>
  <a-button class="btn btn-blue" @click="test" type="primary">打开console，点击看看效果</a-button>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {
      test() {
        console.log('你点击了按钮');
      }
    }
  }
</script>
```