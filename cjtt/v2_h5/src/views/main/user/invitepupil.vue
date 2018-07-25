<template>
  <div class="vInvite">
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <div>
      <nv-loading :loading="loading"></nv-loading>
      <div class="invitepupil" v-show="!loading">
        <div class="ad" @click="adJump">
          <img :src="banner.image_url">
        </div>
        <div class="top" v-show="!iospedding">
          <ul class="clear">
            <li class="left" :class="{active:tab==1}" @click="toggletab(1)">邀请收徒</li>
            <li class="left" :class="{active:tab==2}" @click="toggletab(2)">我的徒弟
              <i v-show="tribute > 0">{{tribute}}名</i>
            </li>
          </ul>
        </div>
        <template v-if="tab==1">
          <div class="share">
            <div class="tp" v-show="!iospedding">
              <div class="middle">
                通过以下方式
                <br> 邀请收徒让您得更多
              </div>
            </div>
            <div class="md clearfix">
              <div class="share_item left pyq">
                <div class="img" @click="pyqshare">
                  <img src="../../../assets/images/pyq.png">
                </div>
                <div>发朋友圈</div>
              </div>
              <div class="share_item left weixin">
                <div class="img" @click="wxshare">
                  <img src="../../../assets/images/wx.png">
                </div>
                <div>发微信</div>
              </div>
              <div class="share_item left qq">
                <div class="img" @click="qqshare">
                  <img src="../../../assets/images/qq.png">
                </div>
                <div>QQ邀请</div>
              </div>
              <div class="share_item left mdm">
                <div class="img" @click="mdmshare">
                  <img src="../../../assets/images/mdm.png">
                </div>
                <div>面对面邀请</div>
              </div>
            </div>
            <div class="inviteCode" v-show="!iospedding">
              <router-link :to="'/invitecodeDetail'">
                <button>您的邀请码 {{invitecode}}</button>
              </router-link>
            </div>
          </div>
          <ul class="tasks clear" v-show="!iospedding">
            <li class="left" @click="goshai">
              <i class="iconfont">&#xe612;</i>
              <span>晒收入</span>
            </li>
            <li class="left" @click="gotask">
              <i class="iconfont">&#xe600;</i>
              <span>唤醒徒弟</span>
            </li>
          </ul>
          <div class="desc" v-show="!iospedding">
            <div class="tp ">
              <div class="imgs">
                <img class="ico " src="../../../assets/images/td_icon.png" />
                <img class="haochu " src="../../../assets/images/td_haochu.png" />
              </div>
            </div>
            <div class="txt1">
              徒弟有效阅读将向您
              <span class="red">进贡金币</span>，让您的
              <span class="red">金币暴涨</span>，收徒越多您的收入就越高，收徒无上限
            </div>
            <div class="txt2 clear">
              <div class="left content">
                活动期间，每收一个有效徒弟额外奖励
                <span class="red">【5元】</span>
                <br> 活动时间：2018年3月1日至2018年6月18日
              </div>
              <div class="left btn">
                <button class="btnrole" @click="togglerole">查看规则</button>
              </div>
            </div>
          </div>
          <div class="lanternFestival" v-show="showrole" @touchmove.prevent>
            <div class="rolebg ">
              <i class="close iconfont" @click="togglerole">&#xe685;</i>
              <div class="tt"></div>
              <div class="txt1">
                <span>收徒奖励升级！升级！再升级！</span>
                <span>每收1位徒弟奖励价值
                  <label class="red bolder">【5元】</label>金币。</span>
              </div>
              <div class="table award">
                <span class="table-row">
                  <span class="table-cell gray"></span>
                  <span class="table-cell yellow th">5月2日~22日</span>
                  <span class="table-cell pink th">5月22日之后</span>
                </span>
                <span class="table-row">
                  <span class="table-cell gray">第一次奖励</span>
                  <span class="table-cell yellow">【15000金币】</span>
                  <span class="table-cell pink ">【2220金币】</span>
                </span>
                <span class="table-row">
                  <span class="table-cell gray">第二次奖励</span>
                  <span class="table-cell yellow">【2220金币】</span>
                  <span class="table-cell pink red">【8000金币】</span>
                </span>
                <span class="table-row">
                  <span class="table-cell gray">第三次奖励</span>
                  <span class="table-cell yellow">【2220金币】</span>
                  <span class="table-cell pink">【2220金币】</span>
                </span>
                <span class="table-row">
                  <span class="table-cell gray">第四次奖励</span>
                  <span class="table-cell yellow">【8000金币】</span>
                  <span class="table-cell pink red">【15000金币】</span>
                </span>
                <span class="table-row">
                  <span class="table-cell gray">第五次奖励 </span>
                  <span class="table-cell yellow">【2220金币】</span>
                  <span class="table-cell pink">【2220金币】</span>
                </span>
                <span class="table-row">
                  <span class="table-cell gray">第六次奖励 </span>
                  <span class="table-cell yellow">【12000金币】</span>
                  <span class="table-cell pink red">【12000金币】</span>
                </span>
              </div>
              <div class="txt3">
                <span>
                  发放条件：
                  <label>每日徒弟阅读获得300金币，即可满足师傅获得一次奖励条件，奖励分6天发放。</label>
                </span>
                <span>
                  活动时间：
                  <label>3月1号-6月18号</label>
                </span>
              </div>
            </div>
          </div>
        </template>
        <template v-if="tab==2" class="tudi">
          <div class="tip">
            每唤醒1位徒弟，您得
            <span class="red">5000金币</span>，徒弟获
            <span class="red">1500金币</span>
          </div>
          <div class="mid">
            <ul class="tab clear">
              <li class="left " :class="{active:tab_wake==1}" @click="togglewake(1)">徒弟进贡榜</li>
              <li class="left " :class="{active:tab_wake==2}" @click="togglewake(2)">待唤醒徒弟 ({{wakecnt}})</li>
            </ul>
            <div class="tabbd" v-show="tab_wake==1">
              <ul class="jingong_th">
                <li class="table th">
                  <span class="table-cell position">前50</span>
                  <span class="table-cell nick">昵称</span>
                  <span class="table-cell id">用户ID</span>
                  <span class="table-cell coin">贡献金币</span>
                </li>
              </ul>
              <div class="jingong_tb" style="overflow: scroll;">
                <ul>
                  <li class="table " v-for="(item,$index) in jingongs" :key="$index">
                    <span class="table-cell position " :class="{one:$index==0,two:$index==1,three:$index==2}" v-text="$index >2?$index+1:''"></span>
                    <span class="table-cell nick">{{item.nickname?item.nickname:item.username}}</span>
                    <span class="table-cell id">{{item.invited}}</span>
                    <span class="table-cell coin">{{item.coin?item.coin:0}}</span>
                  </li>
                </ul>
                <div class="table notudi" v-show="jingongs.length ==0">
                  <div class="table-cell">你还没有徒弟，赶快去收徒吧，每收一个徒弟可获得价值5元金币奖励。
                    <br/>
                    <br/>
                    <span class="pink" @click="shoutu">立即去收徒 >></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="tabbd" v-show="tab_wake==2">
              <ul class="jiaoxing_th">
                <li class="table th">
                  <span class="table-cell nick">昵称</span>
                  <span class="table-cell phone">手机号</span>
                  <span class="table-cell blank">操作</span>
                </li>
              </ul>
              <div class="jiaoxing_tb" style="overflow: scroll;">
                <nv-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                  <ul v-show="wakes.length > 0">
                    <li class="table " v-for="(item,$index) in wakes" :key="$index">
                      <span class="table-cell nick">{{item.nickname}}</span>
                      <span class="table-cell phone ">{{item.username}}</span>
                      <span class="table-cell ">
                        <button :class="{wake:item.wake}" @click="huanx(item)" v-text="item.wake?'查看':'唤醒'" v-if="lowVersion"></button>
                        <button @click="sms(item)" v-else>发信息</button>
                      </span>
                    </li>
                  </ul>
                </nv-loadmore>
                <div class="table notudi" v-show="wakes.length ==0">
                  <div class="table-cell">暂时没有需要唤醒的徒弟，赶快去收徒，每收一个徒弟可获得价值5元金币奖励。
                    <br/>
                    <br/>
                    <span class="pink" @click="shoutu">立即去收徒 >></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="shuom_tip" @click="toggleshuom">
            </div>
            <div class="shuom" v-show="showshuom" @touchmove.prevent>
              <div class="shuombg modal">
                <i class="close iconfont" @click="toggleshuom">&#xe685;</i>
                <div class="tt">
                  成功唤醒后师傅得
                  <span class="red">5000</span>金币，徒弟得
                  <span class="red">1500</span>金币，唤醒徒弟越多，奖励越多
                </div>
                <div class="txt">
                  什么是成功唤醒？
                  <br> · 师傅需要点击“发短信”按钮，通过短信发送链接给徒弟；
                  <br> · 徒弟需要点击师傅的链接并登陆超级头条；
                  <br> · 徒弟需阅读资讯获得150金币；
                  <br> · 师傅点击“发短信”后，分享的链接3天内有效；
                  <br> · 若徒弟还未回来，3天后需要重新唤醒哦！
                </div>
                <div class="btn">
                  <button @click="toggleshuom">立即参与</button>
                </div>
              </div>
            </div>
            <div class="huanx" v-show="showhuanx">
              <div class="huanxbg">
                <i class="close iconfont" @click="closehuanx">&#xe685;</i>
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
                    <button @click="wxwake">
                      <i class="weixin"></i> 微信好友
                    </button>
                  </li>
                  <li class="left">
                    <button @click="qqwake">
                      <i class="qq"></i> QQ好友
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
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
    name: "invitepupil",
    data() {
      return {
        loading: true,
        tab: 1,
        tab_wake: 1,
        friends: [],
        jingongs: [],
        lowVersion: false,
        tribute: 0,
        wakes: [],
        wakecnt: 0,
        showrole: false,
        showshuom: false,
        showhuanx: false,
        waketxt: "嗨~你好久没来[超级头条]啦！你不在的日子我都赚了好几十块钱了，快来吧，我和红包奖励都在等你呢。",
        waketxtlist: [],
        sharetxt: "",
        sharetxtlist: [],
        wakeid: 0,
        wakepage: 0,
        allLoaded: false,
        banner: {},
        invitecode: "",
        iospedding: false
      };
    },
    components: {
      nvHead,
      nvLoading,
      nvLoadmore
    },
    async created() {
      this.$Progress.start();
      // ios 提审状态
      let appdata = await appcall.getAppData();
      if (
        (appdata.platform_code == "ios_h5" && appdata.version_code < 7) ||
        (appdata.platform_code == "android_h5" && appdata.version_code < 9)
      ) {
        this.lowVersion = true;
      }
      this.iospedding = await appcall.getReviewStatus();
    },
    mounted() {
      if (this.$route.query.pupil) {
        this.tab = 2;
      }
      if (this.$route.query.wake) {
        this.tab = 2;
        this.tab_wake = 2;
      }
      this.getInvitecode();
      this.getApprenticeCount();
      this.getBanner();
      this.markUnreadmsg();
    },
    methods: {
      /**
       * 获取邀请码
       */
      async getInvitecode() {
        let rs = await appcall.getUserInfo();
        this.invitecode = rs.invitecode;
      },
      /**
       * 获取徒弟数量
       */
      async getApprenticeCount() {
        let params = {};
        let comm = await appcall.getRequestData(params);
        
        let rs = await ajax(
          "post",
          this.$apiurl + "/apprentice/get_apprentice_num",
          comm,
          params
        );
        this.$Progress.finish();
        if (rs && rs.code === 1001 && rs.data) {
          this.loading = false;
          this.tribute = rs.data.num;
        } else if ((rs && rs.code === 1007) || rs.code === 1008) {
          this.loading = false;
          this.tribute = 0;
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
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * qq好友邀请
       */
      async qqshare() {
        let params = {
          share_where: 3
        };
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/task/share_invitation_img",
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
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 面对面邀请
       */
      mdmshare() {
        this.$router.push("invitepupilNearby");
      },
      adJump() {
        switch (this.banner.kind) {
          case 1:
          case 2:
            appcall.navigator({
              title: this.banner.activity_name,
              url: this.banner.jump_url
            });
            break;
          case 3:
            appcall.articles({
              sc_catid: this.banner.sc_catid
            });
            break;
          case 4:
            appcall.videos({
              sc_catid: this.banner.sc_catid
            });
            break;
        }
      },
      /*
       * 标记未读消息
       */
      async markUnreadmsg() {
        let params = {
          msg_module: "un_yqhy_num"
        };
        let comm = await appcall.getRequestData(params);

        let rs = ajax(
          "post",
          this.$apiurl + "/sms/mark_unread_msg",
          comm,
          params
        );
      },
      /**
       * 去晒分享
       */
      goshai() {
        appcall.navigator({
          title: "晒晒收入",
          url: this.$h5url + pagers[this.$currVer].shareIncome,
        });
      },
      /**
       * 去任务中心
       */
      gotask() {
        this.tab = 2;
        this.tab_wake = 2;
      },
      /*
       * 去88888活动
       */
      toactivity() {
        appcall.navigator({
          title: "新年小目标",
          url: this.$h5url + pagers[this.$currVer].sendcrash,
        });
      },
      /**
       * 展示/隐藏规则
       */
      togglerole() {
        this.showrole = !this.showrole;
      },
      /**
       * 切换大tab
       */
      toggletab(index) {
        this.tab = index;
      },
      /**
       * “去收徒”
       */
      shoutu() {
        this.tab = 1;
      },
      /**
       * 切换小tab
       */
      togglewake(index) {
        this.tab_wake = index;
      },
      /**
       * 显示/隐藏 说明
       */
      toggleshuom() {
        this.showshuom = !this.showshuom;
      },
      /**
       * 唤醒 操作
       */
      huanx(item) {
        item.wake = true;
        this.showhuanx = true;
        this.wakeid = item.invited;
      },
      /**
       * 发信息唤醒
       */
      async sms(item) {
        let params = {
          appr_id: item.invited,
          share_where: 5
        };
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/tasks/get_wake_up_content",
          comm,
          params
        );
        if (rs && rs.code === 1001 && rs.data) {
          let params = {
            phone: item.phone,
            sms: this.waketxt + " " + rs.data
          };
          appcall.sms(params);
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 关闭唤醒
       */
      closehuanx() {
        this.showhuanx = false;
      },
      /**
       * 拉到底
       */
      loadBottom() {
        if (this.allLoaded) return;
        setTimeout(() => {
          this.wakepage++;
          this.getHuanxings();
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },
      /**
       * 获取顶部banner
       */
      async getBanner() {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/activity/get_activity_yqhy",
          comm,
          params
        );
        if (rs && rs.code === 1001 && rs.data) {
          this.banner =
            rs.data.list && rs.data.list.length > 0 ? rs.data.list[0] : [];
        }
      },
      /**
       * 获取进贡徒弟列表
       */
      async getJinggongs() {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/tasks/get_apprentice_contr",
          comm,
          params
        );
        if (rs && rs.code === 1001 && rs.data) {
          this.jingongs = rs.data.list;
          //this.tribute = rs.data.total;
        } else if (rs && rs.code === 1008) {
          this.jingongs = [];
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 获取待唤醒徒弟列表
       */
      async getHuanxings() {
        let params = {
          page: this.wakepage,
          size: 10
        };
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/tasks/wake_up_apprentice",
          comm,
          params
        );
        if (rs && rs.code === 1001 && rs.data) {
          this.wakecnt = rs.data.total;
          if (rs.data.list.length == 0) {
            this.allLoaded = true;
            if (this.wakepage > 0) {
              this.$toast("没有更多了");
            }
          } else {
            this.wakes = this.wakes.concat(rs.data.list);
          }
        } else {
          this.allLoaded = true;
          this.$alert(rs.msg);
        }
      },
      /**
       * 微信唤醒
       */
      async wxwake() {
        let params = {
          appr_id: this.wakeid,
          share_where: 2
        };
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/tasks/get_wake_up_content",
          comm,
          params
        );
        if (rs && rs.code === 1001 && rs.data) {
          let param = {
            type: 6,
            title: "",
            url: "",
            desc: "",
            images: ""
          };
          if (JKEventHandler.browser().ios) {
            param.title = this.waketxt;
            param.url = rs.data;
          } else {
            param.title = this.waketxt + " " + rs.data;
          }
          appcall.invite(param);
          this.showhuanx = false;
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * QQ唤醒
       */
      async qqwake(item) {
        let params = {
          appr_id: this.wakeid,
          share_where: 3
        };
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "post",
          this.$apiurl + "/tasks/get_wake_up_content",
          comm,
          params
        );
        if (rs && rs.code === 1001 && rs.data) {
          let param = {
            type: 7,
            title: "",
            url: "",
            desc: "",
            images: ""
          };
          if (JKEventHandler.browser().ios) {
            param.title = this.waketxt;
            param.url = rs.data;
          } else {
            param.title = this.waketxt + " " + rs.data;
          }
          appcall.invite(param);
          this.showhuanx = false;
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * waketxt随机
       */
      randomWaketxt() {
        this.waketxt = this.waketxtlist[
          Math.floor(Math.random() * (this.waketxtlist.length - 1))
        ];
      },
      /**
       * sharetxt随机
       */
      randomSharetxt() {
        this.sharetxt = this.sharetxtlist[
          Math.floor(Math.random() * (this.sharetxtlist.length - 1))
        ];
      }
    },
    watch: {
      tab: function (newVal, oldVal) {
        if (newVal == 2) {
          if (this.jingongs.length == 0) {
            this.getJinggongs();
          }
          if (this.wakes.length == 0) {
            this.getHuanxings();
          }
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "../../../assets/css/mixin";
  .red {
    color: @mcolor  !important;
    &.bolder {
      font-weight: bold;
      font-size: 0.28rem;
    }
  }

  .pink {
    color: #fe6666;
  }

  .invitepupil {
    height: 100vh;
    .top {
      background: #fff;
    }
    .top ul li {
      width: 50%;
      height: 1rem;
      line-height: 1rem;
      display: block;
      text-align: center;
      font-size: 0.36rem;
      position: relative;
      &.active {
        color: @mcolor;
      }
      &.active:after {
        content: " ";
        background-color: @mcolor;
        width: 0.7rem;
        height: 0.04rem;
        margin: 0 auto;
        display: block;
      }
      i {
        padding: 0 0.08rem 0 0.08rem;
        height: 0.38rem;
        font-size: 0.24rem;
        line-height: 0.38rem;
        position: absolute;
        top: 0.04rem;
        left: 2.6rem;
        background: #fe6665;
        color: #fff;
        border-radius: 0.07rem;
      }
    }
    .ad {
      img {
        vertical-align: middle;
      }
    }
    /*邀请收徒 tab*/
    .share {
      padding: 0.3rem 0.4rem 0.4rem;
      background: #fff;
      .tp {
        position: relative;
        margin-bottom: 0.5rem;
        .middle {
          width: 5.4rem;
          height: 0.68rem;
          font-size: 0.28rem;
          line-height: 0.34rem;
          margin: 0 auto;
          background: #fff;
          color: #333;
          text-align: center;
          position: relative;
        }
        &:before {
          content: "";
          width: 100%;
          height: 1px;
          background: #e6e6e6;
          display: block;
          position: absolute;
          top: 50%;
          left: 0;
        }
      }
      .md {
        .share_item {
          width: 33.333333%;
          text-align: center;
          font-size: 0.28rem;
          color: #333;
          div.img {
            width: 1.4rem;
            height: 1.4rem;
            .border(#f2f2f2);
            border-radius: 100%;
            margin: 0 auto 0.1rem;
          }
          img {
            width: 0.65rem;
            margin: 0.35rem auto;
          }
          &.mdm {
            margin: 0.35rem 33.3% auto;
          }
        }
      }
      .inviteCode {
        margin: 0.28rem auto 0;
        display: block;
        font-size: 0.28rem;
        text-align: center;
        button {
          color: #6aa0f6;
          background: #fff;
          .border(#6aa0f6);
          border-radius: 0.76rem;
          line-height: 0.76rem;
          padding: 0 0.5rem;
          font-size: 0.28rem;
        }
      }
    }
    ul.tasks {
      background: #f3f3f3;
      height: 1.3rem;
      li {
        font-size: 0.28rem;
        background: #fff;
        width: 3.15rem;
        height: 0.8rem;
        line-height: 0.8rem;
        display: inline-block;
        margin: 0.25rem 0 0 0.4rem;
        border-radius: 0.4rem;
        position: relative;
        .iconfont {
          position: absolute;
          left: 0.5rem;
          height: 0.6rem;
          width: 0.6rem;
          font-size: 0.65rem;
          color: #7cb6fa;
        }
        span {
          position: absolute;
          left: 1.3rem;
        }
      }
    }
    .desc {
      background: #fff;
      .tp {
        height: 1.35rem;
        .imgs {
          width: 3.75rem;
          height: 0.6rem;
          margin: auto;
          position: relative;
          top: 0.4rem;
          img.ico {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0.78rem;
            height: 0.58rem;
          }
          img.haochu {
            position: absolute;
            bottom: 0;
            left: 0.85rem;
            width: 2.74rem;
            height: 0.51rem;
          }
        }
      }
      .txt1 {
        font-size: 0.28rem;
        line-height: 0.48rem;
        margin: 0 0.75rem 0 0.75rem;
        padding-bottom: 0.2rem;
        .border(#cecece,bottom);
      }
      .txt2 {
        font-size: 0.28rem;
        line-height: 0.48rem;
        margin: 0.2rem 0.75rem 0.2rem 0.75rem;
        .content {
          width: 3.85rem;
        }
        .btn {
          position: relative;
          button {
            position: absolute;
            color: #9f6513;
            width: 1.74rem;
            height: 0.65rem;
            .background('td_role.png');
            text-align: center;
            left: 0.2rem;
            top: 0.2rem;
          }
        }
      }
    }
    .pop {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      .rolebg {
        position: absolute;
        background-color: #fff;
        display: block;
        width: 5.8rem;
        top: 50%;
        left: 0;
        right: 0;
        margin: -3.2rem auto;
        border-radius: 0.2rem;
        padding: 0.7rem 0.25rem 0.25rem;
        .close {
          position: absolute;
          top: 0;
          right: 0;
          width: 0.7rem;
          height: 0.7rem;
          font-size: 0.35rem;
          text-align: center;
          line-height: 0.7rem;
          color: #999;
        }
        .tt {
          width: 3.34rem;
          height: 0.51rem;
          margin: 0 auto;
          .background('pop_td_tt.png');
        }
        .txt1 {
          margin: 0.2rem auto;
          font-size: 0.26rem;
          line-height: 0.36rem;
        }
        .tt2 {
          width: 3.86rem;
          height: 0.5rem;
          margin: 0 auto;
          .background('pop_td_jiangli.png');
          color: #fff;
          text-align: center;
          line-height: 0.5rem;
          font-size: 0.32rem;
        }
      }
    }
    .lanternFestival {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      .rolebg {
        position: absolute;
        background-color: #fff;
        display: block;
        width: 5.8rem;
        top: 50%;
        left: 0;
        right: 0;
        margin: -3.8rem auto;
        border-radius: 0.2rem;
        padding: 0.7rem 0 0.25rem;
        .close {
          position: absolute;
          top: 0;
          right: 0;
          width: 0.7rem;
          height: 0.7rem;
          font-size: 0.35rem;
          text-align: center;
          line-height: 0.7rem;
          color: #999;
        }
        .tt {
          width: 3.34rem;
          height: 0.51rem;
          margin: 0 auto;
          .background('pop_td_tt.png');
        }
        .txt1 {
          margin: 0.2rem auto;
          font-size: 0.3rem;
          line-height: 0.36rem;
          padding-left: 0.3rem;
          span {
            font-size: 0.3rem;
            display: block;
          }
          span:first-child {
            font-size: 0.34rem;
          }
        }
        .award {
          font-size: 0.26rem;
          line-height: 0.42rem;
          .th {
            font-size: 0.3rem;
            padding-top: 0.2rem;
          }
          .gray {
            color: #666;
            background: #f7f7f7;
          }
          .yellow {
            color: #555;
            background: #fafff0;
          }
          .pink {
            color: #333;
            background: #ffe5e0;
            font-weight: 600;
          }
          .table-row .table-cell:first-child {
            padding-left: 0.2rem;
          }
          .table-row:last-child .table-cell {
            padding-bottom: 0.15rem;
          }
        }
        .txt3 {
          margin: 0 auto;
          font-size: 0.24rem;
          padding: 0.2rem 0.3rem;
          span {
            color: #333;
            display: block;
            &:first-child {
              margin-bottom: 0.15rem;
            }
            label {
              color: #999;
            }
          }
        }
        .tt2 {
          width: 3.86rem;
          margin: 0 auto;
          .background('pop_td_jiangli.png');
          color: #fff;
          text-align: center;
          line-height: 0.5rem;
          font-size: 0.32rem;
        }
        .txt2 {
          .ico {
            width: 1.53rem;
            height: 1.87rem;
          .background('pop_td_cash.png');
            margin: 0.6rem 0.3rem 0 0.1rem;
            float: left;
          }
          .content {
            font-size: 0.26rem;
            line-height: 0.45rem;
            float: left;
            margin: 0.2rem auto;
          }
        }
      }
    }
    /*我的徒弟tab*/
    .tip {
      height: 0.6rem;
      line-height: 0.63rem;
      font-size: 0.24rem;
      margin: 0.28rem 0.35rem 0.7rem 0.35rem;
      background: #f3f3f3;
      text-align: center;
      border-radius: 0.15rem;
    }
    .mid {
      margin: 0 0.35rem;
      ul.tab li {
        width: 50%;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.3rem;
        text-align: center;
        color: #fe6665;
        border: 0.025rem solid #fe6665;
        border-top-left-radius: 0.45rem;
        border-top-right-radius: 0.45rem;
        &.active {
          background: #fe6665;
          color: #fff;
        }
      }
      .jingong_th {
        width: 100%;
        border: 0.025rem solid #fe6665;
        border-bottom: none;
        background: #f3f3f3;
        li.th {
          font-size: 0.32rem;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          background: #f3f3f3;
          .position {
            color: #999;
            width: 1.1rem;
          }
          .nick {
            color: #999;
            width: 1.95rem;
          }
          .id {
            color: #999;
            width: 1.95rem;
          }
          .coin {
            color: #999;
            width: 1.75rem;
          }
        }
      }
      .jingong_tb {
        border: 0.025rem solid #fe6665;
        border-top: none;
        height: 5.1rem;
        li.table {
          display: table;
          font-size: 0.34rem;
          height: 0.8rem;
          text-align: center;
          color: #333;
          .table-cell {
            display: table-cell;
            vertical-align: middle;
          }
          .position {
            width: 1.1rem;
            height: 0.8rem;
            &.one {
              color: #fff;
              font-size: 0.25rem;
              background: url(../../../assets/images/td_one.png) no-repeat center center;
              background-size: 0.4rem 0.44rem;
              vertical-align: top;
            }
            &.two {
              color: #fff;
              font-size: 0.25rem;
              background: url(../../../assets/images/td_two.png) no-repeat center center;
              background-size: 0.4rem 0.44rem;
              vertical-align: top;
            }
            &.three {
              color: #fff;
              font-size: 0.25rem;
              background: url(../../../assets/images/td_three.png) no-repeat center center;
              background-size: 0.4rem 0.44rem;
              vertical-align: top;
            }
          }
          .nick {
            width: 1.95rem;
            height: 0.8rem;
            font-size: 0.31rem;
          }
          .id {
            width: 1.95rem;
          }
          .coin {
            width: 1.75rem;
          }
        }
      }
      .jiaoxing_th {
        width: 100%;
        border: 0.025rem solid #fe6665;
        border-bottom: none;
        background: #f3f3f3;
        li.th {
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.32rem;
          text-align: center;
          background: #f3f3f3;
          .nick {
            color: #999;
            width: 2.75rem;
          }
          .phone {
            color: #999;
            width: 2.25rem;
          }
          .blank {
            color: #999;
            text-indent: -9999px;
          }
        }
      }
      .jiaoxing_tb {
        width: 100%;
        border: 0.025rem solid #fe6665;
        border-top: none;
        height: 5.1rem;
        ul {
          min-height: 4.8rem;
          overflow-y: scroll;
        }
        li.table {
          font-size: 0.34rem;
          text-align: center;
          color: #333;
          height: 0.8rem;
          display: table;
          .table-cell {
            display: table-cell;
            vertical-align: middle;
          }
          .nick {
            width: 2.75rem;
          }
          .phone {
            width: 2.25rem;
          }
          button {
            width: 1.5rem;
            height: 0.65rem;
            border-radius: 0.32rem;
            border: 0.02rem solid #fe6666;
            background: #fe6666;
            color: #fff;
            &.wake {
              color: #fe6666;
              background: #fff;
            }
          }
        }
      }
      .notudi {
        font-size: 0.3rem;
        color: #666;
        height: 100%;
        padding: 1rem 0.5rem;
      }
    }
    .shuom_tip {
      position: fixed;
      left: 0;
      top: 3.7rem;
      color: #fff;
      width: 0.66rem;
      height: 2.28rem;
      text-align: center;
      .background('wake_sm.png');
    }
    .shuom {
      .mask;
      .shuombg {
        border-radius: 0.3rem;
        &:before {
          content: "";
          display: block;
          position: absolute;
          height: 0.93rem;
          width: 100%;
          .background('wake_sm_tp.png');
          background-size: auto 100%;
          top: -0.25rem;
          left: 0;
        }
        .close {
          font-size: 0.45rem;
          position: absolute;
          right: 0.35rem;
          top: 0.35rem;
          color: #999;
        }
        .tt {
          font-size: 0.42rem;
          padding: 1.45rem 0.35rem 0;
        }
        .txt {
          width:6.1rem;
          margin:0 auto;
          color: #999;
          font-size: 0.28rem;
          line-height: 0.45rem;
          padding: 0.35rem 0.22rem;
          background: #f7f7f7;
          margin-top: 0.3rem;
        }
        .btn {
          margin: 0.25rem .6rem;
          button {
            width: 5.6rem;
            height: 0.9rem;
            background: #fe6665;
            border-radius: 0.45rem;
            margin: auto;
            color: #fff;
            font-size: 0.36rem;
          }
        }
      }
    }
    .huanx {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      .huanxbg {
        position: relative;
        background-color: #fff;
        display: block;
        width: 6.8rem;
        height: 7.25rem;
        top: 50%;
        left: 0;
        right: 0;
        margin: -3.625rem auto;
        border-radius: 0.3rem;
        padding: 0.75rem 0.35rem 0;
        .close {
          font-size: 0.45rem;
          position: absolute;
          right: 0.35rem;
          top: 0.35rem;
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
          width: 5.6rem;
          height: 2.35rem;
          margin: 0 auto;
          textarea {
            width: 100%;
            height: 100%;
            text-align: left;
            .border(#aeaeae);
            border-radius: 0.1rem;
            padding: 0.3rem;
            font-size: 0.34rem;

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
          color: #ccc;
          text-align: center;
          margin: 0.25rem auto;
        }
        ul.btns {
          margin-top: 0.35rem;
          li {
            width: 50%;
            text-align: center;
            button {
              width: 2.7rem;
              height: 0.9rem;
              margin: 0 auto;
              font-size: 0.3rem;
              border-radius: 0.45rem;
              position: relative;
              text-indent: 0.5rem;
              background: #fff;
              .border(#ccc);
              i.weixin {
                width: 0.55rem;
                height: 0.55rem;
                .background('wx.png');
                display: block;
                position: absolute;
                top: 0.15rem;
                left: 0.35rem;
              }
              i.qq {
                width: 0.55rem;
                height: 0.55rem;
                .background('qq.png');
                display: block;
                position: absolute;
                top: 0.15rem;
                left: 0.35rem;
              }
            }
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