<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <nv-loading :loading="loading"></nv-loading>
    <div class="wrap" v-show="!loading">
      <!-- 匹配页面 -->
      <div class="matching " v-if="tabsIndex==1" :class="{'succeed':matchSucceed}">
        <!-- 返回 -->
        <i class="dice_back" @click="goBack"></i>
        <!-- 匹配中 用户头像 -->
        <div class="userImg" v-if="!matchSucceed"><img :src="userInfo.my_avatar"></div>
        <!-- 匹配成功后 用户信息 -->
        <div class="myImg" v-if="matchSucceed">
          <img :src="userInfo.my_avatar">
          <div class="name">{{userInfo.my_nickname| name}}</div>
        </div>
        <!-- 匹配成功后 战友信息 -->
        <div class="otherImg" v-if="matchSucceed">
          <img :src="userInfo.other_avatar">
          <div class="name">{{userInfo.other_nickname | name}}</div>
        </div>
        <!-- 匹配中 -->
        <div class="ing" v-if="!matchSucceed">正在匹配战友 <span class="dot">...</span></div>
        <div class="tips">本场消耗：80<i class="coin"></i></div>
        <!-- 金币不足弹窗 -->
        <div class="v-modal" v-show="isInsufficientShow" @touchmove.prevent>
          <div class="modal insufficientModal">
            <div class="insufficient">
              <div class="insufficientTitle">提示</div>
              <div class="insufficientTips">金币不足啦, 先去赚金币再来竞猜哦</div>
              <div class="goArticle" @click="goHotList">阅读新闻赚金币</div>
            </div>
            <div class="close" @click="closeInsufficient"></div>
          </div>
        </div>
      </div>
      <!-- 对战页面 -->
      <div class="fighting" v-if="tabsIndex==2">
        <!-- 返回 -->
        <i class="dice_back" @click="goBack"></i>
        <!-- 对战中 用户信息 -->
        <div class="myImg">
          <img :src="userInfo.my_avatar">
          <div class="name">{{userInfo.my_nickname| name}}</div>
        </div>
        <!-- 对战中 战友信息 -->
        <div class="otherImg">
          <img :src="userInfo.other_avatar">
          <div class="name">{{userInfo.other_nickname | name}}</div>
        </div>
        <!-- 额外胜场奖励tips -->
        <div class="extraBonus">连续猜对5场，额外获得99元红包：{{userInfo.win}}</div>
        <!-- 倒计时 -->
        <div class="timeOut" v-show="isShow8">
          <div class="bg"></div>
          <div class="wrap1 " v-show="wrapShow1" :class="{'zhuan':numShow}"></div>
          <div class="wrap2 " v-show="wrapShow2" :class="{'zhuan1':numShow}"></div>
          <div class="wrap3" v-show="!wrapShow1"></div>
          <span><i>0</i>{{num}}</span>
        </div>
        <div class="timeOut" v-show="!isShow8">
          <div class="bg"></div>
          <div class="wrap1 " v-show="wrapShow6_1" :class="{'zhuan6s_1':numShow6}"></div>
          <div class="wrap2 " v-show="wrapShow6_2" :class="{'zhuan6s_2':numShow6}"></div>
          <div class="wrap3" v-show="!wrapShow6_1"></div>
          <span><i>0</i>{{num6}}</span>
        </div>
        <!-- 骰子 -->
        <!-- <div class="dices"> -->
          <!-- 骰子静态图 -->
          <!-- <div class="diceInit" v-if="diceStatus==0">
            <img src="../../../assets/images/dice/dice_diceInit.png">
          </div>
          <div class="diceShake" v-if="diceStatus==1">
            <img src="../../../assets/images/dice/dice_diceShake.gif">
          </div>
          <div class="diceGroup" v-if="diceStatus==2">
            <img :src="diceImg[0][dicePoint[0]]">
            <img :src="diceImg[1][dicePoint[1]]">
            <img :src="diceImg[2][dicePoint[2]]">
          </div> -->
        <!-- </div> -->
        <div class="dice_group " :class="{'moveToCenter':isMoveToCenter,'moveToBack':isMoveToBack}">
          <div class="dice_shaizhong " :class="{'shaizhongClose':isShaizhongClose,'shaizhongShake':isShaizhongShake,'shaizhongOpen':isShaizhongOpen}">
            <img src="../../../assets/images/dice/dice_shaizhong.png">
          </div>
          <div class="dice_dizuo">
            <img :src="diceImg[0][dicePoint[0]]">
            <img :src="diceImg[1][dicePoint[1]]">
            <img :src="diceImg[2][dicePoint[2]]">
          </div>
        </div>
        <!-- 按钮 -->
        <div class="GT">
          <div @click="sure(1)" class="radiobutton" :class="{'chosed':chosed==1&&!hadDiceResult,'diceWinner':hadDiceResult&&isGTWin,'diceLoser':hadDiceResult&&!isGTWin}">
            <div class="content" v-if="chosed==0">猜大</div>
            <div class="content" v-if="chosed!==0" :class="{'dice_winner':hadDiceResult&&isGTWin,'dice_loser':hadDiceResult&&!isGTWin}"><i :class="{'dice_winnerImg':hadDiceResult&&isGTWin,'dice_loserImg':hadDiceResult&&!isGTWin}" v-if="chosed==1||hadDiceResult"></i>大</div>
          </div>
          <div class="diceExplain">≧ 11点</div>
        </div>
        <div class="LT">
          <div @click="sure(2)" class="radiobutton" :class="{'chosed':chosed==2&&!hadDiceResult,'diceLoser':hadDiceResult&&isGTWin,'diceWinner':hadDiceResult&&!isGTWin}">
            <div class="content" v-if="chosed==0">猜小</div>
            <div class="content" v-if="chosed!==0" :class="{'dice_loser':hadDiceResult&&isGTWin,'dice_winner':hadDiceResult&&!isGTWin}"><i :class="{'dice_loserImg':hadDiceResult&&isGTWin,'dice_winnerImg':hadDiceResult&&!isGTWin}" v-if="chosed==2||hadDiceResult"></i>小</div>
          </div>
          <div class="diceExplain">≦ 10点</div>
        </div>
        <!-- 中奖播报 -->
        <nv-marquee :duration="1200" :interval="3000" :play="marqueePlay" class="flushCroll" ref="flushCroll" :height="0.64">
          <li v-for="(item,$index) in scrollbarData" :key="$index">
            <img :src="item.avatar">
            <span class="phone">{{item.nickname}}</span><span>获得<i>99元</i>红包</span>
          </li>
        </nv-marquee>
        <!-- 当前点数弹窗 -->
        <div class="countModal" v-show="isCountModalShow">
            当前点数：{{diceCount}}
        </div>
        <!-- 失效弹窗 -->
        <div class="v-modal" v-show="isFailureModalShow">
          <div class="failureModal modal">
            <div class="failureTips">本局失效</div>
            <div class="failureBtn">{{failureCountdown}}秒后返回活动首页</div>
          </div>
        </div>
        <!-- 赢 弹窗 -->
        <div class="v-modal" v-show="iswinnerModalShow">
          <div class="modal winnerModalWrap">
            <div class="winnerModal">
              <!-- 用户信息 -->
              <div class="winnerModal_myImg">
                <img :src="userInfo.my_avatar">
                <div class="winnerModal_name">{{userInfo.my_nickname| name}}</div>
              </div>
              <!-- 战友信息 -->
              <div class="winnerModal_otherImg">
                <img :src="userInfo.other_avatar">
                <div class="winnerModal_name">{{userInfo.other_nickname | name}}</div>
              </div>
              <!-- 祝贺 -->
              <img class="congratulation" src="../../../assets/images/dice/congratulation.png">
              <!-- 按钮 -->
              <div class="winnerModal_oneMore">
                <div @click="goBack">再来一局</div>
              </div>
              <div class="winnerModal_shareBtn">
                <div @click="showShareModal(1)">炫耀战绩</div>
              </div>
            </div>
            <div class="close" @click="closeResultModal"></div>
          </div>
        </div>
        <!-- 输 弹窗 -->
        <div class="v-modal" v-show="isloserModalShow">
          <div class="modal loserModalWrap">
            <div class="loserModal">
              <!-- 用户信息 -->
              <div class="loserModal_myImg">
                <img :src="userInfo.my_avatar">
                <div class="loserModal_name">{{userInfo.my_nickname| name}}</div>
              </div>
              <!-- 战友信息 -->
              <div class="loserModal_otherImg">
                <img :src="userInfo.other_avatar">
                <div class="loserModal_name">{{userInfo.other_nickname | name}}</div>
              </div>
              <!-- 再接再厉 -->
              <div class="encourage">胜败乃常事，重新来过！</div>
              <!-- 按钮 -->
              <div class="loserModal_oneMore">
                <div @click="goBack">再来一局</div>
              </div>
              <div class="loserModal_shareBtn">
                <div @click="showShareModal(2)">邀友作战</div>
              </div>
            </div>
            <div class="close" @click="closeResultModal"></div>
          </div>
        </div>
        <!-- 分享弹窗 -->
        <div class="v-modal" v-show="isShareModalShow">
          <div class="ShareModal">
            <div class="shareBox clear">
              <a @click="share(2)">
              <div class="pyq left">
                <div class="pyqImgBox">
                  <img src="../../../assets/images/dice/dice_pyq.png">
                </div>
                <div class="shareTips">分享到朋友圈</div>
              </div>
              </a>
              <a @click="share(1)">
              <div class="WeChart left">
                <div class="WeChartImgBox">
                  <img src="../../../assets/images/dice/dice_wx.png">
                </div>
                <div class="shareTips">分享到微信</div>
              </div>
              </a>
            </div>
            <div class="shareCancel" @click="closeResultModal">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import nvMarquee from "@/components/marquee";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";

export default {
  name:'diceContent',
  data(){
    return{
      loading:true,
      userInfo:{},
      tabsIndex:1, //1是匹配，2是对战
      //matching部分
      isInsufficientShow:false, //金币不足弹窗
      warningMsg:'',
      matchSucceed:false,   //匹配是否成功
      //fighting部分
      marqueePlay: false,
      scrollbarData:[],
      num:8, //选择倒计时
      num6:6, //动画倒计时
      isShow8:true, //选择倒计时显示
      numShow:false, 
      numShow6:false,
      wrapShow1:true,
      wrapShow2:true,
      wrapShow6_1:true,
      wrapShow6_2:true,
      chosed:0,//0 未选择 1 猜大 2猜小
      disabled:false,   // 按钮禁止状态
      diceStatus:0,     // 骰子状态 //0 静态开始 1 动态摇骰子 2静态结果
      isShaizhongClose:false,//筛盅合上
      isShaizhongOpen:false,//筛盅打开
      isMoveToCenter:false,//合并后移动到中间
      isMoveToBack:false,//回原位
      isShaizhongShake:false,//要筛盅
      diceResult:{},    // 骰子结果   win:1 赢 win:2 输
      dicePoint:[5,5,5],     // 骰子对应点数数组 
      diceCount:0,      //骰子总点数
      diceImg:[             // 骰子对应的图片 一点的index为1
        [
          require("@/assets/images/dice/dice_l1.png"),
          require("@/assets/images/dice/dice_l2.png"),
          require("@/assets/images/dice/dice_l3.png"),
          require("@/assets/images/dice/dice_l4.png"),
          require("@/assets/images/dice/dice_l5.png"),
          require("@/assets/images/dice/dice_l6.png"),
        ],
        [
          require("@/assets/images/dice/dice_r1.png"),
          require("@/assets/images/dice/dice_r2.png"),
          require("@/assets/images/dice/dice_r3.png"),
          require("@/assets/images/dice/dice_r4.png"),
          require("@/assets/images/dice/dice_r5.png"),
          require("@/assets/images/dice/dice_r6.png"),
        ],
        [
          require("@/assets/images/dice/dice_t1.png"),
          require("@/assets/images/dice/dice_t2.png"),
          require("@/assets/images/dice/dice_t3.png"),
          require("@/assets/images/dice/dice_t4.png"),
          require("@/assets/images/dice/dice_t5.png"),
          require("@/assets/images/dice/dice_t6.png"),
        ],],
      hadDiceResult:false,    //是否出结果
      isGTWin:false,  //猜大赢:true,猜大输:false
      isCountModalShow:false, //总点数弹窗
      isFailureModalShow:false, //失效弹窗
      failureCountdown:3,   //失效倒计时数
      iswinnerModalShow:false, //赢 弹窗
      isloserModalShow:false, //输 弹窗
      isShareModalShow:false,    //分享弹窗
      action:0,  //	1 => 炫耀战绩    2=> 邀友作战
    }
  },
  components: {
    nvHead,
    nvLoading,
    nvMarquee,
  },
  created(){
    this.$Progress.start();
    appcall.hideNavBar();
  },
  mounted(){
    this.getUserInfo();
    // this.start();
  },
  beforeDestroy(){
    this.pullDown();
  },
  destroyed(){
    this.pullDown();
  },
  methods:{
    //公共部分
    /**
     * 判断用户金币足不足
     */
    async getUserInfo(){
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "POST",
        this.$apiurl + "/lottery/start_match",
        comm,
        params
      );
      this.$Progress.finish();
      if (rs && rs.code === 1001) {
        this.userInfo=rs.data;
        this.loading = false;
        //判断金币是否足够
        if(rs.data.is_enough){
          if(this.changeMatchSucceed) clearTimeout(this.changeMatchSucceed)
          //金币足够 3s后进入匹配页
          this.changeMatchSucceed=setTimeout(()=>{this.matchSucceed=true;},3000);
          //进入匹配页 3s后进入对战页
          if(this.changeTabs) clearTimeout(this.changeTabs)
          this.changeTabs=setTimeout(()=>{this.start();},6000);  
        }else{
          //金币不够=>弹窗
          this.warningMsg=rs.msg;
          this.isInsufficientShow=true;
        }
      }else if(rs.code === 1005){
        this.loading = false;
        this.$alert(rs.msg).then(()=>{
          // appcall.login();
          // this.$router.push('/');
          this.$router.go(-1);
        })
      }else{
        this.loading = false;
        this.$alert(rs.msg).then(()=>{
          // this.$router.push('/');
          this.$router.go(-1);
        })
      }
    },
    /**
     * 返回
     */
    goBack(){
      // this.$router.push('/');
      this.$router.go(-1);
    },

    /**
     * 页面初始化
     */
    pullDown(){
      if(this.changeMatchSucceed) clearTimeout(this.changeMatchSucceed)
      if(this.changeTabs) clearTimeout(this.changeTabs)
      if(this.showTimer) clearInterval(this.showTimer);
      if(this.countDownInt){clearInterval(this.countDownInt);}
      if(this.countDownInt1){clearInterval(this.countDownInt1);}
      if(this.diceShakeTimer){clearTimeout(this.diceShakeTimer);}
      if(this.getShakeResultTimer){clearTimeout(this.getShakeResultTimer);}
      if(this.failureModalShowTimer){clearTimeout(this.failureModalShowTimer);}
      if(this.failureCountdownTimer)clearInterval(this.failureCountdownTimer);
      if(this.diceStatusTimer){clearTimeout(this.diceStatusTimer);}
      if(this.showResultModal){clearTimeout(this.showResultModal);}
      if(this.timer1)clearTimeout(this.timer1);
      if(this.timer2)clearTimeout(this.timer2);
      if(this.timer3)clearTimeout(this.timer3);
      if(this.timer4)clearTimeout(this.timer4);
    },
    //matching版块
    /**
     * 去阅读
     */
    goHotList(){
      appcall.articles();
      this.closeInsufficient();
    },
    /**
     * 关闭金币不足弹窗
     */
    closeInsufficient(){
      this.isInsufficientShow=false;
      // this.$router.push('/');
      this.$router.go(-1);
    },


    //fighting部分
    /**
     * 底部滚动条
     */
    async scrollbar() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/lottery/dice_info_data",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        this.scrollbarData = rs.data;
        setTimeout(() => {
          this.marqueePlay = true;
        }, 0);
      } else if (rs && rs.code === 1008) {
        // 暂无数据
        this.scrollbarData = [];
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          // appcall.login();
          // this.$router.push('/');
          this.$router.go(-1);
        });
      } else {
      }
    },
    /**
     * 游戏开始
     */
    start(){
      this.tabsIndex=2;
      //1s后开始倒计时
      if(this.showTimer) clearInterval(this.showTimer);
      this.diceShakeTimer=setTimeout(()=>{
          this.show();
          // this.scrollbar();
      },1000)
      
    },
    /**
     * 8秒倒计时
     */
    show(){
      if(this.num == 8){
        this.numShow=true;
        if(this.countDownInt){clearInterval(this.countDownInt);}
        this.countDownInt=setInterval(()=>{
          this.countDown();
        },1000)
      }
    },
    countDown(){
      if (this.num == 0) {
        if(this.countDownInt) clearInterval(this.countDownInt);
        this.numShow=false;
        this.wrapShow1=false;
        this.wrapShow2=false;
        this.disabled=true;
        //根据用户是否下注去请求接口||显示失效弹窗 chosed==0未选择
        if(this.chosed!=0){
          this.getShakeResult();
          this.isShow8=false;
          // 6s摇骰子
          if(this.num6 == 6){
            this.numShow6=true;
            this.wrapShow6_1=true;
            this.wrapShow6_2=true;
            if(this.countDownInt1){clearInterval(this.countDownInt1);}
            this.countDownInt1=setInterval(()=>{
              if (this.num6 == 0) {
                if(this.countDownInt1){clearInterval(this.countDownInt1);}
                this.isShow8=true;
                this.numShow6=false;
                this.wrapShow6_1=false;
                this.wrapShow6_2=false;
                // this.getShakeResult();
              }else {
                this.num6--;
                if(this.num6<=3){
                  this.wrapShow6_1=false;
                }
              }
            },1000)
          }
          this.isShaizhongClose=true;
          if(this.timer1)clearTimeout(this.timer1);
          this.timer1=setTimeout(()=>{
            this.isMoveToCenter=true;
          },500)
          if(this.timer2)clearTimeout(this.timer2);
          this.timer2=setTimeout(()=>{
            this.isShaizhongShake=true;
          },800)
          // 1s后摇骰子
          // if(this.diceShakeTimer){clearTimeout(this.diceShakeTimer);}
          // this.diceShakeTimer=setTimeout(()=>{
          //   this.diceStatus=1;
          // },1000)
          // // 8s后请求接口
          // if(this.getShakeResultTimer){clearTimeout(this.getShakeResultTimer);}
          // this.getShakeResultTimer=setTimeout(()=>{
          //   // this.getShakeResult();
          // },9000)
        }else{
          // 1s后弹窗
          if(this.failureModalShowTimer){clearTimeout(this.failureModalShowTimer);}
          this.failureModalShowTimer=setTimeout(()=>{
            this.diceStatus=0;
            this.isFailureModalShow=true;
            if(this.failureCountdownTimer)clearInterval(this.failureCountdownTimer);
            this.failureCountdownTimer=setInterval(()=>{
              if(this.failureCountdown==0){
                if(this.failureCountdownTimer)clearInterval(this.failureCountdownTimer);
                this.isFailureModalShow=false;
                // this.$router.push('/');
                this.$router.go(-1);
              }else{
                this.failureCountdown --;
              }
            },1000)
          },1000)
        }

      } else {
        this.num--;
        if(this.num<=4){
          this.wrapShow1=false;
        } 
      }
    },
     /**
     * 选择大小
     */
    sure(param){
      if(this.chosed==0 && !this.disabled){
        this.chosed=param;
      }
    },
    /**
     * 请求结果 6秒后请求
     */
    // async getShakeResult(){
    //   let params = {
    //     point:this.chosed
    //   };
    //   // let comm = await appcall.getRequestData(params);
    //   let rs = await ajax(
    //     "POST",
    //     this.$apiurl + "/lottery/dice_detail",
    //     comm,
    //     params
    //   );
    //   if (rs && rs.code === 1001) {
    //     this.diceResult=rs.data;
    //     if(this.timer3)clearTimeout(this.timer3);
    //     this.timer3=setTimeout(()=>{
    //       this.isMoveToBack=true;  
    //       this.dicePoint=[];
    //       for(let item of rs.data.result){
    //         this.diceCount +=item;
    //         item= item-1;
    //         this.dicePoint.push(item);
    //       }
    //       if(this.diceCount>=11){
    //         this.isGTWin=true;
    //       }else{
    //         this.isGTWin=false;
    //       }
    //     },0);
    //     if(this.timer4)clearTimeout(this.timer4);
    //       this.timer4=setTimeout(()=>{
    //       this.isShaizhongShake=false;
    //       this.isShaizhongOpen=true;
    //     },300)
    //     //出答案
    //     if(this.diceStatusTimer){clearTimeout(this.diceStatusTimer);}
    //     this.diceStatusTimer=setTimeout(()=>{
    //       this.hadDiceResult=true;
    //       this.isCountModalShow=true;
    //     },1000)
    //     //根据rs.data.win 显示输赢弹窗 1=> 赢   2=> 输
    //     if(this.showResultModal){clearTimeout(this.showResultModal);}
    //     this.showResultModal=setTimeout(()=>{
    //       if(rs.data.win==1){
    //         this.isCountModalShow=false;
    //         this.iswinnerModalShow=true;
    //       }else if(rs.data.win==2){
    //         this.isCountModalShow=false;
    //         this.isloserModalShow=true;
    //       }else{}
    //     },2500)
    //   }else if(rs.code === 1005){
    //     if(this.timer3)clearTimeout(this.timer3);
    //     this.timer3=setTimeout(()=>{
    //       this.isMoveToBack=true;
    //     },0);
    //     if(this.timer4)clearTimeout(this.timer4);
    //     this.timer4=setTimeout(()=>{
    //       this.isShaizhongShake=false;
    //       this.isShaizhongOpen=true;
    //     },300)
    //     if(this.timer5)clearTimeout(this.timer5);
    //     this.timer5=setTimeout(()=>{
    //       this.$alert(rs.msg).then(()=>{
    //         // appcall.login();
    //         this.$router.push('/');
    //       })
    //     },800)
    //   }else{
    //     if(this.timer3)clearTimeout(this.timer3);
    //     this.timer3=setTimeout(()=>{
    //       this.isMoveToBack=true;
    //     },0);
    //     if(this.timer4)clearTimeout(this.timer4);
    //     this.timer4=setTimeout(()=>{
    //       this.isShaizhongShake=false;
    //       this.isShaizhongOpen=true;
    //     },300)
    //     if(this.timer5)clearTimeout(this.timer5);
    //     this.timer5=setTimeout(()=>{
    //       this.$alert(rs.msg).then(()=>{
    //         this.$router.push('/');
    //       })
    //     },800)
    //   }
    // },
    /**
     * 请求结果 6s动画前先请求
     */
    async getShakeResult(){
      let params = {
        point:this.chosed
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "POST",
        this.$apiurl + "/lottery/dice_detail",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        this.diceResult=rs.data;
        if(this.timer3)clearTimeout(this.timer3);
        this.timer3=setTimeout(()=>{
          this.isMoveToBack=true;  
          this.dicePoint=[];
          for(let item of rs.data.result){
            this.diceCount +=item;
            item= item-1;
            this.dicePoint.push(item);
          }
          if(this.diceCount>=11){
            this.isGTWin=true;
          }else{
            this.isGTWin=false;
          }
        },this.num6*1000);
        if(this.timer4)clearTimeout(this.timer4);
          this.timer4=setTimeout(()=>{
          this.isShaizhongShake=false;
          this.isShaizhongOpen=true;
        },this.num6*1000+300)
        //出答案
        if(this.diceStatusTimer){clearTimeout(this.diceStatusTimer);}
        this.diceStatusTimer=setTimeout(()=>{
          this.hadDiceResult=true;
          this.isCountModalShow=true;
        },this.num6*1000+1000)
        //根据rs.data.win 显示输赢弹窗 1=> 赢   2=> 输
        if(this.showResultModal){clearTimeout(this.showResultModal);}
        this.showResultModal=setTimeout(()=>{
          if(rs.data.win==1){
            this.isCountModalShow=false;
            this.iswinnerModalShow=true;
          }else if(rs.data.win==2){
            this.isCountModalShow=false;
            this.isloserModalShow=true;
          }else{}
        },this.num6*1000+3000)
      }else if(rs.code === 1005){
        if(this.timer3)clearTimeout(this.timer3);
        this.timer3=setTimeout(()=>{
          this.isMoveToBack=true;
        },this.num6*1000);
        if(this.timer4)clearTimeout(this.timer4);
        this.timer4=setTimeout(()=>{
          this.isShaizhongShake=false;
          this.isShaizhongOpen=true;
        },this.num6*1000+300)
        if(this.timer5)clearTimeout(this.timer5);
        this.timer5=setTimeout(()=>{
          this.$alert(rs.msg).then(()=>{
            // appcall.login();
            // this.$router.push('/');
            this.$router.go(-1);
          })
        },this.num6*1000+800)
      }else{
        if(this.timer3)clearTimeout(this.timer3);
        this.timer3=setTimeout(()=>{
          this.isMoveToBack=true;
        },this.num6*1000);
        if(this.timer4)clearTimeout(this.timer4);
        this.timer4=setTimeout(()=>{
          this.isShaizhongShake=false;
          this.isShaizhongOpen=true;
        },this.num6*1000+300)
        if(this.timer5)clearTimeout(this.timer5);
        this.timer5=setTimeout(()=>{
          this.$alert(rs.msg).then(()=>{
            // this.$router.push('/');
            this.$router.go(-1);
          })
        },this.num6*1000+800)
      }
    },
    /**
     * 显示分享弹窗  action 1 => 炫耀战绩    2=> 邀友作战
     */
    async showShareModal(action){
      this.action=action;
      let params = {
        action:action
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "POST",
        this.$apiurl + "/lottery/dice_click_share",
        comm,
        params
      );
      this.iswinnerModalShow=false;
      this.isloserModalShow=false;
      this.isShareModalShow=true;
    },
    /**
     * 分享 pyq type=2, wx ios type=1 Android type=8, action	1 => 炫耀战绩    2=> 邀友作战
     */
    async share(type) {
      let params = {
        action:this.action
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "POST",
        this.$apiurl + "/lottery/dice_share_url",
        comm,
        params
      );
      if(type==1){
        if (!JKEventHandler.browser().ios) {
          type = 8;
        }
      }
      if (rs && rs.code === 1001) {
         let params = {
            type:type,
            title:'',
            url: '',
            desc: '',
            images: rs.data.image
          };
          appcall.invite(params);
      }else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          // appcall.login();
          // this.$router.push('/');
          this.$router.go(-1);
        });
      } else {
        this.$alert(rs.msg).then(()=>{
          // this.$router.push('/');
          this.$router.go(-1);
        })
      }
        
    },
    /**
     * 关闭结果弹窗
     */
    closeResultModal(){
      this.iswinnerModalShow=false;
      this.isloserModalShow=false;
      this.isShareModalShow=false;
      // this.$router.push('/');
      this.$router.go(-1);
    }
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
.wrap{
  width: 7.5rem;
  height: 100vh;
  margin: 0 auto;
  background: linear-gradient(-90deg,#5c0ebc,#8a43e1,#5200b7);
  // matching
  .dice_back{
    width: 1.18rem;
    height: .88rem;
    .background('dice/dice_back.png');
    position: absolute;
    left: 0;
    top:.4rem;
    // top: 0;
  }
  .matching{
    width: 100%;
    height: 13.34rem;
    .background('dice/dice_matching_bg1.jpg');
    position: relative;
    // 匹配中 用户头像
    .userImg{
      position: absolute;
      top: 4.63rem;
      // top: 4.23rem;
      left: 2.86rem;
      width: 1.8rem;
      height: 1.8rem;
      box-sizing: content-box;
      border: .1rem solid #FFC45E;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        .background('head_mr.png');
      }
    }
    // 匹配成功后 用户信息
    .myImg{
      position: absolute;
      top: 5.22rem;
      left: .81rem;
      width: 1.2rem;
      height: 1.2rem;
      border: .1rem solid #FFC45E;
      border-radius: 50%;
      box-sizing: content-box;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        .background('head_mr.png');
      }
      .name{
        margin: .26rem 0 0 -.2rem;
        width: 1.7rem;
        height: .6rem;
        border: .04rem solid #FFC45E;
        background: #ffffff;
        border-radius: .1rem;
        color: #000000;
        font-size: .3rem;
        line-height: .6rem;
        text-align: center;
        box-shadow:0px 0px 2px rgba(192,0,54,0.28);
      }
    }
    // 匹配成功后 战友信息
    .otherImg{
      position: absolute;
      top: 5.22rem;
      left: 5.3rem;
      width: 1.2rem;
      height: 1.2rem;
      border: .1rem solid #FFC45E;
      border-radius: 50%;
      box-sizing: content-box;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        .background('head_mr.png');
      }
      .name{
        margin: .26rem 0 0 -.2rem;
        width: 1.7rem;
        height: .6rem;
        border: .04rem solid #FFC45E;
        background: #ffffff;
        border-radius: .1rem;
        color: #000000;
        font-size: .3rem;
        line-height: .6rem;
        text-align: center;
        box-shadow:0px 0px 2px rgba(192,0,54,0.28);
      }
    }
    // 匹配中
    .ing{
      color: #FFD83A;
      font-size: .36rem;
      line-height: 1;
      position: absolute;
      top: 7.23rem;
      left: 2.52rem;
      .dot {
        font-size: .24rem;
        color: #FFD83A; 
        display: inline-block; 
        height: 1em; line-height: 1;
        vertical-align: -.25em;
        overflow: hidden;
      }
      .dot::before {
        display: block;
        content: '...\A..\A.';
        white-space: pre-wrap;
        animation: dot 3s infinite step-start both;
      }
      @keyframes dot {
        33% { transform: translateY(-2em); }
        66% { transform: translateY(-1em); }
      }
      @-webkit-keyframes dot {
        33% { -webkit-transform: translateY(-2em); }
        66% { -webkit-transform: translateY(-1em); }
      }
    }
    // 提示每场消耗金币数
    .tips{
      line-height: 1;
      position: absolute;
      top: 10.86rem;
      left: 2.4rem;
      color: #FFD83A;
      font-size: .36rem;
      .coin{
        display: inline-block;
        vertical-align: sub;
        width: .37rem;
        height: .34rem;
        .background('dice/dice_coin.png');
        margin-left: .14rem;
      }
    }
    // 金币不足弹窗
    .v-modal{
      .mask(0,0,0,0.6);
      .insufficientModal{
        background: transparent;
        .insufficient{
          width: 6.56rem;
          height: 4.5rem;
          padding: .64rem .89rem 0;
          .background('dice/dice_insufficient.png');
          
          .insufficientTitle{
            width: 100%;
            text-align: center;
            margin-bottom: .7rem;
            line-height: 1;
            color: #000000;
            font-size: .36rem;
          }
          .insufficientTips{
            font-size: .3rem;
            color: #555555;
            text-align: center;
          }
          .goArticle{
            margin: .88rem auto;
            width: 3.4rem;
            height: .8rem;
            border-radius: .4rem;
            background: #FF6258;
            box-shadow:0 .08rem 0 #F43C31;
            font-size: .36rem;
            color: #ffffff;
            text-align: center;
            line-height: .8rem;
          }
        }
        .close{
          margin: .56rem auto 0;
          width: .5rem;
          height: .5rem;
          .background('dice/dice_index_close.png');
        }
      }
    }
    // 匹配成功 背景
    &.succeed{
      .background('dice/dice_matching_bg2.jpg');

    }
    
  }


  // fighting部分

  .fighting{
    width: 100%;
    height: 13.34rem;
    .background('dice/dice_fighting_bg.jpg');
    overflow: hidden;
    position: relative;
    // 对战中 用户信息，战友信息公共css
    .myImg,.otherImg{
      position: absolute;
      top: 2.23rem;
      left: .3rem;
      width: 1rem;
      height: 1rem;
      border: .06rem solid #FFC45E;
      border-radius: 50%;
      box-sizing: content-box;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        .background('head_mr.png');
      }
    }
    // 对战中 用户信息 
    .myImg{
      .name{
        width: 1.2rem;
        text-align: center;
        height: .27rem;
        line-height: .27rem;
        color: #ffffff;
        font-size: .28rem;
        position: absolute;
        top: .37rem;
        left: 1.22rem;
      }
    }
    // 对战中 战友信息 
    .otherImg{
      left: 6.08rem;
      .name{
        width: 1.2rem;
        text-align: center;
        height: .27rem;
        line-height: .27rem;
        color: #ffffff;
        font-size: .28rem;
        position: absolute;
        top: .37rem;
        left: -1.46rem;
      }
    }
    // 额外胜场奖励tips
    .extraBonus{
      position: absolute;
      left: 0;
      top: 4.41rem;
      width: 100%;
      text-align: center;
      color: #FFED27;
      font-size: .28rem;
      letter-spacing: .01rem;
    }
    // 倒计时
    .timeOut{
      position: absolute;
      top: 5.04rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      width:1.2rem;
      height: 1.2rem;
      border-radius:50%;
      text-align: center;
      line-height: 1.2rem;
      overflow: hidden;
      .bg{
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top:0;
        left:0;
        border: .08rem solid #fff;
        border-radius:50%;
        z-index: 1;
      }
      .wrap1{
        width:1.2rem;
        height: 1.2rem;
        position: absolute;
        top: 0;
        left:0;
        border: .08rem solid #c698ff;
        z-index: 2;
        border-radius: 50%;
        clip:rect(0,1.2rem,1.2rem,.6rem);
      }
      .wrap2{
        width:1.2rem;
        height: 1.2rem;
        position: absolute;
        top: 0;
        left:0;
        border: .08rem solid #c698ff;
        z-index: 2;
        border-radius: 50%;
        clip:rect(0,.6rem,1.2rem,0);
      }
      .wrap3{
        width:1.2rem;
        height: 1.2rem;
        position: absolute;
        top: 0;
        left:0;
        border: .08rem solid #fff;
        z-index: 2;
        border-radius: 50%;
        clip:rect(0,1.2rem,1.2rem,.6rem);
      }
      span{
        z-index: 4;
        position: relative;
        display: block;
        font-size: .48rem;
        color: #ffffff;
        i{
          font-size: .48rem;
          color: #ffffff;
        }
      }
      .zhuan{
        animation: zhuan1 4s linear 1 both;
      }
      .zhuan1{
        animation: zhuan1 4s linear 1 4s both;
      }
      .zhuan6s_1{
        animation: zhuan1 3s linear 1 both;
      }
      .zhuan6s_2{
        animation: zhuan1 3s linear 1 3s both;
      }
      @keyframes zhuan1 {
        to{
          transform: rotate(180deg);
        }
      }
    }
    // 骰子
    .dices{
      width: 1.99rem;
      height: 1.54rem;
      position: absolute;
      top: 6.93rem;
      left: 3.93rem;
      .diceInit,.diceShake{
        width: 100%;
        height:100%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .diceGroup{
        img{
          width: .88rem;
          height: .88rem;
          position: absolute;
        }
        img:nth-child(1){
          top: .45rem;
          left: .1rem;
        }
        img:nth-child(2){
          top: .54rem;
          left: 1rem;  
        }
        img:nth-child(3){
          top: 0;
          left: .55rem;
        }
      }
    }
    .dice_group{
      position: absolute;
      &.moveToCenter{
        animation: moveToCenter .2s cubic-bezier(0.36,0,0.64,1) 1 both;
      }
      &.moveToBack{
        animation: moveToBack .2s cubic-bezier(0.36,0,0.64,1) 1 both;
      }
      .dice_shaizhong{
        width: 2.85rem;
        height: 2.34rem;
        position: absolute;
        top: 7.12rem;
        left: 3.74rem;
        transform-origin: -.4rem 2.8rem 0;
        transform: rotate(-90deg);
        z-index: 2;
        img{
          width: 100%;
          height: 100%;
        }
        &.shaizhongClose{
          animation: shaizhongClose .5s cubic-bezier(0.36,0,0.64,1) 1 both;
        }
        &.shaizhongOpen{
          animation: shaizhongOpen .5s cubic-bezier(0.36,0,0.64,1) 1 both;
        }
        &.shaizhongShake{
          animation:shaizhongShake 0.3s cubic-bezier(0.36,0,0.64,1) 17 both;
        }
        @keyframes shaizhongClose {
          from{
            transform: rotate(-90deg);
          }
          to{
            transform: rotate(0deg);
          }
        }
        @keyframes shaizhongOpen {
          from{
            transform: rotate(0deg);
          }
          to{
            transform: rotate(-90deg);
          }
        }
        @keyframes moveToCenter {
          to{
            transform: translateX(-1.385rem);
          }
        }
        @keyframes moveToBack {
          from{
            transform: translateX(-1.385rem);
          }
          to{
            transform: translateX(0rem);
          }
        }
        @keyframes shaizhongShake{
					0%,100% {
            transform:translate3d(0,.03rem,-.03rem);
          }
          25% {
            transform:translate3d(-.12rem,0,0);
          }
          50% {
            transform:translate3d(0,-.03rem,.03rem);
          }
          75% {
            transform:translate3d(.12rem,0,0);
          }
        }
      }
      .dice_dizuo{
        width:4.03rem;
        height: 1.51rem;
        position: absolute;
        top: 8.3rem;
        left: 3.12rem;
        .background('dice/dice_dizuo.png');
        img{
          width: .7rem;
          height: .7rem;
          position: absolute;
        }
        img:nth-child(1){
          top: .2rem;
          left: 1rem;
        }
        img:nth-child(2){
          top: 0.2rem;
          left: 2.4rem;  
        }
        img:nth-child(3){
          top: .15rem;
          left: 1.7rem;
        }
      }
    }
    
    // 按钮公共css
    .GT,.LT{
      position: absolute;
      top: 10.14rem;
      // top: 9.74rem;
      width: 2.2rem;
      .radiobutton{
        width: 2.2rem;
        height: 1.2rem;
        border-radius: .3rem;
        background:#FFD02E ;
        position: relative;
        .content{
          position: absolute;
          top:-.12rem;
          width: 2.2rem;
          height: 1.2rem;
          line-height: 1.2rem;
          text-align: center;
          border-radius: .3rem;
          background:#ffffff;
          font-size: .48rem;
          color: #000000;
        }
        &.chosed{
          background: #D9A800;
          .content{
            position: relative;
            i{
              display: block;
              width: .49rem;
              height: .36rem;
              .background('dice/dice_chosed.png');
              position: absolute;
              top: .42rem;
              left: .28rem;
            }
          }
        }
        &.diceLoser{
          background: #D43434;
          .content{
            &.dice_loser{
              background: #FD4343;
              i.dice_loserImg{
                display: block;
                width: 1.32rem;
                height: 1.32rem;
                .background('dice/dice_loser.png');
                position: absolute;
                top: -.5rem;
                left: -.3rem;
              }
            }
          }
        }
        &.diceWinner{
          background: #CDA60B;
          .content{
            &.dice_winner{
              background: #FFD647;
              i.dice_winnerImg{
                display: block;
                width: 2.17rem;
                height: 1.99rem;
                .background('dice/dice_winner.png');
                position: absolute;
                top: -.95rem;
                left: -.85rem;
              }
            }
          }
        }
      }
      .diceExplain{
        margin-top: .32rem;
        width: 100%;
        text-align: center;
        font-size: .3rem;
        color: #ffffff;
      }
    }
    // 猜大按钮
    .GT{
      left: 1.1rem;
    }
    // 猜小按钮
    .LT{
      left: 4.2rem;
    }
    //中奖播报
    .flushCroll {
      position: absolute;
      top: 12.7rem;
      // top: 12.3rem;
      left: 0;
      right: 0;
      text-align: center;
      overflow: hidden;
      z-index: -1;
      height: 0.64rem !important;
      ul {
        height: 0.64rem !important;
      }
      li {
        height: 0.64rem !important;
        line-height: 0.66rem !important;
        background: rgba(0,0,0,0.2);
        img{
          display: inline-block;
          height: .4rem;
          width: .4rem;
          border-radius: 50%;
          margin: .12rem 0;
          border: 1px solid #fff;
          box-sizing: border-box;
          .background('head_mr.png');
        }
        .phone{
          margin: 0 .2rem;
        }
        span{
          display: inline-block;
          vertical-align: top;
          font-size: 0.3rem;
          color: #FFFFFF;
          i{
            color: #FFDB11;
          }
        }
      }
    }
    // 当前点数弹窗
    .countModal{
      width: 3.8rem;
      height: 1.4rem;
      background: rgba(255, 255, 255, .9);
      box-shadow:0 0 .51rem rgba(0,0,0,0.95);
      border-radius: .4rem;
      text-align: center;
      line-height: 1.4rem;
      font-size: .48rem;
      color: #010101;
      position: absolute;
      top: 4.97rem;
      left: 1.84rem;
      z-index: 5;
    }
      
    .v-modal{
      .mask(0,0,0,0.6);
      // 失效弹窗
      .failureModal{
        width: 5.4rem;
        height: 2.8rem;
        background: #ffffff;
        border-radius: .1rem;
        text-align: center;
        .failureTips{
          margin-top: .53rem;
          line-height: 1;
          color: #333333;
          font-size: .36rem;
        }
        .failureBtn{
          margin: .58rem auto 0;
          width: 3.8rem;
          height: .84rem;
          background: #6609DA;
          border-radius:.42rem;
          box-shadow:  0 .08rem .08rem 0 rgba(142,49,221,0.39);
          font-size: .3rem;
          color: #ffffff;
          line-height: .84rem;
        }
      }
      // 你赢了 弹窗
      .winnerModalWrap{
        width: 6.99rem;
        background: transparent;
        .winnerModal{
          width: 6.99rem;
          height: 8.54rem;
          .background('dice/dice_winBg.png');
          position: relative;
          .winnerModal_myImg,.winnerModal_otherImg{
            position: absolute;
            top: 3.14rem;
            left: .83rem;
            width: .4rem;
            height: .4rem;
            border-radius: 50%;
            border: .02rem solid #ffffff;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
              .background('head_mr.png');
            }
            .winnerModal_name{
              width: 1.4rem;
              text-align: left;
              line-height: 1;
              color: #000000;
              font-size: .28rem;
              position: absolute;
              top:.07rem;
              left: .62rem;
            }
          }
          // 战友信息 
          .winnerModal_otherImg{
            top: 4.22rem;
            left: 3.96rem;
          }
          .congratulation{
            width: 5.75rem;
            height: .98rem;
            position: absolute;
            top: 5.05rem;
            left: 0;
            right: 0;
            margin: 0 auto;
          }
          .winnerModal_oneMore,.winnerModal_shareBtn{
            width: 2rem;
            height: .74rem;
            position: absolute;
            top: 6.11rem;
            left: .93rem;
            background: #F965E5;
            border-radius: .1rem;
            div{
              text-align: center;
              width: 2rem;
              height: .74rem;
              line-height: .74rem;
              position: absolute;
              top: -.08rem;
              left: 0;
              background: #FFFFFF;
              border-radius: .1rem;
              font-size: .3rem;
              color: #3700B6;
            }
          }
          .winnerModal_shareBtn{
            left: 4.13rem;
          }
        }
        .close{
          margin: .3rem auto 0;
          width: .5rem;
          height: .5rem;
          .background('dice/dice_index_close.png');
        }
      }
      // 你输了 弹窗
      .loserModalWrap{
        width: 6.99rem;
        background: transparent;
        .loserModal{
          width: 6.99rem;
          height: 5.66rem;
          .background('dice/dice_loseBg.png');
          position: relative;
          .loserModal_myImg,.loserModal_otherImg{
            position: absolute;
            top: 1.83rem;
            left: .83rem;
            width: .4rem;
            height: .4rem;
            border-radius: 50%;
            border: .02rem solid #ffffff;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
              .background('head_mr.png');
            }
            .loserModal_name{
              width: 1.4rem;
              text-align: left;
              line-height: 1;
              color: #000000;
              font-size: .28rem;
              position: absolute;
              top:.06rem;
              left: .62rem;
            }
          }
          // 战友信息 
          .loserModal_otherImg{
            top: 2.91rem;
            left: 3.96rem;
          }
          .encourage{
            width: 100%;
            position: absolute;
            top: 3.66rem;
            left: 0;
            text-align: center;
            font-size: .26rem;
            color: #ffffff;
            line-height: 1;
          }
          .loserModal_oneMore,.loserModal_shareBtn{
            width: 2rem;
            height: .74rem;
            position: absolute;
            top: 4.8rem;
            left: .93rem;
            background: #F965E5;
            border-radius: .1rem;
            div{
              text-align: center;
              width: 2rem;
              height: .74rem;
              line-height: .74rem;
              position: absolute;
              top: -.08rem;
              left: 0;
              background: #FFFFFF;
              border-radius: .1rem;
              font-size: .3rem;
              color: #3700B6;
            }
          }
          .loserModal_shareBtn{
            left: 4.13rem;
          }
        }
        .close{
          margin: .3rem auto 0;
          width: .5rem;
          height: .5rem;
          .background('dice/dice_index_close.png');
        }
      }
      //分享 弹窗
      .ShareModal{
        width: 7.5rem;
        height: 3.2rem;
        background: #ffffff;
        position: fixed;
        bottom: 0;
        left: 0;
        overflow: hidden;
        .shareBox{
          height: 2.4rem;
          padding:.36rem 1.75rem 0;
          .pyq{
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            background: #F4F8F7;
            .border(#ECEDED);
            text-align: center;
            img{
              margin-top: .24rem;
              height: .7rem;
              width: .7rem;
            }
            position: relative;
          }
          .WeChart{
            width: 1.2rem;
            height: 1.2rem;
            margin-left: 1.6rem;
            border-radius: 50%;
            background: #F4F8F7;
            .border(#ECEDED);
            text-align: center;
            img{
              margin-top: .32rem;
              height: .57rem;
              width: .7rem;
            }
            position: relative;
          }
          .shareTips{
            width: 2.2rem;
            font-size: .3rem;
            color: #000000;
            line-height: 1;
            text-align: center;
            position: absolute;
            top: 1.4rem;
            left: -.5rem;
          }
        }
        .shareCancel{
          width: 100%;
          height: .8rem;
          background: #F8FBFA;
          font-size: .36rem;
          color: #999999;
          text-align: center;
          line-height: .8rem;
        }
      }
    }
    
  }
}


</style>


