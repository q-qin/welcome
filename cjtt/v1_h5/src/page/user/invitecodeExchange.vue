<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="invitecodeExchange" v-show="!loading">
      <div class="backgroundImage">
        <div class="tip">输入好友邀请码建立师徒关系</div>
        <input placeholder="输入邀请码" type="text" v-model="invitecode" maxlength="10">
        <button class="btn" @click="handle">确定</button>
        <div class="otherTip">向您的好友 / 推荐人询问邀请码</div>
        <transition name="fade">
          <div class="errMsg">{{message}}</div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import nvHead from '@/components/header.vue';
  import nvLoading from '@/components/loading.vue';
  import ajax from '@/config/ajax'
  import appcall from '@/config/appcall';

  export default {
    name: 'invitecodeExchange',
    data() {
      return {
        loading: true,
        invitecode: '',
        message: ''
      }
    },
    components: {
      nvHead,
      nvLoading,
    },
    mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 0)
    },
    methods: {
      /**
       *拆红包
       */
      async handle() {
        if (!this.invitecode) {
          this.message = '邀请码不能为空，请重新输入!';
          setTimeout(() => {
            this.message = ''
          }, 1500)
          return false;
        } else {
          let params = {
            register_invite_code: this.invitecode
          };
          let comm = await appcall.getRequestData(params);

          let rs = await ajax('post', this.$apiurl + '/user/bind_master', comm, params);
          if (rs && rs.code === 1001) {
            appcall.user_binding();
            this.$success('设置成功');
          } else {
            this.message = rs.msg;
            setTimeout(() => {
              this.message = ''
            }, 1500);
            return false;
          }
        }
      }
    },
    filters: {}
  }

</script>

<style lang="less" scoped>
  @import '../../style/colors';
  .invitecodeExchange {
    width: 100vw;
    height: 100vh;
    .backgroundImage {
      background: url('../../images/invitation.jpg');
      background-repeat: no-repeat;
      background-size: 100%;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      background-color: #dc3e3b;
      .tip {
        margin-top: 1.34rem;
        font-size: 0.3rem;
        color: rgb(254, 177, 45);
        text-align: center;
        position: absolute;
        top: 1.2rem;
        left: 0;
        right: 0;
        margin: 0 auto;
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
        font-size: .35rem;
        position: absolute;
        top: 3.68rem;
        left: 0;
        right: 0;
        margin: 0 auto;
        background: linear-gradient(to top, #d9a712, #edda7b);
        color: #b70000;
        box-shadow: .02rem .05rem .05rem #b70000;
      }
      .otherTip {
        font-size: 0.24rem;
        color: rgb(237, 219, 121);
        text-align: center;
        position: absolute;
        top: 4.96rem;
        left: 0;
        right: 0;
        margin: 0 auto;
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
      ;
      .fade-enter-active,
      .fade-leave-active {
        transition: opacity .5s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      .errMsg {
        color: white;
        position: absolute;
        top: 3rem;
        left: 0;
        right: 0;
        text-align: center;
      }
    }
  }

</style>
