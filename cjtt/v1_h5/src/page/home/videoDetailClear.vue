<template>
  <div class="">
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class='videoDetails' v-show="!loading">
      <div class="iframe_bgColor">
        <iframe :src='detail.url' frameborder='0' width='100%' height='100%' allowfullscreen='true' class="videoDetails_video" allowTransparency="true">
        </iframe>
      </div>
    </div>
  </div>
</template>
<script>
  import nvHead from '@/components/header.vue';
  import nvLoading from '@/components/loading.vue';
  import ajax from '@/config/ajax';
  import appcall from '@/config/appcall';

  export default {
    name: 'a_detail',
    data() {
      return {
        loading: true,
        detail: {},
        id: 0
      }
    },
    components: {
      nvHead,
      nvLoading
    },
    mounted() {
      this.id = this.$route.params.id;
      this.getdetail();
      this.setFontsize();
      // 设置字体大小调用
      window.afterSetSize = function (sizeType) {
        this.setFontsize(sizeType)
      }.bind(this)
    },
    methods: {
      play() {
        console.log('play callback')
      },
      pause() {
        console.log('pause callback')
      },
      /**
       * 获取视频详情
       */
      async getdetail() {
        let params = {
          article_id: this.id
        };
        // let comm = await appcall.getAppData();
             let comm = {
               api_debuger:1,
               uid:11009068,
               token:'e7aca4fd5fba248047bee455361e8c10'
             }
        let rs = await ajax('post', this.$apiurl + '/video/get_detail', comm, params);
        if (rs && rs.code === 1001) {
          this.loading = false;
          this.detail = rs.data;
          this.detail.url = this.detail.url + '&fullscreen=1';
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

    },
    watch: {}
  }

</script>
<style type="text/css">
  /*.dplayer {
  height: 100%;
}*/

  .dplayer-setting,
  .dplayer-full-in-icon,
  .dplayer-full {
    display: none !important;
  }

</style>
<style lang="less" scoped>
  @import '../../style/colors';
  .videoDetails {
    background: #fff;
    // height: 7.5rem;
    .videoDetails_video {
      width: 100%;
      height: 4.22rem;
    }
  }

</style>
