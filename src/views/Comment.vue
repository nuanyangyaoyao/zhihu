<template>
	<div class="comment">
		<Navi class="na" :title="commentDatalen" :fixed="true" />
		<div class="comment-count">{{ commentDatalen }}</div>

		<div class="mar">
			<div class="comment-box" v-for="(item, index) in commentData" :key="index">
				<div class="comment-img"><img class="auto-img" :src="item.avatar" alt="" /></div>
				<div class="comment-content">
					<div class="content-top">
						<div class="comment-name">{{ item.author }}</div>
						<div class="comment-title warp-text">{{ item.content }}</div>
					</div>

					<div class="replyto warp-text" v-if="item.reply_to">
						<span class="na">//{{ item.reply_to.author }}:{{ item.reply_to.content }}</span>
					</div>

					<div class="dian" @click="wait">...</div>

					<div class="time">{{ time[index] }}</div>
					<div class="content-font">
						<div class="tubiao">
							<div class="shul">{{ item.likes }}</div>
							<div class="zan"><img class="auto-img zan-img" src="../assets/zan.png" @click="giveZan(index)" /></div>
							<div class="pl" @click="pinglun(index)"><img class="auto-img" src="../assets/pinglun.png" alt="" /></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fbpl">
			<div class="head-img"><img class="auto-img" :src="imgArr" alt="" /></div>
			<div class="pl-text"><input class="inp-text" v-model="meaning" type="text" placeholder="说说你的看法" /></div>
			<div class="dianp" @click="showMean">发布</div>
		</div>
		<van-popup v-model="show">
			<input type="text" class="inp" v-model="reply" placeholder="友善的评论是交流的起点..." />
			<div class="reply" @click="getReply">回复</div>
		</van-popup>
	</div>
</template>

<script>
import Navi from '../components/Navi.vue';
export default {
	components: { Navi },
	name: 'Comment',
	data() {
		return {
			imgArr: require('../assets/picture.png'),
			index: '',
			show: false,
			activeIndex: true,
			id: '',
			meaning: '',
			reply: '',
			activeInde: true,
			commentData: [],
			commentDatalen: '0',
			lik: '',
			time: []
		};
	},

	created() {
		this.id = this.$route.params.id;
		this.getCommentData(this.id);
		this.changBg();
		if (this.$root.islock) {
			this.imgArr = require('../assets/xiaokonglong.jpeg');
		}
	},

	methods: {
		wait() {
			this.$toast('无更多内容');
		},
		
		mounted() {
			window.document.documentElement.setAttribute('data-theme', 'dark');
		},
		
		pinglun(index) {
			this.show = true;
			this.index = index;
		},
		getReply() {
			if (this.$root.islock) {
				let reply = {
					author: this.$root.username,
					content: this.reply,
					avatar: require('../assets/picture.png'),
					time: Math.round(new Date() / 1000),
					reply_to: {
						content: this.commentData[this.index].content,
						status: 0,
						id: this.commentData[this.index].id,
						author: this.commentData[this.index].author
					},
					id: '34003135',
					likes: 66,
				};
				this.commentData.unshift(reply);
				this.commentDatalen = this.commentData.length + '条评论';
			} else {
				this.$toast('请先登录再进行评论');
			}
		},

		giveZan(index) {
			if (this.$root.islock) {
				if (this.activeInde) {
					this.index = this.commentData[index].likes + 1;
					this.commentData[index].likes = this.lik;
					let zimg = document.querySelectorAll('.zan-img')[index];
					zimg.src = require('../assets/zan0.png');
					this.activeInde = false;
					return;
				} else {
					this.lik = this.commentData[index].likes - 1;
					tthis.commentData[index].likes = this.lik;
					let zimg = document.querySelectorAll('.zan-img')[index];
					zimg.src = require('../assets/zan.png');
					this.activeIndex = 1;
					this.activeIndex = true;
					return;
				}
			} else {
				this.$toast('登录后再点赞');
			}
		},

		changBg() {
			if (!this.$root.draklin) {
				window.document.documentElement.setAttribute('data-theme', 'dark');
			} else {
				window.document.documentElement.setAttribute('data-theme', 'light');
			}
		},
		
		getCommentData(id) {
			this.axios({
				method: 'get',
				url: 'https://apis.netstart.cn/zhihudaily/story/' + id + '/short-comments'
			}).then(result => {
					this.commentData = result.data.comments;
					this.commentDatalen = this.commentData.length + '条评论';
					for (let i = 0; i < this.commentData.length; i++) {
						let date = this.commentData[i].time;
						date = new Date(date * 1000);
						let y = date.getFullYear();
						let m = date.getMonth() + 1;
						let d = date.getDate();
						let h = date.getHours();
						let minute = date.getMinutes();
						let s = date.getSeconds();
						m = m < 10 ? '0' + m : m;
						d = d < 10 ? '0' + d : d;
						h = h < 10 ? '0' + h : h;
						minute = minute < 10 ? '0' + minute : minute;
						let Mun = y + '-' + m + '-' + d + '-' + h + '-' + minute + '-' + s;
						this.time.push(Mun);
					}
				}).catch(err => {});
		},

		showMean() {
			if (this.$root.islock) {
				this.imgArr = require('../assets/picture.png');
				let mean = {
					author: this.$root.username,
					avatar: require('../assets/picture.png'),
					content: this.meaning,
					id: '34003135',
					likes: 66,
					time: parseInt(new Date().getTime() / 1000),
				};
				this.commentData.unshift(mean);
				for (let i = 0; i < this.commentData.length; i ++) {
					let date = this.commentData[i].time;
					var to = new Date(date * 1000);
					var month = to.getMonth() + 1;
					var hour = to.getHours();
					var minutes = to.getMinutes();
					var strDate = to.getDate();
					minutes = minutes < 10 ? "0" + minutes : minutes;
					strDate = strDate < 10 ? "0" + strDate : strDate;
					hour = hour < 10 ? "0" + hour : hour;
					month = month < 10 ? "0" + month : month;
					let Mun = month + "-" + strDate + " " + hour + ":" + minutes;
					this.time.push(Mun);
				}
				this.commentDatalen = this.commentData.length + '条评论';
			} else {
				this.$toast('请先登录再进行评论');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	@import  '../assets/scss/common/common.scss';
	.huif {
	  position: absolute;
	  bottom: 10px;
	  right: 5px;
	  font-size: 14px;
	}
	
	.inp {
	  padding: 10px 5px;
	  width: calc(100% - 5px);
	  background: none;
	  outline: none;
	  border: none;
	}
.fbpl {
	background-color: #e8e8e8;
	position: fixed;
	align-items: center;
	bottom: 0;
	left: 0;
	padding: 10px 10px;
	display: flex;
	width: calc(100% - 20px);
	.head-img {
		width: 30px;
		height: 30px;
		img {
			border-radius: 50%;
		}
	}
	.pl-text {
		margin-left: 5px;
		.inp-text {
			padding: 10px 0;
			background: none;
			outline: none;
			border: none;
		}
	}
	.dianp {
		position: absolute;
		right: 10px;
		color: rgb(39, 154, 231);
		font-size: 14px;
	}
}

/deep/ .van-icon {
	color: #000;
	font-size: 20px;
}
.replyto {
	margin: 10px 0;
	font-size: 12px;
	color: #999;
}
.mar {
	margin-top: 62px;
}
.shul {
	line-height: 20px;
	box-sizing: border-box;
	padding-top: 4px;
}
.comment-box {
	display: flex;
	padding: 15px;
	position: relative;
	border-top: 1px solid #e9e9e9;
	.comment-title {
		font-size: 12px;
	}
	.dian {
		position: absolute;
		right: 20px;
		top: 0;
		font-size: 20px;
		color: #666;
	}
	.comment-img {
		width: 30px;
		height: 30px;
		margin-right: 5px;
		img {
			border-radius: 50%;
		}
	}
	.comment-content {
		margin-left: 5px;
		flex: 2;
		padding-right: 10px;
	}
	.content-font {
		position: absolute;
		right: 20px;
		bottom: 10px;
	}
	.tubiao {
		display: flex;
	}
	.time {
		margin-top: 10px;
	}
	.comment-name {
		margin-bottom: 5px;
	}
	.zan {
		width: 20px;
		height: 20px;
		padding-right: 10px;
		padding-left: 5px;
	}
	.pl {
		width: 20px;
		height: 20px;
		padding: 0 0 0 10px;
	}
}

.comment-count {
	position: absolute;
	top: 45px;
	left: 15px;
}
</style>
