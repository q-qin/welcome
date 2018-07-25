<template>
  <div class="vInvite">
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <div>
      <nv-loading :loading="loading"></nv-loading>
      <div class="invitepupil" v-show="!loading">
        <div class="ad" @click="adJump">
          <img :src="banner.image_url">
        </div>
        <div class="top" v-show="!iospedding">
          <ul class="clear">
            <li class="left" :class="{active:tab==1}" @click="toggletab(1)">邀请收徒</li>
            <li class="left" :class="{active:tab==2}" @click="toggletab(2)">我的徒弟
              <i v-show="tribute > 0">{{tribute}}名</i>
            </li>
          </ul>
        </div>
        <template v-if="tab==1">
          <div class="share">
            <div class="tp" v-show="!iospedding">
              <div class="middle">
                通过以下方式
                <br> 邀请收徒让您得更多
              </div>
            </div>
            <div class="md clearfix">
              <div class="share_item left pyq">
                <div class="img" @click="pyqshare">
                  <img src="../../images/pyq.png">
                </div>
                <div>发朋友圈</div>
              </div>
              <div class="share_item left weixin">
                <div class="img" @click="wxshare">
                  <img src="../../images/wx.png">
                </div>
                <div>发微信</div>
              </div>
              <div class="share_item left qq">
                <div class="img" @click="qqshare">
                  <img src="../../images/qq.png">
                </div>
                <div>QQ邀请</div>
              </div>
              <div class="share_item left mdm">
                <div class="img" @click="mdmshare">
                  <img src="../../images/mdm.png">
                </div>
                <div>面对面邀请</div>
              </div>
            </div>
            <div class="inviteCode">
              <router-link :to="'/invitecode_detail'">
                <button>您的邀请码 {{invitecode}}</button>
              </router-link>
            </div>
          </div>
          <ul class="tasks clear" v-show="!iospedding">
            <li class="left" @click="goshai">
              <i class="iconfont">&#xe612;</i>
              <span>晒收入</span>
            </li>
            <li class="left" @click="gotask">
              <i class="iconfont">&#xe600;</i>
              <span>唤醒徒弟</span>
            </li>
          </ul>
          <div class="desc" v-show="!iospedding">
            <div class="tp ">
              <div class="imgs">
                <img class="ico " src="../../images/td_icon.png" />
                <img class="haochu " src="../../images/td_haochu.png" />
              </div>
            </div>
            <div class="txt1">
              徒弟有效阅读将向您
              <span class="red">进贡金币</span>，让您的
              <span class="red">金币暴涨</span>，收徒越多您的收入就越高，收徒无上限
            </div>
            <!-- <div class="txt2 clear">
              <div class="left content">
                活动期间，每收一个有效徒弟奖励
                <span class="red">3640金币</span>
                <br> 活动时间：2018年1月5日至2018年3月5日
              </div>
              <div class="left btn">
                <button class="btnrole" @click="togglerole">查看规则</button>
              </div>
            </div> -->
            <div class="txt2 clear">
              <div class="left content">
                活动期间，每收一个有效徒弟额外奖励
                <span class="red">【18200金币】</span>
                <br> 活动时间：2018年3月1日至2018年4月18日
              </div>
              <div class="left btn">
                <button class="btnrole" @click="togglerole">查看规则</button>
              </div>
            </div>
          </div>
          <!-- <div class="pop" v-show="showrole" @touchmove.prevent>
            <div class="rolebg ">
              <i class="close iconfont" @click="togglerole">&#xe685;</i>
              <div class="tt"></div>
              <div class="txt1">
                每收1位徒弟奖励
                <span class="red">【3640金币】</span>，分6次发放，徒弟进贡60金币时，即可奖励一次金币，每位徒弟每天限1次。
              </div>
              <div class="tt2">
                六次奖励发放如下
              </div>
              <div class="txt2 clear">
                <div class="ico"></div>
                <div class="content">
                  <p>第一次奖励
                    <span class="red">【1000金币】</span>
                  </p>
                  <p>第二次奖励
                    <span class="red">【688金币】</span>
                  </p>
                  <p>第三次奖励
                    <span class="red">【388金币】</span>
                  </p>
                  <p>第四次奖励
                    <span class="red">【388金币】</span>
                  </p>
                  <p>第五次奖励
                    <span class="red">【588金币】</span>
                  </p>
                  <p>第六次奖励
                    <span class="red">【588金币】</span>
                  </p>
                </div>
              </div>
            </div>
          </div> -->
          <div class="lanternFestival" v-show="showrole" @touchmove.prevent>
            <div class="rolebg ">
              <i class="close iconfont" @click="togglerole">&#xe685;</i>
              <div class="tt"></div>
              <div class="txt1">
                每收1位徒弟奖励
                <span class="red">【18200金币】</span>，分六次发放，徒弟进贡300金币时，即可奖励一次金币，每位徒弟每天限1次。
              </div>
              <div class="tt2">
                六次奖励发放如下
              </div>
              <div class="txt2 clear">
                <div class="ico"></div>
                <div class="content">
                  <p>第一次奖励
                    <span class="red">【5000金币】</span>
                  </p>
                  <p>第二次奖励
                    <span class="red">【3440金币】</span>
                  </p>
                  <p>第三次奖励
                    <span class="red">【1940金币】</span>
                  </p>
                  <p>第四次奖励
                    <span class="red">【1940金币】</span>
                  </p>
                  <p>第五次奖励
                    <span class="red">【2940金币】</span>
                  </p>
                  <p>第六次奖励
                    <span class="red">【2940金币】</span>
                  </p>
                </div>
              </div>
              <div class="tt2">
                注意事项
              </div>
              <div class="txt1">
                活动时间：3月1日 - 4月18日，不在活动期间内收取的徒弟仅能获得常规金币奖励，无法获得额外随机红包奖励；
              </div>
            </div>
          </div>
        </template>
        <template v-if="tab==2" class="tudi">
          <div class="tip">
            每唤醒1位徒弟您得
            <span class="red">5000金币</span>,徒弟获
            <span class="red">1500金币</span>
          </div>
          <div class="mid">
            <ul class="tab clear">
              <li class="left " :class="{active:tab_wake==1}" @click="togglewake(1)">徒弟进贡榜</li>
              <li class="left " :class="{active:tab_wake==2}" @click="togglewake(2)">待唤醒徒弟 ({{wakecnt}})</li>
            </ul>
            <div class="tabbd" v-show="tab_wake==1">
              <ul class="jingong_th">
                <li class="table th">
                  <span class="table-cell position">前50</span>
                  <span class="table-cell nick">昵称</span>
                  <span class="table-cell id">用户ID</span>
                  <span class="table-cell coin">贡献金币</span>
                </li>
              </ul>
              <div class="jingong_tb" style="overflow: scroll;">
                <ul>
                  <li class="table " v-for="(item,$index) in jingongs" :key="$index">
                    <span class="table-cell position " :class="{one:$index==0,two:$index==1,three:$index==2}" v-text="$index >2?$index+1:''"></span>
                    <span class="table-cell nick">{{item.nickname?item.nickname:item.username}}</span>
                    <span class="table-cell id">{{item.invited}}</span>
                    <span class="table-cell coin">{{item.coin?item.coin:0}}</span>
                  </li>
                </ul>
                <div class="table notudi" v-show="jingongs.length ==0">
                  <div class="table-cell">你还没有徒弟，赶快去收徒吧，每收一个徒弟可获得18200金币奖励。
                    <br/>
                    <br/>
                    <span class="pink" @click="shoutu">立即去收徒 >></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="tabbd" v-show="tab_wake==2">
              <ul class="jiaoxing_th">
                <li class="table th">
                  <span class="table-cell nick">昵称</span>
                  <span class="table-cell phone">手机号</span>
                  <span class="table-cell blank">操作</span>
                </li>
              </ul>
              <div class="jiaoxing_tb" style="overflow: scroll;">
                <nv-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                  <ul v-show="wakes.length > 0">
                    <li class="table " v-for="(item,$index) in wakes" :key="$index">
                      <span class="table-cell nick">{{item.nickname}}</span>
                      <span class="table-cell phone ">{{item.username}}</span>
                      <span class="table-cell ">
                        <button :class="{wake:item.wake}" @click="huanx(item)" v-text="item.wake?'查看':'唤醒'"></button>
                      </span>
                    </li>
                  </ul>
                </nv-loadmore>
                <div class="table notudi" v-show="wakes.length ==0">
                  <div class="table-cell">暂时没有需要唤醒的徒弟，赶快去收徒，每收一个徒弟可获得18200金币奖励。
                    <br/>
                    <br/>
                    <span class="pink" @click="shoutu">立即去收徒 >></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="shuom_tip" @click="toggleshuom">
            </div>
            <div class="shuom" v-show="showshuom" @touchmove.prevent>
              <div class="shuombg ">
                <i class="close iconfont" @click="toggleshuom">&#xe685;</i>
                <div class="tt">
                  成功唤醒后师傅得
                  <span class="red">5000</span>金币，徒弟得
                  <span class="red">1500</span>金币，唤醒徒弟越多，奖励越多
                </div>
                <div class="txt">
                  什么是成功唤醒？
                  <br> · 师傅需要点击“唤醒TA”按钮，并通过QQ或微信发送链接给徒弟
                  <br> · 徒弟需点击师傅得链接并登陆超级头条
                  <br> · 徒弟需有效阅读3篇文章
                  <br> · 师傅点击“点击TA”按钮后，分享的链接3天内有效
                  <br> · 若徒弟还未回来，3天后需要重新唤醒哦！
                </div>
                <div class="btn">
                  <button @click="toggleshuom">立即参与</button>
                </div>
              </div>
            </div>
            <div class="huanx" v-show="showhuanx">
              <div class="huanxbg">
                <i class="close iconfont" @click="closehuanx">&#xe685;</i>
                <div class="tt">唤醒徒弟</div>
                <div class="subtt">
                  马上发消息唤醒Ta
                </div>
                <div class="txt">
                  <textarea v-model="waketxt" maxlength="200">
                  </textarea>
                </div>
                <div class="subtt2">
                  点击下面的按钮分享给
                </div>
                <ul class="btns clear">
                  <li class="left">
                    <button @click="wxwake">
                      <i class="weixin"></i> 微信好友
                    </button>
                  </li>
                  <li class="left">
                    <button @click="qqwake">
                      <i class="qq"></i> QQ好友
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import nvLoadmore from "@/components/loadmore.vue";
import ajax from "@/config/ajax";
import appcall from "@/config/appcall";

export default {
  name: "invitepupil",
  data() {
    return {
      loading: false,
      tab: 1,
      tab_wake: 1,
      friends: [],
      jingongs: [],
      tribute: 0,
      wakes: [],
      wakecnt: 0,
      showrole: false,
      showshuom: false,
      showhuanx: false,
      waketxt: "超级头条又有大活动了，赚的爽，提现快，点击领取300金币",
      waketxtlist: [
        "超级头条又有大活动了，赚的爽，提现快，点击领取300金币",
        "超级头条新活动开始了，赚钱爽，点击领取300金币",
        "超级头条发钱了，点击领取300金币",
        "几天不见想你了！点击领取300金币",
        "赶快来领300金币，超级头条活动大放送，现金免费领",
        "现金免费领，你还不回来，点击领取300金币",
        "现金免费送了，再不来没有了，点击领取300金币",
        "现金限时送，先来先得，点击领取300金币",
        "你今天还有10元没有提现，点击领取"
      ],
      sharetxt:
        "免费送钱啦！看新闻能赚零花！随便攒攒就可以马上提现了~还等什么，感兴趣的朋友，可以扫／码一起来玩",
      sharetxtlist: [
        "在这看资讯给[愉快]钱，真是棒[强]极了！根本放不[飞吻]下，过段时间就能提[色]现。我做得到，相信你[强]也可以的！赶紧一起来[色]扫／码玩吧",
        "我[跳跳]自己试过了，真的可以赚[色]钱！大家来试试，在这里看新闻就有钱，[强]真的讲信用！完全免费扫[调皮]码参与的，[憨笑]就放心随便看吧",
        "可以天天赚[坏笑]零花的好福利，你要不要[傲慢]在这里免费看喜欢的新闻就能赚[悠闲]零花，看得多赚的更多~还能提[色]现，赶紧抓住机会试试[笑]",
        "[咖啡]空闲时间别浪费，快来[阴险]这里看资讯吧，边看还能边赚[愉快]零花，相信[奋斗]我就对了！快来扫[呲牙]-码一起玩，免费无风险[啤酒]放心",
        "真是又可靠的好[色]福利，看资讯给零[强]花，还能培养[跳跳]自己好的阅读习惯。每天[奋斗]都会更新，来扫[愉快]码试试看吧,[憨笑]包你满意",
        "这个免[色]费赚[奋斗]零花的机会要把握，[憨笑]看看新闻就可以，更可以微信提[西瓜]现！绝对[啤酒]靠谱！介绍大家扫[坏笑]码试试，[强]绝对好用",
        "看新闻看[奋斗]的停不下来，就每天来看看喜欢[色]的资讯，就有零花钱入[调皮]账扫[抠鼻]码加入很简单，看了可不白[得意]看哦～真的能够提[胜利]现！",
        "这里免费[愉快]看新闻真的能赚-[月亮]钱！既能涨知识，又能赚-[拳头]钱，分分钟有收[拥抱]益！识别我的截图，提-[鼓掌]现可以到账哦！",
        "身边的[爱心]朋友都在玩，扫-码免[啤酒]费看文章送零花，让你提升知识面学到更多[嘿哈]知识呢。新闻看的越多零用钱[礼物]赚的就越快～",
        "走过路过[啤酒]来看新闻啦！看新闻就能赚零[跳跳]花~完全免[强]费加入的，只在这里有这福[耶]利，信息时代要跟上步伐啊",
        "天天来看[得意]新闻，免费看还能赚[爱心]零花，这可是真钱[飞吻]哦～你可以兑换礼品，也可以提现。是不是很[嘿哈]诱人？！赶快扫[蛋糕]／码吧",
        "这里我很喜欢！免费看新闻[玫瑰]还给钱，真是天大的好事。我提现已经[礼物]到账了，真棒！一样看新闻，扫／码在这看吧～还能赚-[飞吻]钱！",
        "身边的[得意]朋友都在玩，扫-码免[呲牙]费看新闻送零花，让你提升[跳跳]知识面学到更[强]多知识呢。新闻看的越多零用钱[拥抱]赚的就越快～",
        "这里看[可怜]新闻不吃亏不上当！内容丰富，覆盖[耶]面广，看了还能得奖励！我已经扫-码[月亮]在看了，让你更有阅读[礼物]的动力，还挺有意思的",
        "每天新闻看几篇，金[啤酒]币自动进钱包。会自动换[愉快]钱，真钱哦～还可以微信提现。[爱心]是不是心动啦？！赶快动动手指扫／[嘿哈]码吧",
        "看新闻得奖[呲牙]励，别的地方可没这种福[拳头]利！所以最近喜欢看新闻，原因就是这个。推荐大家扫[强]-码试试，非常好玩",
        "每天新闻看几篇，金币自动进钱[玫瑰]包。会自动换[拥抱]钱，真钱哦～还可以微信提[耶]现。是不是心动啦？！赶快动动手指扫[月亮]／码吧",
        "发现了一个好福[嘿哈]利，免费看新闻，而且看了还有惊喜！完全免[蛋糕]费的，扫／[跳跳]码就能加入。收益达到要求，可以提[拳头]现都哦！",
        "约对福[拥抱]利～白看新闻还给钱！信息时代来钱[月亮]快，太给力了。看看文章就可以了，收[礼物]益不断积累你可兑换商品。扫[愉快]码试试吧",
        "最近特别喜欢看新闻，看了能赚[拥抱]金币，金币还能换成[月亮]钱！推荐给大家扫／[啤酒]码试试，我用到现在了，没毛病！",
        "随便看看这个，就能赚[悠闲]到钱！一样要看新闻，还不如试试这个。新闻照样看，还能赚点零[玫瑰]花钱，多好的事还不快扫[可怜]-码试试",
        "扫•[月亮]码看新闻资讯，大家可以来这。内容丰富，覆盖面广，看了还能得奖[礼物]金！我每天都看，让你更有阅[愉快]读的动力，还挺有意思的",
        "在这看[得意]资讯不简单，看完有惊喜！看了就停不下来，我一有[鼓掌]空就会看。随便看看文章就有钱[跳跳]，还不赶快扫／[玫瑰]码试试",
        "闲暇时看看[拥抱]文章就能赚零花，反正我选这个，感觉在这看最划[可怜]算！别的平台没这样的福[月亮]利哦，不知不觉就有收[嘿哈]益~",
        "时间就是金[飞吻]钱！一个真正可以看新闻就能赚[玫瑰]钱的平台，抓住机会试试[拳头]！",
        "大家有空的时候看看[呲牙]新闻吧~这里看文章不花[跳跳]钱还会给你[悠闲]钱！只要认真阅读就发福[拥抱]利，识别二[礼物]维码，快快行动吧",
        "真的免费送福[愉快]利～看了资讯还送[爱心]钱。玩法也简单，就看看文章。完全免费扫-[嘿哈]码的，就放心看吧！保持平常心，收[啤酒]益会满满增长",
        "这个真心不错，免[愉快]费看资讯还赚[月亮]零花，让你轻松爱上阅读！免费有[爱心]诚信，资讯内容高端、上档次，赶紧扫-[蛋糕]码试试",
        "看新闻资讯也能赚[啤酒]钱，这个绝对靠谱！识别我发的二[玫瑰]维码，已经提现了哦！完全免[可怜]费的，没有任何风险，真的会给[啤酒]钱哦～",
        "看新闻，涨知识，扫•[呲牙]码免费看真划算，重要的是可以赚-[拳头]钱！是不是很诱人？！我已经赚[礼物]到钱了，你们也来试试，真[飞吻]棒！",
        "赚钱的套路有很多，[玫瑰]看资讯能赚钱，[转圈]我还是刚知道！免费看资讯，[害羞]增长了见识，还可以给钱！[色]扫码加入吧，真是天大的便宜啊！[愉快]",
        "推荐[嘴唇]你一个免费看新闻的[爱心]，扫-码[鼓掌]看资讯还给钱，海量资讯等你来，肯定有你喜欢的！[握手]赶紧抓住机会试试，可别错过了",
        "找了好久[抱拳]的资讯平台，这个[强]看资讯送金币！[胜利]"
      ],
      wakeid: 0,
      wakepage: 0,
      allLoaded: false,
      banner: {},
      invitecode: "",
      iospedding: false
    };
  },
  components: {
    nvHead,
    nvLoading,
    nvLoadmore
  },
  async created() {
    // ios 提审状态
    this.iospedding = await appcall.getReviewStatus();
  },
  mounted() {
    if (this.$route.query.wake) {
      this.tab = 2;
      this.tab_wake = 2;
    }
    this.getInvitecode();
    this.getApprenticeCount();
    this.getBanner();
    this.markUnreadmsg();
  },
  methods: {
    /**
     * 获取邀请码
     */
    async getInvitecode() {
      // 低版本兼容
      let appdata = await appcall.getAppData();
      if (
        (appdata.platform_code == "ios_h5" && appdata.version_code < 5) ||
        (appdata.platform_code == "android_h5" && appdata.version_code < 7)
      ) {
        let params = {};
        let comm = await appcall.getRequestData(params);

        let rs = await ajax(
          "post",
          this.$apiurl + "/user/get_register_invite_code",
          comm,
          params
        );
        if (rs && rs.code === 1001 && rs.data) {
          this.invitecode = rs.data.register_invite_code;
        } else {
          this.$alert(rs.msg);
        }
      } else {
        let rs = await appcall.getUserInfo();
        this.invitecode = rs.invitecode;
      }
    },
    /**
     * 获取徒弟数量
     */
    async getApprenticeCount() {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/apprentice/get_apprentice_num",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.loading = false;
        this.tribute = rs.data.num;
      } else if ((rs && rs.code === 1007) || rs.code === 1008) {
        this.loading = false;
        this.tribute = 0;
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 微信好友邀请
     */
    async wxshare() {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/tasks/get_rand_domain_invite",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        let url = rs.data;
        let params = {
          type: 1,
          title: "我刚加入了超级头条，还不错，邀请你加入",
          url: rs.data + "/register?uid=" + comm.uid,
          desc: "看资讯还能赚零花钱~ 绝对靠谱，抓住机会了，来试试",
          images: ""
        };
        appcall.invite(params);
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * qq好友邀请
     */
    async qqshare() {
      let params = {
        task_keys: "qqyq",
        template_type: 1,
        share_where: 3
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/tasks/get_task_share_timeline",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        let images = rs.data.image.join(";");
        let params = {
          type: 5,
          title: "",
          url: "",
          desc: "",
          images: images
        };
        appcall.invite(params);
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 微信朋友圈邀请
     */
    async pyqshare() {
      this.randomSharetxt();
      let params = {
        share_where: 1
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/tasks/get_task_share_timeline",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        let images = rs.data.image.join(";");
        let params = {
          type: 2,
          title: "",
          url: "",
          desc: this.sharetxt,
          images: images
        };
        appcall.invite(params);
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 面对面邀请
     */
    mdmshare() {
      this.$router.push("invitepupilNearby");
    },
    adJump() {
      switch (this.banner.kind) {
        case 1:
        case 2:
          appcall.navigator({
            title: this.banner.activity_name,
            url: this.banner.jump_url
          });
          break;
        case 3:
          appcall.articles({ sc_catid: this.banner.sc_catid });
          break;
        case 4:
          appcall.videos({ sc_catid: this.banner.sc_catid });
          break;
      }
    },
    /*
     * 标记未读消息
     */
    async markUnreadmsg() {
      let params = {
        msg_module: "un_yqhy_num"
      };
      let comm = await appcall.getRequestData(params);

      let rs = ajax(
        "post",
        this.$apiurl + "/sms/mark_unread_msg",
        comm,
        params
      );
    },
    /**
     * 去晒分享
     */
    goshai() {
      //appcall.gotoshai()
      appcall.navigator({
        title: "晒收入",
        url: this.$h5url + "shai"
      });
    },
    /**
     * 去任务中心
     */
    gotask() {
      this.tab = 2;
      this.tab_wake = 2;
    },
    /*
     * 去88888活动
     */
    toactivity() {
      appcall.navigator({
        title: "新年小目标",
        url: this.$h5url + "sendcrash"
      });
    },
    /**
     * 展示/隐藏规则
     */
    togglerole() {
      this.showrole = !this.showrole;
    },
    /**
     * 切换大tab
     */
    toggletab(index) {
      this.tab = index;
    },
    /**
     * “去收徒”
     */
    shoutu() {
      this.tab = 1;
    },
    /**
     * 切换小tab
     */
    togglewake(index) {
      this.tab_wake = index;
    },
    /**
     * 显示/隐藏 说明
     */
    toggleshuom() {
      this.showshuom = !this.showshuom;
    },
    /**
     * 唤醒 操作
     */
    huanx(item) {
      this.randomWaketxt();
      item.wake = true;
      this.showhuanx = true;
      this.wakeid = item.invited;
    },
    /**
     * 关闭唤醒
     */
    closehuanx() {
      this.showhuanx = false;
    },
    /**
     * 拉到底
     */
    loadBottom() {
      if (this.allLoaded) return;
      setTimeout(() => {
        this.wakepage++;
        this.getHuanxings();
        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
    },
    /**
     * 获取顶部banner
     */
    async getBanner() {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/activity/get_activity_yqhy",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.banner =
          rs.data.list && rs.data.list.length > 0 ? rs.data.list[0] : [];
      }
    },
    /**
     * 获取进贡徒弟列表
     */
    async getJinggongs() {
      let params = {};
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/tasks/get_apprentice_contr",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.jingongs = rs.data.list;
        //this.tribute = rs.data.total;
      } else if (rs && rs.code === 1008) {
        this.jingongs = [];
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 获取待唤醒徒弟列表
     */
    async getHuanxings() {
      let params = {
        page: this.wakepage,
        size: 10
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/tasks/wake_up_apprentice",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.wakecnt = rs.data.total;
        if (rs.data.list.length == 0) {
          this.allLoaded = true;
          if (this.wakepage > 0) {
            this.$toast("没有更多了");
          }
        } else {
          this.wakes = this.wakes.concat(rs.data.list);
        }
      } else {
        this.allLoaded = true;
        this.$alert(rs.msg);
      }
    },
    /**
     * 微信唤醒
     */
    async wxwake() {
      let params = {
        appr_id: this.wakeid,
        share_where: 2
      };
      let comm = await appcall.getRequestData(params);

      let rs = await ajax(
        "post",
        this.$apiurl + "/tasks/get_wake_up_content",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        let param = {
          type: 6,
          title: "",
          url: "",
          desc: "",
          images: ""
        };
        if (JKEventHandler.browser().ios) {
          param.title = this.waketxt;
          param.url = rs.data;
        } else {
          param.title = this.waketxt + " " + rs.data;
        }
        appcall.invite(param);
        this.showhuanx = false;
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * QQ唤醒
     */
    async qqwake(item) {
      let params = {
        appr_id: this.wakeid,
        share_where: 3
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/tasks/get_wake_up_content",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        let param = {
          type: 7,
          title: "",
          url: "",
          desc: "",
          images: ""
        };
        if (JKEventHandler.browser().ios) {
          param.title = this.waketxt;
          param.url = rs.data;
        } else {
          param.title = this.waketxt + " " + rs.data;
        }
        appcall.invite(param);
        this.showhuanx = false;
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * waketxt随机
     */
    randomWaketxt() {
      this.waketxt = this.waketxtlist[
        Math.floor(Math.random() * (this.waketxtlist.length - 1))
      ];
    },
    /**
     * sharetxt随机
     */
    randomSharetxt() {
      this.sharetxt = this.sharetxtlist[
        Math.floor(Math.random() * (this.sharetxtlist.length - 1))
      ];
    }
  },
  watch: {
    tab: function(newVal, oldVal) {
      if (newVal == 2) {
        if (this.jingongs.length == 0) {
          this.getJinggongs();
        }
        if (this.wakes.length == 0) {
          this.getHuanxings();
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../style/colors";
.red {
  color: @mcolor;
}

.pink {
  color: #fe6666;
}

.invitepupil {
  height: 100vh;
  .top {
    background: #fff;
  }
  .top ul li {
    width: 50%;
    height: 1rem;
    line-height: 1rem;
    display: block;
    text-align: center;
    font-size: 0.36rem;
    position: relative;
    &.active {
      color: @mcolor;
    }
    &.active:after {
      content: " ";
      background-color: @mcolor;
      width: 0.7rem;
      height: 0.04rem;
      margin: 0 auto;
      display: block;
    }
    i {
      padding: 0 0.08rem 0 0.08rem;
      height: 0.38rem;
      font-size: 0.24rem;
      line-height: 0.38rem;
      position: absolute;
      top: 0.04rem;
      left: 2.6rem;
      background: #fe6665;
      color: #fff;
      border-radius: 0.07rem;
    }
  }
  .ad {
    img {
      vertical-align: middle;
    }
  }
  /*邀请收徒 tab*/
  .share {
    padding: 0.3rem 0.4rem 0.4rem;
    background: #fff;
    .tp {
      position: relative;
      margin-bottom: 0.5rem;
      .middle {
        width: 5.4rem;
        height: 0.68rem;
        font-size: 0.28rem;
        line-height: 0.34rem;
        margin: 0 auto;
        background: #fff;
        color: #333;
        text-align: center;
        position: relative;
      }
      &:before {
        content: "";
        width: 100%;
        height: 1px;
        background: #e6e6e6;
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
      }
    }
    .md {
      .share_item {
        width: 33.333333%;
        text-align: center;
        font-size: 0.28rem;
        color: #333;
        div.img {
          width: 1.4rem;
          height: 1.4rem;
          border: 1px solid #f2f2f2;
          border-radius: 100%;
          margin: 0 auto 0.1rem;
        }
        img {
          width: 0.65rem;
          margin: 0.35rem auto;
        }
        &.mdm {
          margin: 0.35rem 33.3% auto;
        }
      }
    }
    .inviteCode {
      margin: 0.28rem auto 0;
      display: block;
      font-size: 0.28rem;
      text-align: center;
      button {
        height: 0.76rem;
        color: #6aa0f6;
        background: #fff;
        border: 1px solid #6aa0f6;
        border-radius: 0.76rem;
        padding: 0 0.5rem 0 0.5rem;
      }
    }
  }
  ul.tasks {
    background: #f3f3f3;
    height: 1.3rem;
    li {
      font-size: 0.28rem;
      background: #fff;
      width: 3.15rem;
      height: 0.8rem;
      line-height: 0.8rem;
      display: inline-block;
      margin: 0.25rem 0 0 0.4rem;
      border-radius: 0.4rem;
      position: relative;
      .iconfont {
        position: absolute;
        top: 0;
        left: 0.5rem;
        height: 0.6rem;
        width: 0.6rem;
        font-size: 0.65rem;
        color: #7cb6fa;
      }
      span {
        position: absolute;
        left: 1.3rem;
      }
    }
  }
  .desc {
    background: #fff;
    .tp {
      height: 1.35rem;
      .imgs {
        width: 3.75rem;
        height: 0.6rem;
        margin: auto;
        position: relative;
        top: 0.4rem;
        img.ico {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0.78rem;
          height: 0.58rem;
        }
        img.haochu {
          position: absolute;
          bottom: 0;
          left: 0.85rem;
          width: 2.74rem;
          height: 0.51rem;
        }
      }
    }
    .txt1 {
      font-size: 0.28rem;
      line-height: 0.48rem;
      margin: 0 0.75rem 0 0.75rem;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid #cecece;
    }
    .txt2 {
      font-size: 0.28rem;
      line-height: 0.48rem;
      margin: 0.2rem 0.75rem 0.2rem 0.75rem;
      .content {
        width: 3.85rem;
      }
      .btn {
        position: relative;
        button {
          position: absolute;
          color: #9f6513;
          width: 1.74rem;
          height: 0.65rem;
          background: url(../../images/td_role.png) no-repeat center center;
          background-size: 100%;
          text-align: center;
          left: 0.2rem;
          top: 0.2rem;
        }
      }
    }
  }
  .pop {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .rolebg {
      position: absolute;
      background-color: #fff;
      display: block;
      width: 5.8rem;
      height: 6.4rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -3.2rem auto;
      border-radius: 0.2rem;
      padding: 0.7rem 0.25rem 0;
      .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 0.7rem;
        height: 0.7rem;
        font-size: 0.35rem;
        text-align: center;
        line-height: 0.7rem;
        color: #999;
      }
      .tt {
        width: 3.34rem;
        height: 0.51rem;
        margin: 0 auto;
        background: url(../../images/pop_td_tt.png) no-repeat center center;
        background-size: 100%;
      }
      .txt1 {
        margin: 0.2rem auto;
        font-size: 0.26rem;
        line-height: 0.36rem;
      }
      .tt2 {
        width: 3.86rem;
        height: 0.5rem;
        margin: 0 auto;
        background: url(../../images/pop_td_jiangli.png) no-repeat center center;
        background-size: 100%;
        color: #fff;
        text-align: center;
        line-height: 0.5rem;
        font-size: 0.32rem;
      }
    }
  }
  .lanternFestival {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .rolebg {
      position: absolute;
      background-color: #fff;
      display: block;
      width: 5.8rem;
      height: 8.4rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -4.2rem auto;
      border-radius: 0.2rem;
      padding: 0.7rem 0.25rem 0;
      .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 0.7rem;
        height: 0.7rem;
        font-size: 0.35rem;
        text-align: center;
        line-height: 0.7rem;
        color: #999;
      }
      .tt {
        width: 3.34rem;
        height: 0.51rem;
        margin: 0 auto;
        background: url(../../images/pop_td_tt.png) no-repeat center center;
        background-size: 100%;
      }
      .txt1 {
        margin: 0.2rem auto;
        font-size: 0.26rem;
        line-height: 0.36rem;
      }
      .tt2 {
        width: 3.86rem;
        height: 0.5rem;
        margin: 0 auto;
        background: url(../../images/pop_td_jiangli.png) no-repeat center center;
        background-size: 100%;
        color: #fff;
        text-align: center;
        line-height: 0.5rem;
        font-size: 0.32rem;
      }
      .txt2 {
        .ico {
          width: 1.4rem;
          height: 2.2rem;
          background: url(../../images/pop_td_yuanxiao.png) no-repeat center
            center;
          background-size: 100%;
          margin: 0.4rem 0.3rem 0 0.3rem;
          float: left;
        }
        .content {
          font-size: 0.26rem;
          line-height: 0.45rem;
          float: left;
          margin: 0.2rem auto;
        }
      }
    }
  }
  /*我的徒弟tab*/
  .tip {
    height: 0.6rem;
    line-height: 0.63rem;
    font-size: 0.24rem;
    margin: 0.28rem 0.35rem 0.7rem 0.35rem;
    background: #f3f3f3;
    text-align: center;
    border-radius: 0.15rem;
  }
  .mid {
    margin: 0 0.35rem;
    ul.tab li {
      width: 50%;
      height: 0.9rem;
      line-height: 0.9rem;
      font-size: 0.3rem;
      text-align: center;
      color: #fe6665;
      border: 0.025rem solid #fe6665;
      border-top-left-radius: 0.45rem;
      border-top-right-radius: 0.45rem;
      &.active {
        background: #fe6665;
        color: #fff;
      }
    }
    .jingong_th {
      width: 100%;
      border: 0.025rem solid #fe6665;
      border-bottom: none;
      background: #f3f3f3;
      li.th {
        font-size: 0.32rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        background: #f3f3f3;
        .position {
          color: #999;
          width: 1.1rem;
        }
        .nick {
          color: #999;
          width: 1.95rem;
        }
        .id {
          color: #999;
          width: 1.95rem;
        }
        .coin {
          color: #999;
          width: 1.75rem;
        }
      }
    }
    .jingong_tb {
      border: 0.025rem solid #fe6665;
      border-top: none;
      height: 5.1rem;
      li.table {
        display: table;
        font-size: 0.34rem;
        height: 0.8rem;
        text-align: center;
        color: #333;
        .table-cell {
          display: table-cell;
          vertical-align: middle;
        }
        .position {
          width: 1.1rem;
          height: 0.8rem;
          &.one {
            color: #fff;
            font-size: 0.25rem;
            background: url(../../images/td_one.png) no-repeat center center;
            background-size: 0.4rem 0.44rem;
            vertical-align: top;
          }
          &.two {
            color: #fff;
            font-size: 0.25rem;
            background: url(../../images/td_two.png) no-repeat center center;
            background-size: 0.4rem 0.44rem;
            vertical-align: top;
          }
          &.three {
            color: #fff;
            font-size: 0.25rem;
            background: url(../../images/td_three.png) no-repeat center center;
            background-size: 0.4rem 0.44rem;
            vertical-align: top;
          }
        }
        .nick {
          width: 1.95rem;
          height: 0.8rem;
          font-size: 0.31rem;
        }
        .id {
          width: 1.95rem;
        }
        .coin {
          width: 1.75rem;
        }
      }
    }
    .jiaoxing_th {
      width: 100%;
      border: 0.025rem solid #fe6665;
      border-bottom: none;
      background: #f3f3f3;
      li.th {
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.32rem;
        text-align: center;
        background: #f3f3f3;
        .nick {
          color: #999;
          width: 2.75rem;
        }
        .phone {
          color: #999;
          width: 2.25rem;
        }
        .blank {
          color: #999;
          text-indent: -9999px;
        }
      }
    }
    .jiaoxing_tb {
      width: 100%;
      border: 0.025rem solid #fe6665;
      border-top: none;
      height: 5.1rem;
      ul {
        min-height: 4.8rem;
        overflow-y: scroll;
      }
      li.table {
        font-size: 0.34rem;
        text-align: center;
        color: #333;
        height: 0.8rem;
        display: table;
        .table-cell {
          display: table-cell;
          vertical-align: middle;
        }
        .nick {
          width: 2.75rem;
        }
        .phone {
          width: 2.25rem;
        }
        button {
          width: 1.5rem;
          height: 0.65rem;
          border-radius: 0.32rem;
          border: 0.02rem solid #fe6666;
          background: #fe6666;
          color: #fff;
          &.wake {
            color: #fe6666;
            background: #fff;
          }
        }
      }
    }
    .notudi {
      font-size: 0.3rem;
      color: #666;
      height: 100%;
      padding: 1rem 0.5rem;
    }
  }
  .shuom_tip {
    position: fixed;
    left: 0;
    top: 3.7rem;
    color: #fff;
    width: 0.66rem;
    height: 2.28rem;
    text-align: center;
    background: url(../../images/wake_sm.png) no-repeat center center;
    background-size: 100%;
  }
  .shuom {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .shuombg {
      position: relative;
      background-color: #fff;
      display: block;
      width: 6.8rem;
      height: 9.38rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -4.69rem auto;
      border-radius: 0.3rem;
      padding: 1.45rem 0.35rem 0;
      &:before {
        content: "";
        display: block;
        position: absolute;
        height: 0.93rem;
        width: 100%;
        background: url("../../images/wake_sm_tp.png") no-repeat center center;
        background-size: auto 100%;
        top: -0.25rem;
        left: 0;
      }
      .close {
        font-size: 0.45rem;
        position: absolute;
        right: 0.35rem;
        top: 0.35rem;
        color: #999;
      }
      .tt {
        font-size: 0.42rem;
      }
      .txt {
        color: #999;
        font-size: 0.28rem;
        line-height: 0.45rem;
        padding: 0.35rem 0.22rem;
        background: #f7f7f7;
        margin-top: 0.3rem;
      }
      .btn {
        margin: 0.25rem;
        button {
          width: 5.6rem;
          height: 0.9rem;
          background: #fe6665;
          border-radius: 0.45rem;
          margin: auto;
          color: #fff;
          font-size: 0.36rem;
        }
      }
    }
  }
  .huanx {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .huanxbg {
      position: relative;
      background-color: #fff;
      display: block;
      width: 6.8rem;
      height: 7.25rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -3.625rem auto;
      border-radius: 0.3rem;
      padding: 0.75rem 0.35rem 0;
      .close {
        font-size: 0.45rem;
        position: absolute;
        right: 0.35rem;
        top: 0.35rem;
        color: #999;
      }
      .tt {
        font-size: 0.44rem;
        font-weight: bold;
        text-align: center;
      }
      .subtt {
        font-size: 0.3rem;
        color: #777;
        text-align: center;
        margin: 0.25rem auto;
      }
      .txt {
        width: 5.6rem;
        height: 2.35rem;
        margin: 0 auto;
        textarea {
          width: 100%;
          height: 100%;
          text-align: left;
          border: 1px solid #aeaeae;
          border-radius: 0.1rem;
          padding: 0.3rem;
          font-size: 0.34rem;

          -webkit-touch-callout: auto;
          -webkit-user-select: auto;
          -khtml-user-select: auto;
          -moz-user-select: auto;
          -ms-user-select: auto;
          user-select: auto;
        }
      }
      .subtt2 {
        font-size: 0.28rem;
        color: #ccc;
        text-align: center;
        margin: 0.25rem auto;
      }
      ul.btns {
        margin-top: 0.35rem;
        li {
          width: 50%;
          text-align: center;
          button {
            width: 2.7rem;
            height: 0.9rem;
            margin: 0 auto;
            font-size: 0.3rem;
            border-radius: 0.45rem;
            position: relative;
            text-indent: 0.5rem;
            background: #fff;
            border: 1px solid #ccc;
            i.weixin {
              width: 0.55rem;
              height: 0.55rem;
              background: url(../../images/wx.png) no-repeat center center;
              background-size: 100%;
              display: block;
              position: absolute;
              top: 0.15rem;
              left: 0.35rem;
            }
            i.qq {
              width: 0.55rem;
              height: 0.55rem;
              background: url(../../images/qq.png) no-repeat center center;
              background-size: 100%;
              display: block;
              position: absolute;
              top: 0.15rem;
              left: 0.35rem;
            }
          }
        }
      }
    }
  }
}

.bigger {
  animation: bigger 0.3s;
}

@keyframes bigger {
  from {
    transform: scale(0.75);
  }
  to {
    transform: scale(1);
  }
}

::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>
