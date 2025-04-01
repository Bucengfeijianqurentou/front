<template>
  <div :class="['question-card', { 'is-related': isRelated }]" @click="$emit('click')">
    <div class="question-content">
      <i class="el-icon-chat-dot-round" v-if="!isRelated"></i>
      <i class="el-icon-connection" v-else></i>
      {{ question }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    question: {
      type: String,
      required: true
    },
    isRelated: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.question-card {
  padding: 12px 16px;
  background-color: rgba(45, 90, 240, 0.1);
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(45, 90, 240, 0.2);
    transform: translateY(-1px);
  }
  
  &.is-related {
    background-color: rgba(64, 201, 198, 0.1);
    
    &:hover {
      background-color: rgba(64, 201, 198, 0.2);
    }
    
    .question-content {
      color: #40c9c6;
    }
  }
  
  .question-content {
    display: flex;
    align-items: center;
    color: #2D5AF0;
    font-size: 14px;
    line-height: 1.4;
    
    i {
      margin-right: 8px;
      font-size: 16px;
    }
  }
}
</style> 