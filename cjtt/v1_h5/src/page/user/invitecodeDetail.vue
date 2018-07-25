<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="invitecodeDetail" v-show="!loading">
      <div class="invitecodeDetail_top clear">
        <div class="tt">
          <img src="../../images/icode_tt1.png">
        </div>
        <div class="desc">
          邀请码是超级头条用户的身份标识
          <br> 可在邀请收徒时使用
        </div>
        <div class="invitecode">
          <button @click="doCopy">
            <span>点击复制您的邀请码</span>
            <span>{{invitecode}}</span>
          </button>
        </div>
      </div>
      <div class="invitecodeDetail_middle clear">
        <div class="tt">
          <img src="../../images/icode_tt2.png">
        </div>
        <div class="desc">
          1.通过分享邀请链接给朋友在线注册，或面对面扫码注册时自动绑定您的邀请码，不需要徒弟再手动输入。
        </div>
        <div class="pic1">
          <img src="../../images/icode_pic1.png">
        </div>
        <div class="desc">
          2.若您的好友是通过手机应用商店搜索“超级头条”安装注册的，需登录后输入您的邀请码后才能成为您的徒弟。
        </div>
        <div class="pic2">
          <img src="../../images/icode_pic2.png">
        </div>
      </div>
      <div class="invitecodeDetail_bottom clear">
        <button @click="togglebtns">分享</button>
      </div>
      <div class="invitecodeDetail_modal" v-show="showshare" @touchmove.prevent></div>
      <div class="invitecodeDetail_sharebtns" v-show="showshare" @touchmove.prevent>
        <ul class="clear">
          <li class="left pyq">
            <div class="icon" @click="sharepyq">
              <img src="../../images/pyq.png">
            </div>
            <span>朋友圈邀请</span>
          </li>
          <li class="left weixin">
            <div class="icon" @click="shareweixin">
              <img src="../../images/wx.png">
            </div>
            <span>微信邀请</span>
          </li>
          <li class="left qq">
            <div class="icon" @click="shareqq">
              <img src="../../images/qq.png">
            </div>
            <span>QQ邀请</span>
          </li>
        </ul>
        <span class="cancel" @click="togglebtns">取消</span>
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
  name: 'invitecodeDetail',
  data() {
    return {
      loading: true,
      invitecode: ' ',
      showshare: false,
      lowVersion:false,
    }
  },
  components: {
    nvHead,
    nvLoading,
  },
  async mounted() {
    // 低版本兼容
    let appdata = await appcall.getAppData();
    if ((appdata.platform_code == 'ios_h5' && appdata.version_code < 5) || (appdata.platform_code == 'android_h5' &&
        appdata.version_code < 7)) {
      this.lowVersion = true;
    }
    if(this.lowVersion){
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/user/get_register_invite_code', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        this.invitecode = rs.data.register_invite_code;
      } else {
        this.$alert(rs.msg);
      }
    }else{
      let rs = await appcall.getUserInfo();
      this.invitecode = rs.invitecode;
    }
    setTimeout(() => { this.loading = false; })
  },
  methods: {
    /*
     * 复制操作
     */
    doCopy() {
      let self = this;
      if (JKEventHandler.browser().ios) {
        appcall.invite_copy({ code: this.invitecode });
        self.$toast('复制成功');
      } else {
        this.$copyText(this.invitecode).then(ok => {
          self.$toast('复制成功');
        }, err => {
          //self.$toast('复制失败');
        })
      }
    },
    togglebtns() {
      this.showshare = !this.showshare;
    },
    /**
     * 分享到朋友圈
     */
    async sharepyq() {
      let params = {
        share_where: 1,
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/tasks/get_task_share_timeline', comm, params);
      if (rs && rs.code === 1001) {
        let images = rs.data.image.join(';');
        let params = {
          type: 2,
          title: '',
          url: '',
          desc: '看新闻赚现金，幸运任务领不停，还能赚点零花钱哦！可以通过支付宝提现，全民阅读热潮已开始，快一起来',
          images: images,
        }
        appcall.invite(params);
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 分享到微信好友
     */
    async shareweixin() {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/tasks/get_rand_domain_invite', comm, params);
      if (rs && rs.code === 1001) {
        let url = rs.data;
        let params = {
          type: 1,
          title: '我刚加入了超级头条，还不错，邀请你加入',
          url: rs.data + '/register?uid=' + comm.uid,
          desc: '看资讯还能赚零花钱~ 绝对靠谱，抓住机会了，来试试',
          images: '',
        }
        appcall.invite(params);
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 分享到QQ好友
     */
    async shareqq() {
      let params = {
        task_keys: 'qqyq',
        template_type: 1,
        share_where: 3,
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/tasks/get_task_share_timeline', comm, params);
      if (rs && rs.code === 1001) {
        let images = rs.data.image.join(';');
        let params = {
          type: 5,
          title: '',
          url: '',
          desc: '',
          images: images,
        }
        appcall.invite(params);
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    },
  }
}

</script>
<style lang="less" scoped>
.invitecodeDetail {
  background: #f4f4f4;
  padding: .25rem 0 1.85rem;
  .invitecodeDetail_top {
    background: #fff;
    border-radius: .2rem;
    margin: 0 .35rem .2rem;
    .tt {
      padding: .4rem 0 .4rem 0;
      img {
        width: 3.25rem;
        height: .46rem;
      }
    }
    .desc {
      font-size: .3rem;
      line-height: .45rem;
      text-align: center;
      color: #666;
    }
    .invitecode {
      text-align: center;
      button {
        width: 4rem;
        height: 1.2rem;
        margin: .25rem auto .4rem;
        border-radius: 1.2rem;
        background: #fff;
        border: 1px solid #6aa0f6;
        span {
          display: block;
          font-size: .3rem;
          color: #6aa0f6;
        }
        span:last-child {
          font-size: .48rem;
        }
      }
    }
  }
  .invitecodeDetail_middle {
    margin: 0 .35rem auto;
    background: #fff;
    border-radius: .2rem;
    .tt {
      padding: .4rem 0 .4rem 0;
      img {
        width: 3.25rem;
        height: .46rem;
      }
    }
    .desc {
      font-size: .3rem;
      color: #666;
      margin: 0 .5rem .7rem;
    }
    .pic1 {
      img {
        width: 4.39rem;
        height: 2.45rem;
        margin: 0 auto .45rem;
      }
    }
    .pic2 {
      padding-bottom: .45rem;
      img {
        width: 4.39rem;
        height: 2.21rem;
        margin: 0 auto;
      }
    }
  }
  .invitecodeDetail_bottom {
    position: fixed;
    width: 100%;
    height: 1.4rem;
    bottom: 0;
    background: #fff;
    text-align: center;
    box-shadow: 0 0 .3rem rgba(0, 0, 0, .3);
    button {
      width: 6.8rem;
      height: 1rem;
      margin: .2rem auto;
      background: #e69f2a;
      border-radius: 1rem;
      font-size: .36rem;
      color: #fff;
    }
  }
  .invitecodeDetail_modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
  }
  .invitecodeDetail_sharebtns {
    position: fixed;
    width: 100%;
    height: 3.5rem;
    bottom: 0;
    background: #fff;
    z-index: 1;
    ul {
      margin: 0 .4rem auto;
      li {
        width: 33.3%;
        height: 2.5rem;
        text-align: center;
        .icon {
          width: 1.3rem;
          height: 1.3rem;
          text-align: center;
          margin: .35rem auto;
          border-radius: 1.3rem;
          border: 1px solid #f1f1f1;
          img {
            width: .66rem;
            height: .66rem;
            margin: .3rem auto;
          }
        }
        span {
          font-size: .26rem;
        }
      }
    }
    .cancel {
      height: 1rem;
      line-height: 1rem;
      display: block;
      background: #fafafa;
      font-size: .36rem;
      text-align: center;
    }
  }
}

</style>
