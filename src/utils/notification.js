// 通知服务
import storage from '@/utils/storage'
import http from '@/utils/http'

const NOTIFICATION_KEY = 'system_notifications'

export default {
  // 获取所有通知
  getNotifications() {
    const notifications = storage.get(NOTIFICATION_KEY)
    return notifications ? JSON.parse(notifications) : []
  },

  // 获取未读通知数量
  getUnreadCount() {
    const notifications = this.getNotifications()
    return notifications.filter(item => !item.read).length
  },

  // 获取注册申请通知数量
  getRegisterApprovalCount() {
    return new Promise((resolve, reject) => {
      // 调用API获取待审核用户数量
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
          resolve(data.data.total)
        } else {
          resolve(0)
        }
      }).catch(() => {
        resolve(0)
      })
    })
  },

  // 添加通知
  addNotification(notification) {
    const notifications = this.getNotifications()
    notifications.unshift({
      id: new Date().getTime(),
      time: new Date(),
      read: false,
      ...notification
    })
    storage.set(NOTIFICATION_KEY, JSON.stringify(notifications))
    return notifications
  },

  // 标记通知为已读
  markAsRead(id) {
    const notifications = this.getNotifications()
    const index = notifications.findIndex(item => item.id === id)
    if (index !== -1) {
      notifications[index].read = true
      storage.set(NOTIFICATION_KEY, JSON.stringify(notifications))
    }
    return notifications
  },

  // 标记所有通知为已读
  markAllAsRead() {
    const notifications = this.getNotifications()
    notifications.forEach(item => {
      item.read = true
    })
    storage.set(NOTIFICATION_KEY, JSON.stringify(notifications))
    return notifications
  },

  // 清除所有通知
  clearAll() {
    storage.set(NOTIFICATION_KEY, JSON.stringify([]))
    return []
  }
} 