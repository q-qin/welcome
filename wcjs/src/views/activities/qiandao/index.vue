<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="签到首页">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="qiandao" v-show="!loading">
      这个是签到首页
      <router-link to="/role">签到规则</router-link>
    </div>
  </div>
</template>
<script>
import nvHead from "@/components/header.vue"
import nvLoading from "@/components/loading.vue"
import ajax from "@/assets/js/ajax"
import appcall from "@/assets/js/appcall"
  export default {
    name: 'qiandao',
    data() {
      return {
        loading: true
      }
    },
    components: {
      nvHead,
      nvLoading,
    },
    created() {
      this.$Progress.start();
    },
    mounted() {
      setTimeout(()=>{
        this.$Progress.finish();
      })
    },
    methods: {}
  }

</script>

<style lang="less" scoped>
@import '../../../assets/css/colors';
  .qiandao {
    padding: .5rem ;
  }

</style>
