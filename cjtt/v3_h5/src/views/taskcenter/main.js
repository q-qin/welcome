// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/js/Lib'
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import rule from './rule.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'taskcenter',
    path: '/',
    meta: {
      title: '任务中心'
    },
    component: App
  },
  {
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
