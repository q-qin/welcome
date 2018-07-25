<template>
  <div>
  <vue-progress-bar></vue-progress-bar>
  <nv-loading :loading="loading"></nv-loading>
  <div class="eggFrenzy" v-show="!loading">
    <div class="eggFrenzy_top">
      <i class="iconfont goBack" @click="goBack" v-if="!lowVersion">&#xe697;</i>
      <div class="rules" @click="watchRules">活动规则</div>
      <div class="roll">
        <div class="rollBox" ref="rollBox">
          <div class="content">
            <div class="rollData" v-for="(item,$index) in awardsList" :key='$index'>
              <img :src="item.img">
              <span class="phone">{{item.phone}}</span><span>{{item.record}}</span>
            </div>
          </div>
          <div class="copy"  ref="copy">
            <div class="rollData" v-for="(item,$index) in awardsList" :key='$index'>
              <img :src="item.img">
              <span class="phone">{{item.phone}}</span><span>{{item.record}}</span>
            </div>
          </div>
        </div>
      </div>
      <ul class="clear">
        <li v-for="(item,$index) in list" :key='$index' class="left" @click="knock(item)">
          <img :src="item.img" :class="{'rotate':isDone==false}" v-if="!item.isBroken" :ref='item.name'  v-show="!item.isEggMove">
        </li>
      </ul>
    </div>
    <div class="eggFrenzy_info clear" v-if="isLogin">
      <div class="itemBox left">
        <i class="money"></i><span class="describe">零钱 : <span class="num">{{breakEggList.balance_cash}}元</span></span>
      </div>
      <div class="itemBox left">
        <i class="mallet"></i><span class="describe">砸蛋机会 : <span class="num">{{breakEggList.lottery_num}}次</span></span>
      </div>
    </div>
    <div class="eggFrenzy_bottom">
      <div class="top">
        <span>邀请好友，获取砸蛋机会</span>
      </div>
      <div class="middle">以下任选其一</div>
      <div class="bottom clear">
        <div class="share_item left">
          <div class="imgBox" @click="wxshare">
            <img src="../../../assets/images/wx.png">
          </div>
          <div class="title">微信</div>
        </div>
        <div class="share_item left">
          <div class="imgBox" @click="pyqshare">
            <img src="../../../assets/images/pyq.png">
          </div>
          <div class="title">朋友圈</div>
        </div>
        <div class="share_item left">
          <div class="imgBox" @click="qqshare">
            <img src="../../../assets/images/qq.png">
          </div>
          <div class="title">QQ</div>
        </div>
        <div class="share_item left">
          <div class="imgBox" @click="mdmshare">
            <img src="../../../assets/images/mdm.png">
          </div>
          <div class="title">面对面</div>
        </div>
      </div>
    </div>
    
    <div class="v-modal" v-show="winningModalShow" @touchmove.prevent>
      <div class="winningModal">
        <div class="tipsBox">
          <span>{{cash}}<i>元</i></span>
        </div>
      </div>
    </div>
    <div class="v-modal" v-show="tipsModalShow" @touchmove.prevent>
      <div class="tipsModal">
        <i class="iconfont close" @click="close">&#xe685;</i>
        <div class="imgBox"><img src="../../../assets/images/activities/cry.png" ></div>
        <div class="tipsBox">砸蛋机会不足</div>
        <button @click="scrollBottom">获取砸蛋机会</button>
      </div>
    </div>
    <div class="v-modal" v-show="rulesModalShow" @touchmove.prevent>
      <div class="rulesModal">
        <i class="iconfont close" @click="close">&#xe685;</i>
        <div class="tipsBox">活动规则</div>
        <ul>
          <li><i>1</i>活动对象：超级头条APP用户。</li>
          <li><i>2</i>每成功邀请1名徒弟, 且徒弟阅读赚<span>150金币</span>, 您可获得一次砸金蛋机会。</li>
          <li><i>3</i>获得的红包立即到账, 可提现。</li>
          <li><i>4</i>活动结束砸金蛋机会清零。</li>
          <li><i>5</i>活动时间：6月5日-7月31日零点。</li>
          <li><i>6</i>活动解释权归超级头条APP官方, 任何疑问可以通过APP内帮助与反馈页面查询客服。</li>
        </ul>
      </div>
    </div>
    <div class="v-modal" v-show="mdmModalShow" @touchmove.prevent>
      <div class="mdmModal">
        <img class="mdmBg" src="../../../assets/images/activities/mdmBg.png" >
        <div class="QRcode">
          <img :src="QRImg" width="100%" v-show="QRImg">
        </div>
        <i class="iconfont close" @click="close">&#xe605;</i>
      </div>
    </div>
    <div class="v-modal" v-show="eggModalShow" @touchmove.prevent>
      <div class="zaidan modal" v-show="zaidanShow">
        <div class="eggBox">
          <img src="../../../assets/images/activities/egg.png" class="eggScale " :class="{'eggChange':isTrun}" v-if="!eggBroken"/>
          <img src="../../../assets/images/activities/broken.png" class="broken" v-if="eggBroken" />
          <div class="hammer" :class="{'zhuanquan':isTrun}"><img src="../../../assets/images/activities/hammer.png" :class="{'entirely':breakEggList.lottery_num>0&&hammerDown,'half':breakEggList.lottery_num<=0&&hammerDown}" v-if="isHammer"></div>
        </div>
      </div>
      <img src="../../../assets/images/activities/egg.png" ref="moveEgg" class="moveEgg " :class="{'moveEggScale':isEggMove}" v-show="isEggMove"/>
    </div>
  </div>
  </div>
</template>
<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";
const PHONE =['130','131','132','155','156','186','185','145','134','135','136','137','138',
'139','150','151','152','157','158','159','182','183','188','187','133','153','173','180','181','189'];

export default {
  name:'eggFrenzy',
  data(){
    return{
      lowVersion:false,
      isLogin:true, //是否登录
      loading:true,
      breakEggList:{balance_cash:0,lottery_num:0},
      awardsList:[],
      list:[
        {
          index:0,
          isBroken:false,
          isEggMove:false,
          img:require("@/assets/images/activities/egg.png"),
          name:'egg1'
        },
        {
          index:1,
          isBroken:false,
          isEggMove:false,
          img:require("@/assets/images/activities/egg.png"),
          name:'egg2'
        },
        {
          index:2,
          isBroken:false,
          isEggMove:false,
          img:require("@/assets/images/activities/egg.png"),
          name:'egg3',
        },
        {
          index:3,
          isBroken:false,
          isEggMove:false,
          img:require("@/assets/images/activities/egg.png"),
          name:'egg4'
        },
        {
          index:4,
          isBroken:false,
          isEggMove:false,
          img:require("@/assets/images/activities/egg.png"),
          name:'egg5'
        },
        {
          index:5,
          isBroken:false,
          isEggMove:false,
          img:require("@/assets/images/activities/egg.png"),
          name:'egg6'
        },
      ],
      top:0,
      left:0,
      zaidanShow:false,//中间固定蛋显示
      isEggMove:true,// 蛋移动
      isDone:false, //点击砸蛋
      isHammer:false,//锤子显示
      isTrun:false,//锤子旋转,蛋放大缩小
      hammerDown:false,//锤子下落
      eggBroken:false,//蛋碎
      winningModalShow:false, //红包窗口
      tipsModalShow:false,    //提示次数不足窗口
      goLoginModalShow:false, //去登录窗口
      rulesModalShow:false,   //规则窗口
      mdmModalShow:false, //面对面二维码窗口
      eggModalShow:false,//砸蛋动画弹窗
      clicks:0, //防止点击多次
      cash:0, //红包金额
      rollTimer:null, //滚动屏定时器
      QRImg:'', //面对面二维码
    }
  },
  components: {
    nvHead,
    nvLoading,
  },
  created(){
      this.$Progress.start();
      clearInterval(this.rollTimer);
      this.rollTimer = setInterval(this.roll,20);
      this.pullDown();
      this.randomAwardsList();
  },
  mounted(){
    window.afterPullDown = function() {
      this.pullDown();
    }.bind(this);
  },
  destoryed(){
    clearInterval(this.rollTimer);
  },
  methods:{
    /**
     * 下拉获取新数据
     */
    async pullDown() {
      this.close();
      let appdata = await appcall.getAppData();
      if (!appdata.uid || !appdata.token) {
        this.$Progress.finish();
        this.isLogin = false;
        this.loading = false;
      } else {
        this.isLogin = true;
        this.getInfo();
      }
      if (
        (appdata.platform_code == "ios_h5" && appdata.version_code <= 7) ||
        (appdata.platform_code == "android_h5" && appdata.version_code <= 9)
      ) {
        this.lowVersion = true;
      }else{
        appcall.hideNavBar();
      }
    },
    /**
     * 获取信息
     */
    async getInfo(){
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/lottery/break_egg_list",
        comm,
        params
      );
      this.$Progress.finish();
      if (rs && rs.code === 1001) {
        this.breakEggList=rs.data;
        this.loading = false;
      }else if(rs.code === 1005){
        this.$alert(rs.msg).then(()=>{
          appcall.login();
        })
      }else{
        this.$alert(rs.msg);
      }
    },
    /**
     * 砸蛋
     */
    async knock(item){
      let refsName=item.name;
      this.top=this.$refs[refsName][0].getBoundingClientRect().top;
      this.left=this.$refs[refsName][0].getBoundingClientRect().left;
      this.screenW=document.documentElement.clientWidth||document.body.clientWidth||window.screen.width;
      this.screenH=document.documentElement.clientHeight||document.body.clientHeight||window.screen.height;
      
      if(this.isLogin){  //是否登陆

        if(this.clicks<1){ //保证点击一次
          this.clicks++;
          this.isDone=true;
          this.eggModalShow=true;
          //第一步，被点击的蛋消失 0
          clearTimeout(eggModalShowTimer,eggModalShowTimer1);
          var eggModalShowTimer = setTimeout(() => {
            this.list[item.index].isEggMove=true;
            this.isEggMove=true;
            this.$refs.moveEgg.style.top=this.top+'px';
            this.$refs.moveEgg.style.left=this.left+'px';
          },100);
          //第二步，开始移动到屏幕中央并且放大 过程1.2s左右
          var eggModalShowTimer1 = setTimeout(() => {
            this.centerTop=this.screenH/2-this.$refs.moveEgg.offsetHeight/2;
            this.centerLeft=this.screenW/2-this.$refs.moveEgg.offsetWidth/2;
            this.topSpeed=Math.abs(this.centerTop-this.top)/150;
            this.leftSpeed=Math.abs(this.centerLeft-this.left)/150;
            var that=this;
            if(that.centerTop-that.top>0){
              var moveTop1 = setInterval(function(){
                if(that.centerTop-that.top<=0){
                  clearInterval(moveTop1);
                }
                that.top+=that.topSpeed;
                that.$refs.moveEgg.style.top=that.top+'px';
              },1)
            }
            if(that.centerTop-that.top<0){
              var moveTop2 = setInterval(function(){
                if(that.centerTop-that.top>=0){
                  clearInterval(moveTop2);
                }
                that.top-=that.topSpeed;
                that.$refs.moveEgg.style.top=that.top+'px';
              },1)
            }
            if(that.centerLeft-that.left>0){
              var moveLeft1 = setInterval(function(){
                if(that.centerLeft-that.left<=0){
                  clearInterval(moveLeft1);
                }
                that.left+=that.leftSpeed;
                that.$refs.moveEgg.style.left=that.left+'px';
              },1)
            }
            if(that.centerLeft-that.left<0){
              var moveLeft2 = setInterval(function(){
                if(that.centerLeft-that.left>=0){
                  clearInterval(moveLeft2);
                }
                that.left-=that.leftSpeed;
                that.$refs.moveEgg.style.left=that.left+'px';
              },1)
            }
            
          },300);
          //第三步，蛋固定在屏幕中央，移动蛋消失 
          var isTrunTimer = setTimeout(() => {
            this.isEggMove=false;
            this.zaidanShow=true;
          },1000);
          //第四步，固定蛋开始动画
          var isTrunTimer = setTimeout(() => {
            this.isHammer=true;
            this.isTrun=true;
          },1100);
          
            clearTimeout(timer);
            //第五步，砸碎
          var timer = setTimeout(() => {
            this.isTrun=false;
            this.hammerDown=true;
          },4100);
          let params = {};
          let comm = await appcall.getRequestData(params);
          let rs = await ajax(
            "post",
            this.$apiurl + "/lottery/break_egg",
            comm,
            params
          );
          //接口返回1001
          if (rs && rs.code === 1001) {
            this.cash=rs.data.cash;
            clearTimeout(timer1,timer2,timer3);
            var timer1 = setTimeout(() => {
              this.eggBroken=true;
            },4150);
            var timer2 = setTimeout(() => {
              this.eggModalShow=false;
              this.winningModalShow=true;
            },4300);
            var timer3 = setTimeout(() => {
              this.getInfo();
              this.winningModalShow=false;
              this.close();
            },5800);

          }
          //接口返回砸蛋次数不够
          else if(rs && rs.code === 3001){ 
            //次数不够 半砸 提示框
            var timer1 = setTimeout(() => {
              this.close();
              this.getInfo();
              this.tipsModalShow=true;
            },4800)
          }else if(rs.code === 1005){
            clearTimeout(timer1);
            var timer1 = setTimeout(() => {
              this.close();
              this.getInfo();
              this.tipsModalShow=true;
            },4150);
            this.$alert(rs.msg).then(()=>{
              appcall.login();
            })
          }else{
            clearTimeout(timer1);
            var timer1 = setTimeout(() => {
              this.close();
              this.getInfo();
              this.tipsModalShow=true;
            },4150);
            clearTimeout(timer1);
            var timer1 = setTimeout(() => {
              this.$alert(rs.msg);
            },4150);
          }

        }

      }else{
        appcall.login();
      }
      
    },
    /**
     * 关闭弹窗
     */
    close() {
      this.isDone = false;//砸蛋重置
      this.isTrun=false;//锤子旋转,蛋放大缩小重置
      this.hammerDown=false;//锤子下落重置
      this.eggBroken=false;//蛋碎重置
      this.zaidanShow=false;//中间固定蛋显示重置
      this.isEggMove=false;//蛋移动重置
      this.isHammer=false;//锤子显示重置
      this.top=0;//距离显示重置
      this.left=0;//距离显示重置
      this.winningModalShow=false;
      this.tipsModalShow=false;
      this.rulesModalShow=false;
      this.mdmModalShow=false;
      this.eggModalShow=false;
      this.QRImg='';
      this.clicks=0;
      this.isHammerFixed=true;
      for(let item of this.list){
        item.isBroken=false;
        item.isEggMove=false;
        item.move=false;
      }
    },
    /**
     * 页面返回
     */
    goBack(){
      appcall.goBack();
    },
    /**
     * 滚动屏
     */
    roll(){
      let rollBox = this.$refs.rollBox,
          copy = this.$refs.copy;
          if(rollBox&&copy){
            if(copy.offsetWidth - rollBox.scrollLeft <=0) {    
              rollBox.scrollLeft = 0;
            }else{
              rollBox.scrollLeft ++;
            }
          }
      
    },
    /**
     * 滚动到底部
     */
    scrollBottom(){
      this.close();
      var h = document.documentElement.scrollHeight || document.body.scrollHeight;
      let i = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      let vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      if(i<h-vh){
        this.scrollBottomTimer = setInterval(function(){
          i+=2;
          window.scrollTo(0,i);
          if(i>=h-vh){
            clearInterval(this.scrollBottomTimer);
          }
        }.bind(this),1)
      }
           
    },
    /**
     * 查看规则
     */
    watchRules(){
      this.rulesModalShow=true;
    },
    /**
     * 微信好友
     */
    async wxshare() {

      if(this.isLogin){

        let params = {
          share_where:2
        };
        let comm = await appcall.getRequestData(params);
        //版本控制请求不同的接口
        if(this.lowVersion){
          this.apiUrl="/task/share_invitation_url";
          
        }else{
          this.apiUrl="/lottery/share_url";
        }
        let rs = await ajax(
          "post",
          this.$apiurl + this.apiUrl,
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let data = rs.data;
          let params = {
            type: 9,
            title:data.title,
            url: data.url,
            desc: data.description,
            images: data.img_url
          };
          //版本控制传不同的参数
          if(this.lowVersion){
            params.type=1;
            params.images="";
          }else{
            if(JKEventHandler.browser().ios){
              params.type=1;
            }
          }
          appcall.invite(params);
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }

      }else{
        appcall.login();
      }
      
    },
    /**
     * 微信朋友圈
     */
    async pyqshare() {

      if(this.isLogin){

        let params = {
          share_where: 1
        };
        let comm = await appcall.getRequestData(params);
        //版本控制请求不同的接口
        if(this.lowVersion){
          this.apiUrl="/task/share_invitation_img";
        }else{
          this.apiUrl="/lottery/share_url";
        }
        let rs = await ajax(
          "post",
          this.$apiurl + this.apiUrl,
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let data = rs.data;
          let params = {
              type: 10,
              title:data.title,
              url: data.url,
              desc: data.description,
              images: data.img_url
            };
          //版本控制传不同的参数
          if(this.lowVersion){
            params.type=2;
            params.title="";
            params.url="";
            params.desc=data.description;
            params.images=data.url;
          }else{
            if(JKEventHandler.browser().ios){
              params.type=1;
            }
          }
          appcall.invite(params);
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }
        
      }else{
        appcall.login();
      }
      
    },
    /**
     * QQ邀请
     */
    async qqshare() {
      if(this.isLogin){
        let params = {
          share_where: 3
        };
        let comm = await appcall.getRequestData(params);
        //版本控制请求不同的接口
        if(this.lowVersion){
          this.apiUrl="/task/share_invitation_img";
        }else{
          this.apiUrl="/lottery/share_url";
        }
        let rs = await ajax(
          "post",
          this.$apiurl + this.apiUrl,
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let data = rs.data;
          let params = {
            type: 11,
            title:data.title,
            url: data.url,
            desc: data.description,
            images: data.img_url
          };
          //版本控制传不同的参数
          if(this.lowVersion){
            params.type=5;
            params.title="";
            params.url="";
            params.desc="";
            params.images=data.url;
          }else{
            if(JKEventHandler.browser().ios){
              params.type=1;
            }
          }
          appcall.invite(params);
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }

      }else{
        appcall.login();
      }
      
    },
    /**
     * 面对面
     */
    mdmshare() {
      if(this.isLogin){
        this.mdmModalShow = true;
        this.getQR();
      }else{
        appcall.login();
      }
    },
    /**
     * 生成二维码
     */
    async getQR() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/lottery/face_invite",
        comm,
        params,
        false
      );
      if (rs && rs.code === 1001) {
        this.QRImg = rs.data.qrcode_name;
      }else if(rs.code === 1005){
          this.$alert(rs.msg).then(()=>{
            appcall.login();
          })
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 随机生成获奖名单
     */
    randomAwardsList(){
      for(let i=0;i<10;i++){
        let item ={};
        item.img=require("@/assets/images/faces/face"+this.rnd(0,81)+".jpg");
        item.phone=PHONE[Math.floor(Math.random()*PHONE.length)]+'****'+this.rnd(1000,9999);
        item.record='砸蛋获得'+(Math.random()*7.8+1).toFixed(1)+'元已到账';
        this.awardsList.push(item);
      }
    },
    /**
     * 随机生成n-m之间的数包含n,m
     */
    rnd(n,m){
      var random = Math.floor(Math.random()*(m-n+1)+n);
      return random;
    }
  },
  filters:{

  },
  computed:{

  },
  watch:{

  }

}
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin";
.eggFrenzy{
  .eggFrenzy_top{
    overflow: hidden;
    width: 7.5rem;
    min-height: 12.55rem;
    .background('activities/eggFrenzyBg.png');
    position: relative;
    .goBack{
      position: absolute;
      top: .2rem;
      left: .1rem;
      font-size: .8rem;
      color: #000000;
      display: block;
      height: 1rem;
      width: 1rem;
      line-height: 1rem;
    }
    .rules{
      width: .6rem;
      height: 2rem;
      .background('activities/rulesBg.png');
      font-size: .32rem;
      font-weight: 600;
      text-align: center;
      color: #eb3016;
      padding: .38rem 0;
      line-height: 1;
      position: absolute;
      top: 1.28rem;
      right:.3rem;
    }
    .roll{
      width: 7.5rem;
      height: .7rem;
      line-height: .75rem;
      position: absolute;
      top: 3.63rem;
      left: 0;
      background: rgba(255, 255, 255, 0.3);
      .rollBox{
        height: .7rem;
        overflow: hidden;
        white-space: nowrap;
        .content,.copy{
          height: .7rem;
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
          .rollData{
            display: inline-block;
            margin:0 .4rem;
            vertical-align: top;
            img{
              display: inline-block;
              height: .5rem;
              width: .5rem;
              border-radius: .5rem;
              margin: .1rem 0;
              border: 2px solid #fff;
              box-sizing: border-box;
            }
            .phone{
              margin: 0 .2rem;
            }
            span{
              display: inline-block;
              vertical-align: top;
              color: #000000;
              font-size: .24rem;
            }
          }
          
        }
      }
    }
    ul{
      width: 7.5rem;
      height: 7.72rem;
      margin-top: 4.64rem;
      li{
        width:1.84rem;
        height: 2.9rem;
        margin:.3rem 0 .5rem .5rem;
        .background('activities/taizi.png');
        img{
          width: 100%;
          height: 100%;
          -webkit-transform-origin:50% 100%;
          transform-origin:50% 100%;
          transform: rotate(0);
          -webkit-transform: rotate(0);
        }
      }
    }
  }
  .eggFrenzy_info{
    width: 7.5rem;
    height: 1.7rem;
    background: #ffeea4;
    overflow: hidden;
    margin-top: -.6rem;
    .itemBox{
      margin:.1rem 0 0 .3rem;
      width: 3.3rem;
      height: 1rem;
      line-height: 1rem;
      background: #ffeea4;
      box-shadow:0px 0px 10px 1px #ffc971;
      position: relative;
      i{
        display: inline-block;
        width: .4rem;
        height: .4rem;
        position: absolute;
        top: .3rem;
        left: .24rem;
      }
      .money{
        .background('activities/eggFrenzy_money.png');
      }
      .mallet{
        .background('activities/mallet.png');
      }
      .describe{
        display: block;
        color:#ff3701;
        font-size: .3rem;
        margin-left: .85rem;
        .num{
          color:#e71e04;
          font-weight: 600;
        }
      }
    }
  }
  .eggFrenzy_bottom{
    width: 7.5rem;
    background: #ffeea4;
    padding: 0 .3rem;
    .top{
      text-align: center;
      margin-bottom: .1rem;
      span{
        display: inline-block;
        width: 3.7rem;
        font-size: .3rem;
        font-weight: 600;
        text-align: center;
        color: #e71e04;
        background: #ffeea4;
        position: relative;
        &::before,&::after{
          content: '';
          display:block;
          height: 1px;
          width: 1.6rem;
          background: #ff9f15;
          position: absolute;
          top: 50%;
          left: -1.6rem;
        }
        &::after{
          left:3.7rem;
        }
      }
    }
    .middle{
      text-align: center;
      color: #ef7012;
      font-size: .26rem;
      margin-bottom:.55rem; 
    }
    .bottom{
      padding:0 .15rem .4rem .15rem;
      .share_item{
        text-align: center;
        margin-left:.6rem; 
        &:first-child{
        margin-left:0; 
        }
        .title{
          font-size: .3rem;
          color:#ff9f15;
        }
        .imgBox{
          width: 1.20rem;
          height: 1.20rem;
          border-radius: 1.26rem;
          .border(#ff9f15);
          box-shadow:0px 1px 2px 1px #fac481;
          margin-bottom: .3rem;
          img{
            height: .7rem;
            width: .7rem;
            margin:.24rem auto;
          }
        }
      }
    }
  }
  


  .v-modal {
    .mask;
    text-align: center;
    .winningModal {
      position: absolute;
      .background('activities/winning.png');
      width: 5.3rem;
      height: 6.86rem;
      top: 50%;
      margin-top: -3.43rem;
      left: 50%;
      margin-left: -2.65rem;
      .tipsBox {
        position: absolute;
        top: 2.05rem;
        left: 1.5rem;
        transform: rotate(-5deg);
        -webkit-transform: rotate(-5deg);
        span{
            font-size: 1rem;
            color: #ffffff;
            -webkit-text-stroke: 0.06rem #be0b02;
            position: relative;
            font-weight: 700;
            letter-spacing: -3px;
          i{
            font-size: 0.55rem;
            color: #ffffff;
            position: absolute;
            top: 28%;
            left: 108%;
            font-weight: 700;
            -webkit-text-stroke: 0.04rem #be0b02;
          }
          
        }
      }
      button{
        width: 2rem;
        height: .8rem;
        background: wheat;
      }
    }
    .tipsModal{
      position: absolute;
      background-color: #fff0ca;
      width: 4.8rem;
      height: 5.2rem;
      top: 50%;
      margin-top: -2.6rem;
      left: 50%;
      margin-left: -2.4rem;
      border-radius: 0.5rem;
      .close{
        position: absolute;
        top: .36rem;
        right: .36rem;
        font-size: .3rem;
        color: #d0bb87;
      }
      .imgBox{
        width: 1.47rem;
        height: 2rem;
        margin: .6rem auto 0;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .tipsBox {
        text-align: center;
        font-size:.36rem;
        color: #666666; 
        line-height:1;
        margin: .46rem 0 .37rem;
      }
      button{
        width: 4rem;
        height: .88rem;
        background: #ff3701;
        border-radius: .44rem;
        box-shadow: 0 .1rem .1rem 0 rgba(233, 19, 3, 0.33);
        color:#ffffff;
        font-size: .36rem;
        text-align: center;
      }
    }
    .rulesModal{
      position: absolute;
      background-color: #fff0ca;
      width: 6.9rem;
      height: 6.8rem;
      top: 50%;
      margin-top: -3.4rem;
      left: 50%;
      margin-left: -3.45rem;
      border-radius: 0.5rem;
      .close{
        position: absolute;
        top: .36rem;
        right: .36rem;
        font-size: .3rem;
        color: #d0bb87;
      }
      .tipsBox{
        position: absolute;
        top: .48rem;
        left: .33rem;
        width: 1.83rem;
        height: .81rem;
        .background('activities/rulesTips.png');
        text-align: center;
        font-size: .34rem;
        color: #ffffff;
        line-height: 1;
        padding-top: .13rem;
      }
      ul{
        width: 6.1rem;
        text-align: justify;
        margin: 1.65rem auto 0;
        line-height: .5rem;
        padding-left:.47rem;
        li{
          color: #666666;
          font-size: .3rem;
          position: relative;
          word-break: normal;
          margin-bottom: .05rem;
          i{
            position: absolute;
            top: .1rem;
            left: -.47rem;
            display:block;
            width: .34rem;
            height: .34rem;
            background: #ff3701;
            border-radius:100%; 
            font-size: .24rem;
            color: #ffffff;
            line-height: .36rem;
            text-align: center;
          }
          span{
            color:#ff3701;
          }
        }
      }
    }
    .mdmModal{
      position: absolute;
      width: 7.5rem;
      height: 9.9rem;
      top: 50%;
      margin-top: -4.95rem;
      left:0;
      .mdmBg{
        width: 7.5rem;
        height: 9.5rem;
        margin-top: 0;
      }
      .close{
        font-size: .54rem;
        color: #ffffff;
      }
      .QRcode{
        position: absolute;
        top: 1.53rem;
        left: 2.13rem;
        width: 3.2rem;
        height: 3.2rem;
        background: #eeeeee;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .zaidan{
      background: transparent;
      .eggBox{
        width:1.84rem;
        height:2.9rem;
        background: transparent;
        img.eggScale{
          width: 100%;
          height: 100%;
          transform: scale(1.5);
          -webkit-transform: scale(1.5);
        }
        img.broken{
          width: 3.43rem;
          height: 2.9rem;
          position: absolute;
          left: -1.05rem;
          top: 0rem;
          transform: scale(1.5);
          -webkit-transform: scale(1.5);
        }
        .hammer{
          position: absolute;
          top:50%;
          left:50%;
          width:5rem;
          height:5rem;
          margin: -2.5rem 0 0 -2.5rem;
          -webkit-transform-origin:50% 50% ;
          transform-origin:50% 50%;
          img{
            width: 1.69rem;
            height: 1.2rem;
            transform: rotate(30deg);
            -webkit-transform: rotate(30deg);
            position: relative;
            left: .6rem;
            top:0;
            transform-origin:100% 50%;
            -webkit-transform-origin:100% 50% ;
          }
        }
      }
    }
    img.moveEgg{
      width:1.84rem;
      height:2.9rem;
      position: absolute;
    }
  }

  .rotate{
    animation: eggRotate 1s ease-in-out infinite;
    -webkit-animation:eggRotate 1s ease-in-out infinite;
  }
  .entirely{
    animation:hammerRotate1 1s ease-in-out 1;
    -webkit-animation:hammerRotate1 1s ease-in-out 1;
  }
  .half{
    animation:hammerRotate2 0.5s linear 1 both;
    -webkit-animation:hammerRotate2 0.5s linear 1 both;
  }
  .eggChange{
    animation:eggScale 1.5s linear 2 both ;
    -webkit-animation:eggScale 1.5s linear 2 both ;
  }
  .zhuanquan{
    animation:spin 3s linear  1 both;
    -webkit-animation:spin 3s linear  1 both;
  }
  .moveEggScale{
    animation:moveEggScale .6s linear  1 both;
    -webkit-animation:moveEggScale .6s linear  1 both;
  }
  @keyframes moveEggScale{
    to{transform: scale(1.5);-webkit-transform: scale(1.5);}
  }
  @-webkit-keyframes moveEggScale{
    to{transform: scale(1.5);-webkit-transform: scale(1.5);}
  }
  @keyframes spin{
    to{transform: rotate(-1turn);-webkit-transform: rotate(-1turn);}
  }
  @-webkit-keyframes spin{
    to{transform: rotate(-1turn);-webkit-transform: rotate(-1turn);}
  }
  @keyframes eggScale {
    0%{
      transform: scale(1.5);
      -webkit-transform: scale(1.5);
    }
    50%{
      transform: scale(1.8);
      -webkit-transform: scale(1.8);
    }
    100%{
      transform: scale(1.5);
      -webkit-transform: scale(1.5);
    }
  }
  @-webkit-keyframes eggScale {
    0%{
      transform: scale(1.5);
      -webkit-transform: scale(1.5);
    }
    50%{
      transform: scale(1.8);
      -webkit-transform: scale(1.8);
    }
    100%{
      transform: scale(1.5);
      -webkit-transform: scale(1.5);
    }
  }
  @keyframes eggRotate {
    0%{
      transform: rotate(0);
      -webkit-transform: rotate(0);
    }
    25%{
      transform: rotate(2deg);
      -webkit-transform: rotate(2deg);
    }
    75%{
      transform: rotate(-2deg);
      -webkit-transform: rotate(-2deg);
    }
    100%{
      transform: rotate(0);
      -webkit-transform: rotate(0);
    }
  }
  @-webkit-keyframes eggRotate {
    0%{
      transform: rotate(0);
      -webkit-transform: rotate(0);
    }
    25%{
      transform: rotate(2deg);
      -webkit-transform: rotate(2deg);
    }
    75%{
      transform: rotate(-2deg);
      -webkit-transform: rotate(-2deg);
    }
    100%{
      transform: rotate(0);
      -webkit-transform: rotate(0);
    }
  }
  @keyframes hammerRotate1 {
    0%{
      transform: rotate(30deg);
      -webkit-transform: rotate(30deg);
    }
    50%{
      transform: rotate(-20deg);
      -webkit-transform: rotate(-20deg);
    }
    100%{
      transform: rotate(30deg);
      -webkit-transform: rotate(30deg);
    }
  }
  @-webkit-keyframes hammerRotate1 {
    0%{
      transform: rotate(30deg);
      -webkit-transform: rotate(30deg);
    }
    50%{
      transform: rotate(-20deg);
      -webkit-transform: rotate(-20deg);
    }
    100%{
      transform: rotate(30deg);
      -webkit-transform: rotate(30deg);
    }
  }
  @keyframes hammerRotate2 {
    0%{
      transform: rotate(30deg);
      -webkit-transform: rotate(30deg);
    }
    100%{
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
  }
  @-webkit-keyframes hammerRotate2 {
    0%{
      transform: rotate(30deg);
      -webkit-transform: rotate(30deg);
    }
    100%{
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
  }
}
</style>

