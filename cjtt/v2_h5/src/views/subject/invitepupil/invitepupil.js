import "@/assets/js/Lib";
import Vue from 'vue'
import VueRouter from 'vue-router'
import invitepupil from './invitepupil.vue'
import invitepupilV120 from './invitepupilV120.vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueRouter)
Vue.use(VueClipboard)

const router = new VueRouter({
  routes: [{
    name: 'invitepupil',
    path: '/',
    meta: {
      title: '邀请收徒'
    },
    component: invitepupil
  },{
    name: 'invitepupilV120',
    path: '/v120',
    meta: {
      title: '邀请收徒'
    },
    component: invitepupilV120
  }
]
});
new Vue({
  router: router
}).$mount('#app')