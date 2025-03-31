<template>
  <el-submenu v-if="menu.list && menu.list.length >= 1" :index="menu.menuId + ''">
    <template slot="title">
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu
      v-for="item in menu.list"
      :key="item.menuId"
      :menu="item"
      :dynamicMenuRoutes="dynamicMenuRoutes"
    ></sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.menuId + ''" @click="gotoRouteHandle(menu)">
    <div v-if="isRegisterApproval(menu)" class="menu-badge-wrapper">
      <span>{{ menu.name }}</span>
      <el-badge v-if="approvalCount > 0" :value="approvalCount" class="menu-badge"></el-badge>
    </div>
    <span v-else>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
import SubMenu from "./IndexAsideSub";
import http from '@/utils/http';

export default {
  name: "sub-menu",
  props: {
    menu: {
      type: Object,
      required: true
    },
    dynamicMenuRoutes: {
      type: Array,
      required: true
    }
  },
  components: {
    SubMenu
  },
  data() {
    return {
      approvalCount: 0,
      timer: null,
      currentPath: this.$route.path
    };
  },
  created() {
    // 打印所有菜单项，查找注册申请菜单
    console.log('Menu item:', this.menu.name, 'tableName:', this.menu.tableName);
    if (this.isRegisterApproval(this.menu)) {
      console.log('Found register-approval menu item:', this.menu);
      this.fetchApprovalCount();
      // 设置定时器，每分钟检查一次通知
      this.timer = setInterval(() => {
        this.fetchApprovalCount();
      }, 60000);
    }
    
    // 监听路由变化事件
    this.$bus && this.$bus.$on('route-changed', this.handleRouteChange);
    
    // 监听路由变化
    this.currentPath = this.$route.path;
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    
    // 移除事件监听
    this.$bus && this.$bus.$off('route-changed', this.handleRouteChange);
  },
  methods: {
    handleRouteChange(path) {
      console.log('子菜单收到路由变化事件:', path);
      this.currentPath = path;
      
      // 如果当前菜单是注册申请菜单，并且路由是注册申请页面，则高亮该菜单
      if (this.isRegisterApproval(this.menu) && path === '/register-approval') {
        // 找到对应的路由
        const route = this.dynamicMenuRoutes.find(r => r.path === path || r.name === '注册申请');
        if (route) {
          console.log('找到注册申请路由:', route);
          // 触发点击事件，确保菜单高亮
          this.gotoRouteHandle(this.menu);
        }
      }
    },
    fetchApprovalCount() {
      // 只有管理员才需要获取注册申请数量
      if (this.$storage.get('role') === '管理员') {
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
            console.log('Register approval count in menu:', data.data.total);
            this.approvalCount = data.data.total;
          } else {
            console.error('Error in API response:', data);
            this.approvalCount = 0;
          }
        }).catch(error => {
          console.error('Error fetching register approval count:', error);
          this.approvalCount = 0;
        });
      }
    },
    isRegisterApproval(menu) {
      // 检查菜单名称和tableName
      const isApproval = menu.tableName === 'register-approval' || menu.name === '注册申请';
      if (isApproval) {
        console.log('Register approval menu detected:', menu);
      }
      return isApproval;
    },
    // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
    gotoRouteHandle(menu) {
      var route = this.dynamicMenuRoutes.filter(
        item => item.meta.menuId === menu.menuId
      );
      if (route.length >= 1) {
        if (route[0].component != null) {
          console.log('跳转到路由:', route[0].name);
          this.$router.replace({ name: route[0].name });
        } else {
          this.$router.push({ name: "404" });
        }
      }
    }
  }
};
</script>

<style scoped>
.menu-badge-wrapper {
  position: relative;
  display: inline-block;
}

.menu-badge {
  position: absolute;
  top: -10px;
  right: -20px;
}
</style>
