<template>
  <div class="ai-assistant" v-if="isLoggedIn">
    <!-- 悬浮图标和标签 -->
    <div class="ai-assistant-wrapper" v-if="!isExpanded">
      <div class="ai-label">
        <i class="el-icon-service"></i>
        <span>AI 助理</span>
      </div>
      <div class="ai-icon" @click="expandChat">
        <img src="@/assets/logo.svg" alt="AI助手">
        <div class="tooltip">点击咨询AI助手</div>
        <span class="pulse"></span>
      </div>
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
            @typing-update="scrollToBottom"
          />
        </div>
        
        <!-- 思考中状态 -->
        <div v-if="isThinking" class="thinking-status">
          <div class="thinking-bubble">
            <div class="thinking-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="thinking-text">思考中</div>
          </div>
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
            @click="handleQuestionClick(question)"
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
      isThinking: false,
      showPresetQuestions: true,
      currentRelatedQuestions: [],
      presetQuestions
    }
  },
  computed: {
    isLoggedIn() {
      const token = localStorage.getItem('Token') || sessionStorage.getItem('Token')
      console.log('AI助手检查登录状态:', token)
      return token
    }
  },
  mounted() {
    console.log('AI助手组件已挂载')
    console.log('登录状态:', this.isLoggedIn)
    if (this.isLoggedIn) {
      this.messages.push(welcomeMessage)
      console.log('欢迎消息已添加')
    }
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
      if (!this.userInput.trim() || this.isTyping || this.isThinking) return
      
      const userQuestion = this.userInput.trim()
      
      // 添加用户消息
      this.messages.push({
        content: userQuestion,
        type: 'user'
      })
      
      this.userInput = ''
      this.showPresetQuestions = false
      this.scrollToBottom()
      
      // 显示思考状态并等待
      this.isThinking = true
      await this.simulateThinking()
      this.isThinking = false
      
      // 尝试匹配预设问题
      const matchedQuestion = this.findMatchingQuestion(userQuestion)
      
      // 设置正在输入状态
      this.isTyping = true
      
      if (matchedQuestion) {
        // 如果找到匹配的预设问题，显示对应答案
        this.messages.push({
          content: matchedQuestion.answer,
          type: 'assistant'
        })
        this.scrollToBottom()
      } else {
        // 如果没有找到匹配的问题，显示默认回复
        this.messages.push({
          content: '抱歉，我目前只能回答预设的问题。请从下面的问题中选择：',
          type: 'assistant'
        })
        this.showPresetQuestions = true
        this.scrollToBottom()
      }
    },
    async handleQuestionClick(question) {
      if (this.isTyping || this.isThinking) return
      
      this.messages.push({
        content: question.question,
        type: 'user'
      })
      
      this.showPresetQuestions = false
      this.currentRelatedQuestions = []
      this.scrollToBottom()
      
      // 显示思考状态并等待
      this.isThinking = true
      await this.simulateThinking()
      this.isThinking = false
      
      // 设置正在输入状态
      this.isTyping = true
      
      // 添加消息，并在回答完成后显示相关问题
      this.messages.push({
        content: question.answer,
        type: 'assistant'
      })
      
      this.scrollToBottom()
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
            // 获取关联问题的完整信息
            this.currentRelatedQuestions = getRelatedQuestions(question.id)
              .map(relatedQ => getQuestionById(relatedQ.id))
              .filter(q => q) // 过滤掉可能的空值
          }
        }
        
        this.isTyping = false
        // 消息完成后滚动到底部
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }
    },
    async simulateThinking() {
      const thinkingTime = Math.random() * 1000 + 1000;
      await new Promise(resolve => setTimeout(resolve, thinkingTime));
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer
        if (container) {
          // 使用 requestAnimationFrame 确保在下一帧执行滚动
          requestAnimationFrame(() => {
            const scrollHeight = container.scrollHeight
            const clientHeight = container.clientHeight
            const maxScroll = scrollHeight - clientHeight
            const currentScroll = container.scrollTop
            
            // 如果已经接近底部，才进行滚动
            if (maxScroll - currentScroll < 150) {
              container.scrollTo({
                top: scrollHeight,
                behavior: 'auto' // 改为即时滚动，避免打字过程中的滚动动画
              })
            }
          })
        }
      })
    },
    // 添加模糊匹配方法
    findMatchingQuestion(userInput) {
      // 将用户输入转换为小写，并移除标点符号
      const normalizedInput = userInput.toLowerCase().replace(/[.,?!，。？！]/g, '')
      
      // 遍历预设问题，查找最佳匹配
      return this.presetQuestions.find(q => {
        const normalizedQuestion = q.question.toLowerCase().replace(/[.,?!，。？！]/g, '')
        // 检查用户输入是否包含问题关键词，或问题是否包含用户输入
        return normalizedQuestion.includes(normalizedInput) || 
               normalizedInput.includes(normalizedQuestion) ||
               // 特殊匹配："如何借用资产" 可以匹配 "借用资产"
               (normalizedQuestion.includes('借用') && normalizedInput.includes('借用')) ||
               (normalizedQuestion.includes('归还') && normalizedInput.includes('归还')) ||
               (normalizedQuestion.includes('区块链') && normalizedInput.includes('区块链'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ai-assistant {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
  
  .ai-assistant-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .ai-label {
      background: linear-gradient(135deg, #2D5AF0, #40c9c6);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 12px rgba(45, 90, 240, 0.25);
      transform: translateX(20px);
      opacity: 0;
      animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      cursor: pointer;
      transition: all 0.3s ease;
      
      i {
        font-size: 16px;
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(45, 90, 240, 0.35);
      }
    }
  }
  
  .ai-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2D5AF0, #40c9c6);
    box-shadow: 0 4px 12px rgba(45, 90, 240, 0.25);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 8px 16px rgba(45, 90, 240, 0.3);
      
      .tooltip {
        opacity: 0;
      }
    }
    
    &:active {
      transform: translateY(-2px) scale(0.98);
    }
    
    img {
      width: 32px;
      height: 32px;
      object-fit: cover;
      animation: float 3s ease-in-out infinite;
    }
    
    .tooltip {
      position: absolute;
      bottom: calc(100% + 12px);
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      white-space: nowrap;
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
      
      &:after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.8);
      }
    }
    
    .pulse {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 14px;
      height: 14px;
      background-color: #40c9c6;
      border-radius: 50%;
      border: 2px solid #fff;
      
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius: 50%;
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    }
  }
  
  .chat-window {
    position: fixed;
    right: 20px;
    bottom: 80px;
    width: 400px;
    height: 600px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 9999;
    
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
      scroll-behavior: smooth;
      display: flex;
      flex-direction: column;
      
      /* 确保新消息在可视区域底部 */
      > div:last-child {
        margin-bottom: 16px;
      }
      
      &::-webkit-scrollbar {
        width: 6px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
      }
      
      /* 增加底部间距，确保内容不被输入框遮挡 */
      padding-bottom: 120px;
    }
    
    .chat-input {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px;
      background-color: #fff;
      border-top: 1px solid #eee;
      z-index: 1;
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

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  70% {
    transform: scale(2.5);
    opacity: 0;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

.thinking-status {
  padding: 12px;
  
  .thinking-bubble {
    display: inline-flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 8px 16px;
    border-radius: 16px 16px 16px 0;
    max-width: 120px;
    
    .thinking-dots {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-right: 8px;
      
      span {
        width: 6px;
        height: 6px;
        background-color: #666;
        border-radius: 50%;
        display: inline-block;
        animation: thinking 1.4s infinite;
        
        &:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
    
    .thinking-text {
      font-size: 12px;
      color: #666;
    }
  }
}

@keyframes thinking {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .ai-assistant {
    .chat-window {
      width: calc(100vw - 40px);
      height: calc(100vh - 100px);
      right: 20px;
      bottom: 80px;
    }
  }
}
</style> 