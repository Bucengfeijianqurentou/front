<template>
  <div class="notification-badge">
    <slot></slot>
    <el-badge v-if="count > 0" :value="count" :max="99" class="badge"></el-badge>
  </div>
</template>

<script>
import notificationService from '@/utils/notification'
import http from '@/utils/http'

export default {
  name: 'NotificationBadge',
  props: {
    type: {
      type: String,
      default: 'register-approval'
    }
  },
  data() {
    return {
      count: 0,
      timer: null
    }
  },
  created() {
    console.log('NotificationBadge created for type:', this.type)
    this.fetchCount()
    // 设置定时器，每分钟检查一次通知
    this.timer = setInterval(() => {
      this.fetchCount()
    }, 60000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    fetchCount() {
      console.log('Fetching notification count for type:', this.type)
      if (this.type === 'register-approval') {
        // 直接使用http调用，而不是通过notificationService
        http({
          url: "yonghu/page",
          method: "get",
          params: {
            page: 1,
            limit: 1,
            yonghuStatus: 0
          }
        }).then(({ data }) => {
          if (data && data.code === 0) {
            console.log('Register approval count in badge:', data.data.total)
            this.count = data.data.total
          } else {
            console.error('Error in API response:', data)
            this.count = 0
          }
        }).catch(error => {
          console.error('Error fetching register approval count:', error)
          this.count = 0
        })
      }
    }
  }
}
</script>

<style scoped>
.notification-badge {
  position: relative;
  display: inline-block;
}

.badge {
  position: absolute;
  top: -10px;
  right: -10px;
}
</style> 