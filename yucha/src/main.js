import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/router'
import store from '@/store/'
import conf from '@/config/conf'
import MintUI from 'mint-ui';
import '@/style/mint-ui.css'
import '@/style/common.less'
import '@/config/rem'

Vue.use(MintUI);
Vue.prototype.$alert = MintUI.MessageBox.alert;
Vue.prototype.$confirm = MintUI.MessageBox.confirm;

Vue.prototype.$apiurl = conf.apiurl;

Vue.use(VueRouter)
const router = new VueRouter({
	mode: 'hash',
	routes:routes
})

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.user) {
    store.dispatch('saveuserinfo', JSON.parse(window.sessionStorage.user));
}

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title + " - 玉点喜茶 - 3keji.com";
	}
	next();
})

new Vue({
	router,
	store,
}).$mount('#app')