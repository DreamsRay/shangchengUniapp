(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/list"],{1560:function(t,e,n){},"1a82":function(t,e,n){"use strict";(function(t){n("aead"),n("921b");o(n("66fd"));var e=o(n("7606"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"1eee":function(t,e,n){"use strict";var o={"uni-load-more":function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"1e07"))}},r=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}))},3849:function(t,e,n){"use strict";n.r(e);var o=n("3ab3"),r=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=r.a},"3ab3":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("4795"));function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,o,r,a,i){try{var u=t[a](i),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(o,r)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var i=t.apply(e,n);function u(t){a(i,o,r,u,c,"next",t)}function c(t){a(i,o,r,u,c,"throw",t)}u(void 0)}))}}var u=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("1e07"))}.bind(null,n)).catch(n.oe)},c={components:{uniLoadMore:u},data:function(){return{cateMaskState:0,headerPosition:"fixed",headerTop:"0px",loadingType:"more",filterIndex:0,cateId:0,priceOrder:0,cateList:[],goodsList:[]}},onLoad:function(t){this.cateId=t.tid,this.loadCateList(t.fid,t.sid),this.loadData()},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onPullDownRefresh:function(){this.loadData("refresh")},onReachBottom:function(){this.loadData()},methods:{loadCateList:function(t,e){var n=this;return i(o.default.mark((function e(){var r,a;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$api.json("cateList");case 2:r=e.sent,a=r.filter((function(e){return e.pid==t})),a.forEach((function(t){var e=r.filter((function(e){return e.pid==t.id}));t.child=e})),n.cateList=a;case 6:case"end":return e.stop()}}),e)})))()},loadData:function(){var e=arguments,n=this;return i(o.default.mark((function r(){var a,i,u;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(a=e.length>0&&void 0!==e[0]?e[0]:"add",i=e.length>1?e[1]:void 0,"add"!==a){o.next=8;break}if("nomore"!==n.loadingType){o.next=5;break}return o.abrupt("return");case 5:n.loadingType="loading",o.next=9;break;case 8:n.loadingType="more";case 9:return o.next=11,n.$api.json("goodsList");case 11:u=o.sent,"refresh"===a&&(n.goodsList=[]),1===n.filterIndex&&u.sort((function(t,e){return e.sales-t.sales})),2===n.filterIndex&&u.sort((function(t,e){return 1==n.priceOrder?t.price-e.price:e.price-t.price})),n.goodsList=n.goodsList.concat(u),n.loadingType=n.goodsList.length>20?"nomore":"more","refresh"===a&&(1==i?t.hideLoading():t.stopPullDownRefresh());case 18:case"end":return o.stop()}}),r)})))()},tabClick:function(e){this.filterIndex===e&&2!==e||(this.filterIndex=e,this.priceOrder=2===e?1===this.priceOrder?2:1:0,t.pageScrollTo({duration:300,scrollTop:0}),this.loadData("refresh",1),t.showLoading({title:"正在加载"}))},toggleCateMask:function(t){var e=this,n="show"===t?10:300,o="show"===t?1:0;this.cateMaskState=2,setTimeout((function(){e.cateMaskState=o}),n)},changeCate:function(e){this.cateId=e.id,this.toggleCateMask(),t.pageScrollTo({duration:300,scrollTop:0}),this.loadData("refresh",1),t.showLoading({title:"正在加载"})},navToDetailPage:function(e){var n=e.title;t.navigateTo({url:"/pages/product/product?id=".concat(n)})},stopPrevent:function(){}}};e.default=c}).call(this,n("543d")["default"])},4402:function(t,e,n){"use strict";var o=n("1560"),r=n.n(o);r.a},7606:function(t,e,n){"use strict";n.r(e);var o=n("1eee"),r=n("3849");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("4402");var i,u=n("f0c5"),c=Object(u["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);e["default"]=c.exports}},[["1a82","common/runtime","common/vendor"]]]);