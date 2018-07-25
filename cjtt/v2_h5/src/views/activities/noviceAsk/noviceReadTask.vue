<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="任务记录">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="noviceReadTask" v-show="!loading">
      <div class="noviceReadTask_top">
        <i class="iconfont">&#xe601;</i>
        <span class="title">任务记录</span>
        <div class="thumbtack thumbtackLeft"></div>
        <div class="thumbtack thumbtackRight"></div>
      </div>
      <div class="noviceReadTask_content">
        <div class="day" v-for="(item,$index) in list" :class="item.status|active" :key="$index">
          {{item.day}}
        </div>
      </div>
      <div class="noviceReadTask_bottom">
        <div class="thumbtack thumbtackLeft"></div>
        <div class="thumbtack thumbtackRight"></div>
        <button class="btn" @click="goToRead">去阅读赚金币</button>
        <div class="tips">友情提醒：任务必须连续N完成才有效，如连续3天、连续6天、连续9天，若哪天没有完成则重新计算！</div>
        <div class="state" v-show="tipsShow">
          <div class="task table">
            <i class="table-cell graduate"></i>
            <span class="table-cell gold">恭喜！</span>
            <span class="table-cell">{{tips}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nvHead from "@/components/header.vue"
import nvLoading from "@/components/loading.vue"
import ajax from "@/assets/js/ajax"
import appcall from "@/assets/js/appcall"

  export default {
    name: 'noviceReadTask',
    data() {
      return {
        loading: true,
        list: {},
        tips: '',
        tipsShow: false
      }
    },
    components: {
      nvHead,
      nvLoading
    },
    async created() {
      this.$Progress.start();
      this.getReadRecord()
    },
    watch: {},
    mounted() {},
    methods: {
      /**
       * 获取任务列表
       */
      async getReadRecord() {
        let params = {};
        let comm = await appcall.getRequestData(params);       
        let rs = await ajax('post', this.$apiurl + '/user_newer_activity/get_award_lists', comm, params);
        this.$Progress.finish();
        if (rs && rs.code === 1001) {
          this.loading = false;
          this.list = rs.data.list;
          this.tipsShow = rs.data.tips ? true : false;
          this.tips = rs.data.tips;
        } else {
          this.$alert(rs.msg);
        }
      },
      goToRead() {
        appcall.articles();
      }
    },
    /**
     *过滤器进行状态过滤
     */
    filters: {
      active: function (value) {
        if (value == 0) {
          return 'unfinished'
        } else if (value == 1) {
          return 'finished'
        } else {
          return ''
        }
      }
    }
  }

</script>

<style lang="less" scoped>
@import '../../../assets/css/mixin';
  .noviceReadTask {
    padding-bottom:0.2rem;
    .noviceReadTask_top {
      width: 7.1rem;
      height: .8rem;
      background-color: #ffb235;
      border-radius: .2rem;
      margin: .2rem auto 0;
      line-height: .8rem;
      text-align: center;
      background: linear-gradient(to bottom, #ffd349, #ffb234);
      box-shadow: 0 0 .3rem rgba(0, 0, 0, .3);
      position: relative;
      .iconfont {
        font-size: .4rem;
        color: #fff;
        line-height: .8rem;
      }
      .title {
        color: white;
        font-size: .3rem;
        margin-left: .28rem;
        line-height: .8rem;
        vertical-align: top;
      }
      .thumbtack{
        background: url(../../../assets/images/activities/newhead_ld.png) no-repeat center center;
        background-size: 100%;
        width: .18rem;
        height: .66rem;
        position: absolute;
        top: .58rem;
        z-index: 1;
      }
      .thumbtackLeft {       
        left: .23rem;
      }
      .thumbtackRight {
        right: .23rem;
      }
    }
    .noviceReadTask_content {
      min-height: 8.94rem;
      width: 7.1rem;
      margin: .2rem auto 0;
      border-radius: .2rem;
      box-shadow: 0 0 .3rem rgba(0, 0, 0, .3);
      display: -webkit-flex;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      padding: .26rem .21rem;
      .day {
        width: .8rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        margin: .25rem .25rem;
        font-size: .3rem;
      }
      .finished {
        background: url(../../../assets/images/activities/nhr_check.png) no-repeat center center;
        background-size: 100%;
      }
      .unfinished {
        background: url(../../../assets/images/activities/nhr_fork.png) no-repeat center center;
        background-size: 100%;
      }
    }
    .noviceReadTask_bottom {
      height: auto;
      width: 7.1rem;
      position: relative;
      margin: .2rem auto 0;
      border-radius: .2rem;
      box-shadow: 0 0 .3rem rgba(0, 0, 0, .3);
      padding: .44rem 0 .28rem;
      .thumbtack{
        background: url(../../../assets/images/activities/newhead_ld.png) no-repeat center center;
        background-size: 100%;
        width: .18rem;
        height: .66rem;
        position: absolute;
        top: -.42rem;
        z-index: 1;
      }
      .thumbtackLeft {
        left: .23rem;
      }
      .thumbtackRight {
        right: .23rem;
      }
      .btn {
        height: .8rem;
        width: 4rem;
        border-radius: .8rem;
        background: linear-gradient(to bottom, #ffd349, #ffb234);
        font-size: .3rem;
        display: block;
        margin: 0 auto;
        &:active {
          transform: scale(0.98);
        }
      }
      .tips {
        font-size: .22rem;
        color: #d53c3e;
        width: 100%;
        padding: 0 .33rem;
        margin: .36rem auto 0;
      }
      .state {
        margin: .23rem auto 0;
        text-align: center;
        font-size: .3rem;
        .task {
          line-height: .6rem;
          margin: 0 auto;
          width: auto;
          .graduate {
            background: url(../../../assets/images/activities/nhr_gra.png) no-repeat center center;
            background-size: 100%;
            width: .4rem;
            height: .4rem;
          }
          .gold {
            color: #ffb537;
            font-size: .3rem;
            padding-left: .2rem;
          }
        }
      }
    }
  }

</style>
