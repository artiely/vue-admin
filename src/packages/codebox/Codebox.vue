<template>
  <div class="code-box select-none">
    <div class="item" :class="item==value.length+1 && autofocus?'active':''" v-for="(item,i) in Number(maxlength)" :key="item">
      <span v-if="mask"><v-icon name="icon-dian" v-if="item<=value.length"></v-icon></span>
      <span v-else>{{value[i]}}</span>
      </div>
     <input
          ref="input"
          class="input"
          type="password"
          :maxlength="maxlength"
          v-model="temValue"
          @input="input"
          @click="focus"
         :autofocus="autofocus"
         v-on-clickaway="focus"
        />
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  name: 'v-codebox',
  mixins: [ clickaway ],
  props: {
    value: String,
    mask: Boolean,
    maxlength: {
      type: [Number, String],
      default: 4
    }
  },
  data () {
    return {
      autofocus: true,
      temValue: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.input.focus()
    })
  },
  methods: {
    input () {
      this.$emit('input', this.temValue)
    },
    focus () {
      this.$refs.input && this.$refs.input.focus()
    }
  }
}
</script>

<style lang="less" scoped>
.code-box{
  display: flex;
  height: 50px;
  line-height: 50px;
  text-align: center;
  justify-content: center;
  position: relative;
  .item{
    max-width: 50px;
    flex: 1;
    font-size: 18px;
    text-align: center;
    border: 1px solid #ddd;
    margin-left:-1px;
    position: relative;
    &.active{
      &::after{
        content: '';
        position: absolute;
        top: 10px;
        display: inline-block;
        width: 1px;
        height: 30px;
        animation: blink 1s infinite steps(1, start);
      }
    }
  }
  .input{
    width: 100%;
    text-indent: -9999999px;
    opacity: 0;
    position: absolute;
    top: 0;right: 0;
    bottom: 0;
    left: 0;
  }
}
@keyframes blink {
  0% {
    background-color: white;
  }
  50% {
    background-color: #999;
  }
  100% {
    background-color: white;
  }
}
</style>
