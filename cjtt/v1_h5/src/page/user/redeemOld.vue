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
  import nvHead from '@/components/header.vue';
  import nvLoading from '@/components/loading.vue';
  import ajax from '@/config/ajax'
  import appcall from '@/config/appcall'
  export default {
    name: 'jfdh',
    data() {
      return {
        loading: true,
        balance: 0,
        detail: {},
      }
    },
    components: {
      nvHead,
      nvLoading,
    },
    async created() {
      let appdata = await appcall.getAppData();
      if(appdata.platform_code == "android_h5" && appdata.version_code >= 7){
        this.$router.replace('/redeem');
      }else{
        this.init();
      }
    },
    mounted() {
    },
    methods: {
      /**
       * 获取兑换信息
       */
      async init() {
        let params = {};
        let comm = await appcall.getRequestData(params);
        let rs = await ajax('post', this.$apiurl + '/account/get_product_lists', comm, params);
        if (rs && rs.code === 1001) {
          this.loading = false;
          this.balance = rs.data.balance_cash;
          this.detail = rs.data.product_list;
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          })
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
        let rs = await ajax('post', this.$apiurl + '/alipay/get_account', comm, params);
        if (rs && rs.code === 1001) {
          this.$confirm('您确定兑换 ' + item.price_cash + ' 元红包吗？').then(ok => {
            this.order(item);
          }, no => {})
        } else if (rs && rs.code == 1018) {
          this.$confirm('<div style="margin-bottom:40px">您需要绑定支付宝兑换红包!</div>').then(ok => {
            appcall.bindzfb();
          }, no => {})
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 兑换动作
       */
      async exchange(item) {
        if (Number(this.balance) < Number(item.price_cash)) {
          this.$confirm('您零钱余额不足！', '温馨提示', {
            confirmButtonText: '去赚金币'
          }).then(ok => {
            //appcall.gototask({});
            appcall.navigator({
              title: '任务系统',
              url: this.$h5url + 'qiandao',
            })
          }, no => {})
        } else {
          this.$confirm('您确定兑换 ' + item.price_cash + ' 元红包吗？').then(ok => {
            this.order(item);
          }, no => {})
        }
      },
      tomingxi() {
        this.$router.push('/redeemBills');
      },
      async order(item) {
        let params = {
          product_id: item.product_id,
        }
        let comm = await appcall.getRequestData(params);
        let rs = await ajax('post', this.$apiurl + '/account/balance_exchange_product', comm, params);
        if (rs && rs.code === 1001) {
          this.$success('兑换成功').then(rs => {
            this.tomingxi();
          })
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          })
        } else if (rs && rs.code === 1006) {
          this.$confirm(rs.msg, '温馨提示', {
            confirmButtonText: '去赚金币'
          }).then(ok => {
            //appcall.gototask({});
            appcall.navigator({
              title: '任务系统',
              url: this.$h5url + 'qiandao',
            })
          }, no => {})
        } else {
          this.$alert(rs.msg);
        }
      }
    },
  }

</script>
<style lang="less" scoped>
  @import '../../style/colors';
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
      padding: .1rem 0;
      font-size: .3rem;
      line-height: .4rem;
      color: #666;
      background: #fff;
      .iconfont {
        font-size: 1em;
        color: #999;
        margin-right: .2rem;
      }
      .colleft {
        float: left;
        width: 50%;
        padding: .2rem .34rem;
        b {
          color: @mcolor;
          font-weight: normal;
        }
      }
      .colright {
        margin-left: 50%;
        padding: .2rem .34rem;
        position: relative;
        cursor: pointer;
        &>.iconfont {
          position: absolute;
          top: .21rem;
          right: .2rem;
          margin-right: 0;
        }
        &:after {
          content: '';
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
        margin-left: -.06rem;
      }
      li {
        float: left;
        width: 3.72rem;
        margin-left: .06rem;
        background: #fff;
        margin-top: .06rem;
        cursor: pointer;
        &>div {
          padding: 1rem .24rem .1rem;
        }
        .proImg {
          height: 2.2rem;
          margin-bottom: .6rem;
        }
        .name {
          font-size: .3rem;
          line-height: .5rem;
          color: #333;
          padding: 0
        }
        .tip {
          font-size: .3rem;
          line-height: .5rem;
          color: #59c1bd;
        }
        .redBox {
          position: relative;
          background-image: url('../../images/redBox.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          p {
            color: #f5d958;
            font-size: .48rem;
            line-height: 1;
            position: absolute;
            bottom: .2rem;
            left: 0;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }

</style>
