import Vue from 'vue'
import App from '@/App.vue'
// element ui 完全引入
import ElementUI from 'element-ui'
import '@/assets/css/element-variables.scss'
import '@/assets/css/style.scss'
// 加载路由
// import router from '@/router/router-static.js';
import router from '@/router/router-static.js';
// 面包屑导航，注册为全局组件
import BreadCrumbs from '@/components/common/BreadCrumbs'
// 引入echart
import echarts from 'echarts'
// 引入echart主题
// import  '@/assets/js/echarts-theme-macarons.js'
import 'echarts/theme/macarons.js'
// ajax
import http from '@/utils/http.js'
// 基础配置
import base from '@/utils/base'
// 工具类
import { isAuth, getCurDate, getCurDateTime } from '@/utils/utils'
// storage 封装
import storage from "@/utils/storage";
// 上传组件
import FileUpload from "@/components/common/FileUpload";
// 富文本编辑组件
import Editor from "@/components/common/Editor";
// api 接口
import api from '@/utils/api'
// 数据校验工具类
import * as validate from '@/utils/validate.js'
// 通知服务
import notificationService from '@/utils/notification'
// 后台地图
import VueAMap from 'vue-amap'
import '@/icons'
//excel导出
import JsonExcel from 'vue-json-excel'
//二维码
import VueQr from 'vue-qr'
//打印
import printJS from 'print-js'
//MD5
import md5 from 'js-md5';

// 创建事件总线
const EventBus = new Vue();
Vue.prototype.$bus = EventBus;

// 后台地图
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'ca04cee7ac952691aa67a131e6f0cee0',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
Vue.prototype.$validate = validate
Vue.prototype.$http = http // ajax请求方法
Vue.prototype.$echarts = echarts
Vue.prototype.$base = base.get()
Vue.prototype.$project = base.getProjectName()
Vue.prototype.$storage = storage
Vue.prototype.$api = api
// 判断权限方法
Vue.prototype.isAuth = isAuth
Vue.prototype.getCurDateTime = getCurDateTime
Vue.prototype.getCurDate = getCurDate
// Vue.prototype.$base = base
Vue.use(ElementUI, { size: 'medium', zIndex: 3000 });
Vue.config.productionTip = false
// 组件全局组件
Vue.component('bread-crumbs', BreadCrumbs)
Vue.component('file-upload', FileUpload)
Vue.component('editor', Editor)
//二维码
Vue.component('VueQr', VueQr)
//excel导出
Vue.component('downloadExcel', JsonExcel)
//MD5
Vue.prototype.$md5 = md5;
// 通知服务
Vue.prototype.$notificationService = notificationService;

// 添加全局调试日志
console.log('通知服务初始化完成')

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 获取用户Token
  const token = storage.get('Token');
  
  // 如果是访问介绍页面，直接放行
  if (to.path === '/') {
    next();
    return;
  }
  
  // 如果目标路径是登录页面或注册页面，直接放行
  if (to.path === '/login' || to.path === '/register') {
    // 如果已经登录且要去登录页，重定向到首页
    if (token) {
      next({ path: '/index' });
    } else {
      next();
    }
    return;
  }
  
  // 检查是否已登录（判断是否有token）
  if (!token) {
    // 未登录，跳转到登录页面
    next({ path: '/login' });
    return;
  }
  
  // 检查路由是否需要管理员权限
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    // 获取当前用户角色
    const role = storage.get("role");
    // 如果不是管理员，则重定向到首页
    if (role !== '管理员') {
      next({ path: '/index' });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
