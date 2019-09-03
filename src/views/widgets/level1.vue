<template>
  <div>
    <v-home>
      <v-card>我是一级可点击菜单
        <!-- <h1 >{{a.b.c}}</h1> -->
      </v-card>
    </v-home>
  </div>
</template>

<script>
import { Home as VHome } from '@layouts'
export default {
  components: {
    VHome
  },
  data () {
    return {
      a: {
        b: {
          c: false
        }
      }
    }
  },
  computed: {
    // s () {
    //   return this.a?.b?.c ?? true
    // },
    // e () {
    //   return this.a?.b?.d ?? true
    // },
    // f () {
    //   return this.a?.b?.d?.m ?? false
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
