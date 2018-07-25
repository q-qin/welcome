<template>
  <div class="income">
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="incomeBillsV120" v-show="!loading">
      <a class="goBack" @click="goBack"></a>
      <div class="top">
        <span class="title">我的钱包</span>
        <span class="balanceTip">零钱余额（元）</span>
        <!-- <span class="balance">{{balance | currency('')}}</span> -->
        <span class="balance" ref="balance"></span>
        <button class="right withdraw" @click="jump('withdraw','提现')">提现</button>
      </div>
      <div class="middle">
        <div class="income">
          <ul class="clear">
            <li class="left table">
              <span class="table-cell">{{user.yesterday_cash}}</span>
              <span class="table-cell">昨日收入(元)</span>
            </li>
            <li class="left table">
              <span class="table-cell">{{user.balance_coin}}</span>
              <span class="table-cell">今日金币</span>
            </li>
          </ul>
        </div>
        <div class="desc1">
          每日24点金币自动结算成零钱
        </div>
        <div class="desc2">
          金币转换率受每日广告收益影响（上下会有浮动）
        </div>
        <div class="ad">
          <div id="hancr_003" class="baidu" v-if="thirdArr.length!=0">
          </div>
          <swiper :options="swiperOption" ref="mySwiper" v-if="eiaiUrl.length!=0 || urlList.length!=0">
            <!-- slides -->
            <swiper-slide v-for="(item,$index) in eiaiUrl" :key="$index" v-if="eiaiUrl.length!=0">
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
      </div>
      <div class="list">
        <ul>
          <li class="title">
            收入明细（3天内）
          </li>
          <li v-for="(item,$index) in list" :key="$index" @click="jumpRedeemDetail(item.order_code)">
            <div class="content">
              <p class="from">{{item.task_name}}</p>
              <p class="time">{{item.addtime}}</p>
            </div>
            <div class="right cash">
              {{item.type==2?'':'+'}}{{item.amount}}
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom" v-show="!iospedding">
        <ul>
          <li class="left rank" @click="jump('rank','排行榜')">
            <i class="iconfont">&#xe66f;</i>收入排行榜
          </li>
          <li class="left share" @click="jump('shai','晒收入')">
            <div class="wechat">
              <i class="iconfont">&#xe624;</i>
            </div>
            <div class="shai">
              <p class="incomes">晒收入（{{user.accumulate_cash | decimal}}元)</p>
              <p>每天分享可获得500金币</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
require("swiper/dist/css/swiper.css");
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";
import pagers from "@/assets/js/pagers";
import CountUp from "countup.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "incomeBills",
  data() {
    return {
      loading: true,
      iospedding:false,
      user: {},
      list: [],
      urlList: [],
      eiaiUrl: [],
      OriginalData:[],
      thirdArr:[],
      swiperOption: {
        loop: false,
        pagination: ".swiper-pagination",
        paginationClickable: false,
        autoplay: 3000
      }
    };
  },
  components: {
    nvHead,
    nvLoading,
    swiper,
    swiperSlide
  },
  async created() {
    // ios 提审状态
    this.iospedding = await appcall.getReviewStatus();

    this.$Progress.start();
    this.init();
    this.adType();
    appcall.hideNavBar();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    window.afterPullDown = () => {
      appcall.hideNavBar();
    };
  },
  methods: {
    /**
     * 返回
     */
    goBack() {
      appcall.goBack();
    },
    /**
     * 页面初期化
     */
    async init() {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/account/income_lists",
        comm,
        params
      );
      this.$Progress.finish();
      if (rs && rs.code === 1001 && rs.data) {
        this.loading = false;
        this.user = rs.data.user;
        this.list = rs.data.list;
        new CountUp( this.$refs.balance,0,this.user.balance_cash,2,1).start();
      } else if (rs && rs.code == 1005) {
        this.loading = false;
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.loading = false;
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
        this.$apiurl + "/carousel/income_banners",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.OriginalData = rs.data.list;
        this.adChoose(rs.data.list);
      }else if(rs.code === 1008){
        
      }  else {
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
        this.thirdArr = thirdArr
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
            setTimeout(()=>{
              BAIDU_CLB_fillSlotAsync(item.slot_id, "hancr_003");
            },1000)
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
    },
    /**
     * 跳转
     */
    jump(type,position) {
      if(!!position){_hmt.push(['_trackEvent', 'incomeBills', 'click', position])}
      switch (type) {
        case "withdraw":
          appcall.navigator({
            title: "我要提现",
            url: this.$h5url + pagers[this.$currVer].redeem,
            type: "tixian"
          });
          break;
        case "rank":
          appcall.navigator({
            title: "收入排行榜",
            url: this.$h5url + pagers[this.$currVer].ranking
          });
          break;
        case "shai":
          appcall.navigator({
            title: "晒收入",
            url: this.$h5url + pagers[this.$currVer].shareIncome
          });
          break;
      }
    },
    /**
     * 跳转兑换详情
     */
    jumpRedeemDetail(ordercode) {
      if (ordercode) {
        appcall.navigator({
          title: "提现详情",
          url: this.$h5url + pagers[this.$currVer].redeemDetail + ordercode
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.incomeBillsV120 {
  background: #f8f8f8;
  position: relative;
  margin-bottom: 1.12rem;
  .goBack {
    position: absolute; // top:.25rem;
    // left:.3rem;
    // margin: .25rem  0 0 .3rem;
    display: block;
    .wh(0.52rem, 1.2rem);
    .background("ico_goBack.png");
    background-position: 0.3rem 0.55rem;
    background-size: 0.22rem, 0.38rem;
    line-height: 1rem;
  }
  .top {
    height: 4.6rem;
    padding-top: .3rem;
    .background("incomeBills/top_bg.png");
    .title {
      display: block;
      text-align: center;
      color: #fff;
      font-size: 0.36rem;
      line-height: 0.88rem;
      font-weight: bold;
    }
    .balanceTip {
      display: block;
      font-size: 0.28rem;
      color: #fff;
      margin: 0.52rem 0 0 0.4rem;
      line-height: 1;
    }
    .balance {
      display: inline-block;
      font-size: 0.8rem;
      color: #fff;
      margin: 0.2rem 0 0 0.4rem;
      line-height: 1;
      font-weight: bold;
    }
    .withdraw {
      .wh( 2.2rem,0.8rem);
      .lineheight(.8rem);
      background: #fff;
      border-radius: 0.42rem;
      margin: 0.2rem 0.4rem 0 0;
      color: #f12926;
      font-size: 0.32rem;
    }
  }
  .middle {
    // height: 1.9rem;
    padding: 1rem 0 0.3rem;
    background: #fff;
    position: relative;
    .income {
      position: absolute;
      width: 6.9rem;
      height: 1.4rem;
      border-radius: 0.08rem;
      background: #fff;
      box-shadow: 0 0.02rem 0.1rem 0 rgba(191, 0, 23, 0.1);
      margin: auto;
      top: -0.7rem;
      left: 0;
      right: 0;
      ul li {
        width: 50%;
        &:first-child {
          position: relative;
          &:after {
            content: "";
            width: 1px;
            height: 0.8rem;
            background: #ececec;
            display: block;
            position: absolute;
            right: 0;
            top: 0.3rem;
          }
        }
        span {
          width: 100%;
          display: block;
          font-size: 0.24rem;
          color: #999;
          &:first-child {
            font-size: 0.32rem;
            color: #333;
            padding: 0.35rem 0 0.15rem;
            font-weight: bold;
          }
        }
      }
    }
    .desc1 {
      font-size: 0.24rem;
      color: #ff7900;
      width: 100%;
      display: block;
      text-align: center;
      line-height: 1;
    }
    .desc2 {
      font-size: 0.24rem;
      color: #999;
      width: 100%;
      display: block;
      text-align: center;
      margin-top: 0.14rem;
      line-height: 1;
    }
    .ad {
      margin: 0.3rem auto 0;
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
      .baidu{
      width: 100%;
      height: 1.4rem;
    }
    }
  }
  .list {
    background: #fff;
    margin: 0.2rem auto 0;
    ul li {
      height: 1.2rem;
      margin: 0 0 0 0.3rem;
      border-bottom: 1px solid #ececec;
      &.title {
        height: 0.84rem;
        line-height: 0.84rem;
        font-size: 0.24rem;
        color: #666;
        padding-left: 0.3rem;
        margin: 0;
      }
      .content {
        display: inline-block;
        height: 1.2rem;
        .from {
          line-height: 1;
          padding: 0.26rem 0 0.18rem;
          font-size: 0.3rem;
          color: #333;
        }
        .time {
          line-height: 1;
          color: #999;
          font-size: 0.22rem;
        }
      }
      .cash {
        display: inline-block;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.3rem;
        color: #333;
        padding-right: 0.3rem;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 1.12rem;
    position: fixed;
    bottom: 0;
    box-shadow: 0 -0.04rem 0.1rem 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    z-index: 1;
    ul li {
      &.rank {
        width: 3rem;
        line-height: 1.12rem;
        font-size: 0.32rem;
        text-align: center;
        color: #f12926;
        .iconfont {
          font-size: 0.32rem;
          margin-right: 0.14rem;
        }
      }
      &.share {
        width: 4.5rem;
        height: 1.12rem;
        background: linear-gradient(90deg, #ff794b, #f12926);
        .wechat {
          display: inline-block;
          line-height: 1.12rem;
          margin: 0 0.14rem 0 0.54rem;
          .iconfont {
            font-size: 0.48rem;
            color: #fff;
          }
        }
        .shai {
          height: 1.12rem;
          display: inline-block;
          vertical-align: top;
          p {
            font-size: 0.24rem;
            color: rgba(255, 255, 255, 0.6);
          }
          .incomes {
            font-size: 0.32rem;
            color: #fff;
            line-height: 1;
            margin: 0.23rem auto 0.1rem;
          }
        }
      }
    }
  }
}
</style>