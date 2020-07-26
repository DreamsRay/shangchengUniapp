<template>
<view>
	<view v-if="goodsList == ''">
		无内容
	</view>
	<view v-else class="guess-section">
		<view class="guess-item" v-for="(good, i) in goodsList" :key="i">
			<view class="image-wrapper" @click="navToDetailPage(good)">
				<image :src="good.cover[0].image" mode="aspectFill"></image>
			</view>
			<text class="good-name">{{good.name}}</text>
			<view class="goods-price">
				<view class="">
					<text class="price">￥{{good.price}}</text>
					<text class="fake-price">￥{{good.fake_price}}</text>
				</view>
				<view class="" @click="changeMyCarts(good.id)">
					<image src="/static/temp/index/shopping.png" style="width: 30px;height: 30px;" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</view>
</template>
<script>
	export default {
		data() {
			return {
				goodsList:{}
			}
		},
	onLoad(options) {
		// let searchs=JSON.parse(decodeURIComponent(options.search));
		let search = options.search;
		this.$api.commodity.Goods(search).then(data => {
			this.goodsList = data.results
		})
	},
	methods:{
		navToDetailPage(item) {
			//测试数据没有写id，用title代替
			// let id = item.title;
			console.log(item);
			let product = encodeURIComponent(JSON.stringify(item));
			// let id = item.id;
			uni.navigateTo({
				url: `/pages/product/product?product=${product}`
			})
		},
		changeMyCarts(item){
			this.$api.account.editMyCart(item, 1).then(data=>{
				this.$api.msg('添加成功');
			});
		},
	}
	}
</script>

<style lang="scss">
.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		margin-top: 20upx;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			margin-bottom: 20upx;
			background-color: #fff;
			border-radius: 10upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.price {
			font-size: $font-lg;
			font-weight: bold;
		}

		.fake-price {
			color: $font-color-light;
			text-decoration: line-through;
			line-height: 1;
			padding-left: 10rpx;
		}

		.goods-price {
			display: flex;
			justify-content: space-between;
			// align-items: center;
			padding: 10upx 15upx;
			font-size: 20rpx;
		}
	}

	.good-name {
		font-size: 32upx;
		color: rgb(102, 102, 102);
		line-height: 80upx;
		padding: 0 15upx;
	}

	.yticon {
		background-color: rgb(145, 204, 109);
		color: #fff;
	}
</style>
