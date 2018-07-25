<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="bg"></div>
    <div class="redeem" v-show="!loading">
      <div class="top">
        <div class="colleft">
          <p>
            <i class="iconfont">&#xe8dd;</i>当前零钱
            <b>{{ balance | decimal(2)}}</b>
          </p>
        </div>
        <div class="colright" @click="tomingxi()">
          <p>
            <i class="iconfont">&#xe8de;</i>兑换记录</p>
          <i class="iconfont">&#xe6a7;</i>
        </div>
      </div>
      <div class="boxList">
        <ul class="clearfix">
          <li v-for="(item,$index) in detail" @click="exchange(item)" :key="$index">
            <div>
              <div class="proImg redBox">
                <p>{{ item.price_cash | decimal(0)}}元</p>
              </div>
              <div class="name">{{ item.product_name }}</div>
              <div class="tip">需绑定支付宝</div>
            </div>
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
import pagers from "@/assets/js/pagers";

export default {
  name: "redeem",
  data() {
    return {
      loading: true,
      balance: 0,
      detail: {}
    };
  },
  components: {
    nvHead,
    nvLoading
  },
  created() {
    this.$Progress.start();
  },
  async mounted() {
    this.init();
  },
  methods: {
    /**
     * 获取兑换信息
     */
    async init() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/account/get_product_lists",
        comm,
        params
      );
      this.$Progress.finish();
      if (rs && rs.code === 1001) {
        this.loading = false;
        this.balance = rs.data.balance_cash;
        this.detail = rs.data.product_list;
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 判断是否绑定支付宝账号
     */
    async isAlipay(item) {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/alipay/get_account",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        this.$confirm("您确定兑换 " + item.price_cash + " 元红包吗？").then(
          ok => {
            this.order(item);
          },
          no => {}
        );
      } else if (rs && rs.code == 1018) {
        this.$confirm(
          '<div style="margin-bottom:40px">您需要绑定支付宝兑换红包!</div>'
        ).then(
          ok => {
            appcall.bindzfb();
          },
          no => {}
        );
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 兑换动作
     */
    async exchange(item) {
      if (Number(this.balance) < Number(item.price_cash)) {
        this.$confirm("您零钱余额不足！", "温馨提示", {
          confirmButtonText: "去赚金币"
        }).then(
          ok => {
            appcall.navigator({
              title: "任务系统",
              url: this.$h5url + pagers[$this.currVer].taskcenter,
            });
          },
          no => {}
        );
      } else {
        this.isAlipay(item);
      }
    },
    tomingxi() {
      this.$router.push("/redeemBills");
    },
    /**
     * 去兑换
     */
    async order(item) {
      let params = {
        product_id: item.product_id
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax("post", this.$apiurl + "/order/create", comm, params);
      if (rs && rs.code === 1001) {
        // this.$success("兑换成功").then(rs => {
        //   this.tomingxi();
        // });

        this.$confirm("兑换成功", "温馨提示", {
          confirmButtonText: "告诉好友",
          cancelButtonText: "查看详情"
        }).then(
          rs => {
            this.sharewx(item.price_cash);
          },
          no => {
            this.tomingxi();
          }
        );
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else if (rs && rs.code === 1006) {
        this.$confirm(rs.msg, "温馨提示", {
          confirmButtonText: "去赚金币"
        }).then(
          ok => {
            appcall.navigator({
              title: "任务系统",
              url: this.$h5url + pagers[$this.currVer].taskcenter,
            });
          },
          no => {}
        );
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 告诉好友
     */
    async sharewx(price) {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/task/get_share_wechat_url",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        let url = rs.data;
        let params = {
          type: 1,
          title: "@亲，我在超级头条成功提现" + (0 | price) + "元！",
          url: rs.data,
          desc: "快来提现吧，首次1元提现秒到账。",
          images: ""
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
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin";
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  z-index: -1;
}

.redeem {
  position: relative;
  .top {
    padding: 0.1rem 0;
    font-size: 0.3rem;
    line-height: 0.4rem;
    color: #666;
    background: #fff;
    .iconfont {
      font-size: 1em;
      color: #999;
      margin-right: 0.2rem;
    }
    .colleft {
      float: left;
      width: 50%;
      padding: 0.2rem 0.34rem;
      b {
        color: @mcolor;
        font-weight: normal;
      }
    }
    .colright {
      margin-left: 50%;
      padding: 0.2rem 0.34rem;
      position: relative;
      cursor: pointer;
      & > .iconfont {
        position: absolute;
        top: 0.21rem;
        right: 0.2rem;
        margin-right: 0;
      }
      &:after {
        content: "";
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 2px;
        height: 100%;
        margin-left: -1px;
        background: #f4f4f4;
      }
    }
  }
  .boxList {
    ul {
      margin-left: -0.06rem;
    }
    li {
      float: left;
      width: 3.72rem;
      margin-left: 0.06rem;
      background: #fff;
      margin-top: 0.06rem;
      & > div {
        padding: 1rem 0.24rem 0.1rem;
      }
      .proImg {
        height: 2.2rem;
        margin-bottom: 0.6rem;
      }
      .name {
        font-size: 0.3rem;
        line-height: 0.5rem;
        color: #333;
        padding: 0;
      }
      .tip {
        font-size: 0.3rem;
        line-height: 0.5rem;
        color: #59c1bd;
      }
      .redBox {
        position: relative;
        background-image: url("../../../assets/images/redBox.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        p {
          color: #f5d958;
          font-size: 0.48rem;
          line-height: 1;
          position: absolute;
          bottom: 0.2rem;
          left: 0;
          width: 100%;
          text-align: center;
        }
      }
    }
  }
}
</style>
