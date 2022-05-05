<template>
	<div class="home">
		<!-- 导航条 -->
		<van-nav-bar fixed class="nav">
			<template #left>
				<div class="date-one" :class="{ isclass: true ? MainClass : '' }">
					<div class="text-two">{{ specificDate.day }}</div>
					<div class="text-three">{{ specificDate.monthOne }}月</div>
				</div>
				<div class="text-one">知乎日报</div>
			</template>
			<template #right>
				<div class="head" @click="Login"><img class="auto-img" :src="srcImg" alt="" /></div>
			</template>
		</van-nav-bar>
		<!-- 刷新 -->
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<!-- 轮播图 -->
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="(img, index) in hotImg" :key="index" @click="DetailP(img.id)">
					<img :src="img.image" alt="" class="imges" />
					<div class="img-text">
						<div class="img-text-one">{{ img.title }}</div>
						<div class="img-text-two">{{ img.hint }}</div>
					</div>
				</van-swipe-item>
			</van-swipe>
			<div class="content" v-for="(itme, index) in storageOne" :key="index" @click="DetailP(itme.id)">
				<div class="content-test">
					<div class="text">
						<div class="content-text-one warp-text">{{ itme.title }}</div>
						<div class="content-text-two warp-text">{{ itme.hint }}</div>
					</div>
					<div class="content-img"><img :src="itme.images" alt="" /></div>
				</div>
			</div>
			<!-- 加载旧数据 -->
			<div class="content-kuang" v-for="(itme, index) in bigData" :key="index">
				<div class="text">
					{{ bigDatanumber[index] }}
					<hr />
				</div>
				<div class="content" v-for="(itmes, indexOne) in bigData[index].stories" :key="indexOne" @click="DetailP(itmes.id)">
					<div class="content-test">
						<div class="text">
							<div class="content-text-one warp-text">{{ itmes.title }}</div>
							<div class="content-text-two warp-text">{{ itmes.hint }}</div>
						</div>
						<div class="content-img"><img :src="itmes.images" alt="" /></div>
					</div>
				</div>
			</div>
			<!-- 触底加载 -->
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset="100" :immediate-check="isCheck">
				<hr />
			</van-list>
		</van-pull-refresh>
	</div>
</template>
<script>
export default {
	name: 'Home',
	data() {
		return {
			srcImg: require('../assets/picture.png'),
			isCheck: false,
			isLoading: false,
			isclass: false,
			storageOne: [],
			hotImg: [],
			storagedata: '',
			shijianchuo: '',
			specificDate: {
				number: '0',
				numberOne: '0',
				year: '',
				month: '',
				monthOne: '',
				day: ''
			},
			current: '0',
			loading: false,
			finished: false,
			bigData: [],
			bigDatanumber: [],
			MainClass: {
				backgroundColor: '#2d2d2d',
				color: '#616554'
			}
		};
	},
	created() {
		this.getNewData();
		if (this.$root.islock) {
			this.srcImg = require('../assets/xiaokonglong.jpeg');
		}
		if (this.$root.isclass) {
			this.isclass = true;
		}
		this.modelBrn();
	},

	methods: {
		mounted() {
			window.document.documentElement.setAttribute('data-theme', 'dark');
		},
		//加载
		onLoad() {
			setTimeout(() => {
				let shu = (this.shijianchuo = this.shijianchuo - 86400000);
				var myDate = new Date(shu);
				let Year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
				let Month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
				let Dateone = myDate.getDate(); //获取当前日(1-31)
				Month = Month < 10 ? '0' + Month : Month;
				Dateone = Dateone < 10 ? '0' + Dateone : Dateone;
				shu = Year + Month + Dateone;
				shu = Number(shu);
				if (shu > 1000) {
					this.getHotProducttwo(shu);
				} else {
					this.loading = false;
					return;
				}
			}, 3000);
		},
		//刷新
		onRefresh() {
			setTimeout(() => {
				this.$toast('刷新成功');
				this.isLoading = false;
				this.bigDatanumber = [];
				this.storageOne = [];
				this.bigData = [];
				this.hotImg = [];
				this.getNewData();
			}, 1000);
		},
		//获取数据
		getNewData() {
			this.axios({
				method: 'get',
				url: 'https://apis.netstart.cn/zhihudaily/stories/latest'
			}).then(result => {
					this.storageOne = result.data.stories;
					this.hotImg = result.data.top_stories;
					this.storagedata = result.data.date;
					this.specificDate.number = Number(this.storagedata);
					this.specificDate.numberOne = this.specificDate.number;
					this.specificDate.year = this.storagedata.slice(0, 4);
					this.specificDate.month = this.storagedata.slice(4, 6);
					this.specificDate.monthOne = this.storagedata.slice(5, 6);
					this.specificDate.day = this.storagedata.slice(6, 8);
					let currTime = Date.now();
					this.shijianchuo = currTime;
				}).catch(err => {});
		},
		getHotProducttwo(shu) {
			this.axios({
				method: 'get',
				url: 'https://apis.netstart.cn/zhihudaily/stories/before/' + shu
			}).then(result => {
					this.bigData.push(result.data);
					this.bigDatanumber = [];
					for (let i = 0; i < this.bigData.length; i++) {
						let shijian = this.bigData[i].date;
						let year = shijian.slice(0, 4);
						let month = shijian.slice(4, 6);
						let day = shijian.slice(6, 8);
						let wenzi = month + '月' + day + '日';
						this.bigDatanumber.push(wenzi);
					}
					this.loading = false;
			}).catch(err => {});
		},

		modelBrn() {
			if (!this.$root.draklin) {
				window.document.documentElement.setAttribute('data-theme', 'dark');
			} else {
				window.document.documentElement.setAttribute('data-theme', 'light');
			}
		},

		//登录页
		Login() {
			if (this.$root.islock) {
				this.$router.push({ name: 'Mine' });
			} else {
				this.$router.push({ name: 'Login' });
			}
		},

		//跳转详情页
		DetailP(id) {
			this.$router.push({ name: 'Detail', params: { id } });
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/common/common';
.home {
	//在此使用了背景颜色变量
	@include background_color('background_color');
}

/deep/ .van-nav-bar__text {
	color: black;
}
/deep/ .van-nav-bar .van-icon {
	color: black;
}
/deep/ .van-nav-bar {
	height: 65px;
}
/deep/ .van-swipe__indicators {
	position: absolute;
	bottom: 15px;
	left: 85%;
}
/deep/.van-pull-refresh {
	margin-top: 65px;
}

.nav {
	@include background_color('background_color');
	@include font_color('text-color');
}

// /deep/ .van-pull-refresh{
//   background-color: #2d2d2d;
// }

.head {
	width: 40px;
	img {
		border-radius: 50%;
	}
}

.pois {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
}
.imges {
	width: 100%;
	position: relative;
}
.img-text {
	width: 300px;
	height: 70px;
	position: absolute;
	bottom: 10px;
	left: 20px;
	.img-text-one {
		width: 100%;
		height: 50px;
		color: white;
		font-size: 18px;
	}
	.img-text-two {
		width: 100%;
		height: 20px;
		font-size: 12px;
		color: rgb(235, 235, 235);
		line-height: 20px;
	}
}
/deep/ .van-nav-bar__content {
	height: 65px;
}
.fei {
	width: 100%;
	height: 65px;
}
.date-one {
	width: 40px;
	height: 40px;
	padding-right: 10px;
	border-right: 1px solid #888;
	.text-two {
		font-size: 20px;
	}
}
.text-one {
	width: 110px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 18px;
	font-family: math;
}
.content {
	width: 100%;
	.content-img {
		margin-left: auto;
		width: 70px;
		height: 70px;
		padding: 5px;
		img {
			width: 100%;
			height: 100%;
			display: block;
			border-radius: 3px;
		}
	}
	.content-test {
		padding: 15px 15px;
		display: flex;
		align-items: center;
		.text {
			flex: 5;
		}
		.content-text-one {
			font-size: 14px;
			margin-bottom: 5px;
			// color: #cecbcb
			@include font_color('one-color');
		}
		.content-text-two {
			font-size: 12px;
			// color: var(--body_texttwo);
			@include font_color('text-color');
		}
	}
}
.content-kuang {
	width: 100%;
	height: 100%;
	.text {
		font-size: 13px;
		color: rgb(179, 179, 179);
		margin: 10px;
		hr {
			margin: 9px 0;
			float: right;
			width: 280px;
			height: 1px;
			border: none;
			// background-color: #616554;
		}
	}
	.content {
		width: 100%;
		height: 100px;
		.con-text {
			display: flex;
			align-items: center;
		}
		.content-img {
			width: 70px;
			height: 70px;
			padding: 5px;
			img {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
		.content-test {
			padding: 15px 15px;
			.content-text-one {
				font-size: 15px;
			}
			.content-text-two {
				font-size: 11px;
			}
		}
	}
}
</style>
