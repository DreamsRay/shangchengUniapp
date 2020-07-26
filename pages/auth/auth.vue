<template>
	<view class="auth">
		<image src="../../static/wx.png" class="img" mode="aspectFill"></image>
		<view class="title">微信授权页面</view>
		<view class="describe">此页面是微信授权页面，点击下方按钮弹出授权或跳转页面</view>
		<button class="btn" @click="appLoginqx">取消</button>
		<button class="btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">{{loginInfo.openid != "" && loginInfo.openid != undefined ? "已授权" : "授权"}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			this.checkToken()
		},
		methods: {
			appLoginqx() {
				uni.switchTab({
					url: '../index/index'
				})
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
								uni.switchTab({
									url: '../index/index'
								})
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
											console.log(info, res);
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
		}
	}
</script>

<style>
	/* 开始 */
	page {
		height: 100%;
		display: table;
	}

	.auth {
		margin-top: 0;
		text-align: center;
		display: table-cell;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		padding: 100rpx;
		vertical-align: middle;
	}

	.img {
		border-radius: 50%;
		border: 1px solid #fff;
		background-color: #fff;
		margin: 0 0 60rpx;
		display: inline-block;
		width: 200rpx;
		height: 200rpx;
		line-height: 0;
	}

	.title {
		display: inline-block;
		width: 100%;
		margin: 0 0 60rpx;
	}

	.describe {
		color: #a7aaa9;
		font-size: 26rpx;
		margin: 0 0 60rpx;
		border-radius: 50%;
		text-align: center;
		display: inline-block;
		width: 100%;
	}

	.btn {
		padding: 0 60rpx;
		background-color: #19be6b;
		margin: 20rpx 10rpx 200rpx;
		text-align: center;
		vertical-align: middle;
		touch-action: manipulation;
		cursor: pointer;
		background-image: none;
		white-space: nowrap;
		user-select: none;
		font-size: 14px;
		border: 0 !important;
		position: relative;
		text-decoration: none;
		height: 44px;
		line-height: 44px;
		box-shadow: inset 0 0 0 1px #19be6b;
		background: #fff !important;
		color: #19be6b !important;
		display: inline-block;
		border-radius: 10rpx;
	}
</style>
