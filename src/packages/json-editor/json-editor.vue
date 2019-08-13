<template>
  <div>
    <div class="jsoneditor-vue"></div>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor'

export default {
  name: 'v-json-editor',
  props: {
    value: [String, Number, Object, Array]
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        if (!this.internalChange) {
          this.setEditor(val)
        }
      },
      deep: true
    }
  },
  data () {
    return {
      editor: null,
      error: false,
      json: this.value,
      internalChange: false
    }
  },
  mounted () {
    let self = this
    let options = {
      mode: 'code',
      mainMenuBar: false,
      onChange () {
        try {
          let json = self.editor.get()
          self.json = json
          self.$emit('json-change', json)
          self.internalChange = true
          self.$emit('input', json)
          self.$nextTick(function () {
            self.internalChange = false
          })
        } catch (e) {
          self.$emit('has-error', e)
        }
      }
    }
    this.editor = new JSONEditor(this.$el.querySelector('.jsoneditor-vue'), options, this.json)
  },
  methods: {
    onSave () {
      this.$emit('json-save', this.json)
    },
    setEditor (value) {
      if (this.editor) { this.editor.set(value) }
    }
  },
  destroyed () {
    this.editor.destroy()
  }
}
</script>

<style scoped>
@import '~/jsoneditor/dist/jsoneditor.css';
</style>
