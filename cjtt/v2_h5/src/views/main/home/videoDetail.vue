<template>
  <div class="vDetail">
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="videoDetail" v-show="!loading">
      <div class="video">
        <!-- <d-player :options="options" @play="play" @pause="pause" ref="player">
        </d-player> -->
        <iframe :src='detail.url' frameborder='0' width='100%' height='100%' allowfullscreen='true'>
        </iframe>
      </div>
      <div class="content">
        <h1>{{detail.title}}</h1>
        <div class="tt">
          <div class="region">{{detail.region}}</div>
          <div class="time">{{detail.duration}}</div>
        </div>
      </div>
      <div class="others infors">
        <div class="title">
          <p>相关视频</p>
        </div>
        <div class="con">
          <ul>
            <li v-for="(item,$index) in relates" :key="$index">
              <a @click="openother(item)">
                <div class="otrvpic">
                  <img :src="item.piturl" width="100%">
                </div>
                <div class="name">
                  <p>{{item.title}}</p>
                  <div></div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="others comment" v-show="mycomments.length>0">
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
                <p class="cmt">{{item.content | pinglun}}</p>
              </div>
            </li>
          </ul>
          <div class="moreComment" @click="morecomment" v-show="comments.length>0">查看更多评论</div>
          <div class="noComment" v-show="comments.length==0" @click="comment">暂无评论，点击抢沙发 </div>
        </div>
      </div>
      <div class="readGold bigger" v-show="popshow">
        <div class="mask"></div>
        <div class="coinIcon"></div>
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
import ajax from '@/assets/js/ajax';
import appcall from '@/assets/js/appcall';
//import dPlayer from '@/components/vue-dplayer';

var startX, startY, endX, endY, moveX, moveY;

export default {
  name: 'videoDetail',
  data() {
    return {
      loading: true,
      detail: {},
      vshow: false,
      popshow: false,
      relates: [],
      mycomments: [],
      comments: [],
      id: 0,
      overtime: false,
      movecount: 0,
      realreaded: false,
      options: {
        video: {
          url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
          pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
        },
        autoplay: false,
      },
      readcoin:0,
    }
  },
  components: {
    nvHead,
    nvLoading,
    nvTop,
    //dPlayer
  },
  computed: {},
  created() {},
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
      // 打开webview 10秒 + h5 40秒：
      setTimeout(() => {
        this.overtime = true;
        this.realRead();
      }, 40000)
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
    play() {
      console.log('play callback')
    },
    pause() {
      console.log('pause callback')
    },
    touchstart(e) {
      //console.log('start',e.touches[0].pageY);
      startY = e.touches[0].pageY;
    },
    touchmove(e) {
      //console.log('end:',e.changedTouches[0].pageY);
      endY = e.changedTouches[0].pageY;
      moveY = endY - startY;
      if (moveY < -20) {
        this.movecount++;
        this.realRead();
      }
      //console.log('向上',this.movecount);

    },
    /**
     * 获取视频详情
     */
    async getdetail() {
      let params = {
        article_id: this.id
      };
      let comm = await appcall.getAppData();

      let rs = await ajax('post', this.$apiurl + '/video/get_detail', comm, params);
      console.log(rs);
      if (rs && rs.code === 1001) {
        this.loading = false;
        this.detail = rs.data;
        this.detail.url = this.detail.url + '&fullscreen=1';
        this.cid = rs.data.sc_catid;
        this.getrelates();
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 获取相关视频
     */
    async getrelates() {
      let params = {
        aid: this.id,
        cid: this.cid,
      }
      let comm = await appcall.getAppData();

      let rs = await ajax('post', this.$apiurl + '/video/get_related_video', comm, params);
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
        aid: this.id
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax('post', this.$apiurl + '/comment/get_my_article_comments', comm, params);
      if (rs && rs.code === 1001 && rs.data) {
        rs.data.list.forEach(n => {
          n.headmr = n.headimgurl ? false : true;
        })
        this.mycomments = rs.data.list;
      } else if (rs.code === 1007 || rs.code === 1008) {
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
    /**
     * 真实阅读送金币
     */
    async realRead() {
      let params = {
        aid: this.id,
      }
      // 20秒 && 上划次数>2次
      if (!this.realreaded && this.overtime && this.movecount > 2) {
        let comm = await appcall.getRequestData(params);
        // 登录
        if (comm.uid && comm.token) {
          let rs = await ajax('post', this.$apiurl + '/video/set_real_view', comm, params);
          if (rs && rs.code == 1001) {
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
    morecomment() {
      appcall.morecomment({ type: 2 });
    },
    openother(item) {
      appcall.openother({ type: 2, id: item.article_id });
    },
    comment() {
      appcall.comment({ type: 2 });
    }
  },
  watch: {}
}

</script>
<style type="text/css">
/*.dplayer {
  height: 100%;
}*/
.dplayer-setting,.dplayer-full-in-icon,.dplayer-full{
  display: none !important;
}
</style>
<style lang="less" scoped>
@import '../../../assets/css/mixin';
.vDetail {
  background: #fbf9f9;
}

.video {
  width: 100%;
  height: 4.7rem;
}

.content {
  background: #fff;
  overflow: hidden;
  padding: .26rem .3rem .3rem;
  h1 {
    font-size: .5rem;
    line-height: 0.68rem;
    color: #333;
    font-weight: normal;
    margin-bottom: .2rem;
  }
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
}

.others {
  background: #fff;
  padding: 0 .3rem;
  margin-top: .2rem;
  .title {
    padding: .35rem 0;
    .border(#eee,bottom);
    p {
      font-size: .4rem;
      padding-left: .38rem;
      .border(@mcolor,left);
      line-height: 1;
    }
  }
}

.infors .con {
  li {
    .border(#eee,top);
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
    .otrvpic {
      width: 2.4rem;
      height: 1.6rem;
      overflow: hidden;
      float: left;
      position: relative;
      img {
        display: block;
        width: 100%;
      }
      &:after {
        content: '';
        display: block;
        width: .58rem;
        height: .58rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -.29rem;
        margin-left: -.29rem;
        .background('btn_play.png');
      }
    }
    .name {
      margin-left: 2.64rem;
      height: 1.6rem;
      overflow: hidden;
      text-align: justify;
      p {
        font-size: .34rem;
        color: #333;
        line-height: .44rem;
        height: 1.32rem;
        overflow: hidden;
      }
    }
  }
}

.comment .con {
  li {
    .border(#eee,bottom);
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
      .background('head_mr.png');
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
  .moreComment {
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
  .noComment {
    text-align: center;
    font-size: .34rem;
    line-height: 1;
    padding: .4rem 0;
    color: #999;
  }
}

.readGold {
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
  .coinIcon{
    width: 1.94rem;
    height: 1.25rem;
    .background('readgold_coin.png');
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
  animation-name: bigger;
  -webkit-animation-name: bigger;
  animation-duration: .5s;
  -webkit-animation-duration: .5s;
  -moz--name: bigger;
  -moz-animation-duration: .5s;
}

@keyframes bigger {
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
