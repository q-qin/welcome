import "@/assets/js/Lib";
import Vue from 'vue'
import VueRouter from 'vue-router'

import aprilFoolsDay from './aprilFoolsDay.vue'
import aprilFoolsDayShare from './aprilFoolsDayShare.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'aprilFoolsDay',
    path: '/',
    meta: {
      title: '愚人节活动'
    },
    component: aprilFoolsDay
  }, {
    name: 'aprilFoolsDayShare',
    meta: {
      title: '愚人节活动分享'
    },
    path: '/aprilFoolsDayShare',
    component: aprilFoolsDayShare
  }]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " - 超级头条";
  }
  next();
})


new Vue({
  router: router
}).$mount('#app')