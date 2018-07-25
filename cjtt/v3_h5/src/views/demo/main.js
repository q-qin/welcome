// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Lib from '@/assets/js/Lib.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './index.vue'
import faq from './faq.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'index',
    path: '/',
    meta: {
        title: '首页'
    },
    component: index
  },{
    name: 'faq',
    path: '/faq',
    meta: {
        title: 'faq'
    },
    component: faq
  }]
})

/* eslint-disable no-new */
new Vue({
  router:router
}).$mount('#app')
