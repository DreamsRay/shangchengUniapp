import requests from './requests.js';
import store from '../store/index.js';

let login = (code,avatar,nickname) => {
    return requests.post('api/account/wx_auth/', {
     'code':code,
	 'avatar': avatar,
	 'nickname': nickname,
	 // 'union_id': union_id,
    }, false).then(({
        data,
        success,
        error
    }) => {
        if (success) {
            uni.setStorageSync('auth_token', data.access);
            let auth_token = uni.getStorageSync('auth_token');
            console.log('Login Successful');
            return {
                success: true
            }
        } else {
            if (error == 400) {
                uni.showToast({
                    icon: 'none',
                    title: '数据错误！| ' + error,
                    duration: 3000
                })
            } else if (error == 401) {
                uni.showToast({
                    icon: 'none',
                    title: '用户名密码错误',
                    duration: 3000
                })
            } else {
                uni.showToast({
                    icon: 'none',
                    title: '数据请求错误 | ' + error,
                    duration: 3000
                })
            }
            return {
                sucess: false
            }
        }

    })
}

let identify = () => {
    // console.log('identifying');
    // uni.$emit('commit', 'changeUsername', {
    //     username: 'updating'
    // });
    return requests.get('api/account/profiles/', {}, false).then(({
        data,
        success
    }) => {
        // success && uni.$emit('commit', 'login', data);
        return data.results[0];
    })

}

let giftsList = () => {
    return requests.get('api/config/gifts/', {}, false).then(({
        data,
        success
    }) => {
        return data.results[0];
    })

}
let recharge = (money, id , type) => {
    return requests.post('api/account/wx_recharge/', {
        money,
        id,
		type
    }, true).then(({
        data
    }) => {
        return data;
    })
}
let finances = () => {
    return requests.get('api/account/finances/', {}, false).then(({
        data,
		success
    }) => {
        return data;
    })
}
export default {
    login,
    identify,
	giftsList,
	recharge,
	finances
}
