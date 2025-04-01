<template>
  <span>{{ displayText }}</span>
</template>

<script>
export default {
  name: 'TypeWriter',
  props: {
    text: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 50
    },
    onComplete: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      displayText: '',
      currentIndex: 0
    }
  },
  watch: {
    text: {
      handler(newText) {
        this.resetAndStart(newText)
      },
      immediate: true
    }
  },
  methods: {
    resetAndStart(text) {
      this.displayText = ''
      this.currentIndex = 0
      this.typeText(text)
    },
    typeText(text) {
      if (this.currentIndex < text.length) {
        this.displayText += text[this.currentIndex]
        this.currentIndex++
        this.$emit('typing-update')
        setTimeout(() => {
          this.typeText(text)
        }, this.speed)
      } else {
        this.$emit('complete')
        this.onComplete()
      }
    }
  }
}
</script> 