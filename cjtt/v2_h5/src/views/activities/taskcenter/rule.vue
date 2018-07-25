<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="taskcenterRule" v-show="!loading">
      <ul>
        <li v-for="(item,$index) in list" :key='$index'>
          <p class="title clear">
            <span class="table-cell  ico"><img v-lazy="item.rulecoverurl" alt=""></span>
            <span class="table-cell  txt">{{item.task_name}}</span>
            <span class="table-cell  btn">
              <span v-if="item.task_status==0||item.task_status==1" @click="toDo(item)">{{item.btn}}</span>
              <span v-if="item.task_status==2||item.task_status==3">已完成</span>
            </span>
          </p>
          <p class="desc">
            {{item.task_conent}}
          </p>
        </li>
      </ul>
      <!-- 登陆弹框 -->
      <div class="v-modal" v-show="goLoginModalShow" @touchmove.prevent>
        <div class="modal goLoginModal">
          <div class="tipsBox">
            登录后才可以获取金币哦，去登录？
          </div>
          <div class="btnbox">
            <div class="cancel clear" @click="close">取消</div>
            <div class="ok clear" @click="goLogin">确认</div>
          </div>
        </div>
      </div>
      <!-- 一元提现弹框 -->
      <div class="v-modal" v-show="withdrawShow" @touchmove.prevent>
        <div class="withdraw modal">
          <i class="iconfont close" @click="close">&#xe685;</i>
          <div class="title">一元提现任务</div>
          <ul>
            <li v-for="(item,$index) in one_cash" :key="$index" class="clear">
              <div class="imgBox left">
                <img v-lazy="item.rulecoverurl">
                <div class="shadow" v-show="item.task_status==2||item.task_status==3"></div>
              </div>
              <span class="taskName " :class="{'gray':item.task_status==2||item.task_status==3}">{{item.task_name}}</span>
              <span v-if="item.task_status==0||item.task_status==1" @click="toDoOneCash(item)" class="default right">未完成</span>
              <span v-if="item.task_status==2||item.task_status==3" class="done right"></span>
            </li>
          </ul>
        </div>
      </div>
      <!--分享热文阅读和签到弹窗--> 
      <div class="v-modal" v-show="articleModalShow&&!iospedding">
        <div class="articleModal modal">
          <div class="modalTitle" @touchmove.prevent>
            <i class="iconfont close" @click="fixedTop">&#xe685;</i>
            <div class="title hottitle">分享热文赚金币</div>
          </div>
          <div class="hotArticleListBg">
            <div class="hotArticleList">
              <div class="hotArticle clear" @click="chose($index)" v-for="(item,$index) in hotArticleList" :key="$index">
                <div class="chose left">
                  <div class="circle " :class="{'default':!item.chosed,'chosed':item.chosed}"></div>
                </div>
                <div class="img left">
                  <img v-lazy="item.piturl" width="100%" />
                </div>
                <div class="title left">
                  <div class="name">{{item.title | title}}</div>
                  <div class="reader"><span>{{item.region}}</span>阅读 {{item.hits}}次</div>
                </div> 
              </div>
            </div>
          </div>
          <div class="shareTips" @touchmove.prevent>热文分享到朋友圈得100金币，每日最多分享5次<br>热文被好友阅读，每日最高可获得1000金币</div>
          <div class="btnBox clear" @touchmove.prevent>
            <div class="other left" @click="goHotList()"><i class="iconfont">&#xe697;</i>选择其他热文</div>
            <div class="btn right"  @click="pyqshareArticle()">立即分享赚金币</div>
          </div>
        </div>
      </div>
      <!--推送打开弹窗-->
      <div class="v-modal" v-show="yindaoShow" @touchmove.prevent>
        <div class="yindao modal">
          <div class="btn" @click="close">我知道了</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";
import pagers from "@/assets/js/pagers";
// let comm = {
//       api_debug: 1,
//       "uid":"11050024",
//         "token":"ff2de6dd4c58e4f5bf11574a6cb99982"
//   }
export default {
  name: "taskcenterRule",
  data() {
    return {
      loading: true,
      isLogin: false,
      flag:false,
      goLoginModalShow: false,
      withdrawShow: false,
      articleModalShow:false,
      yindaoShow:false,
      list: [],
      one_cash: [],
      hotArticleList:[],
      chosedId:'',
    };
  },
  components: {
    nvHead,
    nvLoading
  },
  async created() {
    this.$Progress.start();
    this.pullDown();
  },
  mounted() {
    // 下拉获取新数据调用
    window.afterPullDown = function() {
      this.pullDown();
    }.bind(this);
  },
  methods: {
    async pullDown(){
      this.close();
      let appdata = await appcall.getAppData();
      if (!appdata.uid || !appdata.token) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
      this.getList();
    },
    /**
     * 获取规则列表
     */
    async getList() {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/task/rules_list",
        comm,
        params
      );
      this.$Progress.finish();
      if (rs && rs.code === 1001 && rs.data) {
        this.loading=false;
        this.list = rs.data.list;
        console.log(this.list);
      }else if(rs.code === 1005){
          this.$alert(rs.msg).then(()=>{
            appcall.login();
          })
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 任务按钮动作
     */
    toDo(item) {
      this.scrollTop=document.scrollingElement.scrollTop||document.body.scrollTop||document.getElementsByTagName('body')[0].scrollTop;
      if (this.isLogin) {
        if (!this.flag) {
          this.flag = true;
          if(item.task_keys=='first_alipay'&&(item.task_status == 0 ||
              item.task_status == 1)){
                if(item.task_count==0){
                  // 一元提现
                  this.getOneCash();
                  this.withdrawShow = true;
                }else{
                  appcall.navigator({
                    title:"兑换提现",
                    url: this.$h5url + pagers[this.$currVer].redeem,
                  });
                }
            }else if(item.task_keys=="read_push"){
              this.yindaoShow=true;
            }else if(item.task_keys=='yzpl'){
              appcall.articles();
            }else if(item.task_keys=="share_article_read"){
              this.getInformationList();
              this.articleModalShow = true;
              document.getElementsByTagName('body')[0].style.position = 'fixed';
              document.getElementsByTagName('html')[0].style.position = 'fixed';
              document.getElementsByTagName('body')[0].style.width = '100%';
              document.getElementsByTagName('html')[0].style.width = '100%';
              document.getElementsByTagName('body')[0].style.top = -this.scrollTop + 'px';
            } else if (
            item.task_status == 0 ||
            item.task_status == 1 
          ) {
            this.judge(item);
          } else {
          }
          setTimeout(() => {
            this.flag = false;
          }, 2000);
        }
      } else {
        if (item.task_keys == "break_egg") {
          // 砸蛋
          this.judge(item);
        }else {
          this.goLoginModalShow = true;
        }
      }
    },
    /**
     * 一元提现跳转
     */
    toDoOneCash(item){
      if(item.task_status == 0||item.task_status == 1){
        this.judge(item);
        this.close();
      }
    },
    /**
     * 获取一元提现状态
     */
    async getOneCash() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/task/one_cash",
        comm,
        params
      );
      if (rs && rs.code == 1001 && rs.data) {
        this.one_cash = rs.data.list;
      }else if(rs.code === 1005){
        this.$alert(rs.msg).then(()=>{
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 根据isLogin跳转
     */
    judge(item) {
      if (item.task_type == "webview") {
        appcall.navigator({
          title: item.task_name,
          url: item.url
        });
      } else if (item.task_type == "module") {
        this.doModuleClassify(item);
      } else if (item.task_type == "simple") {
      } else {
        // 默认去主页
        appcall.articles();
      }
    },
    /**
     * 根据module分类跳转
     */
    doModuleClassify(item) {
      switch (item.module) {
        case "article_list":
          let params = item.module_params ? JSON.parse(item.module_params) : "";
          appcall.articles(params);
          break;
        case "video_list":
          appcall.videos();
          break;
        case "bind_alipay":
        case "bind_wechat":
        case "bind_phone":
          appcall.bindzfb();
          break;
        case "share_weixin_timeline":
          this.pyqshare();
          break;
        case "share_weixin":
          this.wxshare();
          break;
        default:
          appcall.articles();
          break;
      }
    },
    /**
     * 签到成功获取相关资讯
     */
    async getInformationList() {
      let params = {
        num: 3
      };
      let comm = await appcall.getAppData();

      let rs = await ajax(
        "post",
        this.$apiurl + "/sign/get_sign_related_article_lists",
        comm,
        params
      );
      if (rs && rs.code == 1001 && rs.data) {
        rs.data.list.forEach((n, i) => {
            n.chosed = false;
        });
        this.hotArticleList = rs.data.list;
      } else if (rs.code === 1008) {
        this.hotArticleList = [];
      }else if(rs.code === 1005){
        this.$alert(rs.msg).then(()=>{
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 选择一篇热文
     */
    chose(index){
      this.chosedId=this.hotArticleList[index].id;
      this.hotArticleList.forEach((n, i) => {
        if(i==index){
          n.chosed=true;
        }else{
            n.chosed = false;
        }
      });
    },
    /**
     * 分享文章到朋友圈
     */
    pyqshareArticle() {
      if(this.chosedId){
        let params = {
          type: 2,
          sc_catid: this.chosedId
        };
        appcall.shareArticle(params);
        this.close();
      }else{
        this.$alert("请选择一篇要分享的热文");
      }
      
    },
    /**
     * 去热文列表
     */
    goHotList(){
      appcall.articles({sc_catid:99});
      this.close();
    },
    /**
     * 关闭弹框
     */
    close() {
      this.goLoginModalShow = false;
      this.withdrawShow = false;
      this.yindaoShow=false;
      this.articleModalShow = false;
      this.hotArticleList=[];
      this.chosedId='';
      document.getElementsByTagName('body')[0].style.position = '';
      document.getElementsByTagName('html')[0].style.position = '';
      document.getElementsByTagName('body')[0].style.width = '100%';
      document.getElementsByTagName('html')[0].style.width = '100%';
    },
    /**
     * 弹窗打开页面固定位置
     */
    fixedTop(){
      this.articleModalShow = false;
      document.getElementsByTagName('body')[0].style.position = '';
      document.getElementsByTagName('html')[0].style.position = '';
      document.getElementsByTagName('body')[0].style.width = '100%';
      document.getElementsByTagName('html')[0].style.width = '100%';
      document.scrollingElement.scrollTop=this.scrollTop;
    },
    /**
     * 去登陆
     */
    goLogin() {
      appcall.login();
      this.close();
    },
    /**
     * 微信朋友圈邀请
     */
    async pyqshare() {
      let params = {
        share_where: 1
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/task/share_invitation_img",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        let data = rs.data;
        let params = {
          type: 2,
          title: "",
          url: "",
          desc: data.description,
          images: data.url
        };
        appcall.invite(params);
      }else if(rs.code === 1005){
        this.$alert(rs.msg).then(()=>{
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 微信好友邀请
     */
    async wxshare() {
      let params = {
        share_where:2
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/task/share_invitation_url",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        let data = rs.data;
        let params = {
          type: 1,
          title:data.title,
          url: data.url,
          desc: data.description,
          images: ""
        };
        appcall.invite(params);
      }else if(rs.code === 1005){
        this.$alert(rs.msg).then(()=>{
          appcall.login();
        })
      } else {
        this.$alert(rs.msg);
      }
    },
  },
  filters: {
    title(value) {
      if (value) {
        value = value.length < 22 ? value : value.substr(0, 22) + "...";
      }
      return value;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
@tcBlack:#282a2f;
@tcGray:#97999d;
@tcRed:#d53c3e;
@tcYellow:#efbe03;
.taskcenterRule {
  ul li {
    .title {
      height: 1rem;
      display: block;
      .ico {
        width: 1rem;
        height: 1rem;
        img {
          width: 0.41rem;
          height: 0.41rem;
          border-radius: 50%;
          background: #eee;
        }
      }
      .txt {
        width: 4.8rem;
        font-size: 0.36rem;
      }
      .btn {
        span {
          width: 1.5rem;
          font-size: 0.24rem;
          display: block;
          color: #fff;
          background: #fd781b;
          border-radius: 0.15rem;
          text-align: center;
          line-height: 0.6rem;
        }
      }
    }
    .desc {
      padding: 0.2rem 0.3rem;
      color: #333;
      font-size: 0.24rem;
      background: #eee;
    }
  }
  .v-modal {
    .mask(0,0,0,0.7);
    .goLoginModal {
      border-radius: 0.12rem;
      .tipsBox {
        width: 5.8rem;
        height: 3.66rem;
        text-align: justify;
        font-size: 0.36rem;
        color: #282a2f;
        line-height: 0.58rem;
        padding: 0.6rem 0.4rem 0;
      }
      .btnbox {
        width: 100%;
        height: 1.08rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        .border(#e9e9e6,top);
        position: absolute;
        bottom: 0;
        left: 0;
        .cancel,
        .ok {
          width: 50%;
          height: 100%;
          float: left;
          text-align: center;
          line-height: 1.08rem;
          color: #97999d;
          font-size: 0.32rem;
          .border(#e9e9e6,right);
        }
        .ok {
          border: 0;
          color: #282a2f;
        }
      }
    }
    .withdraw{
      padding:0 .34rem;
      border-radius: .12rem;
      width:6rem;
      min-height:6.08rem;
      i.close {
        position: absolute;
        top: .34rem;
        right:.34rem;
        font-size: 0.3rem;
        color: #d8d8d8;
      }
      .title{
        font-size:.44rem;
        color:#efbe03;
        text-align:center;
        margin:.58rem 0 .46rem;
      }
      ul{
        li{
          height:.7rem;
          line-height:.7rem;
          width:5.32rem;
          margin-bottom:.42rem;
          .imgBox{
            position:relative;
            width:.4rem;
            height:.4rem;
            margin:.15rem 0;
            img{
              width:100%;
              height:100%;
              border-radius:.4rem;
            }
            .shadow{
              z-index:1;
              width:100%;
              height:100%;
              border-radius:.4rem;
              background:rgba(255,255,255,.7);
              position: absolute;
              top:0;
              left:0;
            }
          }
          .taskName{
            font-size:.32rem;
            color:@tcBlack;
            margin-left:.14rem;
            &.gray{
              color:@tcGray;
            }
          }
          .default{
            width:1.48rem;
            height:.7rem;
            line-height:.7rem;
            text-align:center;
            font-size:.28rem;
            color:#ffffff;
            background:@tcRed;
            border-radius:.7rem;
          }
          .done{
              width:1.48rem;
              height:.7rem;
              .background("taskcenter/done.png");
          }
        }
      }
    }
    .yindao{
      width: 6rem;
      height: 6.64rem;
      .background("taskcenter/yindao.png");
      .btn{
        width:2.12rem;
        height:.6rem;
        font-size:.28rem;
        color:#ffffff;
        line-height:.6rem;
        text-align:center;
        border-radius:.6rem;
        .border(#ffffff);
        margin:auto;
        position:absolute;
        bottom:.4rem;
        left:0;
        right:0;
      }
    }
    .articleModal {
      border-radius:.2rem;
      .modalTitle {
        width: 6.48rem;
        padding:0 .34rem;
        position: relative;
        overflow:hidden;
        letter-spacing: 1px;
        i.close {
          position: absolute;
          top: .34rem;
          right: .34rem;
          font-size: 0.4rem;
          color: #d8d8d8;
        }
        .title {
          margin:.52rem 0 .01rem;
          font-size: 0.44rem;
          text-align: center;
          color: #efbe03;
          font-weight:600;
          &.hottitle{
            margin:.52rem 0 .4rem;
          }
        }
        .tips {
          text-align: center;
          margin-bottom: 0.18rem;
          i {
            width: 0.86rem;
            height: 0.7rem;
            display: inline-block;
            .background("taskcenter/gift.png");
            vertical-align: text-bottom;
            position: relative;
            top: .04rem;
          }
          span {
            color: #efbe03;
            font-size: 0.36rem;
            margin: 0.2rem 0 0.16rem .08rem;
            display: inline-block;
            font-weight:600;
          }
          p {
            color: @tcGray;
            font-size: 0.28rem;
          }
        }
      }
      .hotArticleListBg{
        width: 6.48rem;
        padding:.3rem .12rem;
        background: #f5f5f5;
        margin-bottom: .18rem;
        .hotArticleList{
          height: 4.14rem;
          overflow-y: scroll;
          overflow-x: hidden;
          z-index: 12;
          -webkit-overflow-scrolling: touch;
          &::-webkit-scrollbar{
            width: 2px;
            display:block;
          }
          &::-webkit-scrollbar-thumb{
            border-radius: 2px;
            background: #d8d8d8;
          }
          &::after {
            min-height:101%;
          }
          .hotArticle {
            width: 5.8rem;
            height: 1.18rem;
            margin: 0 auto .3rem;
            &:last-child{
              margin-bottom:0;
            }
            .chose{
              width:0.5rem;
              height: 100%;
              .circle{
                width:.32rem;
                height:.32rem;
                margin:.43rem 0;
                &.default{
                  .background("taskcenter/unselected.png");
                }
                &.chosed{
                  .background("taskcenter/selected.png");
                }
              }
            }
            .img {
              width: 1.74rem;
              height: 100%;
              overflow: hidden;
              background: #e5e5e5;
              img {
                width: 100%;
                height:100%;
              }
            }
            .title {
              width: 3.38rem;
              height: 100%;
              margin-left:0.14rem;
              text-align: left;
              position: relative;
              .name {
                font-size: 0.28rem;
                color: @tcBlack;
                overflow: hidden;
                text-align: justify;
                width: 100%;
              }
              .reader {
                height: 0.32rem;
                font-size: 0.24rem;
                position:absolute;
                top:.85rem;
                left:0;
                color: @tcGray;
                span{
                  font-size: 0.24rem; 
                  color: @tcGray;
                  margin-right:.16rem;
                }
              }
            }
          }
        }
      }
      
      .shareTips {
        width: 6.48rem;
        padding:0 .34rem;
        font-size: 0.24rem;
        color: @tcGray;
      }
      .btnBox{
        width: 6.48rem;
        padding:.36rem .34rem .54rem;
        height:1.84rem;
        .other{
          font-size:.32rem;
          color:@tcGray;
          line-height: 0.76rem;
          i{
            font-size:.32rem;
            margin-right:.12rem;
          }
        }
        .btn {
          width: 2.96rem;
          height: 0.76rem;
          border-radius: 0.76rem;
          background: @tcRed;
          text-align: center;
          line-height: 0.76rem;
          font-size: 0.32rem;
          color: #ffffff;
        }
      }
    }
  }
}
</style>