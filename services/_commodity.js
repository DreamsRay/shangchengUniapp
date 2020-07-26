import requests from './requests.js';

let getCate = (pagesize) => {
    return  requests.get('api/commodity/catalogues/',{'pagesize':pagesize}).then(({
        data,
		pagesize
    }) => {
        return data.results;
    })
}
let getGoods = async(payload) => {
	return await requests._get('api/commodity/goods/',payload).then(res=>{
	    return res.results;
	}) 
}
let Goods = (search) => {
    return requests.get('api/commodity/goods/', {'search':search}, false).then(({
        search,
		data,
		success
    }) => {
        return data;
    })
}
export default {
    getCate,
	getGoods,
	Goods
}
