<template>
  <div :class="['message-bubble', type]">
    <div class="avatar" v-if="type === 'assistant'">
      <img src="@/assets/logo.svg" alt="AI助手">
    </div>
    <div class="content">
      <type-writer
        v-if="type === 'assistant'"
        :text="content"
        :speed="50"
        @complete="onTypingComplete"
        @typing-update="$emit('typing-update')"
      />
      <span v-else>{{ content }}</span>
    </div>
  </div>
</template>

<script>
import TypeWriter from './TypeWriter.vue'

export default {
  name: 'MessageBubble',
  components: {
    TypeWriter
  },
  props: {
    content: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'user',
      validator: value => ['user', 'assistant'].includes(value)
    },
    onComplete: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onTypingComplete() {
      this.$emit('complete')
      this.onComplete()
    }
  }
}
</script>

<style lang="scss" scoped>
.message-bubble {
  display: flex;
  margin: 12px 0;
  align-items: flex-start;
  
  &.user {
    flex-direction: row-reverse;
    
    .content {
      background-color: #2D5AF0;
      color: white;
      margin-left: 0;
      margin-right: 12px;
      border-radius: 16px 16px 0 16px;
    }
  }
  
  &.assistant {
    .content {
      background-color: #f5f5f5;
      color: #333;
      border-radius: 16px 16px 16px 0;
    }
  }
  
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .content {
    max-width: 80%;
    padding: 12px 16px;
    margin-left: 12px;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
</style> 