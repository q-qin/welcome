import Vue from 'vue'
import Lib from '@/assets/js/Lib'
import VueRouter from 'vue-router'

import taskcenterV120 from './taskcenterV120.vue'
import taskcenterV121 from './taskcenterV121.vue'
import rule from './rule.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'taskcenter',
    path: '/',
    meta: {
      title: '任务中心'
    },
    component: taskcenterV120
  }, {
    name: 'taskcenterV121',
    path: '/V121',
    meta: {
      title: '任务中心'
    },
    component: taskcenterV121
  },{
    name: 'rule',
    path: '/rule',
    meta: {
      title: '任务规则'
    },
    component: rule
  }]
})

new Vue({
  router: router
}).$mount('#app')