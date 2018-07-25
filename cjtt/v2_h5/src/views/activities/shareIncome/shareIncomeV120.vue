<template>
  <div >
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="晒收入">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="shareIncomeV120" v-show="!loading">
      <div class="shareIncome_area">
        <div class="bg">
          <img :src="this.posters[posterIndex-1].src">
          <img :src="QRcodeImg" class="QRcodeImg" v-show="QRcodeImg" :style="this.posters[posterIndex-1].QRStyle">
          <div class="money" :style="this.posters[posterIndex-1].style">{{accumulateCash | decimal}}</div>
          <span class="invitecode" :style="this.posters[posterIndex-1].inviteStyle">{{inviteCode}}</span>
          <div class="switch" @click="switchPoster('换一个')">换一个</div>
        </div>
      </div>
      <div class="shareIncome_bottom">
        <p>每日首次分享+500金币~</p>
        <ul class="clear">
          <li class="left" @click="share(1,'微信')">
            <div class="img">
              <img src="../../../assets/images/shareIncome/wx.png">
            </div>
            <div class="name">微信</div>
          </li>
          <li class="left" @click="share(2,'朋友圈')">
            <div class="img">
              <img src="../../../assets/images/shareIncome/pyq.png">
            </div>
            <div class="name">朋友圈</div>
          </li>
          <li class="left" @click="share(3,'QQ')">
            <div class="img">
              <img src="../../../assets/images/shareIncome/qq.png">
            </div>
            <div class="name">QQ</div>
          </li>
          <li class="left" @click="share(6,'QQ空间')">
            <div class="img">
              <img src="../../../assets/images/shareIncome/qzone.png">
            </div>
            <div class="name">QQ空间</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
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
      accumulateCash: 0,
      inviteCode: 0,
      posters: [
        {
          src: require("@/assets/images/shareIncome/730-1-120.jpg"),
          style: "top:2.81rem;color:#DB2B1E",
          icstyle: "",
          inviteStyle: "bottom:.12rem;right:1.4rem",
          QRStyle:"width:2.15rem;height:2.15rem;top:3.91rem;left:2.18rem"
        },
        {
          src: require("@/assets/images/shareIncome/730-2-120.jpg"),
          style: "top:1.85rem;",
          icstyle: "",
          inviteStyle: "bottom:.12rem;right:1.4rem",
          QRStyle:"width:2.08rem;height:2.08rem;top:4.41rem;left:2.21rem"
        },
        {
          src: require("@/assets/images/shareIncome/730-3-120.jpg"),
          style: "top:1.44rem;",
          icstyle: "",
          inviteStyle: "bottom:.12rem;right:1.4rem",
          QRStyle:"width:2.27rem;height:2.27rem;top:4.07rem;left:2.12rem"
        },
        {
          src: require("@/assets/images/shareIncome/730-4-120.jpg"),
          style: "top:1.18rem;",
          icstyle: "",
          inviteStyle: "bottom:.15rem;right:1.4rem",
          QRStyle:"width:2.08rem;height:2.08rem;top:4.42rem;left:2.21rem"
        },
        {
          src: require("@/assets/images/shareIncome/730-5-120.jpg"),
          style: "color:#fff;top:2.54rem;",
          icstyle: "",
          inviteStyle: "bottom:.15rem;right:1.4rem",
          QRStyle:"width:2.25rem;height:2.25rem;top:3.87rem;left:2.12rem"
        }
      ],
      posterIndex: 1,
      QRcodeImg:'',
    };
  },
  components: {
    nvHead,
    nvLoading
  },
  created() {
  },
  mounted() {
    this.getBalance();
    this.getInviteCode();
    this.getQR();
  },
  methods: {
    async getBalance() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/account/get_account_cash",
        comm,
        params
      );
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
    /**
     * 换海报
     */
    switchPoster(position) {
      if(!!position){_hmt.push(['_trackEvent', 'shareIncome', 'click', position])}
      if (this.posterIndex < this.posters.length) {
        this.posterIndex++;
      } else {
        this.posterIndex = 1;
      }
    },
    /**
     * 生成二维码
     */
    async getQR() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/invitation/invite_disciple",
        comm,
        params,
        false
      );
      if (rs && rs.code === 1001) {
        this.QRcodeImg = rs.data.qrcode_name;
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
      }
    },
    /**
     * 晒海报 pyq 1, wx 2, qq 3 ,qzone 6
     */
    async share(sw,position) {
      if(!!position){_hmt.push(['_trackEvent', 'shareIncome', 'click', position])}
      let params = {
        template_type: this.posterIndex,
        task_keys: "sssr",
        share_where: sw
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
      if (rs && rs.code === 1001) {
        let images = rs.data.image[0];
        let type = 1;
        switch (sw) {
          case 1:
            if (JKEventHandler.browser().ios) {
              type = 1;
            } else {
              type = 8;
            }
            break;
          case 2:
            type = 2;
            break;
          case 3:
            type = 5;
            break;
          case 6:
            type = 13;
            break;
        }
        let params = {
          type: type,
          title: "",
          url: "",
          desc: "",
          images: images
        };
        let iosparams = {
          type: type,
          title: "",
          url: "",
          desc: "",
          imageUrl: images,
          contenttype: "1"
        };
        if ((sw == 3 || sw == 6) && JKEventHandler.browser().ios) {  
          appcall.invite_iosqq(iosparams);
        } else {
          appcall.invite(params);
        }
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
  .shareIncomeV120 {
    background: #f4f8f7;
    .shareIncome_area {
      padding: 0.5rem;
      padding-bottom: 3.05rem;
      .bg {
        background: #fff;
        width: 6.5rem;
        height: 8rem;
        box-shadow: 0 0 0.3rem 0 rgba(182, 182, 182, 0.8);
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .QRcodeImg{
          width: 2rem;
          height: 2rem;
          background: #e5e5e5;
          position: absolute;
        }
        .money {
          width: 100%;
          position: absolute;
          font-size: 0.48rem;
          color: #fff;
          font-weight: 600;
          text-align: center;
          line-height: 1;
        }
        .invitecode {
          font-size: 0.24rem;
          color: #000;
          line-height: 1;
          position: absolute;
        }
        .switch {
          width: 1.8rem;
          text-align: center;
          line-height: 0.64rem;
          border-radius: 0.32rem;
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0px 0px 29px rgba(0, 0, 0, 0.72);
          color: #fff;
          font-size: 0.3rem;
          position: absolute;
          top: 6.36rem;
          right: 0.4rem;
        }
      }
    }
    .shareIncome_bottom {
      width: 7.5rem;
      height: 3.05rem;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      text-align: center;
      padding: 0 0.45rem ;
      p {
        line-height: 1;
        font-size: 0.3rem;
        color: #ff2c2c;
        margin-top: 0.3rem;
      }
      ul {
        margin-top: 0.34rem;
        li {
          margin-left: 0.6rem;
          &:nth-child(1) {
            margin-left: 0;
          }
          .img {
            width: 1.2rem;
            height: 1.2rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            margin-top: 0.2rem;
            width: 1.2rem;
            font-size: 0.3rem;
          }
        }
      }
    }
  }
</style>

