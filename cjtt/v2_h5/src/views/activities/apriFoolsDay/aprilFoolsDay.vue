<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="愚人节活动">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="apriFoolsDay" v-show="!loading">
      <div class="apriFoolsDay_swiper">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,$index) in posters" :key="$index">
            <div class="poster">
              <img :src="item.src" height="100%" :style="item.icstyle" class="swiperImg">
            </div>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="apriFoolsDay_input">
        <div class="inputNameFirst" v-show="inputShow">
          <input :placeholder="placeholder" v-model="param1" maxlength="4">
        </div>
        <div class="inputNameTwo clear" v-show="!inputShow">
          <span class="inputNameSub left">
            <input :placeholder="placeholder" v-model="param1" maxlength="4">
          </span>
          <span class="inputNameSub right">
            <input placeholder="姓名：请输入姓名" v-model="param2" maxlength="4">
          </span>
        </div>
        <div class="inputNameCheck" v-show="radioShow">
          <label class="demo--label">
            <input class="demo--radio" type="radio" name="demo-radio" checked value="男" v-model="gender">
            <span class="demo--radioInput"></span>男
          </label>
          <label class="demo--label">
            <input class="demo--radio" type="radio" name="demo-radio" value="女" v-model="gender">
            <span class="demo--radioInput"></span>女
          </label>
        </div>
      </div>
      <div class="apriFoolsDay_share">
        <span class="btn" @click="handle">{{pushButton}}</span>
      </div>
      <transition name="fade">
        <div class="errMsg">{{message}}</div>
      </transition>
      <img>
    </div>
  </div>
</template>
<script>
require("swiper/dist/css/swiper.css");
import { swiper, swiperSlide } from "vue-awesome-swiper";
import nvHead from "@/components/header.vue"
import nvLoading from "@/components/loading.vue"
import ajax from "@/assets/js/ajax"
import appcall from "@/assets/js/appcall"
export default {
  name: "apriFoolsDay",
  data() {
    return {
      loading: true,
      iospedding: false,
      pushButton: "领取罚单",
      inputShow: true,
      radioShow: false,
      placeholder: "姓名：请输入姓名",
      posterIndex: 1,
      param1: "",
      param2: "",
      message: "",
      gender: "男",
      swiperOption: {
        loop: true,
        grabCursor: true,
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        observeParents: true,
        onSlideChangeEnd: swiper => {
          this.posterIndex = swiper.realIndex + 1;
          this.PushButton(this.posterIndex);
          this.param1 = "";
          this.param2 = "";
          this.gender = "";
        }
      },
      posters: [
        {
          src: require("@/assets/images/aprifools/fool_11.png"),
          icstyle: "top:0rem;height:7.56rem"
        },
        {
          src: require("@/assets/images/aprifools/fool_2.jpg"),
          icstyle: "top:1.12rem"
        },
        {
          src: require("@/assets/images/aprifools/fool_3.jpg"),
          icstyle: "top:.24rem"
        },
        {
          src: require("@/assets/images/aprifools/fool_4.jpg"),
          icstyle: "top:0rem;height:7.56rem"
        },
        {
          src: require("@/assets/images/aprifools/fool_5.jpg"),
          icstyle: "top:1.78rem"
        },
        {
          src: require("@/assets/images/aprifools/fool_6.png"),
          icstyle: "top:.98rem"
        },
        {
          src: require("@/assets/images/aprifools/fool_7.png"),
          icstyle: "top:1.63rem"
        },
        {
          src: require("@/assets/images/aprifools/fool_8.jpg"),
          icstyle: "top:0rem;height:7.56rem"
        },
        {
          src: require("@/assets/images/aprifools/fool_9.jpg"),
          icstyle: "top:1.65rem"
        },
        {
          src: require("@/assets/images/aprifools/fool_10.jpg"),
          icstyle: "top:0rem;height:7.56rem"
        }
      ]
    };
  },
  components: {
    nvHead,
    nvLoading,
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  created() {
    this.$Progress.start();
  },
  mounted(){
    setTimeout(()=>{
      this.loading = false;
      this.$Progress.finish();
    })
  },
  methods: {
    /**
     * button按钮文字
     */
    PushButton(item) {
      this.radioShow = false;
      switch (item) {
        case 1:
          (this.pushButton = "确认"), (this.placeholder = "姓名：请输入姓名");
          this.inputShow = true;
          this.radioShow = true;
          break;
        case 2:
          (this.pushButton = "随机生成小故事"),
            (this.placeholder = "姓名：请输入姓名");
          this.inputShow = true;
          break;
        case 3:
          (this.pushButton = "领取提车证"),
            (this.placeholder = "姓名：请输入姓名");
          this.inputShow = true;
          break;
        case 4:
          (this.pushButton = "领证"), (this.placeholder = "姓名：请输入姓名");
          this.inputShow = false;
          break;
        case 5:
          (this.pushButton = "领证"), (this.placeholder = "姓名：请输入姓名");
          this.inputShow = false;
          break;
        case 6:
          (this.pushButton = "我的身价"),
            (this.placeholder = "姓名：请输入姓名");
          this.inputShow = true;
          break;
        case 7:
          (this.pushButton = "测测愚人节发生啥"),
            (this.placeholder = "姓名：请输入姓名");
          this.inputShow = true;
          break;
        case 8:
          (this.pushButton = "确认"), (this.placeholder = "地名：例 北京");
          this.inputShow = false;
          break;
        case 9:
          (this.pushButton = "确认"), (this.placeholder = "地名：例 北京");
          this.inputShow = true;
          break;
        case 10:
          (this.pushButton = "确认"), (this.placeholder = "地名：例 北京");
          this.inputShow = true;
          break;
      }
    },
    /**
     *验证字符串是否为空
     */
    async handle() {
      if (this.posterIndex == 1) {
        if (!this.param1 || !this.gender) {
          this.message = "请您输入信息！";
          setTimeout(() => {
            this.message = "";
          }, 1500);
          return false;
        }
      }
      if (this.inputShow) {
        if (!this.param1) {
          this.message = "请您输入信息！";
          setTimeout(() => {
            this.message = "";
          }, 1500);
          return false;
        }
      } else {
        if (!this.param1 || !this.param2) {
          this.message = "请您输入信息！";
          setTimeout(() => {
            this.message = "";
          }, 1500);
          return false;
        }
      }
      this.share();
    },
    /**
     * 页面跳转
     */
    // 'temp27',
    async share() {
      let appdata = await appcall.getAppData();
      let templateAll = [
        "temp50",
        "temp22",
        "temp28",
        "temp21",
        "temp29",
        "temp10",
        "temp1",
        "temp30",
        "temp31",
        "temp32"
      ];
      let params = {
        template: templateAll[this.posterIndex - 1],
        userid: appdata.uid,
        param_1: this.param1,
        param_2: this.param2,
        sex: this.gender
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/funShare/create_url",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        this.$router.push({
          path: "/aprilFoolsDayShare",
          query: {
            url: rs.data.url
          }
        });
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../../assets/css/mixin';
.apriFoolsDay {
  text-align: center;
  .apriFoolsDay_swiper {
    background: #f5f5f5;
    position: relative;
    .poster {
      width: 5.256rem;
      height: 7.5rem;
      margin: auto;
      display: inline-block;
      position: relative;
      .swiperImg {
        position: absolute;
      }
    }
    .swiper-button-prev {
      background: none;
      left: 0.4rem;
    }
    .swiper-button-prev:after {
      content: "";
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      border-right: 0.05rem solid #999;
      border-top: 0.05rem solid #999;
      -webkit-transform: rotate(225deg);
      transform: rotate(225deg);
    }
    .swiper-button-next {
      background: none;
      right: 0.4rem;
    }
    .swiper-button-next:after {
      content: "";
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      border-right: 0.05rem solid #999;
      border-top: 0.05rem solid #999;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }

  .apriFoolsDay_thumbnail {
    width: 100%;
    padding: 0.4rem 0 0.4rem 0;
    display: block;
    overflow-x: scroll;
    ul {
      display: inline;
      white-space: nowrap;
      li {
        width: 2.4rem;
        height: 1.416rem;
        display: inline-block;
        margin-left: 0.2rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .active {
          width: 100%;
          height: 100%;
          background: #000;
          opacity: 0.4;
        }
        i {
          position: absolute;
          margin: auto;
          .background("activities/haibao_ok.png");
          width: 0.4rem;
          height: 0.4rem;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
      }
      li:first-child {
        margin-left: 0;
      }
    }
  }
  .apriFoolsDay_thumbnail::-webkit-scrollbar {
    display: none;
  }

  .apriFoolsDay_input {
    position: relative;
    .inputNameFirst {
      margin: 0.4rem 0.26rem 0 0.26rem;
      padding: 0 0.28rem;
      border: 1px solid #e5e5e5;
      border-radius: 0.2rem;
      height: 0.9rem;
      input {
        width: 100%;
        padding: 0 0.26rem;
        font-size: 0.28rem;
        color: #bbbbbb;
        line-height: 0.86rem;
        border: none;
        -webkit-touch-callout: auto;
        -webkit-user-select: auto;
        -khtml-user-select: auto;
        -moz-user-select: auto;
        -ms-user-select: auto;
        user-select: auto;
      }
    }
    .inputNameTwo {
      margin: 0.4rem auto 0;
      height: 0.9rem;
      .inputNameSub {
        border: 1px solid #e5e5e5;
        border-radius: 0.2rem;
        width: 3.3rem;
        height: 0.9rem;
        display: block;
        text-align: center;
        margin: 0 0.13rem 0 0.26rem;
        &:nth-child(2) {
          margin: 0 0.26rem 0 0.13rem;
        }
      }
      input {
        width: 3rem;
        padding: 0 0.13rem;
        font-size: 0.28rem;
        color: #bbbbbb;
        line-height: 0.86rem;
        border: none;
        -webkit-touch-callout: auto;
        -webkit-user-select: auto;
        -khtml-user-select: auto;
        -moz-user-select: auto;
        -ms-user-select: auto;
        user-select: auto;
      }
    }
    .inputNameCheck {
      .demo--label {
        margin: 20px 20px 0 0;
        display: inline-block;
      }
      .demo--radio {
        display: none;
      }
      .demo--radioInput {
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 100%;
        display: inline-block;
        height: 16px;
        margin-right: 10px;
        margin-top: -1px;
        vertical-align: middle;
        width: 16px;
        line-height: 1;
      }
      .demo--radio:checked + .demo--radioInput:after {
        background-color: #d53c3e;
        border-radius: 100%;
        content: "";
        display: inline-block;
        height: 12px;
        margin: 1px;
        width: 12px;
      }
      .demo--checkbox.demo--radioInput,
      .demo--radio:checked + .demo--checkbox.demo--radioInput:after {
        border-radius: 0;
      }
    }
  }

  .apriFoolsDay_share {
    position: relative;
    .btn {
      margin: 0.4rem auto;
      height: 1rem;
      width: 4.84rem;
      line-height: 1rem;
      text-align: center;
      display: block;
      color: #fff;
      background-color: @mcolor;
      border-radius: 0.2rem;
      font-size: 0.36rem;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .errMsg {
    color: #666;
    top: 3rem;
    left: 0;
    right: 0;
    text-align: center;
  }
}
</style>
