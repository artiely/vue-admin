<template>
  <div>
    <a-popover  trigger="click" :getPopupContainer="(trigger)=>trigger.parentNode">
      <template slot="content">
          <div class="emoji-content">
        <div v-for="(emojiGroup, category) in emojis" :key="category">
          <h5>{{ category }}</h5>
          <div>
            <span
              v-for="(emoji, emojiName) in emojiGroup"
              :key="emojiName"
              @click="insert(emoji)"
              :title="emojiName"
            >{{ emoji }}</span>
          </div>
          </div>
        </div>
      </template>
      <span>
        <slot>
          <v-icon name="icon-emoji"></v-icon>
        </slot>
      </span>
    </a-popover>
  </div>
</template>

<script>
import emojis from './emojis'
export default {
  name: 'v-emoji-picker',
  data () {
    return {
      emojis: Object.freeze(emojis)
    }
  },
  methods: {
    insert (emoji) {
      this.$emit('emoji', emoji)
    }
  }
}
</script>

<style lang="less" scoped>
.emoji-content{
    width: 400px;
    height: 200px;
    overflow-y: scroll;
}
</style>
