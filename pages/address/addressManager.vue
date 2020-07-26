<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index">
			<view class="wrapper" @click="checkAddress(item)">
				<view class="address-box">
					<text v-if="item.default" class="tag">默认</text>
					<text class="name">{{item.name}}</text>
					<text class="phone">{{item.phone}}</text>
				</view>
				<view class="u-box ">
					<text class="address">{{item.address}}</text>
				</view>
			</view>
			<view class="deleteAddress"><text class="yticon icon-bianji" style="padding: 0;" @click="editAddress(item)"></text>
				<text class="yticon icon-shanchu4" style="color: #909399;" @click="deleteAddress(item)"></text>
			</view>
		</view>
		<button class="add-btn" @click="addAddress()">新增地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source: 0,
				addressList: []
			}
		},
		onLoad() {
			this.loadData();
			if (!this.addressList) {
				uni.navigateTo({
					url: '/pages/address/address'
				})
			}
		},
		methods: {
			async loadData() {
				await this.$api.account.getAddress().then(data => {
					this.addressList = data
				})
			},
			//选择地址
			checkAddress(item) {
				this.$api.account.setDefualt(item.id).then(data => {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				});
			},
			addAddress() {
				uni.navigateTo({
					url: '/pages/address/address?type=add'
				})
			},
			editAddress(item) {
				let str = encodeURIComponent(JSON.stringify(item));
				uni.navigateTo({
					url: `/pages/address/address?address=${str}`
				})
			},
			deleteAddress(item) {
				this.$api.account.deleteAddress(item.id).then(data => {
					this.loadData()
				})
			}
		}
	}
</script>

<style lang='scss'>
	page {
		padding-bottom: 120upx;
	}
	.deleteAddress{
		display: flex;
		align-items: center;
		flex:2;
		justify-content: space-around;
	}
	.content {
		position: relative;
	}

	.list {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		;
		background: #fff;
		position: relative;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 8;
	}

	.address-box {
		display: flex;
		align-items: flex-end;

		.tag {
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}

		.address {
			font-size: 30upx;
			color: rgb(161, 161, 161);
			font-weight: bold;
		}
	}
	.phone{
		color: rgb(144, 147, 153);
		font-size: 20upx;
		font-weight: bold;
	}
	.name {
		margin-right: 25upx;
		font-weight: bold;
		color: rgb(66, 66, 66);
	}
	.u-box {
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
	}

	.icon-bianji {
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}

	.add-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background: rgb(129, 186, 87);
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(129, 186, 87, 0.5);
	}
</style>
