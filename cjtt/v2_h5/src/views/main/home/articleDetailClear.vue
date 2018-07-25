<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" :page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="articleDetailClear" v-show="!loading">
      <div class="scontent">
        <h1>{{detail.title}}</h1>
        <div class="nav" v-show="detail.region">
          <div class="region clear">
            <div class="face left" @click="jumpHomepage">
              <img :src="detail.headimg">
            </div>
            <div class="desc left">
              <p class="name" @click="jumpHomepage">{{detail.region}}</p>
              <p class="time">{{detail.push_date}}</p>
            </div>
            <div class="focus right">
              <button @click="doAttention" :class="{active:isAttention}" v-show="showAttention">{{isAttention?'主页':'关注'}}</button>
            </div>
          </div>
        </div>
        <div class="content" v-html="detail.content"></div>
        <!-- <div class="share" v-show="detail.column_id == 3"> -->
        <div class="share" v-show="showShare">
          <div class="tips">
            <span class="red">分享赢好礼</span>
          </div>
          <div class="shareBox clear">
            <div class="share_item pyq left">
              <div class="img" @click="pyqshare">
                <img src="../../../assets/images/pyq.png">
              </div>
              <div>朋友圈</div>
            </div>
            <div class="share_item weixin left">
              <div class="img" @click="wxshare">
                <img src="../../../assets/images/wx.png">
              </div>
              <div>微信好友 / 群</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <nv-top></nv-top> -->
  </div>
</template>
<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import nvTop from "@/components/backtotop.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";

export default {
  name: "articleDetailClear",
  data() {
    return {
      loading: false,
      height: "height:15rem;",
      detail: {},
      id: 0,
      region_id: 0,
      isAttention: false,
      showAttention: true,
      showShare: false
    };
  },
  components: {
    nvHead,
    nvLoading,
    nvTop
  },
  async created() {},
  computed: {},
  mounted() {
    this.id = this.$route.params.id;
    this.getDetail();
    this.setFontsize();
    // 设置字体大小调用
    window.afterSetSize = function(sizeType) {
      this.setFontsize(sizeType);
    }.bind(this);

    // 设置关注状态
    window.afterAttention = function(type) {
      if (!!type) {
        this.isAttention = true;
      } else {
        this.isAttention = false;
      }
    }.bind(this);
  },
  beforeDestroy() {},
  methods: {
    /**
     * 获取资讯详情
     */
    async getDetail() {
      let params = {
        id: this.id
      };
      let comm = await appcall.getAppData();
      let rs = await ajax(
        "post",
        this.$apiurl + "/article/get_detail",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.loading = false;
        this.detail = rs.data;
        this.region_id = rs.data.region_id;
        this.detail.content = this.detail.content.replace(/&nbsp;/g, "");
        //if (this.detail.cate_key == "hotListNews") {
        this.showShare = true;
        //}
        this.getUserAttention();
      } else {
        this.$alert(rs.msg);
      }
    },
    /*
       * 设置字体大小
       */
    async setFontsize(size) {
      let cwidth = document.documentElement.clientWidth || 375;
      let fsize = 100 * cwidth / 750;
      let sizeType = size;
      if (!size) {
        let rs = await appcall.getFontSize();
        sizeType = Number(rs.type);
      }
      //console.log(sizeType)
      switch (sizeType) {
        case 1:
          document.documentElement.style.fontSize = fsize * 0.9 + "px";
          break;
        case 3:
          document.documentElement.style.fontSize = fsize * 1.1 + "px";
          break;
        case 4:
          document.documentElement.style.fontSize = fsize * 1.2 + "px";
          break;
        case 2:
        default:
          document.documentElement.style.fontSize = fsize + "px";
          break;
      }
    },
    /*
       * 获取用户关注状态
       */
    async getUserAttention() {
      let params = {
        region_id: this.region_id
      };

      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/attention/get_user_attention",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        // 已登录
        this.islogin = true;
        this.isAttention = rs.data.is_attention == 1 ? true : false;
      } else if (rs && rs.code === 1005) {
        // 未登录
        this.islogin = false;
      } else {
        this.$alert(rs.msg);
      }
    },
    /*
       * 执行关注操作
       */
    async doAttention() {
      if (!this.islogin) {
        appcall.login();
      } else {
        if (!this.isAttention) {
          // 执行关注操作
          let params = {
            region_ids: this.region_id
          };
          let comm = await appcall.getRequestData(params);
          let rs = await ajax(
            "post",
            this.$apiurl + "/attention/add",
            comm,
            params
          );
          if (rs && rs.code === 1001) {
            this.isAttention = true;
            appcall.showToast("关注成功");
          } else if (rs && rs.code === 1005) {
            // 未登录
            appcall.login();
          } else {
            this.$alert(rs.msg);
          }
        } else {
          // 跳转公众号首页
          this.jumpHomepage();
        }
      }
    },

    /*
       * 微信朋友圈分享
       */
    pyqshare() {
      let params = {
        type: 2
      };
      appcall.shareArticle(params);
    },

    /*
       * 微信好友分享
       */
    wxshare() {
      let params = {
        type: 1
      };
      appcall.shareArticle(params);
    },

    /*
       * 跳转公众号首页
       */
    jumpHomepage() {
      appcall.regionHomepage({
        region_id: this.region_id
      });
    }
  },
  watch: {},
  filters: {}
};
</script>
<style scoped>
.content,
.content>>>* {
  font-size: 0.38rem !important;
  line-height: 0.7rem !important;
  /*color: #333!important;*/
  background: none !important;
  font-family: "Helvetica Neue", Helvetica, "STHeiTi", "Microsoft YaHei",
    sans-serif !important;
  font-weight: normal !important;
  text-align: left !important;
}

.content>>>img,
.content>>>iframe {
  max-width: 100%;
  height: auto !important;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}

.content>>>table {
  width: 0 !important;
}

.content p,
.content>>>blockquote,
.content>>>p {
  margin: 0 auto 0.25rem;
}
</style>
<style lang="less" scoped>
@import "../../../assets/css/mixin";

.articleDetailClear {
  background: #fbf9f9;
  .scontent {
    background: #fff;
    overflow: hidden;
    padding: 0.26rem 0.3rem 0.3rem;
    h1 {
      font-size: 0.5rem;
      line-height: 0.68rem;
      color: #333;
      font-weight: 600;
      margin-bottom: 0.2rem;
    }
    .nav {
      line-height: 0.45rem;
      position: relative;
      margin-bottom: 0.2rem;
      height: 0.9rem;
      .region {
        color: #333;
        font-size: 0.32rem;
        .face {
          width: 0.8rem;
          height: 0.8rem;
          .background('head_mr.png');
          border-radius: 0.8rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .desc {
          margin-left: 0.2rem;
          .name {
            font-size: 0.32rem;
          }
          .time {
            color: #999;
            font-size: 0.26rem;
          }
        }
        .focus {
          button {
            width: 1.2rem;
            height: 0.6rem;
            margin-top: 0.15rem;
            vertical-align: middle;
            border-radius: 0.1rem;
            background: @mcolor;
            color: #fff;
            font-size: 0.34rem;
            &.active {
              background: #fff;
              color: @mcolor;
              .border(@mcolor);
            }
          }
        }
      }
    }
    .content {
      overflow: hidden;
      position: relative;
    }
    .share {
      font-size: 0.3rem;
      overflow: hidden;
      margin-top: 0.2rem;
      text-align: center;
      .tips {
        line-height: 0.3rem;
        &:before {
          content: "";
          display: block;
          height: 1px;
          width: 4.64rem;
          background: #dddddd;
          position: relative;
          top: 0.16rem;
          margin: auto;
        }
        .red {
          display: inline-block;
          background: #fff;
          padding: 0 0.3rem;
          position: relative;
          color: #d53c3e;
        }
      }
      .shareBox {
        .share_item {
          width: 50%;
          color: #444444;
          div.img {
            width: 1rem;
            height: 1rem;
            .border(#e1e1e1);
            border-radius: 100%;
            margin: 0.42rem auto 0.3rem;
            background-color: #f7f7f7;
          }
          img {
            width: 0.6rem;
            margin: 0.2rem auto;
          }
        }
      }
    }
    .informationLable {
      padding-right: 0.5rem;
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0.2rem 0;
        overflow: hidden;
        li {
          .border(#696969);
          border-radius: 0.25rem;
          padding: 0.1rem 0.3rem;
          margin: 0 0.3rem 0.1rem 0;
          color: #666666;
          float: left;
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>
