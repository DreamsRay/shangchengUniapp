<template>
	<view class="container">
		<view class="address">
			<view class="wrapper" v-if="address">
				<image style="width: 30px;height: 30px;" src="../../static/temp/index/location.png" mode=""></image>
				<view style="padding-left: 10px;">
					<view>
						<text class="name">{{address.name}}</text>
						<text class="phone">{{address.phone}}</text>
					</view>
					<view>
						<text class="site">{{address.address}}</text>
					</view>
				</view>
			</view>
			<view>
				<text v-if="!address" @click="navToAddress" style="color: rgb(142, 176, 117);">选择地址</text>
				<text v-else @click="navToAddress" style="color: rgb(142, 176, 117);">修改地址</text>
			</view>
		</view>
		<view v-if="empty" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="empty" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="empty" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<hr style="height: 10px;background-color: rgb(250, 250, 250);">
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}">
						<view class="imageWrapper">
							<view class="yticon icon-xuanzhong2 checkbox" style="color: rgb(192, 196, 204); font-size: 20px;" :class="{checked: item.checked}"
							 @click="check('item', index)"></view>

							<image :src="item.goods.cover[0].image" :class="[item.loaded]" mode="aspectFill" lazy-load @load="onImageLoad('cartList', index)"
							 @error="onImageError('cartList', index)"></image>

						</view>
						<view class="item-right">
							<text class="clamp title">{{item.goods.name}}</text>
							<view class="number-box">
								<view>
									<text class="goods-price">¥{{item.goods.price}}</text>
									<text class="fake-price">¥{{item.goods.fake_price}}</text>
								</view>
								<view>
									<lc-number-box class="step" :value="item.amount" :min="0" :disabled="true" :step="1" :max="item.goods.stock" @change="changeMyCarts($event,item)"></lc-number-box>
								</view>
							</view>
						</view>
						<!-- <uni-number-box></uni-number-box> -->
						<!-- <text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text> -->
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image :src="allChecked?'/static/selected.png':'/static/select.png'" mode="aspectFit" @click="check('all')"></image>
					<!-- <view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						全选
					</view> -->
				</view>
				<view class="total-box">
					<text class="price">¥{{total}}</text>
					<text class="coupon">
						已优惠
						<text>{{discount}}</text>
						元
					</text>
				</view>
				<button class=" no-border confirm-btn" :disabled="orderCheck" @click="order">去结算</button>
			</view>
		</view>
		<!-- <mrhard-tabbar></mrhard-tabbar> -->
	</view>
</template>

<script>
	import lcNumberBox from '@/components/lc-number-box/lc-numberBox.vue';
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
	export default {
		components: {
			lcNumberBox,
			uniNumberBox
		},
		data() {
			return {
				address: null,
				total: 0, //总价格
				discount: 0,
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				orderGoods: []
			};
		},
		onShow() {
			this.loadData();
		},
		watch: {
			cartList(e) {
				this.empty = e.length === 0 ? true : false;
			},
		},
		computed: {
			orderCheck() {
				return this.orderGoods.length === 0 ? true : false;
			}
		},
		methods: {
			changeGoods() {
				let checklist = []
				this.cartList.forEach(item => {
					if (item.checked == true) {
						checklist.push(item.id)
					}
				})
				this.orderGoods = checklist
				console.log(this.orderGoods)
			},
			//请求数据
			async loadData() {
				let list = await this.$api.account.getMyCart();
				let cartList = list.map(item => {
					item.checked = true;
					this.orderGoods.push(item.id)
					return item;
				});
				await this.$api.account.getProfile().then(res => {
					this.address = res[0].default_address
				})
				this.cartList = cartList;
				this.calcTotal(); //计算总价
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToAddress() {
				uni.navigateTo({
					url: '/pages/address/addressManager'
				})
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.cartList[index].checked = !this.cartList[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.changeGoods()
				this.calcTotal(type);
			},
			//数量
			changeMyCarts(e, good) {
				this.$api.account.editMyCart(good.goods_id, e).then(res => {
					//每次进来都会触发change方法，待优化
					this.loadData();
					if(e == res.goods.stock){
						uni.showToast({
						    title: '库存不足',
						    duration: 2000
						});
					}
				});
			},
			//删除
			deleteCartItem(index) {
				this.$api.account.editMyCart(this.cartList[index].goods_id, 0).then(res => {
					this.loadData();
				});
				uni.hideLoading();
			},
			//全选按钮
			//该按钮有bug，需优化
			clearCart() {
				this.cartList.forEach(item => {
					item.checked = false;
				})
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let discount = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.goods.price * item.amount;
						discount += item.goods.fake_price * item.amount;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = parseFloat(total);
				// Number(total.toFixed(2));
				this.discount = parseFloat(discount) - this.total;
				// Number(discount.toFixed(2)) - this.total;
			},
			//创建订单
			order() {
				this.$api.account.createOrder(this.orderGoods).then(res => {
					if (res.success) {
						uni.navigateTo({
							url: '/pages/order/orderDetail?id=' + res.order
						})
					} else {
						this.$api.msg(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	.lc-numberBox view:nth-child(3){
		color: #FFFFFF !important;
	}
	.wrapper {
		display: flex;
		align-items: center;
	}

	.name {
		margin-right: 25upx;
		font-weight: bold;
		color: rgb(66, 66, 66);
	}

	.site {
		font-size: 25upx;
		color: rgb(117, 117, 117);
		font-weight: bold;
	}

	.phone {
		color: rgb(144, 147, 153);
		font-size: 20upx;
		font-weight: bold;
		padding-left: 10upx;
	}

	.address {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30upx 40upx;
	}

	.number-box {
		display: flex;
		justify-content: space-between;
	}

	.fake-price {
		text-decoration: line-through;
		color: rgb(153, 153, 153);
	}

	.container {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;

				.navigator {
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 30upx;

		.imageWrapper {
			width: 180upx;
			height: 130upx;
			display: flex;
			align-items: center;

			image {
				border-radius: 8upx;
				width: 100%;
				height: 100%;
				padding: 10upx 10upx;
			}
		}



		.item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			flex: 1;
			overflow: hidden;
			position: relative;

			.title,
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				font-size: $font-lg;
				color: $font-color-dark;
			}

			.coupon {
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: rgb(129, 186, 87);
			/* box-shadow: 1px 2px 5px rgba(129, 186, 87, 0.5); */
			color: #FFFFFF;
		}
	}
	.disabledBtn{
		background: red;
		box-shadow: 1px 2px 5px rgba(192, 196, 204, 0.5);
	}
	.goods-price{
		font-weight: bold;
	}
	
	.fake-price{
		font-size: 20rpx;
		padding-left: 10rpx;
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: rgb(86, 150, 44) !important;
	}
</style>
