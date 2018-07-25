'use strict'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/router'
import store from '@/store/'
import conf from 'conf'
import msgbox from '@/config/msgbox'
import '@/config/JKEventHandler'
import '@/config/rem'
import '@/style/common'
import VueClipboard from 'vue-clipboard2'
import FastClick from 'fastclick'

import '@/statistics/baidu'; // 百度统计
//import '@/statistics/umeng';	// 友盟统计

Vue.config.productionTip = false;
Vue.prototype.$apiurl = conf.apiurl;
Vue.prototype.$h5url = conf.h5url;

Vue.prototype.$alert = msgbox.alert;
Vue.prototype.$confirm = msgbox.confirm;
Vue.prototype.$success = msgbox.success;
Vue.prototype.$toast = msgbox.toast;
// decimal型过滤器
Vue.filter('decimal', function (value, num = 2) {
  return Number(value).toFixed(num);
})
Vue.use(VueClipboard)
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash',
  routes: routes
})
//解决移动端300ms的点击延迟
FastClick.attach(document.body);

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " - 超级头条";
  }
  /**
   * 百度统计设置
   * [资讯详情，视频详情，邀请好友，晒收入，积分兑换，新手课堂，任务系统]
   */
  let bdpages = ['aprilFoolsDay', 'aprilFoolsDayShare', 'articleDetail', 'articleDetailClear', 'videoDetail', 'videoDetailClear', 'invitepupil', 'shareIncome', 'redeemOld', 'redeem', 'faq', 'taskCenter'];
  if (bdpages.contains(to.name)) {
    bdTongji.apply(to.path);
  }
  // 如果页面上有msgbox则关闭
  msgbox.close();
  next();
})

Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

new Vue({
  router,
  store,
}).$mount('#app')
