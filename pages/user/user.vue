<template>
	<view class="container">

		<view class="user-section">
		</view>

		<view :style="[{
				transform: coverTransform,
				transition: coverTransition
			}]" @touchstart="coverTouchstart"
		 @touchmove="coverTouchmove" @touchend="coverTouchend">
			<view class="tj-sction">
				<view class="user-info-box">
					<view class="portrait-box">
						<image class="portrait" :src="user.avatar || '/static/missing-face.png'"></image>
					</view>
					<view style="color:rgb(196, 166, 153);text-align: center;">
						<!-- <text class="username">{{userInfo.nickname || '游客'}}</text> -->
						<text>{{user.nickname === undefined ? "无":user.nickname}}</text>
					</view>
				</view>
				<view style="color: rgb(251, 162, 83);margin: 10px 0;">
					<text>余额:</text>
					<text>￥{{user.money != undefined ? user.money : 0}}</text>
				</view>
				<view style="margin-bottom: 30px;">
					<!-- <button v-if="user.user_id != undefined" type="default" style="border-radius: 23px;background-color: rgb(217, 178, 143);width: 80px;"
					 @tap="navToRecharge(user.user_id)">充值</button> -->
					<button v-if="user.user_id == undefined" type="default" style="border-radius: 23px;background-color: rgb(217, 178, 143);width: 80px;"
					 @getuserinfo="appLoginWx" open-type="getUserInfo">登录</button>
				</view>
			</view>
			<!-- <view class="history-section icon">
				<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="联系客服"></list-cell>
				<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="手机号">11</list-cell>
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="余额明细" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
			</view> -->
		</view>
		<view class="section">
			<view class="service" @tap="navToBalance(user.user_id)">
				<image src="../../static/temp/index/order3.png" mode=""></image>
				<text>余额明细</text>
			</view>
			<view class="service" @click="relation">
				<image src="../../static/temp/index/service.png" mode=""></image>
				<text>联系客服</text>
			</view>
			<s-popup custom-class="demo-popup" position="bottom" v-model="visible">
				<image class="popup-img" src="../../static/temp/index/er.png" mode="" @longtap="getImg"></image>
				<view>联系客服：17624018886</view>
			</s-popup>
		</view>
	</view>
</template>
<script>
	import listCell from '@/components/mix-list-cell';
	import sPopup from '@/components/s-popup';
	import {
		mapState
	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell,
			sPopup,
		},
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				user: {},
				visible: false,
			}
		},
		onLoad() {
			this.checkToken();
		},
		onShow() {
			this.getuser();
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			getuser(){
				this.$api.auth.identify().then(data => {
					console.log(data)
					this.user = data;
				})
			},
			getImg() {
				uni.getImageInfo({
					src: '../../static/temp/index/er.png',
					success: function(image) {
						console.log('图片信息：', JSON.stringify(image));
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								console.log('save success');
								uni.showToast({
									title: '图片保存成功',
									icon: 'none',
									duration: 2200
								});
							}
						});
					}
				});
			},
			relation() {
				this.visible = true;
			},
			checkToken() {
				uni.getSetting({
					success(res) {
						console.log("授权：", res);
						if (!res.authSetting['scope.userInfo']) {
							//这里调用授权
							console.log("当前未授权");
						} else {
							//用户已经授权过了
							console.log("当前已授权");
						}
					}
				})
				// let token = uni.getStorageSync('auth_token');
				// if (token) {
				// 	uni.switchTab({
				// 		url: '../index/index'
				// 	})
				// }
			},
			appLoginWx() {
				var that = this;
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res) => {
									// _self.authorization = res.code;
									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => { //这里请求接口
											console.log(info);
											let code = res.code;
											let nickname = info.userInfo.nickName
											let avatar = info.userInfo.avatarUrl
											that.$api.auth.login(code, avatar, nickname);
											uni.switchTab({
												url: '../index/index'
											})
										},
										fail: () => {
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									})

								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none",
									});
								}
							})

						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navToRecharge(user_id) {
				console.log(user_id);
				let id = user_id;
				uni.navigateTo({
					url: `/pages/user/recharge?id=${id}`
				})
			},
			navToBalance(user_id) {
				console.log(user_id);
				let id = user_id;
				uni.navigateTo({
					url: `/pages/user/balance?id=${id}`
				})
			},
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},

			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}

				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
		}
	}
</script>
<style lang='scss'>
	.portrait-box{
		text-align: center;
	}
	page,
	.container {
		height: 100%;
		background-color: #f8f8f8;
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.section {
		margin-top: 100upx;
		background-color: rgb(255, 255, 255);
		padding: 0 50upx;
	}

	.service {
		height: 100upx;
		border-bottom: 2px solid rgb(248, 248, 248);
		display: flex;
		align-items: center;

		image {
			width: 50upx;
			height: 50upx;
		}

		text {
			padding-left: 10upx;
		}

		text:nth-child(3) {
			color: rgb(188, 188, 188);
			padding-left: 43%;
		}
	}

	.user-section {
		height: 450upx;
		background: url(../../static/temp/index/oval.png) no-repeat;
		background-size: 100% 400upx;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}

	.info-box {
		display: flex;
		justify-content: center;
	}

	.user-info-box {
		height: 180upx;
		position: relative;
		z-index: 1;
		margin-top: 60upx;
		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.username {
			display: block;
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			color: rgb(251, 162, 83);
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position: relative;
		padding-bottom: 20upx;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		bottom: -68upx;
		left: 5%;
		width: 680upx;
		height: 400upx;
		padding: 50upx 0;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: rgb(176, 176, 176);
			margin-bottom: 8upx;
		}
	}

	.order-section {
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius: 50upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}

	.demo-popup {
		text-align: center;
	}
	
	.demo-popup>view{
		padding: 120upx;
	}
	
	.popup-img {
		padding: 10px 0;
		width: 250px;
		height: 250px;
	}
	button::after{
		border: none !important;
	}
</style>
