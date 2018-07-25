<template>
  <div class="vFAQ">
    <nv-loading :loading="loading"></nv-loading>
    <div class="faq_video">
      <div v-show="!loading" v-if="isios">
        <div class="videoExplanation">视频解说</div>
        <div class="content">
          <ul class="items">
            <li v-for="(item,$index) in faq_new" v-if="(item.iosshow && isios)||!isios" :key="$index">
              <div class="ask" @click="toggle(1,$event,$index)">
                {{item.ask}}
                <i class="iconfont" :class="{'down':!item.show,'up':item.show}">&#xe6a6;</i>
              </div>
              <div class="answer" v-show="item.show ">
                <div class="dropDown" @click="videoPlay(1)">1.如何登录超级头条？</div>
                <div class="dropDown" @click="videoPlay(2)">2.如何阅读超级头条新闻？</div>
                <div class="dropDown" @click="videoPlay(3)">3.如何评论超级头条新闻？</div>
                <div class="dropDown" @click="videoPlay(5)">4.如何完成日常任务？</div>
                <div class="dropDown" @click="videoPlay(4)" v-if="!iospedding">5.如何查看金币？</div>
              </div>
            </li>
          </ul>
          <ul class="items">
            <li v-for="(item,$index) in faq_score" v-if="(item.iosshow && isios)||!isios" :key="$index">
              <div class="ask" @click="toggle(2,$event,$index)">
                {{item.ask}}
                <i class="iconfont" :class="{'down':!item.show,'up':item.show}">&#xe6a6;</i>
              </div>
              <div class="answer" v-show="item.show ">
                <div class="dropDown" @click="videoPlay(6)">1.如何朋友圈群发收徒？</div>
                <div class="dropDown" @click="videoPlay(7)">2.如何朋友圈分享收徒？</div>
                <div class="dropDown" @click="videoPlay(8)">3.如何微信私信收徒？</div>
                <div class="dropDown" @click="videoPlay(9)">4.如何QQ邀请收徒？</div>
              </div>
            </li>
          </ul>
          <div class="title" @click="videoPlay(10)">
            不能用微信分享点击此处看教程
            <i class="iconfont video1">&#xe606;</i>
          </div>
        </div>
        <div v-if="iframeshow" class="iframealert">
          <iframe class="iframe" frameborder=0 :src="videourl">
          </iframe>
          <i class="iconfont iframe1" @click="iframe"> &#xe685;</i>
        </div>
      </div>
      <div v-show="!loading" v-else>
        <div class="videoExplanation">视频解说</div>
        <div class="content">
          <ul class="items">
            <li v-for="(item,$index) in faq_score" v-if="(item.iosshow && isios)||!isios" :key="$index">
              <div class="ask" @click="toggle(2,$event,$index)">
                {{item.ask}}
                <i class="iconfont" :class="{'down':!item.show,'up':item.show}">&#xe6a6;</i>
              </div>
              <div class="answer" v-show="item.show ">
                <div class="dropDown" @click="videoPlayAndro(1)">1.如何朋友圈群发收徒？</div>
                <!-- <div class="dropDown" @click="videoPlayAndro(2)">2.如何朋友圈分享收徒？</div> -->
                <div class="dropDown" @click="videoPlayAndro(2)">2.如何微信私信收徒？</div>
                <div class="dropDown" @click="videoPlayAndro(3)">3.如何QQ邀请收徒？</div>
              </div>
            </li>
          </ul>
        </div>
        <div v-show="iframeshow" class="iframealert">
          <iframe class="iframe" frameborder=0 :src="videourl">
          </iframe>
          <i class="iconfont iframe1" @click="iframe"> &#xe685;</i>
        </div>
      </div>
    </div> 
  </div>
</template>
<script>
import nvLoading from '@/components/loading.vue';
import appcall from '@/assets/js/appcall'

export default {
  name: 'faqVideo',
  data() {
    return {
      loading: false,
      isios: false,
      iospedding: false,
      iframeshow: false,
      videoAllurl: ['https://v.qq.com/iframe/player.html?vid=c0548raxwtk&tiny=0&auto=0', //1
        'https://v.qq.com/iframe/player.html?vid=g0548y9wier&tiny=0&auto=0', //2
        'https://v.qq.com/iframe/player.html?vid=p0548gxypp8&tiny=0&auto=0', //3
        'https://v.qq.com/iframe/player.html?vid=k0548sut9r3&tiny=0&auto=0', //4
        'https://v.qq.com/iframe/player.html?vid=s0548ikvzjz&tiny=0&auto=0', //5
        'https://v.qq.com/iframe/player.html?vid=t0548qfcfsh&tiny=0&auto=0', //6
        'https://v.qq.com/iframe/player.html?vid=c0548ngp8pv&tiny=0&auto=0', //7
        'https://v.qq.com/iframe/player.html?vid=b0548g9xm1e&tiny=0&auto=0', //8
        'https://v.qq.com/iframe/player.html?vid=h0548g4yesn&tiny=0&auto=0', //9
        'https://v.qq.com/iframe/player.html?vid=o0548iycn5l&tiny=0&auto=0', //10
      ],
      videoAllurlAndro: ['https://v.qq.com/iframe/player.html?vid=l0547ed9vqg&tiny=0&auto=0',
        'https://v.qq.com/iframe/player.html?vid=e0548oxjnph&tiny=0&auto=0',
        'https://v.qq.com/iframe/player.html?vid=b0548l2msot&tiny=0&auto=0'
      ],
      videourl: '',
      faq_new: [{
        ask: '如何玩转超级头条？',
        show: false,
        iosshow: true,
      }],
      faq_score: [{
        ask: '如何分享收徒？',
        show: false,
        iosshow: true,
      }]
    }
  },
  components: {
    nvLoading
  },
  async created() {
    if (JKEventHandler.browser().ios) {
      this.isios = true;
    }
    // ios 提审状态
    this.iospedding = await appcall.getReviewStatus();

  },
  mounted() {},
  methods: {
    toggle(type, event, index) {
      switch (type) {
        case 1:
          this.faq_new[index].show = !this.faq_new[index].show;
          break;
        case 2:
          this.faq_score[index].show = !this.faq_score[index].show;
          break;
        default:
          break;
      }
    },
    iframe() {
      this.iframeshow = false
    },
    videoPlay(value) {
      switch (value) {
        case 1:
          this.videourl = this.videoAllurl[0]
          this.iframeshow = true
          break;
        case 2:
          this.videourl = this.videoAllurl[1]
          this.iframeshow = true
          break;
        case 3:
          this.videourl = this.videoAllurl[2]
          this.iframeshow = true
          break;
        case 4:
          this.videourl = this.videoAllurl[3]
          this.iframeshow = true
          break;
        case 5:
          this.videourl = this.videoAllurl[4]
          this.iframeshow = true
          break;
        case 6:
          this.videourl = this.videoAllurl[5]
          this.iframeshow = true
          break;
        case 7:
          this.videourl = this.videoAllurl[6]
          this.iframeshow = true
          break;
        case 8:
          this.videourl = this.videoAllurl[7]
          this.iframeshow = true
          break;
        case 9:
          this.videourl = this.videoAllurl[8]
          this.iframeshow = true
          break;
        case 10:
          this.videourl = this.videoAllurl[9]
          this.iframeshow = true
          break;
        case 11:
          this.videourl = this.videoAllurl[10]
          this.iframeshow = true
          break;
        default:
          break;
      }
    },
    videoPlayAndro(value) {
      switch (value) {
        case 1:
          this.videourl = this.videoAllurlAndro[0]
          this.iframeshow = true
          break;
        case 2:
          this.videourl = this.videoAllurlAndro[1]
          this.iframeshow = true
          break;
        case 3:
          this.videourl = this.videoAllurlAndro[2]
          this.iframeshow = true
          break;
        default:
          break;
      }
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../assets/css/mixin";
.vFAQ {
  background-color: #fff;
  .faq_video {
    .videoExplanation {
      background-color: #eeeeee;
      height: 1rem;
      width: 100%;
      font-size: .34rem;
      line-height: 1rem;
      color: #d53c3e;
      padding: 0 .3rem;
    }
    .content {
      .title {
        padding: .3rem;
        color: #333;
        font-size: .3rem;
        line-height: .4rem;
        .border(#eee,bottom);
        position: relative;
        .video1 {
          color: #bbb;
          font-size: .34rem;
          position: absolute;
          right: .3rem;
        }
      }
      .items {
        li {
          .border(#eee,bottom);
          &:first-child {
            border-top: 0;
          }
        }
        .ask {
          padding: .3rem;
          font-size: .3rem;
          line-height: .4rem;
          color: #333;
          padding-right: 1rem;
          position: relative;
          &.im {
            color: #59c1bd;
          }
          .iconfont {
            position: absolute;
            bottom: .3rem;
            right: .3rem;
            font-size: .34rem;
            line-height: .4rem;
            color: #bbb;
            transition: .5s transform;
            &.up {
              transform: rotate(180deg);
            }
          }
          &:active {
            background: #eee;
          }
        }
        .answer {
          padding: .4rem .3rem;
          .border(#eee,top);
          font-size: .3rem;
          color: #666;
          background: #fff;
          .dropDown {
            font-size: .3rem;
            color: #59c1bd;
            padding: .15rem .2rem;
          }
        }
        .video {
          color: #59c1bd;
        }
      }
      .online {
        font-size: .4rem;
        display: block;
        color: #666;
        width: 4.5rem;
        height: .9rem;
        margin: .35rem auto;
        background: #f5f5f5;
        .border(#bbb);
        border-radius: .9rem;
        font-size: #bbb;
        text-align: center;
        text-indent: -.15rem;
        img {
          width: .6rem;
          display: inline-block;
          vertical-align: -.15rem;
          margin-right: .3rem;
        }
      }
    }
    .iframealert {
      .iframe1 {
        position: fixed;
        z-index: 31;
        color: #fff;
        right: .2rem;
        top: .6rem;
        font-size: .4rem;
        display: block;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
      }
      .iframe {
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 30;
        top: 0;
        left: 0;
        overflow: hidden;
      }
    }
  }
}

</style>
