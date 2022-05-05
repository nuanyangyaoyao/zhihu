<template>
	<div class="detail">
		<div :class="{ detailConten: isClass }" class="detail-content">
			<div class="headline">
				<div class="title">{{ DetailBody.title }}</div>
			</div>
		</div>
		<van-tabbar v-model="active" class="yjms-mode">
			<van-tabbar-item icon="arrow-left" class="img-icon" @click="exit()"></van-tabbar-item>
			<van-tabbar-item @click="skip(id)"><van-icon class="img-icon" name="other-pay" :badge="extarInfo.comments" /></van-tabbar-item>
			<van-tabbar-item @click="give()"><van-icon class="img-icon" :name="iconImg" :badge="extarInfo.popularity" /></van-tabbar-item>
			<van-tabbar-item @click="collect()"><van-icon class="img-icon" :name="collectImg" /></van-tabbar-item>
			<van-cell icon="share-o" @click="showShare = true" />
			<van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
		</van-tabbar>
	</div>
</template>

<script>
import { Toast } from 'vant';
import { Notify } from 'vant';
export default {
	name: 'Detail',

	data() {
		return {
			isClass: false,
			// collectData:[],
			iconImg: 'good-job-o',
			collectImg: 'star-o',
			id: '',
			active: 0,
			DetailBody: [],
			showShare: false,
			isture: false,
			isfalse: false,
			extarInfo: [],
			options: [
				{ name: '微信', icon: 'wechat' },
				{ name: '微博', icon: 'weibo' },
				{ name: '复制链接', icon: 'link' },
				{ name: '分享海报', icon: 'poster' },
				{ name: '二维码', icon: 'qrcode' }
			]
		};
	},

	created() {
		this.id = this.$route.params.id;
		this.getDetailText(this.id);
		this.getExtra(this.id);
		this.modelBrn();
		this.isClass = this.$root.draklin;
	},

	methods: {
		exit() {
			this.$router.go(-1);
		},
		skip(id) {
			this.$router.push({ name: 'Comment', params: { id } });
		},
		give() {
			if (this.$root.islock) {
				if (this.isture) {
					this.iconImg = 'good-job-o';
					this.extarInfo.popularity = this.extarInfo.popularity - 1;
					this.isture = false;
				} else {
					this.iconImg = 'good-job';
					this.extarInfo.popularity = this.extarInfo.popularity + 1;
					this.isture = true;
				}
			} else {
				this.$router.push({ name: 'Login' });
				this.$toast('请先登录');
			}
		},

		mounted() {
			window.document.documentElement.setAttribute('data-theme', 'dark');
		},

		modelBrn() {
			if (!this.$root.draklin) {
				window.document.documentElement.setAttribute('data-theme', 'dark');
			} else {
				window.document.documentElement.setAttribute('data-theme', 'light');
			}
		},

		collect() {
			if (this.$root.islock) {
				if (this.isfalse) {
					this.collectImg = 'star-o';
					this.isfalse = false;
					this.$toast('取消收藏');
				} else {
					this.$root.collectDataApp.push(this.$route.params.id);
					this.$toast('收藏成功');
					this.collectImg = 'star';
					this.isfalse = true;
				}
			} else {
				this.$router.push({ name: 'Login' });
				Notify({ type: 'primary', message: '请登入' });
			}
		},
		onSelect(option) {
			this.$toast(option.name);
			this.showShare = false;
		},

		getExtra(id) {
			this.axios({
				method: 'get',
				url: 'https://apis.netstart.cn/zhihudaily/story/' + id + '/extra'
			})
				.then(result => {
					this.extarInfo = result.data;
				})
				.catch(err => {});
		},

		getDetailText(id) {
			this.axios({
				method: 'get',
				url: 'https://apis.netstart.cn/zhihudaily/story/' + id
			})
				.then(result => {
					this.DetailBody = result.data.story;
					let bodyHtml = document.querySelector('.detail-content');
					bodyHtml.innerHTML = this.DetailBody.body;
					let imgplaceholder = document.querySelector('.img-place-holder');
					imgplaceholder.innerHTML = `
                        <img class="auto-img" src="${this.DetailBody.image}"/>
                    `;
					let t = document.createElement('div');
					t.classList.add('title');
					imgplaceholder.appendChild(t);
					t.innerHTML = this.DetailBody.title;
				})
				.catch(err => {});
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3';
@import '../assets/scss/common/common';

.img-icon {
	font-size: 22px;
	@include background_color('background_color');
}

.yjms-mode {
	@include background_color('background_color');
}

.van-cell {
	@include background_color('background_color');
	i {
		color: #645c48;
	}
}

/deep/ .headline .img-place-holder {
	height: 315px;
}

/deep/ .van-cell {
	width: 15%;
}

/deep/ .van-cell__left-icon {
	font-size: 22px;
}

/deep/ .content {
	font-size: 14px;
}

/deep/ .bio {
	font-size: 14px;
	color: #2f9fe0;
}

/deep/ .view-more {
	a {
		text-align: center;
		display: block;
		margin: 0 auto;
		border-radius: 20px;
		background-color: #2f9fe0;
		color: #fff;
		line-height: 40px;
		height: 40px;
		width: 150px;
	}
}

/deep/ .detail-content {
	margin-bottom: 50px;
}

/deep/ .img-place-holder {
	position: relative;
	.title {
		position: absolute;
		left: 10px;
		bottom: 20px;
		font-size: 16px;
		color: #fff;
		font-weight: bold;
		font-family: emoji;
	}
}

/deep/ .van-tabbar-item {
	position: relative;
}

/deep/ .van-tabbar-item__text {
	position: absolute;
	right: 17px;
	top: 12px;
}

.detail {
	@include background_color('background_color');
}

/deep/ .answer {
	figure {
		margin: 0;
		padding: 20px;
	}
	p {
		padding: 0 20px;
	}
}

/deep/.content-inner {
	margin-bottom: 50px;
}

.detailConten {
	color: #cecbcb;
}

.content {
	width: 100%;
}
/deep/ .meta {
	padding: 20px;
	img {
		width: 30px;
		border-radius: 50%;
	}
}

/deep/ .content-image {
	width: 100%;
	display: block;
}
.active {
	color: #000;
}
</style>
