<template>
  <div>
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="withdrawal" v-show="!loading">
      <header v-if="isLogin">
        <p class="currentBalance">当前余额</p>
        <div class="balance">
          <sup class="sup">￥</sup>{{allData.balance_cash | decimal(2)}}
        </div>
      </header>
      <article>
        <p class="methodText">提现方式</p>
        <div class="method clearfix">
          <div class="methodfloat left" :class="{active:method}" @click.stop="checkbtn(2,'微信')" v-if="product_list_wechat && product_list_wechat.length>0">
            <div class="recommend">推荐</div>
            <span class="iconfont wechatColor">&#xe622;</span>
            <span class="Alltext">微信</span>
            <div class="triangle" v-show="method">
              <div class="pairNumber"></div>
            </div>
          </div>
          <div class="methodfloat left" :class="{active:!method}" @click.stop="checkbtn(1,'支付宝')" v-if="product_list && product_list.length>0">
            <span class="iconfont alipayColor">&#xe602;</span>
            <span class="Alltext">支付宝</span>
            <div class="triangle" v-show="!method">
              <div class="pairNumber"></div>
            </div>
          </div>
        </div>
      </article>
      <section>
        <p class="methodMoney">提现金额</p>
        <ul class="MoneyContainer clearfix" v-if="acount==1">
          <li class="Moneydfloat left" :class="{active:alnum==money.price_cash}" v-for="(money,index) in product_list" @click.stop="sendMoney(acount,money.price_cash,money.product_id)"
            :key="index">
            <span class="money">{{money.price_cash | decimal(0)}}元</span>
            <div class="onlyOneTimes" v-if="Number(money.price_cash)=='1'">仅限一次</div>
            <div class="triangle" v-show="alnum==money.price_cash">
              <div class="pairNumber"></div>
            </div>
          </li>
        </ul>
        <ul class="MoneyContainer clearfix" v-else>
          <li class="Moneydfloat left" :class="{active:wechat==money.price_cash}" v-for="(money,index) in product_list_wechat"
            @click.stop="sendMoney(acount,money.price_cash,money.product_id)" :key="index">
            <span class="money">{{money.price_cash | decimal(0)}}元</span>
            <div class="onlyOneTimes" v-if="Number(money.price_cash)=='1'">仅限一次</div>
            <div class="triangle" v-show="wechat==money.price_cash">
              <div class="pairNumber"></div>
            </div>
          </li>
        </ul>
      </section>
      <footer>
        <p class="title">注意事项</p>
        <div class="tips">
          1.提现申请将在1~2个工作日内审批(双休日。节假日顺延)
          <br> 2.请及时关注“我的钱包”查看提现记录
        </div>
      </footer>
      <!--一元提现弹窗-->
      <div class="v-modal" v-show="withdrawShow" @touchmove.prevent>
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
      <!--一元提现成功弹窗-->
      <div class="v-modal" v-show="isinviteModalShow" @touchmove.prevent>
          <div class="modal inviteModal">
            <div class="withdrawal_cash"></div>
            <div class="inviteTips">恭喜你获得专属收徒奖励，本次收徒最高可获得<span>13.8元</span></div>
            <div class="shareBtn scaleBtn">立即收徒</div>
          </div>
      </div> 
      <button class="bottomFix fixActive" @click="goLogin('立即提现')" v-if="!isLogin">立即提现</button>
      <button class="bottomFix" :class="{fixActive:btnActive}" v-if="isLogin" @click="exchange('立即提现')" v-text="btnActive?'立即提现':'余额不足'"></button>
    </div>
  </div>
</template>
<script>
  import nvHead from "@/components/header.vue";
  import nvLoading from "@/components/loading.vue";
  import ajax from "@/assets/js/ajax";
  import appcall from "@/assets/js/appcall";
  import pagers from "@/assets/js/pagers";
  export default {
    name: "withdrawal",
    data() {
      return {
        isLogin:false,
        loading: true,
        method: true,
        balance: "0",
        acount: 2,
        alnum: 1,
        wechat: 1,
        btnActive: true,
        ALproduct_id: 1,
        Weproduct_id: 1,
        allData: {},
        product_list:[],
        product_list_wechat:[],
        withdrawShow: false,
        one_cash: [],
        isinviteModalShow:false,
      };
    },
    components: {
      nvHead,
      nvLoading
    },
    created() {
      this.$Progress.start();
    },
    mounted() {
      this.pullDown();
      window.afterPullDown = function() {
        this.pullDown();
      }.bind(this);
    },
    watch: {
      alnum(newValue, oldValue) {
        if (Number(this.allData.balance_cash) < Number(this.alnum)) {
          this.btnActive = false;
          this.btnMes = "余额不足";
        } else {
          this.btnActive = true;
        }
      },
      wechat(newValue, oldValue) {
        if (Number(this.allData.balance_cash) < Number(this.wechat)) {
          this.btnActive = false;
          this.btnMes = "余额不足";
        } else {
          this.btnActive = true;
        }
      },
      ALproduct_id(newValue, oldValue) {
        this.ALproduct_id = newValue;
      },
      Weproduct_id(newValue, oldValue) {
        this.Weproduct_id = newValue;
      },
      acount(newValue, oldValue) {
        this.acount = newValue;
      }
    },
    methods: {
        /**
       * 页面初始
       */
      async pullDown() {
        let appdata = await appcall.getAppData();
        if (!appdata.uid || !appdata.token) {
          this.isLogin = false;
        } else {
          this.isLogin = true;
        }
        this.init();
      },
      /**
       * 初始化
       */
      async init() {
        let params = {};
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "post",
          this.$apiurl + "/account/get_product_lists",
          comm,
          params
        );
        this.$Progress.finish();
        console.log(rs.data);
        if (rs && rs.code === 1001) {
          this.allData = rs.data;
          this.product_list = rs.data.product_list;
          this.product_list_wechat = rs.data.product_list_wechat;
          if(this.product_list && this.product_list.length >0){
            this.ALproduct_id = this.product_list[0].product_id;
            this.alnum = Number(this.product_list[0].price_cash);
          }
          // this.product_list = null;
          if(this.product_list_wechat && this.product_list_wechat.length >0){
            this.Weproduct_id = this.product_list_wechat[0].product_id;
            this.wechat = Number(this.product_list_wechat[0].price_cash);
          }
          if(this.product_list_wechat == null || this.product_list_wechat.length==0){
            this.acount = 1;
            this.checkbtn(1,'支付宝');
          }
          this.loading = false;
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 点击提现
       */
      exchange(position) {
        if(!!position){_hmt.push(['_trackEvent', 'withdrawal', 'click', position])}
        if (this.btnActive) {
          this.order();
          this.getOneCash()
        }
      },
      /**
       * 去登录
       */
      goLogin(position) {
        if(!!position){_hmt.push(['_trackEvent', 'withdrawal', 'click', position])}
        appcall.login();
      },
      /**
       * 关闭弹窗
       */
      close() {
        this.withdrawShow = false;
      },
      /**
       * 去兑换
       */
      async order() {
        let product_id = this.acount == 2 ? this.Weproduct_id : this.ALproduct_id;
        let params = {
          product_id: product_id,
          type: this.acount
        };
        this.methodetxt = this.acount == 2 ? "微信" : "支付宝";
        let comm = await appcall.getRequestData(params);
        let rs = await ajax("post", this.$apiurl + "/order/create_order", comm, params);
        if (rs && rs.code === 1001) {
          this.$confirm(this.methodetxt + "提现成功", "温馨提示", {
            confirmButtonText: "告诉好友",
            cancelButtonText: "查看详情"
          }).then(
            rs => {
              if (this.acount == 2) {
                this.sharewx(this.wechat);
              } else {
                this.sharewx(this.alnum);
              }
            },
            no => {
              this.$router.push("/redeemBills");
            }
          );
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else if (rs && rs.code === 1006) {
          this.$confirm(rs.msg, "温馨提示", {
            confirmButtonText: "邀请好友赚钱"
          }).then(
            ok => {
              appcall.navigator({
                title: "任务系统",
                url: this.$h5url + pagers[this.$currVer].taskcenter
              });
            },
            no => {}
          );
        } else if (rs && rs.code === 3004) {
          this.$confirm(
            "需要绑定" + this.methodetxt + "后才能正常提现",
            "未绑定" + this.methodetxt
          ).then(
            ok => {
              appcall.bindzfb();
            },
            no => {}
          );
        } else if (rs && rs.code === 3005) {
          this.$confirm(
            "需要绑定手机号后才能正常提现",
            "未绑定手机号"
          ).then(
            ok => {
              appcall.bindzfb();
            },
            no => {}
          );
        } else if (rs && rs.code === 3006) {
          this.withdrawShow = true
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 告诉好友
       */
      async sharewx(price) {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/task/get_share_wechat_url",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let url = rs.data;
          let params = {
            type: 1,
            title: "@亲，我在超级头条成功提现" + (0 | price) + "元！",
            url: rs.data,
            desc: "快来提现吧，首次1元提现秒到账。",
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
       * 提现方式
       */
      checkbtn(value,position) {
        if(!!position){_hmt.push(['_trackEvent', 'withdrawal', 'click', position])}
        switch (value) {
          case 1:
            this.method = false;
            this.acount = value;
            if (Number(this.allData.balance_cash) < Number(this.alnum)) {
              this.btnActive = false;
              this.btnMes = "余额不足";
            } else {
              this.btnActive = true;
            }
            break;
          case 2:
            this.method = true;
            this.acount = value;
            if (Number(this.allData.balance_cash) < Number(this.wechat)) {
              this.btnActive = false;
              this.btnMes = "余额不足";
            } else {
              this.btnActive = true;
            }
            break;
          default:
            this.method = false;
            break;
        }
      },
      /**
       * 提现金额
       */
      sendMoney(value, rmb, product_id) {
        _hmt.push(['_trackEvent', 'withdrawal', 'click', '钱_'+rmb])
        if (value == 1) {
          this.alnum = Number(rmb);
          this.ALproduct_id = product_id;
        } else {
          this.wechat = Number(rmb);
          this.Weproduct_id = product_id;
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
        } else if (item.task_type == "simple") {} else {
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
    }
  };
</script>

<style lang="less" scoped>
  @import "../../../assets/css/mixin";
  @tcBlack: #282a2f;
  @tcGray: #97999d;
  @tcRed: #d53c3e;
  @tcYellow: #efbe03;
  .withdrawal {
    header {
      height: 1.4rem;
      background: #f5f5f5;
      padding: 0.2rem 0.3rem 0;
      .currentBalance {
        color: #000;
        font-size: 0.26rem;
      }
      .balance {
        font-size: 0.6rem;
        font-weight: 600;
        .sup {
          font-size: 0.26rem;
          color: #000;
          vertical-align: super;
        }
      }
    }
    article {
      height: 2.18rem;
      padding: 0 0.3rem;
      margin-top: 0.6rem;
      .methodText {
        font-size: 0.32rem;
        color: #333;
      }
      .method {
        .active {
          border: 1px solid #ffad0e !important;
        }
        .methodfloat {
          width: 3.2rem;
          height: 0.88rem;
          line-height: 0.88rem;
          text-align: center;
          .border(#bbb);
          border-radius: 0.1rem;
          position: relative;
          margin-top: 0.41rem;
          display: -webkit-inline-box;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          &:first-child{
            margin-right: 0.5rem;
          }
          .recommend {
            height: 0.4rem;
            width: 0.64rem;
            display: inline-block;
            color: #eb2d24;
            font-size: 0.22rem;
            .border(#eb2d24);
            line-height: 0.38rem;
            border-radius: 0.1rem;
            position: absolute;
            left: 0.12rem;
            top: 50%;
            transform: translate(0, -50%);
          }
          .wechatColor {
            color: #67c213;
            font-size: 0.4rem;
          }
          .alipayColor {
            color: #479ee3;
            font-size: 0.36rem;
          }
          .Alltext {
            font-size: 0.34rem;
            font-weight: 600;
          }
          .triangle {
            position: absolute;
            right: -1px;
            top: -1px;
            .background('duigou.png');
            width: 0.48rem;
            height: 0.48rem;
          }
        }
      }
    }
    section {
      .methodMoney {
        padding: 0 0.3rem;
        font-size: 0.32rem;
        color: #333;
      }
      .MoneyContainer {
        margin-top: 0.41rem;
        .active {
          border: 1px solid #ffad0e !important;
        }
        .Moneydfloat {
          width: 2.1rem;
          height: 1.2rem;
          border: 1px solid #bbb;
          border-radius: 0.1rem;
          margin-left: 0.3rem;
          margin-bottom: 0.36rem;
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          .money {
            font-size: 0.34rem;
            color: #333;
            font-weight: bold;
          }
          .onlyOneTimes {
            width: 1.2rem;
            height: 0.38rem;
            text-align: center;
            line-height: 0.38rem;
            color: #eb2d24;
            font-size: 0.22rem;
            .border(#eb2d24);
            border-radius: 0.1rem;
          }
          .triangle {
            position: absolute;
            right: -1px;
            top: -1px;
            .background('duigou.png');
            width: 0.48rem;
            height: 0.48rem;
          }
        }
      }
    }
    footer {
      padding: 0 0.3rem;
      margin-top: 0.39rem;
      .title {
        font-size: 0.32rem;
        color: #999999;
      }
      .tips {
        margin-top: 0.25rem;
        font-size: 0.26rem;
        color: #999999;
        line-height: 0.5rem;
      }
    }
    .v-modal {
      .mask(0, 0, 0, 0.7);
      .withdraw {
        padding: 0 .34rem;
        border-radius: .12rem;
        width: 6rem;
        min-height: 6.08rem;
        i.close {
          position: absolute;
          top: .34rem;
          right: .34rem;
          font-size: 0.3rem;
          color: #d8d8d8;
        }
        .title {
          font-size: .44rem;
          color: #efbe03;
          text-align: center;
          margin: .58rem 0 .46rem;
        }
        ul {
          li {
            height: .7rem;
            line-height: .7rem;
            width: 5.32rem;
            margin-bottom: .42rem;
            .imgBox {
              position: relative;
              width: .4rem;
              height: .4rem;
              margin: .15rem 0;
              img {
                width: 100%;
                height: 100%;
                border-radius: .4rem;
              }
              .shadow {
                width: 100%;
                height: 100%;
                border-radius: .4rem;
                background: rgba(255, 255, 255, .7);
                position: absolute;
                top: 0;
                left: 0;
              }
            }
            .taskName {
              font-size: .32rem;
              color: @tcBlack;
              margin-left: .14rem;
              &.gray {
                color: @tcGray;
              }
            }
            .default {
              width: 1.48rem;
              height: .7rem;
              line-height: .7rem;
              text-align: center;
              font-size: .28rem;
              color: #ffffff;
              background: @tcRed;
              border-radius: .7rem;
            }
            .done {
              width: 1.48rem;
              height: .7rem;
              .background("taskcenter/done.png");
            }
          }
        }
      }
      .inviteModal{
        background: #FFFFFF;
        width: 6rem;
        position: relative;
        border-radius: .2rem;
        padding: 1.6rem 0 .3rem;
        text-align: center;
        .withdrawal_cash{
          width: 2.8rem;
          height: 2.8rem;
          .background('helpHB/helpHB_cash.png');
          position: absolute;
          left: 0;
          right: 0;
          top: -1.2rem;
          margin: 0 auto;
        }
        .inviteTips{
          margin:0 auto .4rem;
          width: 5.2rem;
          height: 1.2rem;
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
          margin: 0 auto;
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
    }
    .bottomFix {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 1rem;
      font-size: 0.36rem;
      background-color: #eeeeee;
      color: #666666;
      box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
    }
    .fixActive {
      background-color: #ffad0e;
      color: #ffffff;
    }
  }
</style>