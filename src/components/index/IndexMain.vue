<template>
	<div class="main-content">
		<bread-crumbs :title="title" class="bread-crumbs"></bread-crumbs>
		<div class="router-view">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	import menu from "@/utils/menu";
	export default {
		data() {
			return {
				menuList: [],
				role: "",
				currentIndex: -2,
				itemMenu: [],
				title: ''
			};
		},
		mounted() {
			let menus = menu.list();
			this.menuList = menus;
			this.role = this.$storage.get("role");
		},
		methods: {
			menuHandler(menu) {
				this.$router.push({
					name: menu.tableName
				});
				this.title = menu.menu;
			},
			titleChange(index, menus) {
				this.currentIndex = index
				this.itemMenu = menus;
				console.log(menus);
			},
			homeChange(index) {
				this.itemMenu = [];
				this.title = ""
				this.currentIndex = index
				this.$router.push({
					name: 'home'
				});
			},
			centerChange(index) {
				this.itemMenu = [{
					"buttons": ["新增", "查看", "修改", "删除"],
					"menu": "修改密码",
					"tableName": "updatePassword"
				}, {
					"buttons": ["新增", "查看", "修改", "删除"],
					"menu": "个人信息",
					"tableName": "center"
				}];
				this.title = "个人中心"
				this.currentIndex = index
				this.$router.push({
					name: 'center'
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
.main-content {
	flex: 1;
	padding: 0;
	box-sizing: border-box;
	background-color: #f0f2f5;
	overflow-y: auto;
	height: 100%;
	margin: 0;
}

.bread-crumbs {
	margin: 0;
	padding: 10px 15px;
	background-color: #fff;
	border-bottom: 1px solid #e8e8e8;
}

.router-view {
	background-color: #fff;
	padding: 15px;
	margin: 10px;
	border-radius: 4px;
	box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
</style>
