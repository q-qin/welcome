<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="invitecodeExchange" v-show="!loading">
      <div class="backgroundImage">
        <div class="tip" v-if="!iospedding">输入师傅邀请码立即到账<span class="big">0.5</span>元红包</div>
        <div class="tip" v-else>&nbsp;</div>
        <input placeholder="输入邀请码" type="text" v-model.trim="invitecode" maxlength="10">
        <button class="btn" @click="handle">领取红包</button>
        <div class="otherTip">完成任务记得到 <span class="big">任务中心</span> 领取奖励！</div>
        <transition name="fade">
          <div class="errMsg">{{message}}</div>
        </transition>
        <div class="step one" >
            <div class="table-cell">
              第一步：
            </div>
            <div class="table-cell">
              <img src="../../../assets/images/invitation_step1.png" alt="">
            </div>
        </div>
        <div class="step two" >
            <div class="table-cell">
              第二步：
            </div>
            <div class="table-cell">
              <img src="../../../assets/images/invitation_step2.png" alt="">
            </div>
        </div>
      </div>
      <div class="v-modal" v-show="successModalShow" @touchmove.prevent >
        <div class="successModal">
        </div>
        <button class="btnBox" @click="goTaskcenter">确定</button>
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
  name: "invitecodeExchange",
  data() {
    return {
      loading: true,
      invitecode: "",
      message: "",
      successModalShow:false,
      iospedding:false,
    };
  },
  components: {
    nvHead,
    nvLoading
  },
  async created(){
     this.$Progress.start();
     this.iospedding = await appcall.getReviewStatus();
  },
  mounted() {
    setTimeout(() => {
      this.$Progress.finish();
      this.loading = false;
    }, 0);
  },
  methods: {
    /**
     *拆红包
     */
    async handle() {
      if (!this.invitecode ) {
        this.message = "邀请码不能为空，请重新输入!";
        setTimeout(() => {
          this.message = "";
        }, 1500);
        return false;
      } else {
        let params = {
          register_invite_code: this.invitecode
        };
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/user/bind_master",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          this.successModalShow = true;
          appcall.user_binding();
        } else {
          this.message = rs.msg;
          setTimeout(() => {
            this.message = "";
          }, 1500);
          return false;
        }
      }
    },
    /**
     * 去任务中心
     */
    goTaskcenter(){
      this.successModalShow = false;
      appcall.navigator({
        title:'任务中心',
        url:this.$h5url + pagers[this.$currVer].taskcenter
      })
    },
  },
  filters: {}
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin";
.invitecodeExchange {
  width: 100vw;
  height: 100vh;
  background-color: #dc3e3b;
  .backgroundImage {
    background: url("../../../assets/images/invitation.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 100%;
    height: 12.06rem;
    .tip {
      font-size: 0.32rem;
      color:#eddb7b;
      text-align: center;
      margin: 0 auto;
      padding-top:1rem;
      .big{
        color:#eddb7b;
        font-size: .46rem;
        font-weight: bold;
      }
    }
    input {
      height: 0.88rem;
      width: 6.22rem;
      position: absolute;
      top: 1.91rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      border-radius: 0.88rem;
      color: #333;
      font-size: 0.32rem;
      text-align: center;
      caret-color: #c73536;
      background:none;
      -webkit-touch-callout: auto;
      -webkit-user-select: auto;
      -khtml-user-select: auto;
      -moz-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    .btn {
      width: 2.6rem;
      height: 1rem;
      border-radius: 1rem;
      font-size: 0.35rem;
      margin: 2rem auto 0;
      display: block;
      background: linear-gradient(to top, #d9a712, #edda7b);
      color: #b70000;
      box-shadow: 0.02rem 0.05rem 0.05rem #b70000;
      font-weight: bold;
    }
    .otherTip {
      font-size: 0.28rem;
      color: #fff;
      text-align: center;
      margin: .5rem auto 0;
      .big{
        font-size: .34rem;
        color:#edd978;
      }
    }
    .step{
      margin: 0 auto;
      font-size: .28rem;
      background-color: #dc3e3b;
      .table-cell:first-child{
        width: 2.2rem;
        text-align: right;
        color:#fff;
      }
      &.one{
        margin-top: -0rem;
      }
      &.two{
        margin-top: -.75rem;
      }
    }
    .success {
      z-index: 1;
      width: 4rem;
      border-radius: 1rem;
      opacity: 0.8;
      height: 3rem;
      background-color: red;
      position: absolute;
      top: 6rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      margin: 0 auto;
      .success_o {
        color: white;
        font-size: 0.3rem;
        text-align: center;
        margin-top: 0.5rem;
      }
      .success_t {
        width: 1.6rem;
        height: 0.5rem;
        border-radius: 1rem;
        margin: 0 auto;
        background-color: rgb(226, 188, 61);
        color: rgb(182, 0, 1);
        position: absolute;
        left: 0;
        right: 0;
        top: 2rem;
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
      color: #fff;
      position: absolute;
      font-size: .24rem;
      top: 3.05rem;
      left: 0;
      right: 0;
      text-align: center;
    }
  }
   .v-modal {
    .mask;
    .successModal {
      position: absolute;
      .background('invitation_pop.png');
      width: 4.62rem;
      height: 6.12rem;
      top:50%;
      margin: -4rem auto;
      left: 0;
      right: 0;
    }
    .btnBox {
      text-align: justify;
      width: 6rem;
      line-height: 0.9rem;
      position: absolute;
      top: 50%;
      left:0;
      right: 0;
      margin: 1.75rem auto 0;
      font-size: 0.36rem;
      text-align: center;
      color:#fff;
      border-radius: .9rem;
      background: linear-gradient(#fa6431,#ea202e);
    }
  }
}
</style>
