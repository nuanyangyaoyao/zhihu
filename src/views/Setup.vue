<template>
	<div class="setup">
		<!-- 导航 -->
		<van-nav-bar title="设置" left-arrow @click-left="goBack" />
		<!-- 字体和背景 -->
		<van-cell-group>
			<van-cell center title="大字号" label="内容页将以更大字号显示" @click="show">
				<template #right-icon>
					<van-switch v-model="checkedA" size="24" active-color="#03a6ef" />
				</template>
			</van-cell>
			
			<van-cell @click="show" center title="夜间模式">
				<template #right-icon>
					<van-switch v-model="checkedB" size="24" active-color="#03a6ef" />
				</template>
			</van-cell>
			<van-popup v-model="isShow">以我的技术实在是做不到鸭!!!</van-popup>
		</van-cell-group>

		<!-- 账号安全 -->
		<van-cell-group><van-cell title="账号与安全" is-link to="home" /></van-cell-group>

		<!-- 好评与吐槽 -->
		<van-cell-group>
			<van-cell title="去好评" is-link url="#" />
			<van-cell title="去吐槽" is-link url="#" />
		</van-cell-group>

		<!-- 其他操作 -->
		<van-cell-group>
			<van-cell title="清理缓存" is-link url="#" />
			<van-cell title="隐私中心" is-link url="#" />
			<van-cell title="证照中心" is-link url="#" />
			<van-cell title="知乎协议" is-link url="#" />
		</van-cell-group>

		<div class="logout" @click="logout">退出登录</div>
	</div>
</template>

<script>
export default {
	name: 'Setup',
	data() {
		return {
			checkedA: false,
			checkedB: false,
			isShow: false
		};
	},
	methods: {
		logout() {
			if (this.$root.islock) {
				this.$root.islock = false;
				localStorage.clear();
				this.$router.push({ name: 'Login' });
			} else {
				this.$toast('请先登入');
			}
		},
		
		show(){
			if (this.checkedA || this.checkedB) {
				this.isShow = true;
			}
		},
		
		// 返回
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>

<style lang="less" scoped>
.logout {
	text-align: center;
	padding: 10px;
	margin: 0 auto;
	font-size: 14px;
	border-radius: 20px;
	border: 1px solid #000;
	width: 70px;
}
/deep/ .van-cell-group {
	margin-bottom: 10px;
}
/deep/.van-nav-bar__text {
	color: #333;
}
/deep/.van-icon {
	color: #333;
}
/deep/ .van-switch {
	width: 40px;
	height: 18px;
	background-color: #ececec;
}
/deep/ .van-switch__node {
	background-color: #ececec;
	top: -4px;
	left: -2px;
}
</style>
