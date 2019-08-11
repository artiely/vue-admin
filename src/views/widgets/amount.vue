<template>
  <div>
    <v-card>
    <v-amount
      :value="1234"
      is-capital
    ></v-amount>
    <v-amount
      :value="1234"
      has-separator
    ></v-amount>
    <v-amount :value="1234.125" :precision="3"></v-amount>
     <p>
      <span class="describe">Round</span>
      <v-amount :value="1234.125"></v-amount>
    </p>
    <p>
      <span class="describe">Floor</span>
      <v-amount :value="1234.123" :is-round-up="false"></v-amount>
      <br>

       <v-amount
      :value="value"
      :duration="800"
      transition
    ></v-amount>
    <a-button @click="value=value+100">数字改变动画</a-button>
    </p>
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
