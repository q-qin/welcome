<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="faq" v-show="!loading">
        <header @click="faqVideo" v-if="!iospedding">
          <img src="../../../assets/images/faq_herf.png">
        </header>
        <ul class="faq_nav clear">
        <li :class="{active:changeRed == 1}" @click="change(1)">
          <a>新手问题</a>
        </li>
        <li :class="{active:changeRed == 2}" @click="change(2)" v-if="!iospedding">
          <a>金币问题</a>
        </li>
        <li :class="{active:changeRed == 3}" @click="change(3)" v-if="!iospedding">
          <a>收徒问题</a>
        </li>
        <li :class="{active:changeRed == 4}" @click="change(4)">
          <a>提现问题</a>
        </li>
        <li :class="{active:changeRed == 5}" @click="change(5)">
          <a>账号问题</a>
        </li>
      </ul>
      <div class="faq_content">
        <div class="title" id="id1">
          新手问题
        </div>
        <ul class="items">
          <li v-for="(item,$index) in faq_new" v-if="(item.iosshow && isios)||!isios" :key="$index">
            <div class="ask" @click="toggle(1,$event,$index)">
              {{item.ask}}
              <i class="iconfont" :class="{'down':!item.show,'up':item.show}">&#xe6a6;</i>
            </div>
            <div class="answer" v-show="item.show " v-html="item.answer">
            </div>
          </li>
        </ul>
        <template v-if="!iospedding">
          <div class="title" id="id2">
            金币问题
          </div>
          <ul class="items">
            <li v-for="(item,$index) in faq_score" v-if="(item.iosshow && isios)||!isios" :key="$index">
              <div class="ask" @click="toggle(2,$event,$index)">
                {{item.ask}}
                <i class="iconfont" :class="{'down':!item.show,'up':item.show}">&#xe6a6;</i>
              </div>
              <div class="answer" v-show="item.show " v-html="item.answer">
              </div>
            </li>
          </ul>
          <div class="title" id="id3">
            收徒问题
          </div>
          <ul class="items">
            <li v-for="(item,$index) in faq_invite" v-if="(item.iosshow && isios)||!isios" :key="$index">
              <div class="ask" @click="toggle(3,$event,$index)">
                {{item.ask}}
                <i class="iconfont" :class="{'down':!item.show,'up':item.show}">&#xe6a6;</i>
              </div>
              <div class="answer" v-show="item.show" v-html="item.answer">
              </div>
            </li>
          </ul>
        </template>
        <div class="title" id="id4">
          提现问题
        </div>
        <ul class="items">
          <li v-for="(item,$index) in faq_tixian" v-if="(item.iosshow && isios)||!isios" :key="$index">
            <div class="ask" @click="toggle(4,$event,$index)">
              {{item.ask}}
              <i class="iconfont" :class="{'down':!item.show,'up':item.show}">&#xe6a6;</i>
            </div>
            <div class="answer" v-show="item.show" v-html="item.answer">
            </div>
          </li>
        </ul>
        <div class="title" id="id5">
          帐号问题
        </div>
        <ul class="items">
          <li v-for="(item,$index) in faq_account" v-if="(item.iosshow && isios)||!isios" :key="$index">
            <div class="ask" @click="toggle(5,$event,$index)">
              {{item.ask}}
              <i class="iconfont" :class="{'down':!item.show,'up':item.show}">&#xe6a6;</i>
            </div>
            <div class="answer" v-show="item.show" v-html="item.answer">
            </div>
          </li>
        </ul>
      </div>
      <div class="faq_officialService" @click="Alert" v-show="OSshow">
        <img src="../../../assets/images/gfkf.png">
      </div>
    </div>
  </div>
</template>

<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import appcall from "@/assets/js/appcall";
import ajax from "@/assets/js/ajax";

export default {
  name: "faq",
  components: {
    nvLoading,
    nvHead
  },
  data() {
    return {
      loading: true,
      isios: false,
      iospedding: false,
      changeRed: 0,
      OSshow: true, //1
      weqq: "微信",
      weNum: "",
      faq_new: [
        {
          ask: "1.超级头条是什么？",
          answer:
            "平台致力于打造一款新形式的资讯阅读软件，以移动应用为载体进行内容创作、资讯阅读、提供更多有用有趣有益的内容给大家。",
          show: false,
          iosshow: true
        },
        {
          ask: "2.邀请好友的好处？",
          answer:
            "邀请好友能让您的收益迅速增加，现在邀请好友在该平台进行注册，每邀请一位有效好友奖励41660金币，首次邀请好友还额外奖励1元红包哦~，满足平台提现规则后方可进行申请提现。邀请好友越多，收益越多。",
          show: false,
          iosshow: true
        },
        {
          ask: "3.超级头条为什么会给你奖励？",
          answer:
            "为了引领全民阅读，帮助大家养成良好的阅读习惯，在阅读资讯的过程中，平台将给予一定的金币奖励！而奖励的金币可以兑换红包或者商品，让您在阅读的过程中不仅增长见识，而且还能有所收益！",
          show: false,
          iosshow: true
        }
      ],
      faq_score: [
        {
          ask: "1.金币是什么？",
          answer:
            "金币是超级头条产品里面的货币单位之一。当天所获得的金币会在次日凌晨自动转换为零钱，并累计到您的超级头条零钱账户中。",
          show: false,
          iosshow: true
        },
        {
          ask: "2.金币如何转换成零钱？",
          answer:
            "零钱=昨日金币*昨日汇率/1000,这里有个汇率的概念，汇率值与平台运营收益有关。因平台的运营收益不相同，汇率也会受影响上下浮动，每日凌晨会通过系统消息公告昨日的汇率及您的收益情况。",
          show: false,
          iosshow: true
        },
        {
          ask: "3.一金币等于多少人民币？",
          answer:
            "一个金币等于多少人民币不固定，通常情况下，超级头条的运营收益越高，金币价值越高，具体以次日转换为准。",
          show: false,
          iosshow: true
        },
        {
          ask: "4.为什么阅读了资讯没有金币？",
          answer:
            "为了鼓励大家认真阅读，阅读资讯会有一定机率获得金币奖励，并不是每次阅读都有奖励！这与您平常的阅读习惯有关，例如短时间内快速频率浏览资讯、资讯没有看完、随意滚屏等，获得金币的机率就很低，请以平常心去阅读您感兴趣的资讯内容。",
          show: false,
          iosshow: true
        },
        {
          ask: "5.签到奖励？",
          answer:
            "签到奖励：每日签到是给新老用户的福利！第一天50金币、第二天100金币、第三天100金币、第四天888金币、第五天150金币、第六天200金币、第七天2888金币。",
          show: false,
          iosshow: true
        }
      ],
      faq_invite: [
        {
          ask: "1.如何收徒？",
          answer:
            "在“我的”页面-->“邀请好友”一栏，通过微信朋友或者朋友圈分享给好友，好友通过您分享的海报或者链接进行注册即可成为您的好友，在好友列表中可以查看。",
          show: false,
          iosshow: true
        },
        {
          ask: "2.收徒奖励的5元如何获得？",
          answer:
            '如图：<br><img src="' +
            require("../../../assets/images/faq_coin.png") +
            '" width="100%" />',
          show: false,
          iosshow: true
        },
        {
          ask: "3.徒弟阅读有金币，师傅没有收到进贡？",
          answer:
            "平台对于进贡机制管理非常严格，对阅读质量要求更高，只有当徒弟的阅读对平台产生价值的情况下才会有进贡奖励，因此徒弟的阅读有一部分没有进贡也是正常的。",
          show: false,
          iosshow: true
        },
        {
          ask: "4.分享出去的收徒海报好友看不到？",
          answer:
            "如果您分享海报后好友看不到，请重新分享一次给好友，最新的可以正常看到。（如果多次尝试失败，您可以在“我的”页面通过【在线客服】获得帮助）。",
          show: false,
          iosshow: true
        }
      ],
      faq_tixian: [
        {
          ask: "1.如何支付宝提现？",
          answer:
            "当您的零钱达到30元，即可进入“我的”页面-->“兑换提现”一栏，点击进入后可以看到支付宝100/50/30元红包（选择前请再三确认提现支付宝仍在正常使用）。",
          show: false,
          iosshow: true
        },
        {
          ask: "2.提现多久能到账？",
          answer:
            "提现申请提交后，次日开始计算2个工作日内处理完成（双休日、节假日顺延）。",
          show: false,
          iosshow: true
        }
      ],
      faq_account: [
        {
          ask: "1.密码忘记了怎么办？",
          answer:
            "在超级头条登录页面下方有一个“找回密码”，可以点击进入按照提示操作，重置您的密码。",
          show: false,
          iosshow: true
        },
        {
          ask: "2.如何绑定支付宝？",
          answer:
            "在“我的”页面-->点击头像进入“个人设置”-->“管理支付宝”页面，按照提示填写即可完成。",
          show: false,
          iosshow: true
        },
        {
          ask: "3. 违规说明：",
          answer:
            "（1）在超级头条APP资讯或者视频评论区域恶意评论；<br>（2）利用同一部手机（同一设备）登录多个账号刷金币；<br>（3）利用软件刷好友，刷金币；<br>以上都属于违规操作，请大家不要尝试，一经发现，会影响您的提现审核，严重者将会被封号；",
          show: false,
          iosshow: true
        }
      ]
    };
  },
  async created() {
    this.$Progress.start();
    if (JKEventHandler.browser().ios) {
      this.isios = true;
      // this.OSshow = false;
    }
    // ios 提审状态
    this.iospedding = await appcall.getReviewStatus();

    if (this.iospedding) {
      this.faq_new[1].iosshow = false;
      this.faq_new[2].iosshow = false;
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      this.$Progress.finish();
    });
  },
  methods: {
    toggle(type, event, index) {
      switch (type) {
        case 1: // 新人问题
          this.faq_new[index].show = !this.faq_new[index].show;
          break;
        case 2: // 金币问题
          this.faq_score[index].show = !this.faq_score[index].show;
          break;
        case 3: // 邀请好友问题
          this.faq_invite[index].show = !this.faq_invite[index].show;
          break;
        case 4: // 提现问题
          this.faq_tixian[index].show = !this.faq_tixian[index].show;
          break;
        case 5: // 账号问题
          this.faq_account[index].show = !this.faq_account[index].show;
          break;
      }
    },
    // 发送微信号点击次数
    async postWeChatNumber(value) {
      let params = {
        wechat_name: value
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/wechatcustomer/add_wechat_click_times",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
      } else {
        this.$alert(rs.msg);
      }
    },
    //客服弹窗
    async Alert() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/wechatcustomer/get_wechat_customer_service",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        if (rs.data.wechat_name.length == 0) {
          this.weqq = "QQ";
          this.weNum = "426335928";
        } else {
          this.weNum = rs.data.wechat_name;
        }

        this.$confirm(
          '<div style="background:url(' +
            require("../../../assets/images/wxchop.png") +
            ') no-repeat right bottom;background-size:2.1rem 1.6rem;padding-bottom:.75rem;"><div style="color:#333">加官方微信客服</div><div style="color:#fb2926;font-size:0.4rem;font-weight:bold;">' +
            this.weNum +
            '</div><div style="color:#333">为您详细解答疑问</div><div>',
          "温馨提示",
          {
            confirmButtonText: "打开微信"
          }
        ).then(
          ok => {
            appcall.openWechat({
              wechat_No: this.weNum === "426335928" ? "" : this.weNum
            });
            this.postWeChatNumber(this.weNum);
          },
          no => {}
        );
      } else {
        this.$alert(rs.msg);
      }
    },
    faqVideo() {
      this.$router.push("/faqVideo");
    },
    change(index) {
      this.changeRed = index;
      var anchor = this.$el.querySelector("#id" + index);
      document.documentElement.scrollTop = document.body.scrollTop =
        anchor.offsetTop -
        3.3 * parseInt(document.documentElement.style.fontSize);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin";
.faq {
  header {
    height: 1.2rem;
    width: 100%;
    z-index: 1;
    position: fixed;
    top: 0;
    background: #fff;
    img {
      height: 1.2rem;
      width: 100%;
      text-align: center;
    }
  }
  .faq_nav {
    width: 100%;
    height: 2.1rem;
    .border(#eee,bottom);
    padding-bottom: 0.3rem;
    background: #fff;
    z-index: 1;
    position: fixed;
    top: 1.2rem;
    box-shadow:.02rem .02rem 0.05rem #eee;
    li {
      float: left;
      width: 1.8rem;
      line-height: 0.6rem;
      text-align: center;
      font-size: 0.24rem;
      margin: 0.3rem 0.34rem auto;
      border-radius: 0.6rem;
      background: #fff;
      .border(#dddddd);
    }
    .active {
      background: #d53c3e;
      .border(#d53c3e);
      a {
        color: #fff;
      }
    }
  }
  .faq_content {
    margin-top: 3.3rem;
    .title {
      padding: 0.3rem;
      color: @mcolor;
      font-size: 0.3rem;
      line-height: 1;
      .border(#eee,bottom);
    }
    .items {
      .border(#eee,bottom);
      li {
      .border(#eee,top);
        &:first-child {
          border-top: 0;
        }
      }
      .ask {
        padding: 0.3rem;
        font-size: 0.34rem;
        line-height: 0.4rem;
        color: #333;
        padding-right: 1rem;
        position: relative;
        &.im {
          color: #59c1bd;
        }
        .iconfont {
          position: absolute;
          bottom: 0.3rem;
          right: 0.3rem;
          font-size: 0.34rem;
          line-height: 0.4rem;
          color: #bbb;
          transition: 0.5s transform;
          &.up {
            transform: rotate(180deg);
          }
        }
        &:active {
          background: #eee;
        }
      }
      .answer {
        padding: 0.3rem;
        .border(#eee,top);
        font-size: 0.3rem;
        line-height: 0.48rem;
        color: #666;
        background: #fff;
      }
      .video {
        color: #59c1bd;
      }
    }
    .online {
      font-size: 0.4rem;
      display: block;
      color: #666;
      width: 4.5rem;
      height: 0.9rem;
      margin: 0.35rem auto;
      background: #f5f5f5;
      .border(#bbb);
      border-radius: 0.9rem;
      font-size: #bbb;
      text-align: center;
      text-indent: -0.15rem;
      img {
        width: 0.6rem;
        display: inline-block;
        vertical-align: -0.15rem;
        margin-right: 0.3rem;
      }
    }
  }
  .faq_officialService {
    height: 1.91rem;
    width: 1.37rem;
    position: fixed;
    right: 0.34rem;
    bottom: 0.6rem;
    z-index: 1;
    img {
      height: 1.91rem;
      width: 1.37rem;
    }
  }
}
</style>
