import Vue from 'vue'
import "@/assets/js/Lib";

import VueRouter from 'vue-router'

import App from './shareIncome.vue'
import shareIncomeV120 from './shareIncomeV120.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'App',
    path: '/',
    meta: {
      title: '晒收入'
    },
    component: App
  },{
    name: 'shareIncome',
    path: '/v120',
    meta: {
      title: '晒收入'
    },
    component: shareIncomeV120
  }]
})

new Vue({
  router: router
}).$mount('#app')