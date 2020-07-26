<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">充值金额：</text>
			<input class="input" type="text" v-model="money" placeholder="请输入充值金额" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">支付金额</text>
			<text style="color: rgb(241, 111, 93);">{{money == 0 ? '0':parseFloat(money)}}元</text>
		</view>
		<button class="add-btn" @click="recharge(id)">立即充值</button>
		<view v-if="is_active==false"></view>
		<view v-else class="activity">
			充值活动充{{reached}}元，送{{give}}元
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: 0,
				reached: null,
				give: null,
				is_active: null,
				id: null
			}
		},
		onLoad(options) {
			// console.log(options);
			this.id = options.id;
			this.$api.auth.giftsList().then(data => {
				// console.log(data)
				this.reached = data.reached;
				this.give = data.give;
				this.is_active = data.is_active;
			})
		},
		computed: {},
		methods: {
			recharge(id) {
				console.log(id);
				let money = parseFloat(this.money);
				let type = 1;
				this.$api.auth.recharge(money, id, type).then(data => {
					console.log(data);
					this.$api.msg(data.msg);
					this.$api.wePay(data.data);
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 190upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 510upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: rgb(129, 186, 87);
		border-radius: 50upx;
		box-shadow: 1px 2px 5px rgba(129, 186, 87, .5);
	}

	.activity {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 510upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: rgb(151, 122, 91);
		background-color: rgb(241, 235, 223);
		border-radius: 20upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
