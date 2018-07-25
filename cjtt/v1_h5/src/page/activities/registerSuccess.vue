<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="registerSuccess" v-show="!loading">
      <div class="img"></div>
      <div class="mes">
        了解超级头条
        <br>并认真回答问题
        <br>即可取现
      </div>
      <button class="btn" @click="hdwt">回答新手问题</button>
    </div>
  </div>
</template>
<script>
  import nvHead from '@/components/header.vue';
  import nvLoading from '@/components/loading.vue';
  import ajax from '@/config/ajax'
  import appcall from '@/config/appcall'
  export default {
    name: 'registerSuccess',
    data() {
      return {
        loading: false
      }
    },
    components: {
      nvHead,
      nvLoading,
    },
    created() {},
    mounted() {},
    methods: {
      hdwt() {
        this.$router.push('/xsdt');
      }
    }
  }

</script>

<style lang="less" scoped>
  @import '../../style/colors';
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
  }

  .registerSuccess {
    position: relative;
    .img {
      background: url(../../images/activities/zccg_bg.png) no-repeat center center;
      background-size: 100%;
      width: 100%;
      height: 4.44rem;
    }
    .mes {
      font-size: .44rem;
      color: #333333;
      text-align: center;
      margin-top: .87rem;
      height: 2.15rem;
      line-height: .7rem;
      width: 100%;
    }
    .btn {
      display: block;
      margin: .85rem auto;
      height: 1rem;
      width: 6.68rem;
      font-size: .4rem;
      border-radius: 1rem;
      background-color: #f95b44;
      color: #fff;
      font-weight: 500;
      box-shadow: 0 .2rem .3rem rgba(0, 0, 0, .3);
      background: linear-gradient(to bottom, #fd5e45, #d63d3e);
      &:active {
        transform: scale(0.98);
      }
    }
  }

</style>
