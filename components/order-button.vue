<template>
	<view class="action-box b-t">
		<button class="action-btn" @click="cancelOrder">取消订单</button>
		<button class="action-btn recom" @click="ChoseType">立即支付</button>
		<uni-popup ref="popup" type="bottom">
			<view class="pay-type-list">
				<view class="type-item b-b" @click="changePayType(1)">
					<text class="icon yticon icon-weixinzhifu"></text>
					<view class="con">
						<text class="tit">微信支付</text>
					</view>
					<label class="radio">
						<radio value="" color="#fa436a" :checked='payType == 1' />
						</radio>
					</label>
				</view>
				<!-- <view class="type-item" @click="changePayType(2)">
					<text class="icon yticon icon-erjiye-yucunkuan"></text>
					<view class="con">
						<text class="tit">账号余额支付</text>
					</view>
					<label class="radio">
						<radio value="" color="#fa436a" :checked='payType == 2' />
						</radio>
					</label>
				</view> -->
			</view>

			<text class="mix-btn" @click="confirm">确认支付</text>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		props: {
			orderId: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				payType: null
			}
		},
		methods: {
			cancelOrder() {
				this.$api.payment.closeOrder(this.orderId).then(data => {
					this.$emit("returnDate", data);
					uni.showToast({
						title: '订单已关闭',
						duration: 2000
					});
					uni.switchTab({
						url: '../order/order'
					})
				})
			},
			ChoseType(item) {
				this.$refs.popup.open();
			},
			changePayType(type) {
				this.payType = type;
			},
			confirm() {
				if (this.payType == 1) {
					this.$api.payment.payOrder(1, this.orderId).then(data => {
						console.log(data)
						this.$api.wePay(data.data);
						this.$refs.popup.close();		
					})
				} else if (this.payType == 2) {
					this.$api.payment.payOrder(2, this.orderId).then(data => {
						console.log(this.orderId)
						if (data.success) {
							// uni.showToast({
							// 	title: '支付成功',
							// 	duration: 2000
							// });
							this.$emit("returnDate", data);
							this.$refs.popup.close();
								uni.switchTab({
									url: '../order/order'
								})
							
						} else {
							this.$emit("returnDate", data);
							// uni.showToast({
							// 	title: '余额不足',
							// 	duration: 2000
							// });
							this.$refs.popup.close();
								uni.switchTab({
									url: '../order/order'
								})
					
						}
					})
				} else {
					this.$api.msg('请选择支付方式')
				}
			}
		}
	}
</script>

<style lang="scss">
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
			width: 100upx;
			font-size: 52upx;
		}

		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}

		.icon-weixinzhifu {
			color: #36cb59;
		}

		.icon-alipay {
			color: #01aaef;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background: rgb(103, 172, 63);
		box-shadow: 1px 2px 5px rgba(102, 102, 102, 0.5);
		border-radius: 10upx;
	}

	.action-box {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100upx;
		position: relative;
		padding-right: 30upx;
	}

	.action-btn {
		width: 160upx;
		height: 60upx;
		margin: 0;
		margin-left: 24upx;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: $font-sm + 2upx;
		color: #FFFFFF !important;
		background: rgb(202, 164, 114) !important;
		border-radius: 100px;

		&:after {
			border-radius: 100px;
		}

		&.recom {
			background: rgb(103, 172, 63) !important;

			&:after {
				border-color: #f7bcc8;
			}
		}
	}
</style>
