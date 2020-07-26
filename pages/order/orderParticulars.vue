<template>
	<view>
		<view class="goods-section">
			<!-- 商品列表 -->
			<view class="g-item">
				<image :src="orderData.data.ProductVO.ImageFixWidthUrl"></image>
				<view class="right">
					<text class="title clamp">{{orderData.data.ProductVO.Name}}</text>
					<view class="price-box">
						<view>
							<text class="prices">￥{{orderData.data.Price/100}}</text>
							<text class="fake-price">￥{{orderData.data.OriginalPrice/100}}</text>
						</view>
						<view>
							<text class="price">￥{{orderData.data.Price/100}}</text>
							<!-- <text class="price">x {{orderData.Price}}</text> -->
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip">￥{{orderData.data.Price/100}}</text>
			</view>
			<!-- <view class="yt-list-cell b-b">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">-￥{{orderData.discount}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip" v-if="orderData.freight">￥ {{orderData.freight}}</text>
				<text class="cell-tip" v-else>免运费</text>
			</view> -->
			<!-- 			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view> -->
		</view>
		<!-- 地址 -->
		<!-- <view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">收货地址</text>
				<text class="cell-tip">{{orderData.receive_address}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">收货人</text>
				<text class="cell-tip">{{orderData.receive_name}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">电话</text>
				<text class="cell-tip">{{orderData.receive_phone}}</text>
			</view>
		</view> -->

		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单号</text>
				<text class="cell-tip">{{orderData.data.ReceiptNo}}</text>
			</view>
			<!-- <view class="yt-list-cell b-b">
				<text class="cell-tit clamp">下单时间</text>
				<text class="cell-tip">{{orderData.created_at}}</text>
			</view> -->
		</view>
		<button v-if="loginStatus == true" type="default" style="color: #FFFFFF;background-color: rgb(217, 178, 143);width: 90%;margin-top: 10px;"
		 @getuserinfo="appLoginWx(orderData)" open-type="getUserInfo">授权</button>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{orderData.data.Price/100}}</text>
			</view>
			<!-- <orderBtn @returnDate="returnDate" :orderId="orderData.data.id"></orderBtn> -->
			<view class="payment-btn">
				<button v-if="loginStatus !== true" style="border-radius: 23px;background-color: rgb(217, 178, 143);width: 80px;" type="default" @click="payment(orderData)">去支付</button>
				
			</view>
		</view>
	</view>
</template>

<script>
	import orderBtn from "@/components/order-button.vue";
	import Url from 'url-parse';
	export default {
		components: {
			orderBtn,
		},
		data() {
			return {
				payType: 1, //1微信 2支付宝
				orderData:{} ,
				loginStatus: null,
			}
		},
		onLoad(options) {
			if (options.data) {
			 const data = JSON.parse(decodeURIComponent(options.data));
			 this.orderData = data;
			 }
		},
		onShow() {
		},
		methods: {
			payment(e){
				console.log(e,1);
				let data = e
				this.$api.payment.orderPay(data).then(res=>{
					console.log(Object.values(res)[0],2);
					console.log(JSON.stringify(res),3);
					if (Object.values(res)[0] === '身份认证信息未提供。'){
						this.loginStatus = true
					}else if(Object.values(res)[0] == false){
						uni.showToast({
							title: "商城没有该商品",
							icon: "none"
						});
					}else{		
						let id = res.data.id;
						uni.navigateTo({
							url: `/pages/order/orderDetail?id=${id}`
						})
					};
				})
			},
			appLoginWx(e) {
				let data = encodeURIComponent(JSON.stringify(e));
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
												uni.navigateTo({
													url: `/pages/order/orderParticulars?data=${data}`
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
			// checkToken() {
			// 		uni.getSetting({
			// 			success(res) {
			// 				console.log("授权：", res);
			// 				if (!res.authSetting['scope.userInfo']) {
			// 					//这里调用授权
			// 					console.log("当前未授权");
			// 					uni.navigateTo({
			// 						url: '../auth/orderAuth'
			// 					})
			// 				} else {
			// 					//用户已经授权过了
			// 					console.log("当前已授权");
			// 				}
			// 			}
			// 		})},
			returnDate(e) {
				if (e.success) {
					this.$api.msg(e.msg)
					this.loadData(id)
				} else {
					this.$api.msg(e.msg)
					this.loadData(id)
				}
			},
			loadData(id) {
				this.$api.payment.getOrder(id).then(data => {
					this.orderData = data
					this.orderData.discount = 0
					this.orderData.order_goods.forEach(item => {
						this.orderData.discount += (item.fake_price - item.price)
					})
				})
			},
			//显示优惠券面板
			toggleMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type) {
				this.payType = type;
			},
			submit() {
				uni.redirectTo({
					url: '/pages/money/pay'
				})
			},
			stopPrevent() {}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}
	.payment-btn{
		padding-right: 30rpx;
	}
	.payment-btn>button{
		color: #FFFFFF;
		background-color: rgb(129, 186, 87);
	}
	.fake-price {
		text-decoration: line-through;
		color: rgb(144, 147, 153);
		font-size: 20upx;
		padding-left: 10upx;
	}
	.prices{
		font-size: 32rpx;
		font-weight: bold;
	}
	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			padding: 10upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}

			.title {
				font-size: 30upx;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				justify-content: space-between;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}

				.number {
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}

	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}

		.tit {
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: $base-color;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: $base-color;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
		}
	}

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: $font-color-light;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: $base-color;

			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}
</style>
