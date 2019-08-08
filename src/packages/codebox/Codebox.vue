<template>
  <div class="code-box select-none">
    <div class="item" v-for="(item,i) in maxlength" :key="item">{{code[i]}}</div>
     <input
          ref="input"
          class="input"
          type="password"
          :maxlength="maxlength"
          v-model="code"
         :autofocus="true"
        />
  </div>
</template>

<script>
export default {
  name: "v-codebox",
  props: {
    values: String,
    maxlength:{
      type:Number,
      default:4
    }
  },
  data(){
    return {
      code:''
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.$refs.input.blur()
    })
  },
  methods:{
    blur(){
      this.$refs.input.blur()
    },
  }
};
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
  }
  .input{
    width: 100%;
    text-indent: 9999999px;
    opacity: 0;
    position: absolute;
    top: 0;right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
