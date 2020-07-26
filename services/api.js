import auth from './_auth.js';
import config from './_config.js';
import commodity from './_commodity.js';
import account from './_account.js';
import payment from './_payment.js';

const wePay = (orderData) => {
	uni.requestPayment({
		provider: 'wxpay',
		timeStamp: orderData.timeStamp,
		nonceStr: orderData.nonceStr,
		package: orderData.package,
		signType: orderData.signType,
		paySign: orderData.paySign,
		success(res) {
			console.log(JSON.stringify(res));
			uni.showToast({
				title: '支付成功',
				duration: 2000
			})
			uni.switchTab({
				url: '../order/order'
			})
		},
		fail(err) {
			console.log(JSON.stringify(err));
		}
	})
}

const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

export default {
	auth,
	config,
	commodity,
	account,
	payment,
	msg,
	wePay,
}
