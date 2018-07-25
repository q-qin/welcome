<template>
  <div class="diceHtml">
    <vue-progress-bar></vue-progress-bar>
    <nv-loading :loading="loading"></nv-loading>
    <div class="diceIndex" v-show="!loading">
      <div class="diceIndex_bg">
        <!-- 返回 -->
        <i class="dice_back" @click="goBack"></i>
        <!-- 活动规则 -->
        <div class="rule" @click="open">活动规则</div>
        <!-- 用户信息 登录可看 -->
        <div class="userInfo" v-if="isLogin">
          <div class="userImg inlineBlock">
            <img :src="userInfo.avatar">
          </div>
          <div class="userName inlineBlock">
            {{userInfo.nickname | name}}
          </div>
          <div class="userMoney inlineBlock"><i class="coin inlineBlock"></i>今日金币：<span class="num">{{userInfo.balance_coin | decimal(0)}}</span></div>
        </div>
        <!-- 标题 -->
        <div class="title"></div>
        <!-- 开始按钮 -->
        <div class="start" @click="goMatch"></div>
        <!-- 今日获得金币 -->
        <div class="todayMoney" v-if="isLogin">今日已获得{{userInfo.coin | decimal(0)}}金币</div>
        <!-- 排行榜 -->
        <div class="rankBox">
          <div class="inner">
            <div class="tabs clear">
              <div class="today left" @click="changeTabs(1)">
                <img src="../../../assets/images/dice/dice_todayrank_chosed.png" v-show="tabindex==1">
                <img src="../../../assets/images/dice/dice_todayrank.png" v-show="tabindex==2">
                <div class="underline" v-show="tabindex==1"></div>
              </div>
              <div class="line"></div>
              <div class="record left" @click="changeTabs(2)">
                <img src="../../../assets/images/dice/dice_record_chosed.png" v-show="tabindex==2">
                <img src="../../../assets/images/dice/dice_record.png" v-show="tabindex==1">
                <div class="underline" v-show="tabindex==2"></div>
              </div>
            </div>
            <div class="head1 table" v-show="tabindex==1">
              <div class="tableCell">排名</div>
              <div class="tableCell">用户</div>
              <div class="tableCell">获得金币</div>
            </div>
             <div class="head2 table" v-show="tabindex==2">
              <div class="tableCell">时间（两天内的记录）</div>
              <div class="tableCell">获得金币</div>
            </div>
            <div class="tableBox">
              <table class="rankList" cellpadding="0" cellspacing="0" v-show="tabindex==1">
                <colgroup>
                    <col width="30%">
                    <col width="42%">
                    <col width="28%">
                </colgroup>
                <tbody>
                  <!-- 自己 -->
                  <tr v-if="isLogin">
                    <td :class="{'userRank':isTextIndent}">{{userInfo.rank}}</td>
                    <td><img :src="userInfo.avatar">{{userInfo.nickname | name}}</td>
                    <td>+{{userInfo.coin | decimal(0)}}金币</td>
                  </tr>
                  <!-- 列表 -->
                  <tr class="list" v-for="(item,$index) in rankList" :key="$index">
                    <td :class="{'one':$index==0,'two':$index==1,'three':$index==2}">{{$index+1}}</td>
                    <td><img :src="item.avatar">{{item.nickname | name}}</td>
                    <td>+{{item.coin | decimal(0)}}金币</td>
                  </tr>
                </tbody>
              </table>

              <table class="recordList" cellpadding="0" cellspacing="0" v-show="tabindex==2">
                <colgroup>
                    <col width="72%">
                    <col width="28%">
                </colgroup>
                <tbody>
                  <tr class="list" v-for="(item,$index) in recordList" :key="$index">
                    <td>{{item.date}}<span>{{item.time}}</span></td>
                    <td>+{{item.coin | decimal(0)}}金币</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
        <!-- 规则 -->
        <div class="v-modal" v-show="isRuleShow" @touchmove.prevent>
          <div class="modal">
            <div class="ruleBox">
              <ul>
                <li>1、每日不限场数竞猜，每场消耗80金币，获胜者可获得双倍金币奖励；</li>
                <li>2、连续猜对5场，额外获得99元现金红包，红包即时发放至零钱账户；</li>
                <li>3、每局15秒时间选择大小，选择结果不可更改；</li>
                <li>4、中途退场金币不退还；</li>
                <li>5、规定时间内未选择游戏结束。</li>
              </ul>
            </div>
            <div class="close" @click="close"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";
// let comm = {
//     api_debug: 1,
//     uid: '11045566',
//     token: '8b1f8a1bc9d808d28940dc48919611b0'
// }
// let comm = {
//     api_debug: 1,
//     uid: '11062270',
//     token: '5de251718aaa4b4dad680b8069266276'
// }
export default {
  name:'diceIndex',
  data(){
    return{
      isLogin:false, //是否登录
      loading:false, 
      isRuleShow:false,  //是否显示规则弹窗
      userInfo:{balance_coin:0,coin:0},//用户信息
      isTextIndent:false, //排行表我的一行首列样式
      tabindex:1, // 1今日 2我的记录
      rankList:[], //今日排行
      recordList:[],//我的记录
    }
  },
  components: {
    nvHead,
    nvLoading,
  },
  created(){
    this.$Progress.start();
  },
  mounted(){
    this.pullDown();
    window.afterPullDown = function() {
      this.pullDown();
    }.bind(this);
  },
  methods:{
    /**
     * 页面初始
     */
    async pullDown() {
      appcall.hideNavBar();
      this.close();
      let appdata = await appcall.getAppData();
      if (!appdata.uid || !appdata.token) {
        this.$Progress.finish();
        this.isLogin = false;
        this.loading = false;
      } else {
        this.isLogin = true;
        this.getUserInfo();
        this.getRecordList();
      }
      this.getRankList();
    },
    /**
     * 获取用户信息
     */
    async getUserInfo(){
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "POST",
        this.$apiurl + "/lottery/dice_list",
        comm,
        params
      );
      this.$Progress.finish();
      if (rs && rs.code === 1001) {
        console.log(rs.data)
        this.userInfo=rs.data;
        if(rs.data.rank.trim().length<3){
          this.isTextIndent=true;
        }else{
          this.isTextIndent=false;
        }
        this.loading = false;
      }else if(rs.code === 1005){
        this.$alert(rs.msg).then(()=>{
          appcall.login();
        })
      }else{
        this.$alert(rs.msg);
      }
    },
    /**
     * 获取今日排行
     */
    async getRankList(){
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "POST",
        this.$apiurl + "/lottery/dice_today_top",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        this.rankList=rs.data;
      }else if(rs.code === 1005){
        this.$alert(rs.msg).then(()=>{
          appcall.login();
        })
      }else{
        this.$alert(rs.msg);
      }
    },
    /**
     * 获取用户流水
     */
    async getRecordList(){
      
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "POST",
        this.$apiurl + "/lottery/dice_history",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        this.recordList=rs.data;
      }else if(rs.code === 1005){
        this.$alert(rs.msg).then(()=>{
          appcall.login();
        })
      }else{
        this.$alert(rs.msg);
      }
    },
    /**
     * 切换tab 1：今日排行 2：历史记录
     */
    changeTabs(num){
      this.tabindex=num;
    },
    /**
     * 去匹配页
     */
    async goMatch(){
      let appdata = await appcall.getAppData();
      if (!appdata.uid || !appdata.token) {
        this.isLogin = false;
        appcall.login();
      } else {
        this.isLogin = true;
        this.$router.push('/diceContent');
        // appcall.navigator({
        //   title:'',
        //   url:this.$h5url+'/activities/dice.html#/diceContent'
        // })
      }
    },
    /**
     * 返回
     */
    goBack(){
      appcall.goBack();
    },
    /**
     * 打开规则弹窗
     */
    open(){
      this.isRuleShow=true;
    },
    /**
     * 关闭规则弹窗
     */
    close(){
      this.isRuleShow=false;
    },
  },
  filters: {
    name(value) {
      if (value) {
        value = value.length < 4 ? value : value.substr(0, 4);
      }
      return value;
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin";
.diceHtml{
  width: 7.5rem;
  height: 100%;
  .diceIndex{
    width:7.5rem;
    height: 100vh;
    background: linear-gradient(-90deg,#5700c3,#8f4de0,#5700c3);
    .diceIndex_bg{
      width: 100%;
      height: 13.34rem;
      .background('dice/dice_index_bg.jpg');
      position: relative;
      .dice_back{
        width: 1.18rem;
        height: .88rem;
        .background('dice/dice_back.png');
        position: absolute;
        left: 0;
        top:.4rem;
        // top: 0;
      }
      .rule{
        width: 1.45rem;
        height: .5rem;
        line-height: .5rem;
        text-align: center;
        border-top-left-radius: .25rem;
        border-bottom-left-radius: .25rem;
        background: #4F80FE;
        box-shadow:.04rem 0 .24rem rgba(41,1,85,0.92);
        font-size: .26rem;
        color: #fff;
        position: absolute;
        right: 0;
        top: 1rem;
        // top: .6rem;
      }
      .userInfo{
        height: .5rem;
        line-height: .5rem;
        overflow: hidden;
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 2.05rem;
        // top: 1.65rem;
        .inlineBlock{
          display: inline-block;
          vertical-align: middle;
        }
        .userImg{
          width: .5rem;
          height: .5rem;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            .background('head_mr.png');
            border-radius: 50%;
          }
        }
        .userName{
          margin-left: .14rem;
          font-size: .3rem;
          color: #ffffff;
          text-align: left;
        }
        .userMoney{
          height: .5rem;
          margin-left: .3rem;
          padding-top: .03rem;
          font-size: .26rem;
          color: #ffffff;
          .coin{
            width: .37rem;
            height: .34rem;
            .background('dice/dice_coin.png');
            margin-right: .1rem;
          }
          .num{
            color: #FFE400;
          }
        }
      }
      .title{
        margin: 0 auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 2.86rem;
        // top: 2.46rem;
        width: 5.26rem;
        height: 2.2rem;
        .background('dice/dice_banner.png');
      }
      .start{
        margin: 0 auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 4.42rem;
        // top: 4.02rem;
        width: 2.64rem;
        height: 2.63rem;
        .background('dice/dice_start.png');
      }
      .todayMoney{
        position: absolute;
        left: 0;
        right: 0;
        top: 7.16rem;
        // top: 6.76rem;
        text-align: center;
        color: #ffffff;
        font-size: .28rem;
      }
      .rankBox{
        margin: 0 auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 7.7rem;
        // top: 7.3rem;
        width: 7.1rem;
        height: 5.4rem;
        background: linear-gradient(90deg,#C919E4,#8519E2);
        padding: .2rem;
        .inner{
          width: 6.7rem;
          height: 5rem;
          background: #B7C7FF;
          .tabs{
            background: transparent;
            width: 100%;
            height: .93rem;
            position: relative;
            .today,.record{
              width: 50%;
              height: 100%;
              padding: .28rem 0 .31rem;
              text-align: center;
              position: relative;
              img{
                width: 1.78rem;
                height: .34rem;
              }
              .underline{
                position: absolute;
                top: .72rem;
                left: .77rem;
                width: 1.8rem;
                height: .02rem;
                background: #5D10BD;
              }
            }
            .line{
              width: .02rem;
              height: .36rem;
              position: absolute;
              top:.28rem;
              left: 3.34rem;
              background: #5D10BD;
            }
          }
          .head1{
            width: 100%;
            height: .8rem;
            line-height: .8rem;
            padding: 0 .4rem;
            display: table;
            background: #A5A7F3;
            .tableCell{
              text-align: left;
              display: table-cell;
              font-size: .26rem;
              color: #333333;
              &:nth-child(1){
                width: 30%;
              }
              &:nth-child(2){
                width: 42%;
              }
              &:nth-child(3){
                width: 28%;
                text-align: right;
                padding-right: .1rem;
              }
            }
          }
          .head2{
            width: 100%;
            height: .8rem;
            line-height: .8rem;
            padding: 0 .4rem;
            display: table;
            background: #A5A7F3;
            .tableCell{
              text-align: left;
              display: table-cell;
              font-size: .24rem;
              color: #333333;
              &:nth-child(1){
                width: 72%;
              }
              &:nth-child(2){
                width: 28%;
                text-align: right;
                padding-right: .2rem;
              }
            }
          }
          .tableBox{
            height: 3.2rem;
            overflow-x: hidden;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            table{
              width: 100%;
              padding: 0 .4rem;
              tbody{
                tr{
                  height: .8rem;
                  td{
                    font-size: .24rem;
                    color: #000000;
                    .border(#ffffff,bottom);
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                  }
                }
              }
            }
            .rankList{
              tbody{
                tr{
                  td:nth-child(2){
                    position: relative;
                    img{
                      width: .4rem;
                      height: .4rem;
                      border-radius: 50%;
                      position: absolute;
                      top: .2rem;
                      left: -.6rem;
                      .background('head_mr.png');
                    }
                  }
                  td:nth-child(3){
                    text-align: right;
                    padding-right: .1rem;
                  }
                  .userRank{
                    text-indent: .4rem;
                  }
                }
                .list{
                  td:nth-child(1){
                    text-indent: .4rem;
                    &.one{
                      background: url('../../../assets/images/dice/dice_first.png') no-repeat 0 .16rem;
                      background-size: .3rem .4rem;
                    }
                    &.two{
                      background: url('../../../assets/images/dice/dice_second.png') no-repeat 0 .16rem;
                      background-size: .3rem .4rem;
                    }
                    &.three{
                      background: url('../../../assets/images/dice/dice_third.png') no-repeat 0 .16rem;
                      background-size: .3rem .4rem;
                    }
                  }
                }
              }
            }
            .recordList{
              tbody{
                td:nth-child(1){
                  span{
                    font-size: .24rem;
                    color: #000000;
                    margin-left: .24rem;
                  }
                }
                td:nth-child(2){
                  text-align: right;
                  padding-right: .2rem;
                }
              }
            }
          }
          
        }
      }
    }
    
  }
  .v-modal {
    .mask;
    //规则弹窗
    .modal{
      margin-top: -1rem;
      background: transparent;
      .ruleBox{
        width: 6.56rem;
        height: 6.15rem;
        .background('dice/dice_ruleBg.png');
        position: relative;
        ul{
          width: 5.15rem;
          position: absolute;
          top: 1.57rem;
          left: .68rem;
          li{
            color: #666666;
            font-size: .28rem;
            line-height: .54rem;
          }
        }
      }
      .close{
        margin: .56rem auto 0;
        width: .5rem;
        height: .5rem;
        .background('dice/dice_index_close.png');
      }
    }
    //去登录弹窗
    .goLoadingModal {
      background: #ffffff;
      border-radius: 0.12rem;
      .tipsBox {
        width: 5.8rem;
        height:3.66rem;
        text-align: justify;
        font-size: 0.36rem;
        color: #282a2f;
        line-height: 0.58rem;
        padding: 0.6rem 0.4rem 0;
      }
      .btnbox {
        width: 100%;
        height: 1.08rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        .border(#e9e9e6,top);
        position: absolute;
        bottom: 0;
        left: 0;
        .cancel,
        .ok {
          width: 50%;
          height: 100%;
          float: left;
          text-align: center;
          line-height: 1.08rem;
          color: #97999d;
          font-size: 0.32rem;
          .border(#e9e9e6,right);
        }
        .ok {
          border: 0;
          color: #282a2f;
        }
      }
    }
  }  
}

</style>


