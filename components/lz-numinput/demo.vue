<template>
	<view>
		<view class="lz-col">
			<view class="lz-space--md"></view>
			<text class="lz-h--lg"> 数字调节输入 </text>
			<view class="lz-space--md"></view>
		</view>


		<view class="lz-section">
			<view class="lz-form-row lz-bd--b">
				<text class="lz-form__label">默认</text>
				<view class="lz-form__item">
					<view class="lz-row lz-jc--end">
						<view style="width:300upx;">
							<lz-numinput @change="onChange" inputName="FIELD1" :value="1" >
							</lz-numinput>
						</view>

					</view>

				</view>
			</view>
			<view class="lz-form-row lz-bd--b">
				<text class="lz-form__label">可输入数值</text>
				<view class="lz-form__item">
					<view class="lz-row lz-jc--end">
						<view style="width:300upx;">
							<lz-numinput @change="onChange"  :inputEnabled="true" inputName="FIELD2" :value="1" >
							</lz-numinput>
						</view>

					</view>
				</view>
			</view>
			<view class="lz-form-row lz-bd--b">
				<text class="lz-form__label">设置 参数</text>
				<view class="lz-form__item">
					<view class="lz-row lz-jc--end">
						<view style="width:300upx;font-size: 72upx;">
							<lz-numinput @change="onChange"  inputName="FIELD3" :inputEnabled="true" :value="value" :step="0.8" :min="min" :max="max" :toFixed="2">
							</lz-numinput>
						</view>

					</view>

				</view>
			</view>
			<view class="lz-form-row lz-bd--b">
				<text class="lz-form__label">实心按钮</text>
				<view class="lz-form__item">
					<view class="lz-row lz-jc--end">
						<view style="width:300upx;font-size: 72upx;">
							<lz-numinput @change="onChange"  :value="1" btnTheme="1" :step="1" :min="0" :max="7">
							</lz-numinput>
						</view>

					</view>

				</view>
			</view>
			<view class="lz-form-row lz-bd--b">
				<text class="lz-form__label">镂空按钮</text>
				<view class="lz-form__item">
					<view class="lz-row lz-jc--end">
						<view style="width:300upx;font-size: 72upx;">
							<lz-numinput :value="1" btnTheme="2" :step="1" :min="0" :max="7">
							</lz-numinput>
						</view>

					</view>

				</view>
			</view>
			<view class="lz-form-row lz-bd--b">
				<text class="lz-form__label">按钮 - 小圆角</text>
				<view class="lz-form__item">
					<view class="lz-row lz-jc--end">
						<view style="width:300upx;font-size: 72upx;">
							<lz-numinput :value="1" btnTheme="1" skin="1" :step="1" :min="0" :max="7">
							</lz-numinput>
						</view>

					</view>

				</view>
			</view>
			<view class="lz-form-row lz-bd--b">
				<text class="lz-form__label">按钮 - 圆形</text>
				<view class="lz-form__item">
					<view class="lz-row lz-jc--end">
						<view style="width:300upx;font-size: 72upx;">
							<lz-numinput :value="1" btnTheme="2" skin="2" :step="1" :min="0" :max="7">
							</lz-numinput>
						</view>

					</view>

				</view>
			</view>
			<view class="lz-form-row lz-bd--b">
				<text class="lz-form__label">隐藏按钮 - 按钮不可操作时</text>
				<view class="lz-form__item">
					<view class="lz-row lz-jc--end">
						<view style="width:300upx;font-size: 72upx;">
							<lz-numinput :value="1" btnTheme="1" skin="2" :step="1" :min="0" :max="7" :hideBtnDisabled="true">
							</lz-numinput>
						</view>

					</view>

				</view>
			</view>
			<view class="lz-form-row lz-bd--b">
				<text class="lz-form__label">隐藏数字 0 - 和 按钮 （一般用于快速购买商品）</text>
				<view class="lz-form__item">
					<view class="lz-row lz-jc--end">
						<view style="width:300upx;font-size: 72upx;">
							<lz-numinput :value="0" btnTheme="2" skin="2" :step="1" :min="0" :max="7" :hideBtnDisabled="true" :hideNumZero="true">
							</lz-numinput>
						</view>

					</view>

				</view>
			</view>
			<view class="lz-form-row lz-bd--b">
				<text class="lz-form__label">自定义按钮、输入域样式</text>
				<view class="lz-form__item">
					<view class="lz-row lz-jc--end">
						<view style="width:300upx;font-size: 72upx;">
							<lz-numinput :value="1" btnStyle="color:#00cc33;" inputStyle="color: #FF9900;border-bottom:1px solid #ccc" :step="1" :min="0" :max="7">
							</lz-numinput>
						</view>

					</view>

				</view>
			</view>
		</view>

	</view>
</template>
<script>
	import lzNuminput from './lz-numinput.vue';

	export default {
		components: {
			lzNuminput
		},

		data() {
			return {
				value: 1,
				min:0,
				max:3
			};
		},
		methods: {
			onChange(res) {
        
				console.log('返回数据',res);
			}
		}
	}
</script>
<style>
  @import './lzui-css/index.css';
</style>