import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		number:0,
	},
	mutations: {
		login(state, user) {
			state.hasLogin = true;
			state.userInfo = user;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: user  
			}) 
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		addNme(state,number){
			state.number += parseInt(number)
		},
		minusNum(state, number){
			state.number -= number
		},
	},
	actions: {
	
	}
})

export default store
