<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="taskCenter" v-show="!loading">
      <div class="taskCenter_top">
        <div class="maskLayer" v-show="!iospedding"></div>
        <nv-marquee :duration="800" :interval="2000" :play="marqueePlay" class="flushCroll" v-show="!iospedding">
          <li v-for="(item,$index) in scrollbarData" :key="$index">
            恭喜用户
            <span class="gold"> {{item.userid}} </span>兑换了
            <span class="gold"> {{item.product_name}} </span>奖励
          </li>
        </nv-marquee>
        <!-- <router-link to="/faq" ><div class="hdsm">活动说明</div></router-link> -->
        <a class="signInBtn" @click="sign" :class="{'gray':detail.is_sign}">{{btnStr}}</a>
        <div class="tips"></div>
      </div>
      <div class="taskCenter_sevenDays">
        <ul class="signList clearfix">
          <li v-for="(item,$index) in sevenDays" :key="$index">
            <div class="circle" :class="{'gray':$index < signCount,'red':detail.is_sign ==0 && $index == signCount}">
              <button class="coin">{{item.coin}}</button>
            </div>
            <div class="day" v-if="$index > signCount || ($index == signCount && detail.is_sign >0 ) ">{{$index+1}}天</div>
            <div class="day gray" v-if="$index < signCount">已领取</div>
            <div class="day red" v-if="detail.is_sign ==0 && $index == signCount">可领取</div>
          </li>
        </ul>
      </div>
      <div class="taskCenter_treasureBox" v-show="!iospedding">
        <div class="box">
          <div class="bg" :class="{'gray':detail.is_kbbx!=0}" @click="openBox">
            <div class="icon" :class="{'gray':detail.is_kbbx!=0}"></div>
            <div class="txt" v-show="detail.is_kbbx!=0">
              <p>距离打开宝箱还有</p>
              <p class="timer">{{countdown | countdown}}</p>
            </div>
            <div class="btn" v-show="detail.is_kbbx==0">
              开启宝箱
            </div>
          </div>
        </div>
        <p class="tips">宝箱每4小时开启一次</p>
        <p class="tips red">近期收徒与阅读越多，获得的金币就越多</p>
      </div>
      <div class="taskCenter_tasks" v-show="!iospedding">
        <div class="task" v-show="isNewer">
          <div class="title">
            <i class="icoNew"></i>新手任务
          </div>
        </div>
        <ul class="taskList newer" v-show="isNewer">
          <li v-for="(item,$index) in newerTasks" :key="$index">
            <div class="taskTitle" @click="togglenewer($event,$index)">
              <div class="title">{{item.task_name}}</div>
              <div class="earn">
                +{{item.coin}}
                <i class="iconfont">&#xe6a2;</i>
              </div>
              <i class="iconfont" :class="{'down':!item.show,'up':item.show}">&#xe6a6;</i>
            </div>
            <div class="taskContent" v-show="item.show">
              <div class="box">
                <div class="toggleItem">
                  <div class="table">
                    <div class="table-cell subtitle">{{item.task_conent}}</div>
                  </div>
                </div>
                <button class="toDo" @click="newerToDo($event,item)">{{item.btn}}</button>
              </div>
              <div class="sub_box">
                <ul>
                  <li class="tit clear " :class="{complete:item.status}" v-for="(item,$index) in newerList" :key="$index">
                    <span class="left">{{item.desc}}</span>
                    <span class="right">+{{item.coin}}
                      <i class="iconfont">&#xe6a2;
                        <i class="tip"></i>
                      </i>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <div class="task">
          <div class="title">
            <i class="iconfont">&#xe601;</i>日常任务</div>
          <!-- <div class="ios_tips" v-show="isios">注：本活动与苹果公司无关</div> -->
        </div>
        <ul class="taskList">
          <li v-for="(item,$index) in tasks" :key="$index">
            <div class="taskTitle" @click="toggle($event,$index)">
              <div class="title ">
                <span class="">{{item.task_name}}</span>
                <i class="tip " :class="{money:!iospedding && (item.task_keys=='wzyd_3' || item.task_keys=='yqhy_more'|| item.task_keys=='all_people_read'),hot:item.task_keys=='yqhy',new:item.task_keys=='activity_88888'}"></i>
              </div>
              <div class="earn" :class="{red:item.task_keys=='activity_88888'}">
                <span>{{item.cash>0?'+'+item.cash+'元':''}}</span>
                <span v-show="item.coin>0">{{item.coin>0?'+'+item.coin:''}}</span>
                <span v-show="item.uncash>0">{{item.uncash>0?'+'+item.uncash+'元':''}}</span>
                <i class="iconfont">{{ item.task_keys=='activity_88888' || item.uncash>0?'&#xe619;':'&#xe6a2;'}}</i>
                <!-- <span class="iconcoin"></span> -->
              </div>
              <i class="iconfont" :class="{'down':!item.show,'up':item.show}">&#xe6a6;</i>
              <!-- <div class="icondown" :class="{'down':!item.show,'up':item.show}"></div> -->
            </div>
            <div class="taskContent" v-show="item.show">
              <div class="box">
                <div class="toggleItem">
                  <div class="table">
                    <div class="table-cell">{{item.task_conent}}</div>
                  </div>
                </div>
                <button class="toDo" @click="toDo($event,item)">{{item.btn}}</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="modal" v-show="signModalShow" @touchmove.prevent>
        <div class="signModal">
          <div class="top">
            恭喜您签到成功获得{{todayCoin}}金币
          </div>
          <div class="subject">
            <p>分享热文获取更多金币</p>
          </div>
          <ul class="informationList">
            <li class="clearfix" v-for="(item,$index) in informationList" :class="{'nbd':$index==2}" @click="goToArticle(item.id)" :key="$index">
              <div class="img">
                <img :src="item.piturl" width="100%" />
              </div>
              <div class="title">
                <p class="name">{{item.title | title}}</p>
                <p class="reader">阅读 {{item.hits}}</p>
              </div>
            </li>
          </ul>
          <div class="btns">
            <button class="close" @click="close">关闭</button>
            <button class="change" @click="getInformationList">
              <i class="iconfont">&#xe666;</i> 换一批</button>
          </div>
        </div>
      </div>
      <div class="modal" v-show="treasureBoxModalShow" @touchmove.prevent>
        <div class="treasureBoxModal">
          <i class="iconfont" @click="close">&#xe685;</i>
          <div class="box">
            <div class="gold">+{{getCoin}}金币</div>
          </div>
          <div class="tips">近期收徒越多得到的奖励越多</div>
          <div class="tipsBox">
            需分享到朋友圈，且被朋友认真阅读后才能拿到奖励哦！分享邀请最高可获得
            <span class="red">30万金币</span>奖励！赶快分享吧！
          </div>
          <button class="share" @click="share">分享到朋友圈再赚150金币</button>
          <button class="ok" @click="close">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import nvHead from '@/components/header.vue';
  import nvLoading from '@/components/loading.vue';
  import nvMarquee from '@/components/marquee';
  import ajax from '@/config/ajax'
  import appcall from '@/config/appcall'

  export default {
    name: 'taskCenter',
    data() {
      return {
        loading: true,
        sevenDays: [],
        newerTasks: [],
        isNewer: false,
        newerList: [],
        tasks: [],
        informationList: [],
        detail: {},
        btnStr: '我 要 签 到',
        iospedding: false,
        treasureBoxModalShow: false,
        signModalShow: false,
        countdown: 0,
        getCoin: 0,
        todayCoin: 0,
        scrollbarData: [],
        marqueePlay: false,
      }
    },
    components: {
      nvHead,
      nvLoading,
      nvMarquee
    },
    async created() {
      // ios 提审状态
      this.iospedding = await appcall.getReviewStatus();

      this.getSignInState();
      if (!this.iospedding) {
        this.getNewerTasks();
        this.getTasks();
        this.scrollbar();
      }
    },
    watch: {},
    mounted() {},
    methods: {
      /**
       * 获取签到状态，开宝箱状态
       */
      async getSignInState() {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax('post', this.$apiurl + '/sign/get_signin_detail', comm, params);
        if (rs && rs.code === 1001) {
          this.loading = false;
          this.detail = rs.data;
          let signCount = rs.data.sign_count;
          if (rs.data.is_sign > 0) {
            this.btnStr = rs.data.is_sign_str;
          }
          this.signCount = signCount;
          let sevenDays = [];
          this.detail.sign_coin.forEach((n, i) => {
            sevenDays.push(n);
          })
          this.sevenDays = sevenDays;
          // 宝箱倒计时
          if (this.detail.is_kbbx > 0) {
            this.countdown = rs.data.left_time_break;
            this.countdownTimer();
          }
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          })
        } else {
          this.$alert(rs.msg);
        }
      },
      /*
       * 获取新手任务列表
       */
      async getNewerTasks() {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax('post', this.$apiurl + '/tasks/get_newer_lists', comm, params);
        if (rs && rs.code === 1001 && rs.data) {
          this.isNewer = (rs.data.is_newer === 1 && rs.data.list.length > 0) ? true : false;
          if (this.isNewer) {
            rs.data.list.forEach((n, i) => {
              n.show = false;
              if (n.task_keys == 'ydzx_xinshou') {
                n.btn = "查看详情";
              }
            })
            this.newerTasks = rs.data.list;
          }
        } else {
          this.$alert(rs.msg);
        }
      },
      /*
       * 获取新手任务完成情况
       */
      async getNewerStatus() {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax('post', this.$apiurl + '/user_newer_activity/get_read_schedule', comm, params);
        if (rs && rs.code === 1001 && rs.data) {
          this.newerList = rs.data.list;
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 获取任务列表
       */
      async getTasks() {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax('post', this.$apiurl + '/tasks/get_tasks_lists', comm, params);
        console.log(rs);
        if (rs && rs.code === 1001 && rs.data) {
          rs.data.forEach((n, i) => {
            n.show = false;
            if (n.task_keys == 'wzyd_3' || n.task_keys == 'yzpl') {
              n.btn = "去阅读";
            } else if (n.task_keys == 'yqhy' || n.task_keys == 'yqhy_more') {
              n.btn = '去邀请';
            } else if (n.task_keys == 'sssr') {
              n.btn = '去晒晒';
            } else if (n.task_keys == 'spgk') {
              n.btn = '看视频';
            } else if (n.task_keys == 'tdhx') {
              n.btn = '去唤醒';
            } else if (n.task_keys == 'fun_share') {
              n.btn = '去参加';
            } else if (n.task_keys == 'activity_88888') {
              n.btn = '查看详情';
            } else if (n.task_keys == 'share_article' || n.task_keys == 'share_article_read') {
              n.btn = '去分享';
            } else {
              n.btn = '去阅读';
            }
          })
          this.tasks = rs.data;
        } else {
          this.$alert(rs.msg);
        }
      },
      toggle(event, index) {
        this.tasks[index].show = !this.tasks[index].show;
      },
      togglenewer(event, index) {
        if (this.newerTasks[index].task_keys == 'ydzx_xinshou' && !this.newerList.length) {
          this.getNewerStatus();
        }
        this.newerTasks[index].show = !this.newerTasks[index].show;
      },
      newerToDo(event, item) {
        switch (item.task_keys) {
          case 'ydzx_xinshou':
            appcall.navigator({
              title: '新手阅读任务',
              url: this.$h5url + 'noviceReadTask',
            })
            break;
          default:
            appcall.articles();
            break;
        }
      },
      toDo(event, n) {
        if (n.task_keys == 'wzyd_3') {
          appcall.articles();
        } else if (n.task_keys == 'yqhy' || n.task_keys == 'yqhy_more') {
          //appcall.gotoinvite();
          appcall.navigator({
            title: '邀请好友',
            url: this.$h5url + 'invite',
          })
        } else if (n.task_keys == 'sssr') {
          //appcall.gotoshai();
          appcall.navigator({
            title: '晒收入',
            url: this.$h5url + 'shai',
          })
        } else if (n.task_keys == 'yzpl') {
          appcall.articles();
        } else if (n.task_keys == 'fun_share') {
          this.$router.push({
            path: '/aprilFoolsDay'
          })
        } else if (n.task_keys == 'spgk') {
          appcall.videos();
        } else if (n.task_keys == 'tdhx') {
          appcall.navigator({
            title: '唤醒徒弟',
            url: this.$h5url + 'invite?wake=1',
          })
        } else if (n.task_keys == 'activity_88888') {
          appcall.navigator({
            title: '新年小目标',
            url: this.$h5url + 'sendcrash',
          })
        } else if (n.task_keys == 'share_article' || n.task_keys == 'share_article_read') {
          appcall.articles({
            sc_catid: 99
          });
        } else {
          // 默认去主页
          appcall.articles();
        }
      },
      /**
       * 签到动作
       */
      async sign() {
        let params = {};
        let comm = await appcall.getRequestData(params);

        if (this.detail.is_sign != 1) {
          let rs = await ajax('post', this.$apiurl + '/sign/signin', comm, params);
          if (rs && rs.code === 1001) {
            this.detail.is_sign++;
            this.signCount++;
            this.btnStr = rs.msg;
            if (this.iospedding) {
              this.$toast('签到成功');
            } else {
              this.signModalShow = true;
              this.todayCoin = rs.data.today_coin;
              this.getInformationList();
            }
          } else if (rs && rs.code == 1005) {
            this.$alert(rs.msg).then(ok => {
              appcall.login();
            })
          } else {
            this.$alert(rs.msg);
          }
        }
      },
      /**
       * 头部滚动条
       */
      async scrollbar() {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax('post', this.$apiurl + '/tasks/get_user_withdraw', comm, params);
        if (rs && rs.code === 1001) {
          this.scrollbarData = rs.data.list
          setTimeout(() => {
            this.marqueePlay = true;
          }, 0) //用setTimeout0来代替进程同步，坑!!!
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          })
        } else if (rs && rs.code === 1008) {
          // 暂无数据
          this.scrollbarData = [];
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 开宝箱动作
       */
      async openBox() {
        if (this.detail.is_kbbx == 0) {
          let params = {};
          let comm = await appcall.getRequestData(params);

          let rs = await ajax('post', this.$apiurl + '/tasks/task_to_open_kbbx', comm, params);
          if (rs && rs.code === 1001) {
            this.detail.is_kbbx++;
            this.getCoin = rs.data.coin;
            this.countdown = rs.data.left_time_beak;
            this.countdownTimer();
            this.treasureBoxModalShow = true;
          } else if (rs && rs.code == 1005) {
            this.$alert(rs.msg).then(ok => {
              appcall.login();
            })
          } else {
            this.$alert(rs.msg);
          }
        }
      },
      /**
       * 倒计时
       */
      countdownTimer() {
        let timer = setInterval(() => {
          this.countdown--;
          if (this.countdown < 1) {
            clearInterval(timer);
            setTimeout(() => {
              location.reload(true);
            }, 100)
          }
        }, 1000)
      },
      /**
       * 分享至朋友圈
       */
      async share() {
        let params = {
          task_keys: 'sbbx',
          share_where: 1,
        }
        let comm = await appcall.getRequestData(params);

        let rs = await ajax('post', this.$apiurl + '/tasks/get_task_share_timeline', comm, params);
        if (rs && rs.code === 1001) {
          let images = rs.data.image.join(';')
          let params = {
            type: 4,
            title: '',
            url: '',
            desc: '',
            images: images
          }
          appcall.invite(params);
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          })
        } else {
          this.$alert(rs.msg);
        }
      },
      /**
       * 签到成功获取相关资讯
       */
      async getInformationList() {
        let params = {
          num: 3,
        }
        let comm = await appcall.getAppData();

        let rs = await ajax('post', this.$apiurl + '/sign/get_sign_related_article_lists', comm, params);
        if (rs && rs.code == 1001 && rs.data) {
          this.informationList = rs.data.list;
        } else if (rs.code === 1008) {
          this.informationList = [];
        } else {
          this.$alert(rs.msg);
        }
      },
      goToArticle(id) {
        appcall.gotoarticle({
          id: id
        })
      },
      close() {
        this.treasureBoxModalShow = false;
        this.signModalShow = false;
      }
    },
    filters: {
      countdown(value) {
        let h = Math.floor(value / 3600 % 24) < 10 ? '0' + Math.floor(value / 3600 % 24) : Math.floor(value / 3600 % 24);
        let m = Math.floor(value / 60 % 60) < 10 ? '0' + Math.floor(value / 60 % 60) : Math.floor(value / 60 % 60);
        let s = (value - h * 3600 - m * 60) < 10 ? '0' + (value - h * 3600 - m * 60) : (value - h * 3600 - m * 60);
        return h + ':' + m + ':' + s;
      },
      title(value) {
        value = value.length < 17 ? value : value.substr(0, 17) + '...';
        return value;
      }
    }
  }

</script>

<style lang="less" scoped>
  @import '../../style/colors';
  .taskCenter {
    .taskCenter_top {
      width: 100%;
      height: 3.96rem;
      background-image: url('../../images/activities/bg.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: relative;
      margin-bottom: .55rem;
      .maskLayer {
        height: .6rem;
        line-height: .6rem;
        background: #621d02;
        opacity: .2;
      }
      .flushCroll {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        overflow: hidden;
        z-index: -1;
        ul {
          height: .6rem;
        }
        li {
          height: .6rem;
          line-height: .6rem;
          font-size: .24rem;
          color: #fff;
        }
        .gold {
          color: #d53c3e;
        }
      }
      .signInBtn {
        height: .78rem;
        line-height: .7rem;
        width: 3.2rem;
        text-align: center;
        border: none;
        background: url('../../images/activities/qiandao_btn.png') no-repeat center center;
        background-size: 100%;
        color: #fff;
        font-size: .4rem;
        display: block;
        position: absolute;
        margin: auto;
        top: 2.1rem;
        left: 50%;
        margin-left: -1.6rem;
        &.gray {
          background-image: url('../../images/activities/qiandao_btn_gray.png');
          font-size: .24rem;
        }
        &:active {
          opacity: .9;
        }
      }
      .tips {
        width: 100%;
        height: .25rem;
        position: absolute;
        margin: auto;
        top: 3.05rem;
        left: 0;
        background: url('../../images/activities/qiandao_tip.png') no-repeat center center;
        background-size: 100%;
      }
    }

    .taskCenter_sevenDays {
      width: 100%;
      margin-bottom: 1rem;
      text-align: center;
      .signList {
        width: 100%;
        text-align: center;
        padding: 0 .3rem;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          display: block;
          height: .1rem;
          background: #fce5a5;
          top: 50%;
          margin-top: -.05rem;
          left: 7.14285%;
          width: 85.7143%;
        }
        li {
          width: 14.2857%;
          float: left;
          position: relative;
          .circle {
            .coin {
              position: relative;
              width: .5rem;
              height: .5rem;
              background: url('../../images/activities/coin_gray.png') no-repeat center center;
              background-size: 100% 100%;
              margin: 0 auto;
              font-size: .18rem;
              color: #fff;
              border: 0;
              line-height: 0;
            }
            &.red,
            &.gray {
              .coin {
                background-image: url('../../images/activities/coin_gold.png');
              }
            }
          }
          .day {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            font-size: .24rem;
            margin-top: .2rem;
            &.red {
              color: @mcolor;
            }
            &.gray {
              color: @mcolor;
            }
          }
        }
      }
    }

    @keyframes bxshake {
      from,
      to,
      36% {
        transform: rotate(0deg) translate(0, 0);
      }
      10%,
      13% {
        transform: rotate(10deg) translate(0, -.05rem);
      }
      16%,
      19% {
        transform: rotate(-10deg) translate(0, -.1rem);
      }
      21%,
      24% {
        transform: rotate(10deg) translate(0, -.05rem);
      }
      27%,
      30% {
        transform: rotate(-10deg) translate(0, 0);
      }
    }

    .taskCenter_treasureBox {
      display: block;
      padding-bottom: .32rem;
      border-bottom: .2rem solid #eee;
      .box {
        .bg {
          width: 4.2rem;
          height: 1.02rem;
          margin: 0 auto .15rem;
          background-image: url('../../images/activities/bx_bg.png');
          background-size: 100%;
          background-repeat: no-repeat;
          position: relative;
          &.gray {
            background-image: url('../../images/activities/bx2_bg.png');
          }
          .icon {
            width: 1rem;
            height: .75rem;
            position: absolute;
            top: .08rem;
            left: .4rem;
            background: url('../../images/activities/bx.png') no-repeat center top;
            background-size: 100%;
            animation: bxshake 2s infinite;
            &.gray {
              background-image: url('../../images/activities/bx2.png');
              animation: none;
            }
          }
          .txt {
            padding-top: .18rem;
            margin-left: 1.4rem;
            font-size: .24rem;
            line-height: 1;
            color: #666;
            text-align: center;
            .timer {
              margin-top: .1rem;
              display: block;
              font-size: .28rem;
              color: #000;
              position: relative;
            }
          }
          .btn {
            margin-left: 1.4rem;
            text-align: center; // line-height: 0;
            font-weight: bold;
            font-size: .48rem;
            color: #fff;
            padding-top: .12rem;
          }
        }
      }
      .tips {
        font-size: .24rem;
        line-height: .4rem;
        text-align: center;
      }
      .red {
        color: @mcolor;
      }
    }

    .taskCenter_tasks {
      padding: 0 0 .5rem;
      border-radius: .25rem;
      .task {
        position: relative;
        padding: .4rem .4rem .4rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        &:first-child {
          border-top: 0;
        }
        .title {
          height: .42rem;
          padding-left: .65rem;
          line-height: .42rem;
          font-size: .3rem;
          color: @mcolor;
          position: relative;
          i.iconfont {
            position: absolute;
            left: 0;
            top: 0;
            font-size: .4rem;
            text-align: center;
            margin-left: .1rem;
          }
          .icoNew {
            position: absolute;
            left: 0;
            top: 0;
            width: .4rem;
            height: .4rem;
            background: url(../../images/ico_task_new.png) no-repeat center center;
            background-size: 100%;
            margin-left: .1rem;
          }
        }
        .ios_tips {
          position: absolute;
          top: 0;
          right: .4rem;
          height: .42rem;
          line-height: .42rem;
          color: #999;
          font-size: .16rem;
        }
      }
      .taskList {
        //margin-bottom: .2rem;
        .taskTitle {
          position: relative;
          padding: .3rem .4rem .3rem;
          cursor: pointer;
          &:before {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            left: 0;
            width: .2rem;
            height: .2rem;
            margin: -.1rem 0 0 .42rem;
            background: @mcolor;
            border-radius: .2rem;
          }
          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: .5rem;
            width: 1px;
            height: 100%;
            background: @mcolor;
          }
          .title {
            font-size: .3rem;
            height: .4rem;
            line-height: .4rem;
            padding-left: .5rem;
            padding-right: 1.8rem;
            display: flex;
            i.tip {
              height: .4rem;
              display: block;
              margin-left: .2rem;
              &.money {
                width: 1.62rem;
                background: url(../../images/activities/task_ico_money.png) no-repeat center center;
                background-size: 100%;
              }
              &.hot {
                width: .82rem;
                background: url(../../images/activities/task_ico_hot.png) no-repeat center center;
                background-size: 100%;
              }
              &.new {
                width: .82rem;
                background: url(../../images/activities/task_ico_new.png) no-repeat center center;
                background-size: 100%;
              }
            }
          }
          .earn {
            position: absolute;
            top: 50%;
            margin-top: -.17rem;
            right: .93rem;
            font-size: .28rem;
            color: #666;
            padding-right: 0;
            height: .34rem;
            .iconfont {
              color: @mcolor;
              font-size: 1.2em;
            }
            &.red {
              color: @mcolor
            }
          }
          &>.iconfont {
            position: absolute;
            top: 50%;
            margin-top: -.2rem;
            right: .44rem;
            font-size: .32rem;
            line-height: .45rem;
            height: .4rem;
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
        .taskContent {
          position: relative;
          background: #eee;
          padding-left: .9rem;
          padding-right: .5rem;
          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: .5rem;
            width: 1px;
            height: 100%;
            background: @mcolor;
          }
          .box {
            position: relative;
            padding: .3rem .2rem .1rem;
            border-radius: .2rem;
          }
          .toggleItem {
            padding-right: 2rem;
            font-size: .24rem;
            line-height: .3rem;
            color: #666;
            .table {
              min-height: .6rem;
            }
            .table-cell {
              text-align: justify;
              line-height: .4rem;
            }
          }
          .toDo {
            width: 1.6rem;
            height: .6rem;
            position: absolute;
            top: 50%;
            margin-top: -.3rem;
            right: 0;
            background: @mcolor;
            border-radius: .1rem;
            color: #fff;
            border: 0;
            &:active {
              transform: scale(.95);
            }
          }
          .subtitle {
            padding-bottom: .2rem;
            border-bottom: 1px solid #ddd;
          }
          .sub_box {
            position: relative;
            padding: 0 .2rem .2rem;
            .tit {
              padding: .05rem 0;
              font-size: .22rem;
              &.complete {
                .left,
                .right {
                  color: #999;
                }
                i.iconfont {
                  position: relative;
                }
                i.tip {
                  position: absolute;
                  top: 0;
                  left: 0;
                  margin: -.07rem 0 0 -.1rem;
                  width: .46rem;
                  height: .39rem;
                  display: block;
                  background: url(../../images/ico_task_complete.png) no-repeat center center;
                  background-size: 100%;
                }
              }
            }
            .right {
              color: #ff8920;
            }
          }
        }
        li:first-child {
          .taskTitle {
            &:after {
              top: 50%;
              height: 50%;
            }
          }
        }
      }
    }

    .modal {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.3);
      .treasureBoxModal {
        position: absolute;
        background-color: #fff;
        display: block;
        width: 5.8rem;
        height: 9rem;
        top: 50%;
        margin-top: -4.5rem;
        left: 50%;
        margin-left: -2.9rem;
        border-radius: .5rem;
        padding: .65rem .4rem 0;
        position: relative;
        i.iconfont {
          width: .6rem;
          height: .6rem;
          position: absolute;
          right: .25rem;
          top: .25rem;
          font-size: .4rem;
          color: #999;
          text-align: center;
          line-height: .6rem;
          z-index: 2;
        }
        &:before {
          content: ' ';
          width: 100%;
          height: .95rem;
          display: block;
          background: url(../../images/pop_sbbx_top.png) no-repeat center top;
          background-size: auto 100%;
          position: absolute;
          top: -.25rem;
          left: 0;
          z-index: 1;
        }
        .box {
          height: 3.98rem;
          margin: 0 auto;
          background: url('../../images/activities/pop_box.png') no-repeat center center;
          background-size: auto 100%;
          position: relative;
          margin-top: -.3rem;
          .gold {
            position: absolute;
            bottom: 0;
            left: 0;
            text-align: center;
            width: 100%;
            font-size: .72rem;
            color: #b32504;
            font-weight: 600;
          }
        }
        .tips {
          font-size: .24rem;
          line-height: 1;
          text-align: center;
          color: #C9804A;
          margin: .1rem auto .2rem;
          position: relative;
        }
        .tipsBox {
          border: 1px solid #bbb;
          padding: .15rem .2rem .18rem;
          font-size: .22rem;
          color: #666;
          line-height: .4rem;
          border-radius: .2rem;
          margin-bottom: .25rem;
          text-align: justify;
          .red {
            color: @mcolor;
          }
        }
        .share {
          height: .8rem;
          display: block;
          width: 100%;
          border: 0;
          border-radius: .8rem;
          color: #fff;
          background: #59C1BD;
          font-size: .3rem;
          margin-bottom: .3rem;
          cursor: pointer;
        }
        .ok {
          height: .8rem;
          display: block;
          width: 100%;
          border: 0;
          border-radius: .8rem;
          color: #fff;
          background: @mcolor;
          font-size: .3rem;
          cursor: pointer;
        }
      }
      .signModal {
        position: absolute;
        background-color: #fff;
        display: block;
        width: 5.8rem;
        height: 8.3rem;
        top: 50%;
        margin-top: -4.15rem;
        left: 50%;
        margin-left: -2.9rem;
        border-radius: .5rem;
        padding: .7rem .2rem 0;
        &:before {
          content: '';
          display: block;
          position: absolute;
          height: 1.35rem;
          width: 100%;
          background: url('../../images/activities/succ_bg.png') no-repeat center center;
          background-size: auto 100%;
          top: -.9rem;
          left: 0;
        }
        .top {
          font-size: .3rem;
          text-align: center;
          line-height: 1;
          color: #ff5c5c;
          margin-bottom: .5rem;
        }
        .subject {
          position: relative;
          margin-bottom: .3rem;
          p {
            font-size: .28rem;
            text-align: center;
            line-height: 1;
            color: #666;
            background: #fff;
            position: relative;
            margin: 0 .9rem;
          }
          &:before {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 1px;
            background: #eee;
          }
        }
        .informationList {
          padding: 0 .2rem;
          margin-bottom: .3rem;
          li {
            padding: .2rem 0;
            border-top: 1px solid #eee;
            cursor: pointer;
            &:first-child {
              border-top: 0;
            }
          }
          .img {
            width: 1.8rem;
            float: left;
            height: 1.2rem;
            overflow: hidden;
            img {
              display: block;
              width: 100%;
            }
          }
          .title {
            margin-left: 2rem;
            height: 1.2rem;
            position: relative;
            .name {
              font-size: .3rem;
              color: #333;
              line-height: .36rem;
              height: .72rem;
              overflow: hidden;
              text-align: justify;
            }
            .reader {
              position: absolute;
              bottom: 0;
              left: 0;
              font-size: .24rem;
              color: #59C1BD;
              line-height: 1;
            }
          }
        }
        .btns {
          text-align: center;
          button {
            width: 2.2rem;
            height: .6rem;
            margin-left: .5rem;
            color: #fff;
            font-size: .28rem;
            background: #bbb;
            border-radius: .6rem;
            &:first-child {
              margin-left: 0;
            }
            &.change {
              background: #59c1bd;
            }
            .iconfont {
              font-size: .28rem;
            }
          }
        }
      }
    }

  }

</style>
