<template>
    <div class="loading" v-show="loading" @touchmove.prevent>
    	<section style="display:none;">
        <div class="loading-icon spinner-snake" style="border-top-color:#fff;border-left-color:#fff;border-bottom-color:#fff;"></div>
        <div class="loading-txt">正在加载...</div>
      </section>
    </div>
</template>
<script>
export default {
  replace: true,
  data() {
    return {};
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style  lang="less" scoped>
  .loading{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 110;
    // background: rgba(0,0,0,.3);
    section{
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      width: 2.6rem;
      height: .8rem;
      margin: -.4rem auto;
      text-align: center;
      font-size: .2rem;
      line-height: 1;
      padding: 0;
      display: box;
      display: -webkit-box;
      display: -moz-box;
      -webkit-box-pack: center;
      -moz-box-pack: center;
      -webkit-box-align: center;
      -moz-box-align: center;
      border-radius: .06rem;
      background: rgba(0,0,0,.7);
    }
    .loading-icon{
      width: .28rem;
      height: .28rem;
    }
    .loading-txt{
      color: #fff;
      display: block;
      padding-left: .2rem
    }
    .spinner-snake {
      -webkit-animation: spinner-rotate 0.8s infinite linear;
      animation: spinner-rotate 0.8s infinite linear;
      border: 2px solid transparent;
      border-radius: 50%;
    }
    @keyframes spinner-rotate {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @-webkit-keyframes spinner-rotate {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  }

</style>