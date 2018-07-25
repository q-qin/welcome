<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="小说">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="meeting_h5" v-show="!loading">
      <div class="meeting">
        <div class="header">
        </div>
        <div class="banner">
          <div class="content" @click="Jump(1,'收徒赚钱')">
            <div class="leftbtn">
              <div class="red">
                <img src="../../../assets/images/meeting/meet_bag.png">
              </div>
              <div class="txt">
                <div class="money">收徒赚钱</div>
                <div class="yellow">每收10徒，赚50元</div>
              </div>
            </div>
            <button class="rightbtn">
              马上赚钱
            </button>
          </div>
        </div>
        <div class="content clear">
          <div class="left" @click="Jump(2,'砸蛋')">
            <div class="rocker">
              <div class="egg">
                <img src="../../../assets/images/meeting/meet_egg.png">
              </div>
              <div class="black">
                砸金蛋
              </div>
              <div class="yellow">
                加奖1~8.8元
              </div>
              <button class="btn">立即砸蛋</button>
            </div>
          </div>
          <div class="right" @click="Jump(3,'抽奖')">
            <div class="rocker">
              <div class="egg_coin">
                <img src="../../../assets/images/meeting/meet_coin.png">
              </div>
              <div class="black">
                幸运大抽奖
              </div>
              <div class="yellow">
                红包转不停
              </div>
              <button class="btn">立即抽奖</button>
            </div>
          </div>
          <div class="left last" @click="Jump(4,'骰子')">
            <div class="rocker">
              <div class="egg_sai">
                <img src="../../../assets/images/meeting/meet_saizi.png">
              </div>
              <div class="black">
                掷骰子赚金币
              </div>
              <div class="yellow">
                奖励翻倍
              </div>
              <button class="btn">立即掷骰</button>
            </div>
          </div>
          <div class="right last">
            <div class="rocker">
              <div class="gray">
                更多奖励
                <br>敬请期待
                <br>...
              </div>
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
  import ajax from "@/assets/js/ajax";
  import appcall from "@/assets/js/appcall";
  import pagers from "@/assets/js/pagers";

  export default {
    name: "meeting",
    data() {
      return {
        loading: false
      };
    },
    components: {
      nvHead,
      nvLoading
    },
    created() {},
    mounted() {},
    methods: {
      Jump(value, position) {
        _hmt.push(["_trackEvent", "meeting", "click", position]);
        switch (value) {
          case 1:
            appcall.navigator({
              title: "收徒赚钱",
              url: this.$h5url + pagers[this.$currVer].invitepupil
            });
            break;
          case 2:
            if (JKEventHandler.browser().ios) {
              appcall.navigator({
                title: "砸金蛋",
                url: this.$h5url + pagers[this.$currVer].eggFrenzy
              });
            } else {
              appcall.navigator_no_header({
                title: "砸金蛋",
                url: this.$h5url + pagers[this.$currVer].eggFrenzy
              });
            }
            break;
          case 3:
            if (JKEventHandler.browser().ios) {
              appcall.navigator({
                title: "幸运大抽奖",
                url: this.$h5url + pagers[this.$currVer].lottery
              });
            } else {
              appcall.navigator_no_header({
                title: "幸运大抽奖",
                url: this.$h5url + pagers[this.$currVer].lottery
              });
            }
            break;
          case 4:
            if (JKEventHandler.browser().ios) {
              appcall.navigator({
                title: "幸运掷骰子",
                url: this.$h5url + pagers[this.$currVer].dice
              });
            } else {
              appcall.navigator_no_header({
                title: "幸运掷骰子",
                url: this.$h5url + pagers[this.$currVer].dice
              });
            }
            break;
          case 5:
            appcall.navigator({
              title: "助力红包",
              url: this.$h5url + "/activities/helpHB.html"
            });
            break;
          default:
            break;
        }
      }
    },
    filters: {}
  };
</script>
<style lang="less" scoped>
  @import "../../../assets/css/mixin";
  .meeting_h5 {
    width: 7.5rem;
    height: 100vh;
    background: #ff3333;
    .meeting {
      padding-bottom: .5rem;
      background: linear-gradient(#fc6644, #ff3333);
      .header {
        width: 100%;
        height: 3.2rem;
        .background("meeting/meet_bg.png");
      }
      .banner {
        margin: 0 auto 0.4rem;
        width: 6.7rem;
        height: 2rem;
        background: #fadb9d;
        padding: 0.15rem;
        border-radius: 0.08rem;
        .content {
          width: 100%;
          height: 100%;
          background: #ffffff;
          display: -webkit-flex;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .leftbtn {
            display: -webkit-flex;
            display: flex;
            justify-content: flex-start;
            margin-left: 0.15rem;
            .red {
              width: 1.4rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .txt {
              .money {
                font-size: 0.4rem;
                color: #f12926;
                font-weight: 600;
                line-height: 1;
              }
              .yellow {
                margin-top: 0.14rem;
                color: #ff7900;
                font-size: 0.26rem;
                line-height: 1;
              }
            }
          }
          .rightbtn {
            margin-right: 0.24rem;
            width: 1.8rem;
            height: 0.64rem;
            background: linear-gradient( 90deg,
            rgba(255, 226, 74, 1),
            rgba(255, 186, 68, 1));
            box-shadow: 0px 2px 4px 0px rgba(195, 0, 0, 0.5);
            border-radius: 0.42rem;
            line-height: 0.64rem;
            text-align: center;
            color: #f12926;
            font-weight: 600;
            font-size: 0.28rem;
          }
        }
      }
      .content {
        .left {
          margin-left: 0.4rem;
          margin-bottom: 0.41rem;
          width: 3.25rem;
          height: 2.8rem;
          background: #fadb9d;
          padding: 0.15rem;
          border-radius: 0.08rem;
          .rocker {
            width: 100%;
            height: 100%;
            background: #ffffff;
            position: relative;
            padding-top: 0.85rem;
            .gray {
              text-align: center;
              color: #999999;
            }
            .egg {
              position: absolute;
              left: 50%;
              top: -0.4rem;
              margin-left: -0.685rem;
              width: 1.37rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .egg_sai {
              position: absolute;
              left: 50%;
              top: -0.49rem;
              margin-left: -1rem;
              width: 2rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .black {
              color: #333;
              font-size: 0.34rem;
              line-height: 1;
              text-align: center;
              font-weight: 600;
            }
            .yellow {
              margin-top: 0.14rem;
              color: #ff7900;
              font-size: 0.26rem;
              line-height: 1;
              text-align: center;
            }
            .btn {
              display: block;
              margin: 0.2rem auto;
              width: 1.8rem;
              height: 0.56rem;
              background: linear-gradient( 90deg,
              rgba(255, 226, 74, 1),
              rgba(255, 186, 68, 1));
              box-shadow: 0px 2px 4px 0px rgba(195, 0, 0, 0.5);
              border-radius: 0.42rem;
              line-height: 0.56rem;
              text-align: center;
              color: #f12926;
              font-weight: 600;
              font-size: 0.28rem;
            }
          }
        }
        .right {
          margin-right: 0.4rem;
          margin-bottom: 0.41rem;
          width: 3.25rem;
          height: 2.8rem;
          background: #fadb9d;
          padding: 0.15rem;
          border-radius: 0.08rem;
          .rocker {
            width: 100%;
            height: 100%;
            background: #ffffff;
            position: relative;
            padding-top: 0.85rem;
            .gray {
              text-align: center;
              color: #999999;
            }
            .egg {
              position: absolute;
              left: 50%;
              top: -0.4rem;
              margin-left: -0.685rem;
              width: 1.37rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .egg_coin {
              position: absolute;
              left: 50%;
              top: -0.41rem;
              margin-left: -0.775rem;
              width: 1.55rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .black {
              color: #333;
              font-size: 0.34rem;
              line-height: 1;
              text-align: center;
              font-weight: 600;
            }
            .yellow {
              margin-top: 0.14rem;
              color: #ff7900;
              font-size: 0.26rem;
              line-height: 1;
              text-align: center;
            }
            .btn {
              display: block;
              margin: 0.2rem auto;
              width: 1.8rem;
              height: 0.56rem;
              background: linear-gradient( 90deg,
              rgba(255, 226, 74, 1),
              rgba(255, 186, 68, 1));
              box-shadow: 0px 2px 4px 0px rgba(195, 0, 0, 0.5);
              border-radius: 0.42rem;
              line-height: 0.56rem;
              text-align: center;
              color: #f12926;
              font-weight: 600;
              font-size: 0.28rem;
            }
          }
        }
        .last {
          margin-bottom: 0;
        }
      }
    }
  }
</style>