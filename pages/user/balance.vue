<template>
	<view class="">
		<view class="box">
			<view class="y-text">
				<image src="../../static/temp/index/balance.png" style="width: 20px;height: 20px;" mode=""></image>
				<text>账户余额</text>
			</view>
			<view class="m-text">
				<text>{{user.money}}</text>
				<!-- <view class="">
					<button type="default" style="border-radius: 40upx;background-color:rgb(213, 180, 129);" @tap="navToRecharge(user.user_id)">充值</button>
				</view> -->
			</view>
		</view>
		<hr>
		<view class="h-detail">
			<view style="border-bottom: 1px solid rgb(240, 240, 240);padding: 20upx 0;font-weight: bold;">明细</view>
			<view class="c-detail" v-for="(item, i) in details" :key="i">
				<view class="detail">
					<text>{{item.detail}}</text>
					<text class="created_at">{{item.created_at}}</text>
				</view>
				<view class="detail2">
					<text v-if="item.type == '支出'">-{{item.money}}</text>
					<text v-else style="color: rgb(250, 150, 60);">+{{item.money}}</text>
					<text class="t-detail">{{item.type}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				details:{},
				user:{}
			}
		},
		onLoad(options) {
			console.log(options);
			this.$api.auth.identify().then(data => {
				console.log(data)
				this.user = data;
			})
			this.$api.auth.finances().then(data => {
				console.log(data);
				this.details = data.results;
			})
		},
		methods:{
			navToRecharge(user_id) {
				console.log(user_id);
				let id = user_id;
				uni.navigateTo({
					url: `/pages/user/recharge?id=${id}`
				})
			},
		}
	}
</script>

<style>
	.box {
		height: 300upx;
		background-color: rgb(43, 42, 38);
		margin: 50upx 50upx;
		border-radius: 25upx;
		color: rgb(213, 180, 129);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.m-text {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.m-text>text:first-child {
		font-size: 100upx;
		font-weight: bold;
	}

	.y-text {
		display: flex;
		align-items: center;
		padding-left: 50upx;
	}

	.y-text>text:nth-child(2) {
		padding-left: 20upx;
	}

	hr {
		border-top: 20upx solid rgb(242, 242, 242);
	}

	.h-detail {
		padding: 20upx 20upx;
	}

	.detail {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.detail2 {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.t-detail {
		color: rgb(156, 156, 156);
	}

	.c-detail {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgb(240, 240, 240);
		padding: 20upx 0;
	}
	.created_at{
		font-size: 20upx;
		color: rgb(156, 156, 156);
	}
</style>
