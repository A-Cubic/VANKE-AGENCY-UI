import Vue 				from 'vue'
import App 				from './App.vue'
import store			from './vuex/vuex.js'
import router           from'./router/router.js';
import ElementUI 		from 'element-ui'
import _ from 'lodash';
import './resource/resiyrce.js';
import './component/custom/custom.js';
import './directive/directive.js';
import './util/permission'
// import 'element-ui/lib/theme-default/index.css'
// import 'element-ui/lib/theme-chalk/index.css';
import './theme/index.css'
import './assets/css/reset01.css';

/* mockjs*/
require('./mock/mock.js'); //引入mock

Vue.use(ElementUI)
// Vue.use(VueRouter)
// Vue.use(VueResource)
// require('./assets/css/amazeui.min.css');
// require('./assets/fonts/iconfont.css');
// require('./assets/css/reset01.less');
// require('./assets/css/element.less');
window.$= require('jquery');



var tiems;
$(window).resize(function() {
	if (tiems) {
	    clearTimeout(tiems);
	}
 	tiems=setTimeout(function () {
		var win=window.innerWidth>=1024?window.innerWidth:1024;
		document.getElementsByTagName('html')[0].style.fontSize=win/10.24+'px';
 	},350)
});
var win=window.innerWidth>=1024?window.innerWidth:1024;
document.getElementsByTagName('html')[0].style.fontSize=win/10.24+'px';


//启动应用
const app=new Vue({
	router,
	store:store,
	render:h=>h(App)
}).$mount('#app')