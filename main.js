import Vue from 'vue'
import store from './store/index.js'
import App from './App'
import Json from './Json' //测试用数据
import requests from './services/requests.js'
import api from './services/api.js'
import moment from '@/services/moment.js';

Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$requests = requests;
Vue.prototype.$api = api;
App.mpType = 'app';

Vue.filter('datetime', function(val){
	return moment(val).format('YYYY-MM-DD HH:mm');
})


const app = new Vue({
    store,
    ...App
})
app.$mount();