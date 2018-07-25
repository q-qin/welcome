<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="新手答题">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="noviceAsk" v-show="!loading">
      <div class="main">
        <div class="con">
          <div class="tip">1</div>
          <div class="title">
            <div class="one">什么是超级头条？</div>
            <div class="two">
              <fieldset tabindex="1" class='radioGroup'>
                <input id='g1o1_1' name="group1_1" value="g1o1_1" type="radio">
                <label for='g1o1_1'>咨询阅读软件</label>
                <input id='g1o1_2' name="group1_1" value="g1o1_2" type="radio">
                <label for='g1o1_2'>社交工具</label>
                <input id='g1o1_3' name="group1_1" value="g1o1_3" type="radio">
                <label for='g1o1_3'>赚钱软件</label>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="con">
          <div class="tip">2</div>
          <div class="title">
            <div class="one">超级头条为什么给用户发钱?</div>
            <div class="two">
              <fieldset tabindex="2" class='radioGroup'>
                <input id='g1o2_1' name="group2_1" value="option1" type="radio">
                <label for='g1o2_1'>宣传噱头</label>
                <input id='g1o2_2' name="group2_1" value="option2" type="radio">
                <label for='g1o2_2'>有钱任性</label>
                <input id='g1o2_3' name="group2_1" value="option3" type="radio">
                <label for='g1o2_3'>收益分成</label>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="con">
          <div class="tip">3</div>
          <div class="title">
            <div class="one">用户如何获取收益？</div>
            <div class="two">
              <fieldset tabindex="3" class='radioGroup'>
                <input id='g1o3_1' name="g1o3_1" value="g1o3_1" type="radio">
                <label for='g1o3_1'>阅读咨询、收徒</label>
                <input id='g1o3_2' name="g1o3_1" value="g1o3_2" type="radio">
                <label for='g1o3_2'>好好学习</label>
                <input id='g1o3_3' name="g1o3_1" value="g1o3_3" type="radio">
                <label for='g1o3_3'>我不知道</label>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="con">
          <div class="tip">4</div>
          <div class="title">
            <div class="one">邀请好友有什么好处</div>
            <div class="two">
              <fieldset tabindex="4" class='radioGroup'>
                <input id='g1o4_1' name="g1o4_1" value="g1o4_1" type="radio">
                <label for='g1o4_1'>为了炫耀</label>
                <input id='g1o4_2' name="g1o4_1" value="g1o4_2" type="radio">
                <label for='g1o4_2'>收益暴涨</label>
                <input id='g1o4_3' name="g1o4_1" value="g1o4_3" type="radio">
                <label for='g1o4_3'>我不知道</label>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="con">
          <div class="tip">5</div>
          <div class="mengceng"></div>
          <div class="title">
            <div class="one">金币汇率受到什么影响</div>
            <div class="two">
              <fieldset tabindex="5" class='radioGroup'>
                <input id='g1o5_1' name="g1o5_1" value="g1o5_1" type="radio">
                <label for='g1o5_1'>阅读内容</label>
                <input id='g1o5_2' name="g1o5_1" value="g1o5_2" type="radio">
                <label for='g1o5_2'>平台收益</label>
                <input id='g1o5_3' name="g1o5_1" value="g1o5_3" type="radio">
                <label for='g1o5_3'>老板心情</label>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <div class="state">
        <div class="task table">
          <i class="table-cell graduate"></i>
          <span class="table-cell gold">恭喜！11111111111111111111</span>
        </div>
      </div>
      <div class="tipsbtn" v-show="false">
        <div class="btn_w">
          <div class="btn_wri"></div>
        </div>
        <button class="btn">确定
          <br>
          <span>(点击跳转在咨询首页)</span>
        </button>
      </div>
      <div class="twobtn" v-show="true">
        <div class="tipsbtn clearfix">
          <div class="btn_w">
            <div class="btn_wri1"></div>
          </div>
          <button class="btn1" @click="ckgl">查看攻略了解超级头条
          </button>
        </div>
        <div class="tipsbtn clearfix">
          <div class="btn_w">
            <div class="btn_wri"></div>
          </div>
          <button class="btn">回答完毕并提交</button>
        </div>
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
    name: 'noviceAsk',
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
      ckgl() {
        this.$router.push('/noviceAskTips');
      }
    }
  }

</script>

<style lang="less" scoped>
@import '../../../assets/css/mixin';
  .main {
    padding: .5rem .46rem 0;
    .con {
      width: 100%;
      height: 1.34;
      border-left: .04rem solid hsl(359, 97%, 76%);
      position: relative;
      padding: 0rem 0 .52rem .4rem;
      .mengceng {
        background-color: #fff; // opacity: 0;
        width: .3rem;
        height: 1.8rem;
        position: absolute;
        left: -.21rem;
        bottom: 0;
        z-index: 2;
      }
      .tip {
        position: absolute;
        top: 0;
        left: -.27rem;
        width: .46rem;
        height: .46rem;
        border-radius: 50%;
        background-color: #d53c3e;
        color: #fff;
        text-align: center;
        line-height: .46rem;
        font-size: .22rem;
        z-index: 3;
      }
      .title {
        .one {
          font-size: .38rem;
          color: #333;
          vertical-align: text-top;
        }
        .two {
          margin-top: .62rem;
          font-size: .28rem;
          color: #999999;
          fieldset {
            width: 100%;
            height: .4rem;
            border: 0;
            position: relative;
            margin: 0;
            padding: 0;
            outline: none;
            input {
              display: none;
            }
            label {
              position: relative;
              padding-left: .56rem; // margin-left: .25rem;
            }
            label::before,
            label::after {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              margin: auto;
              width: .36rem;
              height: .36rem;
              border-radius: 50%;
            }
            label::before {
              box-shadow: 0 0 0 .02rem #aaaaaa inset;
              -webkit-box-shadow: 0 0 0 .02rem #aaaaaa inset;
              -ms-box-shadow: 0 0 0 .02rem #aaaaaa inset;
              -o-box-shadow: 0 0 0 .02rem #aaaaaa inset;
            }
            label::after {
              position: absolute;
              background: #d53c3e;
              opacity: .2;
              -webkit-transform: scale(0);
              -ms-transform: scale(0);
              -o-transform: scale(0);
              transform: scale(0);
              -webkit-transition: .2s;
              -o-transition: .2s;
              transition: .2s;
            }
            input:checked+label::after {
              -webkit-transform: scale(.7);
              -ms-transform: scale(.7);
              -o-transform: scale(.7);
              transform: scale(.7);
              opacity: 1;
            }
          }
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

  .state {
    margin: 0 auto;
    text-align: center;
    font-size: .3rem;
    .task {
      line-height: .6rem;
      margin: 0 auto;
      width: auto;
      .graduate {
        .background('activities/xsdt_hd.png');
        width: .4rem;
        height: .4rem;
      }
      .gold {
        color: #d53c3e;
        font-size: .3rem;
        padding-left: .2rem;
      }
    }
  }

  .tipsbtn {
    height: 1.4rem;
    width: 100%;
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
        background-color: #fd7577;
        margin-left: 4rem;
      }
    }
    .btn {
      width: 6.57rem;
      height: .88rem;
      border-radius: .88rem;
      box-shadow: 0 .09rem #d53c3e;
      background: linear-gradient(to bottom, #fd7577, #fa5456);
      display: block;
      margin: 0 auto;
      color: #fff;
      line-height: .3rem;
      font-size: .32rem;
      padding-top: 0.1rem;
      &:active {
        transform: scale(0.98);
      }
      span {
        font-size: .24rem;
        color: #fff;
      }
    }
  }

  .twobtn {
    .tipsbtn {
      height: 1.4rem;
      width: 50%;
      padding: .22rem 0;
      margin-bottom: .22rem;
      position: relative;
      float: left;
      .btn_w {
        position: absolute;
        width: 2.25rem;
        height: .04rem;
        background-color: #fff;
        left: 50%;
        margin-left: -1.25rem;
        margin-top: .05rem;
        border-radius: .04rem;
        z-index: 1;
        .btn_wri {
          width: .1rem;
          height: .04rem;
          background-color: #fd7577;
          margin-left: 2rem;
        }
        .btn_wri1 {
          width: .1rem;
          height: .04rem;
          background-color: #60f6f0;
          margin-left: 2rem;
        }
      }
      .btn {
        width: 3.49rem;
        height: .88rem;
        border-radius: .88rem;
        box-shadow: 0 .09rem #d53c3e;
        background: linear-gradient(to bottom, #fd7577, #fa5456);
        display: block;
        margin: 0 auto;
        color: #fff;
        line-height: .3rem;
        font-size: .32rem;
        padding-top: 0.1rem;
        &:active {
          transform: scale(0.98);
        }
      }
      .btn1 {
        width: 3.49rem;
        height: .88rem;
        border-radius: .88rem;
        box-shadow: 0 .09rem #2cb2ad;
        background: linear-gradient(to bottom, #60f6f0, #19cbc4);
        display: block;
        margin: 0 auto;
        color: #fff;
        line-height: .3rem;
        font-size: .32rem;
        padding-top: 0.1rem;
        &:active {
          transform: scale(0.98);
        }
      }
    }
  }

</style>
