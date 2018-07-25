<template>
  <div class="v120">
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <!-- 页面主体 -->
    <div class="taskCenter" v-show="!loading">
      <!-- 头部模块 -->
      <!-- <header>任务中心</header> -->
      <!-- 签到模块 -->
      <div class="taskCenter_sign" :class="{'done':detail.is_sign&&isLogin==true,'normal':!detail.is_sign}">
        <div class="rule" v-show="!iospedding" @click="jumpRules('规则')">
          <span>奖励规则</span>
        </div>
        <div class="signTitle" :class="{'done':detail.is_sign&&isLogin==true}">{{signTitle}}</div>
        <div class="signBtn" v-show="!detail.is_sign" @click="sign">签到</div>
        <div class="signTips" :class="{'done':detail.is_sign}" v-show="!iospedding">{{signTips}}</div>
      </div>
      <!-- 七天金币模块 -->
      <div class="taskCenter_sevenDays" v-show="!iospedding">
        <ul class="clear">
          <li v-for="(item,$index) in sevenDays" :key="$index" class="left">
            <div class="coinBox" :class="{'done':$index < signCount,'big':$index==3||$index==6}">
              <span :class="{'scale':$index!=3&&$index!=6}">{{item.coin}}</span>
            </div>
            <p class="day " :class="{'done':$index < signCount}">{{$index+1}}天</p>
          </li>
          <div class="signProgressBar">
            <div class="done" :style="countWidth"></div>
          </div>
        </ul>
      </div>
      <!-- 活动广告位 -->
      <div class="ad" v-if="eiaiUrl.length!=0 || urlList.length!=0" v-show="!iospedding">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,i) in eiaiUrl" :key="i+2" v-if="eiaiUrl.length!=0">
            <a @click="eiaiJump(item)">
              <img :src="item.image_url[0]">
            </a>
          </swiper-slide>
          <swiper-slide v-for="(item,$index) in urlList" :key="$index" v-if="urlList.length!=0">
            <a @click="adJump(item)">
              <img :src="item.coverurl">
            </a>
          </swiper-slide>
          <!-- 第三房广告位 -->
          <!-- <swiper-slide id="PAGE_BB_1">
            </swiper-slide> -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 获奖名单模块 -->
      <div class="taskCenter_roll" v-show="!iospedding" v-if="awardsList.length!=0">
        <nv-marquee :duration="tcDuration" :interval="tcInterval" :play="marqueePlay" :height="0.62" class="flushCroll" ref="flushCroll"
          v-show="!iospedding">
          <li class="rollData" v-for="(item,$index) in awardsList" :key="$index">
            {{item.userid}}兑换了
            <span>{{item.product_name}}</span>奖励
          </li>
        </nv-marquee>
      </div>

      <!-- 今日任务模块 -->
      <div class="taskCenter_todayList" v-show="!iospedding">
        <div class="title">今日任务</div>
        <div class="taskList clear">
          <a class="left" v-for="(item,$index) in todayList" :key="$index" @click="toDo(item)">
            <div class="taskContent">
              <div class="imgBox">
                <img :src="item.rulecoverurl">
              </div>
              <div class="info">
                <p class="taskName">{{item.task_name}}</p>
                <p class="taskMoney" :class="{'done':item.task_status==3}">
                  <span v-if="item.task_status!=3">领取</span>
                  <span v-if="item.task_status==3">已领取</span>
                  <span v-if="item.units_style=='coin'">{{item.award_desc|decimal(0)}}金币</span>
                  <span v-if="item.units_style=='cash'">{{item.award_desc|decimal(0)}}元现金</span>
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <!-- 热门任务模块 -->
      <div class="taskCenter_hotList" v-show="!iospedding">
        <div class="title">热门任务</div>
        <div class="taskList">
          <a v-for="(item,$index) in hotList" :key="$index" @click="toDo(item)">
            <div class="taskContent" :class="{'coin':item.units_style=='coin','cash':item.units_style=='cash'}">
              <div class="coinInfo" v-if="item.units_style=='coin'">
                <p class="num">+{{item.award_desc|decimal(0)}}</p>
                <p class="unit">金币</p>
              </div>
              <div class="cashInfo" v-if="item.units_style=='cash'">
                <p class="num">+{{item.award_desc|decimal(1)}}
                  <span class="unit">元</span>
                </p>
              </div>
              <div class="taskInfo " :class="{'hasProgressBar':item.progress}">
                <p class="taskName">{{item.task_name}}</p>
                <p class="hot">
                  <span class="scale">{{item.task_num}}人正在参与</span>
                </p>
                <div class="taskProgress" v-if="item.progress">
                  <div class="bar">
                    <div class="done" :style="item.barWidth"></div>
                  </div>
                  <span class="scale">
                    <span class="CompleteNum">{{item.incr_num}}</span>/{{item.receive_num}}次</span>
                </div>
              </div>
              <div class="taskBtn " v-if="item.task_keys!='new_user_surprise_gift'">
                <div class="btn " :class="{'done':item.task_status==3}">{{item.btn}}</div>
              </div>
              <div class="taskBtn " v-else>
                <div class="btn " v-if="item.task_status==0">{{item.btn}}</div>
                <div class="btn " v-if="item.task_status==1">{{countdown | countdown}}</div>
                <div class="btn " v-if="item.task_status==2">可领取</div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <!-- 底部提示模块 -->
      <div class="taskCenter_more" v-show="!iospedding">更多赚钱任务开发中...</div>

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
                  <div class="reader">
                    <span>{{item.region}}</span>阅读 {{item.hits}}次</div>
                </div>
              </div>
            </div>
          </div>
          <div class="shareTips" @touchmove.prevent v-html="description"></div>
          <div class="btnBox clear" @touchmove.prevent>
            <div class="other left" @click="goHotList()">
              <i class="iconfont">&#xe697;</i>选择其他热文</div>
            <div class="btn right" @click="pyqshareArticle()">立即分享赚金币</div>
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
      <!--引导评论弹窗-->
      <div class="v-modal" v-show="commentShow&&!iospedding" @touchmove.prevent>
        <div class="comment clear modal">
          <i class="iconfont close" @click="close">&#xe685;</i>
          <div class="top clear">
            <div class="commentLeft left">
              <p class="tips1">在资讯列表找到自己喜欢的文章</p>
              <p class="tips2">进入详情页面进行评论</p>
              <p class="tips3">被小编评为优质评论，即可拿到奖励
                <i></i>
              </p>
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
          <img src="../../../assets/images/taskcenter/yindao.jpg">
          <div class="btn" @click="close">我知道了</div>
        </div>
      </div>
      <!--获得金币弹窗-->
      <div class="v-modal" v-show="getCoinsShow&&!iospedding" @touchmove.prevent>
        <div class="getCoins">
          <span class="num">{{taskGetAward.coin}}</span>
          <span class="unit">金币</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
require("swiper/dist/css/swiper.css");
import { swiper, swiperSlide } from "vue-awesome-swiper";
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";
import pagers from "@/assets/js/pagers";
import nvMarquee from "@/components/marquee";

export default {
  name: "taskCenter",
  data() {
    return {
      loading: true,
      isLogin: false,
      iospedding: false,
      signTitle: "签到领红包",
      signTips: "每日签到领金币，连续签到有大奖",
      detail: {}, //签到信息
      signCount: 0, //是否签到
      sevenDays: [], //七天金币
      awardsList: [], //获奖名单
      todayList: [], //今日任务
      hotList: [], //热门任务
      barWidth: "0%", //任务完成进度
      todayCoin: 0, //今日签到金币
      hotArticleList: [], //签到/分享阅读 文章列表
      isSign: false, //是否是签到弹窗
      description: "", //分享热文文案
      chosedId: "", //选择分享的文章id
      goLoginModalShow: false, //登录弹窗
      articleModalShow: false, //分享文章弹窗
      commentShow: false, //评论弹窗
      withdrawShow: false, //一元提现弹窗
      yindaoShow: false, //引导弹窗
      getCoinsShow: false, //金币弹窗
      taskGetAward: {
        coin: 0
      }, //大礼包金币
      countdown: 0, //大礼包倒计时
      one_cash: [], //一元提现数据
      marqueePlay: false,
      tcDuration: 0, //marquee的duration
      tcInterval: 0, //marquee的interval
      swiperOption: {
        loop: false,
        pagination: ".swiper-pagination",
        touchMoveStopPropagation: false,
        autoplay: 3000
      },
      urlList: [],
      eiaiUrl: [],
      OriginalData: []
    };
  },
  components: {
    nvHead,
    nvLoading,
    nvMarquee,
    swiper,
    swiperSlide
  },
  computed: {
    countWidth: function() {
      let width = this.signCount
        ? "width:" + 16 * (this.signCount - 1) + "%"
        : "width:0%";
      return width;
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  async created() {
    this.$Progress.start();
  },
  mounted() {
    //下拉获取新数据调用
    this.pullDown();
    this.scrollbar();
    this.adType();
    window.afterPullDown = function() {
      this.pullDown();
    }.bind(this);
  },
  methods: {
    /**
     * 下拉获取新数据
     */
    async pullDown() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      // this.awardsList=[];
      // this.marqueePlay = false;
      // this.tcInterval = 0;
      // this.tcDuration = 0;
      this.close();
      // ios 提审状态
      this.iospedding = await appcall.getReviewStatus();
      let appdata = await appcall.getAppData();
      if (!appdata.uid || !appdata.token) {
        this.isLogin = false;
        this.signTitle = "签到领红包";
      } else {
        this.isLogin = true;
        // 页面一进来就签到
        // this.sign();
      }
      if (!this.iospedding) {
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
            this.signTitle = "已签到";
          } else {
            this.signTitle = "签到领红包";
          }
        }
        this.detail = rs.data;
        this.signCount = rs.data.sign_count;
        this.loading = false;
        this.sevenDays = this.detail.sign_coin;
      } else if (rs.code === 1005) {
        this.loading = false;
        this.$alert(rs.msg).then(() => {
          appcall.login();
        });
      }else if(rs.code === 3001){

      } else {
        this.loading = false;
        this.$alert(rs.msg);
      }
    },
    /**
     * 签到动作
     */
    async sign() {
      this.scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
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
            this.signTitle = "已签到";
            this.signTips = rs.msg;
            this.articleModalShow = true;
            document.getElementsByTagName("html")[0].style.position = "fixed";
            document.getElementsByTagName("body")[0].style.position = "fixed";
            document.getElementsByTagName("body")[0].style.width = "100%";
            document.getElementsByTagName("html")[0].style.width = "100%";
            this.isSign = true;
            this.todayCoin = rs.data.today_coin;
            this.getInformationList();
          } else if (rs.code === 1005) {
            this.$alert(rs.msg).then(() => {
              appcall.login();
            });
          } else {
            this.$alert(rs.msg);
          }
        }
      } else {
        this.goLoginModalShow = true;
      }
    },
    /**
     * 滚动条
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
        this.awardsList = rs.data.list;
        this.tcInterval = 2500;
        this.tcDuration = 1200;
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.marqueePlay = true;
        }, 0);
      } else if (rs && rs.code === 1008) {
        // 暂无数据
        this.awardsList = [];
      } else if (rs.code === 1005) {
        this.$alert(rs.msg).then(() => {
          appcall.login();
        });
      } else {
        // this.$alert(rs.msg);
      }
    },

    /**
     * 倒计时
     */
    countdownTimer() {
      clearInterval(this.giftCountdownTimer);
      this.giftCountdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown < 1) {
          clearInterval(this.giftCountdownTimer);
          this.getTasks();
        }
      }, 1000);
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
        this.todayList = rs.data.recommendlist;
        rs.data.hotlist.forEach((n, i) => {
          n.barWidth = "width:" + n.complete_rate;
          if (n.task_keys == "new_user_surprise_gift") {
            this.countdown = n.countdown;
            this.taskGetAward.coin = n.coin;
            if (this.countdown > 0) {
              this.countdownTimer();
            }
          }
        });
        this.hotList = rs.data.hotlist;
      } else if (rs.code === 1005) {
        this.$alert(rs.msg).then(() => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /*
       * 任务按钮动作
       */
    async toDo(item) {
      // 百度统计
      _hmt.push(['_trackEvent', 'taskcenter', 'click', item.task_name])
      this.scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      if (this.isLogin) {
        if (!this.flag) {
          this.flag = true;
          clearTimeout(flagTime);
          var flagTime = setTimeout(() => {
            this.flag = false;
          }, 2000);
          let params = {
            task_id: item.task_id,
            task_keys: item.task_keys,
            task_name: item.task_name
          };
          let comm = await appcall.getRequestData(params);
          ajax("POST", this.$apiurl + "/task/task_click_stats", comm, params);
          if (
            item.task_keys == "first_alipay" &&
            (item.task_status == 0 || item.task_status == 1)
          ) {
            if (item.task_count == 0) {
              // 一元提现
              this.getOneCash();
              this.withdrawShow = true;
            } else {
              appcall.navigator({
                title: "兑换提现",
                url: this.$h5url + pagers[this.$currVer].redeem
              });
            }
          } else if (item.task_keys == "read_push") {
            this.yindaoShow = true;
          } else if (
            item.task_keys == "yzpl" &&
            (item.task_status == 0 || item.task_status == 1)
          ) {
            this.oppenComment();
          } else if (item.task_keys == "share_article_read") {
            this.getInformationList();
            this.isSign = false;
            this.articleModalShow = true;
            document.getElementsByTagName("body")[0].style.position = "fixed";
            document.getElementsByTagName("html")[0].style.position = "fixed";
            document.getElementsByTagName("body")[0].style.width = "100%";
            document.getElementsByTagName("html")[0].style.width = "100%";
            document.getElementsByTagName("body")[0].style.top =
              -this.scrollTop + "px";
          } else if (item.task_keys == "new_user_surprise_gift") {
            if (item.task_status==1) {
              this.wxshare();
            }else if(item.task_status==2) {
              this.taskSuccessed();
            }else{
              appcall.articles();
            }
          } else {
            this.judge(item);
          }
        }
      } else {
        if (item.is_login == 0) {
          this.judge(item);
        } else if (item.task_keys == "register") {
          appcall.login();
        } else {
          this.goLoginModalShow = true;
        }
      }
    },
    /*
       * 24小时惊喜宝箱领取金币
       */
    async taskSuccessed() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/task/gain_surprise_award",
        comm,
        params
      );
      if (rs && rs.code == 1001 && rs.data) {
        this.getTasks();
        this.getCoinsShow = true;
        clearTimeout(timer);
        var timer = setTimeout(() => {
          this.getCoinsShow = false;
        }, 1500);
      } else if (rs.code === 1005) {
        this.$alert(rs.msg).then(() => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 一元提现跳转
     */
    toDoOneCash(item) {
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
        this.description = rs.data.description;
        this.description=this.description.replace('\n','<br>');
        rs.data.list.forEach((n, i) => {
          if (i == 0) {
            n.chosed = true;
            this.chosedId = n.id;
          } else {
            n.chosed = false;
          }
        });
        if (this.$refs.hotArticleList) {
          this.$refs.hotArticleList.scrollTop = 0;
        }
        this.hotArticleList = rs.data.list;
      } else if (rs.code === 1008) {
        this.hotArticleList = [];
      } else if (rs.code === 1005) {
        this.$alert(rs.msg).then(() => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 选择一篇热文
     */
    chose(index) {
      this.chosedId = this.hotArticleList[index].id;
      this.hotArticleList.forEach((n, i) => {
        if (i == index) {
          n.chosed = true;
        } else {
          n.chosed = false;
        }
      });
    },
    /**
     * 分享文章到朋友圈
     */
    pyqshareArticle() {
      if (this.chosedId) {
        let params = {
          type: 2,
          sc_catid: this.chosedId
        };
        appcall.shareArticle(params);
        this.close();
      } else {
        this.$alert("请选择一篇要分享的热文");
      }
    },
    /**
     * 去热文列表
     */
    goHotList() {
      appcall.articles({
        sc_catid: 99
      });
      this.close();
    },
    /**
     * 关闭弹窗
     */
    close() {
      this.getCoinsShow = false;
      this.goLoginModalShow = false;
      this.commentShow = false;
      this.withdrawShow = false;
      this.yindaoShow = false;
      this.hotArticleList = [];
      this.chosedId = "";
      this.articleModalShow = false;
      this.isSign = false;
      document.getElementsByTagName("body")[0].style.position = "";
      document.getElementsByTagName("html")[0].style.position = "";
      document.getElementsByTagName("body")[0].style.width = "100%";
      document.getElementsByTagName("html")[0].style.width = "100%";
    },
    /**
     * 弹窗打开页面固定位置
     */
    fixedTop() {
      this.articleModalShow = false;
      this.isSign = false;
      document.getElementsByTagName("body")[0].style.position = "";
      document.getElementsByTagName("html")[0].style.position = "";
      document.getElementsByTagName("body")[0].style.width = "100%";
      document.getElementsByTagName("html")[0].style.width = "100%";
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = this.scrollTop;
      } else {
        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop;
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
    jumpRules(position) {
      if(!!position){_hmt.push(['_trackEvent', 'taskcenter', 'click', position])}
      appcall.navigator({
        title: "任务规则说明",
        url: this.$h5url + pagers[this.$currVer].rule
      });
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
      } else if (rs.code === 1005) {
        this.$alert(rs.msg).then(() => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 微信好友邀请
     */
    async wxshare() {
      let params = {
        share_where: 2
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
          title: data.title,
          url: data.url,
          desc: data.description,
          images: ""
        };
        appcall.invite(params);
      } else if (rs.code === 1005) {
        this.$alert(rs.msg).then(() => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 去评论
     */
    oppenComment() {
      if (localStorage.getItem("comment") == 1) {
        this.commentShow = false;
        appcall.articles();
      } else {
        localStorage.setItem("comment", 1);
        this.commentShow = true;
      }
    },
    /**
     * 获取一元提现状态
     */
    async getOneCash() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/task/one_cash",
        comm,
        params
      );
      if (rs && rs.code == 1001 && rs.data) {
        this.one_cash = rs.data.list;
      } else if (rs.code === 1005) {
        this.$alert(rs.msg).then(() => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 页面广告位数据结构
     */
    async adType() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/carousel/get_task_carousels",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.OriginalData = rs.data.list;
        this.adChoose(rs.data.list);
      }else if(rs.code === 1008){
        
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 广告类型判断
     */
    adChoose(data) {
      let eiaiArr = [];
      let thirdArr = [];
      let activeArr = [];
      data.forEach((item, i) => {
        if (item.type == "ad") {
          if (item.ad_source == "eiai") {
            eiaiArr.push(item);
          } else {
            thirdArr.push(item);
          }
        } else {
          activeArr.push(item);
        }
      });
      if (eiaiArr.length != 0) {
        eiaiArr.forEach(async(item, index) => {
          this.eiaiUrl = this.eiaiUrl.concat(await this.getAiAd(item));
          // this.adEiai(eiaiArr[index].slot_id, item);
        });
      }
      if (thirdArr.length != 0) {
        this.thirdAd(thirdArr);
      }
      if (activeArr.length != 0) {
        this.urlList = activeArr;
      }
    },
    /**
     * 获取eiai广告
     */
    async getAiAd(item){
      let adFeed = {};
      let params = {
        slot_id: item.slot_id,
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "GET",
        this.$adApi + "/slot/creative-info",
        comm,
        params,
        false
      );
      if (rs && rs.code === 1001 && rs.data) {
        if (!rs.data.hasOwnProperty("creative_id")) return false;
        let exporsureData = {
          creative_id: rs.data.creative_id,
          slot_id: item.slot_id,
          ad_source: item.ad_source
        };
        this.exposure(exporsureData);
        adFeed = rs.data;
      }else if (rs.code === 1008){

      }else {
        // this.$alert(rs.msg);
        appcall.showToast(rs.msg);
      }
      return adFeed;
    },
    /**
     * 第三方广告
     */
    thirdAd(data) {
      data.forEach(item => {
        switch (item.ad_source) {
          case "baidu":
            // setTimeout(()=>{
            //   BAIDU_CLB_fillSlotAsync(item.slot_id, "hancr_001");
            // },3000)
            break;
          case "xunfei":
            break;
          case "xiaomi":
            break;
          case "adview":
            break;
          case "gdt":
            break;
          default:
            break;
        }
      });
    },
    /**
     *曝光接口
     */
    async exposure(item) {
      let params = {
        slot_id: item.slot_id,
        creative_id: item.creative_id,
        ad_source: item.ad_source
      };
      let comm = await appcall.getRequestData(params);
      ajax("post", this.$adApi + "/log/exposure-log", comm, params,false);
    },
    /**
     *广告点击记录
     */
    async Adclicks(item) {
      let params = {
        slot_id: item.slot_id,
        creative_id: item.creative_id,
        ad_source: item.ad_source
      };
      let comm = await appcall.getRequestData(params);
      ajax("post", this.$adApi + "/log/click-log", comm, params);
    },
    /*
       * 活动页跳转
       */
    adJump(item) {
      appcall.navigator({
        title: item.name,
        url: item.url
      });
    },
    /*
       * eiai广告跳转
       */
    eiaiJump(item) {
      let exporsureData = {
        creative_id: item.creative_id,
        slot_id: item.slot_id,
        ad_source: "eiai"
      };
      appcall.navigator_ad({
        url: item.source_url
      });
      this.Adclicks(exporsureData);
    }
  },
  filters: {
    title(value) {
      if (value) {
        value = value.length < 17 ? value : value.substr(0, 17) + "...";
      }
      return value;
    },
    countdown(value) {
      let h =
        Math.floor((value / 3600) % 24) < 10
          ? "0" + Math.floor((value / 3600) % 24)
          : Math.floor((value / 3600) % 24);
      let m =
        Math.floor((value / 60) % 60) < 10
          ? "0" + Math.floor((value / 60) % 60)
          : Math.floor((value / 60) % 60);
      let s =
        value - h * 3600 - m * 60 < 10
          ? "0" + (value - h * 3600 - m * 60)
          : value - h * 3600 - m * 60;
      return h + ":" + m + ":" + s;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin";
@tcBlack: #282a2f;
@tcGray: #97999d;
@tcRed: #d53c3e;
@tcYellow: #efbe03;
.v120 {
  .taskCenter {
    width: 7.5rem;
    margin: 0 auto;
    header {
      padding: 0.24rem 0 0.28rem;
      text-align: center;
      color: #333333;
      font-size: 0.36rem;
      font-weight: 600;
    } // 签到模块
    .taskCenter_sign {
      width: 100%;
      &.normal {
        height: 3.4rem;
        .background("taskcenter/v120_bg1.png");
      }
      &.done {
        height: 2.2rem;
        .background("taskcenter/v120_bg2.png");
      }
      overflow: hidden;
      position: relative;
      text-align: center;
      .rule {
        width: 1.2rem;
        height: 0.4rem;
        border-radius: 0.27rem;
        .border(#F12926);
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        span {
          display: block;
          width: 200%;
          font-size: 0.4rem;
          color: #f12926;
          line-height: 0.78rem;
          transform: scale(0.5);
          -webkit-transform: scale(0.5);
          transform-origin: top left;
          -webkit-transform-origin: top left;
        }
      }
      .signTitle {
        color: #f12926;
        font-size: 0.64rem;
        margin-top: 0.6rem;
        font-weight: bold;
        line-height: 1;
        &.done {
          color: #333333;
        }
      }
      .signBtn {
        display: inline-block;
        margin-top: 0.4rem;
        width: 2.2rem;
        height: 0.8rem;
        line-height: 0.8rem;
        background: linear-gradient(90deg, #ff794b, #f12926);
        border-radius: 0.42rem;
        font-size: 0.32rem;
        color: #ffffff;
      }
      .signTips {
        margin: 0.3rem 0 0.42rem;
        color: #999999;
        font-size: 0.24rem;
        line-height: 1;
        &.done {
          color: #f12926;
        }
      }
    } // 七天金币模块
    .taskCenter_sevenDays {
      width: 100%;
      height: 1.92rem;
      padding: 0.4rem 0.3rem 0;
      overflow: hidden;
      ul {
        width: 6.9rem;
        height: 100%;
        position: relative;
        .signProgressBar {
          position: absolute;
          top: 0.35rem;
          left: 0.35rem;
          width: 6.2rem;
          height: 0.1rem;
          background: #d8d8d8;
          z-index: -1;
          overflow: hidden;
          .done {
            height: 100%;
            background: linear-gradient(90deg, #fdaf01, #f66000);
          }
        }
        li {
          margin-left: 0.28rem;
          &:nth-child(1) {
            margin-left: 0;
          }
          .coinBox {
            height: 0.72rem;
            width: 0.72rem;
            position: relative;
            text-align: center;
            line-height: 0.84rem;
            .background("taskcenter/v120_graycoin.png");
            margin: 0.04rem 0 0.24rem;
            span {
              color: #666666;
              font-size: 0.24rem;
              font-weight: bold;
              &.scale {
                display: inline-block;
                line-height: 1;
                text-align: center;
                width: 200%;
                font-size: 0.4rem;
                font-weight: normal;
                transform: scale(0.5);
                -webkit-transform: scale(0.5);
                transform-origin: center left;
                -webkit-transform-origin: center left;
                color: #999999;
              }
            }
            &.big {
              margin: 0 0 0.2rem;
              height: 0.8rem;
              width: 0.8rem;
              line-height: 0.8rem;
              .background("taskcenter/v120_bigGraycoin.png");
            }
            &.done {
              .background("taskcenter/v120_goldcoin.png");
              &.big {
                .background("taskcenter/v120_bigGoldcoin.png");
              }
              span {
                color: #f12926;
              }
            }
          }
          .day {
            line-height: 1;
            text-align: center;
            width: 200%;
            font-size: 0.44rem;
            transform: scale(0.5);
            -webkit-transform: scale(0.5);
            transform-origin: top left;
            -webkit-transform-origin: top left;
            color: #999999;
            &.done {
              color: #ff7900;
            }
          }
        }
      }
    } 
    // 广告模块
    .ad {
      margin: 0 auto 0.4rem;
      width: 6.9rem;
      .swiper-container {
        width: 100%;
        height: 1.4rem;
        border-radius: .08rem;
        overflow: hidden;
        z-index: 0;
        img {
          width: 100%;
        }
      }
    }
    // 获奖名单模块
    .taskCenter_roll {
      width: 100%;
      height: 0.62rem;
      padding: 0 0.3rem;
      margin-bottom: 0.4rem;
      overflow: hidden;
      .flushCroll {
        width: 6.9rem;
        height: 0.62rem !important;
        text-align: center;
        background: #f8f8f8;
        border-radius: 0.08rem;
        ul {
          height: 0.62rem !important;
          li {
            height: 0.62rem !important;
            line-height: 0.62rem;
            color: #999999;
            font-size: 0.24rem;
            span {
              color: #f12926;
            }
          }
        }
      }
    } // 今日任务模块
    .taskCenter_todayList {
      width: 100%;
      padding: 0 0.3rem;
      overflow: hidden;
      .title {
        font-size: 0.3rem;
        color: #4a4a4a;
        font-weight: bold;
        margin-bottom: 0.3rem;
      }
      .taskList {
        a {
          display: block;
          margin-bottom: 0.2rem;
          &:nth-child(even) {
            margin-left: 0.2rem;
          }
          .taskContent {
            width: 3.35rem;
            height: 1.6rem;
            background: rgba(245, 166, 35, 0.05);
            border-radius: 0.04rem;
            position: relative;
            overflow: hidden;
            .imgBox {
              width: 0.72rem;
              height: 0.72rem;
              border-radius: 50%;
              position: absolute;
              left: 0.2rem;
              top: 0.44rem;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .info {
              margin: 0.46rem 0 0.46rem 1.12rem;
              p {
                line-height: 1;
                &.taskName {
                  font-size: 0.3rem;
                  color: #333333;
                  margin-bottom: 0.14rem;
                }
                &.taskMoney {
                  color: #ff7900;
                  font-size: 0.24rem;
                  span {
                    color: #ff7900;
                  }
                  &.done {
                    color: #999999;
                    span {
                      color: #999999;
                    }
                  }
                }
              }
            }
          }
        }
      }
    } // 热门任务模块
    .taskCenter_hotList {
      width: 100%;
      overflow: hidden;
      .title {
        padding: 0.2rem 0.3rem 0.3rem;
        font-size: 0.3rem;
        color: #4a4a4a;
        font-weight: bold; // .border(#f8f8f8,bottom);
      }
      .taskList {
        padding: 0 0.3rem 0.1rem;
        a {
          width: 100%;
          font-size: 0;
          display: block;
          margin: 0.2rem 0;
          &:first-child {
            margin: 0;
          }
          .taskContent {
            width: 6.9rem;
            height: 1.6rem;
            font-size: 0;
            &.coin {
              .background("taskcenter/v120_coinBg.png");
              .coinInfo {
                display: inline-block;
                vertical-align: top;
                width: 1.8rem;
                height: 100%;
                padding: 0.48rem 0;
                text-align: center;
                p {
                  line-height: 1;
                }
                .num {
                  color: #ff7900;
                  font-size: 0.4rem;
                  font-weight: 600;
                  margin-bottom: 0.04rem;
                }
                .unit {
                  color: #ff7900;
                  font-size: 0.4rem;
                  width: 200%;
                  transform: scale(0.5);
                  -webkit-transform: scale(0.5);
                  transform-origin: top left;
                  -webkit-transform-origin: top left;
                }
              }
              .taskBtn {
                .btn {
                  border: 1px #ff7900 solid;
                  color: #ff7900;
                }
              }
            }
            &.cash {
              .background("taskcenter/v120_cashBg.png");
              .cashInfo {
                display: inline-block;
                vertical-align: top;
                width: 1.8rem;
                height: 100%;
                padding: 0.6rem 0;
                text-align: center;
                .num {
                  color: #f12926;
                  font-size: 0.4rem;
                  font-weight: 600;
                  line-height: 1;
                  .unit {
                    display: inline-block;
                    color: #f12926;
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                    transform-origin: center left;
                    -webkit-transform-origin: center left;
                    margin-left: 0.05rem;
                  }
                }
              }
              .taskBtn {
                .btn {
                  border: 1px #f12926 solid;
                  color: #f12926;
                }
              }
            }
            .taskInfo {
              display: inline-block;
              vertical-align: top;
              width: 3.1rem;
              height: 100%;
              margin-left: 0.3rem;
              padding: 0.47rem 0;
              text-align: left;
              &.hasProgressBar {
                padding: 0.29rem 0;
              }
              p {
                line-height: 1;
              }
              .taskName {
                color: #333333;
                font-size: 0.3rem;
                margin-bottom: 0.14rem;
              }
              .hot {
                height: 0.21rem;
                background: url("../../../assets/images/taskcenter/v120_hot.png")
                  no-repeat 0 0;
                background-size: 0.17rem 0.21rem;
                .scale {
                  text-indent: 0.42rem;
                  display: inline-block;
                  font-size: 0.44rem;
                  line-height: 0.48rem;
                  width: 200%;
                  transform: scale(0.5);
                  -webkit-transform: scale(0.5);
                  transform-origin: top left;
                  -webkit-transform-origin: top left;
                  color: #999;
                }
              }
              .taskProgress {
                width: 100%;
                height: 0.22rem;
                margin-top: 0.14rem;
                overflow: hidden;
                .bar {
                  display: inline-block;
                  vertical-align: top;
                  margin: 0.06rem 0.1rem 0.06rem 0;
                  width: 0.8rem;
                  height: 0.1rem;
                  border-radius: 0.05rem;
                  background: #e6e6e6;
                  .done {
                    border-radius: 0.05rem;
                    height: 100%;
                    background: #ff7900;
                  }
                }
                .scale {
                  font-size: 0.44rem;
                  color: #999999;
                  line-height: 1;
                  display: inline-block;
                  transform: scale(0.5);
                  -webkit-transform: scale(0.5);
                  transform-origin: top left;
                  -webkit-transform-origin: top left;
                  .CompleteNum {
                    color: #ff7900;
                  }
                }
              }
            }
            .taskBtn {
              height: 100%;
              display: inline-block;
              vertical-align: top;
              position: relative;
              .btn {
                margin-top: 0.54rem;
                .wh(1.4rem,0.52rem);
                text-align: center;
                .lineheight(0.52rem);
                border-radius: 0.52rem;
                font-size: 0.26rem;
                &.done {
                  border: none;
                  color: #999999;
                }
              }
              .countdown {
                width: 100%;
                position: absolute;
                top: 1.1rem;
                left: 0;
                text-align: center;
                font-size: 0.24rem;
                color: #333333;
              }
            }
          }
        }
      }
    } // 底部提示模块
    .taskCenter_more {
      width: 100%;
      height: 1.24rem;
      background: #f8f8f8;
      text-align: center;
      color: #999999;
      font-size: 0.24rem;
      padding: 0.4rem 0 0.6rem;
    }

    .v-modal {
      .mask(0,
        0,
        0,
        0.7); //文章分享弹窗
      .articleModal {
        border-radius: 0.2rem;
        .modalTitle {
          width: 6.48rem;
          padding: 0 0.34rem;
          position: relative;
          overflow: hidden;
          letter-spacing: 1px;
          i.close {
            position: absolute;
            top: 0.34rem;
            right: 0.34rem;
            font-size: 0.4rem;
            color: #d8d8d8;
          }
          .title {
            margin: 0.52rem 0 0;
            font-size: 0.44rem;
            text-align: center;
            color: #efbe03;
            font-weight: bold;
            &.hottitle {
              margin: 0.52rem 0 0.4rem;
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
              top: 0.04rem;
            }
            span {
              color: #efbe03;
              font-size: 0.36rem;
              margin: 0.2rem 0 0.16rem 0.08rem;
              display: inline-block;
              font-weight: bold;
            }
            p {
              color: @tcGray;
              font-size: 0.28rem;
            }
          }
        }
        .hotArticleListBg {
          width: 6.48rem;
          padding: 0.3rem 0.12rem;
          background: #f5f5f5;
          margin-bottom: 0.18rem;
          .hotArticleList {
            height: 4.14rem;
            overflow-y: scroll;
            overflow-x: hidden;
            z-index: 12;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
              width: 2px;
              display: block;
            }
            &::-webkit-scrollbar-thumb {
              border-radius: 2px;
              background: #d8d8d8;
            }
            &::after {
              min-height: 101%;
            }
            .hotArticle {
              width: 5.8rem;
              height: 1.18rem;
              margin: 0 auto 0.3rem;
              &:last-child {
                margin-bottom: 0;
              }
              .chose {
                width: 0.5rem;
                height: 100%;
                .circle {
                  width: 0.32rem;
                  height: 0.32rem;
                  margin: 0.43rem 0;
                  &.default {
                    .background("taskcenter/unselected.png");
                  }
                  &.chosed {
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
                  height: 100%;
                }
              }
              .title {
                width: 3.38rem;
                height: 100%;
                margin-left: 0.14rem;
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
                  position: absolute;
                  top: 0.85rem;
                  left: 0;
                  color: @tcGray;
                  span {
                    font-size: 0.24rem;
                    color: @tcGray;
                    margin-right: 0.16rem;
                  }
                }
              }
            }
          }
        }
        .shareTips {
          width: 6.48rem;
          padding: 0 0.34rem;
          font-size: 0.24rem;
          color: @tcGray;
        }
        .btnBox {
          width: 6.48rem;
          padding: 0.36rem 0.34rem 0.35rem;
          height: 1.6rem;
          .other {
            font-size: 0.32rem;
            color: @tcGray;
            line-height: 0.76rem;
            i {
              font-size: 0.32rem;
              margin-right: 0.12rem;
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
      //去登录弹窗
      .goLoadingModal {
        border-radius: 0.12rem;
        .tipsBox {
          width: 5.8rem;
          height: 3.66rem;
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
          .border(#e9e9e6,
            top);
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
            .border(#e9e9e6,
              right);
          }
          .ok {
            border: 0;
            color: #282a2f;
          }
        }
      }
      //去评论弹窗
      .comment {
        width: 6.3rem;
        background: transparent;
        i.close {
          position: absolute;
          top: -1rem;
          right: -0.1rem;
          font-size: 0.4rem;
          color: #d8d8d8;
        }
        .top {
          .commentLeft {
            width: 2.48rem;
            height: 6.16rem;
            position: relative;
            p {
              font-size: 0.28rem;
              color: #ffffff;
              position: absolute;
              left: 0;
            }
            .tips1 {
              top: 0.4rem;
            }
            .tips2 {
              top: 2.9rem;
            }
            .tips3 {
              top: 4.8rem;
              i {
                position: absolute;
                right: -0.2rem;
                bottom: 0;
                display: block;
                width: 0.36rem;
                height: 0.4rem;
                .background("taskcenter/diamond.png");
              }
            }
          }
          .commentRight {
            width: 3.82rem;
            height: 6.16rem;
            .background("taskcenter/comment.png");
          }
        }
        .btn {
          .border(#ffffff);
          border-radius: 0.76rem;
          margin: 1.28rem auto 0;
          width: 2.96rem;
          height: 0.76rem;
          text-align: center;
          line-height: 0.76rem;
          background: transparent;
          font-size: 0.32rem;
          color: #ffffff;
        }
      }
      //获得金币
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
      //一元提现弹窗
      .withdraw {
        padding: 0 0.34rem;
        border-radius: 0.12rem;
        width: 6rem;
        min-height: 6.08rem;
        i.close {
          position: absolute;
          top: 0.3rem;
          right: 0.3rem;
          font-size: 0.4rem;
          color: #d8d8d8;
        }
        .title {
          font-size: 0.44rem;
          color: #efbe03;
          text-align: center;
          margin: 0.58rem 0 0.46rem;
        }
        ul {
          li {
            height: 0.7rem;
            line-height: 0.7rem;
            width: 5.32rem;
            margin-bottom: 0.42rem;
            .imgBox {
              position: relative;
              width: 0.4rem;
              height: 0.4rem;
              margin: 0.15rem 0;
              img {
                width: 100%;
                height: 100%;
                border-radius: 0.4rem;
              }
              .shadow {
                width: 100%;
                height: 100%;
                border-radius: 0.4rem;
                background: rgba(255, 255, 255, 0.7);
                position: absolute;
                top: 0;
                left: 0;
              }
            }
            .taskName {
              font-size: 0.32rem;
              color: @tcBlack;
              margin-left: 0.14rem;
              &.gray {
                color: @tcGray;
              }
            }
            .default {
              width: 1.48rem;
              height: 0.7rem;
              line-height: 0.7rem;
              text-align: center;
              font-size: 0.28rem;
              color: #ffffff;
              background: @tcRed;
              border-radius: 0.7rem;
            }
            .done {
              width: 1.48rem;
              height: 0.7rem;
              .background("taskcenter/done.png");
            }
          }
        }
      }
      //引导评论弹窗
      .yindao {
        width: 6rem;
        height: 6.64rem;
        background: transparent;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.2rem;
        }
        .btn {
          width: 2.12rem;
          height: 0.6rem;
          font-size: 0.28rem;
          color: #ffffff;
          line-height: 0.6rem;
          text-align: center;
          border-radius: 0.6rem;
          .border(#ffffff);
          margin: auto;
          position: absolute;
          bottom: 0.4rem;
          left: 0;
          right: 0;
        }
      }
    }
  }
}
</style>