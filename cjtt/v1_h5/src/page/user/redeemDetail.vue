<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="redeemDetail" v-show="!loading">
      <div class="topBox">
        <div class="relative">
          <div class="proImg redBox">
            <p>{{ detail.price_cash | decimal(0)}}元</p>
          </div>
          <div class="proCon">
            <p>{{ detail.product_name }}</p>
            <p class="dis">折扣价{{ detail.price_cash | decimal}}元</p>
          </div>
        </div>
      </div>
      <div class="detailBox">
        <div class="hd">
          <p>付款金额</p>
          <div class="money">零钱 <b>￥{{ detail.price_cash }}</b></div>
        </div>
        <ul class="bd">
          <li>
            <div class="tit">商品</div>
            <div class="con">{{ detail.product_name }}</div>
          </li>
          <li>
            <div class="tit">订单号</div>
            <div class="con">{{ detail.order_no }}</div>
          </li>
          <li>
            <div class="tit">申请时间</div>
            <div class="con">{{ detail.created }}</div>
          </li>
          <li>
            <div class="tit">兑换状态</div>
            <div class="con" :class="{ing:detail.order_status==0,reject:detail.order_status==2}">{{detail.order_status | status}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import ajax from '@/config/ajax'
import appcall from '@/config/appcall'
export default {
  name: 'redeemDetail',
  data() {
    return {
      loading: true,
      id: 0,
      detail: {},
    }
  },
  components: {
    nvHead,
    nvLoading
  },
  created() {},
  async mounted() {
    this.id = this.$route.params.id;
    this.init();
  },
  methods: {
    /**
     * 获取兑换明细
     */
    async init() {
      let params = {
        order_no: this.id
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/account/get_balance_exchange', comm, params);
      if (rs && rs.code === 1001) {
        this.loading = false;
        this.detail = rs.data;
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    }
  },
  filters: {
    status(value) {
      switch (value) {
        case 0:
          return '审核中'
        case 1:
          return '已处理'
        case 2:
          return '拒处理'
      }
    },
    ymd(value) {
      value = value.replace(/-/g, "/");
      return value.split(' ')[0];
    },
    hms(value) {
      value = value.replace(/-/g, "/");
      return value.split(' ')[1];
    }
  }
}

</script>
<style lang="less" scoped>
@import '../../style/colors';
.topBox {
  padding: .68rem .35rem;
  background: #fff;
  border-bottom: .2rem solid #f4f4f4;
  .relative {
    position: relative;
  }
  .proImg {
    position: absolute;
    height: 100%;
    width: 1.9rem;
  }
  .redBox {
    background-image: url('../../images/redBox.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    p {
      color: #f5d958;
      font-size: .2rem;
      line-height: 1;
      position: absolute;
      top: 78%;
      left: 0;
      width: 100%;
      margin-top: -.1rem;
      text-align: center;
    }
  }
  .proCon {
    margin-left: 2.25rem;
    color: #000;
    font-size: .4rem;
    line-height: 1;
    .dis {
      margin-top: .4rem;
      font-size: .36rem;
      color: @mcolor;
    }
  }
}

.detailBox {
  .hd {
    border-bottom: 2px solid #eee;
    font-size: .3rem;
    color: #000;
    padding: .54rem .35rem .4rem;
    line-height: 1;
    p {
      float: left;
      width: 1.5rem;
    }
    .money {
      margin-left: 1.5rem;
      text-align: right;
      b {
        color: @mcolor;
        font-weight: normal;
      }
    }
  }
  .bd {
    padding: .16rem 0;
    li {
      font-size: .28rem;
      line-height: .34rem;
      padding: .16rem .35rem;
      .tit {
        float: left;
        width: 2.5rem;
        color: #888;
      }
      .con {
        margin-left: 2.5rem;
        text-align: right;
        color: #888;
      }
      .ing {
        color: #59c1bd;
      }
      .reject {
        color: @mcolor;
      }
    }
  }
}

.tips {
  font-size: .28rem;
  color: @mcolor;
  line-height: .48rem;
  padding: .1rem .48rem;
}

</style>
