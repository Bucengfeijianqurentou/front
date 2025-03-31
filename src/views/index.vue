<template>
	<div class="app-container">
		<index-header></index-header>
		<div class="main-container">
			<index-aside></index-aside>
			<index-main></index-main>
		</div>
	</div>
</template>
<script>
	import IndexHeader from '@/components/index/IndexHeader'
	import IndexAside from '@/components/index/IndexAsideStatic'
	import IndexMain from '@/components/index/IndexMain'
	export default {
		components: {
			IndexHeader,
			IndexAside,
			IndexMain
		}
	}
</script>

<style lang="scss" scoped>
	// 铺满全屏
	.app-container {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
	}
	
	.main-container {
		flex: 1;
		display: flex;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}
</style>
