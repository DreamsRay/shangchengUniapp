<template>
	<view class="content-height">
		<mSearch @search="search($event, 0)"></mSearch>
		<view class="content">
			<uni-collapse accordion="true" class="left-aside">
				<uni-collapse-item :title="cate.name" v-for="cate in cateList" v-if="cate.children != null">
					<view style="padding: 30rpx;" v-for="(c,idx) in cate.children" @click="cateGoods(c.id,idx)" :class="idx==index ? 'color':''">
						{{c.name}}
					</view>
				</uni-collapse-item>
			</uni-collapse>
			<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
				<view v-for="(item,i) in goodsList" :key="item.id" class="s-list">
					<view class="g-item">
						<view class="i-item" @click="goods(item)">
							<image style="width: 70px;height: 70px;" :src="item.cover[0].image"></image>
						</view>
						<view class="d-item">
							<view class=""><text class="n-item">{{item.name}}</text></view>
							<view class="price">
								<view class="cart">
									<view class="item-price"><text>￥{{item.price}}</text></view>
									<view class="p-item"><text class="fake-item">￥{{item.fake_price}}</text></view>
								</view>
								<!-- <lc-number-box :value="getCart(item)" :min="0" :max="item.stock" :disabled="true" :step="1" @change="changeMyCarts($event,item)"></lc-number-box> -->

								<view class="" @click="changeMyCarts(item)">
									<image src="../../static/temp/index/shoppingCart.png" style="width: 20px;height: 20px;" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- <view class="order-sign">
				1_{{cartNum}}
			</view> -->
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
	import lcNumberBox from '@/components/lc-number-box/lc-numberBox.vue';
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			lcNumberBox,
			mSearch
		},
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				cateList: [],
				goodsList: [],
				myCarts: {},
				slist: [],
				index: 0,
				searchName: '',
			}
		},
		// onLoad() {
		// 	this.loadData();
		// },
		computed:{
			cartNum() {
				return this.$store.state.number
			}
		},
		onShow() {
			this.loadData();
			this.number = 0;
			this.$store.state.number = 0;
		},
		methods: {
			changeMyCarts(e) {
				this.number = 1;
				this.$api.account.editMyCart(e.id, this.number).then(data => {
					this.$store.commit('addNme',1);
					this.$api.msg('添加成功');
				});
				// 	this.$store.commit('addNme',1);
				// this.$api.account.editMyCart(good.id, e);
				// this.$api.msg('添加成功');	
			},
			async loadData() {
				await this.$api.commodity.getCate(666).then(data => {
					this.cateList = data
				})
				await this.$api.commodity.getGoods().then(data => {
					this.goodsList = data
				})
				this.loadCart()
			},
			async loadCart() {
				var obj = new Object()
				await this.$api.account.getMyCart().then(res => {
					res.forEach(item => {
						obj[item['goods_id']] = item['amount']
					})
					this.myCarts = obj
				});
			},
			getCart(good) {
				return this.myCarts.hasOwnProperty(good['id']) ? this.myCarts[good['id']] : 0
			},
			async cateGoods(cate_id, idx) {
				this.index = idx;
				this.goodsList = await this.$api.commodity.getGoods({
					'cate_id': cate_id
				});
			},
			//右侧栏滚动
			asideScroll(e) {
				if (!this.sizeCalcState) {
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item => item.top <= scrollTop).reverse();
				if (tabs.length > 0) {
					this.currentId = tabs[0].pid;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize() {
				let h = 0;
				this.slist.forEach(item => {
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			search(e, val) {
				this['val' + val] = e;
				uni.navigateTo({
					url: '/pages/search/search?search=' + e
				})
			}
		}
	}
</script>


<style lang='scss'>
	/* .lc-numberBox view:first-child{
		display: none;
	}
	.lc-number{
		display: none;
	} */
	page,

	.content,
	.content-height {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}

	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
	}

	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;

		&.active {
			color: $base-color;
			background: #f8f8f8;

			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside {
		flex: 1;
		overflow: hidden;
		padding: 20upx;
		background-color: rgb(255, 255, 255);
	}

	.s-item {
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}

	.t-list {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;

		&:after {
			content: '';
			flex: 99;
			height: 0;
		}
	}

	.t-item {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;

		image {
			width: 320upx;
			height: 320upx;
		}
	}

	.g-item {
		display: flex;
		margin: 10upx 0;

		.i-item {
			width: 28%;
		}

		.d-item {
			width: 70%;
			padding: 10px 5px;
		}

		.price {
			display: flex;
			justify-content: space-between;
		}

		.cart {
			display: flex;
			align-items: center;
			font-size: 25upx;
		}

		.d-item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.n-item {
			color: rgb(103, 103, 103);
		}

		.fake-item {
			text-decoration: line-through;
			color: rgb(103, 103, 103);
			font-size: 20rpx;
			padding-left: 10rpx;
		}
	}

	.color {
		color: rgb(242, 142, 54);
		border-left: 5px rgb(242, 142, 54) solid;
	}

	.item-price {
		font-weight: bold;
		font-size: 32upx;
	}
	.order-sign{
		position: fixed;
		bottom: 1%;
	}
</style>
