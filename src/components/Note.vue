<template>
	<div class="box">
		<div class="content">
			<div class="left">
				<div class="left-text warp-text">{{ p.title }}</div>
				<div class="left-author">{{ p.hint }}</div>
			</div>
			<div class="right">
				<div class="right-img"><img class="auto-img" :src="p.images" alt="" /></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Note',
		props: ['p']
	}
</script>

<style lang="less" scoped>
.content{
	display: flex;
	align-items: center;
	padding: 10px 10px;
	.left-text{
		padding-right: 10px;
		font-size: 14px;
		margin-bottom: 3px;
	}
	.left-author{
		font-size: 12px;
		color: rgb(182, 176, 176);
	}
	.right{
		margin-left: auto;
		.right-img{
			width: 60px;
			height: 60px;
		}
	}
}
</style>
