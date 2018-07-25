import "@/assets/js/Lib";
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/user.js'
import VueClipboard from 'vue-clipboard2'
import '@/statistics/baidu.js' // 百度统计

Vue.use(VueRouter)
Vue.use(VueClipboard)

const router = new VueRouter({
  routes: routes
})
// decimal型过滤器
Vue.filter('decimal', function (value, num = 2) {
  return Number(value).toFixed(num);
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " - 超级头条";
  }
  /**
   * 百度统计设置
   * [收益明细，邀请好友，兑换零钱]
   */
  // let bdpages = ['incomeBills','invitepupil','redeem','withdrawal',''];
  // if (bdpages.includes(to.name)) {
  bdTongji.apply('/v2/views/main/user.html#'+to.path);
  // }
  next();
})


new Vue({
  router: router
}).$mount('#app')