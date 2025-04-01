import AiAssistant from '@/components/ai-assistant/AiAssistant.vue'

export default {
  name: 'App',
  components: {
    AiAssistant
  },
}

<template>
  <div id="app">
    <router-view></router-view>
    <ai-assistant />
  </div>
</template> 