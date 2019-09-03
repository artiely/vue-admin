<template>
  <div class="licence-plate">
    <a-input-group compact>
      <a-popover trigger="hover" :visible="hovered" @visibleChange="handleHoverChange">
        <template slot="content">
          <span
            class="licence-plate-city"
            :class="province==item?'active':''"
            v-for="item in keys"
            @click="handleItem(item)"
            :key="item"
          >{{item}}</span>
          <div>
            <span
              class="licence-plate-city"
              :class="city==item?'active':''"
              v-for="item in list"
              @click="handleCity(item)"
              :key="item"
            >{{item}}</span>
          </div>
        </template>
        <a-input style="width: 60px" v-model="preLicence" />
      </a-popover>
      <the-mask
        class="ant-input"
        ref="endLicence"
        mask="FFFFFF"
        style="width: 30%"
        :tokens="hexTokens"
        v-model="endLicence"
      ></the-mask>
    </a-input-group>
  </div>
</template>

<script>
let data = {
  冀: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'R', 'T'],
  豫: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'U'
  ],
  鄂: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S'
  ],
  桂: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'R'
  ],
  黑: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'R'
  ],
  湘: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'U',
    'S'
  ],
  皖: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'R',
    'S'
  ],
  云: [
    'A',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S'
  ],
  新: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R'
  ],
  陕: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'V'],
  蒙: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
  赣: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
  辽: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P'],
  苏: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'U'],
  甘: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P'],
  晋: ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'L', 'M'],
  浙: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L'],
  闽: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']
}
let keys = Object.keys(data)
let defaultprovince = '鄂'
let defaultcity = 'A'
let defaultList = data[defaultprovince]

export default {
  name: 'v-licence-plate',
  data () {
    return {
      data: Object.freeze(data),
      keys: Object.freeze(keys),
      province: defaultprovince,
      city: defaultcity,
      list: defaultList,
      hovered: false,
      endLicence: '',
      hexTokens: {
        F: {
          pattern: /[0-9a-zA-Z]/,
          transform: v => v.toLocaleUpperCase()
        }
      }
    }
  },
  computed: {
    preLicence () {
      return this.province + this.city
    }
  },
  methods: {
    handleItem (item) {
      this.province = item
      this.list = this.data[item]
    },
    handleHoverChange (visible) {
      this.clicked = false
      this.hovered = visible
    },
    handleCity (city) {
      this.hovered = false
      this.city = city
    //   this.$refs.endLicence.focus();
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/var.less";
.licence-plate {
  max-width: 500px;
}
.licence-plate-city {
  display: inline-block;
  padding: 10px;
  font-size: 30px;
  cursor: pointer;
  &.active {
    color: @primary-color;
  }
}
</style>
