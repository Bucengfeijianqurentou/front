<template>
  <el-aside class="index-aside" width="200px">
    <div class="index-aside-inner">
      <el-menu :default-active="activeIndex">
        <el-menu-item @click="menuHandler('/')" index="1">
          <!-- <i class="el-icon-s-home"></i> -->
          首页
        </el-menu-item>
        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes"
        ></sub-menu>
      </el-menu>
    </div>
  </el-aside>
</template>
<script>
import SubMenu from "@/components/index/IndexAsideSub";
export default {
  data() {
    return {
      menuList: [],
      dynamicMenuRoutes: [],
      activeIndex: "1" // 默认高亮首页
    };
  },
  components: {
    SubMenu
  },
  watch: {
    // 监听路由变化，更新菜单高亮状态
    '$route': {
      handler(to) {
        console.log('当前路由路径:', to.path);
        this.updateActiveIndex(to.path);
      },
      immediate: true
    }
  },
  mounted() {
    // 获取动态菜单数据并且渲染
    this.menuList = JSON.parse(sessionStorage.getItem("menuList") || "[]");
    this.dynamicMenuRoutes = JSON.parse(
      sessionStorage.getItem("dynamicMenuRoutes") || "[]"
    );
    
    // 初始化时设置当前路由对应的菜单高亮
    this.updateActiveIndex(this.$route.path);
  },
  methods: {
    menuHandler(path) {
      this.$router.push({ path: path });
    },
    // 根据当前路由路径更新菜单高亮状态
    updateActiveIndex(path) {
      console.log('更新菜单高亮状态，当前路径:', path);
      
      // 如果是首页，高亮首页菜单
      if (path === '/' || path === '/index' || path === '/index/') {
        this.activeIndex = "1";
        return;
      }
      
      // 查找当前路径对应的菜单ID
      const findMenuId = (menus) => {
        for (const menu of menus) {
          // 检查当前菜单
          const route = this.dynamicMenuRoutes.find(r => r.path === path);
          if (route && route.meta && route.meta.menuId === menu.menuId) {
            return menu.menuId.toString();
          }
          
          // 如果有子菜单，递归查找
          if (menu.list && menu.list.length > 0) {
            const childId = findMenuId(menu.list);
            if (childId) return childId;
          }
        }
        return null;
      };
      
      // 特殊处理注册申请页面
      if (path === '/register-approval') {
        // 查找注册申请对应的菜单ID
        const registerMenu = this.findRegisterApprovalMenu(this.menuList);
        if (registerMenu) {
          this.activeIndex = registerMenu.menuId.toString();
          console.log('找到注册申请菜单，ID:', this.activeIndex);
          return;
        }
      }
      
      // 查找当前路径对应的菜单ID
      const menuId = findMenuId(this.menuList);
      if (menuId) {
        this.activeIndex = menuId;
        console.log('找到匹配的菜单ID:', this.activeIndex);
      } else {
        console.log('未找到匹配的菜单，保持默认高亮');
      }
    },
    // 查找注册申请菜单
    findRegisterApprovalMenu(menus) {
      for (const menu of menus) {
        // 检查当前菜单是否为注册申请
        if (menu.tableName === 'register-approval' || menu.name === '注册申请') {
          return menu;
        }
        
        // 如果有子菜单，递归查找
        if (menu.list && menu.list.length > 0) {
          const found = this.findRegisterApprovalMenu(menu.list);
          if (found) return found;
        }
      }
      return null;
    }
  }
};
</script>
<style lang="scss" scoped>
.index-aside {
  margin-top: 80px;
  overflow: hidden;
  .index-aside-inner {
    width: 217px;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>

