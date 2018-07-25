<template>
  <div class="wrapper" ref="wrapper">
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div v-show="!loading">
      <div class="main content">
        <div class="sendcrash_one">
          <div class="sendcrash_up">
          </div>
          <marquee direction="up" align="middle" scrollamount="2" class="sendcrash_croll">
            用户
            <span class="gold">138****10</span> 已收到
            <span class="gold">5</span> 个徒弟，预计获得
            <span class="gold">6</span> 元；
            <br> 用户
            <span class="gold">177****26</span> 已收到
            <span class="gold">2</span> 个徒弟，预计获得
            <span class="gold">6</span> 元；
            <br> 用户
            <span class="gold">156****88</span> 已收到
            <span class="gold">66</span> 个徒弟，预计获得
            <span class="gold">360</span> 元；
            <br> 用户
            <span class="gold">151****91</span> 已收到
            <span class="gold">40</span> 个徒弟，预计获得
            <span class="gold">165</span> 元；
            <br> 用户
            <span class="gold">139****63</span> 已收到
            <span class="gold">123</span> 个徒弟，预计获得
            <span class="gold">360</span> 元；
            <br> 用户
            <span class="gold">186****19</span> 已收到
            <span class="gold">16</span> 个徒弟，预计获得
            <span class="gold">14</span> 元；
            <br> 用户
            <span class="gold">189****20</span> 已收到
            <span class="gold">236</span> 个徒弟，预计获得
            <span class="gold">1040</span> 元；
          </marquee>
          <div class="sendcrah_one_one">领取任务时间：01月15日12:00</div>
          <div class="sendcrash__one_two clear">
            <span class="sendcrash_s_o left">{{sendactive.new_apprentice_num}}
              <br>
              <span style="font-size:0.24rem;font-weight:500">新增徒弟</span>
            </span>
            <span class="sendcrash_s_t left">{{sendactive.effective_apprentice_num}}
              <br>
              <span style="font-size:0.24rem;font-weight:500">有效徒弟</span>
            </span>
            <span class="sendcrash_s_s left">{{sendactive.pending_cash}}
              <br>
              <span style="font-size:0.24rem;font-weight:500">预计奖金</span>
            </span>
          </div>
          <div class="sendcrash__one_three">已获得金币：{{sendactive.coin}}</div>
          <div class="sendcrash__one_gz" @click="toggleshengming">规则</div>
          <router-link to="pupil_list">
            <div class="sendcrash__one_lb">徒弟列表</div>
          </router-link>
        </div>
        <div class="act_content">
          <ul class="act_content_ul">
            <li class="act_content_li1" v-for="(item,$index) in sendactive.pending_grade_list" :key="$index">
              <div class="act_content_d" @click="tanchuang1($index,item.cash,item.apprentice_num)">
                <div class="act_content_mon">{{item.cash|decimal(0)}}
                  <span class="act_content_mon_span">元</span>
                </div>
                <div class="act_content_zt" v-if="$index===0">还差 <span class="act_content_zt_span">{{item.apprentice_num-sendactive.effective_apprentice_num}}</span> 位有效徒弟</div>
                <div class="act_content_zt" v-else>完成上一梯次任务即可解锁</div>
              </div>
              <button class="act_content_btn" @click="goshare">去分享</button>
            </li>
            <li class="act_content_li2" v-for="(item,$index) in sendactive.completed_grade_list" :key="$index">
              <div class="act_content_d" @click="tanchuang2(($index,item.cash))">
                <div class="act_content_mon">{{item.cash|decimal(0)}}
                  <span class="act_content_mon_span">元</span>
                </div>
                <div class="act_content_zt">恭喜完成</div>
              </div>
              <button class="act_content_btn">已完成</button>
            </li>
          </ul>
        </div>
        <div class="bottom ">
          <ul class="clear">
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
          <div class="tip">
            本次活动最终解释权归“超级头条”所有
            <br> 超级头条会按照国家相关规定代扣代缴个人所得税
          </div>
        </div>
        <transition>
          <div class="sharebtns" v-show="showshare">
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
            <span class="cancel" @click="togglebtns">取消</span>
          </div>
        </transition>
        <div class="v-modal" v-show="showshare"></div>
        <div class="bagshare" v-show="showbagshare" @touchmove.prevent>
          <div class="bagrbg">
            <i class="close iconfont" @click="togglebagshare">&#xe685;</i>
            <div class="sbagr">
              <i class="jiao"></i>
              <div class="ico"></div>
              <div class="gold">您的福袋来啦</div>
              <div class="tip">成功分享给好友即可领取
                <br>100%中奖~</div>
              <div class="btn">
                <button @click="goshare">立即分享赚现金</button>
              </div>
            </div>
          </div>
        </div>
        <transition name="fade">
          <div class="details" v-show="showshengming">
            <div class="bagrbg">
              <i class="close iconfont" @click="toggleshengming">&#xe685;</i>
              <div class="sbagr">
                <div class="title">活动规则</div>
                <div class="huotime">活动时间：
                  <br>2018年1月15日--2018年3月5日
                  <br>有效徒弟结算日期：2018年3月5日
                  <br>奖励发放时间：2018年3月11日</div>
                <div class="overscroll">
                  <div class="huocon">活动期间，每新增一位有效徒弟可立即获得奖励
                    <span class="orange">1000</span>金币。
                    <br>活动期间，每日分享收徒链接，都可开启"福袋"1次，100%中奖。
                    <br>有效徒弟达到指定人数，可额外获得梯次现金奖励，最高可额外获得
                    <span class="orange">88888</span>元现金。收徒数量越多，奖励越高。
                    <br>现金奖励仅可领取一次，以最高梯次奖励计算。</div>
                  <div class="huotudi">
                    <span class="orange">有效徒弟：</span>领取任务起至2018年3月5日，活动期间收取的每位徒弟，累计进贡超过
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
        <transition name="fade">
          <div class="bagget" v-show="showbagget" @touchmove.prevent>
            <div class="bagrbg">
              <i class="close iconfont" @click="closebagpop">&#xe685;</i>
              <div class="sbagr">
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
        <transition name="fade">
          <div class="bagopend" v-show="showbagopend" @touchmove.prevent>
            <div class="bagrbg">
              <i class="close iconfont" @click="closebagpop">&#xe685;</i>
              <div class="sbagr">
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
        <transition name="fade">
          <div class="onbagopend" v-show="onbag" @touchmove.prevent>
            <div class="bagrbg">
              <div class="sbagr">
                <div class="onbagtitle">本梯次奖励</div>
                <i class="close iconfont" @click="closebagpop">&#xe685;</i>
                <div class="gold" v-if="cash1>600&&cash1<10000" style="font-size:0.9rem">{{cash1|decimal(0)}}
                  <span class="gold_min">元</span>
                </div>
                <div class="gold" v-else-if="cash1>6000" style="font-size:0.7rem">{{cash1|decimal(0)}}
                  <span class="gold_min">元</span>
                </div>
                <div class="gold" v-else>{{cash1|decimal(0)}}
                  <span class="gold_min">元</span>
                </div>
                <div class="onmesg">请先完成上一梯次任务</div>
                <div class="btn">
                  <button @click="goshare">立即分享赚现金</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div class="offbagopend" v-show="bagdoing" @touchmove.prevent>
            <div class="bagrbg">
              <div class="sbagr">
                <i class="close iconfont" @click="closebagpop">&#xe685;</i>
                <div class="onbagtitle">本梯次奖励</div>
                <div class="gold" v-if="cash1>600&&cash1<10000" style="font-size:0.9rem">{{cash1|decimal(0)}}
                  <span class="gold_min">元</span>
                </div>
                <div class="gold" v-else-if="cash1>6000" style="font-size:0.7rem">{{cash1|decimal(0)}}
                  <span class="gold_min">元</span>
                </div>
                <div class="gold" v-else>{{cash1|decimal(0)}}
                  <span class="gold_min">元</span>
                </div>
                <div class="onmesg">已收取
                  <span class="onmesg_span">{{sendactive.effective_apprentice_num}}</span>名有效徒弟
                  <br>还差
                  <span class="onmesg_span" v-if="apprentice_num-sendactive.effective_apprentice_num!==null">{{apprentice_num-sendactive.effective_apprentice_num}}</span>位有效徒弟</div>
                <div class="btn">
                  <button @click="goshare">立即分享赚现金</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div class="dacheng" v-show="dacheng" @touchmove.prevent>
            <div class="bagrbg">
              <div class="sbagr">
                <i class="close iconfont" @click="closebagpop">&#xe685;</i>
                <div class="onbagtitle">本梯次已完成</div>
                <div class="gold" v-if="cash1>600&&cash1<10000" style="font-size:0.9rem">{{cash1|decimal(0)}}
                  <span class="gold_min">元</span>
                </div>
                <div class="gold" v-else-if="cash1>6000" style="font-size:0.7rem">{{cash1|decimal(0)}}
                  <span class="gold_min">元</span>
                </div>
                <div class="gold" v-else>{{cash1|decimal(0)}}
                  <span class="gold_min">元</span>
                </div>
                <div class="onmesg">继续冲刺下一梯次奖励吧~</div>
                <div class="btn">
                  <button @click="goshare">立即分享赚现金</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import ajax from '@/config/ajax';
import appcall from '@/config/appcall';

export default {
  name: 'sendcrash',
  data() {
    return {
      loading: false,
      showshare: false, // 分享弹框
      bagopend: false, // 福袋开启状态
      showshengming: false,
      showbagshare: false, // 开福袋分享弹框1q
      showbagopend: false, // 开福袋已开启弹框
      showbagget: false, // 开福袋得金币弹框
      baggetcoin: 0,
      sendactive: {},
      cash1: 0,
      onbag: false,
      dacheng: false,
      bagdoing: false,
      config: {},
      apprentice_num: 0
    }
  },
  components: {
    nvHead,
    nvLoading
  },
  async created() {
    this.getconfig();
  },
  mounted() {},
  methods: {
    /**
     *任务进行中点击事件
     */
    tanchuang1(value, grade, apprentice_num) {
      if (value + 1 === 1) {
        this.bagdoing = true
        this.cash1 = grade
        this.apprentice_num = apprentice_num
      } else {
        this.onbag = true
        this.cash1 = grade
      }
    },
    /**
     *达成点击事件
     */
    tanchuang2(value, grade) {
      this.dacheng = true
      this.cash1 = value
    },
    /**
     * 获取页面初始数据
     */
    async getinitialstatus() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax('post', this.$apiurl + '/invite_activity/get_schedule', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        this.sendactive = rs.data
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
      let rs = await ajax('post', this.$apiurl + '/invite_activity/get_config', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        this.loading = false;
        this.config = rs.data;
        this.getinitialstatus();
        this.getPagstatus();
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 分享到朋友圈
     */
    async sharepyq() {
      let params = {
        share_where: 1,
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/invite_activity/task_to_share_qq', comm, params);
      if (rs && rs.code === 1001) {
        let images = rs.data.url;
        let params = {
          type: 2,
          title: '',
          url: '',
          desc: '看新闻赚现金，幸运任务领不停，还能赚点零花钱哦！可以通过支付宝提现，全民阅读热潮已开始，快一起来',
          images: images,
        }
        console.log(params);
        appcall.invite(params);
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 分享到微信好友
     */
    async shareweixin() {
      let params = {
        share_where: 2,
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/invite_activity/task_to_share', comm, params);
      if (rs && rs.code === 1001) {
        let url = rs.data;
        let params = {
          type: 1,
          title: '我刚加入了超级头条，还不错，邀请你加入',
          url: rs.data.url,
          desc: '太爽了，看了资讯赚零花钱！我已经用了段时间了',
          images: '',
        }
        console.log(params);
        appcall.invite(params);
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        })
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

      let rs = await ajax('post', this.$apiurl + '/invite_activity/task_to_share_qq', comm, params);
      if (rs && rs.code === 1001) {
        let images = rs.data.url;
        let params = {
          type: 5,
          title: '',
          url: '',
          desc: '',
          images: images,
        }
        console.log(params);
        appcall.invite(params);
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 获取福袋是否开启状态
     */
    async getPagstatus() {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/invite_activity/get_dkfd_status', comm, params);
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

        let rs = await ajax('post', this.$apiurl + '/invite_activity/task_to_dkfd', comm, params);
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
    goshare() {
      this.showbagshare = false;
      this.showbagget = false;
      this.showbagopend = false;
      this.showshare = true;
      this.bagdoing = false;
      this.onbag = false;
      this.dacheng = false;
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
    }
  },
  filters: {}
}

</script>
<style>
html {
  overflow: hidden;
}

body {
  overflow: auto;
}

</style>
<style lang="less" scoped>
@import '../../style/colors';
.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
  z-index: 20;
}

.main {
  text-align: center;
  height: 100%;
  width: 100%;
  z-index: -3;
  background: #f25e19;
}

.main:after {
  content: '';
  width: 100%;
  height: 5.04rem;
  display: block;
  position: fixed;
  background: url('../../images/activities/asc_bot_ty2.png') no-repeat center center;
  background-size: 100%;
  z-index: 0;
  bottom: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

{
  opacity: 0;
}

.sharewx-enter-active {
  animation: bounce-in .5s;
}

.sharewx-leave-active {
  animation: bounce-in .5s reverse;
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

.sendcrash_one {
  background: url('../../images/activities/asc_bg.png');
  background-size: 100%;
  width: 100%;
  height: 7.65rem;
  position: relative;
  z-index: 1;
  .sendcrash_up {
    height: 0.77rem;
    line-height: .77rem;
    background-color: black;
    opacity: .05;
  }
  .sendcrash_croll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    color: #fff;
    font-size: .28rem;
    .gold {
      color: #ffec47;
    }
  }
  .sendcrah_one_one {
    position: absolute;
    top: 3.6rem;
    font-size: 0.22rem;
    color: #fff;
    left: 1.98rem;
    height: .47rem;
    line-height: .47rem;
  }
  .sendcrash__one_two {
    position: absolute;
    top: 5.4rem;
    font-size: .5rem;
    font-weight: 600;
    width: 6rem;
    height: 1.17rem;
    line-height: .5rem;
    left: 0;
    right: 0;
    margin: auto;
    span {
      color: white;
      width: 2rem;
      display: block;
    }
  }
  .sendcrash__one_three {
    height: .53rem;
    position: absolute;
    top: 6.94rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    font-size: .26rem;
    color: #fff;
    height: .56rem;
    line-height: .56rem;
    padding-left: .4rem;
  }
  .sendcrash__one_gz {
    position: fixed;
    top: 3rem;
    height: .46rem;
    line-height: .46rem;
    right: 0;
    font-size: .24rem;
    color: #fff;
    background: #f48130;
    border-bottom-left-radius: .46rem;
    border-top-left-radius: .46rem;
    padding: 0 .1rem 0 .25rem;
    box-shadow: 0 .05rem .05rem #b32d08;
    border: 1px solid #fff;
    border-right: none;
    z-index: 0;
    &:active {
      transform: scale(.95);
    }
  }
  .sendcrash__one_lb {
    position: fixed;
    top: 3.75rem;
    height: .46rem;
    line-height: .46rem;
    right: 0;
    font-size: 0.24rem;
    color: #fff;
    background: #f48130;
    border-bottom-left-radius: .46rem;
    border-top-left-radius: .46rem;
    padding: 0 .1rem 0 .25rem;
    box-shadow: 0 .05rem .05rem #b32d08;
    border: 1px solid #fff;
    border-right: none;
    z-index: 0;
    &:active {
      transform: scale(.95);
    }
  }
}

.act_content {
  width: 100%;
  z-index: -2;
  padding-bottom: 2.74rem;
  .act_content_ul {
    margin: 0 auto;
    width: 100%;
    z-index: -1;
    .act_content_li1 {
      background-image: url('../../images/activities/asc_unlocked.png');
      background-size: 100%;
      height: 1.36rem;
      width: 5.57rem;
      margin: 0 auto;
      display: block;
      z-index: 1;
      margin-top: 0.17rem;
      position: relative;
      .act_content_d {
        width: 3.95rem;
        height: 1.36rem;
        text-align: left;
        padding-left: .59rem;
        padding-top: .1rem;
        .act_content_mon {
          font-size: .55rem;
          color: #ec4910;
          font-weight: 800;
          .act_content_mon_span {
            font-size: .3rem;
            color: #ec4910;
          }
        }
        .act_content_zt {
          margin-top: .05rem;
          font-size: .25rem;
          color: #6A6765;
          .act_content_zt_span {
            color: #ec4910;
          }
        }
      }
      .act_content_btn {
        position: absolute;
        right: .23rem;
        top: .49rem;
        width: 1.19rem;
        height: .42rem;
        background-color: rgb(255, 67, 99);
        box-shadow: .02rem .02rem 0 #ffb6c2;
        border-radius: .42rem;
        color: #fff;
        &:active {
          transform: scale(.95);
        }
      }
    }
    .act_content_li1:first-child {
      background-image: url('../../images/activities/asc_doing.png');
      background-size: 100%;
      height: 1.36rem;
      width: 5.57rem;
      margin-top: rem;
      display: block;
      z-index: 10;
      margin-top: .17rem;
    }
    .act_content_li2 {
      background-image: url('../../images/activities/asc_locked.png');
      background-size: 100%;
      height: 1.36rem;
      width: 5.57rem;
      margin: 0 auto;
      display: block;
      z-index: 10;
      margin-top: .17rem;
      position: relative;
      .act_content_d {
        width: 3.95rem;
        height: 1.36rem;
        text-align: left;
        padding-left: .59rem;
        padding-top: .1rem;
        .act_content_mon {
          font-size: .55rem;
          color: #ec4910;
          font-weight: 800;
          .act_content_mon_span {
            font-size: .3rem;
            color: #ec4910;
          }
        }
        .act_content_zt {
          margin-top: .05rem;
          font-size: .2rem;
          color: rgb(106, 103, 101);
        }
      }
      ;
      .act_content_btn {
        position: absolute;
        right: .23rem;
        top: .49rem;
        width: 1.19rem;
        height: .42rem;
        background-color: rgb(181, 181, 181);
        border-radius: .42rem;
        color: #fff;
      }
    }
  }
}

.bottom {
  background: url('../../images/activities/asc_bot2.png') no-repeat center center;
  background-size: 100%;
  position: fixed;
  height: 2.84rem;
  bottom: 0;
  width: 100%;
  z-index: 10;
  ul {
    padding-top: 1rem;
    li {
      width: 50%;
      position: relative;
      .sharebtn {
        width: 2.7rem;
        height: .7rem;
        line-height: .7rem;
        display: block;
        margin: 0 auto;
        text-align: center;
        border-radius: .7rem;
        background: #f8fa72;
        font-size: .29rem;
        color: #d73e2a;
        box-shadow: .05rem .05rem 0 #e0a75e;
        &:active {
          transform: scale(.95);
        }
      }
      .fudaibtn {
        position: absolute;
        width: 2.7rem;
        height: .7rem;
        line-height: .7rem;
        margin: 0 auto;
        left: 0;
        right: 0;
        background: #fff;
        border-radius: .7rem;
        padding-left: .5rem;
        box-shadow: .05rem .05rem 0 #b5b5b5;
        &:active {
          transform: scale(.95);
        }
        i {
          width: .5rem;
          height: .5rem;
          position: absolute;
          left: .3rem;
          top: .07rem;
          background: url('../../images/activities/tudi_fudai_ico2.png') no-repeat center center;
          background-size: 100%;
        }
        span {
          color: #d73e2a;
          font-size: .29rem;
        }
        &.gray {
          line-height: 1;
          i {
            background: url('../../images/activities/tudi_fudai_ico_gray2.png') no-repeat center center;
            background-size: 100%;
          }
          span {
            color: #8A8888;
            font-size: .26rem;
          }
        }
      }
    }
  }
  .tip {
    font-size: .13rem;
    margin-top: .3rem;
    color: #fff;
  }
}

.sharebtns {
  position: fixed;
  width: 100%;
  height: 3.5rem;
  bottom: 0;
  background: #fff;
  z-index: 21;
  ul {
    margin: 0 .4rem auto;
    li {
      width: 33.3%;
      height: 2.5rem;
      .icon {
        width: 1.3rem;
        height: 1.3rem;
        text-align: center;
        margin: .35rem auto;
        border-radius: 1.3rem;
        border: 1px solid #f1f1f1;
        img {
          width: .66rem;
          height: .66rem;
          margin: .3rem auto;
        }
      }
      span {
        font-size: .26rem;
      }
    }
  }
  .cancel {
    height: 1rem;
    line-height: 1rem;
    display: block;
    background: #fafafa;
    font-size: .36rem;
  }
}

.bagshare {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 11;
  .bagrbg {
    position: relative;
    display: block;
    width: 5.29rem;
    height: 5.69rem;
    top: 50%;
    left: 0;
    right: 0;
    margin: -2.85rem auto;
    .close {
      font-size: .3rem;
      position: absolute;
      right: 0rem;
      top: -0.6rem;
      color: #fff;
      background: #000;
      opacity: .5;
      border-radius: 50%;
      width: .5rem;
      height: .5rem;
      text-align: center;
      line-height: .5rem;
      z-index: 22;
    }
  }
  .sbagr {
    border-radius: .3rem;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 5.29rem;
    height: 5.69rem;
    background-image: linear-gradient(to bottom, #ff5c29 0, #ff3455 100%);
    .jiao {
      position: absolute;
      top: 0;
      left: 0;
      width: .73rem;
      height: .73rem;
      background: url('../../images/activities/tudi_bag_share_jiao2.png') no-repeat center center;
      background-size: 100%;
      z-index: 1;
    }
    .ico {
      width: 5.29rem;
      height: 5rem;
      background: url('../../images/activities/tudi_bag_get_ico3.png') no-repeat center center;
      background-size: 100%;
      margin: -3rem auto;
    }
    .gold {
      font-size: .54rem;
      color: #fff;
      margin-top: 3rem;
      font-weight: 600;
    }
    .tip {
      font-size: .353rem;
      color: #f5f16c;
      margin-top: .3rem;
    }
    .btn {
      margin-top: .4rem;
      button {
        width: 4.11rem;
        height: .77rem;
        font-size: .29rem;
        color: #ce1b16;
        background: #f8fa72;
        border-radius: .6rem;
        box-shadow: 0.05rem .05rem 0 #e0a75e;
        &:active {
          transform: scale(.95);
        }
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
  .bagrbg {
    position: relative;
    background-color: rgb(253, 75, 47);
    display: block;
    width: 5.85rem;
    height: 10rem;
    top: 50%;
    left: 0;
    right: 0;
    margin: -5rem auto;
    border-radius: .5rem;
    .close {
      font-size: .4rem;
      position: absolute;
      right: .25rem;
      top: .25rem;
      color: #fff;
    }
  }
  .sbagr {
    border: 1px solid rgb(250, 246, 220);
    border-radius: .5rem;
    position: absolute;
    margin: 0.9rem 0 0 .18rem;
    top: 0;
    left: 0;
    width: 5.49rem;
    height: 8.9rem;
    .title {
      font-weight: 700;
      font-size: .48rem;
      width: 2.26rem;
      background-color: rgb(253, 75, 47);
      height: .94rem;
      text-align: center;
      position: absolute;
      top: -0.35rem;
      left: 1.6rem;
      color: rgb(250, 246, 220);
    }
    .huotime {
      text-align: left;
      line-height: .4rem;
      font-size: .26rem;
      color: rgb(250, 246, 220);
      padding: .5rem .35rem 0;
      margin-bottom: .5rem;
    }
    .overscroll {
      width: 100%;
      height: 6.3rem;
      border-bottom-left-radius: .5rem;
      border-bottom-right-radius: .5rem;
      overflow: hidden;
      overflow-y: scroll;
      background-color: rgb(250, 246, 220);
      padding: 0 .35rem 0.35rem;

      .orange {
        color: rgb(255, 112, 73);
      }
      .huocon {
        margin-top: .4rem;
        text-align: left;
        line-height: .4rem;
        font-size: .26rem;
      }
      .huotudi {
        margin-top: .4rem;
        text-align: left;
        line-height: .36rem;
        font-size: .26rem;
      }
      .huotip {
        margin-top: .4rem;
        text-align: left;
        line-height: .36rem;
        font-size: .26rem;
      }
      .huohr {
        color: rgb(255, 112, 73);
        position: relative;
        margin-top: .63rem;
        font-size: .3rem;
        .hr1 {
          width: 1.26rem;
          position: absolute;
          background: rgb(255, 112, 73);
          height: 1px;
          left: 0;
          top: .19rem;
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
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 11;
  .bagrbg {
    position: relative;
    display: block;
    width: 5.29rem;
    height: 5.69rem;
    top: 50%;
    left: 0;
    right: 0;
    margin: -2.85rem auto;
    .close {
      font-size: .3rem;
      position: absolute;
      right: 0rem;
      top: -0.6rem;
      color: #fff;
      background: #000;
      opacity: .5;
      border-radius: 50%;
      width: .5rem;
      height: .5rem;
      text-align: center;
      line-height: .5rem;
      z-index: 23;
    }
  }
  .sbagr {
    border-radius: .3rem;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 5.29rem;
    height: 5.69rem;
    background-image: linear-gradient(to bottom, #ff5c29 0, #ff3455 100%);
    .jiao {
      position: absolute;
      top: 0;
      left: 0;
      width: .73rem;
      height: .73rem;
      background: url('../../images/activities/tudi_bag_share_jiao2.png') no-repeat center center;
      background-size: 100%;
      z-index: 1;
    }
    .ico {
      width: 5.29rem;
      height: 5rem;
      background: url('../../images/activities/tudi_bag_get_ico2.png') no-repeat center center;
      background-size: 100%;
      margin: -3rem auto;
    }
    .gold {
      font-size: .54rem;
      color: #fff;
      margin-top: 3rem;
      font-weight: 600;
    }
    .tip {
      font-size: .353rem;
      color: #f5f16c;
      margin-top: .3rem;
    }
    .btn {
      margin-top: .4rem;
      button {
        width: 4.11rem;
        height: .77rem;
        font-size: .29rem;
        color: #ce1b16;
        background: #f8fa72;
        border-radius: .6rem;
        box-shadow: .05rem .05rem 0 #e0a75e;
        &:active {
          transform: scale(.95);
        }
      }
    }
  }
}

.bagopend {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 11;
  .bagrbg {
    position: relative;
    display: block;
    width: 5.29rem;
    height: 5.69rem;
    top: 50%;
    left: 0;
    right: 0;
    margin: -2.85rem auto;
    .close {
      font-size: .3rem;
      position: absolute;
      right: 0rem;
      top: -0.6rem;
      color: #fff;
      background: #000;
      opacity: .5;
      border-radius: 50%;
      width: .5rem;
      height: .5rem;
      text-align: center;
      line-height: .5rem;
      z-index: 23;
    }
  }
  .sbagr {
    border-radius: .3rem;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 5.29rem;
    height: 5.69rem;
    background-image: linear-gradient(to bottom, #ff5c29 0, #ff3455 100%);
    .jiao {
      position: absolute;
      top: 0;
      left: 0;
      width: .73rem;
      height: .73rem;
      background: url('../../images/activities/tudi_bag_share_jiao2.png') no-repeat center center;
      background-size: 100%;
      z-index: 1;
    }
    .ico {
      width: 5.29rem;
      height: 5rem;
      background: url('../../images/activities/tudi_bag_get_ico2.png') no-repeat center center;
      background-size: 100%;
      margin: -3rem auto;
    }
    .gold {
      font-size: .54rem;
      color: #fff;
      margin-top: 3rem;
      font-weight: 600;
    }
    .tip {
      font-size: .353rem;
      color: #f5f16c;
      margin-top: .3rem;
    }
    .btn {
      margin-top: .4rem;
      button {
        width: 4.11rem;
        height: .77rem;
        font-size: .29rem;
        color: #ce1b16;
        background: #f8fa72;
        border-radius: .6rem;
        box-shadow: .05rem .05rem 0 #e0a75e;
        &:active {
          transform: scale(.95);
        }
      }
    }
  }
}

.offbagopend {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .bagrbg {
    background: url(../../images/activities/asc_bcjl.png) no-repeat;
    background-size: 100%;
    position: relative;
    width: 6.42rem;
    height: 6.74rem;
    top: 50%;
    display: block;
    margin: -4.41rem auto;
    .close {
      background-size: 100%;
      width: .52rem;
      height: .52rem;
      right: .44rem;
      top: .42rem;
      position: absolute;
      background-color: white;
      border-radius: 50%;
      line-height: .56rem;
    }
    ;
    .onbagtitle {
      height: 1.15rem;
      width: 3.51rem;
      line-height: 1.15rem;
      color: rgb(220, 70, 54);
      font-weight: 600;
      font-size: .49rem;
      position: absolute;
      top: .5rem;
      left: 0;
      right: 0;
      margin: auto;
    }
    ;
    .gold {
      font-size: 1.2rem;
      color: rgb(220, 70, 54);
      font-weight: 700;
      position: absolute;
      height: 2.32rem;
      width: 3.03rem;
      top: 1.65rem;
      line-height: 2.32rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      .gold_min {
        color: rgb(220, 70, 54);
        font-size: .46rem;
      }
    }
    ;
    .onmesg {
      font-size: 0.36rem;
      color: white;
      height: 1.15rem;
      width: 4.5rem;
      position: absolute;
      top: 5.3rem;
      left: 0;
      right: 0;
      margin: auto;
      line-height: .55rem;
      .onmesg_span {
        color: rgb(220, 70, 54);
      }
    }
  }
  ;
  .btn {
    position: absolute;
    top: 7rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    button {
      width: 5.51rem;
      height: 1.05rem;
      line-height: .7rem;
      display: block;
      margin: 0 auto;
      text-align: center;
      border-radius: .7rem;
      background: rgb(236, 61, 43);
      font-size: .49rem;
      color: white;
      box-shadow: .05rem .05rem 0 rgb(180, 11, 13);
    }
  }
}

.onbagopend {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .bagrbg {
    background: url(../../images/activities/asc_wjs.png) no-repeat;
    background-size: 100%;
    position: relative;
    width: 6.42rem;
    height: 6.74rem;
    top: 50%;
    display: block;
    margin: -4.41rem auto;
    .close {
      background-size: 100%;
      width: .52rem;
      height: .52rem;
      right: .44rem;
      top: .42rem;
      position: absolute;
      background-color: white;
      border-radius: 50%;
      line-height: .56rem;
    }
    ;
    .onbagtitle {
      height: 1.15rem;
      width: 3.51rem;
      line-height: 1.15rem;
      color: rgb(220, 70, 54);
      font-weight: 600;
      font-size: .49rem;
      position: absolute;
      top: .5rem;
      left: 0;
      right: 0;
      margin: auto;
    }
    ;
    .gold {
      font-size: 1.2rem;
      color: rgb(220, 70, 54);
      font-weight: 700;
      position: absolute;
      height: 2.32rem;
      width: 3.03rem;
      top: 1.65rem;
      line-height: 2.32rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      .gold_min {
        color: rgb(220, 70, 54);
        font-size: .46rem;
      }
    }
    ;
    .onmesg {
      font-size: 0.36rem;
      color: white;
      height: 1.15rem;
      width: 4.5rem;
      position: absolute;
      top: 5.3rem;
      left: 0;
      right: 0;
      margin: auto;
      line-height: 1.15rem;
    }
  }
  ;
  .btn {
    position: absolute;
    top: 7rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    button {
      width: 5.51rem;
      height: 1.05rem;
      line-height: .7rem;
      display: block;
      margin: 0 auto;
      text-align: center;
      border-radius: .7rem;
      background: rgb(236, 61, 43);
      font-size: .49rem;
      color: white;
      box-shadow: .05rem .05rem 0 rgb(180, 11, 13);
    }
  }
}

.dacheng {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .bagrbg {
    background: url(../../images/activities/asc_bcjl.png) no-repeat;
    background-size: 100%;
    position: relative;
    width: 6.42rem;
    height: 6.74rem;
    top: 50%;
    display: block;
    margin: -4.41rem auto;
    .close {
      // background: url(../../images/activities/asc_close.png) no-repeat;
      background-size: 100%;
      width: .52rem;
      height: .52rem;
      right: .44rem;
      top: .42rem;
      position: absolute;
      background-color: white;
      border-radius: 50%;
      line-height: .56rem;
    }
    ;
    .onbagtitle {
      height: 1.15rem;
      width: 3.51rem;
      line-height: 1.15rem;
      color: rgb(220, 70, 54);
      font-weight: 600;
      font-size: .49rem;
      position: absolute;
      top: .5rem;
      left: 0;
      right: 0;
      margin: auto;
    }
    ;
    .gold {
      font-size: 1.2rem;
      color: rgb(220, 70, 54);
      font-weight: 700;
      position: absolute;
      height: 2.32rem;
      width: 3.03rem;
      top: 1.65rem;
      line-height: 2.32rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      .gold_min {
        color: rgb(220, 70, 54);
        font-size: .46rem;
      }
    }
    ;
    .onmesg {
      font-size: 0.36rem;
      color: white;
      height: 1.15rem;
      width: 4.5rem;
      position: absolute;
      top: 5.3rem;
      left: 0;
      right: 0;
      margin: auto;
      line-height: 1.15rem;
    }
  }
  ;
  .btn {
    position: absolute;
    top: 7rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    button {
      width: 5.51rem;
      height: 1.05rem;
      line-height: .7rem;
      display: block;
      margin: 0 auto;
      text-align: center;
      border-radius: .7rem;
      background: rgb(236, 61, 43);
      font-size: .49rem;
      color: white;
      box-shadow: .05rem .05rem 0 rgb(180, 11, 13);
    }
  }
}

</style>
