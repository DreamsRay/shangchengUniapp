<template>
	<view>
		<view class="txt"><text class="txt-title">{{article.title}}</text></view>
		<view class="txt"><text class="txt-date">{{article.created_at}}</text></view>
		<view class="txt"><text class="txt-content">{{article.content}}</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: {}
			};
		},
		async onLoad(options) {
			this.article = JSON.parse(decodeURIComponent(options.article));
		}
	}
</script>

<style lang="scss">
	.txt {
		margin: 30upx 20upx;

		.txt-title {
			font-weight: bold;
		}

		.txt-date {
			font-size: 25upx;
			color: rgb(143, 143, 143);
		}

		.txt-content {
			color: rgb(143, 143, 143);
		}
	}
</style>
