<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="taskCenterNew" v-show="!loading">
      <!--头部滚动-->
      <nv-marquee :duration="800" :interval="2000" :play="marqueePlay"  class="flushCroll" ref="flushCroll" v-show="!iospedding">
        <li v-for="(item,$index) in scrollbarData" :key="$index">
          恭喜{{item.userid}}兑换了{{item.product_name}}奖励
        </li>
      </nv-marquee>
      <!--页面标题-->
      <div class="taskCenterNew_title" v-show="!iospedding">做任务，赚零花钱</div>
      <!--任务完成数量，零钱-->
      <div class="taskCenterNew_info clear" v-show="!iospedding">
        <span class="completed left">今日完成任务： {{taskCompleteNum}}个</span>
        <span class="change right" v-if="isLogin" @click="goIncomeBills">我的零钱： {{balance_cash | decimal}}元 <i class="iconfont">&#xe6a7;</i></span>
      </div>
      <!--签到-->
      <div class="taskCenter_sign">
        <div class="signBtn" :class="{'gray':detail.is_sign>0&&isLogin==true}" @click="sign"><i class="ok" v-if="detail.is_sign>0&&isLogin==true"></i>{{btnStr}}</div>
        <div class="signTips" v-if="!isLogin" v-show="!iospedding">每日签到领金币<span>连续签到有大奖</span></div>
        <div class="signTips" v-if="isLogin" v-show="!iospedding">{{signTips}}</div>
        <!--七天金币-->
        <ul class="sevenDays clear">
          <li v-for="(item,$index) in sevenDays" :key="$index" class="left " :class="{'red':$index < signCount}">
            <div class="coin " :class="{'special':$index==3||$index==6}">{{item.coin}}<i class="iconfont">&#xe6c8;</i></div>
            <div :class="{'sevenDot':item,'signProgressBar':$index < signCount}"></div>
            <div class="day" :class="{'signDayStr':$index==signCount&&isLogin}">{{$index+1}}天<span v-show="$index==signCount&&isLogin">({{signDayStr}})</span></div>
          </li>
        </ul>
      </div>
      <!--推荐任务列表-->
      <div class="taskCenter_recommend" v-show="!iospedding">
        <div class="taskTitle clear">
          <span class="title">今日推荐任务</span>
          <span class="rules right" @click="jumpRules">奖励规则 <i class="iconfont">&#xe6a7;</i></span>
        </div>
        <div class="taskList clear">
          <a class="taskContent left" v-for="(item,$index) in recommendList" :key="$index" @click="toDo(item)">
            <div>
              <div class="cash" v-if="item.task_keys=='yqhy_more'"><span>{{item.award_desc | decimal(1)}}元</span>现金<i></i></div>
              <div class="cash" v-if="item.task_keys!='yqhy_more' && item.units_style=='cash'"><i></i><span>{{item.cash | decimal(1)}}元</span>现金</div>
              <div class="coin" v-if="item.task_keys!='yqhy_more' && item.units_style=='coin'"><i></i><span>{{item.coin}}</span>金币</div>
              <div class="title"><span>{{item.task_name}}</span></div>
              <div class="imgBox"><img v-lazy="item.coverurl"></div>
              <div class="info"><i></i>{{item.task_num}}人正在参与</div>
              <div class="toDo red" v-if="item.task_status==2" @click.stop="toDosuccessed(item)">{{item.btn}}</div>
              <div class="toDo" v-if="item.task_status==0 || item.task_status==1">{{item.btn}}</div>
              <div class="shadow" v-if="item.task_status==3">
                <div class="done"></div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <!--热门任务列表-->
      <div class="taskCenter_hot" v-show="!iospedding">
        <div class="taskTitle clear">
          <span class="title">热门任务</span>
          <span class="rules right" @click="jumpRules">奖励规则 <i class="iconfont">&#xe6a7;</i></span>
        </div>
        <ul>
          <li class="clear" v-for="(item,$index) in hotList" :key="$index" @click="toDo(item)">
            <div class="imgBox left"><img v-lazy="item.coverurl"></div>
            <div class="infoBox left">
              <div class="cash" v-if="item.task_keys=='yqhy_more'"><span>{{item.award_desc | decimal(1)}}元</span>现金<i></i></div>
              <div class="cash" v-if="item.task_keys!='yqhy_more' && item.units_style=='cash'"><span>{{item.cash | decimal(1)}}元</span>现金<i></i></div>
              <div class="coin" v-if="item.task_keys!='yqhy_more' && item.units_style=='coin'"><span>{{item.coin}}</span>金币<i></i></div>
              <p>{{item.task_name}}</p>
              <div class="info"><i></i>{{item.task_num}}人正在参与</div>
            </div>
            <div class="toDo left" v-if="item.task_status==0 || item.task_status==1 || item.task_status==2">
              <span class="before" v-if="item.task_status==0 || item.task_status==1">{{item.btn}} <i class="iconfont">&#xe6a7;</i></span>
              <div class="geting" v-if="item.task_status==2" @click.stop="toDosuccessed(item)">{{item.btn}}</div>
            </div>
            <div class="shadow" v-if="item.task_status==3">
              <div class="done"></div>
            </div>
          </li> 
        </ul>
        <div class="more">
          更多精彩任务，敬请期待
        </div>
      </div>
      <!--分享热文阅读和签到弹窗-->
      <div class="v-modal" v-show="articleModalShow&&!iospedding">
        <div class="articleModal modal">
          <div class="modalTitle" @touchmove.prevent>
            <i class="iconfont close" @click="fixedTop">&#xe685;</i>
            <div class="title hottitle" v-if="!isSign">分享热文赚金币</div>
            <div class="title" v-if="isSign">签到成功</div>
            <div class="tips" v-if="isSign">
              <i></i>
              <span>+{{todayCoin}}金币</span>
              <p>恭喜您获得多次收益暴涨的机会</p>
            </div> 
          </div>
          <div class="hotArticleListBg">
            <div class="hotArticleList" ref="hotArticleList">
              <div class="hotArticle clear" @click="chose($index)" v-for="(item,$index) in hotArticleList" :key="$index">
                <div class="chose left">
                  <div class="circle " :class="{'default':!item.chosed,'chosed':item.chosed}"></div>
                </div>
                <div class="img left">
                  <img v-lazy="item.piturl" width="100%" />
                </div>
                <div class="title left">
                  <div class="name">{{item.title | title}}</div>
                  <div class="reader"><span>{{item.region}}</span>阅读 {{item.hits}}次</div>
                </div> 
              </div>
            </div>
          </div>
          <div class="shareTips" @touchmove.prevent>1.热文分享到朋友圈得100金币，每日最多分享5次<br>2.热文被好友阅读，每日最高可获得1000金币</div>
          <div class="btnBox clear" @touchmove.prevent>
            <div class="other left" @click="goHotList()"><i class="iconfont">&#xe697;</i>选择其他热文</div>
            <div class="btn right"  @click="pyqshareArticle()">立即分享赚金币</div>
          </div>
        </div>
      </div>
      <!--去登录弹窗-->
      <div class="v-modal" v-show="goLoginModalShow&&!iospedding" @touchmove.prevent>
        <div class="modal goLoadingModal">
          <div class="tipsBox">
            登录后才可以获取金币哦，去登录？
          </div>
          <div class="btnbox">
            <div class="cancel clear" @click="close">取消</div>
            <div class="ok clear" @click="goLogin">确认</div>
          </div>
        </div>
      </div>
      <!--获得金币弹窗-->
      <div class="v-modal" v-show="getCoinsShow&&!iospedding" @touchmove.prevent>
        <div class="getCoins">
          <span class="num">{{taskGetAward.coin?taskGetAward.coin:taskGetAward.cash}}</span>
          <span class="unit">{{taskGetAward.coin?'金币':'元'}}</span>
        </div>
      </div>
      <!--引导评论弹窗-->
      <div class="v-modal" v-show="commentShow&&!iospedding" @touchmove.prevent>
        <div class="comment clear modal">
          <i class="iconfont close" @click="close">&#xe685;</i>
          <div class="top clear">
            <div class="commentLeft left">
              <p class="tips1">在资讯列表找到自己喜欢的文章</p>
              <p class="tips2">进入详情页面进行评论</p>
              <p class="tips3">被小编评为优质评论，即可拿到奖励<i></i></p>
            </div>
            <div class="commentRight left"></div>
          </div>
          <div class="btn" @click="goHotList">去评论</div>
        </div>
      </div>
      <!--一元提现弹窗-->
      <div class="v-modal" v-show="withdrawShow&&!iospedding" @touchmove.prevent>
        <div class="withdraw modal">
          <i class="iconfont close" @click="close">&#xe685;</i>
          <div class="title">一元提现任务</div>
          <ul>
            <li v-for="(item,$index) in one_cash" :key="$index" class="clear">
              <div class="imgBox left">
                <img :src="item.rulecoverurl">
                <div class="shadow" v-show="item.task_status==2||item.task_status==3"></div>
              </div>
              <span class="taskName " :class="{'gray':item.task_status==2||item.task_status==3}">{{item.task_name}}</span>
              <span v-if="item.task_status==0||item.task_status==1" @click="toDoOneCash(item)" class="default right">未完成</span>
              <span v-if="item.task_status==2||item.task_status==3" class="done right"></span>
            </li>
          </ul>
        </div>
      </div>
      <!--推送打开弹窗-->
      <div class="v-modal" v-show="yindaoShow&&!iospedding" @touchmove.prevent>
        <div class="yindao modal">
          <img src="../../../assets/images/taskcenter/yindao.jpg" >
          <div class="btn" @click="close">我知道了</div>
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
  import pagers from "@/assets/js/pagers";
  import nvMarquee from "@/components/marquee";

  export default {
    name:'taskCenter',
    data(){
      return{
        loading: true,
        isLogin: false,
        iospedding:false,
        flag:false,
        taskCompleteNum:0,
        balance_cash:'',
        hotList: [],
        sevenDays:[],
        recommendList: [],
        detail: {},
        btnStr: "签到",
        signTips: "",
        signDayStr:'',
        todayCoin: 0,
        hotArticleList:[],
        isSign:false,
        chosedId:'',
        taskGetAward:{},
        goLoginModalShow:false,
        articleModalShow:false,
        getCoinsShow: false,
        commentShow:false,
        withdrawShow:false,
        yindaoShow:false,
        one_cash:[],
        marqueePlay: false,
        scrollbarData:[],
      }
    },
    components:{
      nvHead,
      nvLoading,
      nvMarquee,
    },
    computed:{
    },
     created(){
      this.$Progress.start();
      this.pullDown();
    },
    mounted(){
      // 下拉获取新数据调用
      window.afterPullDown = function() {
        this.pullDown();
      }.bind(this);
    },
    methods:{
      /**
     * 下拉获取新数据
     */
      async pullDown() {
        this.close();
      // ios 提审状态
        this.iospedding = await appcall.getReviewStatus();
        let appdata = await appcall.getAppData();
        if (!appdata.uid || !appdata.token) {
          this.isLogin = false;
          this.taskCompleteNum=0;
          this.btnStr = "签到";
        } else {
          this.isLogin = true;
          if(!this.iospedding){
            this.getTaskComplete();
            this.getCash();
          }
        }
        if (!this.iospedding) {
          this.scrollbar();
          this.getTasks();
        }
        this.getSignInState();
      },
      /**
       * 获取签到状态
       */
      async getSignInState() {
        let params = {};
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "post",
          this.$apiurl + "/sign/get_signin_detail",
          comm,
          params
        );
        this.$Progress.finish();
        if (rs && rs.code === 1001) {
          if (this.isLogin) {
            this.signTips = rs.data.is_sign_str;
            if (rs.data.is_sign > 0) {
              this.btnStr = "已签到";
              this.signDayStr='明天';
            } else {
              this.btnStr = "签到";
              this.signDayStr='今天';
            }
          }
          this.detail = rs.data;
          this.signCount = rs.data.sign_count;
          this.loading =  false;
          this.sevenDays=this.detail.sign_coin
        }else if(rs.code === 1005){
          this.$alert(rs.msg).then(()=>{
            appcall.login();
          })
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 获取任务完成总数
       */
      async getTaskComplete(){
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/task/get_complete_num",
          comm,
          params,
          false
        );
        if (rs && rs.code === 1001 && rs.data) {
          this.taskCompleteNum=rs.data.num;
        }else if(rs.code === 1005){
          this.$alert(rs.msg).then(()=>{
            appcall.login();
          })
        } else {
          this.$alert(rs.msg);
        }
      },
       /**
       * 获取任务列表
       */
      async getTasks() {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/task/task_list",
          comm,
          params,
          false
        );
        if (rs && rs.code === 1001 && rs.data) {
          this.hotList=rs.data.hotlist;
          this.recommendList=rs.data.recommendlist;
        }else if(rs.code === 1005){
          this.$alert(rs.msg).then(()=>{
            appcall.login();
          })
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 获取零钱明细
       */
      async getCash() {
        let params = {};
        let comm = await appcall.getRequestData(params);
        
        let rs = await ajax(
          "post",
          this.$apiurl + "/users/center",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          this.balance_cash = rs.data.cash;
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 跳转零钱明细页面
       */
      goIncomeBills(){
        appcall.navigator({
          title:"零钱明细",
          url: this.$h5url + pagers['v118'].incomeBills,
        });
      },
      /**
       * 头部滚动条
       */
      async scrollbar() {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/tasks/get_user_withdraw",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          this.scrollbarData = rs.data.list;

          setTimeout(() => {
            this.marqueePlay = true;
          }, 0); //用setTimeout0来代替进程同步，坑!!!
        } else if (rs && rs.code === 1008) {
          // 暂无数据
          this.scrollbarData = [];
        }else if(rs.code === 1005){
          this.$alert(rs.msg).then(()=>{
            appcall.login();
          })
        } else {
          this.$alert(rs.msg);
        }
      },
      /*
       * 任务按钮动作
       */
      toDo(item) {
        this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; 
        if (this.isLogin) {
          if (!this.flag&&item.task_status != 2) {
            this.flag = true;
            clearTimeout(flagTime);
            var flagTime = setTimeout(()=>{
              this.flag = false;
            }, 2000);
            if(item.task_keys=='first_alipay'&&(item.task_status == 0 ||
              item.task_status == 1)){
                if(item.task_count==0){
                  // 一元提现
                  this.getOneCash();
                  this.withdrawShow = true;
                }else{
                  appcall.navigator({
                    title:"兑换提现",
                    url: this.$h5url + pagers['v118'].redeem,
                  });
                }
            }else if(item.task_keys=="read_push"){
              this.yindaoShow=true;
            }else if(item.task_keys=='yzpl'&&(item.task_status == 0 ||
              item.task_status == 1)){
              this.oppenComment();
            }else if(item.task_keys=="share_article_read"){
              this.getInformationList();
              this.isSign=false;
              this.articleModalShow = true;
              document.getElementsByTagName('body')[0].style.position = 'fixed';
              document.getElementsByTagName('html')[0].style.position = 'fixed';
              document.getElementsByTagName('body')[0].style.width = '100%';
              document.getElementsByTagName('html')[0].style.width = '100%';
              document.getElementsByTagName('body')[0].style.top = -this.scrollTop + 'px';
            }else if (
              item.task_status == 0 ||
              item.task_status == 1 ||
              item.task_status == 3
            ) {
              this.judge(item);
            } else {}
          }
        } else {
          if(item.task_keys=="break_egg"){
            this.judge(item);
          }else if(item.task_keys=="register"){
            appcall.login();
          }else{
            this.goLoginModalShow = true;
          }
        }
      },
      /**
       * 领取
       */
      toDosuccessed(item){
        if(!this.flag&&item.task_status == 2){
          this.flag = true;
          clearTimeout(flagTime);
          var flagTime = setTimeout(()=>{
            this.flag = false;
          }, 2000);
          if (item.action_type && item.task_status == 2) {
            this.taskSuccessed(item);
          }
        }
      },   
      /**
       * 一元提现跳转
       */
      toDoOneCash(item){
        this.judge(item);
        this.close();
      },
      /**
       * 根据task_type跳转
       */
      judge(item) {
        if (item.task_type == "webview") {
          appcall.navigator({
            title: item.task_name,
            url: item.url
          });
        } else if (item.task_type == "module") {
          this.doModuleClassify(item);
        } else if (item.task_type == "simple") {
        } else {
          // 默认去主页
          appcall.articles();
        }
      },
      /**
       * 根据module分类跳转
       */
      doModuleClassify(item) {
        switch (item.module) {
          case "article_list":
            let params = item.module_params ? JSON.parse(item.module_params) : "";
            appcall.articles(params);
            break;
          case "video_list":
            appcall.videos();
            break;
          case "bind_alipay":
          case "bind_wechat":
          case "bind_phone":
            appcall.bindzfb();
            break;
          case "share_weixin_timeline":
            this.pyqshare();
            break;
          case "share_weixin":
            this.wxshare();
            break;
          default:
            appcall.articles();
            break;
        }
      },
      /**
       * 任务完成领取动作
       */
      async taskSuccessed(item) {
        let params = { task_keys: item.task_keys };
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/" + item.action_type,
          comm,
          params,
          false
        );
        if (rs && rs.code == 1001 && rs.data) {
          this.getTasks();
          this.taskGetAward = rs.data;
          this.getCoinsShow = true;
          appcall.playGoldAudio();
          clearTimeout(timer);
          var timer = setTimeout(() => {
            this.getCoinsShow = false;
          }, 1500);
        }else if(rs.code === 1005){
          this.$alert(rs.msg).then(()=>{
            appcall.login();
          })
        } else {
          this.$alert(rs.msg);
          this.getTasks();
        }
      },
      /**
       * 签到动作
       */
      async sign() {
        this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; 
        if (this.isLogin) {
          let params = {};
          let comm = await appcall.getRequestData(params);
          if (this.detail.is_sign != 1) {
            let rs = await ajax(
              "post",
              this.$apiurl + "/sign/signin",
              comm,
              params
            );
            if (rs && rs.code === 1001) {
              this.detail.is_sign++;
              this.signCount++;
              this.btnStr = "已签到";
              this.signDayStr = "明天";
              this.signTips = rs.msg;
              this.articleModalShow = true;
              document.getElementsByTagName('html')[0].style.position = 'fixed';
              document.getElementsByTagName('body')[0].style.position = 'fixed';
              document.getElementsByTagName('body')[0].style.width = '100%';
              document.getElementsByTagName('html')[0].style.width = '100%';
              this.isSign=true;
              this.todayCoin = rs.data.today_coin;
              this.getInformationList();
            }else if(rs.code === 1005){
              this.$alert(rs.msg).then(()=>{
                appcall.login();
              })
            } else {
              this.$alert(rs.msg);
            }
          }
        } else {
          this.goLoginModalShow = true;
        }
      },
      /**
       * 签到成功获取相关资讯
       */
      async getInformationList() {
        let params = {
          num: 3
        };
        let comm = await appcall.getAppData();

        let rs = await ajax(
          "post",
          this.$apiurl + "/sign/get_sign_related_article_lists",
          comm,
          params
        );
        if (rs && rs.code == 1001 && rs.data) {
          rs.data.list.forEach((n, i) => {
            if(i==0){
              n.chosed = true;
              this.chosedId=n.id;
            }else{
              n.chosed = false;
            }
          });
          if( this.$refs.hotArticleList){
            this.$refs.hotArticleList.scrollTop=0;
          }
          this.hotArticleList = rs.data.list;
        } else if (rs.code === 1008) {
          this.hotArticleList = [];
        }else if(rs.code === 1005){
          this.$alert(rs.msg).then(()=>{
            appcall.login();
          })
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 选择一篇热文
       */
      chose(index){
        this.chosedId=this.hotArticleList[index].id;
        this.hotArticleList.forEach((n, i) => {
          if(i==index){
            n.chosed=true;
          }else{
             n.chosed = false;
          }
        });
      },
      /**
       * 分享文章到朋友圈
       */
      pyqshareArticle() {
        if(this.chosedId){
          let params = {
            type: 2,
            sc_catid: this.chosedId
          };
          appcall.shareArticle(params);
          this.close();
        }else{
          this.$alert("请选择一篇要分享的热文");
        }
        
      },
      /**
       * 去热文列表
       */
      goHotList(){
        appcall.articles({sc_catid:99});
        this.close();
      },
      /**
       * 关闭弹窗
       */
      close() {
        this.goLoginModalShow = false;
        this.getCoinsShow=false;
        this.commentShow=false;
        this.withdrawShow = false;
        this.yindaoShow=false;
        this.leadShow=false;
        this.hotArticleList=[];
        this.chosedId='';
        this.articleModalShow = false;
        this.isSign=false;
        document.getElementsByTagName('body')[0].style.position = '';
        document.getElementsByTagName('html')[0].style.position = '';
        document.getElementsByTagName('body')[0].style.width = '100%';
        document.getElementsByTagName('html')[0].style.width = '100%';
      },
      /**
       * 弹窗打开页面固定位置
       */
      fixedTop(){
        this.articleModalShow = false;
        this.isSign=false;
        document.getElementsByTagName('body')[0].style.position = '';
        document.getElementsByTagName('html')[0].style.position = '';
        document.getElementsByTagName('body')[0].style.width = '100%';
        document.getElementsByTagName('html')[0].style.width = '100%';
        if(document.scrollingElement){
          document.scrollingElement.scrollTop=this.scrollTop;
        }else{
          document.documentElement.scrollTop = document.body.scrollTop=this.scrollTop;
        }
        
      },
      /**
       * 去登陆
       */
      goLogin() {
        appcall.login();
        this.close();
      },
      /**
       * 跳转去规则
       */
      jumpRules(){
        appcall.navigator({
          title:'任务规则说明',
          url:this.$h5url+ pagers['v118'].rule,
        })
      },
      /**
       * 微信朋友圈邀请
       */
      async pyqshare() {
        let params = {
          share_where: 1
        };
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/task/share_invitation_img",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let data = rs.data;
          let params = {
            type: 2,
            title: "",
            url: "",
            desc: data.description,
            images: data.url
          };
          appcall.invite(params);
        }else if(rs.code === 1005){
          this.$alert(rs.msg).then(()=>{
            appcall.login();
          })
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 微信好友邀请
       */
      async wxshare() {
        let params = {
          share_where:2
        };
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "post",
          this.$apiurl + "/task/share_invitation_url",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let data = rs.data;
          let params = {
            type: 1,
            title:data.title,
            url: data.url,
            desc: data.description,
            images: ""
          };
          appcall.invite(params);
        }else if(rs.code === 1005){
          this.$alert(rs.msg).then(()=>{
            appcall.login();
          })
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 去评论
       */
      oppenComment(){
        if(localStorage.getItem('comment')==1){
          this.commentShow=false;
          appcall.articles();
        }else{
          localStorage.setItem('comment',1);
          this.commentShow=true;
        }
      },
      /**
       * 获取一元提现状态
       */
      async getOneCash(){
        let params = {};
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "post",
          this.$apiurl + "/task/one_cash",
          comm,
          params
        );
        if (rs && rs.code == 1001 && rs.data) {
          this.one_cash=rs.data.list;
        }else if(rs.code === 1005){
          this.$alert(rs.msg).then(()=>{
            appcall.login();
          })
        } else {
          this.$alert(rs.msg);
        }
      },

    },
    filters: {
      title(value) {
        if (value) {
          value = value.length < 17 ? value : value.substr(0, 17) + "...";
        }
        return value;
      }
    }

  }

</script>

<style lang="less" scoped>
  
  @import "../../../assets/css/mixin";
  @tcBlack:#282a2f;
  @tcGray:#97999d;
  @tcRed:#d53c3e;
  @tcYellow:#efbe03;
  .taskCenterNew{
    background: #ffffff;
    width: 7.5rem;
    // -webkit-overflow-scrolling: touch;
    .flushCroll {
      text-align: center;
      overflow: hidden;
      height: 0.56rem !important;
      ul {
        height: 0.56rem !important;
      }
      li {
        background: #f5f5f5;
        height: 0.56rem !important;
        line-height: 0.6rem !important;
        font-size: 0.24rem;
        color: @tcBlack;
      }
    }
    .taskCenterNew_title{
      height: .94rem;
      padding:.18rem 0.24rem .14rem;
      font-size:.48rem;
      color:@tcBlack;
      font-weight:600;
    }
    .taskCenterNew_info{
      height: .32rem;
      padding:0 .24rem;
      font-size:.24rem;
      .completed{
        color:@tcGray;
      }
      .change{
        color:@tcBlack;
      }
    }
    .taskCenter_sign{
      height: 4.72rem;
      padding:.62rem 0 .44rem;
      position:relative;
      .signBtn{
        width:1.4rem;
        height:1.4rem;
        border-radius:50%;
        background:@tcRed;
        text-align:center;
        line-height:1.4rem;
        font-size:.28rem;
        color:#fff;
        margin:0 auto .16rem;
        position:relative;
        &.gray{
          background:#cacac9;
          line-height:1.8rem;
        }
        .ok{
          position:absolute;
          margin:auto;
          top:0.34rem;
          left:0;
          right:0;
          width:.4rem;
          height:.28rem;
          .background('taskcenter/ok.png');
        }
      }
      .signTips{
        height: .32rem;
        text-align:center;
        margin-bottom:.58rem;
        &,& span{
          font-size:.24rem;
          color:@tcGray;
        }
        span{
          margin-left:.16rem;
        }
      }
      .sevenDays{
        position:relative;
        height:1.2rem;
        padding: 0 .35rem 0 .15rem;
        &:before {
          content: "";
          display:block;
          position: absolute;
          top: .54rem;
          left: .68rem;
          width: 6rem;
          height:1px;
          background:#d8d8d8;
        }
        li{
          width: 1rem;
          height:1.2rem;
          position:relative;
          .sevenDot{
            width:.16rem;
            height:.16rem;
            background:#d8d8d8;
            border-radius:50%;
            margin:.18rem auto;
            position:relative;
            &.signProgressBar{
              &::after{
                content: "";
                display: block;
                position: absolute;
                top: .06rem;
                left: -.42rem;
                width: 1rem;
                height: 1px;
                background: @tcRed;
              }
            }
          }
          .coin,.day{
            width:100%;
            color:@tcGray;
            font-size:.22rem;
            text-align:center;
            height:.3rem;
            line-height:.3rem;
          }
          .coin.special{
            line-height: .3rem;
            font-size:.3rem;
            font-weight:600;
          }
          .day{
            font-size:.24rem;
            color:@tcGray;
            &.signDayStr{
              width: 120%;
              margin-left: -10%;
              span{
                font-size:.24rem;
                color:@tcGray;
              }
              
            }
          }
          &:nth-child(1){
            .sevenDot:after{
              left: .08rem;
              width: .5rem;
            }
          }
          &:nth-child(7){
            .sevenDot:after{
              left: -.42rem;
              width: .5rem;
            }
          }
        }
        .red{
          .sevenDot{
            background:@tcRed;
            &:after{
              background:@tcRed; 
            }
          }
          .coin{
            color:@tcRed;
          }
        }
      }
    }
    .taskCenter_recommend{
      width:7.5rem;
      padding:.44rem .24rem 0;
      background:#F5F5F5;
      overflow:hidden;
      .taskList{
        .taskContent{
          display: block;
          width:3.4rem;
          height:4.48rem;
          background:#fff;
          margin-bottom:.22rem;
          padding:0 .16rem;
          box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
          position:relative;
          // &:active{
          //   box-shadow:0px 0px 5px 3px rgba(0, 0, 0, 0.2) inset;
          //   // transform:scale(.95);
          // }
          &:nth-child(even){
            margin-left:.22rem;
          }
          .cash,.coin{
            padding:.2rem 0;
            text-align:center;
            font-size:.24rem;
            height:.84rem;
            i{
              display:inline-block;
              width:.52rem;
              height:.4rem;
              vertical-align: sub;
              margin-right: .04rem;
            }
            span{
              font-size:.4rem;
            }
          }
          .cash{
            color:@tcRed;
            i{
              .background("taskcenter/cash.png");
            }
            span{
              color:@tcRed;
            }
          }
          .coin{
            color:#efbe03;
            i{
              width:.34rem;
              .background("taskcenter/coin.png");
            }
            span{
              color:#efbe03;
            }
          }
          .title{
            text-align:center;
            font-size:.28rem;
            color:@tcBlack;
            span{
              display:inline-block;
              position:relative;
              line-height:1;
              &:after{
                content:'';
                display:block;
                height:1px;
                width:.12rem;
                background:#282a2e;
                position:absolute;
                top:50%;
                left:-.18rem;
                border-radius:50%;
              }
              &:before{
                content:'';
                display:block;
                height:1px;
                width:.12rem;
                background:#282a2e;
                position:absolute;
                top:50%;
                right:-.18rem;
                border-radius:50%;
              }
            }
          }
          .imgBox{
            width:3.08rem;
            height:1.6rem;
            margin:.18rem 0 .1rem;
            img{
              width:100%;
              height:100%;
            }
          }
          .info{
            text-align:center;
            margin-bottom:.26rem;
            font-size:.24rem;
            color:@tcGray;
            i{
              display:inline-block;
              width:.18rem;
              height:.22rem;
              .background("taskcenter/hot.png");
              margin-right:.04rem;
            }
          }
          .toDo{
            width:2.28rem;
            height:.52rem;
            margin:0 auto;
            .border(@tcRed);
            border-radius:.52rem;
            font-size:.24rem;
            color:@tcRed;
            text-align:center;
            line-height:.52rem;
            &.red{
              background:@tcRed;
              color:#ffffff;
            }
          }
          .shadow{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(255,255,255,.7);
            .done{
              width:1.48rem;
              height:.7rem;
              .background("taskcenter/done.png");
              position:absolute;
              bottom:.24rem;
              left:0;
              right:0;
              margin:auto;
            }
          }
        }
      }
      
    }
    .taskCenter_recommend,.taskCenter_hot{
      .taskTitle{
        height: .54rem;
        line-height:.54rem;
        margin-bottom:.28rem;
        .title{
          font-size:.4rem;
          color:@tcBlack;
          font-weight:600;
        }
        .rules{
          font-size:.24rem;
          color:@tcGray;
        }
      }
    }
    .taskCenter_hot{
      width:7.5rem;
      padding:.44rem .24rem 0;
      ul{
        overflow: hidden;
        li{
          margin-bottom:.3rem;
          position:relative;
          height: 1.4rem;
          .imgBox{
            width:2.7rem;
            height:1.4rem;
            img{
              width:100%;
              height:100%;
            }
          }
          .infoBox{
            width:2.6rem;
            height:1.4rem;
            line-height: 1;
            margin-left:.24rem;
            .cash,.coin{
              font-size:.24rem;
              margin-bottom:.2rem;
              i{
                display:inline-block;
                width:.52rem;
                height:.4rem;
                vertical-align: sub;
                margin-left: .06rem;
              }
              span{
                font-size:.4rem;
              }
            }
            .cash{
              color:@tcRed;
              i{
                .background("taskcenter/cash.png");
              }
              span{
                color:@tcRed;
              }
            }
            .coin{
              color:#efbe03;
              i{
                width:.34rem;
                .background("taskcenter/coin.png");
              }
              span{
                color:#efbe03;
              }
            }
            p{
              font-size: .28rem;
              margin-bottom: .2rem;
              color:@tcBlack;
            }
            .info{
              font-size:.24rem;
              color:@tcGray;
              i{
                display:inline-block;
                width:.18rem;
                height:.22rem;
                .background("taskcenter/hot.png");
                margin-right:.04rem;
              }
            }
          }
          .toDo{
            width:1.48rem;
            height: 1.4rem;
            line-height: 1.4rem;
            text-align:right;
            .before{
              color:@tcRed;
              font-size:.24rem;
              i{
                color:@tcRed;
                font-size:.24rem;
              }
            }
            .geting{
              width:1.4rem;
              line-height:.52rem;
              background:@tcRed;
              border-radius:.52rem;
              font-size:.24rem;
              color:#fff;
              text-align:center;
              margin: .54rem 0 0rem .04rem;
            }
          }
          .shadow{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(255,255,255,.7);
            .done{
              width:1.48rem;
              height:.7rem;
              .background("taskcenter/done.png");
              position:absolute;
              top:.45rem;
              right:0;
              margin:auto;
            }
          }
        }
      }
      .more{
        width: 100%;
        text-align: center;
        color:@tcGray;
        font-size: .24rem;
        margin: .16rem 0 .66rem;
      }
    }

    .v-modal {
      .mask(0,0,0,0.7);
      .articleModal {
        border-radius:.2rem;
        .modalTitle {
          width: 6.48rem;
          padding:0 .34rem;
          position: relative;
          overflow:hidden;
          letter-spacing: 1px;
          i.close {
            position: absolute;
            top: .34rem;
            right: .34rem;
            font-size: 0.4rem;
            color: #d8d8d8;
          }
          .title {
            margin:.52rem 0 0;
            font-size: 0.44rem;
            text-align: center;
            color: #efbe03;
            font-weight:600;
            &.hottitle{
              margin:.52rem 0 .4rem;
            }
          }
          .tips {
            text-align: center;
            margin-bottom: 0.18rem;
            i {
              width: 0.86rem;
              height: 0.7rem;
              display: inline-block;
              .background("taskcenter/gift.png");
              vertical-align: text-bottom;
              position: relative;
              top: .04rem;
            }
            span {
              color: #efbe03;
              font-size: 0.36rem;
              margin: 0.2rem 0 0.16rem .08rem;
              display: inline-block;
              font-weight:600;
            }
            p {
              color: @tcGray;
              font-size: 0.28rem;
            }
          }
        }
        .hotArticleListBg{
          width: 6.48rem;
          padding:.3rem .12rem;
          background: #f5f5f5;
          margin-bottom: .18rem;
          .hotArticleList{
            height: 4.14rem;
            overflow-y: scroll;
            overflow-x: hidden;
            z-index: 12;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar{
              width: 2px;
              display:block;
            }
            &::-webkit-scrollbar-thumb{
              border-radius: 2px;
              background: #d8d8d8;
            }
            &::after {
              min-height:101%;
            }
            .hotArticle {
              width: 5.8rem;
              height: 1.18rem;
              margin: 0 auto .3rem;
              &:last-child{
                margin-bottom:0;
              }
              .chose{
                width:0.5rem;
                height: 100%;
                .circle{
                  width:.32rem;
                  height:.32rem;
                  margin:.43rem 0;
                  &.default{
                    .background("taskcenter/unselected.png");
                  }
                  &.chosed{
                    .background("taskcenter/selected.png");
                  }
                }
              }
              .img {
                width: 1.74rem;
                height: 100%;
                overflow: hidden;
                background: #e5e5e5;
                img {
                  width: 100%;
                  height:100%;
                }
              }
              .title {
                width: 3.38rem;
                height: 100%;
                margin-left:0.14rem;
                text-align: left;
                position: relative;
                .name {
                  font-size: 0.28rem;
                  color: @tcBlack;
                  overflow: hidden;
                  text-align: justify;
                  width: 100%;
                }
                .reader {
                  height: 0.32rem;
                  font-size: 0.24rem;
                  position:absolute;
                  top:.85rem;
                  left:0;
                  color: @tcGray;
                  span{
                    font-size: 0.24rem; 
                    color: @tcGray;
                    margin-right:.16rem;
                  }
                }
              }
            }
          }
        }
        
        .shareTips {
          width: 6.48rem;
          padding:0 .34rem;
          font-size: 0.24rem;
          color: @tcGray;
        }
        .btnBox{
          width: 6.48rem;
          padding: .36rem .34rem .35rem;
          height: 1.6rem;
          .other{
            font-size:.32rem;
            color:@tcGray;
            line-height: 0.76rem;
            i{
              font-size:.32rem;
              margin-right:.12rem;
            }
          }
          .btn {
            width: 2.96rem;
            height: 0.76rem;
            border-radius: 0.76rem;
            background: @tcRed;
            text-align: center;
            line-height: 0.76rem;
            font-size: 0.32rem;
            color: #ffffff;
          }
        }
      }
      .goLoadingModal {
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
      .getCoins {
        position: absolute;
        display: block;
        width: 3.28rem;
        height: 2.58rem;
        .background("taskcenter/getcoins.png");
        left: 50%;
        margin-left: -1.64rem;
        top: 50%;
        margin-top: -1.29rem;
        text-align: center;
        .num,
        .unit {
          color: #e82422;
          display: block;
          font-size: 0.28rem;
        }
        .num {
          margin-top: 0.55rem;
          font-size: 0.48rem;
        }
      }
      .comment{
        width:6.3rem;
        background:transparent;
        i.close {
          position: absolute;
          top: -1rem;
          right: -.1rem;
          font-size: 0.4rem;
          color: #d8d8d8;
        }
        .top{
          .commentLeft{
            width:2.48rem;
            height:6.16rem;
            position:relative;
            p{
              font-size:.28rem;
              color:#ffffff;
              position:absolute;
              left:0;
            }
            .tips1{
              top: 0.4rem;
            }
            .tips2{
              top:2.9rem;
            }
            .tips3{
              top:4.8rem;
              i{
                position:absolute;
                right:-.2rem;
                bottom:0;
                display:block;
                width:.36rem;
                height:.4rem;
                .background("taskcenter/diamond.png");
              }
            }
          }
          .commentRight{
            width:3.82rem;
            height:6.16rem;
            .background("taskcenter/comment.png");
          }
        }
        .btn{
          .border(#ffffff);
          border-radius:.76rem;
          margin:1.28rem auto 0;
          width:2.96rem;
          height:.76rem;
          text-align:center;
          line-height:.76rem;
          background:transparent;
          font-size:.32rem;
          color:#ffffff;
        }
      }
      .withdraw{
        padding:0 .34rem;
        border-radius: .12rem;
        width:6rem;
        min-height:6.08rem;
        i.close {
          position: absolute;
          top: .3rem;
          right:.3rem;
          font-size: 0.4rem;
          color: #d8d8d8;
        }
        .title{
          font-size:.44rem;
          color:#efbe03;
          text-align:center;
          margin:.58rem 0 .46rem;
        }
        ul{
          li{
            height:.7rem;
            line-height:.7rem;
            width:5.32rem;
            margin-bottom:.42rem;
            .imgBox{
              position:relative;
              width:.4rem;
              height:.4rem;
              margin:.15rem 0;
              img{
                width:100%;
                height:100%;
                border-radius:.4rem;
              }
              .shadow{
                width:100%;
                height:100%;
                border-radius:.4rem;
                background:rgba(255,255,255,.7);
                position: absolute;
                top:0;
                left:0;
              }
            }
            .taskName{
              font-size:.32rem;
              color:@tcBlack;
              margin-left:.14rem;
              &.gray{
                color:@tcGray;
              }
            }
            .default{
              width:1.48rem;
              height:.7rem;
              line-height:.7rem;
              text-align:center;
              font-size:.28rem;
              color:#ffffff;
              background:@tcRed;
              border-radius:.7rem;
            }
            .done{
                width:1.48rem;
                height:.7rem;
                .background("taskcenter/done.png");
            }
          }
        }
      }
      .yindao{
        width: 6rem;
        height: 6.64rem;
        background: transparent;
        img{
          width: 100%;
          height: 100%;
          border-radius:.2rem;
        }
        .btn{
          width:2.12rem;
          height:.6rem;
          font-size:.28rem;
          color:#ffffff;
          line-height:.6rem;
          text-align:center;
          border-radius:.6rem;
          .border(#ffffff);
          margin:auto;
          position:absolute;
          bottom:.4rem;
          left:0;
          right:0;
        }
      }
    }  
  }
</style>