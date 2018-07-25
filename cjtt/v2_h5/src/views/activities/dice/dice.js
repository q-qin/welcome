import '@/assets/js/Lib'
import Vue from 'vue'
import VueRouter from 'vue-router'

import diceIndex from './diceIndex.vue'
import diceContent from './diceContent.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'diceIndex',
    path: '/',
    meta: {
      title: '骰子首页'
    },
    component: diceIndex
  },{
    name: 'diceContent',
    path: '/diceContent',
    meta: {
      title: '骰子内容页'
    },
    component: diceContent
  }]
})

new Vue({
  router: router
}).$mount('#app')