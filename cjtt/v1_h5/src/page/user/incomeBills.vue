<template>
  <div class="income">
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="incomeBills" v-show="!loading">
      <router-link to="/ranking" v-show="!iospedding">
        <div class="torank"></div>
      </router-link>
      <router-link to="/faq" v-show="!iospedding">
        <div class="toptip">※ 为什么很多好友每天能获得上万金币？新手必看！</div>
      </router-link>
      <div class="incomeBills_summary">
        <div class="mainpart">
          <div class="today">
            <p>当前余额</p>
            <div class="num">{{detail.balance_cash | decimal}}</div>
          </div>
          <div class="yesterday">
            <p>昨日{{type == 'gold'?'金币':'零钱'}}收入</p>
            <div class="num">
              <i class="iconfont" :class="{money:type == 'money'}">{{type == 'gold'?'&#xe623;':'&#xe8dd;'}}</i>
              <span v-show="type == 'gold'">{{detail.yesterday_coin | decimal(0)}}</span>
              <span v-show="type == 'money'">{{detail.yesterday_cash | decimal}}</span>
            </div>
          </div>
        </div>
        <div class="tippart">
          <p>昨日最后金币（转）零钱清算：{{detail.shift_coin | decimal(0)}}金币 = {{detail.shift_cash | decimal}}元</p>
          <p class="tips">※ 金币转换率受每日广告收益影响（上下会有浮动）</p>
        </div>
      </div>
      <div class="incomeBills_list">
        <ul class="tabhd clearfix">
          <li :class="{on:type == 'gold'}" @click="mingxi('gold')">金币</li>
          <li :class="{on:type == 'money'}" @click="mingxi('money')">零钱</li>
        </ul>
        <div class="tabbd">
          <div class="tabBox">
            <ul v-show="type=='gold'&&coin_list.length>0">
              <li v-for="(item,$index) in coin_list" :key="$index">
                <div class="fLine">
                  <p>{{item.task_name}}</p>
                  <div class="num" :class="{fu:item.coin<0}">{{ item.coin>0?'+':'' }}{{item.coin| decimal(0)}} 金币</div>
                </div>
                <div class="sLine">
                  <p>{{item.task_conent?item.task_conent:'&nbsp;'}}</p>
                  <div class="time">{{item.addtime}}</div>
                </div>
              </li>
            </ul>
            <ul v-show="type=='money'&&cash_list.length>0">
              <li v-for="(item,$index) in cash_list" :key="$index">
                <div class="fLine">
                  <p>{{item.task_name}}</p>
                  <div class="num" :class="{fu:item.cash<0}">{{ item.cash>0?'+':'' }}{{item.cash | decimal}} 元</div>
                </div>
                <div class="sLine">
                  <p>{{item.task_conent?item.task_conent:'&nbsp;'}}</p>
                  <div class="time">{{item.addtime}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="tips" v-show="(type=='gold'&&coin_list.length>0)||(type=='money'&&cash_list.length>0)">系统只保留最近3天的{{type == 'gold'?'金币':'零钱'}}明细</div>
        <div class="nodata" v-show="(type=='gold'&&coin_list.length<=0)||(type=='money'&&cash_list.length<=0)">
          <img src="../../images/nodata2.png">
          <span>您还没有收益呢</span>
        </div>
      </div>
      <div class="incomeBills_fixbtn" v-show="!iospedding">
        <button @click="show">累计收入{{detail.accumulate_cash | decimal}}<span></span>炫耀一下</button>
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
  name: 'incomeBills',
  data() {
    return {
      loading: true,
      detail: {
        accumulate_cash: 0,
        balance_cash: 0,
        shift_cash: 0,
        shift_coin: 0,
        yesterday_cash: 0,
        yesterday_coin: 0,
      },
      cash_list: [],
      coin_list: [],
      type: '',
      iospedding: false,
    }
  },
  components: {
    nvHead,
    nvLoading,
  },
  async created() {
    // ios 提审状态
    this.iospedding = await appcall.getReviewStatus();
  },
  mounted() {
    this.type = this.$route.params.type
    this.init();
  },
  methods: {
    show() {
      // 跳转晒收入
      //appcall.gotoshai();
      appcall.navigator({
        title: '晒收入',
        url: this.$h5url + 'shai',
      })
    },
    mingxi(type) {
      this.type = type;
      // 切换金币和零钱明细
    },
    /**
     * 获取领取明细
     */
    async init() {
      let params = {}
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/account/get_income_detail', comm, params);
      if (rs && rs.code === 1001) {
        this.loading = false;
        this.detail = rs.data.user;
        this.cash_list = rs.data.cash_list ? rs.data.cash_list : [];
        this.coin_list = rs.data.coin_list ? rs.data.coin_list : [];
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    },
  },
  filters: {}
}

</script>
<style lang="less" scoped>
@import '../../style/colors';
.incomeBills {
  padding-bottom: 2rem;
}

.torank {
  height: 1.2rem;
  cursor: pointer;
  background-image: url('../../images/torank.png');
  background-size: cover;
  background-repeat: no-repeat;
}

.toptip {
  background: #fbe799;
  padding: .15rem .3rem .15rem .4rem;
  font-size: .28rem;
  line-height: .4rem;
  color: #333;
}

.incomeBills_summary {
  background: #fff;
  padding: .2rem .4rem;
  border-bottom: .2rem solid #fbfbfb;
  .mainpart {
    position: relative;
    p {
      font-size: .28rem;
      color: #999;
      line-height: .5rem;
    }
    .today {
      .num {
        font-size: .8rem;
        color: #d53c3e;
        line-height: 1;
        font-weight: 600;
      }
      padding-bottom: .35rem;
    }
    .yesterday {
      position: absolute;
      right: 0;
      bottom: .35rem;
      width: 2.9rem;
      .num {
        font-size: .32rem;
        color: #333;
        line-height: 1;
        padding: .09rem 0 .09rem .7rem;
        position: relative;
        .iconfont {
          position: absolute;
          top: 0;
          left: 0;
          width: .5rem;
          height: .5rem;
          background: #59c1bd;
          border-radius: 100%;
          font-size: .3rem;
          display: block;
          text-align: center;
          line-height: .5rem;
          color: #fff;
          &.money {
            background: #fda71f;
          }
        }
      }
    }
  }
  .tippart {
    padding-top: .15rem;
    border-top: 1px solid #bbb;
    p {
      font-size: .28rem;
      line-height: .4rem;
      text-align: justify;
      color: #333;
      &.tips {
        font-size: .26rem;
        color: #59c1bd;
      }
    }
  }
}

.incomeBills_list {
  background: #fff;
  .tabhd {
    border-bottom: 1px solid #eee;
    li {
      cursor: pointer;
      float: left;
      width: 50%;
      text-align: center;
      height: .9rem;
      font-size: .36rem;
      line-height: .9rem;
      color: #333;
      border-bottom: 2px solid #fff;
      &.on {
        color: @mcolor;
        border-color: @mcolor;
      }
    }
  }
  .tabbd {
    li {
      border-bottom: 1px solid #eee;
      padding: .2rem .24rem .2rem .15rem;
      .fLine {
        position: relative;
        font-size: .3rem;
        line-height: .36rem;
        margin-bottom: .1rem;
        p {
          padding-right: 3rem;
          color: #333;
        }
        .num {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 3rem;
          text-align: right;
          color: @mcolor;
          &.fu {
            color: #59c1bd;
          }
        }
      }
      .sLine {
        position: relative;
        font-size: .2rem;
        line-height: .36rem;
        p {
          padding-right: 3rem;
          color: #999;
        }
        .time {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 3rem;
          text-align: right;
          color: #bbb;
        }
      }
    }
  }
  .tips {
    padding: .35rem .1rem;
    font-size: .28rem;
    text-align: center;
    color: #999;
  }
  .nodata {
    font-size: .3rem;
    text-align: center;
    padding-top: .6rem;
    padding-bottom: .35rem;
    img {
      width: .87rem;
      margin: 0 auto;
      display: block;
    }
    span {
      display: block;
      margin-top: .2rem;
      color: #999;
      font-size: .3rem;
    }
  }
}

.incomeBills_fixbtn {
  position: fixed;
  background: #fff;
  z-index: 20;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: .35rem .3rem;
  box-shadow: 0 0 .6rem rgba(0, 0, 0, .3);
  button {
    width: 100%;
    height: .9rem;
    display: block;
    text-align: center;
    background: @mcolor;
    font-size: .36rem;
    color: #fff;
    border-radius: .9rem;
    cursor: pointer;
    span {
      padding-left: .5rem;
    }
  }
}

</style>
