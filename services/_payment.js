import requests from './requests.js';
let getOrders = (status) => {
    return requests.get('api/automat/orders/', {
        'status':status
    }, true).then(({
        data
    }) => {
        return data;
    })
}
let getOrder = id => {
    return requests.get('api/automat/orders/'+id+'/', {
    }, true).then(({
        data
    }) => {
        return data;
    })
}
let closeOrder = id => {
    return requests.get('api/automat/orders/'+id+'/close/', {
    }, true).then(({
        data
    }) => {
        return data;
    })
}
let recharge = (method, amount) => {
    return requests.post('api/automat/orders/pay/', {
        method,
        amount,
    }, true).then(({
        data
    }) => {
        return data;
    })
}
let payOrder = (type, id) => {
    return requests.post('api/automat/orders/pay/', {
        type,
        id,
    }, true).then(({
        data
    }) => {
        return data;
    })
}

let orderPay = (order_pay) => {
    return requests.post('api/automat/orders/order_pay/', {
        order_pay,
    }, true).then(({
        data
    }) => {
        return data;
    })
}

export default {
	getOrders,
	getOrder,
	closeOrder,
	payOrder,
    recharge,
	orderPay
}
