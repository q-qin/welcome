<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="apriFoolsDayShare" v-show="!loading">
      <div class="apriFoolsDay_swiper">
        <img :src="$route.query.url" height="100%" class="swiperImg">
      </div>
      <div class="apriFoolsDay_share">
        <span class="btn" @click="pyqshare">
          <i class="iconfont iconSize">&#xe607;</i>
          <i class="fontSize">朋友圈</i>
        </span>
        <span class="btn" @click="wxshare">
          <i class="iconfont iconSize">&#xe624;</i>
          <i class="fontSize">微信好友</i>
        </span>
      </div>
      <div class="tip">分享到微信和朋友圈
        <br>恶搞一下好友~</div>
    </div>
  </div>
</template>
<script>
  import nvHead from '@/components/header.vue';
  import nvLoading from '@/components/loading.vue';
  import ajax from '@/config/ajax';
  import appcall from '@/config/appcall';

  export default {
    name: 'apriFoolsDayShare',
    data() {
      return {
        loading: false,
        isios: false,
      }
    },
    components: {
      nvHead,
      nvLoading
    },
    async created() {
      if (JKEventHandler.browser().ios) {
        this.isios = true;
      }
      setTimeout(() => {
        this.loading = false;
      }, 0)
    },
    methods: {
      /**
       * 微信朋友圈邀请
       */
      async pyqshare() {
        let params = {
          type: 2,
          title: '',
          url: '',
          desc: '',
          images: this.$route.query.url,
        }
        appcall.invite(params)
      },
      /**
       * 微信好友邀请
       */
      async wxshare() {
        let params1 = {
          type: 2,
          title: '',
          url: '',
          desc: '',
          images: this.$route.query.url,
        }
        let params2 = {
          type: 1,
          title: '@我，刚发现一款愚人节恶搞神器',
          url: this.$route.query.url,
          desc: '已有388人中枪',
          images: this.$route.query.url,
        }
        let params =this.isios?params1:params2
        appcall.invite(params);
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../style/colors';
  .apriFoolsDayShare {
    text-align: center;
    .apriFoolsDay_swiper {
      background-color: #f5f5f5;
      height: 7.5rem;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      display: -webkit-flex;
      display: flex;
      img {
        max-width: 5rem;
        max-height: 7.5rem;
        width: auto;
        margin: 0 auto;
      }
    }
    .apriFoolsDay_share {
      .btn {
        margin: .4rem auto;
        height: .9rem;
        width: 3.61rem;
        line-height: .9rem;
        text-align: center;
        display: block;
        color: #fff;
        background-color: @mcolor;
        border-radius: .45rem;
        font-size: .34rem;
        position: relative;
        .iconSize {
          position: absolute;
          left: .8rem;
          font-size: .6rem;
          color: #fff;
        }
        .fontSize {
          position: absolute;
          left: 1.6rem;
          font-size: .34rem;
          color: #fff;
        }
      }
    }
    .tip {
      font-size: .34rem;
      color: #999;
    }

  }

</style>
