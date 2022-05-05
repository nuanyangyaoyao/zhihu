<template>
	<div class="mine">
		<van-nav-bar left-arrow @click-left="goBack" />
		<!-- 用户信息 -->
		<div class="userInfo">
			<div class="infoBox">
				<div class="img-box"><img src="../assets/xiaokonglong.jpeg" /></div>
				<h4 class="username">{{ nickname }}</h4>
			</div>
		</div>

		<!-- 收藏与消息 -->
		<van-cell-group class="my-box">
			<van-cell class="my" title="我的收藏" is-link to="Collection"></van-cell>
			<van-cell class="my" title="消息中心" is-link @click="showPopup"></van-cell>
			<van-popup v-model="isShow">暂无接口</van-popup>
		</van-cell-group>

		<div class="login-font">
			<div class="mode">
				<div class="mode-left">
					<div class="img-box"><img class="auto-img" :src="iconImg" alt="" /></div>	
				<div class="mode-box" @click="modelBrn">{{ mode.title }}</div>
				</div>

				<div class="mode-right" @click="goSetUp">	
					<div class="img-box">
						<img class="auto-img" :src="setImg" alt="" />
					</div>	
					<div class="mode-box">设置</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navi from '../components/Navi.vue';
export default {
	components: { Navi },
	name: 'Mine',
	data() {
		return {
			dark: false,
			iconImg: require('../assets/moon.png'),
			setImg: require('../assets/setup.png'),
			mode: {
				title: '夜间模式'
			},
			isShow: false,
			nickname: ''
		};
	},
	created() {
		this.getNickName();
		if (this.$root.draklin) {
			this.mode.title = '日间模式';
			this.setImg = require('../assets/setup0.png');
			this.iconImg = require('../assets/light.png');
			window.document.documentElement.setAttribute('data-theme', 'light');
		} else {
			this.mode.title = '夜间模式';
			this.iconImg = require('../assets/moon.png');
			this.setImg = require('../assets/setup.png');
			window.document.documentElement.setAttribute('data-theme', 'dark');
		}
	},
	mounted() {
		window.document.documentElement.setAttribute('data-theme', 'dark');
	},
	methods: {
		getNickName() {
			this.nickname = JSON.parse(localStorage.getItem('enroll')).nickName;
		},
		modelBrn() {
			this.dark = !this.dark;
			this.$root.draklin = this.dark;
			if (!this.$root.draklin) {
				this.mode.title = '夜间模式';
				this.iconImg = require('../assets/moon.png');
				this.setImg = require('../assets/setup.png');
				window.document.documentElement.setAttribute('data-theme', 'dark');
			} else {
				this.mode.title = '日间模式';
				this.setImg = require('../assets/setup0.png');
				this.iconImg = require('../assets/light.png');
				window.document.documentElement.setAttribute('data-theme', 'light');
			}
		},
		goBack() {
			this.$router.go(-1);
		},
		showPopup() {
			this.isShow = true;
		},
		goSetUp() {
			this.$router.push({ name: 'Setup' });
		}
	}
};
</script>

<style lang="scss" scoped="scoped">
	@import "../assets/scss/common/common";
.navi {
  @include background_color("background_color");
  @include font_color("text-color");
  transition: background 1s, color 0.6s;
}
.mine {
	@include background_color("background_color");
	transition: background 1s, color 0.6s;
	.userInfo {
		
		text-align: center;
		.infoBox {
			width: 100px;
			margin: 0 auto;
			.img-box {
				width: 100px;
				height: 100px;
				overflow: hidden;
				border-radius: 50%;
				margin-bottom: 10px;
				> img {
					width: 100%;
					height: 100%;
				}
			}
			.username {
				width: 100px;
				margin: 0;
				height: 30px;
				font-size: 24px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
	}
	.my {
		@include background_color("background_color");
		transition: background 1s, color 0.6s;
	}
	.my-box {
		margin-top: 15px;
		border-top: 1px solid #e8e8e8;
	}
	.login-font {
		margin-top: 70px;
		.mode {
			display: flex;
			padding: 0 20px;
			margin-top: 180px;
			.mode-left {
				margin-right: auto;
				.img-box {
					width: 32px;
					height: 32px;
					padding-left: 10px;
				}
			}
			.mode-box {
				padding: 10px 3px;
				text-align: center;
				@include font_color('semode-color');
				transition: background 1s, color 0.6s;
			}
		}
	}
}

/deep/ .van-icon {
	color: #333;
	font-weight: bolder;
}
/deep/.van-cell {
	padding: 15px;
}
/deep/.van-hairline--bottom::after {
	border-bottom: none;
}
/deep/.van-cell .van-icon {
	color: #bbb;
	font-weight: bolder;
}
</style>
