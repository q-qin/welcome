<template>
  <div class="aDetail">
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" :page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="articleDetail" v-show="!loading">
      <div class="content">
        <h1>{{detail.title}}</h1>
        <div class="tt">
          <div class="region">{{detail.region}}</div>
          <div class="time">{{detail.push_date}}</div>
          <!-- <div class="region clear">
            <div class="face left"><img src=""></div>
            <div class="desc left">
              <p class="name">{{detail.region}}</p>
              <p class="time">{{detail.push_date}}</p>
            </div>
            <div class="guanzhu right">
              <button >关注</button>
            </div>
          </div> -->
        </div>
        <v-pviewer :complete="complete" selector="img">
          <div class="article_content" :style="height" v-html="detail.content"></div>
        </v-pviewer>
        <div class="load_all" v-show="!loadall">
          <a @click="showall">展开阅读全文
            <i class="zhankai"></i>
          </a>
          <em></em>
        </div>
      </div>
      <div class="others infors">
        <div class="title">
          <p>相关资讯</p>
        </div>
        <div class="con">
          <ul>
            <li v-for="(item,$index) in relates" :key="$index">
              <a @click="openother(item)">
                <div class="pic">
                  <img :src="item.piturl" width="100%">
                </div>
                <div class="name">
                  {{item.title}}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="others comment" id="mycomments" v-show="mycomments.length>0">
        <div class="title">
          <p>我的评论</p>
        </div>
        <div class="con">
          <ul>
            <li v-for="(item,$index) in mycomments" :key="$index">
              <div class="head">
                <img :src="item.headimgurl" width="100%" v-show="!item.headmr">
              </div>
              <div class="cm">
                <p class="nickname">{{item.nickname}}</p>
                <p class="created">{{item.created}}</p>
                <p class="cmt">{{item.content}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="others comment">
        <div class="title">
          <p>最新评论</p>
        </div>
        <div class="con">
          <ul>
            <li v-show="comments.length>0" v-for="(item,$index) in comments" :key="$index">
              <div class="head">
                <img :src="item.headimgurl" width="100%" v-show="!item.headmr">
              </div>
              <div class="cm">
                <p class="nickname">{{item.nickname}}</p>
                <p class="created">{{item.created}}</p>
                <p class="cmt">{{item.content}}</p>
              </div>
            </li>
          </ul>
          <div class="morecomment" @click="morecomment" v-show="comments.length>0">查看更多评论</div>
          <div class="nocomment" v-show="comments.length==0" @click="comment">暂无评论，点击抢沙发 </div>
        </div>
      </div>
      <div class="readgold bigger" v-show="popshow">
        <div class="mask"></div>
        <div class="coinicon"></div>
        <div class="tip">阅读奖励</div>
        <div class="coin">+{{readcoin}}</div>
      </div>
    </div>
    <nv-top></nv-top>
  </div>
</template>
<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import nvTop from '@/components/backtotop.vue';
import ajax from '@/config/ajax';
import appcall from '@/config/appcall'
import VPviewer from 'vue-photo-viewer';
import 'vue-photo-viewer/dist/pviewer.css';

var startX, startY, endX, endY, moveX, moveY;

export default {
  name: 'articleDetail',
  data() {
    return {
      loading: true,
      height: 'height:15rem;',
      popshow: false,
      loadall: false,
      detail: {},
      relates: [],
      mycomments: [],
      comments: [],
      id: 0,
      overtime: false,
      movecount: 0,
      realreaded: false,
      complete: false,
      readcoin:0,
    }
  },
  components: {
    nvHead,
    nvLoading,
    nvTop,
    VPviewer
  },
  created() {},
  computed: {},
  mounted() {

    this.id = this.$route.params.id;
    this.getdetail();
    this.getmycomments();
    this.getcomments();
    this.setFontsize();

    // app评论完成之后获取我的评论
    window.aftercomment = function(aid) {
      this.getmycomments();
    }.bind(this)

    // 设置真实阅读
    window.realread = function() {
      // 打开webview 10秒 + h5 5秒：
      setTimeout(() => {
        this.overtime = true;
        this.realRead();
      }, 5000)
    }.bind(this)

    // 设置字体大小调用
    window.afterSetSize = function(sizeType) {
      this.setFontsize(sizeType)
    }.bind(this)

    window.addEventListener('touchstart', this.touchstart)
    window.addEventListener('touchmove', this.touchmove)

  },
  beforeDestroy() {},
  methods: {

    touchstart(e) {
      //console.log('start',e.touches[0].pageY);
      startY = e.touches[0].pageY;
    },
    touchmove(e) {
      //console.log('end:',e.changedTouches[0].pageY);
      endY = e.changedTouches[0].pageY;
      moveY = endY - startY;
      if (moveY < -20 && this.loadall) {
        this.movecount++;
        this.realRead();
      }
      //console.log('向上',this.movecount);

    },
    /**
     * 获取资讯详情
     */
    async getdetail() {
      let params = {
        id: this.id
      };
      let comm = await appcall.getAppData();

      let rs = await ajax('post', this.$apiurl + '/article/get_detail', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        this.loading = false;
        this.detail = rs.data;
        this.detail.content = this.detail.content.replace(/&nbsp;/g, '');
        this.complete = true;
        this.cid = rs.data.sc_catid;
        this.getrelates();
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 获取相关资讯
     */
    async getrelates() {
      let params = {
        aid: this.id,
        cid: this.cid,
      }
      let comm = await appcall.getAppData();

      let rs = await ajax('post', this.$apiurl + '/article/get_related_article_lists', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        this.relates = rs.data.list;
      } else if (rs && rs.code === 1008) {
        this.relates = [];
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 获取我的评论
     */
    async getmycomments() {
      let params = {
        aid: this.id,
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/comment/get_my_article_comments', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        rs.data.list.forEach(n => {
          n.headmr = n.headimgurl ? false : true;
        })
        this.mycomments = rs.data.list;
      } else if (rs=== 1007 || rs.code === 1008) {
        this.mycomments = [];
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 获取评论
     */
    async getcomments() {
      let params = {
        aid: this.id,
        num: 5,
      }
      let comm = await appcall.getAppData();

      let rs = await ajax('post', this.$apiurl + '/comment/get_comment_list', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        rs.data.list.forEach(n => {
          n.headmr = n.headimgurl ? false : true;
        })
        this.comments = rs.data.list;
      } else if (rs=== 1007 || rs.code === 1008) {
        this.comments = [];
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 真实阅读送金币
     */
    async realRead() {
      let params = {
        aid: this.id,
      }
      // 20秒 && 上划次数>2次 && 展开全文
      if (!this.realreaded && this.overtime && this.movecount > 2 && this.loadall) {
        let comm = await appcall.getRequestData(params);
        // 登录
        if (comm.uid && comm.token) {
          let rs = await ajax('post', this.$apiurl + '/article/set_real_read', comm, params);
          if (rs && rs.code === 1001) {
            this.popshow = true;
            this.readcoin = rs.data.coin;
            setTimeout(() => {
              this.popshow = false;
            }, 1500)
          }
          this.realreaded = true;
        }
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
          document.documentElement.style.fontSize = (fsize * .9) + "px";
          break;
        case 3:
          document.documentElement.style.fontSize = (fsize * 1.05) + "px";
          break;
        case 4:
          document.documentElement.style.fontSize = (fsize * 1.15) + "px";
          break;
        case 2:
        default:
          document.documentElement.style.fontSize = fsize + "px";
          break;
      }
    },
    morecomment() {
      appcall.morecomment({
        type: 1
      });
    },
    showall() {
      this.loadall = true;
      this.height = 'height:auto';
    },
    openother(item) {
      appcall.openother({
        type: 1,
        id: item.id
      });
    },
    comment() {
      appcall.comment({
        type: 1
      });
    }
  },
  watch: {},
  filters: {
    pinglun(value) {
      value = value.length < 18 ? value : value.substr(0, 18) + '...';
      return value;
    },
  }
}

</script>
<style type="text/css">
.v-pviewer-wrap .v-pviewer-header .v-pviewer-index,
.v-pviewer-wrap .v-pviewer-header .v-pviewer-index a {
  color: #fff;
}

</style>
<style scoped>
.article_content,
.article_content>>>* {
  font-size: .38rem!important;
  line-height: .7rem!important;
  /*color: #333!important;*/
  background: none!important;
  font-family: "Helvetica Neue", Helvetica, 'STHeiTi', 'Microsoft YaHei', sans-serif!important;
  font-weight: normal!important;
  text-align: left!important;
}

.article_content>>>img {
  max-width: 100%;
  height: auto!important;
  margin-top: .2rem;
  margin-bottom: .2rem;
}

.article_content>>>iframe {
  width: 100%!important;
  max-width: 100%;
  height: auto!important;
}

.article_content>>>blockquote,
.article_content>>>p {
  margin: 0 auto .25rem;
}

</style>
<style lang="less" scoped>
@import '../../style/colors';
.vDetail {
  background: #fbf9f9;
}

.content {
  background: #fff;
  overflow: hidden;
  padding: .26rem .3rem .3rem;
  h1 {
    font-size: .5rem;
    line-height: 0.68rem;
    color: #333;
    font-weight: 600;
    margin-bottom: .2rem;
  }
  // .tt {
  //   line-height: .45rem;
  //   position: relative;
  //   margin-bottom: .2rem;
  //     height: .9rem;
  //   .region {
  //     color: #333;
  //     font-size: .32rem;
  //     .face{
  //       width: .9rem;
  //       height: .9rem;
  //       background: url(../../images/head_mr.png) no-repeat center center;
  //       background-size: 100%;
  //       border-radius: .9rem;
  //     }
  //     .desc{
  //       margin-left: .2rem;
  //       .name{
  //         font-size: .32rem;
  //       }
  //       .time{
  //         color:#999;
  //         font-size: .26rem;
  //       }
  //     }
  //     .guanzhu{
  //       button{
  //         width: 1.2rem;
  //         height: .6rem;
  //         margin-top: .15rem;
  //         vertical-align: middle;
  //         border-radius: .1rem;
  //         background: @mcolor;
  //         color:#fff;
  //         font-size: .34rem;
  //         &.active{
  //           background: #fff;
  //           color:@mcolor;
  //           border:1px solid @mcolor;
  //         }
  //       }
  //     }
  //   }
  // }
  .tt {
    height: .48rem;
    line-height: .48rem;
    position: relative;
    margin-bottom: .2rem;
    .region {
      color: #333;
      font-size: .32rem;
      padding-right: 1.8rem;
    }
    .time {
      color: #999;
      font-size: .26rem;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .article_content {
    overflow: hidden;
    position: relative;
  }
  .load_all {
    position: relative;
    padding: 0 .65rem;
    a {
      border: 1px solid @mcolor;
      border-radius: .45rem;
      height: .9rem;
      display: block;
      background: #ffe6e6;
      font-size: .4rem;
      text-align: center;
      color: @mcolor;
      line-height: .8rem;
      cursor: pointer;
      position: relative;
      z-index: 2;
      &:after {
        content: '';
        display: inline-block;
        border-top: .2rem solid @mcolor;
        border-left: .1rem solid transparent;
        border-right: .1rem solid transparent;
        position: relative;
        top: -.05rem;
      }
      &:active {
        background: rgba(255, 230, 230, .7);
      }
    }
    em {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: block;
      height: 3rem;
      background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .8) 50%, rgba(255, 255, 255, .9) 55%, rgba(255, 255, 255, .93) 60%, rgba(255, 255, 255, .96) 65%, #FFF 100%);
    }
  }
}

.others {
  background: #fff;
  padding: 0 .3rem;
  margin-top: .2rem;
  .title {
    padding: .35rem 0;
    border-bottom: 1px solid #eee;
    p {
      font-size: .4rem;
      padding-left: .38rem;
      border-left: .08rem solid @mcolor;
      line-height: 1;
    }
  }
}

.infors .con {
  li {
    border-top: 1px solid #eee;
    &:first-child {
      border-top: 0;
    }
    a {
      display: block;
      padding: .3rem;
      margin: 0 -.3rem;
      &:active {
        background: #eee;
      }
    }
    .pic {
      width: 2.4rem;
      height: 1.6rem;
      overflow: hidden;
      float: left;
      img {
        display: block;
        width: 100%;
      }
    }
    .name {
      margin-left: 2.64rem;
      font-size: .36rem;
      color: #333;
      line-height: .53rem;
      height: 1.6rem;
      overflow: hidden;
      text-align: justify;
    }
  }
}

.comment .con {
  li {
    border-bottom: 1px solid #eee;
    padding: .3rem 0;
    &:first-child {
      border-top: 0;
    }
    .head {
      float: left;
      width: .9rem;
      height: .9rem;
      overflow: hidden;
      border-radius: 100%;
      background: url('../../images/head_mr.png') no-repeat center;
      background-size: 100%;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .cm {
      margin-left: 1.1rem;
      text-align: justify;
    }
    .nickname {
      font-size: .34rem;
      line-height: 1;
      color: #59c1bd;
      margin-bottom: .2rem;
    }
    .created {
      font-size: .26rem;
      line-height: 1;
      color: #999;
      margin-bottom: .25rem;
    }
    .cmt {
      font-size: .38rem;
      line-height: .46rem;
      color: #333;
    }
  }
  .morecomment {
    font-size: .34rem;
    line-height: 1;
    color: #59c1bd;
    cursor: pointer;
    text-align: center;
    padding: .4rem 0;
    &:after {
      content: '';
      display: inline-block;
      border-top: .1rem solid #59c1bd;
      border-left: .05rem solid transparent;
      border-right: .05rem solid transparent;
      position: relative;
      top: -.05rem;
      margin-left: .1rem;
    }
  }
  .nocomment {
    text-align: center;
    font-size: .34rem;
    line-height: 1;
    padding: .4rem 0;
    color: #999;
  }
}


.readgold {
  width: 3.26rem;
  height: 3.16rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  -webkit-transition: all 0.6s;
  transition: all 0.6s;
  z-index: 3;
  .mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    background: #000;
    opacity: .5;
    border-radius: .2rem;
  }
  .coinicon{
    width: 1.94rem;
    height: 1.25rem;
    background: url(../../images/readgold_coin.png) no-repeat center center ;
    background-size: 100%;
    margin: .45rem auto .35rem;
    opacity: 1;
    position: relative;
  }
  .tip,.coin{
    font-size: .36rem;
    color: #ffe82f;
    opacity: 1;
    position: relative;
    text-align: center;
  }
}

.bigger {
  animation-name:bigger;
  -webkit-animation-name: bigger;
  animation-duration:.5s;
  -webkit-animation-duration: .5s;
  -moz--name: bigger;
  -moz-animation-duration: .5s;
}
@keyframes bigger{
  0% {
    -webkit-transform: scale(.6);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
@-webkit-keyframes bigger {
  0% {
    -webkit-transform: scale(.6);
  }
  100% {
    -webkit-transform: scale(1);
  }
}

@-moz-keyframes bigger {
  0% {
    -moz-transform: scale(.6);
  }
  100% {
    -moz-transform: scale(1);
  }
}

</style>
