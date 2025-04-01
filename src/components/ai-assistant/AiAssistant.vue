<template>
  <div class="ai-assistant" v-if="isLoggedIn">
    <!-- 悬浮图标 -->
    <div class="ai-icon" v-if="!isExpanded" @click="expandChat">
      <img src="@/assets/logo.svg" alt="AI助手">
      <span class="pulse"></span>
    </div>
    
    <!-- 聊天窗口 -->
    <div class="chat-window" v-else>
      <!-- 标题栏 -->
      <div class="chat-header">
        <div class="title">
          <img src="@/assets/logo.svg" alt="AI助手" class="header-icon">
          <span>区块链资产管理助手</span>
        </div>
        <div class="actions">
          <i class="el-icon-minus" @click="minimizeChat"></i>
          <i class="el-icon-close" @click="closeChat"></i>
        </div>
      </div>
      
      <!-- 消息区域 -->
      <div class="chat-messages" ref="messageContainer">
        <div v-for="(message, index) in messages" :key="index">
          <message-bubble
            :content="message.content"
            :type="message.type"
            @complete="onMessageComplete(index)"
          />
        </div>
        
        <!-- 预设问题 -->
        <div class="preset-questions" v-if="showPresetQuestions">
          <question-card
            v-for="question in presetQuestions"
            :key="question.id"
            :question="question.question"
            @click="handleQuestionClick(question)"
          />
        </div>
        
        <!-- 关联问题 -->
        <div class="related-questions" v-if="currentRelatedQuestions.length > 0">
          <div class="related-title">相关问题：</div>
          <question-card
            v-for="question in currentRelatedQuestions"
            :key="question.id"
            :question="question.question"
            :is-related="true"
            @click="handleQuestionClick(getQuestionById(question.id))"
          />
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="chat-input">
        <el-input
          v-model="userInput"
          placeholder="输入您的问题..."
          :disabled="isTyping"
          @keyup.enter.native="sendMessage"
        >
          <el-button slot="append" @click="sendMessage" :disabled="isTyping">
            发送
          </el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import MessageBubble from './MessageBubble.vue'
import QuestionCard from './QuestionCard.vue'
import { welcomeMessage, presetQuestions, getQuestionById, getRelatedQuestions } from './aiData'

export default {
  name: 'AiAssistant',
  components: {
    MessageBubble,
    QuestionCard
  },
  data() {
    return {
      isExpanded: false,
      messages: [],
      userInput: '',
      isTyping: false,
      showPresetQuestions: true,
      currentRelatedQuestions: [],
      presetQuestions
    }
  },
  computed: {
    isLoggedIn() {
      return this.$storage.get('Token')
    }
  },
  mounted() {
    this.messages.push(welcomeMessage)
  },
  methods: {
    expandChat() {
      this.isExpanded = true
    },
    minimizeChat() {
      this.isExpanded = false
    },
    closeChat() {
      this.isExpanded = false
      this.messages = [welcomeMessage]
      this.showPresetQuestions = true
      this.currentRelatedQuestions = []
    },
    async sendMessage() {
      if (!this.userInput.trim() || this.isTyping) return
      
      // 添加用户消息
      this.messages.push({
        content: this.userInput,
        type: 'user'
      })
      
      this.userInput = ''
      this.showPresetQuestions = false
      this.scrollToBottom()
      
      // 模拟思考时间
      await this.simulateThinking()
      
      // 添加默认回复
      this.messages.push({
        content: '抱歉，我目前只能回答预设的问题。请从下面的问题中选择：',
        type: 'assistant'
      })
      
      this.showPresetQuestions = true
      this.scrollToBottom()
    },
    handleQuestionClick(question) {
      if (this.isTyping) return
      
      this.messages.push({
        content: question.question,
        type: 'user'
      })
      
      this.showPresetQuestions = false
      this.currentRelatedQuestions = []
      this.scrollToBottom()
      
      setTimeout(() => {
        this.messages.push({
          content: question.answer,
          type: 'assistant'
        })
        this.scrollToBottom()
      }, 500)
    },
    onMessageComplete(index) {
      if (this.messages[index].type === 'assistant') {
        const lastUserMessage = this.messages
          .slice(0, index)
          .reverse()
          .find(m => m.type === 'user')
        
        if (lastUserMessage) {
          const question = this.presetQuestions.find(q => q.question === lastUserMessage.content)
          if (question) {
            this.currentRelatedQuestions = getRelatedQuestions(question.id)
            this.scrollToBottom()
          }
        }
        
        this.isTyping = false
      }
    },
    async simulateThinking() {
      this.isTyping = true
      await new Promise(resolve => setTimeout(resolve, 1000))
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ai-assistant {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1000;
  
  .ai-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: transform 0.3s ease;
    position: relative;
    
    &:hover {
      transform: scale(1.1);
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .pulse {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 12px;
      height: 12px;
      background-color: #40c9c6;
      border-radius: 50%;
      
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius: 50%;
        animation: pulse 1.5s infinite;
      }
    }
  }
  
  .chat-window {
    position: fixed;
    left: 20px;
    bottom: 20px;
    width: 400px;
    height: 600px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .chat-header {
      padding: 16px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .title {
        display: flex;
        align-items: center;
        
        .header-icon {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
        
        span {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }
      }
      
      .actions {
        display: flex;
        gap: 16px;
        
        i {
          cursor: pointer;
          color: #999;
          font-size: 18px;
          
          &:hover {
            color: #666;
          }
        }
      }
    }
    
    .chat-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      
      &::-webkit-scrollbar {
        width: 6px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
      }
    }
    
    .chat-input {
      padding: 16px;
      background-color: #fff;
      border-top: 1px solid #eee;
    }
    
    .preset-questions {
      margin-top: 16px;
    }
    
    .related-questions {
      margin-top: 16px;
      
      .related-title {
        font-size: 14px;
        color: #999;
        margin-bottom: 8px;
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  70% {
    transform: scale(2);
    opacity: 0;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .ai-assistant {
    .chat-window {
      width: calc(100vw - 40px);
      height: calc(100vh - 100px);
      left: 20px;
      bottom: 80px;
    }
  }
}
</style> 