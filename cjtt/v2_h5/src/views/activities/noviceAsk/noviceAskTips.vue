<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="详细介绍">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="noviceAskTips" v-show="!loading">
      <div class="main">
        <div class="con">
          <div class="tip">?</div>
          <div class="title">
            <div class="one">了解超级头条</div>
            <div class="two">仔细阅读下面的内容，便于您能回答对所有题目领取奖励开心(*￣︶￣)</div>
          </div>
          <div class="cjtt">
            <div class="sj"></div>
            <div class="sjtitle">什么是超级头条</div>
            <div class="sjmes">“超级头条”是一款汇聚实时资讯的APP。 通过APP本身的新闻资讯，随时了解中外实时报道和深度文章赏析，同时通过阅读新闻给您创造财富，让闲散时间变得有价值！</div>
          </div>
          <div class="cjtt">
            <div class="sj"></div>
            <div class="sjtitle">用户如何获取收益？</div>
            <div class="sjmes">只要您每天登陆超级头条，进行文章阅读，签到，开启宝箱，优质评论，参与各项活动， 均能获得金币奖励。另外邀请您的亲朋好友一起来体验超级头条，还可以额外获得现金红包和更多的金币奖励！
            </div>
          </div>
          <div class="cjtt">
            <div class="sj"></div>
            <div class="sjtitle">一金币等于多少人民币？</div>
            <div class="sjmes">超级头条是根据运营收益来与用户进行分成的，每天的运营收益都不一样，所以每天都会有一个兑换汇率产生。通常运营收益越好，金币价值越高，每日凌晨平台会按照当日的运营收益计算出当天的金币汇率，并按照金币汇率专车人民币存储到您的零钱里。</div>
          </div>
          <div class="cjtt">
            <div class="sj"></div>
            <div class="sjtitle">零钱如何提取？</div>
            <div class="sjmes">目前官方一共设定了三档提现，当您的零钱达到30元，50元，100元后，都可以在“金币兑换”窗口进行提现，温馨提示：您当前必须绑定一个支付宝账号才能进行提现活动。</div>
          </div>
          <div class="cjtt">
            <div class="sj"></div>
            <div class="sjtitle">为什么要收徒？</div>
            <div class="sjmes">邀请好友一起来体验超级头条，即收徒弟。收徒弟能让您的收益最快增长，。除了平台本身的活动奖励外，徒弟平常的阅读，将向您进贡一定的金币，徒弟越多，进贡的金币越多。</div>
          </div>
        </div>
      </div>
      <div class="tipsbtn">
        <div class="btn_w">
          <div class="btn_wri"></div>
        </div>
        <button class="btn">我已了解返回答题</button>
      </div>
    </div>
  </div>
</template>
<script>
import nvHead from "@/components/header.vue"
import nvLoading from "@/components/loading.vue"
import ajax from "@/assets/js/ajax"
import appcall from "@/assets/js/appcall"
  export default {
    name: 'noviceAskTips',
    data() {
      return {
        loading: false
      }
    },
    components: {
      nvHead,
      nvLoading,
    },
    created() {

    },
    async mounted() {},
    methods: {
    }
  }

</script>

<style lang="less" scoped>
@import '../../../assets/css/mixin';
  .main {
    padding: 0 .46rem;
    .con {
      width: 100%;
      height: auto;
      border-left: .04rem solid hsl(359, 97%, 76%);
      position: relative;
      padding: .58rem 0 .52rem .4rem;
      .tip {
        position: absolute;
        top: .64rem;
        left: -.27rem;
        width: .5rem;
        height: .5rem;
        border-radius: 50%;
        background-color: #d53c3e;
        color: #fff;
        text-align: center;
        line-height: .5rem;
        font-size: .35rem;
      }
      .title {
        .one {
          font-size: .4rem;
          color: #d53c3e;
        }
        .two {
          color: #59c1bd;
          font-size: .3rem;
          margin-top: .43rem;
        }
      }
      .cjtt {
        margin-top: .52rem;
        .sj {
          display: inline-block;
          width: 0;
          height: 0;
          border-left: .13rem solid transparent;
          border-right: .13rem solid transparent;
          border-top: .26rem solid #666666;
        }
        .sjtitle {
          font-size: .34rem;
          color: #333333;
          display: inline-block;
          margin-left: .2rem;
        }
        .sjmes {
          font-size: .3rem;
          color: #999999;
          margin-top: .41rem;
        }
      }
    }
  }

  .tipsbtn {
    height: 1.4rem;
    width: 100%;
    border-top: .2rem solid #f4f4f4;
    padding: .22rem 0;
    margin-bottom: .22rem;
    position: relative;
    .btn_w {
      position: absolute;
      width: 4.2rem;
      height: .04rem;
      background-color: #fff;
      left: 50%;
      margin-left: -2.1rem;
      margin-top: .05rem;
      border-radius: .04rem;
      z-index: 1;
      .btn_wri {
        width: .1rem;
        height: .04rem;
        background-color: #60f6f0;
        margin-left: 4rem;
      }
    }
    .btn {
      width: 6.57rem;
      height: .88rem;
      border-radius: .88rem;
      box-shadow: 0 .09rem #2cb2ad;
      background: linear-gradient(to bottom, #60f6f0, #17c9c3);
      display: block;
      margin: 0 auto;
      color: #fff;
      font-size: .36rem;
      &:active {
        transform: scale(0.98);
      }
    }
  }

</style>
