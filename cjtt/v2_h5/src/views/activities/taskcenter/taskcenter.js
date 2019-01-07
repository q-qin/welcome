import '@/assets/js/Lib'
import Vue from 'vue'
import VueRouter from 'vue-router'

import taskcenter from './taskcenter.vue'
import rule from './rule.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'taskcenter',
    path: '/',
    meta: {
      title: '任务中心'
    },
    component: taskcenter
  }, {
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