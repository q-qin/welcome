<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="sendcrashPupillist" v-show="!loading">
      <div class="topbg">
        <div class="tip">
          活动期内累计进贡超过
          <span class="gold">200金币</span>
          <br> 即为有效徒弟
        </div>
      </div>
      <div class="content">
        <div class="midd">
          <ul class="tab clear">
            <li class="left " :class="{active:tabindex==1}" @click=toggletab(1)>徒弟列表</li>
            <li class="left " :class="{active:tabindex==2}" @click=toggletab(2)>唤醒徒弟</li>
          </ul>
          <div class="tbl" v-show="tabindex==1">
            <ul class="th ">
              <li class="table">
                <span class="table-cell nick">昵称</span>
                <span class="table-cell phone">手机号码</span>
                <span class="table-cell coin">进贡金币</span>
                <span class="table-cell time">邀请时间</span>
              </li>
            </ul>
            <div class="tb" style="overflow: scroll;" v-show="pupils.length > 0">
              <nv-loadmore :bottom-method="loadBottomPupil" :bottom-all-loaded="allLoaded_pupil" ref="loadmore_pupil">
                <ul>
                  <li class="table " v-for="(item,$index) in pupils" :key="$index">
                    <span class="table-cell nick ">{{item.nickname}}</span>
                    <span class="table-cell phone">{{item.username}}</span>
                    <span class="table-cell coin">{{item.coin}}</span>
                    <span class="table-cell time">{{item.created | ymd}}
                      <br>{{item.created | hms}}</span>
                  </li>
                </ul>
              </nv-loadmore>
            </div>
            <div class="table notudi" v-show="pupils.length == 0">
              <div class="table-cell dred">本次活动中您还没有新徒弟哦~
                <br>时间有限赶紧行动起来吧
                <br/>
                <br/>
                <span class="pink" @click="togglebtns">立即去收徒 >></span>
              </div>
            </div>
          </div>
          <div class="tbl" v-show="tabindex==2">
            <ul class="th ">
              <li class="table">
                <span class="table-cell nick">昵称</span>
                <span class="table-cell phone">手机号码</span>
                <span class="table-cell coin">进贡金币</span>
                <span class="table-cell wake">唤醒</span>
              </li>
            </ul>
            <div class="tb" style="overflow: scroll;" v-show="wakes.length > 0">
              <nv-loadmore :bottom-method="loadBottomWake" :bottom-all-loaded="allLoaded_wake" ref="loadmore_wake">
                <ul>
                  <li class="table " v-for="(item,$index) in wakes" :key="$index">
                    <span class="table-cell nick ">{{item.nickname}}</span>
                    <span class="table-cell phone">{{item.username}}</span>
                    <span class="table-cell coin">{{item.coin}}</span>
                    <span class="table-cell wake">
                      <button :class="{act:!item.waked}" @click="dowake(item)">{{item.waked?'查看':'唤醒'}}</button>
                    </span>
                  </li>
                </ul>
              </nv-loadmore>
            </div>
            <div class="table notudi" v-show="wakes.length == 0">
              <div class="table-cell dred">恭喜您~
                <br>您的徒弟都很活跃，不需要唤醒哦~</div>
            </div>
          </div>
        </div>
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
      <div class="v-modal" v-show="showshare"></div>
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
      <div class="waker" v-show="showwake">
        <div class="wakerbg">
          <div class="swaker">
            <i class="close iconfont" @click="togglewake">&#xe685;</i>
            <div class="tt">唤醒徒弟</div>
            <div class="subtt">
              马上发消息唤醒Ta
            </div>
            <div class="txt">
              <textarea v-model="waketxt" maxlength="200">
              </textarea>
            </div>
            <div class="subtt2">
              点击下面的按钮分享给
            </div>
            <ul class="btns clear">
              <li class="left">
                <button class="weixin left" @click="wakewx">
                  <i class="iconfont">&#xe624;</i>
                  <span>微信好友</span>
                </button>
              </li>
              <li class="left">
                <button class="qq right" @click="wakeqq">
                  <i class="iconfont">&#xe61b;</i>
                  <span>QQ好友</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bagshare" v-show="showbagshare" @touchmove.prevent>
        <div class="bagrbg">
          <i class="close iconfont" @click="closebagpop">&#xe685;</i>
          <div class="sbagr">
            <i class="jiao"></i>
            <div class="ico"></div>
            <div class="gold">您的福袋来啦</div>
            <div class="tip">成功分享给好友即可领取
              <br>100%中奖~</div>
            <div class="btn">
              <button @click="goshare">立即分享开福袋</button>
            </div>
          </div>
        </div>
      </div>
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
      <div class="bagopend" v-show="showbagopend" @touchmove.prevent>
        <div class="bagrbg">
          <i class="close iconfont" @click="closebagpop">&#xe685;</i>
          <div class="sbagr">
            <div class="ico"></div>
            <div class="gold">明天再来哦~</div>
            <div class="tip">奖励已发放到您的个人账户中
              <br>请到 "我的收入" 中查看</div>
            <div class="btn">
              <button @click="goshare">立即分享赚现金</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import nvLoadmore from '@/components/loadmore.vue';
import ajax from '@/config/ajax';
import appcall from '@/config/appcall';

export default {
  name: 'sendcrashPupillist',
  data() {
    return {
      loading: true,
      tabindex: 1,
      pupilpage: 0,
      wakepage: 0,
      pupils: [], // 徒弟列表
      wakes: [], // 唤醒列表
      allLoaded_pupil: false, // 徒弟列表到底
      allLoaded_wake: false, // 唤醒列表到底
      showshare: false, // 分享弹框
      showwake: false, // 唤醒弹框
      showbagshare: false, // 开福袋分享弹框
      showbagget: false, // 开福袋得金币弹框
      baggetcoin: 0,
      showbagopend: false, // 开福袋已开启弹框
      bagopend: false, // 福袋开启状态
      waketxt: '想看最新资讯就到这个APP吧，娱乐八卦、图片搞笑、养生保健、美食健康等应有尽有，而且还能赚点零花钱，话费网费不用愁，感觉这就是适合咱们的APP',
      waketxtlist: [],
      wakeid: 0,
    }
  },
  components: {
    nvHead,
    nvLoading,
    nvLoadmore
  },
  computed: {},
  created() {
    this.getPupils();
    this.getWakes();
    this.getPagstatus();
  },
  mounted() {},
  methods: {
    /**
     * 获取徒弟列表
     */
    async getPupils() {
      let params = {
        page: this.pupilpage,
        size: 20,
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/invite_activity/get_activity_apprentice', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        this.loading = false;
        if (rs.data.length == 0) {
          this.$toast('没有更多了');
          this.allLoaded_pupil = true;
        } else {
          this.pupils = this.pupils.concat(rs.data);
        }
      } else if (rs.code === 1008) {
        this.loading = false;
        this.allLoaded_pupil = true;
      } else if (rs.code === 1007) {
        this.$toast('没有更多了');
        this.loading = false;
        this.allLoaded_pupil = true;
      } else {
        this.allLoaded_pupil = true;
        this.$alert(rs.msg);
      }
    },
    /**
     * 徒弟列表分页
     */
    loadBottomPupil() {
      if (this.allLoaded_pupil) return;
      setTimeout(() => {
        this.pupilpage++;
        this.getPupils();
        this.$refs.loadmore_pupil.onBottomLoaded();
      }, 1500)
    },
    /**
     * 获取唤醒徒弟列表
     */
    async getWakes() {
      let params = {
        page: this.wakepage,
        size: 20,
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/invite_activity/get_activity_weak_up', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        this.loading = false;
        if (rs.data.length == 0) {
          this.$toast('没有更多了');
          this.allLoaded_wake = true;
        } else {
          rs.data.forEach(n => {
            n.waked = false;
          })
          this.wakes = this.wakes.concat(rs.data);
        }
      } else if (rs.code === 1008) {
        this.loading = false;
        this.allLoaded_wake = true;
      } else if (rs.code == 1007) {
        this.$toast('没有更多了');
        this.loading = false;
        this.allLoaded_wake = true;
      } else {
        this.allLoaded_wake = true;
        this.$alert(rs.msg);
      }
    },
    /**
     * 徒弟唤醒列表分页
     */
    loadBottomWake() {
      if (this.allLoaded_wake) return;
      setTimeout(() => {
        this.wakepage++;
        this.getWakes();
        this.$refs.loadmore_wake.onBottomLoaded();
      }, 1500)
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
        share_where: 3,
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
     * 唤醒好友-微信
     */
    async wakewx() {
      let params = {
        appr_id: this.wakeid,
        share_where: 2,
      }
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/invite_activity/get_wake_up_url', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        let params = {
          type: 6,
          title: '',
          url: '',
          desc: '',
          images: '',
        }
        if (JKEventHandler.browser().ios) {
          params.title = this.waketxt;
          params.url = rs.data.url;
        } else {
          params.title = this.waketxt + ' ' + rs.data.url;
        }
        console.log(params)
        appcall.invite(params);
        this.showwake = false;
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 唤醒好友-QQ
     */
    async wakeqq() {
      let params = {
        appr_id: this.wakeid,
        share_where: 3,
      }
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/invite_activity/get_wake_up_url', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        let params = {
          type: 7,
          title: '',
          url: '',
          desc: '',
          images: '',
        }
        if (JKEventHandler.browser().ios) {
          params.title = this.waketxt;
          params.url = rs.data.url;
        } else {
          params.title = this.waketxt + ' ' + rs.data.url;
        }
        console.log(params)
        appcall.invite(param);
        this.showwake = false;
      } else {
        this.$alert(rs.msg);
      }
    },
    goshare() {
      this.showbagshare = false;
      this.showbagget = false;
      this.showbagopend = false;
      this.showshare = true;
    },
    dowake(item) {
      item.waked = true;
      this.showwake = true;
      this.wakeid = item.invited;
    },
    toggletab(index) {
      this.tabindex = index;
    },
    togglebtns() {
      this.showshare = !this.showshare;
    },
    togglewake() {
      this.showwake = !this.showwake;
    },
    closebagpop() {
      this.showbagshare = false;
      this.showbagget = false;
      this.showbagopend = false;
    }
  },
  filters: {
    ymd(value) {
      value = value.replace(/-/g, "/");
      return value.split(' ')[0];
    },
    hms(value) {
      value = value.replace(/-/g, "/");
      return value.split(' ')[1];
    }
  }
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
  opacity: 0.5;
  background: #000;
}

.sendcrashPupillist {
  text-align: center;
  padding-bottom: 2.74rem;
}

.sendcrashPupillist:after {
  content: '';
  width: 100%;
  height: 5.04rem;
  display: block;
  position: fixed;
  background: url('../../images/activities/asc_bot_ty2.png') no-repeat center center;
  background-size: 100%;
  z-index: -1;
  margin-top: -2rem;
  bottom: 0;
}

.topbg {
  width: 100%;
  height: 4.75rem;
  background: url(../../images/activities/tudi_topbg.png) no-repeat center center;
  background-size: 100%;
  position: relative;
  .tip {
    position: absolute;
    width: 100%;
    top: 2.95rem;
    font-size: .28rem;
    color: #fff;
    .gold {
      color: #fff957;
    }
  }
}

.content {
  height: 8.94rem;
  margin-top: -.9rem;
  background: #fde9c2;
  position: relative;
  border-radius: .7rem; // margin-bottom: 2.74rem;
  .midd {
    width: 7rem;
    height: 8.5rem;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: .2rem auto;
    border-radius: .7rem;
  }
  .tab {
    li {
      width: 50%;
      height: .9rem;
      line-height: .9rem;
      font-size: .4rem;
      color: #fff;
      background: #fd4b2f;
      &.active {
        background: #fd701f;
      }
    }
    li:first-child {
      border-top-left-radius: .7rem;
    }
    li:last-child {
      border-top-right-radius: .7rem;
    }
  }
  .tbl {
    .th {
      background: #fd701f;
      li.table {
        height: .75rem;
        line-height: .75rem;
        .table-cell {
          display: table-cell;
          vertical-align: middle;
        }
        .nick {
          width: 1.8rem;
          font-size: .24rem;
          color: #fff;
        }
        .phone {
          width: 1.85rem;
          font-size: .24rem;
          color: #fff;
        }
        .coin {
          width: 1.85rem;
          font-size: .24rem;
          color: #fff;
        }
        .time {
          width: 1.7rem;
          font-size: .24rem;
          color: #fff;
        }
        .wake {
          width: 1.7rem;
          font-size: .24rem;
          color: #fff;
        }
      }
    }
    .tb {
      height: 6.35rem;
      ul {
        min-height: 6.35rem;
      }
      li.table {
        text-align: center;
        color: #333;
        height: .8rem;
        display: table;
        border-bottom: 1px solid #fde9c2;
        .table-cell {
          display: table-cell;
          vertical-align: middle;
        }
        .nick {
          width: 1.7rem;
          font-size: .26rem;
        }
        .phone {
          width: 1.85rem;
          font-size: .26rem;
        }
        .coin {
          width: 1.85rem;
          font-size: .26rem;
          color: #fd4b2f;
        }
        .time {
          width: 1.7rem;
          font-size: .26rem;
        }
        .wake {
          width: 1.7rem;
          font-size: .24rem;
          color: #fff;
          button {
            width: 1.25rem;
            height: .5rem;
            display: block;
            margin: 0 auto;
            border-radius: .25rem;
            border: 1px solid #fd701f;
            color: #fd701f;
            background: #fff;
            &.act {
              color: #fff;
              background: #fd701f;
            }
          }
        }
      }
    }
    .notudi {
      font-size: .34rem;
      color: #666;
      height: 100%;
      padding: 2.5rem .5rem;
    }
    .dred {
      color: #923502;
    }
    .pink {
      color: #ff5a2f;
      font-size: .28rem;
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

.sharebtns {
  position: fixed;
  width: 100%;
  height: 3.5rem;
  bottom: 0;
  background: #fff;
  z-index: 1;
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

.waker {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .wakerbg {
    position: relative;
    background-color: #fef0d5;
    display: block;
    width: 5.85rem;
    height: 6.5rem;
    top: 50%;
    left: 0;
    right: 0;
    margin: -3.25rem auto;
    border-radius: .2rem;
  }
  .swaker {
    border: 1px solid #e97e5a;
    border-radius: .2rem;
    padding: .75rem .35rem 0;
    margin: .1rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 5.65rem;
    height: 6.3rem;
    .close {
      font-size: .4rem;
      position: absolute;
      right: .25rem;
      top: .25rem;
      color: #999;
    }
    .tt {
      font-size: .44rem;
      font-weight: bold;
      text-align: center;
    }
    .subtt {
      font-size: .3rem;
      color: #777;
      text-align: center;
      margin: .25rem auto;
    }
    .txt {
      width: 5rem;
      height: 2rem;
      margin: 0 auto;
      textarea {
        width: 100%;
        height: 100%;
        text-align: left;
        border: 1px solid #aeaeae;
        border-radius: .1rem;
        padding: .15rem;
        font-size: .265rem;
      }
    }
    .subtt2 {
      font-size: .28rem;
      color: #666;
      text-align: center;
      margin: .2rem auto 0;
    }
    ul.btns {
      margin-top: .25rem;
      li {
        width: 50%;
        text-align: center;
        button {
          width: 2.3rem;
          height: .9rem;
          margin: 0 auto;
          font-size: .3rem;
          border-radius: .45rem;
          position: relative;
          background: linear-gradient(to top, #ff6237, #ff7e56);
          &.weixin i {
            width: .55rem;
            height: .55rem;
            display: block;
            position: absolute;
            top: .15rem;
            left: .2rem;
            font-size: .55rem;
            color: #fff;
          }
          &.weixin span {
            color: #fff;
            margin-left: .65rem;
          }
          &.qq i {
            width: .55rem;
            height: .55rem;
            display: block;
            position: absolute;
            top: .15rem;
            left: .35rem;
            font-size: .55rem;
            color: #fff;
          }
          &.qq span {
            color: #fff;
            margin-left: .65rem;
          }
        }
      }
    }
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
        box-shadow: 0.05rem .05rem 0 #e0a75e;
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
        box-shadow: 0.05rem .05rem 0 #e0a75e;
        &:active {
          transform: scale(.95);
        }
      }
    }
  }
}

</style>
