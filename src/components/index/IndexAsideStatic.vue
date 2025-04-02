<template>
  <div class="index-aside">
    <div class="index-aside-inner menulist">
      <div v-for="item in filteredMenuList" :key="item.roleName" class="menulist-item" style="height:100%;broder:0;background-color:#263238">
        <div class="menulistImg" style="backgroundColor:#263238;padding:25px 0" v-if="false && menulistStyle == 'vertical'">
          <el-image v-if="'http://codegen.caihongy.cn/20201021/cc7d45d9c8164b58b18351764eba9be1.jpg'" src="http://codegen.caihongy.cn/20201021/cc7d45d9c8164b58b18351764eba9be1.jpg" fit="cover" />
        </div>
        <el-menu mode="vertical" :unique-opened="true" class="el-menu-demo" style="height:100%;" background-color="#263238" text-color="#a8b6c3" active-text-color="#40c9c6" :default-active="activeIndex">
          <el-menu-item index="0" :style="menulistBorderBottom" @click="menuHandler('')">
            <i class="el-icon-s-home" />
            <span>数据概览</span>
          </el-menu-item>

          <el-submenu index="1" :style="menulistBorderBottom">
            <template slot="title">
              <i class="el-icon-s-platform" />
              <span>资产管理</span>
            </template>
            <el-menu-item index="1-1" @click="menuHandler('shangpin')">资产列表</el-menu-item>
            <el-menu-item index="1-2" @click="menuHandler('dictionaryShangpin')" v-if="isAdmin">资产分类</el-menu-item>
            <el-menu-item index="1-3" @click="menuHandler('dictionaryDidian')" v-if="isAdmin">存放地点</el-menu-item>
          </el-submenu>

          <el-submenu index="2" :style="menulistBorderBottom">
            <template slot="title">
              <i class="el-icon-s-order" />
              <span>借用管理</span>
            </template>
            <el-menu-item index="2-1" @click="menuHandler('jieyong')">借用列表</el-menu-item>
            <el-menu-item index="2-2" @click="menuHandler('dictionaryGuihuan')">归还管理</el-menu-item>
          </el-submenu>

          <el-submenu index="3" :style="menulistBorderBottom">
            <template slot="title">
              <i class="el-icon-s-cooperation" />
              <span>维护管理</span>
            </template>
            <el-menu-item index="3-1" @click="menuHandler('weixiu')">维修管理</el-menu-item>
            <el-menu-item index="3-2" @click="menuHandler('baofei')">报废管理</el-menu-item>
          </el-submenu>

          <el-submenu index="4" :style="menulistBorderBottom">
            <template slot="title">
              <i class="el-icon-box" />
              <span>入库管理</span>
            </template>
            <el-menu-item index="4-1" @click="menuHandler('shangpinChuruInout')">入库登记</el-menu-item>
            <el-menu-item index="4-2" @click="menuHandler('shangpinChuruInoutList')">入库明细</el-menu-item>
            <el-menu-item index="4-3" @click="menuHandler('dictionaryShangpinChuruInout')">入库类型</el-menu-item>
          </el-submenu>

          <el-submenu index="5" :style="menulistBorderBottom" v-if="isAdmin">
            <template slot="title">
              <i class="el-icon-s-custom" />
              <span>人员管理</span>
            </template>
            <el-menu-item index="5-1" @click="menuHandler('yonghu')">用户管理</el-menu-item>
            <el-menu-item index="5-2" @click="menuHandler('register-approval')">
              <div class="menu-badge-wrapper">
                <span>注册申请</span>
                <el-badge v-if="registerApprovalCount > 0" :value="registerApprovalCount" class="menu-badge"></el-badge>
              </div>
            </el-menu-item>
            <el-menu-item index="5-3" @click="menuHandler('dictionaryBumen')">部门管理</el-menu-item>
          </el-submenu>

          <el-submenu index="7" :style="menulistBorderBottom">
            <template slot="title">
              <i class="el-icon-connection" />
              <span>区块链服务</span>
            </template>
            <el-menu-item index="7-1" @click="menuHandler('chainOverview')" v-if="isAdmin">区块链概览</el-menu-item>
            <el-menu-item index="7-2" @click="menuHandler('assetChain')" v-if="isAdmin">资产上链</el-menu-item>
            <el-menu-item index="7-3" @click="menuHandler('transactionRecord')">交易记录</el-menu-item>
            <el-menu-item index="7-4" @click="menuHandler('chainAccount')" v-if="isAdmin">链账户管理</el-menu-item>
          </el-submenu>

          <el-submenu index="8" :style="menulistBorderBottom" v-if="isAdmin">
            <template slot="title">
              <i class="el-icon-bell" />
              <span>告警服务</span>
            </template>
            <el-menu-item index="8-1" @click="menuHandler('alarmList')">告警列表</el-menu-item>
            <el-menu-item index="8-2" @click="menuHandler('alarmSettings')">告警设置</el-menu-item>
            <el-menu-item index="8-3" @click="menuHandler('alarmStatistics')">告警统计</el-menu-item>
          </el-submenu>

          <el-submenu index="9" :style="menulistBorderBottom">
            <template slot="title">
              <i class="el-icon-document" />
              <span>新闻管理</span>
            </template>
            <el-menu-item index="9-1" @click="menuHandler('newsList')">新闻列表</el-menu-item>
            <el-menu-item index="9-2" @click="menuHandler('newsStatistics')" v-if="isAdmin">新闻统计</el-menu-item>
          </el-submenu>

          <el-submenu index="10" :style="menulistBorderBottom">
            <template slot="title">
              <i class="el-icon-wallet" />
              <span>我的资产</span>
            </template>
            <el-menu-item index="10-1" @click="menuHandler('myAssets')">我的</el-menu-item>
            <el-menu-item index="10-2" @click="menuHandler('assetTransfer')">资产转让记录</el-menu-item>
          </el-submenu>

          <el-submenu index="6" :style="menulistBorderBottom">
            <template slot="title">
              <i class="el-icon-user-solid" />
              <span>个人中心</span>
            </template>
            <el-menu-item index="6-1" @click="menuHandler('updatePassword')">修改密码</el-menu-item>
            <el-menu-item index="6-2" @click="menuHandler('center')">个人信息</el-menu-item>
          </el-submenu>

        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
import menu from '@/utils/menu'
import http from '@/utils/http'

export default {
  data() {
    return {
      menuList: [],
      dynamicMenuRoutes: [],
      role: '',
      icons: [
        'el-icon-s-cooperation',
        'el-icon-s-order',
        'el-icon-s-platform',
        'el-icon-s-fold',
        'el-icon-s-unfold',
        'el-icon-s-operation',
        'el-icon-s-promotion',
        'el-icon-s-release',
        'el-icon-s-ticket',
        'el-icon-s-management',
        'el-icon-s-open',
        'el-icon-s-shop',
        'el-icon-s-marketing',
        'el-icon-s-flag',
        'el-icon-s-comment',
        'el-icon-s-finance',
        'el-icon-s-claim',
        'el-icon-s-custom',
        'el-icon-s-opportunity',
        'el-icon-s-data',
        'el-icon-s-check',
        'el-icon-s-grid',
        'el-icon-menu',
        'el-icon-chat-dot-square',
        'el-icon-message',
        'el-icon-postcard',
        'el-icon-position',
        'el-icon-microphone',
        'el-icon-close-notification',
        'el-icon-bangzhu',
        'el-icon-time',
        'el-icon-odometer',
        'el-icon-crop',
        'el-icon-aim',
        'el-icon-switch-button',
        'el-icon-full-screen',
        'el-icon-copy-document',
        'el-icon-mic',
        'el-icon-stopwatch',
      ],
      menulistStyle: 'vertical',
      menulistBorderBottom: {
        borderBottom: '1px solid rgba(0, 0, 0, .2)'
      },
      currentPath: '',
      registerApprovalCount: 0,
      timer: null,
      activeIndex: '0'
    }
  },
  computed: {
    filteredMenuList() {
      return this.menuList.filter(item => {
        return item.roleName === this.role
      })
    },
    isAdmin() {
      return this.$storage.get('role') === '管理员'
    }
  },
  watch: {
    // 监听路由变化，更新当前路径
    '$route': {
      handler(to) {
        console.log('当前路由路径:', to.path);
        this.currentPath = to.path;
        // 更新菜单高亮状态
        this.updateMenuHighlight();
      },
      immediate: true
    }
  },
  created() {
    this.menuList = menu.list()
    this.role = this.$storage.get('role')
    
    // 如果是管理员，获取注册申请数量
    if (this.isAdmin) {
      this.fetchRegisterApprovalCount();
      // 设置定时器，每分钟检查一次注册申请数量
      this.timer = setInterval(() => {
        this.fetchRegisterApprovalCount();
      }, 60000);
    }
    
    // 监听路由变化事件
    this.$bus && this.$bus.$on('route-changed', this.handleRouteChange);
  },
  beforeDestroy() {
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
    
    // 移除事件监听
    this.$bus && this.$bus.$off('route-changed', this.handleRouteChange);
  },
  mounted() {
    // 初始化时设置当前路由对应的菜单高亮
    this.currentPath = this.$route.path;
    this.updateMenuHighlight();
  },
  methods: {
    menuHandler(name) {
      let path = name ? `/index/${name}` : '/index';
      this.$router.push(path);
      
      // 如果是注册申请页面，特殊处理
      if (name === 'register-approval') {
        // 添加一个小延迟，确保路由已经完成切换
        setTimeout(() => {
          // 手动设置菜单高亮
          const menu = document.querySelector('.el-menu');
          if (menu) {
            menu.setAttribute('default-active', '5-2');
          }
          console.log('已跳转到注册申请页面，路径:', path);
        }, 100);
      }
    },
    handleRouteChange(path) {
      console.log('侧边栏收到路由变化事件:', path);
      this.currentPath = path;
      this.updateMenuHighlight();
    },
    updateMenuHighlight() {
      // 根据当前路径更新菜单高亮状态
      const path = this.currentPath;
      console.log('更新菜单高亮状态，当前路径:', path);
      
      // 默认高亮首页
      if (!path || path === '/' || path === '/index' || path === '/index/') {
        this.activeIndex = '0';
        return;
      }
      
      // 特殊处理注册申请页面
      if (path === '/register-approval') {
        this.activeIndex = '5-2';
        return;
      }
      
      // 根据路径设置对应的菜单高亮
      switch (path) {
        case '/shangpin':
          this.activeIndex = '1-1';
          break;
        case '/dictionaryShangpin':
          this.activeIndex = '1-2';
          break;
        case '/dictionaryDidian':
          this.activeIndex = '1-3';
          break;
        case '/jieyong':
          this.activeIndex = '2-1';
          break;
        case '/dictionaryGuihuan':
          this.activeIndex = '2-2';
          break;
        case '/weixiu':
          this.activeIndex = '3-1';
          break;
        case '/baofei':
          this.activeIndex = '3-2';
          break;
        case '/shangpinChuruInout':
          this.activeIndex = '4-1';
          break;
        case '/shangpinChuruInoutList':
          this.activeIndex = '4-2';
          break;
        case '/dictionaryShangpinChuruInout':
          this.activeIndex = '4-3';
          break;
        case '/yonghu':
          this.activeIndex = '5-1';
          break;
        case '/dictionaryBumen':
          this.activeIndex = '5-3';
          break;
        case '/chainOverview':
          this.activeIndex = '7-1';
          break;
        case '/assetChain':
          this.activeIndex = '7-2';
          break;
        case '/transactionRecord':
          this.activeIndex = '7-3';
          break;
        case '/chainAccount':
          this.activeIndex = '7-4';
          break;
        case '/alarmList':
          this.activeIndex = '8-1';
          break;
        case '/alarmSettings':
          this.activeIndex = '8-2';
          break;
        case '/alarmStatistics':
          this.activeIndex = '8-3';
          break;
        case '/newsList':
          this.activeIndex = '9-1';
          break;
        case '/newsStatistics':
          this.activeIndex = '9-2';
          break;
        case '/updatePassword':
          this.activeIndex = '6-1';
          break;
        case '/center':
          this.activeIndex = '6-2';
          break;
        case '/myAssets':
          this.activeIndex = '10-1';
          break;
        case '/assetTransfer':
          this.activeIndex = '10-2';
          break;
        default:
          this.activeIndex = '0';
      }
    },
    fetchRegisterApprovalCount() {
      // 只有管理员才需要获取注册申请数量
      if (this.isAdmin) {
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
            console.log('Register approval count in static menu:', data.data.total);
            this.registerApprovalCount = data.data.total;
          } else {
            console.error('Error in API response:', data);
            this.registerApprovalCount = 0;
          }
        }).catch(error => {
          console.error('Error fetching register approval count:', error);
          this.registerApprovalCount = 0;
        });
      }
    },
    // 菜单
    setMenulistHoverColor(){
      let that = this
      this.$nextTick(()=>{
        document.querySelectorAll('.menulist .el-menu-item').forEach(el=>{
          el.addEventListener("mouseenter", e => {
            e.stopPropagation()
            el.style.backgroundColor = "#1e272c"
          })
          el.addEventListener("mouseleave", e => {
            e.stopPropagation()
            el.style.backgroundColor = '#263238'
          })
          el.addEventListener("focus", e => {
            e.stopPropagation()
            el.style.backgroundColor = "#1e272c"
          })
        })
        document.querySelectorAll('.menulist .el-submenu__title').forEach(el=>{
          el.addEventListener("mouseenter", e => {
            e.stopPropagation()
            el.style.backgroundColor = "#1e272c"
          })
          el.addEventListener("mouseleave", e => {
            e.stopPropagation()
            el.style.backgroundColor = "#263238"
          })
        })
      })
    },
    setMenulistIconColor() {
      this.$nextTick(()=>{
        document.querySelectorAll('.menulist .el-submenu__title .el-submenu__icon-arrow').forEach(el=>{
          el.style.color = "rgba(153, 153, 153, 1)"
        })
      })
    },
    menulistStyleChange() {
      this.setMenulistIconColor()
      this.setMenulistHoverColor()
      this.setMenulistStyleHeightChange()
      let str = "vertical"
      if("horizontal" === str) {
        this.$nextTick(()=>{
          document.querySelectorAll('.el-container .el-container').forEach(el=>{
            el.style.display = "block"
            el.style.paddingTop = "60px" // header 高度
          })
          document.querySelectorAll('.el-aside').forEach(el=>{
            el.style.width = "100%"
            el.style.height = "60px"
            el.style.paddingTop = '0'
          })
          document.querySelectorAll('.index-aside .index-aside-inner').forEach(el=>{
            el.style.paddingTop = '0'
          })
        })
      }
      if("vertical" === str) {
        this.$nextTick(()=>{
          document.querySelectorAll('.index-aside .index-aside-inner').forEach(el=>{
            el.style.paddingTop = "60px"
          })
        })
      }
    },
    setMenulistStyleHeightChange() {
      this.$nextTick(()=>{
        document.querySelectorAll('.menulist-item>.el-menu--horizontal>.el-menu-item').forEach(el=>{
          el.style.height = "60px"
          el.style.lineHeight = "60px"
        })
        document.querySelectorAll('.menulist-item>.el-menu--horizontal>.el-submenu>.el-submenu__title').forEach(el=>{
          el.style.height = "60px"
          el.style.lineHeight = "60px"
        })
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .index-aside {
    height: 100%;
    background-color: #263238;
    width: 230px;
    box-shadow: 2px 0 6px rgba(0,0,0,.1);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .index-aside-inner {
    height: 100%;
  }

  .menulist-item {
    height: 100%;
    border: 0;
    background-color: #263238;
  }

  .menu-badge-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .menu-badge {
    margin-right: 20px;
  }

  .el-menu-item.is-active {
    background-color: #1f2d33 !important;
    color: #40c9c6 !important;
  }

  .el-menu-item:hover, .el-submenu__title:hover {
    background-color: #1e272c !important;
  }

  .menulistImg {
    padding: 24px 0;
    box-sizing: border-box;

    .el-image {
      margin: 0 auto;
      width: 100px;
      height: 100px;
      border-radius: 100%;
      display: block;
    }
  }

  .index-aside-inner {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden !important;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }

    .el-menu {
      border: 0;
    }

    /* 自定义滚动条样式 */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  /* 优化菜单图标样式 */
  .el-menu-item, .el-submenu__title {
    i {
      color: #a8b6c3;
      margin-right: 10px;
    }

    &:hover i, &:focus i {
      color: #40c9c6;
    }
  }

  .el-menu-item.is-active {
    i {
      color: #40c9c6;
    }
  }
</style>
