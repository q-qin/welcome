<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="redeemDetail" v-show="!loading">
      <div class="topBox">
        <div class="progress">
          <div class="verticalBox">
            <div class="steps">
              <div class="stepsLeft">
                <div class="leftLine"></div>
                <div class="leftbox">
                  <div class="smallbox">
                  </div>
                </div>
              </div>
              <div class="stepsRight">
                <div class="rightHeader">提现申请</div>
                <div class="rightBody">{{ detail.created }}</div>
              </div>
            </div>
            <div class="steps">
              <div class="stepsLeft">
                <div class="leftLine" :class="{noActive:detail.order_status==0}"></div>
                <div class="notimebox" :class="{timebox:detail.order_status==0}">
                  <div class="smallbox"></div>
                </div>
              </div>
              <div class="stepsRight">
                <div class="rightHeader" :class="{rightHeaderBig:detail.order_status==0}">审核处理</div>
                <div class="rightBody">{{detail.order_status==0?'预计1-2个工作日':detail.created}}</div>
              </div>
            </div>
            <div class="steps">
              <div class="stepsLeft">
                <div class="leftLine noneline "></div>
                <div :class="{noactivebox:detail.order_status==0,statebox:detail.order_status==1,xxbox:detail.order_status==2}" class="noactivebox">
                  <div class="smallbox"></div>
                </div>
              </div>
              <div class="stepsRight">
                <div class="rightHeaderGray" :class="{successHeader:detail.order_status==1,refuseHeader:detail.order_status==2}">{{detail.order_status==2?'拒绝提现':'到账成功'}}</div>
                <div class="rightBody" v-if="detail.order_status==1">{{detail.updated}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detailBox">
        <ul class="bd">
          <li>
            <div class="tit">商品</div>
            <div class="con">{{ detail.product_name }}</div>
          </li>
          <li>
            <div class="tit">订单号</div>
            <div class="con">{{ detail.order_no }}</div>
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
  name: "redeemDetail",
  data() {
    return {
      loading: true,
      id: 0,
      detail: {
        created:'2018-05-07 16:59:25',
        order_status:0,
        updated:'2018-05-07 16:59:25'
      }
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
      // let comm = {
      //   api_debug: 1,
      //   token: "9de95930fb7bd6e70f856fe518bdc458",
      //   uid: 11009069
      // };
      let rs = await ajax(
        "post",
        this.$apiurl + "/order/getOrdrInfo",
        comm,
        params
      );
      this.$Progress.finish();
      if (rs && rs.code === 1001) {
        this.loading = false;
        this.detail = rs.data;
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    }
  },
  filters: {
    status(value) {
      switch (value) {
        case 0:
          return "审核中";
        case 1:
          return "已处理";
        case 2:
          return "拒处理";
      }
    },
    ymd(value) {
      value = value.replace(/-/g, "/");
      return value.split(" ")[0];
    },
    hms(value) {
      value = value.replace(/-/g, "/");
      return value.split(" ")[1];
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.topBox {
  height: 4.89rem;
  padding: 0 0.48rem;
  .progress {
    .border(#d8d8d8,bottom);
    height: 100%;
    padding: 0.5rem 0 0 0.32rem;
    .verticalBox {
      height: 4.5rem;
      display: flex;
      display: -webkit-flex;
      flex-flow: column;
      .steps {
        flex-basis: 50%;
        display: flex;
        display: -webkit-flex;
        .stepsLeft {
          flex-grow: 0;
          width: 0.77rem;
          position: relative;
          .leftLine {
            height: 1.5rem;
            .border(#29b6ff,left);
            top: 0.4rem;
            bottom: 0;
            left: 50%;
            margin-left: -0.015rem;
            position: absolute;
          }
          .noActive {
            border-color: #d8d8d8;
          }
          .noneline {
            display: none;
          }
          .noleftbox {
            background: #d8d8d8 !important;
          }
          .leftbox {
            position: relative;
            margin: 0 auto;
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            background: transparent;
            .smallbox {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              width: 0.24rem;
              height: 0.24rem;
              border-radius: 50%;
              background: #29b6ff;
              z-index: 1;
            }
          }
          .notimebox {
            position: relative;
            margin: 0 auto;
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            background: transparent;
            .smallbox {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              width: 0.24rem;
              height: 0.24rem;
              border-radius: 50%;
              background: #29b6ff;
              z-index: 1;
            }
          }
          .timebox {
            position: relative;
            margin: 0 auto;
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            background: #29b6ff;
            .smallbox {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              width: 0.24rem;
              height: 0.24rem;
              border-radius: 50%;
              background: #29b6ff;
              z-index: -1;
            }
          }
          .timebox::after {
            width: 0.28rem;
            height: 0.28rem;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -0.03rem;
            margin-top: -0.27rem;
            content: "\00a0";
            display: inline-block;
            border: 0.06rem solid #fff;
            border-top-width: 0;
            border-right-width: 0;
            -webkit-transform: rotate(0deg);
          }
          .noactivebox {
            position: relative;
            margin: 0 auto;
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            background: transparent;
            .smallbox {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              width: 0.24rem;
              height: 0.24rem;
              border-radius: 50%;
              background: #d8d8d8;
              z-index: -1;
            }
          }
          .statebox {
            position: relative;
            margin: 0 auto;
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            background: #29b6ff;
            .smallbox {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              width: 0.24rem;
              height: 0.24rem;
              border-radius: 50%;
              background: #29b6ff;
              z-index: -1;
            }
          }
          .statebox::after {
            width: 0.5rem;
            height: 0.28rem;
            position: absolute;
            margin-left: 0.1rem;
            margin-top: 0.1rem;
            content: "\00a0";
            display: inline-block;
            border: 0.06rem solid #fff;
            border-top-width: 0;
            border-right-width: 0;
            -webkit-transform: rotate(-45deg);
          }
          .xxbox {
            position: relative;
            margin: 0 auto;
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            background: #29b6ff;
            .smallbox {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              width: 0.24rem;
              height: 0.24rem;
              border-radius: 50%;
              background: #29b6ff;
              z-index: -1;
            }
          }
          .xxbox::after {
            width: 0.06rem;
            height: 0.5rem;
            background-color: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -0.25rem;
            margin-left: -0.03rem;
            content: "\00a0";
            display: inline-block;
            -webkit-transform: rotate(-45deg);
          }
          .xxbox::before {
            width: 0.06rem;
            height: 0.5rem;
            background-color: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -0.25rem;
            margin-left: -0.03rem;
            content: "\00a0";
            display: inline-block;
            -webkit-transform: rotate(45deg);
          }
        }
        .stepsRight {
          flex-grow: 1;
          white-space: normal;
          text-align: left;
          padding-left: 0.5rem;
          .rightHeader {
            font-size: 0.32rem;
            color: #000;
          }
          .rightHeaderGray {
            margin-top: 0.15rem;
            font-size: 0.32rem;
            color: #999999;
          }
          .rightHeaderBig {
            margin-top: -0.1rem;
            font-size: 0.4rem;
            color: #000;
          }
          .successHeader {
            margin-top: -0.1rem;
            font-size: 0.4rem;
            color: #000;
          }
          .refuseHeader {
            margin-top: 0.08rem;
            font-size: 0.4rem;
            color: #000;
          }
          .rightBody {
            font-size: 0.26rem;
            color: #999;
          }
        }
      }
    }
  }
}

.detailBox {
  .bd {
    padding: 0.485rem 0.48rem 0.71rem .48rem;
    li {
      padding: .225rem 0;
      font-size: 0.26rem;
      line-height: 1;
      .tit {
        float: left;
        width: 2rem;
        color: rgb(153, 153, 153);
      }
      .con {
        margin-left: 2.5rem;
        text-align: right;
        color: #000;
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
  font-size: 0.28rem;
  color: @mcolor;
  line-height: 0.48rem;
  padding: 0.1rem 0.48rem;
}
</style>