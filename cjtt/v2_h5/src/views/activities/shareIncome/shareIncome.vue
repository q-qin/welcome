<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="晒收入">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="shareIncome" v-show="!loading">
      <div class="shareIncome_swiper">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,$index) in posters" :key="$index">
            <div class="poster">
              <div class="cash" :style="item.style" v-show="!iospedding">{{accumulateCash | decimal}}</div>
              <img :src="item.src" height="100%">
              <span class="inviteCode" :style="item.icstyle">{{inviteCode}}</span>
            </div>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="shareIncome_thumbnail" id="shareIncome_thumbnail">
        <ul class="clear">
          <li v-for="(item,$index) in postersActive" @click="select($index)" :key="$index">
            <img :src="item.src">
            <div class="active" v-show="item.active"></div>
            <i v-show="item.active"></i>
          </li>
        </ul>
      </div>
      <div class="shareIncome_share">
        <span class="btn" @click="share">立即分享</span>
        <span class="tips" v-show="!iospedding">每天首次分享奖励500金币，需分享至朋友圈朋友们看到后才能拿到奖励，因此金币会有延迟</span>
      </div>
    </div>
  </div>
</template>

<script>
require("swiper/dist/css/swiper.css");
import { swiper, swiperSlide } from "vue-awesome-swiper";
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";

export default {
  name: "shareIncome",
  data() {
    return {
      loading: true,
      iospedding: false,
      swiperOption: {
        loop: true,
        grabCursor: true,
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        observeParents: true,
        onSlideChangeEnd: swiper => {
          this.postersActive.forEach(n => {
            n.active = false;
          });
          this.postersActive[swiper.realIndex].active = true;
          this.posterIndex = swiper.realIndex + 1;
          let nowidx = swiper.realIndex - 1;
          if (swiper.realIndex == 0) {
            nowidx = 0;
          }
          if (swiper.realIndex == this.postersActive.length - 1) {
            nowidx = this.postersActive.length - 2;
          }
          let fs = parseFloat(document.documentElement.style.fontSize);
          document.getElementById("shareIncome_thumbnail").scrollLeft =
            nowidx * 2.6 * fs;
        }
      },
      accumulateCash: 0,
      inviteCode: "",
      posterIndex: 1,
      posters: [
        {
          src: require("@/assets/images/activities/730-1.png"),
          style: "color:#db2b1e;top:2.98rem;text-indent:.4rem",
          icstyle: ""
        },
        {
          src: require("@/assets/images/activities/730-2.png"),
          style: "color:#fff;top:1.6rem;",
          icstyle: ""
        },
        {
          src: require("@/assets/images/activities/730-3.png"),
          style: "color:#fff;top:1.46rem;",
          icstyle: ""
        },
        {
          src: require("@/assets/images/activities/730-4.png"),
          style: "color:#fff;top:1.6rem;",
          icstyle: ""
        },
        {
          src: require("@/assets/images/activities/730-5.png"),
          style: "color:#fff;top:2.78rem;",
          icstyle: ""
        }
      ],
      postersActive: [
        {
          src: require("@/assets/images/activities/622-1.png"),
          active: true
        },
        {
          src: require("@/assets/images/activities/622-2.png"),
          active: false
        },
        {
          src: require("@/assets/images/activities/622-3.png"),
          active: false
        },
        {
          src: require("@/assets/images/activities/622-4.png"),
          active: false
        },
        {
          src: require("@/assets/images/activities/622-5.png"),
          active: false
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
  async created() {
    this.$Progress.start();
    // ios 提审状态
    this.iospedding = await appcall.getReviewStatus();

    if (this.iospedding) {
      setTimeout(() => {
        this.$Progress.finish();
        this.loading = false;
      });
      this.posters = [
        {
          src: require("@/assets/images/activities/haibao_12.png"),
          style: "color:#fc3941;top:2.65rem;",
          icstyle: ""
        }
      ];
      this.postersActive = [
        {
          src: require("@/assets/images/activities/haibao_s12.png"),
          active: true
        }
      ];
    } else {
      this.getBalance();
      this.getInviteCode();
    }
  },
  mounted() {},
  methods: {
    /**
     * 获取可提现金额
     */
    async getBalance() {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/account/get_account_cash",
        comm,
        params
      );
      this.$Progress.finish();
      if (rs && rs.code === 1001) {
        this.loading = false;
        this.accumulateCash = rs.data.accumulate_cash;
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /*
     * 获取邀请码
     */
    async getInviteCode() {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/user/get_register_invite_code",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        this.inviteCode = rs.data.register_invite_code;
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    select(index) {
      this.swiper.slideTo(index + 1, 0, false);
      this.postersActive.forEach(n => {
        n.active = false;
      });
      this.postersActive[index].active = true;
      this.posterIndex = index + 1;
    },
    /**
     * 晒海报
     */
    async share() {
      let params = {
        template_type: this.posterIndex,
        task_keys: "sssr",
        share_where: 1
      };
      if (this.iospedding) {
        params.template_type = 20;
      }
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/task/share_invitation",
        comm,
        params
      );
      console.log(rs);
      if (rs && rs.code === 1001) {
        let images = rs.data.image.join(";");
        let params = {
          type: 3,
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
    }
  },
  filters: {}
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin";
.shareIncome {
  text-align: center;
  .shareIncome_swiper {
    .poster {
      width: 5.256rem;
      height: 7.2rem;
      margin: auto;
      box-shadow: 0 0 0.08rem #999;
      display: inline-block;
      position: relative;
      .cash {
        position: absolute;
        left: 0;
        right: 0; // top:2.88rem;
        font-weight: bold;
        font-size: 0.42rem;
      }
      .inviteCode {
        position: absolute;
        top: 6.72rem;
        font-size: 0.36rem;
        line-height: 0.5rem;
        width: 1.75rem;
        margin-left: 0.8rem;
        color: #333333;
        text-align: left;
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

  .shareIncome_thumbnail {
    width: 100%;
    padding: 0.4rem 0 0.4rem 0;
    display: block;
    overflow-x: scroll;
    ul {
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
  .shareIncome_thumbnail::-webkit-scrollbar {
    display: none;
  }

  .shareIncome_share {
    .btn {
      margin: 0 0.3rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      margin-bottom: 0.2rem;
      display: block;
      color: #fff;
      background-color: @mcolor;
      border-radius: 1.2rem;
      font-size: 0.36rem;
    }
    .tips {
      font-size: 0.26rem;
      display: block;
      margin: 0 0.55rem;
      text-align: center;
      color: #666;
    }
  }
}
</style>
