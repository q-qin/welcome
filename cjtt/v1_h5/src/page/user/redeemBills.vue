<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="redeemBills" v-show="!loading">
      <table cellpadding="0" cellspacing="0">
        <colgroup>
          <col width="33.33334%">
          <col width="33.33334%">
          <col>
        </colgroup>
        <thead>
          <tr>
            <th class="name">兑换商品</th>
            <th class="time">兑换时间</th>
            <th class="status">兑换状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,$index) in detail.list" :key="$index">
            <td class="name">{{item.product_name}}</td>
            <td class="time">{{item.created | ymd}}
              <br>{{item.created | hms}}</td>
            <td class="status" :class="{ing:item.order_status==0,reject:item.order_status==2}">{{item.order_status | status}}
              <button @click="todetail(item.order_no)">详情</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="tips" v-show="detail.list.length > 0">注：申请将在2个工作日内审批（不包含申请当天，双休日、节假日顺延）</div>
      <nv-nodata v-show="detail.list.length == 0"></nv-nodata>
    </div>
  </div>
</template>
<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import nvNodata from '@/components/nodata.vue';
import ajax from '@/config/ajax'
import appcall from '@/config/appcall'
export default {
  name: 'redeemBills',
  data() {
    return {
      loading: true,
      detail: {
        list: [],
      },
    }
  },
  components: {
    nvHead,
    nvLoading,
    nvNodata
  },
  created() {

  },
  async mounted() {
    this.init();
  },
  methods: {
    /**
     * 获取兑换明细
     */
    async init() {
      let params = {
        page: '0'
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/account/get_balance_exchange_lists', comm, params);
      if (rs && rs.code === 1001) {
        this.loading = false;
        this.detail = rs.data;
      } else if (rs && rs.code == 1008) {
        this.loading = false;
        this.detail.list = [];
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    },
    todetail(tid) {
      this.$router.push('/redeemDetail/' + tid);
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
.redeemBills {
  table {
    width: 100%;
    th {
      font-size: .3rem;
      font-weight: normal;
      padding: .3rem .1rem;
      text-align: center;
      color: #333;
      background: #f4f4f4; // border-left: 1px solid @mbg;
      // border-bottom: 1px solid @mbg;
      // &:first-child{
      //    border-left: 0;
      // }
    }
    td {
      font-size: .3rem;
      padding: .3rem .1rem;
      text-align: center;
      color: #666; // border-left: 1px solid @mbg;
      border-bottom: 1px solid @mbg; // &:first-child{1
      //    border-left: 0;
      // }
      &.time {
        font-size: .24rem;
        color: #999;
      }
      &.ing {
        color: #59c1bd;
      }
      &.reject {
        color: @mcolor;
      }
      button {
        color: #fff;
        background: #ff9221;
        width: 1rem;
        height: .5rem;
        border-radius: .09rem;
        cursor: pointer;
      }
    }
  }
  .tips {
    font-size: .28rem;
    color: @mcolor;
    line-height: .48rem;
    padding: .1rem .48rem;
  }
}

</style>
