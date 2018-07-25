<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="invitepupilNearby" v-show="!loading" >
	    	<!-- <div class="bg" :class="rdClass">
	    	</div> -->
	    	<img :src="rdSrc" width="100%">
	    	<!-- v-show="qrImg" -->
    		<div class="qrimg">
    			<img :src="qrImg" alt="">
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
  name: "invitepupilNearby",
  data() {
    return {
      loading: true,
      qrImg: "",
      rdClass: "",
      rdSrc: "",
      imgs: [
        require("@/assets/images/invite_bg1.png"),
        require("@/assets/images/invite_bg2.png"),
        require("@/assets/images/invite_bg2.png")
      ]
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
    //this.getRdClass();
    this.getRdSrc();
    this.init();
  },
  methods: {
    /**
     * 获取分享url
     */
    async init() {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/tasks/get_rand_domain_invite",
        comm,
        params
      );
      this.$Progress.finish();
      if (rs && rs.code === 1001) {
        this.qrUrl = rs.data + "/register?uid=" + comm.uid+'&source=mdm';
        this.getQR();
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 生成二维码
     */
    async getQR() {
      let params = {
        content: encodeURIComponent(this.qrUrl)
      };
      let comm = await appcall.getAppData();

      let rs = await ajax(
        "post",
        this.$apiurl + "/html/get_private_qrcode",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        this.loading = false;
        this.qrImg = rs.data.url;
      } else {
        this.$alert(rs.msg);
      }
    },
    getRdClass() {
      this.rdClass = "bg" + parseInt(Math.random() * 3);
    },
    getRdSrc() {
      let imgsrc = this.imgs[parseInt(Math.random() * 3)];
      this.rdSrc = imgsrc;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin";
.invitepupilNearby {
  position: relative;
  top: 0;
  left: 0;
  .bg {
    width: 7.5rem;
    height: 12rem;
    display: block;
    position: absolute;
    top: 0;
    z-index: 0;
    &.bg0 {
      background: url("../../../assets/images/invite_bg1.png") no-repeat top
        center;
      background-size: 100% auto;
    }
    &.bg1 {
      background: url("../../../assets/images/invite_bg2.png") no-repeat top
        center;
      background-size: 100% auto;
    }
    &.bg2 {
      background: url("../../../assets/images/invite_bg3.png") no-repeat top
        center;
      background-size: 100% auto;
    }
  }
  .qrimg {
    width: 100%;
    height: 4rem;
    position: absolute;
    margin: auto;
    top: 7rem;
    left: 0;
    z-index: 1;
    img {
      display: block;
      height: 100%;
      margin: 0 auto;
      width: auto;
    }
  }
}
</style>