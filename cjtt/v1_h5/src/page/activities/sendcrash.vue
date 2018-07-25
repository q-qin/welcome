<template>
  <div class="wrapper" ref="wrapper">
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div v-show="!loading">
      <div class="main content">
        <div class="sendcrash_one">
          <div class="flush_up">
          </div>
          <nv-marquee :duration="800" :interval="2000" :play="marqueeplay" class="flush_croll">
            <li>
              用户
              <span class="gold">138****10</span> 已收到
              <span class="gold">5</span> 个徒弟，预计获得
              <span class="gold">9</span> 元；
            </li>
            <li>
              用户
              <span class="gold">177****26</span> 已收到
              <span class="gold">2</span> 个徒弟，预计获得
              <span class="gold">4</span> 元；
            </li>
            <li>
              用户
              <span class="gold">156****88</span> 已收到
              <span class="gold">66</span> 个徒弟，预计获得
              <span class="gold">200</span> 元；
            </li>
            <li>
              用户
              <span class="gold">151****91</span> 已收到
              <span class="gold">40</span> 个徒弟，预计获得
              <span class="gold">90</span> 元；
            </li>
            <li>
              用户
              <span class="gold">138****27</span> 已收到
              <span class="gold">40</span> 个徒弟，预计获得
              <span class="gold">90</span> 元；
            </li>
            <li>
              用户
              <span class="gold">139****63</span> 已收到
              <span class="gold">123</span> 个徒弟，预计获得
              <span class="gold">200</span> 元；
            </li>
            <li>
              用户
              <span class="gold">186****19</span> 已收到
              <span class="gold">16</span> 个徒弟，预计获得
              <span class="gold">40</span> 元；
            </li>
            <li>
              用户
              <span class="gold">189****20</span> 已收到
              <span class="gold">236</span> 个徒弟，预计获得
              <span class="gold">600</span> 元；
            </li>
          </nv-marquee>
          <div class="sendcrah_one_one">活动开始时间：01月22日</div>
          <router-link class="pupillist" to="sendcrashPupillist"></router-link>
          <span class="tipshenming" @click="toggleshengming"></span>
          <div class="sendcrash__one_two clear">
            <span class="sendcrash_s_o">{{sendactive.new_apprentice_num}}</span>
            <span class="sendcrash_s_t">{{sendactive.effective_apprentice_num}}</span>
            <span class="sendcrash_s_s">{{sendactive.pending_cash}}</span>
          </div>
          <div class="sendcrash__one_three">已获得金币：{{sendactive.coin}}</div>
        </div>
        <div class="sendcrash_two">
          <div class="sendcrash_two_o">本次奖励{{cash}}元</div>
          <div class="sendcrash_two_t">正在第{{status}}梯次{{cash}}元</div>
          <div class="sendcrash_two_s">{{sendactive.effective_apprentice_num}}/{{totalpupil}}</div>
        </div>
        <div class="sendcrash_all">
          <div class="sendcrash_progress ">
            <div class="sendcrash_p " :style="'width:'+ 100 * (sendactive.effective_apprentice_num/totalpupil)+'%'"></div>
          </div>
        </div>
        <div class="sendcrash_three">
          <div v-for="(item,$index) in posters" class="bhb" :key="$index">
            <img :src="item.src" :style="item.style" class="ccc" @click="tudi($index+1)">
          </div>
          <div v-for="(item,$index) in rposters" class="bhb" :key="$index">
            <img :src="item.src" :style="item.style" class="fx">
          </div>
          <div v-for="(item,$index) in rspan" class="bhb" :key="$index">
            <span :style="item.style" class="xu">{{$index+1}}</span>
          </div>
          <div class="bhb" v-for="(item,$index) in dsapn" :key="$index">
            <span class="xudata" :style="item.style" :class="item.class" @click="tudi($index+1)">{{item.money}}</span>
            <span class="xumm" :style="item.statestyle" :class="item.class" @click="tudi($index+1)">{{item.state}}</span>
          </div>
        </div>
        <div class="bottom ">
          <ul class="clear" v-show="activity_status!=2">
            <li class="left">
              <span class="sharebtn" @click="togglebtns">立即分享赚现金</span>
            </li>
            <li class="left">
              <span class="left fudaibtn " :class="{'gray table':bagopend}" @click="openbag">
                <i class="icon"></i>
                <span :class="{'table-cell ':bagopend}" v-html="bagopend?'今日开过啦<br>明天再来':'打开福袋'"></span>
              </span>
            </li>
          </ul>
          <button class="endBtn" @click="alertEnd" v-show="activity_status==2">该活动已结束</button>
        </div>
        <transition>
          <div class="sharebtns" v-show="showshare" @touchmove.prevent>
            <ul class="clear">
              <li class="left pyq">
                <div class="icon" @click="sharepyq">
                  <img src="../../images/pyq.png">
                </div>
                <span>朋友圈邀请</span>
              </li>
              <li class="left weixin">
                <div class="icon" @click="shareweixin">
                  <img src="../../images/wx.png">
                </div>
                <span>微信邀请</span>
              </li>
              <li class="left qq">
                <div class="icon" @click="shareqq">
                  <img src="../../images/qq.png">
                </div>
                <span>QQ邀请</span>
              </li>
            </ul>
            <div class="vdes" v-show="false">
              <div class="table">
                <span class="table-cell">不能用 </span>
                <i class="table-cell iconfont">&#xe624;</i>
                <span class="table-cell"> 分享</span>
                <span class="table-cell" @click="toggleVideo"><button>点这里看教程</button></span>
              </div>
            </div>
            <span class="cancel" @click="togglebtns">取消</span>
          </div>
        </transition>
        <div class="videobg" v-if="showVideo">
          <i class="iconfont" @click="toggleVideo">&#xe685;</i>
          <iframe width="100%" height="100%" frameborder="0" allowfullscreen="" src="http://v.qq.com/iframe/player.html?vid=x0536fsrod4&auto=0"></iframe>
        </div>
        <div class="v-modal" v-show="showshare" @touchmove.prevent></div>
        <div class="bagshare" v-show="showbagshare" @touchmove.prevent>
          <div class="bagrbg">
            <i class="jiao"></i>
            <div class="sbagr">
              <i class="close iconfont" @click="togglebagshare">&#xe685;</i>
              <div class="ico"></div>
              <div class="tip">成功分享给好友即可领取
                <br>100%中奖~</div>
              <div class="btn">
                <button @click="goshare">立即分享赚现金</button>
              </div>
            </div>
          </div>
        </div>
        <transition >
          <div class="details" v-show="showshengming">
            <div class="bagrbg">
              <div class="sbagr">
                <i class="close iconfont" @click="toggleshengming">&#xe685;</i>
                <div class="title">活动规则</div>
                <div class="overscroll">
                  <div class="huotime">
                    <span class="orange">活动时间：
                      <br>2018年1月22日--2018年2月27日</span>
                    <br>有效徒弟结算日期：
                    <span class="orange">2018年2月27日</span>
                    <br>奖励发放时间：
                    <span class="orange">2018年2月28日 - 3月2日</span>
                  </div>
                  <div class="huocon">活动期间，每新增一位有效徒弟可立即获得奖励
                    <span class="orange">1000</span>金币。
                    <br>活动期间，每日分享收徒链接，都可开启"福袋"1次，100%中奖。
                    <br>有效徒弟达到指定人数，可额外获得梯次现金奖励，最高可额外获得
                    <span class="orange">88888</span>元现金。收徒数量越多，奖励越高。
                    <br>现金奖励仅可领取一次，以最高梯次奖励计算。</div>
                  <div class="huotudi">
                    <span class="orange">有效徒弟：</span>活动开始起至2018年2月27日，活动期间收取的每位徒弟，在任意一天累计进贡超过
                    <span class="orange">200</span>金币，即为有效徒弟。</div>
                  <div class="huohr">
                    <div class="hr1"></div>郑重声明
                    <div class="hr2"></div>
                  </div>
                  <div class="huotip">为保证广大用户的收益不被影响，对于存在违规行为的用户，平台将取消其参加活动的资格，并扣除所有奖励，请遵守平台规则，正常邀请好友。</div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <transition >
          <div class="bagget" v-show="showbagget" @touchmove.prevent>
            <div class="bagrbg">
              <div class="sbagr">
                <i class="close iconfont" @click="closebagpop">&#xe685;</i>
                <div class="ico"></div>
                <div class="gold">{{baggetcoin}}个金币</div>
                <div class="tip">奖励已发放到您的个人账户中
                  <br>请到 "我的收入" 中查看</div>
                <div class="btn">
                  <button @click="goshare">立即分享赚现金</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <transition >
          <div class="bagopend" v-show="showbagopend" @touchmove.prevent>
            <div class="bagrbg">
              <div class="sbagr">
                <i class="close iconfont" @click="closebagpop">&#xe685;</i>
                <div class="ico"></div>
                <div class="gold">明天再来哦</div>
                <div class="tip">奖励已发放到您的个人账户中
                  <br>请到 "我的收入" 中查看</div>
                <div class="btn">
                  <button @click="goshare">立即分享赚现金</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <transition>
          <div class="onbagopend" v-show="onbag" @touchmove.prevent>
            <div class="bagrbg">
              <div class="sbagr">
                <div class="onbagtitle">第{{status1}}梯次奖励</div>
                <i class="close iconfont" @click="closebagpop">&#xe685;</i>
                <div class="ico"></div>
                <div class="gold">{{cash1}}元</div>
                <div class="onmesg">请先完成上一梯次任务</div>
                <div class="btn">
                  <button @click="goshare">立即分享赚现金</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <transition>
          <div class="offbagopend" v-show="bagdoing" @touchmove.prevent>
            <div class="bagrbg">
              <i class="jiao"></i>
              <div class="sbagr">
                <i class="close iconfont" @click="closebagpop">&#xe685;</i>
                <div class="onbagtitle">第{{status}}梯次奖励</div>
                <div class="ico"></div>
                <div class="gold">{{cash}}元</div>
                <div class="onmesg">已收取{{sendactive.effective_apprentice_num}}名有效徒弟
                  <br>差{{totalpupil-sendactive.effective_apprentice_num}}位有效徒弟</div>
                <div class="sendcrash_all">
                  <div class="touico">
                    <div class="touico1">{{sendactive.effective_apprentice_num}}/{{totalpupil}}</div>
                  </div>
                  <div class="sendcrash_progress ">
                    <div class="sendcrash_p " :style="'width:'+ 100*(sendactive.effective_apprentice_num/totalpupil)+'%'"></div>
                  </div>
                </div>
                <div class="btn">
                  <button @click="goshare">立即分享赚现金</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <transition >
          <div class="dacheng" v-show="dacheng" @touchmove.prevent>
            <div class="bagrbg">
              <div class="bagrbg1">第{{status1}}梯次已完成</div>
              <div class="bagrbg2">{{cash1}}元已达成</div>
              <div class="bagrbg3" @click="closebagpop"></div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import nvHead from "@/components/header.vue";
  import nvLoading from "@/components/loading.vue";
  import nvMarquee from "@/components/marquee";
  import ajax from "@/config/ajax";
  import appcall from "@/config/appcall";

  export default {
    name: "sendcrash",
    data() {
      return {
        loading: true,
        isios:false,
        showVideo:false,
        showshare: false, // 分享弹框
        bagopend: false, // 福袋开启状态
        showbagshare: false, // 开福袋分享弹框
        showshengming: false,
        showbagopend: false, // 开福袋已开启弹框
        showbagget: false, // 开福袋得金币弹框
        bagopend: false, // 福袋开启状态
        baggetcoin: 0,
        sendactive: {},
        cash: 4,
        cash1: 4,
        status1: 1,
        status: 1,
        totalpupil: 2,
        onbag: false,
        dacheng: false,
        bagdoing: false,
        marqueeplay: false,
        config: {},
        posters: [],
        rposters: [],
        activity_status:0,
        rspan: [{
            style: "color:#fff;top:0.08rem;left:2.12rem;"
          },
          {
            style: "color:#fff;top:0.08rem;left:4.12rem;"
          },
          {
            style: "color:#fff;top:0.08rem;left:6.15rem;"
          },
          {
            style: "color:#fff;top:2.08rem;left:6.1rem;"
          },
          {
            style: "color:#fff;top:2.08rem;left:4.12rem;"
          },
          {
            style: "color:#fff;top:2.08rem;left:2.12rem;"
          },
          {
            style: "color:#fff;top:4.08rem;left:2.12rem;"
          },
          {
            style: "color:#fff;top:4.08rem;left:4.12rem;"
          },
          {
            style: "color:#fff;top:4.08rem;left:6.12rem;"
          },
          {
            style: "color:#fff;top:6.08rem;left:6.12rem;"
          },
          {
            style: "color:#fff;top:6.08rem;left:4.12rem;"
          },
          {
            style: "color:#fff;top:6.08rem;left:2.12rem;"
          },
          {
            style: "color:#fff;top:8.08rem;left:3.12rem;"
          },
          {
            style: "color:#fff;top:8.08rem;left:6.12rem;"
          },
          {
            style: "color:#fff;top:10.08rem;left:6.12rem;"
          }
        ],
        dsapn: [{
            style: "top:0.2rem;left:1.5rem;",
            statestyle: "top:0.6rem;left:1.4rem;",
            money: "4元",
            state: "收徒2人",
          },
          {
            style: "top:0.2rem;left:3.4rem;",
            statestyle: "top:0.6rem;left:3.4rem;",
            money: "9元",
            state: "收徒4人",
          },
          {
            style: "top:0.2rem;left:5.4rem;",
            statestyle: "top:0.6rem;left:5.4rem;",
            money: "15元",
            state: "收徒6人",
          },
          {
            style: "top:2.2rem;left:5.4rem;",
            statestyle: "top:2.6rem;left:5.4rem;",
            money: "20元",
            state: "收徒8人",
          },
          {
            style: "top:2.2rem;left:3.4rem;",
            statestyle: "top:2.6rem;left:3.3rem;",
            money: "28元",
            state: "收徒10人",
          },
          {
            style: "top:2.2rem;left:1.4rem;",
            statestyle: "top:2.6rem;left:1.3rem;",
            money: "40元",
            state: "收徒15人",
          },
          {
            style: "top:4.2rem;left:1.37rem;",
            statestyle: "top:4.6rem;left:1.3rem;",
            money: "90元",
            state: "收徒30人",
          },
          {
            style: "top:4.2rem;left:3.3rem;",
            statestyle: "top:4.6rem;left:3.3rem;",
            money: "200元",
            state: "收徒60人",
          },
          {
            style: "top:4.2rem;left:5.19rem;",
            statestyle: "top:4.6rem;left:5.3rem;",
            money: "600元",
            state: "收徒160人",
          },
          {
            style: "top:6.2rem;left:5.3rem;font-size:0.25rem;",
            statestyle: "top:6.6rem;left:5.3rem;",
            money: "1600元",
            state: "收徒400人",
          },
          {
            style: "top:6.2rem;left:3.3rem;font-size:0.25rem;",
            statestyle: "top:6.6rem;left:3.3rem;",
            money: "2900元",
            state: "收徒700人",
          },
          {
            style: "top:6.2rem;left:1.2rem;font-size:0.25rem;",
            statestyle: "top:6.6rem;left:1.2rem;",
            money: "6000元",
            state: "收徒1200人",
          },
          {
            style: "top:8.2rem;left:1.7rem;",
            statestyle: "top:8.6rem;left:1.7rem;",
            money: "10000元",
            state: "收徒2000人",
          },
          {
            style: "top:8.2rem;left:4.7rem;",
            statestyle: "top:8.6rem;left:4.7rem;",
            money: "16000元",
            state: "收徒3000人",
          },
          {
            style: "top:10.2rem;left:3.3rem;",
            statestyle: "top:10.6rem;left:3.3rem;",
            money: "88888元",
            state: "收徒10000人",
          }
        ]
      };
    },
    components: {
      nvHead,
      nvLoading,
      nvMarquee
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    created() {
      if(JKEventHandler.browser().ios){
        this.isios = true;
      }
      this.getconfig();
    },
    mounted() {},
    methods: {
      alertEnd(){
        this.$alert('该活动已结束，您可继续参与其他收徒活动！').then(rs=>{
          appcall.navigator({
            title: '邀请好友',
            url: this.$h5url + 'invite',
          })
        });
      },
      /**
       * 获取页面初始数据
       */
      async getinitialstatus() {
        let params = {};
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "post",
          this.$apiurl + "/invite_activity/get_schedule",
          comm,
          params
        );
        if (rs && rs.code === 1001 && rs.data) {
          this.sendactive = rs.data;
          this.status = rs.data.current_grade;
          this.allmoney(rs.data.current_grade);
          this.config.list.forEach((n, i) => {
            if (i == 0) {
              this.posters.push({
                style: "top:0rem;left:1rem"
              });
              this.rposters.push({
                style: "top:0.4rem;left:2.44rem;width: 0.7rem;"
              });
              if (this.status > 0) {
                this.posters[0].src = require("../../images/activities/jihuo.png");
                this.rposters[0].src = require("../../images/activities/fx.png");
                this.dsapn[0].class = "act";
                if (this.status == 1) {
                  } else {
                  this.dsapn[0].state = "已完成";
                }
              } else {
                this.posters[0].src = require("../../images/activities/nojihuo.png");
                this.rposters[0].src = require("../../images/activities/nofx.png");
              }
            } else if (i == 1) {
              this.posters.push({
                style: "top:0rem;left:3rem"
              });
              this.rposters.push({
                style: "top:0.4rem;left:4.4rem;width: 0.7rem;"
              });
              if (this.status > 1) {
                this.rposters[1].src = require("../../images/activities/fx.png");
                this.posters[1].src = require("../../images/activities/jihuo.png");
                this.dsapn[1].class = "act";
                if (this.status == 2) {} else {
                  this.dsapn[1].state = "已完成";
                }
              } else {
                this.posters[1].src = require("../../images/activities/nojihuo.png");
                this.rposters[1].src = require("../../images/activities/nofx.png");
              }
            } else if (i == 2) {
              this.posters.push({
                style: "top:0rem;left:5rem"
              });
              this.rposters.push({
                style: "top:1.28rem;left:5.5rem;height:0.8rem;width: 0.52rem;"
              });
              if (this.status > 2) {
                this.posters[2].src = require("../../images/activities/jihuo.png");
                this.rposters[2].src = require("../../images/activities/fxdown.png");
                this.dsapn[2].class = "act";
                if (this.status == 3) {} else {
                  this.dsapn[2].state = "已完成";
                }
              } else {
                this.posters[2].src = require("../../images/activities/nojihuo.png");
                this.rposters[2].src = require("../../images/activities/nofxdown.png");
              }
            } else if (i == 3) {
              this.posters.push({
                style: "top:2rem;left:5rem"
              });
              this.rposters.push({
                style: "top:2.4rem;left:4.4rem;width: 0.7rem;transform:rotate(180deg)"
              });
              if (this.status > 3) {
                this.posters[3].src = require("../../images/activities/jihuo.png");
                this.rposters[3].src = require("../../images/activities/fx.png");
                this.dsapn[3].class = "act";
                if (this.status == 4) {} else {
                  this.dsapn[3].state = "已完成";
                }
              } else {
                this.posters[3].src = require("../../images/activities/nojihuo.png");
                this.rposters[3].src = require("../../images/activities/nofx.png");
              }
            } else if (i == 4) {
              this.posters.push({
                style: "top:2rem;left:3rem"
              });
              this.rposters.push({
                style: "top:2.4rem;left:2.4rem;width: 0.7rem;transform:rotate(180deg)"
              });
              if (this.status > 4) {
                this.posters[4].src = require("../../images/activities/jihuo.png");
                this.rposters[4].src = require("../../images/activities/fx.png");
                this.dsapn[4].class = "act";
                if (this.status == 5) {} else {
                  this.dsapn[4].state = "已完成";
                }
              } else {
                this.posters[4].src = require("../../images/activities/nojihuo.png");
                this.rposters[4].src = require("../../images/activities/nofx.png");
              }
            } else if (i == 5) {
              this.posters.push({
                style: "top:2rem;left:1rem"
              });
              this.rposters.push({
                style: "top:3.28rem;left:1.5rem;height:0.8rem;width: 0.52rem;"
              });
              if (this.status > 5) {
                this.rposters[5].src = require("../../images/activities/fxdown.png");
                this.posters[5].src = require("../../images/activities/jihuo.png");
                this.dsapn[5].class = "act";
                if (this.status == 6) {} else {
                  this.dsapn[5].state = "已完成";
                }
              } else {
                this.posters[5].src = require("../../images/activities/nojihuo.png");
                this.rposters[5].src = require("../../images/activities/nofxdown.png");
              }
            } else if (i == 6) {
              this.posters.push({
                style: "top:4rem;left:1rem"
              });
              this.rposters.push({
                style: "top:4.5rem;left:2.44rem;width: 0.7rem;"
              });
              if (this.status > 6) {
                this.rposters[6].src = require("../../images/activities/fx.png");
                this.posters[6].src = require("../../images/activities/jihuo.png");
                this.dsapn[6].class = "act";
                if (this.status == 7) {} else {
                  this.dsapn[6].state = "已完成";
                }
              } else {
                this.posters[6].src = require("../../images/activities/nojihuo.png");
                this.rposters[6].src = require("../../images/activities/nofx.png");
              }
            } else if (i == 7) {
              this.posters.push({
                style: "top:4rem;left:3rem"
              });
              this.rposters.push({
                style: "top:4.5rem;left:4.4rem;width: 0.7rem;"
              });
              if (this.status > 7) {
                this.rposters[7].src = require("../../images/activities/fx.png");
                this.posters[7].src = require("../../images/activities/jihuo.png");
                this.dsapn[7].class = "act";
                if (this.status == 8) {} else {
                  this.dsapn[7].state = "已完成";
                }
              } else {
                this.posters[7].src = require("../../images/activities/nojihuo.png");
                this.rposters[7].src = require("../../images/activities/nofx.png");
              }
            } else if (i == 8) {
              this.posters.push({
                style: "top:4rem;left:5rem"
              });
              this.rposters.push({
                style: "top:5.3rem;left:5.5rem;height:0.8rem;width: 0.52rem;"
              });
              if (this.status > 8) {
                this.posters[8].src = require("../../images/activities/jihuo.png");
                this.rposters[8].src = require("../../images/activities/fxdown.png");
                this.dsapn[8].class = "act";
                if (this.status == 9) {} else {
                  this.dsapn[8].state = "已完成";
                }
              } else {
                this.posters[8].src = require("../../images/activities/nojihuo.png");
                this.rposters[8].src = require("../../images/activities/nofxdown.png");
              }
            } else if (i == 9) {
              this.posters.push({
                style: "top:6rem;left:5rem"
              });
              this.rposters.push({
                style: "top:6.4rem;left:4.4rem;width: 0.7rem;transform:rotate(180deg)"
              });
              if (this.status > 9) {
                this.posters[9].src = require("../../images/activities/jihuo.png");
                this.rposters[9].src = require("../../images/activities/fx.png");
                this.dsapn[9].class = "act";
                if (this.status == 10) {} else {
                  this.dsapn[9].state = "已完成";
                }
              } else {
                this.posters[9].src = require("../../images/activities/nojihuo.png");
                this.rposters[9].src = require("../../images/activities/nofx.png");
              }
            } else if (i == 10) {
              this.posters.push({
                style: "top:6rem;left:3rem"
              });
              this.rposters.push({
                style: "top:6.4rem;left:2.4rem;width: 0.7rem;transform:rotate(180deg)"
              });
              if (this.status > 10) {
                this.posters[10].src = require("../../images/activities/jihuo.png");
                this.rposters[10].src = require("../../images/activities/fx.png");
                this.dsapn[10].class = "act";
                if (this.status == 11) {} else {
                  this.dsapn[10].state = "已完成";
                }
              } else {
                this.posters[10].src = require("../../images/activities/nojihuo.png");
                this.rposters[10].src = require("../../images/activities/nofx.png");
              }
            } else if (i == 11) {
              this.posters.push({
                style: "top:6rem;left:1rem"
              });
              this.rposters.push({
                style: "top:7.3rem;left:1.5rem;height:0.8rem;width: 0.52rem;"
              });
              if (this.status > 11) {
                this.posters[11].src = require("../../images/activities/jihuo.png");
                this.rposters[11].src = require("../../images/activities/fxdown.png");
                this.dsapn[11].class = "act";
                this.dsapn[11].state = "已完成";
                if (this.status == 12) {} else {
                  this.dsapn[11].state = "已完成";
                }
              } else {
                this.posters[11].src = require("../../images/activities/nojihuo.png");
                this.rposters[11].src = require("../../images/activities/nofxdown.png");
              }
            } else if (i == 12) {
              this.posters.push({
                style: "top:8rem;left:1rem;width:2.54rem"
              });
              this.rposters.push({
                style: "top:8.4rem;left:3.4rem;width: 0.7rem;"
              });
              if (this.status > 12) {
                this.posters[12].src = require("../../images/activities/jihuo.png");
                this.rposters[12].src = require("../../images/activities/fx.png");
                this.dsapn[12].class = "act";
                if (this.status == 13) {} else {
                  this.dsapn[12].state = "已完成";
                }
              } else {
                this.posters[12].src = require("../../images/activities/middlenoactive.png");
                this.rposters[12].src = require("../../images/activities/nofx.png");
              }
            } else if (i == 13) {
              this.posters.push({
                style: "top:8rem;left:4rem;width:2.54rem"
              });
              this.rposters.push({
                style: "top:9.3rem;left:5.5rem;height:0.8rem;width: 0.52rem;"
              });
              if (this.status > 13) {
                this.posters[13].src = require("../../images/activities/jihuo.png");
                this.rposters[13].src = require("../../images/activities/fxdown.png");
                this.dsapn[13].class = "act";
                if (this.status == 14) {} else {
                  this.dsapn[13].state = "已完成";
                }
              } else {
                this.posters[13].src = require("../../images/activities/middlenoactive.png");
                this.rposters[13].src = require("../../images/activities/nofxdown.png");
              }
            } else if (i == 14) {
              this.posters.push({
                style: "top:10rem;left:1rem;width:5.54rem"
              });
              if (this.status > 14) {
                this.posters[14].src = require("../../images/activities/jihuo.png");
                this.dsapn[14].class = "act";
                if (this.status == 15) {} else {
                  this.dsapn[14].state = "已完成";
                }
              } else {
                this.posters[14].src = require("../../images/activities/big_icon.png");
              }
            }
          });
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 获取梯度数据
       */
      async getconfig() {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/invite_activity/get_config",
          comm,
          params
        );
        if (rs && rs.code === 1001 && rs.data) {
          this.marqueeplay = true;
          this.config = rs.data;
          this.loading = false;
          this.getinitialstatus();
          this.getPagstatus();
          this.activity_status = rs.data.activity_status?rs.data.activity_status:0;
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 分享到朋友圈
       */
      async sharepyq() {
        let params = {
          share_where: 1
        };
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/invite_activity/task_to_share_qq",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let images = rs.data.url;
          let params = {
            type: 2,
            title: "",
            url: "",
            desc: "看新闻赚现金，幸运任务领不停，还能赚点零花钱哦！可以通过支付宝提现，全民阅读热潮已开始，快一起来",
            images: images
          };
          console.log(params);
          appcall.invite(params);
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 分享到微信好友
       */
      async shareweixin() {
        let params = {
          share_where: 2
        };
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/invite_activity/task_to_share",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let url = rs.data;
          let params = {
            type: 1,
            title: "我刚加入了超级头条，还不错，邀请你加入",
            url: rs.data.url,
            desc: "太爽了，看了资讯赚零花钱！我已经用了段时间了",
            images: ""
          };
          console.log(params);
          appcall.invite(params);
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 分享到QQ好友
       */
      async shareqq() {
        let params = {
          share_where: 3
        };
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/invite_activity/task_to_share_qq",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let images = rs.data.url;
          let params = {
            type: 5,
            title: "",
            url: "",
            desc: "",
            images: images
          };
          console.log(params);
          appcall.invite(params);
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }
      },
      /*
       * 视频教程
       */
      toggleVideo(){
        this.showshare = false;
        this.showVideo = !this.showVideo;
      },
      /**
       * 获取福袋是否开启状态
       */
      async getPagstatus() {
        let params = {};
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "post",
          this.$apiurl + "/invite_activity/get_dkfd_status",
          comm,
          params
        );
        if (rs && rs.code === 1001 && rs.data) {
          this.bagopend = rs.data.status == 0 ? false : true;
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 打开福袋操作
       */
      async openbag() {
        if (this.bagopend) {
          this.showbagopend = true;
        } else {
          let params = {};
          let comm = await appcall.getRequestData(params);
          let rs = await ajax(
            "post",
            this.$apiurl + "/invite_activity/task_to_dkfd",
            comm,
            params
          );
          if (rs && rs.code === 2001) {
            this.showbagshare = true;
          } else if (rs && rs.code === 1001) {
            this.baggetcoin = rs.data.coin;
            this.showbagget = true;
            this.bagopend = true;
          } else {
            this.$alert(rs.msg);
          }
        }
      },
      tudi(value) {
        if (value > this.status) {
          this.onbag = true;
          this.allmoney1(value);
        } else if (value == this.status) {
          if (this.sendactive.effective_apprentice_num < this.totalpupil) {
            this.bagdoing = true;
          } else {
            this.dacheng = true;
          }
        } else {
          this.allmoney1(value);
          this.dacheng = true;
        }
      },
      goshare() {
        this.showbagshare = false;
        this.showbagget = false;
        this.showbagopend = false;
        this.showshare = true;
        this.bagdoing = false;
        this.onbag = false;
      },
      // 立即分享现金事件
      togglebtns() {
        this.showshare = !this.showshare;
      },
      togglebagshare() {
        this.showbagshare = !this.showbagshare;
      },
      toggleshengming() {
        this.showshengming = !this.showshengming;
      },
      closebagpop() {
        this.showbagshare = false;
        this.showbagget = false;
        this.showbagopend = false;
        this.onbag = false;
        this.bagdoing = false;
        this.dacheng = false;
      },
      allmoney(value) {
        switch (value) {
          case "1":
            this.cash = 4;
            this.totalpupil = 2;
            break;
          case "2":
            this.cash = 9;
            this.totalpupil = 4;
            break;
          case "3":
            this.cash = 15;
            this.totalpupil = 6;
            break;
          case "4":
            this.cash = 20;
            this.totalpupil = 8;
            break;
          case "5":
            this.cash = 28;
            this.totalpupil = 10;
            break;
          case "6":
            this.cash = 40;
            this.totalpupil = 15;
            break;
          case "7":
            this.cash = 90;
            this.totalpupil = 30;
            break;
          case "8":
            this.cash = 200;
            this.totalpupil = 60;
            break;
          case "9":
            this.cash = 600;
            this.totalpupil = 160;
            break;
          case "10":
            this.cash = 1600;
            this.totalpupil = 400;
            break;
          case "11":
            this.cash = 2900;
            this.totalpupil = 700;
            break;
          case "12":
            this.cash = 6000;
            this.totalpupil = 1200;
            break;
          case "13":
            this.cash = 10000;
            this.totalpupil = 2000;
            break;
          case "14":
            this.cash = 16000;
            this.totalpupil = 3000;
            break;
          case "15":
            this.cash = 88888;
            this.totalpupil = 10000;
            break;
          default:
            break;
        }
      },
      allmoney1(value) {
        switch (value) {
          case 1:
            this.cash1 = 4;
            this.status1 = 1;
            break;
          case 2:
            this.cash1 = 9;
            this.status1 = 2;
            break;
          case 3:
            this.cash1 = 15;
            this.status1 = 3;
            break;
          case 4:
            this.cash1 = 20;
            this.status1 = 4;
            break;
          case 5:
            this.cash1 = 28;
            this.status1 = 5;
            break;
          case 6:
            this.cash1 = 40;
            this.status1 = 6;
            break;
          case 7:
            this.cash1 = 90;
            this.status1 = 7;
            break;
          case 8:
            this.cash1 = 200;
            this.status1 = 8;
            break;
          case 9:
            this.cash1 = 600;
            this.status1 = 9;
            break;
          case 10:
            this.cash1 = 1600;
            this.status1 = 10;
            break;
          case 11:
            this.cash1 = 2900;
            this.status1 = 11;
            break;
          case 12:
            this.cash1 = 6000;
            this.status1 = 12;
            break;
          case 13:
            this.cash1 = 10000;
            this.status1 = 13;
            break;
          case 14:
            this.cash1 = 16000;
            this.status1 = 14;
            break;
          case 15:
            this.cash1 = 88888;
            this.status1 = 15;
            break;
          default:
            break;
        }
      }
    },
    watch:{
      showshengming:(newVal,oldVal)=>{
        if(newVal){
          document.documentElement.style.overflow = 'hidden';
        }else{
          document.documentElement.style.overflow = 'auto';
        }
      }
    },
    filters: {}
  };

</script>
<style lang="less" scoped>
  @import "../../style/colors";
  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
    z-index: 20;
  }

  .flush_up {
    height: 0.6rem;
    line-height: 0.6rem;
    background: #621d02;
    opacity: 0.05;
  }

  .flush_croll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: .6rem;
    display: block;
    text-align: center;
    z-index: 1;
    ul {
      height: .6rem;
    }
    li {
      height: 0.6rem;
      line-height: 0.6rem;
      display: block;
      font-size: 0.24rem;
      color: #fff;
    }
    .gold {
      color: #ffec47;
    }
  }

  .main {
    text-align: center;
    background-color: rgb(255, 102, 61);
    width: 100%;
    padding-bottom: 1.5rem;
    position: relative;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .sharewx-enter-active {
    animation: bounce-in 0.5s;
  }

  .sharewx-leave-active {
    animation: bounce-in 0.5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  .sendcrash_up {
    background-color: #ff4e1e;
    height: 0.8rem;
    line-height: 0.8rem;

    marquee {
      height: 0.8rem;
      text-align: center;
      color: #fff;
      font-size: 0.28rem;
      .gold {
        color: #ffec47;
      }
    }
  }

  .sendcrash_one {
    background: url("../../images/activities/sendcrash_bg.png");
    background-size: 100%;
    width: 100%;
    height: 6.44rem;
    position: relative;
    .sendcrah_one_one {
      position: absolute;
      top: 2.53rem;
      font-size: 0.3rem;
      color: #fff;
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 0.5rem;
      line-height: 0.5rem;
      width: 5.1rem;
      text-align: center;
    }
    .pupillist {
      width: 1rem;
      height: 1rem;
      top: 3.05rem;
      left: 0.4rem;
      position: absolute;
      z-index: 1;
    }
    .tipshenming {
      width: 1.3rem;
      height: 0.9rem;
      position: absolute;
      top: 1rem;
      left: 5.85rem;
    }
    .sendcrash__one_two {
      position: absolute;
      top: 3.5rem;
      font-size: 0.4rem;
      width: 6rem;
      height: 1.17rem;
      line-height: 1.17rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      color: #8f3302;
      span {
        color: #8f3302;
        width: 2rem;
        display: block;
        float: left;
      }
    }
    .sendcrash__one_three {
      position: absolute;
      top: 5.59rem;
      left: 2.8rem;
      font-size: 0.3rem;
      color: #fff;
      height: 0.56rem;
      line-height: 0.56rem;
    }
    .sendcrash_s {
      position: absolute;
      top: 5.65rem;
      left: 2.8rem;
      font-size: 0.3rem;
      color: #fff;
    }
  }

  .sendcrash_two {
    background: url("../../images/activities/sendcrash_xq.png");
    background-size: 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 15.73rem;
    position: relative;
    .sendcrash_two_o {
      color: #fff;
      font-size: 0.33rem;
      position: relative;
      top: 0.01rem;
      height: 0.74rem;
      line-height: 0.74rem;
    }
    .sendcrash_two_t {
      color: #8f3302;
      font-size: 0.27rem;
      position: absolute;
      top: .95rem;
      left: 0;
      margin-left: 1rem;
    }
    .sendcrash_two_s {
      color: #fff;
      font-size: .24rem;
      position: absolute;
      top: 0.94rem;
      right: 1.2rem;
      text-align: left;
      margin-left: 1rem;
      height: .4rem;
      line-height: .4rem;
    }
  }

  .sendcrash_all {
    position: absolute;
    top: 7.95rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    .sendcrash_progress {
      background-color: rgb(242, 187, 89);
      width: 5.5rem;
      height: .3rem;
      border-radius: .3rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      position: relative;
      .sendcrash_p {
        background-color: rgb(255, 207, 93);
        height: .24rem;
        border-radius: .24rem;
        position: absolute;
        left: .03rem;
        top:.03rem;
      }
    }
  }

  .sendcrash_three {
    position: absolute;
    top: 8.6rem;
    width: 100%;
    .bhb {
      position: relative; // width: 5.54rem;
      .ccc {
        height: 1.39rem;
        width: 1.54rem;
        position: absolute;
        z-index: 10;
      }
      .fx {
        height: 0.46rem;
        position: absolute;
      }
      .xu {
        width: 0.27rem;
        height: 0.27rem; // background-color: red;
        position: absolute;
        z-index: 20;
        font-size: 0.16rem;
        line-height: 0.27rem;
      }
      .xudata {
        position: absolute;
        z-index: 20;
        font-size: 0.3rem;
        color: rgb(181, 179, 170);
        font-style: italic;
        &.act {
          color: #ffec47;
        }
      }
      .xumm {
        position: absolute;
        z-index: 20;
        font-size: 0.2rem;
        color: rgb(181, 179, 170);
        &.act {
          color: #ffec47;
        }
      }
    }
  }

  .bottom {
    position: fixed;
    bottom: 0;
    height: 1.5rem;
    background: #ff572a;
    width: 100%;
    z-index: 20;
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
    ul {
      li {
        width: 50%;
        position: relative;
        .sharebtn {
          width: 3.55rem;
          height: 1rem;
          line-height: 1rem;
          display: block;
          margin: 0.25rem auto;
          text-align: center;
          border-radius: 1rem;
          background: linear-gradient(to top, #ead83b, #fcee72);
          font-size: 0.36rem;
          color: #8f3302;
        }
        .fudaibtn {
          position: absolute;
          width: 2.65rem;
          height: 1rem;
          line-height: 0.99rem;
          margin: 0.25rem auto;
          left: 0;
          right: 0;
          font-size: 0.3rem;
          border: 1px solid #fff;
          border-radius: 1rem;
          padding-left: 0.75rem;
          i {
            width: 0.88rem;
            height: 0.88rem;
            position: absolute;
            left: 0.1rem;
            top: 0.04rem;
            background: url(../../images/activities/tudi_fudai_ico.png) no-repeat center center;
            background-size: 100%;
          }
          span {
            color: #fff;
          }
          &.gray {
            line-height: 1;
            border: 1px solid #ddd;
            i {
              background: url(../../images/activities/tudi_fudai_ico_gray.png) no-repeat center center;
              background-size: 100%;
            }
            span {
              color: #ddd;
              font-size: 0.26rem;
            }
          }
        }
      }
    }
    .endBtn{
      margin: .25rem auto;
      width: 6.37rem;
      height: 1rem;
      border-radius: 1rem;
      font-size: .36rem;
      background: #e1e1e1;
    }
  }

  .sharebtns {
    position: fixed;
    width: 100%;
    bottom: 0;
    background: #fff;
    z-index: 21;
    ul {
      margin: 0 0.4rem auto;
      li {
        width: 33.3%;
        height: 2.5rem;
        .icon {
          width: 1.3rem;
          height: 1.3rem;
          text-align: center;
          margin: 0.35rem auto;
          border-radius: 1.3rem;
          border: 1px solid #f1f1f1;
          img {
            width: 0.66rem;
            height: 0.66rem;
            margin: 0.3rem auto;
          }
        }
        span {
          font-size: 0.26rem;
        }
      }
    }
    .vdes{
      width: 100%;
      height: 1.3rem;
      display: block;
      font-size: .26rem;
      margin: .2rem auto;
      div{
        width: 6rem;
        height: 1rem;
        border-radius: 1rem;
        background: #fafafa;
        border:1px solid #eee;
        line-height: 1rem;
        margin: 0 auto;
        i.iconfont{
          font-size: .65rem;
          color:#67c213;
        }
        span{
          text-align: left;
        }
        span:first-child{
          text-align: right;
        }
        span:last-child{
          text-align: center;
        }
        button{
          width: 2.15rem;
          height: .55rem;
          background: #00b1fe;
          color:#fff;
          border-radius: .55rem;
          text-align: center;
        }
      }
    }
    .cancel {
      height: 1rem;
      line-height: 1rem;
      display: block;
      background: #fafafa;
      font-size: 0.36rem;
    }
  }
  .videobg{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 31;
    top:0;
    left: 0;
    i.iconfont{
      width: .5rem;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      border-radius: 100%;
      background: #fff;
      color:#000;
      position: absolute;
      top:.3rem;
      right: .3rem;
      font-size: .3rem;
      z-index: 32;
    }
    iframe{
      background: #fff;
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      right: 0;
      margin: auto;
      padding: 0;
    }
  }

  .bagshare {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      background-color: #fef0d5;
      display: block;
      width: 5.85rem;
      height: 6.5rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -3.25rem auto;
      border-radius: 0.2rem;
      .jiao {
        position: absolute;
        top: 0;
        left: 0;
        width: 1.12rem;
        height: 1.12rem;
        background: url(../../images/activities/tudi_bag_share_jiao.png) no-repeat center center;
        background-size: 100%;
        z-index: 1;
      }
    }
    .sbagr {
      border: 1px solid #e97e5a;
      border-radius: 0.2rem;
      padding: 0.75rem 0.35rem 0;
      margin: 0.1rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 5.65rem;
      height: 6.3rem;
      .close {
        font-size: 0.4rem;
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
        color: #999;
      }
      .ico {
        width: 3.27rem;
        height: 2.7rem;
        background: url(../../images/activities/tudi_bag_share_ico.png) no-repeat center center;
        background-size: 100%;
        margin: 0 auto;
      }
      .tip {
        font-size: 0.34rem;
        color: #666;
        margin-top: 0.35rem;
      }
      .btn {
        margin-top: 0.3rem;
        button {
          width: 5rem;
          height: 1rem;
          font-size: 0.36rem;
          color: #fff;
          background: linear-gradient(to top, #ff653a, #ff7e56);
          border-radius: 1rem;
        }
      }
    }
  }

  .details {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    .bagrbg {
      position: relative;
      background-color: #fef0d5;
      display: block;
      width: 5.85rem;
      height: 8rem;
      top: 40%;
      left: 0;
      right: 0;
      margin: -3.25rem auto;
      border-radius: 0.2rem;
    }
    .sbagr {
      border: 1px solid #e97e5a;
      border-radius: 0.2rem;
      padding: 0.75rem 0.35rem 0;
      margin: 0.1rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 5.65rem;
      height: 7.8rem;
      .close {
        font-size: 0.4rem;
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
        color: #999;
      }
      .title {
        font-weight: 700;
        font-size: 0.32rem;
        text-align: center;
      }
      .overscroll {
        width: 100%;
        height: 6rem;
        overflow: hidden;
        overflow-y: scroll;
        .orange {
          color: rgb(255, 112, 73);
        }
        .huotime {
          text-align: left;
          line-height: 0.4rem;
          font-size: 0.26rem;
        }
        .huocon {
          margin-top: 0.5rem;
          text-align: left;
          line-height: 0.4rem;
          font-size: 0.26rem;
        }
        .huotudi {
          margin-top: 0.5rem;
          text-align: left;
          line-height: 0.36rem;
          font-size: 0.26rem;
        }
        .huotip {
          margin-top: 0.5rem;
          text-align: left;
          line-height: 0.36rem;
          font-size: 0.26rem;
        }
        .huohr {
          color: rgb(255, 112, 73);
          position: relative;
          margin-top: 0.63rem;
          font-size: 0.3rem;
          .hr1 {
            width: 1.26rem;
            position: absolute;
            background: rgb(255, 112, 73);
            height: 1px;
            left: 0;
            top: 0.19rem;
          }
          .hr2 {
            position: absolute;
            right: 0;
            width: 1.26rem;
            background: rgb(255, 112, 73);
            height: 1px;
            top: 0.19rem;
          }
        }
      }
    }
  }

  .bagget {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      background-color: #fef0d5;
      display: block;
      width: 5.85rem;
      height: 6.5rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -3.25rem auto;
      border-radius: 0.2rem;
    }
    .sbagr {
      border: 1px solid #e97e5a;
      border-radius: 0.2rem;
      padding: 0.75rem 0.35rem 0;
      margin: 0.1rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 5.65rem;
      height: 6.3rem;
      .close {
        font-size: 0.4rem;
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
        color: #999;
      }
      .ico {
        width: 3.19rem;
        height: 2.04rem;
        background: url(../../images/activities/tudi_bag_get_ico.png) no-repeat center center;
        background-size: 100%;
        margin: 0 auto;
      }
      .gold {
        font-size: 0.54rem;
        color: #d13f24;
      }
      .tip {
        font-size: 0.28rem;
        color: #666;
        margin-top: 0.35rem;
      }
      .btn {
        margin-top: 0.3rem;
        button {
          width: 5rem;
          height: 1rem;
          font-size: 0.36rem;
          color: #fff;
          background: linear-gradient(to top, #ff653a, #ff7e56);
          border-radius: 1rem;
        }
      }
    }
  }

  .bagopend {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      background-color: #fef0d5;
      display: block;
      width: 5.85rem;
      height: 6.5rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -3.25rem auto;
      border-radius: 0.2rem;
    }
    .sbagr {
      border: 1px solid #e97e5a;
      border-radius: 0.2rem;
      padding: 0.75rem 0.35rem 0;
      margin: 0.1rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 5.65rem;
      height: 6.3rem;
      .close {
        font-size: 0.4rem;
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
        color: #999;
      }
      .ico {
        width: 3.19rem;
        height: 2.04rem;
        background: url(../../images/activities/tudi_bag_get_ico.png) no-repeat center center;
        background-size: 100%;
        margin: 0 auto;
      }
      .gold {
        font-size: 0.54rem;
        color: #d13f24;
      }
      .tip {
        font-size: 0.28rem;
        color: #666;
        margin-top: 0.35rem;
      }
      .btn {
        margin-top: 0.3rem;
        button {
          width: 5rem;
          height: 1rem;
          font-size: 0.36rem;
          color: #fff;
          background: linear-gradient(to top, #ff653a, #ff7e56);
          border-radius: 1rem;
        }
      }
    }
  }

  .onbagopend {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      background-color: #fef0d5;
      display: block;
      width: 5.85rem;
      height: 6.5rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -3.25rem auto;
      border-radius: 0.2rem;
    }
    .sbagr {
      border: 1px solid #e97e5a;
      border-radius: 0.2rem;
      padding: 0.75rem 0.35rem 0;
      margin: 0.1rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 5.65rem;
      height: 6.3rem;
      .close {
        font-size: 0.4rem;
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
        color: #999;
      }
      .onbagtitle {
        color: #000;
        font-size: 0.3rem;
        font-weight: 700;
        margin-bottom: 0.2rem;
      }
      .ico {
        width: 1.3rem;
        height: 1.54rem;
        background: url(../../images/activities/xqd.png) no-repeat center center;
        background-size: 100%;
        margin: 0 auto;
      }
      .ogmesg {
        font-size: 0.24rem;
        margin-top: 0.43rem;
      }
      .gold {
        font-size: 0.54rem;
        color: #d13f24;
      }
      .tip {
        font-size: 0.28rem;
        color: #666;
        margin-top: 0.35rem;
      }
      .btn {
        margin-top: 0.8rem;
        button {
          width: 5rem;
          height: 1rem;
          font-size: 0.36rem;
          color: #fff;
          background: linear-gradient(to top, #ff653a, #ff7e56);
          border-radius: 1rem;
        }
      }
    }
  }

  .offbagopend {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      background-color: #fef0d5;
      display: block;
      width: 5.85rem;
      height: 7.68rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -3.84rem auto;
      border-radius: 0.2rem;
      .jiao {
        position: absolute;
        top: 0;
        left: 0;
        width: 1.12rem;
        height: 1.12rem;
        background: url(../../images/activities/tudi_bag_share_jiao.png) no-repeat center center;
        background-size: 100%;
        z-index: 1;
      }
    }
    .sbagr {
      border: 1px solid #e97e5a;
      border-radius: 0.2rem;
      padding: 0.75rem 0.35rem 0;
      margin: 0.1rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 5.65rem;
      height: 7.46rem;
      .close {
        font-size: 0.4rem;
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
        color: #999;
      }
      .onbagtitle {
        color: #000;
        font-size: 0.3rem;
        font-weight: 700;
        margin-bottom: 0.2rem;
      }
      .gold {
        font-size: 0.54rem;
        color: #d13f24;
      }
      .onmesg {
        font-size: 0.28rem;
      }
      .sendcrash_all {
        position: absolute;
        top: 4.8rem;
        left:0;
        right: 0;
        .touico {
          width: 1.22rem;
          height: 0.53rem;
          background: url(../../images/activities/toubu_ico.png) no-repeat center center;
          background-size: 100%;
          margin: 0 auto;
          position: relative;
          .touico1 {
            height: 0.4rem;
            line-height: 0.4rem;
            position: absolute;
            color: #fff;
            top: 0.01rem;
            left: 0.4rem;
            right: 0;
          }
        }
        .sendcrash_progress {
          margin-top: .13rem;
          background-color: rgb(242, 187, 89);
          width: 4.8rem;
          height: .3rem;
          border-radius: .3rem;
          position: relative;
          .sendcrash_p {
            background-color: rgb(255, 207, 93);
            height: .24rem;
            border-radius: .24rem;
            position: absolute;
            left: .03rem;
            top: .03rem;
          }
        }
      }
      .ico {
        width: 1.3rem;
        height: 1.54rem;
        background: url(../../images/activities/xqd.png) no-repeat center center;
        background-size: 100%;
        margin: 0 auto;
      }
      .btn {
        position: absolute;
        top: 6.1rem;
        button {
          width: 5rem;
          height: 1rem;
          font-size: 0.36rem;
          color: #fff;
          background: linear-gradient(to top, #ff653a, #ff7e56);
          border-radius: 1rem;
        }
      }
    }
  }

  .dacheng {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      display: block;
      width: 7.5rem;
      height: 9.18rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -4.59rem auto;
      background: url(../../images/activities/gx.png) no-repeat center center;
      background-size: 100%;
      .bagrbg1 {
        position: absolute;
        top: 3.85rem;
        left: 0;
        right: 0;
        margin: auto;
        font-size: 0.34rem;
        color: rgb(255, 244, 123);
      }
      .bagrbg2 {
        position: absolute;
        top: 4.82rem;
        left: 0;
        right: 0;
        margin: 0 auto;
        font-size: 0.4rem;
        line-height: 0.7rem;
        height: 0.7rem;
        color: rgb(255, 244, 123);
      }
      .bagrbg3 {
        position: absolute;
        background: url(../../images/activities/gb.png) no-repeat center center;
        background-size: 100%;
        width: 0.72rem;
        height: 0.72rem;
        top: 9rem;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
  }

   ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }

</style>
