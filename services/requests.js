/**
 * @typedef {Object} ApiResponse
 * @property {Boolean} success 
 * @property {Object} data 
 * @property {int} error 
 * @property {String} msg 
 */
 
// const DOMAIN = 'http://47.98.34.221:8080/';
const DOMAIN = 'https://staging-kiwi.cincore.com/';
let _get = (url, data, showError = true) => {
    const token = uni.getStorageSync('auth_token');
    return new Promise((resolve, reject) => {
        uni.request({
            url: DOMAIN + url,
            method: 'GET',
            data: data,
            header: {
                Authorization: token ? 'JWT ' + token : ''
            }
        }).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
            var [error, res] = data;
            if (res.statusCode >= 400) {
                if (res.statusCode >= 400 && res.statusCode < 500) {
                    uni.setStorageSync('auth_token', null);
                }
                showError && uni.showToast({
                    icon: 'none',
                    title: '数据请求错误！| ' + res.statusCode,
                    duration: 3000
                })
                reject(res);
            }
            resolve(res.data);
        });
    })
}

let _post = (url, data, showError = true) => {
    const token = uni.getStorageSync('auth_token');
    return new Promise((resolve, reject) => {
        uni.request({
            url: DOMAIN + url,
            method: 'POST',
            data: data,
            header: {
                Authorization: token ? 'JWT ' + token : ''
            }
        }).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
            var [error, res] = data;
            if (res.statusCode >= 400) {
                if (res.statusCode >= 400 && res.statusCode < 500) {
                    uni.setStorageSync('auth_token', null);
                }
                showError && uni.showToast({
                    icon: 'none',
                    title: '数据请求错误！| ' + res.statusCode,
                    duration: 3000
                })

                reject(res);
            }
            resolve(res.data);
        });
    })
}

let post = (url, data, showError = true) => {
    const token = uni.getStorageSync('auth_token');
    return uni.request({
        url: DOMAIN + url,
        method: 'POST',
        data: data,
        header: {
            Authorization: token ? 'JWT ' + token : '',
            'content-type': 'application/json'
        }
    }).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
        var [error, res] = data;
        if (res.statusCode >= 400) {
            if (res.statusCode == 401) {
                uni.setStorageSync('auth_token', null);
            }

            showError && uni.showToast({
                icon: 'none',
                // title: '数据请求错误!| ' + res.statusCode,
				title: '用户未授权,请点击授权登录！',
                duration: 1000
            })
            console.log("ReqErr: " + res.statusCode, "ShowErr: " + showError, res.data);
            return {
                success: false,
                data: res.data,
                error: res.statusCode
            };
        }
        return {
            success: true,
            data: res.data
        };
    });
}
let put = (url, data, showError = true) => {
    const token = uni.getStorageSync('auth_token');
    return uni.request({
        url: DOMAIN + url,
        method: 'PUT',
        data: data,
        header: {
            Authorization: token ? 'JWT ' + token : '',
            'content-type': 'application/json'
        }
    }).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
        var [error, res] = data;
        if (res.statusCode >= 400) {
            if (res.statusCode == 401) {
                uni.setStorageSync('auth_token', null);
            }

            showError && uni.showToast({
                icon: 'none',
                title: '数据请求错误！| ' + res.statusCode,
                duration: 3000
            })
            console.log("ReqErr: " + res.statusCode, "ShowErr: " + showError, res.data);
            return {
                success: false,
                data: res.data,
                error: res.statusCode
            };
        }
        return {
            success: true,
            data: res.data
        };
    });
}
let del = (url, showError = true) => {
    const token = uni.getStorageSync('auth_token');
    return uni.request({
        url: DOMAIN + url,
        method: 'DELETE',
        header: {
            Authorization: token ? 'JWT ' + token : '',
            'content-type': 'application/json'
        }
    }).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
        var [error, res] = data;
        if (res.statusCode >= 400) {
            if (res.statusCode == 401) {
                uni.setStorageSync('auth_token', null);
            }

            showError && uni.showToast({
                icon: 'none',
                title: '数据请求错误！| ' + res.statusCode,
                duration: 3000
            })
            console.log("ReqErr: " + res.statusCode, "ShowErr: " + showError, res.data);
            return {
                success: false,
                data: res.data,
                error: res.statusCode
            };
        }
        return {
            success: true,
            data: res.data
        };
    });
}
/**
 * Send Get request
 * @param {String}  url - Url地址
 * @param {Object} data 
 * @param {Boolean} showError 
 * @return {Promise} response
 */
let get = (url, data, showError = true) => {
    const token = uni.getStorageSync('auth_token');
    return uni.request({
        url: DOMAIN + url,
        method: 'GET',
        data: data,
        header: {
            Authorization: token ? 'JWT ' + token : ''
        }
    }).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
        var [error, res] = data
        if (res.statusCode >= 400) {
            if (res.statusCode == 401) {
                uni.$emit('commit', 'logout')
            }
            showError && uni.showToast({
                icon: 'none',
                // title: '数据请求错误！| ' + res.statusCode,
				title: `您还未授权，请前往“我的”页面授权登录！`,
                duration: 3000,
            })
            console.log("ReqErr: " + res.statusCode, "ShowErr: " + showError, res.data);
            return {
                success: false,
                data: res.data,
                error: res.statusCode
            };
        }
        return {
            success: true,
            data: res.data
        };
    });
}

let upload = (url, name, filepath, showError=true) => {
    const token = uni.getStorageSync('auth_token');
    return uni.uploadFile({
        url: DOMAIN + url, 
        filePath: filepath,
        header: {
            Authorization: token ? 'JWT ' + token : ''
        },
        name: name
    }).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
        var [error, res] = data;
        if (res.statusCode >= 400) {
            if (res.statusCode == 401) {
                uni.$emit('commit', 'logout')
            }
            showError && uni.showToast({
                icon: 'none',
                title: '数据请求错误！| ' + res.statusCode,
                duration: 3000
            })
            console.log("ReqErr: " + res.statusCode, "ShowErr: " + showError, res.data);
            return {
                success: false,
                data: res.data,
                error: res.statusCode
            };
        }
        return {
            success: true,
            data: res.data
        };
    });
}
let page = (url,showError = true) => {
    const token = uni.getStorageSync('auth_token');
    return uni.request({
        url: url,
        method: 'GET',
        header: {
            Authorization: token ? 'JWT ' + token : ''
        }
    }).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
        var [error, res] = data;
        if (res.statusCode >= 400) {
            if (res.statusCode == 401) {
                uni.$emit('commit', 'logout')
            }
            showError && uni.showToast({
                icon: 'none',
                title: '数据请求错误！| ' + res.statusCode,
                duration: 3000
            })
            console.log("ReqErr: " + res.statusCode, "ShowErr: " + showError, res.data);
            return {
                success: false,
                data: res.data,
                error: res.statusCode
            };
        }
        return {
            success: true,
            data: res.data
        };
    });
}

export default {
	_get,
	put,
	del,
    get,
    post,
    upload,
	page,
};
