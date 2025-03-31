import axios from 'axios'
import router from '@/router/router-static'
import storage from '@/utils/storage'
import { Message } from 'element-ui'

const http = axios.create({
    timeout: 1000 * 86400,
    withCredentials: true,
    baseURL: '/xiaoyuanzichan',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

// 是否正在刷新token的标记
let isRefreshing = false 
// 请求队列，token刷新后重新发起请求
let requestsQueue = []

// 请求拦截
http.interceptors.request.use(config => {
    config.headers['Token'] = storage.get('Token') // 请求头带上token
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use(response => {
    // 特殊情况处理：会话状态与本地存储的Token状态不一致
    if (response.data) {
        // 处理401未授权状态
        if (response.data.code === 401) {
            handleLoginExpired('登录状态已失效，请重新登录')
            return response
        }
        
        // 处理响应中包含"请先登录"或类似提示的情况
        if (response.data.msg && (
            response.data.msg.includes('登录') || 
            response.data.msg.includes('token') || 
            response.data.msg.includes('Token') ||
            response.data.msg.includes('TOKEN')
        )) {
            // 从session接口返回的请先登录不处理，因为这是可能未登录的正常情况
            if (response.config && response.config.url && 
                (response.config.url.includes('/session') || response.config.url.includes('/login'))) {
                return response
            }
            
            // 存在Token但提示需要登录，说明会话可能已过期
            if (storage.get('Token')) {
                handleLoginExpired('会话已过期，请重新登录')
            }
        }
    }
    return response
}, error => {
    // 处理401或403错误
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        handleLoginExpired('登录状态已失效，请重新登录')
    }
    return Promise.reject(error)
})

/**
 * 处理登录过期的统一函数
 */
function handleLoginExpired(message) {
    // 防止重复处理
    if (isRefreshing) return
    isRefreshing = true
    
    // 清除所有本地存储
    storage.clear()
    
    // 显示提示消息
    Message.error(message)
    
    // 延迟跳转，让用户看到提示
    setTimeout(() => {
        // 使用强制刷新方式重定向到登录页
        window.location.href = '#/login'
        window.location.reload()
        isRefreshing = false
    }, 1500)
}

export default http