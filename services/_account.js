import requests from './requests.js';

let getMyCart = () => {
	return requests.get('api/account/carts/',{}).then(({
	    data
	}) => {
	    return data
	})
}
let editMyCart = (id,amount) => {
	return requests.post('api/account/carts/',{
		'goods_id':id,
		'amount':amount
	}).then(({
	    data
	}) => {
	    return data
	})
}
let createOrder = (goodList) =>  {
	return requests.post('api/account/carts/order/',{
		'check_list':goodList
	}).then(({
	    data
	}) => {
	    return data;
	})
}
let getProfile = () => {
	return requests.get('api/account/profiles/',{}).then(({
	    data
	}) => {
	    return data.results;
	})
}
let addAddress = address => {
	return requests.post('api/account/addresses/',address).then(({
	    data
	}) => {
	    return data;
	})
}
let getAddress = () => {
	return requests.get('api/account/addresses/',{}).then(({
	    data
	}) => {
	    return data;
	})
}
let editAddress = address => {
	console.log(address)
	return requests.put('api/account/addresses/'+address.id+'/',address).then(({
	    data
	}) => {
	    return data;
	})
}
let deleteAddress = id => {
	return requests.del('api/account/addresses/'+id+'/',{}).then(({
	    data
	}) => {
	    return data;
	})
}
let setDefualt = id =>{
	return requests.get('api/account/addresses/'+id+'/set_default_address/').then(({
		data
	}) => {
		return data
	})
}
export default {
	getMyCart,
	editMyCart,
	createOrder,
	getProfile,
	addAddress,
	getAddress,
	editAddress,
	deleteAddress,
	setDefualt,
}
