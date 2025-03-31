<template>
    <!-- <el-header>
        <el-menu background-color="#00c292" text-color="#FFFFFF" active-text-color="#FFFFFF" mode="horizontal">
            <div class="fl title">{{this.$project.projectName}}</div>
            <div class="fr logout" style="display:flex;">
                <el-menu-item index="3">
                    <div>{{this.$storage.get('role')}} {{this.$storage.get('adminName')}}</div>
                </el-menu-item>
                <el-menu-item @click="onLogout" index="2">
                    <div>退出登录</div>
                </el-menu-item>
            </div>
        </el-menu>
    </el-header> -->
    <div class="navbar" :style="{backgroundColor:heads.headBgColor,height:heads.headHeight,boxShadow:heads.headBoxShadow}">
        <div class="title-menu" :style="{justifyContent:heads.headTitleStyle=='1'?'flex-start':'center'}">
            <div class="logo-container">
                <i class="el-icon-s-platform logo-icon"></i>
            </div>
            <div class="title-name" :style="{fontSize:heads.headFontSize}">{{this.$project.projectName}}</div>
        </div>
        <div class="right-menu">
            <div class="header-actions">
                <div class="action-item">
                    <el-tooltip content="搜索" placement="bottom">
                        <i class="el-icon-search action-icon"></i>
                    </el-tooltip>
                </div>
                <div class="action-item">
                    <el-tooltip content="帮助中心" placement="bottom">
                        <i class="el-icon-question action-icon"></i>
                    </el-tooltip>
                </div>
                <div class="action-item">
                    <el-tooltip content="系统设置" placement="bottom">
                        <i class="el-icon-setting action-icon"></i>
                    </el-tooltip>
                </div>
                <div class="action-item">
                    <el-tooltip content="切换主题" placement="bottom">
                        <i class="el-icon-moon action-icon"></i>
                    </el-tooltip>
                </div>
                <div class="action-item">
                    <el-tooltip content="全屏" placement="bottom">
                        <i class="el-icon-full-screen action-icon" @click="toggleFullScreen"></i>
                    </el-tooltip>
                </div>
                <div class="action-item" v-if="isAdmin">
                    <el-tooltip content="消息通知" placement="bottom">
                        <el-badge :value="notificationCount || null" :max="99">
                            <i class="el-icon-bell action-icon" @click="showNotifications"></i>
                        </el-badge>
                    </el-tooltip>
                </div>
            </div>
            <el-dropdown trigger="click" @command="handleCommand">
                <div class="user-info">
                    <el-avatar :size="32" icon="el-icon-user"></el-avatar>
                    <span class="username">{{this.$storage.get('role')}} {{this.$storage.get('adminName')}}</span>
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="profile">
                        <i class="el-icon-user"></i>个人中心
                    </el-dropdown-item>
                    <el-dropdown-item command="settings">
                        <i class="el-icon-setting"></i>系统设置
                    </el-dropdown-item>
                    <el-dropdown-item divided command="logout">
                        <i class="el-icon-switch-button"></i>退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        
        <!-- 通知抽屉 -->
        <el-drawer
            title="系统通知"
            :visible.sync="notificationDrawer"
            direction="rtl"
            size="30%"
            :modal="true"
            :show-close="true"
            :with-header="true"
            :append-to-body="true"
            :before-close="closeNotificationDrawer">
            <div class="notification-header">
                <span>通知列表</span>
                <el-button type="text" @click="markAllAsRead">全部标为已读</el-button>
            </div>
            <div class="notification-list">
                <div v-if="registerApprovalCount > 0" class="notification-item" @click="goToRegisterApproval">
                    <div class="notification-icon">
                        <el-badge :value="registerApprovalCount" class="item">
                            <i class="el-icon-user"></i>
                        </el-badge>
                    </div>
                    <div class="notification-content">
                        <div class="notification-title">用户注册申请</div>
                        <div class="notification-desc">有 {{registerApprovalCount}} 个用户注册申请等待审核</div>
                    </div>
                    <div class="notification-time">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <div v-if="registerApprovalCount === 0" class="empty-notification">
                    <i class="el-icon-bell"></i>
                    <p>暂无通知</p>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import notificationService from '@/utils/notification'
    import http from '@/utils/http'
    
    export default {
        data() {
            return {
                dialogVisible: false,
                ruleForm: {},
                user: {},
                heads: {
                    "headLogoutFontHoverColor":"#fff",
                    "headFontSize":"20px",
                    "headUserInfoFontColor":"#333",
                    "headBoxShadow":"0 2px 8px rgba(0, 0, 0, 0.1)",
                    "headTitleImgHeight":"44px",
                    "headLogoutFontHoverBgColor":"#1890ff",
                    "headFontColor":"#1890ff",
                    "headTitleImg":false,
                    "headHeight":"60px",
                    "headTitleImgBorderRadius":"22px",
                    "headTitleImgUrl":"http://codegen.caihongy.cn/20201021/cc7d45d9c8164b58b18351764eba9be1.jpg",
                    "headBgColor":"#ffffff",
                    "headTitleImgBoxShadow":"0 1px 6px #444",
                    "headLogoutFontColor":"#333",
                    "headUserInfoFontSize":"14px",
                    "headTitleImgWidth":"44px",
                    "headTitleStyle":"1",
                    "headLogoutFontSize":"14px"
                },
                notificationDrawer: false,
                notificationCount: 0,
                registerApprovalCount: 0,
                notificationTimer: null
            };
        },
        computed: {
            isAdmin() {
                return this.$storage.get('role') === '管理员';
            }
        },
        created() {
            this.setHeaderStyle();
            if (this.isAdmin) {
                this.fetchNotifications();
                // 设置定时器，每分钟检查一次通知
                this.notificationTimer = setInterval(() => {
                    this.fetchNotifications();
                }, 60000);
            }
        },
        beforeDestroy() {
            // 清除定时器
            if (this.notificationTimer) {
                clearInterval(this.notificationTimer);
            }
        },
        mounted() {
            let sessionTable = this.$storage.get("sessionTable")
            this.$http({
                url: sessionTable + '/session',
                method: "get"
            }).then(({
                         data
                     }) => {
                if (data && data.code === 0) {
                    this.user = data.data;
                } else {
                    let message = this.$message
                    message.error(data.msg);
                }
            });
        },
        methods: {
            fetchNotifications() {
                console.log('Fetching notifications in header component');
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
                        console.log('Register approval count in header:', data.data.total);
                        this.registerApprovalCount = data.data.total;
                        this.notificationCount = data.data.total;
                    } else {
                        console.error('Error in API response:', data);
                        this.registerApprovalCount = 0;
                        this.notificationCount = 0;
                    }
                }).catch(error => {
                    console.error('Error fetching register approval count in header:', error);
                    this.registerApprovalCount = 0;
                    this.notificationCount = 0;
                });
            },
            showNotifications() {
                this.notificationDrawer = true;
            },
            markAllAsRead() {
                // 标记所有通知为已读
                this.notificationCount = 0;
            },
            goToRegisterApproval() {
                this.notificationDrawer = false;
                // 使用replace而不是push，确保完全替换当前路由
                this.$router.replace('/register-approval');
                
                // 添加一个小延迟，确保路由已经完成切换
                setTimeout(() => {
                    // 手动设置菜单高亮
                    const menu = document.querySelector('.el-menu');
                    if (menu) {
                        menu.setAttribute('default-active', '5-2');
                    }
                    
                    // 触发一个自定义事件，通知整个应用路由已经变化
                    this.$bus && this.$bus.$emit('route-changed', '/register-approval');
                    console.log('已跳转到注册申请页面，路径: /register-approval');
                }, 100);
            },
            toggleFullScreen() {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            },
            handleCommand(command) {
                switch (command) {
                    case 'logout':
                        this.onLogout();
                        break;
                    case 'profile':
                        this.$router.push('/center');
                        break;
                    case 'settings':
                        // 处理系统设置
                        break;
                }
            },
            onLogout() {
                // 清除所有本地存储
                this.$storage.clear();
                // 使用location.reload()确保完全刷新应用
                window.location.href = '#/login';
                window.location.reload();
            },
            onIndexTap(){
                window.location.href = `${this.$base.indexUrl}`
            },
            setHeaderStyle() {
                this.$nextTick(()=>{
                    document.querySelectorAll('.navbar .right-menu .logout').forEach(el=>{
                        el.addEventListener("mouseenter", e => {
                            e.stopPropagation()
                            el.style.backgroundColor = this.heads.headLogoutFontHoverBgColor
                            el.style.color = this.heads.headLogoutFontHoverColor
                        })
                        el.addEventListener("mouseleave", e => {
                            e.stopPropagation()
                            el.style.backgroundColor = "transparent"
                            el.style.color = this.heads.headLogoutFontColor
                        })
                    })
                })
            },
            closeNotificationDrawer() {
                this.notificationDrawer = false;
            },
        }
    };
</script>


<style lang="scss" scoped>
    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0;
        box-sizing: border-box;
        background-color: #1f2d33;
        border-bottom: 1px solid #1a262b;
    }

    .title-menu {
        display: flex;
        align-items: center;
        height: 100%;
        background-color: #263238;
        padding: 0 20px;
        border-right: 1px solid #1a262b;
        min-width: 230px;
    }

    .logo-container {
        margin-right: 10px;
    }

    .logo-icon {
        font-size: 24px;
        color: #40c9c6;
    }

    .title-name {
        color: #ffffff;
        font-weight: bold;
    }

    .right-menu {
        display: flex;
        align-items: center;
        padding-right: 20px;
    }

    .header-actions {
        display: flex;
        margin-right: 20px;
    }

    .action-item {
        padding: 0 10px;
        cursor: pointer;
        transition: all 0.3s;
    }

    .action-item:hover .action-icon {
        color: #40c9c6;
        transform: scale(1.1);
    }

    .action-icon {
        font-size: 20px;
        color: #e0e0e0;
        transition: all 0.3s;
    }

    .user-info {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .username {
        margin: 0 5px;
        color: #333;
    }

    .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        border-bottom: 1px solid #eee;
    }

    .notification-list {
        padding: 10px;
    }

    .notification-item {
        display: flex;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;
        background-color: #f9f9f9;
        cursor: pointer;
    }

    .notification-item:hover {
        background-color: #f0f0f0;
    }

    .notification-icon {
        margin-right: 15px;
        font-size: 20px;
        color: #1890ff;
    }

    .notification-content {
        flex: 1;
    }

    .notification-title {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .notification-desc {
        color: #666;
        font-size: 12px;
    }

    .notification-time {
        color: #999;
        font-size: 12px;
    }

    .empty-notification {
        text-align: center;
        padding: 30px 0;
        color: #999;
    }

    .empty-notification i {
        font-size: 40px;
        margin-bottom: 10px;
    }
</style>

<style>
/* 全局样式，确保抽屉正常显示 */
.el-drawer {
    background-color: #fff !important;
    box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
}

.el-drawer__header {
    padding: 16px 20px;
    margin-bottom: 0;
    color: #333;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #f0f0f0;
}

.el-drawer__body {
    padding: 0;
    overflow-y: auto;
}
</style>
