<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <div class="helpHB" v-show="!loading">
      <!-- 头部banner和滚动名单 -->
      <div class="helpHB_header">
        <img src="../../../assets/images/helpHB/helpHB_bg.jpg">
        <div class="flushCrollBG" v-if="(data.status==1||data.status==5)&&awardsList.length>0">
          <nv-marquee :duration="1200" :interval="3000" :play="marqueePlay" class="flushCroll" :height="0.72">
            <li class="clear" v-for="(item,$index) in awardsList" :key="$index">
              <img :src="item.img||'../../../assets/images/head_mr.png'" class="left">
              <div class="left">
                <p>{{item.name|name}}</p>
                <p>{{item.record}}</p>
              </div>
            </li>
          </nv-marquee>
        </div>
      </div>
      <!-- 正在助力和主力已满 -->
      <div class="helpHB_content1" v-if="data.status==1||data.status==5">
        <p class="gain" v-if="data.status==1"><span>获得</span><span class="money">{{data.account_cash}}</span><span>元<i @click="withdrawal">提现</i></span></p>
        <p class="gain" v-if="data.status==5"><span>累计获得</span><span class="money">{{data.account_cash}}</span><span>元</span></p>
        <div class="HBprogressBox">
          <div class="HBprogressBox_bar">
            <div class="tips1" v-if="data.status==1" :style="tipsStyle">助力还可再得<span>{{data.residue}}元</span></div>
            <div class="tips2" v-else>已满<span>{{data.account_cash}}元</span></div>
            <div class="done" :style="doneStyle"></div>
            <p v-if="data.status==1">邀请好友助力,最高可得{{data.limit_cash|decimal(0)}}元</p>
            <p v-else @click="jump">助力已满,去提现</p>
          </div>
        </div>
        <div class="helpBtn scaleBtn" @click="share(1)" v-if="data.status==1">{{helpBtnStr}}</div>
        <div class="helpBtn scaleBtn" @click="jump('withdraw',2)" v-if="data.status==5">{{helpBtnStr}}</div>
        <div class="friendsBox clear">
          <div class="left tit">好友<br>助力</div>
          <div class="left list ">
            <div class="listContent clear" >
              <div class="alreadyHelp inlineBlock" v-for="(item,$index) in data.list" :key="$index">
                <img :src="item.headimgurl">
                <span>{{item.help_cash}}</span>
              </div>
              <div class="seat inlineBlock" v-for="item in seatLength" :key="item+seatLength"></div>
            </div>
          </div>
          <div class="dim"></div>
        </div>
      </div>
      <!-- 已参加过该活动 -->
      <div class="helpHB_content2" v-if="data.status==4">
        <p class="gain"><span>已到账</span><span class="money">{{data.account_cash}}</span><span>元</span></p>
        <p class="haveAttended">你已参加过该活动</p>
        <div class="inform" :class="{'scaleBtn':isInform}" @click="informMe">{{informStr}}</div>
      </div>
      <!-- 仅限新用户参与 -->
      <div class="helpHB_content3" v-if="data.status==2">
        <p>此活动限新用户参与</p>
        <div class="inform scaleBtn" @click="jump('taskcenter')">做任务赚金币</div>
        <div class="no" @click="goIndex">返回首页</div>
      </div>
      <!-- 规则 -->
      <div class="ruleBox">
        <div class="ruleTitle"></div>
        <div class="rules">
          <p>1. 领取红包后，需分享给好友请好友帮忙助力。每位好友可帮你助力一次，且助力好友必须为超级头条新用户！分享越多，获得助力越多，提现金额增长越快;</p>
          <p>2. 红包获得后无时间限制，无助力次数限制，可一直分享，邀请好友助力，超高奖励等你来拿;</p>
          <p>3. 发起助力红包的用户提现后，将无法再参与活动;</p>
          <p>4. 去提现时需要下载超级头条APP提现，提现时需要超级头条服务方审核，审核时效为2天以内;</p>
          <p>5. 用户提现时，若微信侧判定用户账户存在潜在风险，或导致无法打款成功，敬请谅解，也可通过超级头条APP联系客服了解详情;</p>
          <p>6. 如果用户存在违规行为（包括但不限于洗钱、虚假交易、赌博、恶意套现、作弊、刷信誉、刷金币），主办方将取消用户的活动参与资格，并有权收回违规奖励等利益，同时依照相关规则进行处罚;</p>
          <p>7. 如出现不可抗力或情势变更的情况（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动受严重网络攻击或因系统故障需要暂停举办的），则主办方可依据相关法律法规的规定主张免责;</p>
        </div>
      </div>
      <!-- 提现弹窗 -->
      <div class="v-modal helpHB_fadeIn" v-show="isWithdrawalModalShow" @touchmove.prevent>
          <div class="modal withdrawalModal">
            <div class="helpHB_cash"></div>
            <div class="withdrawalTips"><span>{{data.limit_cash|decimal(0)}}元</span>红包仅限首次领取,现在提现将损失<span>{{data.residue}}元</span>，确认立即提现?</div>
            <div class="shareBtn scaleBtn" @click="shareBtn">喊好友助力</div>
            <span class="withdrawalBtn" @click="jump('withdraw',1)">继续提现</span>
          </div>
      </div>  
      <!-- 预约成功 -->
      <div class="successful helpHB_fadeIn" v-show="isSuccessful">{{successMsg}}</div>  
      <div class="v-modal" v-show="isShare" @touchmove.prevent>
        <section class="shareLoading">
          <div class="loading-icon spinner-snake" style="border-top-color:#fff;border-left-color:#fff;border-bottom-color:#fff;"></div>
          <div class="loading-txt">正在加载...</div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import nvLoading from "@/components/loading.vue";
import nvMarquee from "@/components/marquee";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";
import pagers from "@/assets/js/pagers";
export default {
  name:'helpHB',
  data(){
    return{
      loading:false,
      isShare:false,//是否唤醒分享loading
      marqueePlay:false,//1,5显示
      awardsList:[],//获奖名单
      data:{
        account_cash:"0",//累积获取零钱（为1，4，5含有此字段）
        status:4,//用户活动状态  1.助力中 2.非新用户 3.活动结束 4.发生提现-活动终止 5.金额已满-活动终止
        list:[],//	助力列表（为1含有此字段）
        residue:'0',//	剩余可获得零钱（为1含有此字段）
        scale:'0',
        limit_cash:0,//总金额
      },
      seatLength:5,
      doneStyle:'width:0%;transition: all 1s linear;',//助力的进度条
      tipsStyle:'left:0;',//提示框位置
      helpBtnStr:'',//按钮文字
      isWithdrawalModalShow:false,//提现弹窗
      isSuccessful:false,//预约成功提示
      successMsg:'',
      informStr:'下次活动通知我',
      isInform:true,
    }
  },
  components: {
    nvLoading,
    nvMarquee,
  },
  created(){
    this.$Progress.start();
    this.randomAwardsList();
    this.getUserInfo();
  },
  mounted(){
    window.afterPullDown = function() {
      this.getUserInfo();
    }.bind(this);
  },
  destoryed(){
  },
  methods:{
    /**
     * 未助力满提现
     */
    async getUserInfo(){
      let params={};
      let comm= await appcall.getRequestData(params);
      let rs= await ajax(
        'post',
        this.$apiurl+'/redEnvelopePower/getPowerStatus',
        comm,
        params
      )
      if(rs&&rs.data&&rs.code==1001){
        this.$Progress.finish();
        this.data=rs.data;
        if(rs.data.status==1||rs.data.status==5){
          //好友助力 位置最少5位
          if(rs.data.list){
            if(rs.data.list.length<5){
              this.seatLength=6-rs.data.list.length;
            }else{
              this.seatLength=1;
            }
          }else{
            this.seatLength=5;
          }
        }
        //助力中
        if(rs.data.status==1){
          setTimeout(()=>{
            this.marqueePlay=true;
          },0)
          this.helpBtnStr='邀请好友助力';
          let percentage= (rs.data.scale*100).toFixed(2),
              tipsLeft=0;
          setTimeout(()=>{
            this.doneStyle='width:'+percentage+'%;transition: all 1s linear;';
          },100)
          //进度条最小15%，最大85%
          if(percentage>85){
            tipsLeft=85;
          }else if(percentage<15){
            tipsLeft=15;
          }else{
            tipsLeft=percentage;
          }
          setTimeout(()=>{
            this.tipsStyle='left:'+tipsLeft+'%;';
          },0)
          let logParams = {operation:'加载红包页'};
          let logComm = await appcall.getRequestData(logParams);
          ajax(
            "POST",
            this.$apiurl + "/redEnvelopePower/addOperationLog",
            logComm,
            logParams
          );
        }else if(rs.data.status==5){  //助力满
          setTimeout(()=>{
            this.marqueePlay=true;
          },100)
          this.helpBtnStr='立即提现';
          this.doneStyle='width:'+100+'%;transition: all 1s linear;';
          let logParams = {operation:'加载金额已满页'};
          let logComm = await appcall.getRequestData(logParams);
          ajax(
            "POST",
            this.$apiurl + "/redEnvelopePower/addOperationLog",
            logComm,
            logParams
          );
        }else if(rs.data.status==4){
          let logParams = {operation:'加载活动终止页'};
          let logComm = await appcall.getRequestData(logParams);
          ajax(
            "POST",
            this.$apiurl + "/redEnvelopePower/addOperationLog",
            logComm,
            logParams
          );
          this.getInformState();
        }else if(rs.data.status==2){
          let logParams = {operation:'加载此活动限制新用户参与页'};
          let logComm = await appcall.getRequestData(logParams);
          ajax(
            "POST",
            this.$apiurl + "/redEnvelopePower/addOperationLog",
            logComm,
            logParams
          );
        }else{
          let logParams = {operation:'加载活动结束页'};
          let logComm = await appcall.getRequestData(logParams);
          ajax(
            "POST",
            this.$apiurl + "/redEnvelopePower/addOperationLog",
            logComm,
            logParams
          );
        }
      }else if (rs && rs.code == 1005) {
        this.$Progress.finish();
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$Progress.finish();
        this.$alert(rs.msg).then(ok => {
          this.getUserInfo();
        });
      }
    },
    /**
     * 未助力满提现
     */
    async withdrawal(){
      this.isWithdrawalModalShow=true;
      let logParams = {operation:'红包页-点击提现'};
      let logComm = await appcall.getRequestData(logParams);
      ajax(
        "POST",
        this.$apiurl + "/redEnvelopePower/addOperationLog",
        logComm,
        logParams
      );
    },
    /**
     * 弹窗中的按钮分享
     */
    shareBtn(){
      this.isWithdrawalModalShow=false;
      this.share(2);
    },
    /**
     * 助力分享
     */
    async share(where){
      this.isShare=true;
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "POST",
        this.$apiurl + "/redEnvelopePower/getRedEnvelopShareUrl",
        comm,
        params
      );
      if (rs &&rs.data&& rs.code === 1001) {
        if(where==1){
          let logParams = {operation:'红包页-点击邀请好友注册'};
          let logComm = await appcall.getRequestData(logParams);
          ajax(
            "POST",
            this.$apiurl + "/redEnvelopePower/addOperationLog",
            logComm,
            logParams
          );
        }else{
          let logParams = {operation:'提现弹窗-点击喊好友助力'};
          let logComm = await appcall.getRequestData(logParams);
          ajax(
            "POST",
            this.$apiurl + "/redEnvelopePower/addOperationLog",
            logComm,
            logParams
          );
        }

        let data = rs.data;
        let params = {
          type: 1,
          title:data.title,
          url: data.url,
          desc: data.description,
          images: data.img_url,
        };
        this.isShare=false;
        appcall.invite(params);
      }else if (rs && rs.data &&  rs.code == 1005) {
        this.isShare=false;
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.isShare=false;
        this.$alert(rs.msg)
      }
    },
    /**
     * 跳转
     */
    async jump(type,where='') {
      switch (type) {
        case "withdraw":
          this.isWithdrawalModalShow=false;
          if(where==1){
            let logParams = {operation:'提现弹窗-点击继续提现'};
            let logComm = await appcall.getRequestData(logParams);
            ajax(
              "POST",
              this.$apiurl + "/redEnvelopePower/addOperationLog",
              logComm,
              logParams
            );
          }else if(where==2){
            let logParams = {operation:'金额已满页-点击立即提现'};
            let logComm = await appcall.getRequestData(logParams);
            ajax(
              "POST",
              this.$apiurl + "/redEnvelopePower/addOperationLog",
              logComm,
              logParams
            );
          }else{}
          appcall.navigator({
            title: "我要提现",
            url: this.$h5url + pagers[this.$currVer].redeem,
            type: "tixian"
          });
          break;
        case "taskcenter":
          let logParams = {operation:'限制新用户页-点击做任务赚金币'};
          let logComm = await appcall.getRequestData(logParams);
          ajax(
            "POST",
            this.$apiurl + "/redEnvelopePower/addOperationLog",
            logComm,
            logParams
          );
          appcall.navigator({
            title: "任务中心",
            url: this.$h5url + pagers[this.$currVer].taskcenter,
          });
          break;
      }
    },
    /**
     * 获取用户预约状态
     */
    async getInformState(){
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "POST",
        this.$apiurl + "/redEnvelopePower/checkPowerMessageStatus",
        comm,
        params
      );
      if (rs && rs.data && rs.code === 1001) {
        if(rs.data.status==1){
          this.isInform=false;
          this.informStr='已预约下次活动';
        }else{
          this.isInform=true;
          this.informStr='下次活动通知我';
        }
      }else if (rs && rs.data && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg)
      }
    },
    /**
     * 通知我
     */
    async informMe(){
      if(this.isInform){
        let params = {};
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "POST",
          this.$apiurl + "/redEnvelopePower/addUserPowerMessage",
          comm,
          params
        );
        if (rs && rs.data && rs.code === 1001) {
          this.successMsg=rs.msg;
          this.isSuccessful=true;
          this.informStr='已预约下次活动';
          this.isInform=false;
          setTimeout(()=>{
            this.isSuccessful=false;
          },2000)
          let logParams = {operation:'活动终止页-点击下次活动通知我'};
          let logComm = await appcall.getRequestData(logParams);
          ajax(
            "POST",
            this.$apiurl + "/redEnvelopePower/addOperationLog",
            logComm,
            logParams
          );
        }else if (rs && rs.data && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg)
        }
      }
    },
    /**
     * 去阅读
     */
    async goIndex(){
      let logParams = {operation:'限制新用户页-点击返回首页'};
      let logComm = await appcall.getRequestData(logParams);
      ajax(
        "POST",
        this.$apiurl + "/redEnvelopePower/addOperationLog",
        logComm,
        logParams
      );
      appcall.articles();
    },
    /**
     * 随机生成获奖名单
     */
    randomAwardsList(){
      let name=['救星','好好市民','Rose','连123456','你的M4a1','sun','51452','Lily','7526442','邀请码:123','超友1256','官方邀请码:526541','几分诗意','Jasmine','超友8542','kobe23','kaka','紫罗兰','一个人的夜','超友1221','超友2542','超友9241','超友1852','超友2365'];
      let record=['提现1元','提现1元','提现1元','提现1元','提现1元','提现1元','提现1元','提现1元','提现1元','提现1元','提现1元','提现30元','提现30元','提现30元','提现50元','提现100元','提现1元','提现1元','提现1元','提现1元','提现1元','提现1元']
      for(let i=0;i<20;i++){
        let item ={};
        item.img=require("@/assets/images/faces/face"+this.rnd(0,81)+".jpg");
        item.name=name[i];
        item.record=record[i];
        this.awardsList.push(item);
      }
    },
    /**
     * 随机生成n-m之间的数包含n,m
     */
    rnd(n,m){
      var random = Math.floor(Math.random()*(m-n+1)+n);
      return random;
    }
  },
  filters:{
    name(value) {
      if (value) {
        value = value.length < 5 ? value : value.substr(0, 4)+'...';
      }
      return value;
    }
  },
  computed:{
  },
  watch:{
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin";
.helpHB{
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background:linear-gradient(135deg,rgba(255,64,69,1),rgba(230,50,55,1));
  .helpHB_fadeIn{
    animation: fadeIn .3s linear 1  both;
    -webkit-animation: fadeIn .3s linear 1 both;
  }
  @keyframes fadeIn {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  .scaleBtn{
    transform: scale(1);
    animation: scaleBtn .4s linear infinite alternate both;
    -webkit-animation: scaleBtn .4s linear infinite alternate both;
  }
  @keyframes scaleBtn {
    0%{
      transform: scale(1);
      -webkit-transform: scale(1);
    }
    100%{
      transform: scale(.94);
      -webkit-transform: scale(.94);
    }
  }
  .helpHB_header{
    width: 7.5rem;
    height: 2.8rem;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .flushCrollBG{
      position: absolute;
      top: 2rem;
      left: 0;
      width: 1.9rem;
      .background('helpHB/helpHB_Rectangle.png');
      .flushCroll{
        width: 100%;
        border-top-right-radius: .72rem;
        border-bottom-right-radius: .72rem;
        overflow: hidden;
        ul{
          width: 100%;
          li{
            height: .72rem!important;
            img{
              width: .5rem;
              height: .5rem;
              .border(#fff);
              border-radius: 50%;
              margin:.1rem 0 0 .08rem;
            }
            div{
              margin-left: .1rem;
              margin-top: .16rem;
              height: .56rem;
              width: 1.1rem;
              line-height: .28rem;
              p{
                width: 200%;
                color: #fff;
                font-size: .44rem;
                transform: scale(0.5);
                transform-origin: 0 0;
              }
            }
          }
        }
      }
    }
  }
  .helpHB_content1,.helpHB_content2,.helpHB_content3{
    // min-height: 5.22rem;
    width: 6.9rem;
    margin: 0 auto;
    padding-bottom:.3rem; 
    background:linear-gradient(180deg,rgba(255,250,241,1),rgba(254,231,190,1));
    border-radius:.1rem;
    overflow: hidden;
    text-align: center;
    .inform,.no{
      margin: 0 auto;
      width: 6.3rem;
      height: 1.04rem;
      .background('helpHB/helpHB_btn.png');
      line-height: 1rem;
      color: #ffffff;
      font-size: .4rem;
      font-weight: bold;
      border-radius: .1rem;
    }
    .no{
      margin-top: .24rem;
      margin-bottom: 0;
      background: transparent;
      border: .03rem solid #F12926;
      color: #F12926;
    }
  }
  .helpHB_content1{
    .gain{
      width: 100%;
      margin: .4rem auto 0;
      .money{
        color: #DE0D26;
        font-size: 1rem;
        height: 1rem;
        line-height:1rem;
        font-weight: bold;
        padding-top: .05rem;
      }
      span{
        font-size: .36rem;
        color: #DE0D26;
        font-weight: normal;
        display: inline-block;
        vertical-align: text-bottom;
        position: relative;
        &:nth-child(1){
          margin-right: .1rem;
        }
        &:nth-child(3){
          margin-left: .1rem;
        }
      }
      i{
        display: block;
        width: .88rem;
        height: .4rem;
        line-height: .39rem;
        border-radius: .25rem;
        position: absolute;
        bottom: 5%;
        left: .56rem;
        font-size: .24rem;
        color: #F12926;
        .border(#F12926);
        font-weight: normal;
      }
    }
    .HBprogressBox{
      width: 100%;
      margin: 1.02rem auto .88rem;
      .HBprogressBox_bar{
        position: relative;
        width: 5.7rem;
        height: .12rem;
        background:#D8D8D8;
        border-radius: .2rem;
        margin: 0 auto;
        border-radius: 50px;
        .tips1{
          position: absolute;
          .background('helpHB/helpHB_more.png');
          width: 2.8rem;
          height: .56rem;
          top: -.62rem;
          left:33%;
          margin-left: -1.4rem;
          color: #8B572A;
          font-size: .24rem;
          line-height: .48rem;
          span{
            color: #D0021B;
          }
        }
        .tips2{
          position: absolute;
          .background('helpHB/helpHB_enough.png');
          width: 1.38rem;
          height: .52rem;
          top: -.62rem;
          left: 4.62rem;
          color: #8B572A;
          font-size: .24rem;
          line-height: .44rem;
          span{
            color: #D0021B;
          }
        }
        .tips1,.tips2{
          animation: fadeIn 1s linear 1 .8s both;
          -webkit-animation: fadeIn 1s linear 1 .8s both;
        }
        @keyframes fadeIn {
          0%{
            opacity: 0;
          }
          100%{
            opacity: 1;
          }
        }
        .done{
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          border-radius: 50px;
          background:linear-gradient(90deg,rgba(250,217,97,1),rgba(247,107,28,1));
          transition: all 1s linear;
        }
        p{
          position: absolute;
          top: .42rem;
          left: 0;
          width: 100%;
          color: #DE0D26;
          font-size: .28rem;
          line-height: .28rem;
        }
      }
    }
    .helpBtn{
      margin: 0 auto .34rem;
      width: 6.3rem;
      height: 1.04rem;
      .background('helpHB/helpHB_btn.png');
      line-height: 1rem;
      color: #ffffff;
      font-size: .4rem;
      font-weight: bold;
    }
    .friendsBox{
      width: 6.3rem;
      height: 1.1rem;
      margin: 0 auto;
      background: #FFE5B9;
      position: relative;
      .tit{
        width: 1.18rem;
        height: 1.1rem;
        text-align: center;
        padding:.25rem 0;
        color: #D0021B;
        font-size: .24rem;
        line-height: .3rem;
      }
      .list{
        width: 5.12rem;
        height: 1.1rem;
        overflow-x: scroll;
        .listContent{
          height: 100%;
          white-space: nowrap;
          overflow-x: scroll;
          padding-left: .1rem;
          .inlineBlock{
            display: inline-block;
            vertical-align: top;
          }
          .alreadyHelp{
            margin: .2rem .24rem .2rem 0;
            width: .7rem;
            height: .7rem;
            border-radius: 50%;
            .border(#FF8B89);
            background:#FFD3D8;
            position: relative;
            text-align: center;
            line-height: .7rem;
            color: #D0021B;
            font-size: .28rem;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
            span{
              position: absolute;
              top: .53rem;
              left: 0;
              width: 1.4rem;
              height: .6rem;
              background: #F64D4D;
              border-radius: .3rem;
              line-height: .6rem;
              color: #ffffff;
              font-size: .44rem;
              transform: scale(0.5);
              transform-origin: 0 0;
              margin-left: -0.02rem;
            }
          }
          .seat{
            margin: .2rem .24rem .2rem 0;
            width: .7rem;
            height: .7rem;
            .background('helpHB/helpHB_seat.png');
          }
        }
      }
      .dim{
        position: absolute;
        right: 0;
        top: 0;
        width: .42rem;
        height: 100%;
        background:linear-gradient(90deg,rgba(255,223,169,0),rgba(255,223,169,1));
      }
    }
  }
  .helpHB_content2{
    .gain{
      width: 100%;
      margin: .4rem auto 0;
      .money{
        color: #DE0D26;
        font-size: 1rem;
        height: 1rem;
        line-height:1rem;
        font-weight: bold;
        padding-top: .05rem;
      }
      span{
        font-size: .36rem;
        color: #DE0D26;
        font-weight: normal;
        display: inline-block;
        vertical-align: text-bottom;
        position: relative;
        &:nth-child(1){
          margin-right: .1rem;
        }
        &:nth-child(3){
          margin-left: .1rem;
        }
      }
    }
    .haveAttended{
      margin:.6rem auto .3rem;
      color: #333;
      font-size: .36rem;
      line-height: .36rem; 
    }
  }
  .helpHB_content3{
    p{
      margin: 1rem auto;
      color: #333;
      font-size: .6rem;
      line-height: .6rem; 
    }
  }
  .ruleBox{
    margin: .2rem auto;
    width: 6.9rem;
    background: #F34D50;
    padding: .5rem .3rem .3rem;
    .ruleTitle{
      width: 6.3rem;
      height: .34rem;
      margin-bottom: .4rem;
      .background('helpHB/helpHB_ruleTitle.png');
    }
    .rules{
      p{
        line-height: .48rem;
        font-size: .28rem;
        color: #F2C68A;
      }
    }
  }
  .v-modal{
      .mask(0,0,0,0.5);
    .withdrawalModal{
      background: #FFFFFF;
      width: 6rem;
      position: relative;
      border-radius: .2rem;
      padding: 1.6rem 0 .3rem;
      text-align: center;
      .helpHB_cash{
        width: 2.8rem;
        height: 2.8rem;
        .background('helpHB/helpHB_cash.png');
        position: absolute;
        left: 0;
        right: 0;
        top: -1.2rem;
        margin: 0 auto;
      }
      .withdrawalTips{
        margin:0 auto .4rem;
        width: 5.2rem;
        min-height: 1.2rem;
        font-size: .32rem;
        color: #333;
        line-height: .6rem;
        span{
          font-size: .44rem;
          color: #F12926;
          font-weight: bold;
        }
      }
      .shareBtn{
        width: 5.4rem;
        height: .8rem;
        line-height: .8rem;
        background:linear-gradient(135deg,rgba(255,121,75,1),rgba(241,41,38,1));
        font-size: .32rem;
        color: #ffffff;
        border-radius: .42rem;
        text-align: center;
        margin: 0 auto .2rem;
      }
      .withdrawalBtn{
        font-size: .32rem;
        color: #F12926;
      }
    }
    .shareLoading{
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      width: 2.6rem;
      height: .8rem;
      margin: -.4rem auto;
      text-align: center;
      font-size: .2rem;
      line-height: 1;
      padding: 0;
      display: box;
      display: -webkit-box;
      display: -moz-box;
      -webkit-box-pack: center;
      -moz-box-pack: center;
      -webkit-box-align: center;
      -moz-box-align: center;
      border-radius: .06rem;
      background: rgba(0,0,0,.7);
    }
    .loading-icon{
      width: .28rem;
      height: .28rem;
    }
    .loading-txt{
      color: #fff;
      display: block;
      padding-left: .2rem
    }
    .spinner-snake {
      -webkit-animation: spinner-rotate 0.8s infinite linear;
      animation: spinner-rotate 0.8s infinite linear;
      border: 2px solid transparent;
      border-radius: 50%;
    }
    @keyframes spinner-rotate {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @-webkit-keyframes spinner-rotate {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  }
  .successful{
    position: absolute;
    top: 50%;
    left: 50%;
    max-width:80%;
    line-height: .3rem;
    padding: .3rem;
    text-align: center;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background:rgba(0,0,0,0.8);
    border-radius:.1rem;
    color: #fff;
    font-size: .3rem;
  }
}
</style>


