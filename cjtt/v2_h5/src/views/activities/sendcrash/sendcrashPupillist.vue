<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="徒弟列表">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="sendcrashPupillist" v-show="!loading" >
      <div class="topbg">
        <div class="tip">
          活动期内任意一天累计进贡超过
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
                    <span class="table-cell coin gold">{{item.coin}}</span>
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
                <span class="pink" @click="togglebtns" v-show="activity_status!=2">立即去收徒 >></span>
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
                    <span class="table-cell coin gold">{{item.coin}}</span>
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
      <div class="v-modal" v-show="showshare" @touchmove.prevent></div>
      <div class="sharebtns" v-show="showshare" @touchmove.prevent>
        <ul class="clear">
          <li class="left pyq">
            <div class="icon" @click="sharepyq">
              <img src="../../../assets/images/pyq.png">
            </div>
            <span>朋友圈邀请</span>
          </li>
          <li class="left weixin">
            <div class="icon" @click="shareweixin">
              <img src="../../../assets/images/wx.png">
            </div>
            <span>微信邀请</span>
          </li>
          <li class="left qq">
            <div class="icon" @click="shareqq">
              <img src="../../../assets/images/qq.png">
            </div>
            <span>QQ邀请</span>
          </li>
        </ul>
        <span class="cancel" @click="togglebtns">取消</span>
      </div>
      <div class="waker" v-show="showwake" @touchmove.prevent>
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
          <i class="jiao"></i>
          <div class="sbagr">
            <i class="close iconfont" @click="closebagpop">&#xe685;</i>
            <div class="ico"></div>
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
    </div>
  </div>
</template>

<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import nvLoadmore from "@/components/loadmore.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";
import pagers from "@/assets/js/pagers";
export default {
  name: "sendcrashPupillist",
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
      waketxt:
        "想看最新资讯就到这个APP吧，娱乐八卦、图片搞笑、养生保健、美食健康等应有尽有，而且还能赚点零花钱，话费网费不用愁，感觉这就是适合咱们的APP",
      waketxtlist: [],
      wakeid: 0,
      activity_status: 0
    };
  },
  components: {
    nvHead,
    nvLoading,
    nvLoadmore
  },
  computed: {},
  created() {
    this.getconfig();
    this.getPupils();
    this.getWakes();
    this.getPagstatus();
  },
  mounted() {},
  methods: {
    alertEnd() {
      this.$alert("该活动已结束，您可继续参与其他收徒活动！").then(rs => {
        appcall.navigator({
          title: "邀请好友",
          url: this.$h5url +pagers[this.$currVer].invitepupil,
        });
      });
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
        this.activity_status = rs.data.activity_status
          ? rs.data.activity_status
          : 0;
      }
    },
    /**
     * 获取徒弟列表
     */
    async getPupils() {
      let params = {
        page: this.pupilpage,
        size: 20
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/invite_activity/get_activity_apprentice",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.loading = false;
        if (rs.data.length == 0) {
          this.$toast("没有更多了");
          this.allLoaded_pupil = true;
        } else {
          this.pupils = this.pupils.concat(rs.data);
        }
      } else if (rs.code === 1008) {
        this.loading = false;
        this.allLoaded_pupil = true;
      } else if (rs.code === 1007) {
        this.$toast("没有更多了");
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
      }, 1500);
    },
    /**
     * 获取唤醒徒弟列表
     */
    async getWakes() {
      let params = {
        page: this.wakepage,
        size: 20
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/invite_activity/get_activity_weak_up",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.loading = false;
        if (rs.data.length == 0) {
          this.$toast("没有更多了");
          this.allLoaded_wake = true;
        } else {
          rs.data.forEach(n => {
            n.waked = false;
          });
          this.wakes = this.wakes.concat(rs.data);
        }
      } else if (rs.code === 1008) {
        this.loading = false;
        this.allLoaded_wake = true;
      } else if (rs.code == 1007) {
        this.$toast("没有更多了");
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
      }, 1500);
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
          desc:
            "看新闻赚现金，幸运任务领不停，还能赚点零花钱哦！可以通过支付宝提现，全民阅读热潮已开始，快一起来",
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
    /**
     * 唤醒好友-微信
     */
    async wakewx() {
      let params = {
        appr_id: this.wakeid,
        share_where: 2
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/invite_activity/get_wake_up_url",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        let params = {
          type: 6,
          title: "",
          url: "",
          desc: "",
          images: ""
        };
        if (JKEventHandler.browser().ios) {
          params.title = this.waketxt;
          params.url = rs.data.url;
        } else {
          params.title = this.waketxt + " " + rs.data.url;
        }
        console.log(params);
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
        share_where: 3
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/invite_activity/get_wake_up_url",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        let params = {
          type: 7,
          title: "",
          url: "",
          desc: "",
          images: ""
        };
        if (JKEventHandler.browser().ios) {
          params.title = this.waketxt;
          params.url = rs.data.url;
        } else {
          params.title = this.waketxt + " " + rs.data.url;
        }
        console.log(params);
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
      return value.split(" ")[0];
    },
    hms(value) {
      value = value.replace(/-/g, "/");
      return value.split(" ")[1];
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../assets/css/mixin';
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
  background-color: #ff663d;
  padding-bottom: 1.5rem;

  .topbg {
    width: 100%;
    height: 4.75rem;
    background: url(../../../assets/images/activities/tudi_topbg.png) no-repeat center
      center;
    background-size: 100%;
    position: relative;
    .tip {
      position: absolute;
      width: 100%;
      top: 2.75rem;
      font-size: 0.28rem;
      color: #fff;
      .gold {
        color: #fff957;
      }
    }
  }

  .content {
    height: 8.9rem;
    margin-top: -0.9rem;
    background: #fde9c2;
    position: relative;
    border-radius: 0.7rem;
    .midd {
      width: 7rem;
      height: 8.5rem;
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0.2rem auto;
      border-radius: 0.7rem;
    }
    .tab {
      li {
        width: 50%;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.4rem;
        color: #fff;
        background: #ff5a2f;
        &.active {
          background: #ffa633;
        }
      }
      li:first-child {
        border-top-left-radius: 0.7rem;
      }
      li:last-child {
        border-top-right-radius: 0.7rem;
      }
    }
    .tbl {
      .th {
        li.table {
          height: 0.75rem;
          line-height: 0.75rem;
          background: #ffa633;
          .table-cell {
            display: table-cell;
            vertical-align: middle;
          }
          .nick {
            width: 1.85rem;
            font-size: 0.24rem;
            color: #fff;
          }
          .phone {
            width: 1.85rem;
            font-size: 0.24rem;
            color: #fff;
          }
          .coin {
            width: 1.85rem;
            font-size: 0.24rem;
            color: #fff;
          }
          .gold {
            color: #fd4b2f;
          }
          .time {
            width: 1.7rem;
            font-size: 0.24rem;
            color: #fff;
          }
          .wake {
            width: 1.7rem;
            font-size: 0.24rem;
            color: #fff;
          }
        }
      }
      .tb {
        height: 6.35rem;
        ul {
          min-height: 6.35rem;
          padding-bottom: 0.6rem;
        }
        li.table {
          text-align: center;
          color: #333;
          height: 0.8rem;
          display: table;
          border-bottom: 1px solid #fde9c2;
          .table-cell {
            display: table-cell;
            vertical-align: middle;
          }
          .nick {
            width: 1.8rem;
            font-size: 0.24rem;
          }
          .phone {
            width: 1.85rem;
            font-size: 0.24rem;
          }
          .coin {
            width: 1.85rem;
            font-size: 0.24rem;
          }
          .gold {
            color: #fd4b2f;
          }
          .time {
            width: 1.7rem;
            font-size: 0.24rem;
          }
          .wake {
            width: 1.7rem;
            font-size: 0.24rem;
            color: #fff;
            button {
              width: 1.25rem;
              height: 0.5rem;
              display: block;
              margin: 0 auto;
              border-radius: 0.25rem;
              border: 1px solid #ffa633;
              color: #ffa633;
              background: #fff;
              &.act {
                color: #fff;
                background: #ffa633;
              }
            }
          }
        }
      }
      .notudi {
        font-size: 0.34rem;
        color: #666;
        height: 100%;
        padding: 2.5rem 0.5rem;
      }
      .dred {
        color: #923502;
      }
      .pink {
        color: #ff5a2f;
        font-size: 0.28rem;
      }
    }
  }

  .bottom {
    height: 1.5rem;
    background: #ff572a;
    width: 100%;
    position: fixed;
    bottom: 0;
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
            background: url(../../../assets/images/activities/tudi_fudai_ico.png)
              no-repeat center center;
            background-size: 100%;
          }
          span {
            color: #fff;
          }
          &.gray {
            line-height: 1;
            border: 1px solid #ddd;
            i {
              background: url(../../../assets/images/activities/tudi_fudai_ico_gray.png)
                no-repeat center center;
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
    .endBtn {
      margin: 0.25rem auto;
      width: 6.37rem;
      height: 1rem;
      border-radius: 1rem;
      font-size: 0.36rem;
      background: #e1e1e1;
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
    .cancel {
      height: 1rem;
      line-height: 1rem;
      display: block;
      background: #fafafa;
      font-size: 0.36rem;
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
      border-radius: 0.2rem;
    }
    .swaker {
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
      .tt {
        font-size: 0.44rem;
        font-weight: bold;
        text-align: center;
      }
      .subtt {
        font-size: 0.3rem;
        color: #777;
        text-align: center;
        margin: 0.25rem auto;
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
          border-radius: 0.1rem;
          padding: 0.15rem;
          font-size: 0.265rem;

          -webkit-touch-callout: auto;
          -webkit-user-select: auto;
          -khtml-user-select: auto;
          -moz-user-select: auto;
          -ms-user-select: auto;
          user-select: auto;
        }
      }
      .subtt2 {
        font-size: 0.28rem;
        color: #666;
        text-align: center;
        margin: 0.2rem auto 0;
      }
      ul.btns {
        margin-top: 0.25rem;
        li {
          width: 50%;
          text-align: center;
          button {
            width: 2.3rem;
            height: 0.9rem;
            margin: 0 auto;
            font-size: 0.3rem;
            border-radius: 0.45rem;
            position: relative;
            background: linear-gradient(to top, #ff6237, #ff7e56);
            &.weixin i {
              width: 0.55rem;
              height: 0.55rem;
              display: block;
              position: absolute;
              top: 0.15rem;
              left: 0.2rem;
              font-size: 0.55rem;
              color: #fff;
            }
            &.weixin span {
              color: #fff;
              margin-left: 0.65rem;
            }
            &.qq i {
              width: 0.55rem;
              height: 0.55rem;
              display: block;
              position: absolute;
              top: 0.15rem;
              left: 0.35rem;
              font-size: 0.55rem;
              color: #fff;
            }
            &.qq span {
              color: #fff;
              margin-left: 0.65rem;
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
        background: url(../../../assets/images/activities/tudi_bag_share_jiao.png)
          no-repeat center center;
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
        background: url(../../../assets/images/activities/tudi_bag_share_ico.png)
          no-repeat center center;
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

  .bagget {
    width: 100vw;
    height: 100vh;
    position: fixed;
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
        background: url(../../../assets/images/activities/tudi_bag_get_ico.png) no-repeat
          center center;
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
        background: url(../../../assets/images/activities/tudi_bag_get_ico.png) no-repeat
          center center;
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
}

::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>
