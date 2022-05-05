<template>
	<div id="app"><router-view /></div>
</template>

<script>
export default {
	name: 'App',
	created() {
		this.$root.islock = false;
		this.$root.username = '';
		this.$root.collectDataApp = [];
		this.$root.draklin = false;
	}
};
</script>

<style lang="less">
.auto-img {
	display: block;
	width: 100%;
	height: 100%;
}
.warp-text {
	overflow: hidden;
	text-overflow: ellipsis; // text-overflow css3的属性，当文本溢出时，显示省略号
	display: -webkit-box;
	-webkit-line-clamp: 2; // 设置两行文字溢出
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 16px;
}
</style>
