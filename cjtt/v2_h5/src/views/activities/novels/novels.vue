<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="小说">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div v-show="!loading" class="novels">
      <div class="novels_swiper">
        <swiper :options="swiperOption">
          <!-- slides -->
          <swiper-slide v-for="(item,$index) in lunboData" :key="$index">
            <a @click="jump('book.html?bookId='+item.srcid,'banner_'+$index)">
              <img v-lazy="item.img">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="novels_class clear">
        <a @click="jump('classify.html','分类')">
          <div class="left percent">
            <div class="img">
              <img src="../../../assets/images/novels/novels_classify.png">
            </div>
            <span class="name">分类</span>
          </div>
        </a>
        <a @click="jump('ranking.html','排行')">
          <div class="left percent">
            <div class="img">
              <img src="../../../assets/images/novels/novels_rank.png">
            </div>
            <span class="name">排行</span>
          </div>
        </a>
        <a @click="jump('limit_free.html','免费')">
          <div class="left percent">
            <div class="img">
              <img src="../../../assets/images/novels/novels_free.png">
            </div>
            <span class="name">免费</span>
          </div>
        </a>
        <a @click="jump('search_type.html?type=2','书架')" >
          <div class="left percent">
            <div class="img">
              <img src="../../../assets/images/novels/novels_bookrack.png">
            </div>
            <span class="name">书架</span>
          </div>
        </a>
        <a @click="jump('user_center.html','我的')">
          <div class="left percent">
            <div class="img">
              <img src="../../../assets/images/novels/novels_my.png">
            </div>
            <span class="name">我的</span>
          </div>
        </a>
      </div>
      <div class="spacer"></div>
      <div class="novels_mrt">
        <div class="top">
          <div class="left">今日必读</div>
          <a @click="jump(todayMore,'必读更多')">
            <div class="right">更多<i class="goIcon"></i></div>
          </a>
        </div>
        <div class="today clear">
          <a @click="jump('book.html?bookId='+item.srcid,'必读_'+$index)" v-for="(item,$index) in todayData" :key="$index">
            <div class="list left">
              <div class="img">
                <img v-lazy="item.img">
              </div>
              <div class="name">{{item.name | name}}</div>
              <div class="num"><span class="scale">{{item.followNum | followNum}}人正在读</span></div>
            </div>
          </a>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="novels_free">
        <div class="top">
          <div class="left">限时免费</div>
          <a @click="jump(freeMore,'免费更多')">
            <div class="right">更多<i class="goIcon"></i></div>
          </a>
        </div>
        <div class="today clear">
          <a @click="jump('book.html?bookId='+item.srcid,'免费_'+$index)"  v-for="(item,$index) in freeData" :key="$index">
            <div class="list left">
              <div class="img">
                <i class="freeIcon"></i>
                <img v-lazy="item.img">
              </div>
              <div class="name">{{item.name | name(4)}}</div>
              <div class="price"><span class="scale"><s class="num">{{item.tag[0]}}</s><span class="zero">{{item.tag[1]}}</span></span></div>
            </div>
          </a>
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
import md5 from 'js-md5';
import conf from 'conf'

export default {
  name: "novels",
  data() {
    return {
      loading: false,
      swiperOption: {
        loop: false,
        pagination: ".swiper-pagination",
        paginationClickable: false,
        lazy: true,
        touchMoveStopPropagation: false,
        autoplay: 3000
      },
      lunboData:[],
      todayData:[],
      todayMore:'',
      freeData:[],
      freeMore:'',
      param:{},
    };
  },
  components: {
    nvHead,
    nvLoading,
    swiper,
    swiperSlide
  },
  created() {
    // this.$Progress.start();
  },
  mounted() {
    this.getFree();
  },
  methods: {
    /**
     * 获取首页数据
     */
    async getFree() {
      let params = {type: 'index',channelCode:'C1000288' };
      let rs = await ajax(
        "get",
        conf.novelApi+"/asg/portal/h5/index.do",
        {},
        params
      );
      if (rs.blockInfoList) {
        for(let [i,item] of rs.blockInfoList.entries()){
          if(item.ftlname=='lunbotu.ftl'){
            this.lunboData=item.blockResources;
          }else if(i==2){
            this.todayData=item.blockResources.slice(0,6);
            this.todayMore = item.isMore;
          }else if(i==1){
            this.freeData=item.blockResources.slice(0,8);
            this.freeMore = item.isMore;
          }
        }
      } else {
        console.log("wrong");
      }
    },
    /**
     * 跳转
     */
    async jump(url,position){
      // 百度统计
      if(!!position){_hmt.push(['_trackEvent', 'novels', 'click', position])}
      let appdata = await appcall.getAppData();
      let params = {
        token:appdata.uid?md5(appdata.uid):'',
        deviceId:appdata.device_id,
        timestamp:appdata.timestamp,
        key:'Km0xb9'
      };
      let dataStr = ''; //数据拼接字符串
      params.redirecturi = url;
      Object.keys(params).forEach(key => {
        dataStr += key + '=' + params[key] + '&';
      })
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      appcall.openNovel({
        title:'',
        url:conf.novelApi+'/asg/portal/h5/login/third/mj.do?'+dataStr
      })
    },
  },
  filters:{
    name(value,num=6) {
      if (value) {
        value = value.length < num ? value : value.substr(0, num) + "...";
      }
      return value;
    },
    followNum(value) {
      if (value) {
       value= value < 10000? value : (value/10000).toFixed(2) + '万';
      }
      return value;
    }

  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.novels {
  width: 7.5rem;
  overflow: hidden;
  background: #f8f8f8;
  padding-bottom: 0.6rem;
  .novels_swiper {
    width: 100%;
    height: 2.6rem;
    img {
      width: 100%;
      height: 2.6rem;
    }
  }
  .novels_class {
    width: 7.5rem;
    overflow: hidden;
    background: #ffffff;
    height: 2.2rem;
    padding-top: 0.4rem;
    .percent {
      width: 20%;
      text-align: center;
      .img {
        display: inline-block;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          margin: -.05rem auto;
        }
      }
      .name {
        display: block;
        line-height: 1;
        font-size: 0.28rem;
        color: #333333;
        margin: -.15rem auto;
      }
    }
  }
  .spacer {
    width: 7.5rem;
    height: 0.1rem;
    background: #f8f8f8;
  }
  .novels_mrt {
    width: 7.5rem;
    overflow: hidden;
    background: #ffffff;
    .top {
      height: 0.98rem;
      line-height: 1;
      padding: 0.3rem;
      .left {
        font-size: 0.36rem;
        font-weight: bold;
        color: #333333;
      }
      .right {
        font-size: 0.28rem;
        color: #999999;
        .goIcon {
          display: inline-block;
          width: 0.16rem;
          height: 0.24rem;
          margin-left: 2px;
          .background("novels/novels_right.png");
        }
      }
    }
    .today {
      padding: 0 0.3rem;
      .list {
        width: 2.18rem;
        margin: 0 0 0.36rem 0.18rem;
        overflow: hidden;
        .img {
          height: 2.9rem;
          width: 2.18rem;
          border-radius: 0.03rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          margin: 0.2rem 0 0.1rem 0;
          font-size: 0.28rem;
          line-height: 1;
          font-weight: 600;
          color: #333333;
        }
        .num {
          height: 0.24rem;
          color: #999999;
          background: url("../../../assets/images/novels/novels_hot.png")
            no-repeat 0 0.01rem;
          background-size: 0.17rem 0.21rem;
          .scale {
            display: block;
            font-size: 0.4rem;
            transform: scale(0.5);
            transform-origin: top left;
            -webkit-transform: scale(0.5);
            -webkit-transform-origin: top left;
            padding-left: 0.46rem;
            width: 200%;
            line-height: 0.48rem;
            color: #999999;
          }
        }
      }
      a {
        &:nth-child(3n + 1) {
          .list {
            margin-left: 0;
          }
        }
      }
    }
  }
  .novels_free {
    width: 7.5rem;
    overflow: hidden;
    background: #ffffff;
    .top {
      height: 0.98rem;
      line-height: 1;
      padding: 0.3rem;
      .left {
        font-size: 0.36rem;
        font-weight: bold;
        color: #333333;
        background-image: url("../../../assets/images/novels/novels_limit.png");
        background-size: 0.36rem 0.36rem;
        background-repeat: no-repeat;
        padding-left: 0.5rem;
        line-height: 1;
      }
      .right {
        font-size: 0.28rem;
        color: #999999;
        .goIcon {
          display: inline-block;
          width: 0.16rem;
          height: 0.24rem;
          margin-left: 2px;
          .background("novels/novels_right.png");
        }
      }
    }
    .today {
      padding: 0 0.3rem;
      .list {
        width: 1.62rem;
        margin: 0 0 0.36rem 0.14rem;
        .img {
          height: 2.14rem;
          width: 1.62rem;
          border-radius: 0.06rem;
          overflow: hidden;
          position: relative;
          .freeIcon {
            position: absolute;
            top: 0.04rem;
            left: 0.04rem;
            display: block;
            width: 0.52rem;
            height: 0.3rem;
            .background("novels/novels_freeIcon.png");
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          margin: 0.2rem 0 0.1rem 0;
          font-size: 0.28rem;
          line-height: 1;
          font-weight: 600;
          color: #333333;
        }
        .price {
          height: 0.2rem;
          .scale {
            display: inline-block;
            transform: scale(0.5);
            transform-origin: top left;
            -webkit-transform: scale(0.5);
            -webkit-transform-origin: top left;
            width: 200%;
            line-height: 1;
            .num {
              font-size: 0.4rem;
              color: #999999;
            }
            .zero {
              font-size: 0.4rem;
              color: #ff2c2c;
              margin-left: 0.16rem;
            }
          }
        }
      }
      a {
        &:nth-child(4n + 1) {
          .list {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>