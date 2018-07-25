import Vue from 'vue'
import "@/assets/js/Lib";
import VueRouter from 'vue-router'

import sendcrash from './sendcrash.vue'
import sendcrashPupillist from './sendcrashPupillist.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'sendcrash',
    path: '/',
    meta: {
      title: '现金大派送'
    },
    component: sendcrash
  },{
    name: 'sendcrashPupillist',
    path: '/sendcrashPupillist',
    meta: {
      title: '徒弟列表'
    },
    component: sendcrashPupillist
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