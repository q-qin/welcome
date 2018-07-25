<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="rankingV120" v-show="loaded">
        <div class="top">
          <ul>
            <li class="left" v-for="(top,$index) in topThree" :key="$index" :class="[{'jin':$index==0},{'yin':$index==1},{'tong':$index==2}]">
              <div class="head">
                <div v-if="$index==0" class="crown"></div>
                <div class="face">
                  <img v-lazy="top.avatar" alt="">
                </div>
                <div class="pos">{{$index+1}}</div>
              </div>
              <div class="nick">
                {{top.nickname}}
              </div>
              <div class="cash">
                {{top.rank_income}}元
              </div>
              <div class="tudi">
                {{top.friends_num}}个徒弟
              </div>
            </li>
          </ul>
        </div>
        <ul class="tabs clear">
          <li class="left" :class="{'active':type==1}" @click="tabs(1,'周排行')">
            周排行
          </li>
          <li class="left" :class="{'active':type==2}" @click="tabs(2,'总排行')">
            总排行
          </li>
        </ul>
        <div class="list" >
          <div class="thead table">
            <span class="table-cell rank">排名</span>
            <span class="table-cell nick">昵称</span>
            <span class="table-cell tudi">收徒数(人)</span>
            <span class="table-cell income" v-show="type==1">本周收入(元)</span>
            <span class="table-cell income" v-show="type==2">总收入(元)</span>
          </div>
          <table cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="5%">
              <col width="50%">
              <col width="15%">
              <col width="30%">
            </colgroup>
            <tbody>
              <tr :class="{'isme':item.is_me==1}" v-for="(item,$index) in list" :key="$index">
                <td>{{$index+4}}</td>
                <td class="nick">
                  <img v-lazy="item.avatar" alt="">
                  {{item.nickname | nick(item.is_me)}}
                </td>
                <td>{{item.friends_num}}</td>
                <td>{{item.rank_income}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bottom">
          {{myRank}}
        </div>
      </div>
  </div>  
</template>
<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";

export default {
  data() {
    return {
      loading: true,
      loaded:false,
      type:1,
      topThree:[],
      list:[],
      weekThree:[],
      weekList:[],
      totalThree:[],
      totalList:[],
      weekRank:'',
      totalRank:'',
      myRank:'',
    };
  },
  components: {
    nvHead,
    nvLoading
  },
  created(){
    window.onload = () =>{
      this.loaded = true;
    };
    this.$Progress.start();
    this.tabs(1);
  },
  methods:{
    /**
     * 获取周排行list
     */
    async getWeeks(){
      if(this.weekThree.length == 0 || this.weekList.length==0){
        let params = {
          type:1
        }
        let comm = await appcall.getRequestData(params);
        let rs = await ajax('post',this.$apiurl+'/rank/users_income_tongji',comm,params,false);
        this.$Progress.finish();
        if(rs && rs.code === 1001 && rs.data){
          this.loading = false;
          this.weekRank = rs.data.myRank;
          this.weekThree = rs.data.list.splice(0,3)
          this.weekList = rs.data.list;
        }else if(rs.code === 1005){
          this.$alert(rs.msg).then(ok=>{
            appcall.login();
          });
        }else{
          this.$alert(rs.msg);
        }
      }
      this.topThree = this.weekThree;
      this.list = this.weekList;
      this.myRank = this.weekRank;
    },
    /**
     * 获取总排行list
     */
    async getTotals(){
      if(this.totalThree.length == 0 || this.totalList.length==0){
        let params = {
          type:2
        }
        let comm = await appcall.getRequestData(params);
        let rs = await ajax('post',this.$apiurl+'/rank/users_income_tongji',comm,params,false);
        this.$Progress.finish();
        if(rs && rs.code === 1001 && rs.data){
          this.loading = false;
          this.totalRank = rs.data.myRank;
          this.totalThree = rs.data.list.splice(0,3)
          this.totalList = rs.data.list;
        }else if(rs.code === 1005){
          this.$alert(rs.msg).then(ok=>{
            appcall.login();
          });
        }else{
          this.$alert(rs.msg);
        }
      }
      this.topThree = this.totalThree;
      this.list = this.totalList;
      this.myRank = this.totalRank;
    },
    /**
     * 切换tab
     */
    tabs(type,position){
      if(!!position){_hmt.push(['_trackEvent', 'ranking', 'click', position])}
      this.type = type;
      if(type==1){
        this.getWeeks();
      }else if(type ==2){
        this.getTotals();
      }
    }
  },
  filters: {
    nick(value,isme) {
      if(isme){
        value = value.length < 3 ? value : value.slice(0, 2)+"...";
        value += "(我自己)";
      }else{
        value = value.length < 7 ? value : value.slice(0, 6) + "...";
      }
      return value;
    }
  }
};
</script>
<style lang="less" scoped>
  @import "../../../assets/css/mixin";
  .rankingV120{
    .top{
      .wh(7.5rem,5.2rem);
      .background('rank_bg.png');
      position: relative;
      .yin{
        .wh(2.1rem,100%);
        position: absolute;
        top:0;
        left:.45rem;
        .head{
          .wh(1.3rem,1.3rem);
          margin: 1.32rem auto 0;
          position: relative;
          .background('rank_yin_quan.png');
          .face{
            .wh(1.1rem,1.1rem);
            border-radius: 50%;
            .background('head_mr.png');
            background-color: #DDDFEB;
            margin: .1rem ;
            display: inline-block;
            img{
              border-radius: 50%;
            }
          }
          .pos{
            .wh(.5rem,.5rem);
            background: #DDDFEB;
            border-radius: 100%;
            position: absolute;
            margin: auto;
            left:0;
            right: 0;
            bottom: -.25rem;
            text-align: center;
            line-height: .5rem;
            font-size: .34rem;
            color:#333;
            font-weight: bold;
          }
        }
        .nick{
          text-align: center;
          color:#fff;
          line-height: 1;
          margin:.3rem auto 0; 
          font-size: .28rem;
        }
        .cash{
          text-align: center;
          font-size: .36rem;
          color:#FFEC00;
          margin:.9rem auto 0; 
          position: absolute;
          margin:auto;
          left:0;
          right: 0;
          bottom:.62rem; 
        }
        .tudi{
          text-align: center;
          font-size: .24rem;
          margin:.1rem auto 0; 
          color:#fff;
          position: absolute;
          margin:auto;
          left:0;
          right: 0;
          bottom:.24rem; 
        }
      }
      .jin{
        .wh(2.4rem,100%);
        position: absolute;
        top:0;
        left:2.55rem;
        .head{
          position: relative;
          .wh(1.6rem,1.6rem);
          margin: .8rem auto 0;
          .background('rank_jin_quan.png');
          .face{
            .wh(1.4rem,1.4rem);
            border-radius: 50%;
            background-color: #FFD62C;
            .background('head_mr.png');
            margin: .1rem;
            display: inline-block;
            img{
              border-radius: 50%;
            }
          }
          .crown{
            .wh(.36rem ,.24rem);
            .background('rank_hg.png');
            position: absolute;
            margin: auto;
            left:0;
            right: 0;
            top:-.2rem;
          }
          .pos{
            .wh(.6rem,.6rem);
            background: #FFD62C;
            border-radius: 100%;
            position: absolute;
            margin: auto;
            left:0;
            right: 0;
            bottom: -.3rem;
            text-align: center;
            line-height: .6rem;
            font-size: .34rem;
            color:#333;
            font-weight: bold;
          }
        }
        .nick{
          text-align: center;
          color:#fff;
          margin:.3rem auto 0; 
          font-size: .28rem;
        }
        .cash{
          text-align: center;
          font-size: .36rem;
          color:#FFEC00;
          position: absolute;
          margin:auto;
          left:0;
          right: 0;
          bottom:.88rem; 
        }
        .tudi{
          text-align: center;
          font-size: .24rem;
          margin:.1rem auto 0; 
          color:#fff;
          position: absolute;
          margin:auto;
          left:0;
          right: 0;
          bottom:.5rem; 
        }
      }
      .tong{
        .wh(2.1rem,100%);
        position: absolute;
        top:0;
        left:4.95rem;
        .head{
          .wh(1.3rem,1.3rem);
          margin: 1.32rem auto 0;
          position: relative;
          .background('rank_tong_quan.png');
          .face{
            .wh(1.1rem,1.1rem);
            border-radius: 50%;
            .background('head_mr.png');
            background-color: #D08D1F;
            margin: .1rem;
            display: inline-block;
            img{
              border-radius: 50%;
            }
          }
          .pos{
            .wh(.5rem,.5rem);
            background: #D08D1F;
            border-radius: 100%;
            position: absolute;
            margin: auto;
            left:0;
            right: 0;
            bottom: -.25rem;
            text-align: center;
            line-height: .5rem;
            font-size: .34rem;
            color:#fff;
            font-weight: bold;
          }
        }
        .nick{
          text-align: center;
          color:#fff;
          margin:.3rem auto 0; 
          font-size: .28rem;
        }
        .cash{
          text-align: center;
          font-size: .36rem;
          color:#FFEC00;
          position: absolute;
          margin:auto;
          left:0;
          right: 0;
          bottom:.62rem; 
        }
        .tudi{
          text-align: center;
          font-size: .24rem;
          color:#fff;
          position: absolute;
          margin:auto;
          left:0;
          right: 0;
          bottom:.24rem; 
        }
      }
    }
    .tabs{
      width: 7.5rem;
      height: .9rem;
      line-height: .9rem;
      li{
        width: 50%;
        text-align: center;
        font-size: .3rem;
        color:#333;
        position: relative;
        &.active{
          color:#F12926;
          &:after{
            content: '';
            width: .6rem;
            height: .06rem;
            display: block;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            background:linear-gradient(90deg, #FF794B,#F12926);
            border-radius: .04rem;
            bottom:0;
          }
        }
      }
    }
    .list{
      width: 7.5rem;
      margin-bottom: 1.12rem;
      .thead{
        background: #F8F8F8;
        border-top:1px solid #ECECEC;
        line-height: .8rem;
        font-size: .26rem;
        span{
          color:#999;
          &.rank{
            width: 1rem;
          }
          &.nick{
            width: 3.2rem;
            text-align: left;
            padding-left: .5rem;
          }
          &.tudi{
            width: 1.5rem;
          }
          &.income{
            width: 1.8rem;
          }
        }
      }
      table {
        width: 100%;
        padding: 0  0 0 .3rem;
        tbody{
          tr{
            &.isme *{
              color:#F12926;
            }
          }
          td {
            font-size: 0.3rem;
            text-align: center;
            color: #333;
            line-height: 1.2rem;
            border-bottom:1px solid #ECECEC;
            &.nick{
              text-align: left;
              padding-left:.3rem;
            }
            img{
              .wh(.7rem,.7rem);
              display: inline-block;
              vertical-align: middle;
              border-radius: 50%;
              .background('head_mr.png');
              margin-right: .2rem;
            }
          }
        }
      }
    }
    .bottom{
      width: 7.5rem;
      height: 1.12rem;
      line-height: 1.12rem;
      position: fixed;
      bottom: 0;
      background: linear-gradient(-90deg,#ECDFFF,#FFE7E7);
      font-size: .32rem;
      text-align: center;
    }
  }
</style>


