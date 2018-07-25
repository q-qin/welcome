import "@/assets/js/Lib";
import Vue from 'vue'
import VueRouter from 'vue-router'

import noviceAsk from './noviceAsk.vue'
import noviceAskTips from './noviceAskTips.vue'
import noviceReadTask from './noviceReadTask.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'noviceAsk',
    path: '/',
    meta: {
      title: '新手答题'
    },
    component: noviceAsk
  },{
    name: 'noviceAskTips',
    path: '/noviceAskTips',
    meta: {
      title: '详细介绍'
    },
    component: noviceAskTips
  },{
    name: 'noviceReadTask',
    path: '/noviceReadTask',
    meta: {
      title: '任务记录'
    },
    component: noviceReadTask
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