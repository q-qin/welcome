<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="抽奖活动">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div v-show="!loading" class="lottery">
      <div class="tips" @click.stop="alertRule"><img src="../../../assets/images/lottery/lootery_rule.png"></div>
      <div class="return" @click.stop="goBack">
        <img src="../../../assets/images/lottery/return.png">
      </div>
      <div class="coin">
        <div class="txt" v-if="isLogin">
          今日金币：{{balance_coin}}&nbsp;&nbsp;&nbsp;每场消耗80
        </div>
        <div class="txt" v-if="!isLogin">
          我得金币：0&nbsp;&nbsp;&nbsp;每场消耗80
        </div>
        <div class="coin_img">
          <img src="../../../assets/images/lottery/coin.png">
        </div>
      </div>
      <div class="flush">
        <nv-marquee :duration="800" :interval="2000" :play="marqueePlay" class="flushCroll" ref="flushCroll" :height="0.5">
          <li v-for="(item,$index) in scrollbarData" :key="$index">
            {{item.userid}}抽中{{item.product_name}}
          </li>
        </nv-marquee>
      </div>
      <div id="lottery">
        <div class="lamp" v-show="lamp"></div>
        <div class="lampno" v-show="!lamp"></div>
        <table>
          <tbody>
            <tr>
              <td class="lottery-unit lottery-unit-0" v-if="goods[0]">
                <img :src="goods[0].image">
                <span>{{goods[0].name}}</span>
              </td>
              <td class="lottery-unit lottery-unit-1" v-if="goods[1]">
                <img :src="goods[1].image">
                <span>{{goods[1].name}}</span>
              </td>
              <td class="lottery-unit lottery-unit-2" v-if="goods[2]">
                <img :src="goods[2].image">
                <span>{{goods[2].name}}</span>
              </td>
            </tr>
            <tr>
              <td class="lottery-unit lottery-unit-7" v-if="goods[7]">
                <img :src="goods[7].image">
                <span>{{goods[7].name}}</span>
              </td>
              <td @click="Start()" class="dot">
                <img src="../../../assets/images/lottery/click.png" class="clickrand">
              </td>
              <td class="lottery-unit lottery-unit-3" v-if="goods[3]">
                <img :src="goods[3].image">
                <span>{{goods[3].name}}</span>
              </td>
            </tr>
            <tr>
              <td class="lottery-unit lottery-unit-6" v-if="goods[6]">
                <img :src="goods[6].image">
                <span>{{goods[6].name}}</span>
              </td>
              <td class="lottery-unit lottery-unit-5" v-if="goods[5]">
                <img :src="goods[5].image">
                <span>{{goods[5].name}}</span>
              </td>
              <td class="lottery-unit lottery-unit-4" v-if="goods[4]">
                <img :src="goods[4].image">
                <span>{{goods[4].name}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="record">
        <div class="list">
          <div class="header clear">
            <div class="left">
              <span class="prize">奖品</span>
              <span class="txt">仅显示3天内记录</span>
            </div>
            <div class="right">中奖时间</div>
          </div>
          <div class="history">
            <ul>
              <li v-for="(item,$index) in account" :key="$index">
                <div class="ng_left">
                  <img :src="item.image">
                  <span>{{item.name}}</span>
                </div>
                <div class="ng_right">
                  {{item.created}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="winrules" v-if="showrules" @touchmove.prevent>
        <div class="rule">
          <ul>
            <li>每次抽奖消耗80金币;</li>
            <li>金币、红包奖励实时发放到账户中，可在中奖记录或我的红包页面查看金币明细</li>
            <li>话费、王者皮肤请在弹出得界面中填写相关信息进行领取，奖品将在领取成功后2个工作日内发放</li>
            <li>本次活动最后解释权归超级头条所有</li>
          </ul>
          <div class="close" @click.stop="alertRule">知道了</div>
        </div>
      </div>
      <div class="success" v-if="success" @touchmove.prevent>
        <div class="rule">
          <div class="bg_white">
            <div class="title">恭喜你获得</div>
            <div class="message">
              <img :src="successGoods.image">
              <div class="coin">{{successGoods.name}}</div>
            </div>
          </div>
          <div class="close" @click.stop="alertSuccess">确定</div>
        </div>
      </div>
      <div class="logged" v-if="unLogged" @touchmove.prevent>
        <div class="rule">
            <div class="goldcoin">金币不足哦</div>
            <div class="button clear">
              <div class="cancle left" @click="logged('cancle')">取消</div>
              <div class="confirm right" @click="logged('confirm')">去赚金币</div>
            </div>
        </div>
      </div>
            <div class="golog" v-if="ungolog" @touchmove.prevent>
        <div class="rule">
            <div class="goldcoin">请先登录后参与活动</div>
            <div class="button clear">
              <div class="cancle left" @click="golog('cancle')">取消</div>
              <div class="confirm right" @click="golog('confirm')">去登录</div>
            </div>
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
import $ from "jquery";

export default {
  name: "lottery",
  data() {
    return {
      loading: true,
      playing:false,
      lamp: true,
      goods: [],
      balance_coin: "",
      showrules: false,
      success: false,
      isLogin: false,
      unLogged: false,
      ungolog: false,
      msgA:'金币不足哦',
      successGoods: [],
      account: [],
      scrollbarData: [
        {
          userid: "**0090**",
          product_name: "500金币"
        },
        {
          userid: "**1916**",
          product_name: "30元话费"
        },
        {
          userid: "**0090**",
          product_name: "500金币"
        },
        {
          userid: "**0455**",
          product_name: "30金币"
        },
        {
          userid: "**1917**",
          product_name: "9.9元红包"
        },
        {
          userid: "**1913**",
          product_name: "王者皮肤"
        },
        {
          userid: "**1915**",
          product_name: "美的电饭煲"
        },
        {
          userid: "**1917**",
          product_name: "9.9元红包"
        },
        {
          userid: "**0824**",
          product_name: "30元话费"
        },
        {
          userid: "**0394**",
          product_name: "美的电饭煲"
        }
      ],
      marqueePlay: false,
      lottery: {
        select: 4,
        index: -1, //当前转动到哪个位置
        count: 0, //总共有多少个位置
        timer: 0, //setTimeout的ID，用clearTimeout清除
        speed: 50, //初始转动速度
        times: 0, //转动次数
        cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1, //中奖位置
        init: function() {
          if ($("#lottery").find(".lottery-unit").length > 0) {
            this.count = $("#lottery").find(".lottery-unit").length;
            $("#lottery")
              .find(".lottery-unit-" + this.index)
              .addClass("active");
          }
        },
        roll: function() {
          var index = this.index;
          var count = this.count;
          $("#lottery")
            .find(".lottery-unit-" + index)
            .removeClass("active");
          index += 1;
          if (index > count - 1) {
            index = 0;
          }
          $("#lottery")
            .find(".lottery-unit-" + index)
            .addClass("active");
          this.index = index;
          return false;
        },
        stop: function(index) {
          this.prize = index;
          return false;
        }
      }
    };
  },
  components: {
    nvHead,
    nvLoading,
    nvMarquee
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.Init();
    });
    this.pullDown();
    this.$nextTick(() => {
      this.marqueePlay = true;
    });
    window.afterPullDown = function() {
      this.pullDown();
    }.bind(this);
  },
  methods: {
    alertRule() {
      this.showrules = !this.showrules;
    },
    alertSuccess() {
      this.success = !this.success;
    },
    logged(value) {
      if (value == "cancle") {
        this.unLogged = false;
      } else {
        appcall.navigator({
          title: "任务中心",
          url: this.$h5url + pagers[this.$currVer].taskcenter,
        });
        this.unLogged = false;
      }
    },
    golog(value) {
      if (value == "cancle") {
        this.ungolog = false;
      } else {
        appcall.login();
        this.ungolog = false;
      }
    },
    /**
     * 下拉获取新数据
     */
    async pullDown() {
      let appdata = await appcall.getAppData();
      if (!appdata.uid || !appdata.token) {
        this.$Progress.finish();
        this.isLogin = false;
        this.loading = false;
      } else {
        this.isLogin = true;
        this.$nextTick(() => {
          this.Init();
        });
      }
      if (
        (appdata.platform_code == "ios_h5" && appdata.version_code <= 7) ||
        (appdata.platform_code == "android_h5" && appdata.version_code <= 9)
      ) {
        this.lowVersion = true;
      } else {
        appcall.hideNavBar();
      }
    },
    /**
     * 页面返回
     */
    goBack() {
      appcall.goBack();
    },
    roll() {
      this.lottery.times += 1;
      this.lottery.roll();
      if (
        this.lottery.times > this.lottery.cycle + 10 &&
        this.lottery.prize == this.lottery.index
      ) {
        clearTimeout(this.lottery.timer);
        this.lottery.prize = -1;
        this.lottery.times = 0;
        var click = false;
        this.success = true;
        this.Init();
        clearInterval(this.Interval);
        this.playing = false;
      } else {
        if (this.lottery.times < this.lottery.cycle) {
          this.lottery.speed -= 10;
        } else if (this.lottery.times == this.lottery.cycle) {
          var index = this.lottery.select;
          this.lottery.prize = index;
        } else {
          if (
            this.lottery.times > this.lottery.cycle + 10 &&
            ((this.lottery.prize == 0 && this.lottery.index == 7) ||
              this.lottery.prize == this.lottery.index + 1)
          ) {
            this.lottery.speed += 110;
          } else {
            this.lottery.speed += 20;
          }
        }
        if (this.lottery.speed < 40) {
          this.lottery.speed = 40;
        }
        this.lottery.timer = setTimeout(this.roll, this.lottery.speed);
      }
      return false;
    },
    /**
     * 初始化抽奖商品列表
     */
    async Init() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/lottery/turntable_list",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.goods = rs.data.award_list;
        this.balance_coin = rs.data.balance_coin;
        this.$nextTick(() => {
          this.lottery.init();
        });
        this.loading = false;
        this.historyData();
      } else if (rs.code === 1008) {
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 初始化历史数据
     */
    async historyData() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/lottery/turntable_history",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.account = rs.data;
      } else if (rs.code === 1008) {
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    async Start() {
      if (this.isLogin) {
        if(this.playing)return false;
        this.playing = true;
        let params = {};
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "post",
          this.$apiurl + "/lottery/turntable_detail",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          this.lottery.speed = 100;
          this.lottery.select = rs.data.sort;
          this.successGoods = rs.data;
          this.roll();
          this.Interval=setInterval(() => {
            if (this.lamp) {
              this.lamp = false;
            } else {
              this.lamp = true;
            }
          }, 100);
        } else if (rs && rs.code === 1008) {
          this.playing= false;
        } else if (rs && rs.code == 1005) {
          this.playing= false;
          this.ungolog = true;
        } else if (rs && rs.code == 3002) {
          this.playing= false;
          this.msgA =rs.msg
          this.unLogged = true;
        } else {
          this.playing= false;
          this.$alert(rs.msg);
        }
      } else {
        this.ungolog = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";

.lottery {
  background: #f9003c;
  position: relative;
  padding-top: 2.65rem;
  width: 100%;
  height: 20rem;
  .background("lottery/lottery_bg.jpg");
  .return {
    position: absolute;
    top: 0.68rem;
    left: 0.3rem;
    width: 0.2rem;
    height: 0.36rem;
    img {
      width: 100%;
    }
  }
  .tips {
    width: 0.44rem;
    position: absolute;
    right: 0.3rem;
    top: 1.34rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .coin {
    position: absolute;
    left: 50%;
    margin-left: -2.5rem;
    text-align: center;
    width: 5rem;
    height: 0.55rem;
    background: rgba(255, 255, 255, 0.27);
    color: #fff;
    line-height: 0.55rem;
    font-size: 0.28rem;
    border-top-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    .txt {
      height: 0.55rem;
      color: #fff;
      line-height: 0.55rem;
    }
    .coin_img {
      width: 0.29rem;
      height: 0.29rem;
      margin-left: 0.03rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .flush {
    position: absolute;
    bottom: 0;
    top: 4.12rem;
    left: 0;
    right: 0;
    height: 0.73rem !important;
    overflow: hidden;
    .flushCroll {
      margin-top: 0.115rem;
      position: absolute;
      text-align: center;
      overflow: hidden;
      z-index: 1 !important;
      height: 0.5rem !important;
      ul {
        height: 0.5rem !important;
      }
      li {
        height: 0.5rem !important;
        line-height: 0.5rem !important;
        font-size: 0.28rem;
        color: #fff;
      }
    }
  }
  #lottery {
    margin: 1.18rem auto 0;
    width: 7.17rem;
    height: 8.24rem;
    .background("lottery/pan.png");
    position: relative;
    .lamp {
      position: absolute;
      width: 6.61rem;
      height: 6.58rem;
      top: 1.37rem;
      left: 50%;
      margin-left: -3.31rem;
      .background("lottery/lamp.png");
    }
    .lampno {
      position: absolute;
      width: 6.61rem;
      height: 6.58rem;
      top: 1.37rem;
      left: 50%;
      margin-left: -3.31rem;
      .background("lottery/lamp1.png");
    }
    .boxshaow {
      position: absolute;
      width: 6.2rem;
      height: 6.1rem;
      top: 1.57rem;
      left: 50%;
      margin-left: -3.1rem;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 0.12rem;
      z-index: 1;
    }
    table {
      position: absolute;
      top: 1.44rem;
      left: 50%;
      margin-left: -3.03rem;
      border-spacing: 0.06rem 0.24rem;
      tr {
        td {
          width: 1.9rem;
          height: 1.7rem;
          text-align: center;
          vertical-align: middle;
          background-color: #ffffff;
          color: #333;
          border-radius: 12px;
          box-shadow: 0 0.18rem 0 rgba(254, 189, 190, 1);
          img {
            width: 1.56rem;
          }
          span {
            color: #fa0b3f;
            font-size: 0.26rem;
            font-weight: 600;
          }
        }
        .dot {
          background: rgb(255,209,0);
          box-shadow: 0 0.18rem 0 rgba(229, 144, 1, 1);
          width: 1.9rem;
          height: 1.7rem;
          overflow: hidden;
          .clickrand {
            width: 100%;
            height: 100%;
          }
          &:active {
            box-shadow: 0px 3px 0px rgba(229, 144, 1, 1);
            position: relative;
            top: 6px;
          }
        }
      }
    }
  }

  .record {
    width: 6.66rem;
    height: 6.28rem;
    margin: 0.18rem auto 0;
    .background("lottery/zj_bg.png");
    padding: 1.34rem 0;
    .list {
      padding: 0 0.14rem;
      .header {
        height: 0.96rem;
        padding: 0 1.11rem 0 0.48rem;
        border-bottom: 1px solid rgba(252, 239, 200, 1);
        .left {
          .prize {
            line-height: 0.96rem;
            color: #333;
            font-size: 0.26rem;
            font-weight: 600;
          }
          .txt {
            line-height: 0.96rem;
            color: #ccc;
            font-size: 0.22rem;
          }
        }
        .right {
          line-height: 0.96rem;
          color: #333;
          font-size: 0.26rem;
          font-weight: 600;
        }
      }
      .history {
        height: 3.8rem;
        width: 100%;
        overflow: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        ul {
          width: 100%;
          li {
            height: 1.3rem;
            padding: 0 0.28rem 0 0.25rem;
            border-bottom: 1px solid rgba(252, 239, 200, 1);
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            .ng_left {
              height: inherit;
              display: inline-flex;
              display: -webkit-inline-flex;
              justify-content: center;
              align-items: center;
              img {
                display: inline-block;
                width: 1.1rem;
              }
              span {
                margin-left: 0.3rem;
                line-height: 1.3rem;
              }
            }
            .ng_right {
              height: inherit;
              color: #999;
              font-size: 0.24rem;
              line-height: 1.3rem;
            }
          }
        }
      }
    }
  }
  .winrules {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    .rule {
      position: relative;
      background: #ffc000;
      display: block;
      width: 5.83rem;
      height: 4.85rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -2.425rem auto;
      border-radius: 8px;
      padding: 0.24rem;
      &::before {
        position: absolute;
        content: "";
        .background("lottery/alert_bg.png");
        top: -2.7rem;
        left: 50%;
        margin-left: -2.71rem;
        width: 5.42rem;
        height: 3.29rem;
        display: inline-block;
        z-index: 2000;
      }
      ul {
        background: #fff;
        display: block;
        width: 5.35rem;
        height: 4.43rem;
        border-radius: 8px;
        padding-top: 0.23rem;
        li {
          color: #666666;
          font-size: 0.28rem;
          line-height: 0.4rem;
          margin-left: 0.24rem;
          margin-bottom: 0.23rem;
          padding-right: 0.2rem;
          &:nth-child(1) {
            .background("lottery/lottery_one.png");
            background-position: 0 0.05rem;
            background-size: 0.3rem 0.3rem;
            padding-left: 0.4rem;
          }
          &:nth-child(2) {
            .background("lottery/lottery_two.png");
            background-position: 0 0.05rem;
            background-size: 0.3rem 0.3rem;
            padding-left: 0.4rem;
          }
          &:nth-child(3) {
            .background("lottery/lottery_three.png");
            background-position: 0 0.05rem;
            background-size: 0.3rem 0.3rem;
            padding-left: 0.4rem;
          }
          &:nth-child(4) {
            .background("lottery/lottery_four.png");
            background-position: 0 0.05rem;
            background-size: 0.3rem 0.3rem;
            padding-left: 0.4rem;
          }
        }
      }
      .close {
        position: absolute;
        top: 5.61rem;
        width: 3.2rem;
        left: 0;
        right: 0;
        height: 0.8rem;
        border-radius: 40px;
        text-align: center;
        margin: 0 auto;
        line-height: 0.8rem;
        color: #fff;
        background: linear-gradient(
          180deg,
          rgba(255, 225, 0, 1),
          rgba(255, 156, 0, 1)
        );
        font-size: 0.34rem;
      }
    }
  }
  .success {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    .rule {
      position: relative;
      background: #ffc000;
      display: block;
      width: 5.83rem;
      height: 4.26rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -2.425rem auto;
      border-radius: 8px;
      padding: 0.24rem;
      &::before {
        position: absolute;
        content: "";
        .background("lottery/lottery_success.png");
        top: -2.6rem;
        left: 50%;
        margin-left: -2.51rem;
        width: 5.02rem;
        height: 2.46rem;
        display: inline-block;
        z-index: 2000;
      }
      .bg_white {
        background: #fff;
        display: block;
        width: 5.35rem;
        height: 3.72rem;
        border-radius: 8px;
        padding-top: 0.23rem;
        .title {
          font-size: 0.36rem;
          color: #666;
          text-align: center;
        }
        .message {
          margin: 0.2rem auto;
          width: 4.88rem;
          height: 2.56rem;
          background: #faf7eb;
          border-radius: 8px;

          img {
            width: 2.28rem;
          }
          .coin {
            margin-top: 0.1rem;
            font-size: 0.64rem;
            font-weight: 600;
            color: #ff6503;
            text-align: center;
          }
        }
      }
      .close {
        position: absolute;
        top: 5rem;
        width: 3.9rem;
        left: 0;
        right: 0;
        height: 0.8rem;
        border-radius: 0.4rem;
        text-align: center;
        margin: 0 auto;
        line-height: 0.8rem;
        color: #fff;
        background: linear-gradient(
          180deg,
          rgba(255, 225, 0, 1),
          rgba(255, 156, 0, 1)
        );
        font-size: 0.34rem;
      }
    }
  }
  .logged {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    .rule {
      position: relative;
      background: #fff;
      display: block;
      width: 5.35rem;
      height: 3.72rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -1.86rem auto;
      border-radius: 8px;
      padding-top: 1.42rem;
      &::before {
        position: absolute;
        content: "";
        .background("lottery/lottery_waring.png");
        top: -0.6rem;
        left: 50%;
        margin-left: -0.72rem;
        width: 1.3rem;
        height: 1.44rem;
        display: inline-block;
        z-index: 2000;
      }
      .goldcoin {
        text-align: center;
        font-size: 0.3rem;
        color: #666666;
      }
      .button {
        position: absolute;
        bottom: 0;
        height: 0.9rem;
        width: 100%;
        border-top: 1px solid #f1efef;
        line-height: 0.9rem;
        overflow: hidden;
        .cancle {
          height: inherit;
          width: 50%;
          text-align: center;
          color: #666;
          font-size: 0.34rem;
          border-right: 1px solid #f1efef;
        }
        .confirm {
          height: inherit;
          width: 50%;
          text-align: center;
          color: #f12926;
          font-size: 0.34rem;
        }
      }
    }
  }
  .golog {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    .rule {
      position: relative;
      background: #fff;
      display: block;
      width: 5.35rem;
      height: 3.72rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -1.86rem auto;
      border-radius: 8px;
      padding-top: 1.42rem;
      &::before {
        position: absolute;
        content: "";
        .background("lottery/lottery_waring.png");
        top: -0.6rem;
        left: 50%;
        margin-left: -0.72rem;
        width: 1.3rem;
        height: 1.44rem;
        display: inline-block;
        z-index: 2000;
      }
      .goldcoin {
        text-align: center;
        font-size: 0.3rem;
        color: #666666;
      }
      .button {
        position: absolute;
        bottom: 0;
        height: 0.9rem;
        width: 100%;
        border-top: 1px solid #f1efef;
        line-height: 0.9rem;
        overflow: hidden;
        .cancle {
          height: inherit;
          width: 50%;
          text-align: center;
          color: #666;
          font-size: 0.34rem;
          border-right: 1px solid #f1efef;
        }
        .confirm {
          height: inherit;
          width: 50%;
          text-align: center;
          color: #f12926;
          font-size: 0.34rem;
        }
      }
    }
  }
}

#lottery table tr td.active {
  color: red;
  background-color: #fadf80;
  box-shadow: 0 0.18rem 0 #e7b802;
}
</style>