<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="阅读收益">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div v-show="!loading" class="incomeBroadcast">
      <div class="top">
        <div class="tip">{{detail.date}} 收益播报</div>
        <div class="income"><i>￥</i>{{detail.yesterday_cash}}<span>（{{detail.yesterday_coin}}金币）</span></div>
      </div>
      <div class="rank">收益排名 <span>{{detail.rank}}</span></div>
      <div class="items">
        <div class="table title">
          <span class="table-cell ">项目</span>
          <span class="table-cell ">收益(金币)</span>
        </div>
        <ul class="tasks">
          <li class="table">
            <span class="table-cell ico">
              <img src="../../../assets/images/taskcenter/task_ico_wjdc.png" alt="">
            </span>
            <span class="table-cell tasknname">签到</span>
            <span class="table-cell btn">
              <span v-if="detail.sgin_coin>0">+{{detail.sgin_coin}}</span>
              <button class="" v-else @click="jumpH5('taskcenter')">去签到</button>
            </span>
          </li>
          <li class="table">
            <span class="table-cell ico">
              <img src="../../../assets/images/taskcenter/task_ico_yd.png" alt="">
            </span>
            <span class="table-cell tasknname">阅读</span>
            <span class="table-cell btn">
              <span v-if="detail.reading_coin>0">+{{detail.reading_coin}}</span>
              <button class="" v-else @click="jumpNat('read')">去阅读</button>
            </span>
          </li>
          <li class="table">
            <span class="table-cell ico">
              <img src="../../../assets/images/taskcenter/task_ico_yqhy.png" alt="">
            </span>
            <span class="table-cell tasknname">收徒</span>
            <span class="table-cell btn">
              <span v-if="detail.tudi_num>0">{{detail.tudi_num}}名</span>
              <button class="" v-else @click="jumpH5('invitepupil')">去收徒</button>
            </span>
          </li>
          <li class="table">
            <span class="table-cell ico">
              <img src="../../../assets/images/taskcenter/task_ico_zrwzq.png" alt="">
            </span>
            <span class="table-cell tasknname">收徒进贡</span>
            <span class="table-cell btn">
              <span v-if="detail.apprentice_coin>0">+{{detail.apprentice_coin}}</span>
              <button class="" v-else @click="jumpH5('invitepupil')">去收徒</button>
            </span>
          </li>
          <li class="table">
            <span class="table-cell ico">
              <img src="../../../assets/images/taskcenter/task_ico_zrw.png" alt="">
            </span>
            <span class="table-cell tasknname">任务</span>
            <span class="table-cell btn">
              <span v-if="detail.task_coin>0">+{{detail.task_coin}}</span>
              <button class="" v-else @click="jumpH5('taskcenter')">去做任务</button>
            </span>
          </li>
        </ul>
      </div>
      <div class="bottom" @click="jumpH5('incomeBills')" v-if="detail.sgin_coin || detail.reading_coin  || detail.tudi_num || detail.apprentice_coin || detail.task_coin">
        查看收益明细
      </div>
      <div class="bottom" @click="jumpH5('taskcenter')" v-else>
        赚更多金币
      </div>
    </div>
  </div>
</template>
<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";
import pagers from "@/assets/js/pagers";

export default {
  name:'incomeBroadcast',
  data(){
    return {
      loading:true,
      detail:{},
    }
  },
  components:{
    nvHead,
    nvLoading
  },
  created(){
    this.$Progress.start();
    this.init();
  },
  mounted(){
  },
  methods:{
    /**
     * 页面初期化
     */
    async init(){
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax("post", this.$apiurl + "/sms/get_yesterday_earnings", comm, params);
      this.$Progress.finish();
      if(rs && rs.code === 1001 && rs.data){
        this.loading = false;
        this.detail = rs.data.list;
      }else if(rs.code === 1005){
        this.$alert(rs.msg).then(ok=>{
          appcall.login();
        })
      }else{
        this.$alert(rs.msg);
      }
    },
    /**
     * 跳转H5
     */
    jumpH5(page){
      switch(page){
        case 'taskcenter':
          appcall.navigator({
            title:'任务中心',
            url:this.$h5url+pagers[this.$currVer].taskcenter,
          })
          break;
        case 'invitepupil':
          appcall.navigator({
            title:'邀请收徒',
            url:this.$h5url+ pagers[this.$currVer].invitepupil,
          })
          break;
        case 'incomeBills':
          appcall.navigator({
            title:'收益明细',
            url:this.$h5url+ pagers[this.$currVer].incomeBills,
          })
          break;
        default:
          break;
      }
    },
    /**
     * 跳转Nat
     */
    jumpNat(page){
      switch(page){
        case 'read':
          appcall.articles();
          break;
        default:
          break;
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../../../assets/css/mixin';
  .incomeBroadcast{
    .top{
      .wh(6.96rem,2.34rem);
      .background('incomeBroadcast_bg1.png');
      margin: .4rem auto 0;
      .tip{
        display: block;
        text-align: center;
        padding: .38rem 0 ;
        font-size: .24rem;
        color: #FF2628;
        line-height: 1;
        opacity: .5;
      }
      .income{
        font-size: .8rem;
        color:#FF2628;
        text-align: center;
        i{
          font-size: .36rem;
          color:#FF2628;
          margin-right: .08rem;
        }
        span{
          font-size: .24rem;
          color:#FF2628;
          opacity: .8;
        }
      }
    }
    .rank{
      .wh(6.96rem,.96rem);
      .background('incomeBroadcast_bg2.png');
      background-size:cover;
      font-size: .24rem;
      text-align: center;
      margin: 0 auto .24rem;
      line-height: .96rem;
      color: rgba(243,0,0,.5);
      span{
        color: rgba(243,0,0,1);
      }
    }
    .items{
      margin:  0 .3rem 1rem;
      border-radius: .1rem;
      position: relative;
      box-shadow: .02rem .02rem .02rem #e6e6e6;
      &:before{
        position: absolute;
        content: '';
        .wh(100%,1px);
        background: #e6e6e6;
      }
      .title{
        background: #f8f8f8;
        height: .8rem;
        font-size: .28rem;
        span{
          color:#999;
          &:first-child{
            text-align: left;
            padding-left:.3rem;
          }
          &:last-child{
            width: 1.8rem;
          }
        }
      }
      ul{ 
        .border(#f8f8f8,left);
        .border(#f8f8f8,right);
        li{
          height: 1.2rem;
          padding-left:.3rem;
          padding-right: .3rem;
          .border(#f8f8f8,bottom);
          .ico{
              .wh(.7rem,.7rem);
          }
          .tasknname{
            text-align: left;
            color:#333;
            font-size: .3rem;
            padding-left: .3rem;
          }
          .btn{
            text-align: right;
            button{
              .wh(1.2rem,.5rem);
              background: #ff2628;
              color:#fff;
              border-radius: .5rem;
              font-size: .24rem;
            }
            span{
              font-size: .3rem;
              color:#333;
              font-weight: bold;
            }
          }
        }
      }
    }
    .bottom{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      position: fixed;
      bottom: 0;
      text-align: center;
      font-size: .32rem;
      color:#fff;
      background: linear-gradient(-90deg,#FF4b2e,#ff2628);
    }
  }
</style>

