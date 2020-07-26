<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">收货人姓名</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">联系方式</text>
			<input class="input" type="number" v-model="addressData.phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.address" placeholder="收货人地址" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" :disabled="!infoChecked" @click="confirm">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressData: {
					name:null,
					phone:null,
					address:null,
				},
			}
		},
		onLoad(options){
			if(options.address){
				this.addressData = JSON.parse(decodeURIComponent(options.address));
			}
		},
		computed:{
			infoChecked(){
				return (this.addressData.name)&&(this.addressData.phone)&&(this.addressData.address) ? true: false;
			}
		},
		methods: {			
			//提交
			confirm(){
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.addressData.phone)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if (this.addressData.id){
					this.$api.account.editAddress(this.addressData).then(data=>{
							uni.redirectTo({
								url: '/pages/address/addressManager'
						})
					})	
				}else{
					this.$api.account.addAddress(this.addressData).then(data=>{
							uni.redirectTo({
								url: '/pages/address/addressManager'
						})
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 190upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background: rgb(129, 186, 87);
		border-radius: 10upx;
		// box-shadow: 1px 2px 5px rgba(129, 186, 87, 0.5);
	}
</style>
