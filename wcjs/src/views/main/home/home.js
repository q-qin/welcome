import Vue from 'vue'
import Lib from "@/assets/js/Lib";
import store from '@/store/index.js'
import VueRouter from 'vue-router'
import routes from '@/router/home.js'
import '@/statistics/baidu.js' // 百度统计

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title + " - 3keji.com";
//   }
//   next();
// })



new Vue({
  router: router,
  store:store,
}).$mount('#app')