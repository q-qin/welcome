<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" :page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="articleDetailAd" v-show="!loading">
      <div class="content">
        <h1>{{detail.title }}</h1>
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
        <div class="all_content" ref="contentHeight">
          <!-- <v-pviewer :complete="complete" selector="img"> -->
          <lazy-component v-lazy-container="{ selector: 'img' }">
            <div class="article_content" :class="{'small':sizeType==1,'middle':sizeType==2,'bigger':sizeType==3,'biggest':sizeType==4}"
              v-html="detail.content"></div>
          </lazy-component>
          <!-- </v-pviewer> -->
          <div class="kefu" @click="showkf" v-show="detail.is_show_customer==1">
            官方微信客服
          </div>
          <div class="tags">
            <ul class="clear">
            </ul>
          </div>
          <div class="share" v-show="showShare">
            <div class="shareBox clear">
              <div class="share_item dianzan left" @click="dianzan" :class="{'active':likeStatus}">
                <img src="../../../assets/images/zanok.png" v-if="likeStatus">
                <img src="../../../assets/images/zanno.png" v-else>{{detail.likenum}}
              </div>
              <div class="share_item weixin left" @click="wxshare">
                <div class="shareYindao" v-show="isShareYindao&&isHot">分享+50金币</div> 
                <img src="../../../assets/images/wx2.png">微信
              </div>
              <div class="share_item pyq right" @click="pyqshare">
                <img src="../../../assets/images/pyq.png">朋友圈
              </div>
            </div>
          </div>
        </div>
        <div class="load_all" v-show="!loadall">
          <a @click="showfull">展开阅读全文
            <i class="zhankai"></i>
          </a>
          <em></em>
        </div>
      </div>
      <div class="article_swiper">
        <div id="hancr_004" class="baidu" v-if="thirdArr.length!=0">
        </div>
        <swiper :options="swiperOption" ref="mySwiper" v-if="urlList.length!=0 || eiaiUrl.length!=0">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in urlList" :key="index" v-if="urlList.length!=0">
            <a @click="adJump(item)">
              <img :src="item.coverurl">
            </a>
          </swiper-slide>
          <swiper-slide v-for="(item,i) in eiaiUrl" v-if="eiaiUrl.length!=0" :key="i+2">
            <a @click="eiaiJump(item)">
              <img :src="item.image_url[0]">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="others">
        <div class="con">
          <ul>
            <!-- <li class="bdad clear" id="PAGE_AA_1"></li> -->
            <li v-for="(item,$index) in relates" :key="$index" class="clear" :class="item.class" :id="item.adid">
              <a @click="openother(item.type,item)" v-if="item.type == 'article' && item.pit_type==1">
                <div class="pic">
                  <img v-lazy="item.piturl" width="100%">
                </div>
                <div class="name">
                  {{item.title | title}}
                  <div class="region">
                    <span>{{item.region}}</span>
                    <span class="hits">{{item.hits}}观看</span>
                  </div>
                </div>
              </a>
              <a @click="openother(item.type,item)" v-if="item.type == 'article' && item.pit_type==2 && item.piturl_list.length > 2">
                <div class="threeName">{{item.title}}</div>
                <div class="threePic clear">
                  <div class="imgBox left">
                    <img v-lazy="item.piturl_list[0]">
                  </div>
                  <div class="imgBox left">
                    <img v-lazy="item.piturl_list[1]">
                  </div>
                  <div class="imgBox left">
                    <img v-lazy="item.piturl_list[2]">
                  </div>
                </div>
                <div class="threeP">
                  <span>{{item.region}}</span>
                  <span class="hits">{{item.hits}}观看</span>
                </div>
              </a>
              <a @click="openother(item.type,item)" v-if="item.type == 'article' && item.pit_type==3">
                <div class="name1">
                  {{item.title }}
                  <div class="region">
                    <span>{{item.region}}</span>
                    <span class="hits">{{item.hits}}观看</span>
                  </div>
                </div>
              </a>
              <a @click="openother(item.type,item)" v-if="item.type == 'ad' && item.ad_source=='eiai' && item.ad.image_url.length > 0">
                <div class="pic">
                  <img v-lazy="item.ad.image_url[0]" width="100%">
                </div>
                <div class="name">
                  {{item.ad.title}}
                  <div class="region1">
                  </div>
                </div>
              </a>
              <a @click="openother(item.type,item)" v-if="item.type == 'ad' && item.ad_source=='baidu' ">
                <div :id="item.slot_id"></div>
              </a>
            </li>
          </ul>
          <div class="j_loading" ref="j_loading" v-show="j_loading">
            <div class="spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
            <p class="txt">数据加载中</p>
          </div>
          <!-- <div class="more" @click="seeMore" v-show="seeMoreShow">查看更多 <i></i></div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
require("swiper/dist/css/swiper.css");
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";
import { swiper, swiperSlide } from "vue-awesome-swiper";
// let comm = {
//     api_debug: 1,
//     uid: '11045566',
//     token: '1aa828f7ca4add06bb11137bb422f426',
//     app_version :'1.2.0',
//     platform_code:'android_h5',
// }
export default { 
  name: "articleDetail",
  data() {
    return {
      loading: true,
      lowVersion: false,
      popshow: false,
      loadall: true,
      likeStatus: false, // 是否点赞
      seeMoreShow: false,
      detail: {},
      relates: [],
      id: 0,
      region_id: 0,
      isAttention: false,
      isLogin: false,
      showAttention: true,
      showShare: false,
      complete: false,
      j_loading: false,
      pager: 1,
      isempty: false,
      pagead: 0,
      sizeType: 2,
      urlList: [],
      eiaiUrl: [],
      OriginalData: [],
      thirdArr:[],
      swiperOption: {
        loop: false,
        pagination: ".swiper-pagination",
        paginationClickable: false,
        autoplay: 3000,
      },
      isShareYindao:false,
      isHot:false,//是否为热文
    };
  },
  components: {
    nvHead,
    nvLoading,
    swiper,
    swiperSlide
    // VPviewer
  },
  async created() {
    this.$Progress.start();
    // window.addEventListener("scroll", this.handleScroll);
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getdetail();
    this.adType();

    // 设置字体大小调用
    window.afterSetSize = (sizeType) => {
      this.setFontsize(sizeType);
    };

    // 设置关注状态
    window.afterAttention = (type) => {
      if (!!type) {
        this.isAttention = true;
      } else {
        this.isAttention = false;
      }
    };

    window.addEventListener(
      "resize",
      function() {
        clearTimeout(window.tid);
      },
      false
    );
  },
  methods: {
    handleScroll() {
      appcall.showfull();
    },
    /**
     * 获取资讯详情
     */
    async getdetail() {
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
      this.$Progress.finish();
      if (rs && rs.code === 1001 && rs.data) {
        this.loading = false;
        this.detail = rs.data;
        if(rs.data.cate_key=='hotListNews'){
          this.isHot=true;
          //分享引导
          if(localStorage.getItem('isShareYindao')!='done'){
            this.isShareYindao=true;
            localStorage.setItem('isShareYindao','done');
          }else{
            this.isShareYindao=false;
          }
        }else{
          this.isHot=false;
        }
        this.detail.content = this.detail.content.replace(/&nbsp;/g, "");
        this.detail.content = this.detail.content.replace(
          /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
          (match, url, index, str) => {
            return '<img data-src="' + url + '" alt="" />';
          }
        );
        this.cid = rs.data.sc_catid;
        this.region_id = rs.data.region_id;
        this.showShare = true;
        this.complete = true;
        this.getLike();
        this.getUserAttention();
        this.getrelates();
        this.dynamicHeight();
        this.setFontsize();
        setTimeout(() => {
          appcall.pageLoaded();
        }, 800);
        this.seeMoreShow = true;
      } else {
        // this.$alert(rs.msg);
        appcall.showToast(rs.msg);
      }
    },
    /**
     * 获取相关资讯
     */
    async getrelates() {
      let params = {
        aid: this.id,
        cid: this.cid
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/articleV3/get_related_article_lists",
        comm,
        params,
        false
      );
      if (rs && rs.code === 1001 && rs.data) {
        rs.data.list.forEach(async n=>{
          n.ad = {};
          if(n.type=='ad'){
            // AI广告
            if(n.ad_source == 'eiai'){
              n.ad = await this.getAiAd(n);
            }else if(n.ad_source == 'baidu'){
              setTimeout(()=>{
                BAIDU_CLB_fillSlotAsync(n.slot_id,n.slot_id);
              },1000)
            }
          }
        });
        this.relates = this.relates.concat(rs.data.list);
      } else if (rs && rs.code === 1008) {
        this.isempty = true;
      } else {
        // this.$alert(rs.msg);
        appcall.showToast(rs.msg);
      }
    },
    /*
       * 设置字体大小
       */
    async setFontsize(size) {
      if (size) {
        this.sizeType = size;
      } else {
        let rs = await appcall.getFontSize();
        this.sizeType = Number(rs.type);
      }
    },
    /**
     * 动态设置元素高度
     */
    async dynamicHeight() {
      setTimeout(() => {
        let height = this.$refs.contentHeight.offsetHeight;
        //console.log(height);
        if (height < 750) {
          this.loadall = true;
        } else {
          this.$refs.contentHeight.style.height = "15rem";
          this.loadall = false;
        }
      }, 800);
    },

    /**
     * 展开阅读全文
     */
    showfull() {
      this.$refs.contentHeight.style.height = "auto";
      this.loadall = true;
      appcall.showfull();
    },
    /**
     * 查看相关资讯
     */
    openother(type,item) {
      console.log(item);
      if(item.type == 'article'){
        appcall.openother({
          type: 1,
          id: item.id,
          sc_catid: this.cid
        });
      }
      else if(item.type == 'ad'){
        if(item.ad_source == 'eiai'){
          appcall.navigator_ad({
            url:item.ad.source_url,
          })
        }
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
        this.isAttention = rs.data.is_attention == 1 ? true : false;
      } else {
        this.isAttention = false;
      }
    },
    /*
       * 执行关注操作
       */
    async doAttention() {
      let appdata = await appcall.getAppData();
      if (!appdata.uid || !appdata.token) {
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
            // this.$alert(rs.msg);
            appcall.showToast(rs.msg);
          }
        } else {
          // 跳转公众号首页
          this.jumpHomepage();
        }
      }
    },
    /**
     * 获取点赞状态
     */
    async getLike() {
      let params = {
        aid: this.id
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/like/get_likenum_status",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.likeStatus = rs.data.status == 0 ? true : false;
      } else {
        this.likeStatus = false;
      }
    },
    /**
     * 点赞
     */
    async dianzan() {
      let appdata = await appcall.getAppData();
      if (!appdata.uid || !appdata.token) {
        appcall.login();
      } else {
        let apiUrl = "";
        let params = {
          aid: this.id
        };
        let comm = await appcall.getRequestData(params);
        if (this.likeStatus) {
          this.detail.likenum = Number(this.detail.likenum) - 1;
          this.likeStatus = !this.likeStatus;
          apiUrl = this.$apiurl + "/like/cancelLike";
        } else {
          this.detail.likenum = Number(this.detail.likenum) + 1;
          this.likeStatus = !this.likeStatus;
          apiUrl = this.$apiurl + "/like/addLike";
        }
        let rs = await ajax("post", apiUrl, comm, params);
      }
    },
    /*
     * 唤起原生文章分享
    */
    nativeShare(){
      appcall.articleDetailShare();
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
      this.isShareYindao=false;
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
    },
    /**
     * 官方客服
     */
    async showkf() {
      let params = {};
      let comm = await appcall.getAppData();
      let rs = await ajax(
        "post",
        this.$apiurl + "/wechatcustomer/get_wechat_customer_service",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.weNum = rs.data.wechat_name;
        appcall.openWechat({
          wechat_No: this.weNum
        });
        // this.$confirm(
        //   '<div style="background:url(' +
        //     require("@/assets/images/wxchop.png") +
        //     ') no-repeat right bottom;background-size:2.1rem 1.6rem;padding-bottom:.75rem;"><div style="color:#333">加官方微信客服</div><div style="color:#fb2926;font-size:0.4rem;font-weight:bold;">' +
        //     this.weNum +
        //     '</div><div style="color:#333">为您详细解答疑问</div><div>',
        //   "温馨提示",
        //   {
        //     confirmButtonText: "打开微信"
        //   }
        // ).then(
        //   ok => {
        //     appcall.openWechat({
        //       wechat_No: this.weNum
        //     });
        //   },
        //   no => {}
        // );
      } else {
        // this.$alert(rs.msg);
        appcall.showToast(rs.msg);
      }
    },
    /**
     * 查看更多
     */
    async seeMore() {
      this.seeMoreShow = false;
      if (this.j_loading) return false;
      this.j_loading = true;
      appcall.showfull();
      await this.getrelates();
      this.j_loading = false;
      appcall.showfull();
    },
    /**
     * 页面广告位数据结构
     */
    async adType() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/carousel/article_detail_carousels",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.OriginalData = rs.data.list;
        this.adChoose(rs.data.list);
      }else if(rs.code === 1008){
        
      } else {
        // this.$alert(rs.msg);
        appcall.showToast(rs.msg);
      }
    },
    /**
     * 广告类型判断
     */
    adChoose(data) {
      let eiaiArr = [];
      let thirdArr = [];
      let activeArr = [];
      data.forEach((item, i) => {
        if (item.type == "ad") {
          if (item.ad_source == "eiai") {
            eiaiArr.push(item);
          } else {
            thirdArr.push(item);
          }
        } else {
          activeArr.push(item);
        }
      });
      if (eiaiArr.length != 0) {
        eiaiArr.forEach(async(item, index) => {
          this.eiaiUrl = this.eiaiUrl.concat(await this.getAiAd(item));
          // this.adEiai(eiaiArr[index].slot_id, item);
        });
      }
      if (thirdArr.length != 0) {
        this.thirdArr = thirdArr
        this.thirdAd(thirdArr);
      }
      if (activeArr.length != 0) {
        this.urlList = activeArr;
      }
    },
    /**
     * 获取eiai广告
     */
    async getAiAd(item){
      let adFeed = {};
      let params = {
        slot_id: item.slot_id,
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "GET",
        this.$adApi + "/slot/creative-info",
        comm,
        params,
        false
      );
      if (rs && rs.code === 1001 && rs.data) {
        if (!rs.data.hasOwnProperty("creative_id")) return false;
        let exporsureData = {
          creative_id: rs.data.creative_id,
          slot_id: item.slot_id,
          ad_source: item.ad_source
        };
        this.exposure(exporsureData);
        adFeed = rs.data;
      }else if (rs.code === 1008){

      }else {
        // this.$alert(rs.msg);
        appcall.showToast(rs.msg);
      }
      return adFeed;
    },
    /**
     * 第三方广告
     */
    thirdAd(data) {
      data.forEach(item => {
        switch (item.ad_source) {
          case "baidu":
            setTimeout(()=>{
              BAIDU_CLB_fillSlotAsync(item.slot_id, "hancr_004");
            },1000)
            break;
          case "xunfei":
            break;
          case "xiaomi":
            break;
          case "adview":
            break;
          case "gdt":
            break;
          default:
            break;
        }
      });
    },
    /**
     *曝光接口
     */
    async exposure(item) {
      let params = {
        slot_id: item.slot_id,
        creative_id: item.creative_id,
        ad_source: item.ad_source
      };
      let comm = await appcall.getRequestData(params);
      ajax("post", this.$adApi + "/log/exposure-log", comm, params,false);
    },
    /**
     *广告点击记录
     */
    async Adclicks(item) {
      let params = {
        slot_id: item.slot_id,
        creative_id: item.creative_id,
        ad_source: item.ad_source
      };
      let comm = await appcall.getRequestData(params);
      ajax("post", this.$adApi + "/log/click-log", comm, params);
    },
    /*
       * 活动页跳转
       */
    adJump(item) {
      appcall.navigator({
        title: item.name,
        url: item.url
      });
    },
    /*
       * eiai广告跳转
       */
    eiaiJump(item) {
      let exporsureData = {
        creative_id: item.creative_id,
        slot_id: item.slot_id,
        ad_source: "eiai"
      };
      appcall.navigator_ad({
        url: item.source_url
      });
      this.Adclicks(exporsureData);
    }
  },
  watch: {},
  filters: {
    title(value) {
      // 中文符号替换为英文符号
      value = value.replace(/？/g, "?");
      value = value.replace(/！/g, "!");
      value = value.replace(/，/g, ",");
      value = value.replace(/。/g, ".");
      value = value.replace(/；/g, ";");
      value = value.replace(/[‘|’]/g, "'");
      value = value.replace(/【/g, "[");
      value = value.replace(/】/g, "]");
      value = value.replace(/（/g, "(");
      value = value.replace(/）/g, ")");
      value = value.length < 22 ? value : value.slice(0, 21) + "...";
      return value;
    }
  }
};
</script>
<style scoped>
.article_content,
.article_content >>> * {
  font-size: 0.36rem !important;
  line-height: 0.6rem !important;
  /*color: #333!important;*/
  background: none !important;
  font-family: "Helvetica Neue", Helvetica, "STHeiTi", "Microsoft YaHei",
    sans-serif !important;
  font-weight: normal !important;
  text-align: left !important;
}

.article_content.small >>> * {
  font-size: 0.32rem !important;
}

.article_content.middle >>> * {
  font-size: 0.36rem !important;
}

.article_content.bigger >>> * {
  font-size: 0.4rem !important;
}

.article_content.biggest >>> * {
  font-size: 0.44rem !important;
}

.article_content >>> img {
  max-width: 100%;
  height: auto !important;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}

.article_content >>> iframe {
  width: 100% !important;
  max-width: 100%;
  height: auto !important;
}

.article_content >>> blockquote,
.article_content >>> p {
  margin: 0 auto 0.25rem;
}
</style>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.articleDetailAd {
  background: #fff;
  width: 100vw;
  .content {
    background: #fff;
    overflow: hidden;
    padding: 0.26rem 0 0;
    margin: 0 0.3rem 0.3rem;
    h1 {
      font-size: 0.48rem;
      line-height: 0.64rem;
      color: #333;
      font-weight: bold;
      margin: 0 0 0.44rem;
    }
    .nav {
      line-height: 0.45rem;
      position: relative;
      margin: 0 0 0.44rem;
      .region {
        color: #333;
        font-size: 0.24rem;
        .face {
          .wh(0.6rem, 0.6rem);
          .background("head_mr.png");
          border-radius: 0.6rem;
          overflow: hidden;
          img {
            .wh(100%, 100%);
          }
        }
        .desc {
          margin-left: 0.2rem;
          .name {
            font-size: 0.24rem;
            line-height: 1;
            padding: 0.02rem 0;
          }
          .time {
            color: #999;
            font-size: 0.22rem;
            line-height: 1;
            padding: 0.04rem 0;
          }
        }
        .focus {
          button {
            .wh(1.6rem, 0.6rem);
            .lineheight(.6rem);
            vertical-align: middle;
            border-radius: 0.6rem;
            color: #fff;
            text-align: left;
            font-size: 0.26rem;
            padding-left: 0.7rem;
            .background("add.png");
            background-color: #f12926;
            background-size: 0.24rem 0.24rem;
            background-position: 0.4rem 0.18rem;
            &.active {
              background: #fff;
              color: #f12926;
              .border(#F12926);
              padding-left: 0;
              text-align: center;
            }
          }
        }
      }
    }
    .all_content {
      overflow: hidden;
      .article_content {
        margin: 0 auto;
        overflow: hidden;
        position: relative;
      }
      .kefu {
        position: relative;
        width: 3rem;
        margin: 0 auto 0.5rem;
        .background("kefu.gif");
        background-size: 0.88rem 0.88rem;
        background-position: 0.15rem;
        font-size: 0.28rem;
        color: #056fb6;
        text-indent: 1.05rem;
        .border(#97999d);
        border-radius: 0.88rem;
        display: block;
        line-height: 0.88rem;
      }
      .tags {
        width: 100%;
        overflow: hidden;
        margin: 0.2rem auto 0;
        ul {
          margin-left: -0.24rem;
          li {
            background: #f8f8f8;
            border-radius: 0.54rem;
            padding: 0.14rem 0.3rem;
            font-size: 0.32rem;
            color: #333;
            margin: 0 0 0.24rem 0.24rem;
          }
        }
      }
      .share {
        font-size: 0.3rem !important;
        // overflow: hidden !important;
        margin-top: 0.2rem !important;
        text-align: center !important;
        .tips {
          line-height: 0.3rem !important;
          &:before {
            content: "";
            display: block;
            .wh(4.64rem, 1px);
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
            .wh(31%, 0.76rem);
            border-radius: 0.76rem;
            .lineheight(0.76rem);
            .border(#ccc);
            color: #444;
            display: block;
            font-size: 0.28rem;
            position: relative;
            &:nth-child(2) {
              margin-left: 3.5%;
            }
            .shareYindao{
              position: absolute;
              top: -1rem;
              left: 50%;
              margin-left: -1.175rem;
              width: 2.35rem;
              height: .75rem;
              background: #FF6260;
              border-radius: .08rem;
              color: #ffffff;
              font-size: .3rem;
              line-height: .75rem;
              &::after{
                position: absolute;
                top: .75rem;
                left: 50%;
                margin-left: -.15rem;
                content: '';
                display: block;
                // width:0;
                // height:0;
                // border-width:.17rem .15rem 0;
                // border-style:solid;
                // border-color:#FF6260 transparent transparent;
                width: .3rem;
                height: .17rem;
                .background('popTriangle.png');
              }
            }
            img {
              width: .46rem;
              margin: 0.14rem 0.14rem 0 0;
              display: inline-block;
              vertical-align: top;
            }
            &.dianzan {
              img {
                .wh(0.38rem, 0.38rem);
                margin: 0.16rem 0.14rem 0 0;
              }
              &.active {
                border-color: #d53c3e;
                color: #d53c3e;
              }
            }
          }
        }
      }
    }
    .load_all {
      position: relative;
      padding: 0 0.65rem;
      a {
        .border(@mcolor);
        border-radius: 0.9rem;
        display: block;
        background: #ffe6e6;
        font-size: 0.4rem;
        text-align: center;
        color: @mcolor;
        line-height: 0.9rem;
        position: relative;
        z-index: 1;
        &:after {
          content: "";
          display: inline-block;
          border-top: 10px solid @mcolor;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          position: relative;
          top: -2px;
        }
        &:active {
          background: rgba(255, 230, 230, 0.7);
        }
      }
      em {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: block;
        height: 3rem;
        background: -webkit-linear-gradient(
          top,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(255, 255, 255, 0.9) 55%,
          rgba(255, 255, 255, 0.93) 60%,
          rgba(255, 255, 255, 0.96) 65%,
          #fff 100%
        );
      }
    }
    .bigad {
      margin-top: 0.3rem;
    }
  }
  .article_swiper {
    width: 6.9rem;
    margin: 0.6rem auto 0;
    .baidu{
      width: 100%;
      height: auto;
    }
    .oneImg {
      width: 100%;
      height: 1.4rem;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .swiper-container {
      width: 100%;
      height: 1.4rem;
      overflow: hidden;
      z-index: 0;
      border-radius: .08rem;
      img {
        width: 100%;
        border-radius: .08rem;
      }
    }
  }
  .others {
    background: #ffffff;
    padding: 0 0.3rem;
    .title {
      padding: 0.38rem 0 0.12rem;
      text-align: left;
      position: relative;
      &::after {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: -1px;
        background: #f2f1ed;
        // transform: scaleY(0.5);
      }
      span {
        color: #585757;
        font-size: 0.28rem;
      }
    }
    .con {
      li {
        position: relative;
        &.bdad {
          margin-top: .3rem;
          padding-bottom: .3rem;
        }
        &::after {
          content: "";
          display: block;
          height: 1px;
          width: 100%;
          position: absolute;
          left: 0;
          bottom: -1px;
          background: #f2f1ed;
          // transform: scaleY(0.5);
        }
        a {
          display: block;
          padding: 0.3rem 0;
          
          &:active {
            background: #eee;
          }
          .pic {
            width: 113px;
            height: 75px;
            overflow: hidden;
            float: right;
            .border(#f2f1ed);
            img {
              width: 100%;
            }
          }
          .name {
            // margin-left: 128px;
            margin-right: 128px;
            font-size: 0.36rem;
            line-height: 0.5rem;
            color: #333;
            min-height: 75px;
            overflow: hidden;
            position: relative;
            text-align: justify;
            .region {
              font-size: 0.22rem;
              position: absolute;
              bottom: 0;
              line-height: 1;
              span {
                color: #999999;
                &.hits {
                  margin-left: 0.2rem;
                }
              }
            }
            .region1{
              position: absolute;
              left:0;
              bottom: .06rem;
              .wh(.5rem,.3rem);
              .background('ad_tip.png');
            }
          }
          .name1 {
            // margin-left: 128px;
            font-size: 0.36rem;
            color: #282a2f;
            min-height: 75px;
            overflow: hidden;
            position: relative;
            text-align: justify;
            .region {
              font-size: 0.22rem;
              position: absolute;
              bottom: 0;
              line-height: 1;
              span {
                color: #999999;
                &.hits {
                  margin-left: 0.2rem;
                }
              }
            }
          }
          .threeName {
            font-size: 0.34rem;
            color: #282a2f;
            line-height: 0.42rem;
            word-break: normal;
          }
          .threePic {
            padding: 0.12rem 0 0.09rem;
            .imgBox {
              height: 75px;
              width: 33%;
              overflow: hidden;
              margin-left: 0.5%;
              position: relative;
              .border(#f2f1ed);
              &:first-child {
                margin-left: 0;
              }
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .threeP {
            font-size: 0.24rem;
            line-height: 1;
            span {
              color: #97999d;
              &.hits {
                margin-left: 0.18rem;
              }
            }
          }
        }
      }
      .more {
        margin: 0.2rem 0;
        width: 100%;
        height: 0.26rem;
        line-height: 0.26rem;
        text-align: center;
        font-size: 0.26rem;
        color: #4a90e2;
        i {
          margin: 0.07rem 0 0.07rem 0.14rem;
          display: inline-block;
          width: 0.2rem;
          height: 0.12rem;
          .background("downMore.png");
          vertical-align: top;
        }
      }
    }
  }
  .j_loading {
    font-size: 0.6rem;
    padding: 0.24rem 16px 0.24rem;
    background: #fff;
    .spinner {
      width: 1.5rem;
      margin: 0 auto;
      text-align: center;
      .bounce1,
      .bounce2,
      .bounce3 {
        display: inline-block;
        width: 8px;
        height: 8px;
        -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
        animation: bouncedelay 1.4s infinite ease-in-out;
        border-radius: 100%;
        background: #999;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
      }
      .bounce1 {
        margin-right: 0.08rem;
        animation-delay: -0.32s;
      }
    }
    .txt {
      font-size: 0.24rem;
      padding: 0.1rem 0;
      text-align: center;
      color: #999;
    }
  }
  @keyframes bouncedelay {
    0%,
    100%,
    80% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
}
</style>