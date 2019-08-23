<template>
  <div>
    <v-card>
      <a-alert message="金额组件"
      description="用于发票等使用金额场景"
      type="info"
      showIcon>  </a-alert>
       <a-divider>转大写</a-divider>
    <v-amount
      :value="1234"
      is-capital
    ></v-amount>
    <a-divider>千分符</a-divider>
    <v-amount
      :value="1234"
      separator=","
    ></v-amount>
   <a-divider>小数精度</a-divider>
    <v-amount :value="1234.125" :precision="3"></v-amount>
     <p>

      <a-divider>四舍五入</a-divider>
      <v-amount :value="1234.125"></v-amount>
    </p>
    <p>
       <a-divider>不四舍五入</a-divider>
      <v-amount :value="1234.123" :is-round-up="false"></v-amount>
      <br>
      <a-divider>动画</a-divider>
       <v-amount
      :value="value"
      :duration="800"
      transition
    ></v-amount>
    <a-button @click="value=value+100">数字改变动画</a-button>
    </p>
    <a-divider>货币符号</a-divider>
      <v-amount :value="1234.123" prefix="¥"></v-amount>
    <a-divider>货币符号大小</a-divider>
      <v-amount :value="1234.123" prefix="¥" :prefix-size="0.5"></v-amount>
       <a-divider>后缀</a-divider>
       <v-amount :value="1234.123" suffix="元" ></v-amount>
        <a-divider>后缀大小</a-divider>
       <v-amount :value="1234.123" suffix="元" :suffix-size="0.7"></v-amount>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 1000
    }
  }
}
</script>

<style>

</style>
