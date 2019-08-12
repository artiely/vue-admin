<template>
  <div>
    <v-card>
      <a-alert message="金额组件"
      description="用于发票等使用金额场景"
      type="info"
      showIcon>  </a-alert>
       <divider>转大写</divider>
    <v-amount
      :value="1234"
      is-capital
    ></v-amount>
    <divider>千分符</divider>
    <v-amount
      :value="1234"
      separator=","
    ></v-amount>
   <divider>小数精度</divider>
    <v-amount :value="1234.125" :precision="3"></v-amount>
     <p>

      <divider>四舍五入</divider>
      <v-amount :value="1234.125"></v-amount>
    </p>
    <p>
       <divider>不四舍五入</divider>
      <v-amount :value="1234.123" :is-round-up="false"></v-amount>
      <br>
      <divider>动画</divider>
       <v-amount
      :value="value"
      :duration="800"
      transition
    ></v-amount>
    <a-button @click="value=value+100">数字改变动画</a-button>
    </p>
    <divider>货币符号</divider>
      <v-amount :value="1234.123" prefix="¥"></v-amount>
    <divider>货币符号大小</divider>
      <v-amount :value="1234.123" prefix="¥" :prefix-size="0.5"></v-amount>
       <divider>后缀</divider>
       <v-amount :value="1234.123" suffix="元" ></v-amount>
        <divider>后缀大小</divider>
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
