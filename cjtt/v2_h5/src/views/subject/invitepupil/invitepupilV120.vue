<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="邀请收徒">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="invitepupil" v-show="!loading">
      <header>
        <div class="maskLayer"></div>
        <nv-marquee :duration="800" :interval="2000" :play="marqueePlay" class="flushCroll" ref="flushCroll" :height="0.6">
          <li v-for="(item,$index) in scrollbarData" :key="$index">
            {{item.userid}}邀请徒弟赚了{{item.product_name}}
          </li>
        </nv-marquee>
        <div class="right rightTips clear" @click="how('右上规则')">规则
        </div>
        <button class="topBtn" @click="togglebtns('立即收徒')" v-if="isLogin">立即收徒赚钱</button>
        <button class="topBtn" @click="goLogin('立即收徒')" v-if="!isLogin">立即收徒赚钱</button>
        <div class="viewCode" v-if="isLogin">
          <a @click="copy">收徒邀请码{{invitecode}}（点击使用）</a>
        </div>
        <div class="noRegister" v-if="!isLogin">登录查看邀请码</div>
      </header>
      <section>
        <div class="incomeData" v-if="wakes.length==0">
          <div class="goInvite">
            <div class="left">
              <div class="img">
                <img src="../../../assets/images/NewInvitepupil/redbg.png">
              </div>
              <div class="txt">
                <span class="first">首次收徒奖励</span>
                <span class="mes">成功收徒1名，获得额外1元奖励</span>
              </div>
            </div>
            <button class="right " @click="togglebtns('首次去收徒')">去收徒</button>
          </div>
        </div>
        <div id="hancr_001" class="baidu" v-if="thirdArr.length!=0">
        </div>
        <div class="tapStyle">
          <ul class="clear">
            <li class="left" :class="{active:tab==1}" @click="toggletab(1,'赚钱技巧')">赚钱技巧</li>
            <li class="right" :class="{active:tab==2,criclePosition:wakes.length!==0}" @click="toggletab(2,'徒弟列表')" v-show="isLogin">徒弟({{tribute}})</li>
            <li class="right" :class="{active:tab==2}" @click="toggletab(2,'徒弟列表')" v-show="!isLogin">徒弟(0)</li>
          </ul>
        </div>
        <template v-if="tab==1">
          <div class="taskCenter_swiper">
            <swiper :options="swiperOption" ref="mySwiper" v-if="eiaiUrl.length!=0 || urlList.length!=0">
                <!-- slides -->
                <swiper-slide v-for="(item,i) in eiaiUrl" :key="i+2" v-if="eiaiUrl.length!=0">
                  <a @click="eiaiJump(item)">
                    <img :src="item.image_url[0]">
                  </a>
                </swiper-slide>
                <swiper-slide v-for="(item,$index) in urlList" :key="$index" v-if="urlList.length!=0">
                  <a @click="adJump(item)">
                    <img :src="item.coverurl">
                  </a>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
          </div>
          <div class="tabContiner">
            <div class="makeMoney">
              <img src="../../../assets/images/NewInvitepupil/shoutu_v120.png">
              <div class="immediately">收徒越多，奖励越多</div>
            </div>
            <div class="rule">
              <div class="roker">
                <div class="list">
                  <div class="roker_a">
                    <img src="../../../assets/images/NewInvitepupil/f_one.png">
                  </div>
                  <div class="roker_b">首次收徒</div>
                  <div class="roker_c">首次收徒</div>
                  <div class="roker_d">额外奖励
                    <i>1元</i>
                  </div>
                </div>
                <div class="list">
                  <div class="roker_a">
                    <img src="../../../assets/images/NewInvitepupil/f_two.png">
                  </div>
                  <div class="roker_b">收徒奖励</div>
                  <div class="roker_c">每收1个徒弟</div>
                  <div class="roker_d">获得
                    <i>5元</i>奖励</div>
                </div>
                <div class="list">
                  <div class="roker_a">
                    <img src="../../../assets/images/NewInvitepupil/f_three.png">
                  </div>
                  <div class="roker_b">进贡奖励</div>
                  <div class="roker_c">徒弟看资讯</div>
                  <div class="roker_d">你获得奖励</div>
                </div>
              </div>
              <div class="ruleTips" @click="togglerole('详细规则')">
                查看详细规则
                <i></i>
              </div>
              <div class="demoCase" @click="bagtns('案例')">
                <b>[案例]</b>收徒如何月入过万
              </div>
            </div>
          </div>
          <div class="spacer"></div>
          <div class="tipsContiner">
            <div class="makeMoney">
              <img src="../../../assets/images/NewInvitepupil/shoututips_v120.png">
              <div class="immediately">收徒成功率提升200%</div>
            </div>
            <div class="rule">
              <div class="rule_bg">
                <div class="earnMoney">
                  <span class="text">邀请你的家人、朋友、同学或同事成功率最高，可获得
                    <i class="red">5元</i>现金奖励</span>
                </div>
              </div>
              <div class="rule_bg">
                <div class="earnMoney">
                  <span class="text">分享到3个以上微信/QQ群，成功率提升
                    <i class="red">200%</i>。
                  </span>
                </div>
              </div>
              <div class="rule_bg">
                <div class="earnMoney">
                  <span class="text">告诉你的朋友：注册可领
                    <i class="red">1元</i>现金，微信立即提现
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="spacer"></div>
          <div class="step">
            <div class="makeMoney">
              <img src="../../../assets/images/NewInvitepupil/steps_v120.png">
              <div class="immediately">看下面流程，非常简单</div>
            </div>
            <div class="rule">
              <div class="list">
                <div class="artImg">
                  <img class="art" src="../../../assets/images/NewInvitepupil/share_v120.png">
                </div>
                <div class="text">点击按钮
                  <br>分享给好友
                </div>
              </div>
              <div class="line">
                <img src="../../../assets/images/NewInvitepupil/line.png">
              </div>
              <div class="list">
                <div class="artImg">
                  <img class="art" src="../../../assets/images/NewInvitepupil/app_v120.png">
                </div>
                <div class="text">好友打开链接
                  <br>下载APP安装
                </div>
              </div>
              <div class="line">
                <img src="../../../assets/images/NewInvitepupil/line.png">
              </div>
              <div class="list">
                <div class="artImg">
                  <img class="artlast" src="../../../assets/images/NewInvitepupil/bag_v120.png">
                </div>
                <div class="text">好友登录阅读
                  <br>获得红包
                </div>
              </div>
            </div>
            <div class="tips">
              特殊说明：新徒弟需在新设备上注册（之前未登录过超级头条账号的手机）+阅读获得150金币，才可获得奖励。
            </div>
          </div>
          <div class="bigspacer"></div>
        </template>
        <template v-if="tab==2">
          <div class="template2">
            <div class="manlist" v-if="wakes.length!==0">
              <div class="awaken">
                <span class="super">
                  每唤醒1个徒弟你赚
                  <span class="red">5000金币</span>，徒弟赚
                  <span class="red">1500金币</span>。
                  <a class="big" href="javascript:void(0);" @click="showhuanxing('唤醒技巧')">技巧
                    <span class="iconfont">&#xe721;</span>
                  </a>
                </span>
              </div>
              <div class="listscroll">
                <nv-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" v-if="isLogin">
                  <ul class="user">
                    <li v-for="(item,$index) in wakes" :key="$index">
                      <div class="top">
                        <div class="tou">
                          <img :src="item.headimgurl">
                        </div>
                        <div class="body">
                          <span class="name">{{item.nickname | nickname}}
                            <span class="notes" v-if="item.apprentice_nickname">({{item.apprentice_nickname}})</span>
                            <span class="iconfont" @click="showmodify($index,item.invited,'备注')">&#xe626;备注</span>
                          </span>
                          <span class="tel">{{item.username}}</span>
                        </div>
                      </div>
                      <div class="tips" v-if="item.status==1">
                        <span class="money">+{{item.coin}}金币</span>
                        <span class="txt">近3天进贡</span>
                      </div>
                      <div class="btntips" v-if="item.status==0">
                        <div class="huan" @click="sendmessage(item,'唤醒')">唤醒&nbsp;+5000金币</div>
                        <div class="txt">很久未登录</div>
                      </div>
                    </li>
                  </ul>
                </nv-loadmore>
              </div>
            </div>
            <div v-if="wakes.length==0">
              <div class="tipsTwo">
                <div class="makeMoney">
                  <img src="../../../assets/images/NewInvitepupil/shoututips_v120.png">
                  <div class="immediately">收徒成功率提升200%</div>
                </div>
                <div class="rule">
                  <div class="rule_bg">
                    <div class="earnMoney">
                      <span class="text">邀请你的家人、朋友、同学或同事成功率最高，可获得
                        <i class="red">5元</i>现金奖励</span>
                    </div>
                  </div>
                  <div class="rule_bg">
                    <div class="earnMoney">
                      <span class="text">分享到3个以上微信/QQ群，成功率提升
                        <i class="red">200%</i>。
                      </span>
                    </div>
                  </div>
                  <div class="rule_bg">
                    <div class="earnMoney">
                      <span class="text">告诉你的朋友：注册可领
                        <i class="red">1元</i>现金，微信立即提现
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="animate">
                <div class="message">点击下方开始收徒</div>
                <img src="../../../assets/images/NewInvitepupil/heart.png" class="heart">
              </div>
            </div>
          </div>
        </template>
      </section>
      <footer>
        <div class="xiala" v-show="searchBarFixed&&tab==1">
          <img src="../../../assets/images/NewInvitepupil/xiala.png">
        </div>
        <div class="box" @click="mdmshare('面对面')">
          <span class="iconfont mian">&#xe649;</span>
          <span class="base">面对面收徒</span>
        </div>
        <div class="box" @click="shareqq('QQ')">
          <img src="../../../assets/images/NewInvitepupil/qq.png" class="orther">
          <span class="base">QQ收徒</span>
        </div>
        <div class="box" @click="shareweixin('微信')">
          <span class="iconfont black">&#xe604;</span>
          <span class="base">微信收徒</span>
        </div>
        <div class="box" @click="sharepyq('朋友圈')">
          <img src="../../../assets/images/NewInvitepupil/moments.png" class="white">
          <span class="base">朋友圈收徒</span>
        </div>
      </footer>
      <div class="invitecodeDetail_modal" v-show="showshare" @touchmove.prevent></div>
      <div class="invitecodeDetail_sharebtns" v-show="showshare" @touchmove.prevent>
        <ul class="clear">
          <li class="left weixin">
            <div class="icon" @click="shareweixin('微信')">
              <img src="../../../assets/images/wx.png">
            </div>
            <div class="tips">(好友在微信)</div>
            <div class="share">用微信收徒</div>
          </li>
          <li class="left pyq">
            <div class="icon" @click="sharepyq('朋友圈')">
              <img src="../../../assets/images/pyq.png">
            </div>
            <div class="tips">(好友在朋友圈)</div>
            <div class="share">用朋友圈收徒</div>
          </li>
          <li class="left qq">
            <div class="icon" @click="shareqq('QQ')">
              <img src="../../../assets/images/NewInvitepupil/qqbg.png">
            </div>
            <div class="tips">(好友在QQ)</div>
            <div class="share">用QQ收徒</div>
          </li>
          <li class="left qq">
            <div class="icon" @click="mdmshare('面对面')">
              <img src="../../../assets/images/NewInvitepupil/erweima.png">
            </div>
            <div class="tips">(好友在身边)</div>
            <div class="share">面对面收徒</div>
          </li>
        </ul>
        <span class="cancel" @click="togglebtns()">取消</span>
      </div>
      <div class="bagopend" v-show="showbagopend" @touchmove.prevent>
        <div class="bagrbg">
          <img src="../../../assets/images/NewInvitepupil/header.png">
          <span class="iconfont fork" @click="bagtns()">&#xe685;</span>
          <div class="steps">
            <div class="top">收入一：收徒</div>
            <div class="message">每收一个徒弟获得5元奖励，收徒越多奖励越多，奖励无上限！</div>
            <div class="listMoney">
              <div class="listTips">
                <span class="num">1徒弟</span>
                <span class="money first">=
                  <i class="red">5元</i>
                </span>
              </div>
              <div class="listTips">
                <span class="num">100徒弟</span>
                <span class="money two">=
                  <i class="red">500元</i>
                </span>
              </div>
              <div class="listTips">
                <span class="num">1000徒弟</span>
                <span class="money three">=
                  <i class="red">5000元</i>
                </span>
              </div>
            </div>
          </div>
          <div class="steps">
            <div class="top">收入二：收徒进贡</div>
            <div class="message">徒弟每天看新闻、看视频。徒弟收徒弟，都会给你进贡大量金币，看的越多，进贡越多，天天都赚钱，月月有收入！</div>
            <div class="listMoney">
              <div class="listTips">
                <span class="num">1个徒弟</span>
                <span class="money lastfirst">1个月进贡=
                  <i class="red">6元</i>
                </span>
              </div>
              <div class="listTips">
                <span class="num">100个徒弟</span>
                <span class="money lasttwo">1个月进贡=
                  <i class="red">600元</i>
                </span>
              </div>
              <div class="listTips">
                <span class="num">1000个徒弟</span>
                <span class="money lastthree">1个月进贡=
                  <i class="red">6000元</i>
                </span>
              </div>
            </div>
          </div>
          <div class="all">总收入：1千个徒弟，你的月收入</div>
          <div class="orgine">5千元收徒收入+6千元徒弟进贡收入=
            <i class="big">1万1千元</i>
          </div>
        </div>
      </div>
      <div class="howApprentice" v-if="howApprentice" @touchmove.prevent>
        <div class="bagrbg">
          <span class="iconfont fork" @click="how()">&#xe685;</span>
          <div class="top">如何收徒</div>
          <div class="iframe">
            <video src="http://file.zxoqe.com/common/app/poster_video.mp4" controls="controls" x5-video-player-type="h5" x5-video-player-fullscreen="true"
              preload="auto" playsinline webkit-playsinline='true' x-webkit-airplay='true' x5-video-ignore-metadata='true' :poster="require('../../../assets/images/NewInvitepupil/video.png')"></video>
          </div>
          <div class="step">
            <div class="makeMoney">
              <img src="../../../assets/images/NewInvitepupil/steps_v120.png">
              <div class="immediately">看下面流程，非常简单</div>
            </div>
            <div class="rule">
              <div class="list">
                <div class="artImg">
                  <img class="art" src="../../../assets/images/NewInvitepupil/share_v120.png">
                </div>
                <div class="text">点击按钮
                  <br>分享给好友
                </div>
              </div>
              <div class="list">
                <div class="artImg">
                  <img class="art" src="../../../assets/images/NewInvitepupil/app_v120.png">
                </div>
                <div class="text">好友打开链接
                  <br>下载APP安装
                </div>
              </div>
              <div class="list">
                <div class="artImg">
                  <img class="artlast" src="../../../assets/images/NewInvitepupil/bag_v120.png">
                </div>
                <div class="text">好友登录阅读
                  <br>获得红包
                </div>
              </div>
            </div>
            <div class="tips">
              特殊说明：新徒弟需在新设备上注册（之前未登录过超级头条账号的手机）+阅读获得150金币，才可获得奖励。
            </div>
          </div>
        </div>
      </div>
      <div class="copyCode" v-show="copyCodeshow" @touchmove.prevent>
        <div class="bagrbg">
          <div class="top">
            <div class="head">
              <div class="yes left">
                <img src="../../../assets/images/lottery/v120_yes.png">
              </div>
              <div class="code left">
                <div class="txt">邀请码已复制</div>
                <div class="how">告诉好友如何复制</div>
              </div>
            </div>
          </div>
          <div class="list">
            <div class="title clear">
              <div class="cricle left">
                <img src="../../../assets/images/lottery/radius_one.png">
              </div>
              <div class="text left">邀请好友下载"超级头条"并登录</div>
            </div>
            <div class="share">
              <img src="../../../assets/images/lottery/share_one.png">
            </div>
          </div>
          <div class="center">
            <div class="title clear">
              <div class="cricle left">
                <img src="../../../assets/images/lottery/radius_two.png">
              </div>
              <div class="text left">打开"任务中心"页面</div>
            </div>
            <div class="share">
              <img src="../../../assets/images/lottery/share_two.png">
            </div>
          </div>
          <div class="listbottom">
            <div class="title clear">
              <div class="cricle left">
                <img src="../../../assets/images/lottery/radius_three.png">
              </div>
              <div class="text left">找到"输入邀请码"输入</div>
            </div>
            <div class="share">
              <img src="../../../assets/images/lottery/share_three.png">
            </div>
          </div>
          <button @click="copy" class="btn">我知道了</button>
        </div>
      </div>
      <div class="v-modal" v-show="mdmModalShow" @touchmove.prevent>
        <div class="mdmModal">
          <img class="mdmBg" src="../../../assets/images/activities/mdmBg.png">
          <div class="QRcode">
            <img :src="QRImg" width="100%" v-show="QRImg">
          </div>
          <i class="iconfont close" @click="close">&#xe605;</i>
        </div>
      </div>
      <div class="lanternFestival" v-show="showrole" @touchmove.prevent>
        <div class="rolebg ">
          <i class="close iconfont" @click="togglerole('规则关闭')">&#xe685;</i>
          <div class="tt"></div>
          <div class="txt1">
            <span>收徒奖励升级！升级！再升级！</span>
            <span>每收1位徒弟奖励价值
              <label class="red bolder">【5元】</label>金币。</span>
          </div>
          <div class="table award">
            <span class="table-row">
              <span class="table-cell gray"></span>
              <span class="table-cell yellow th">5月2日~22日</span>
              <span class="table-cell pink th">5月22日之后</span>
            </span>
            <span class="table-row">
              <span class="table-cell gray">第一次奖励</span>
              <span class="table-cell yellow">【15000金币】</span>
              <span class="table-cell pink">【2220金币】</span>
            </span>
            <span class="table-row">
              <span class="table-cell gray">第二次奖励</span>
              <span class="table-cell yellow red">【2220金币】</span>
              <span class="table-cell pink super">【8000金币】</span>
            </span>
            <span class="table-row">
              <span class="table-cell gray">第三次奖励</span>
              <span class="table-cell yellow">【2220金币】</span>
              <span class="table-cell pink">【2220金币】</span>
            </span>
            <span class="table-row">
              <span class="table-cell gray">第四次奖励</span>
              <span class="table-cell yellow">【8000金币】</span>
              <span class="table-cell pink super">【15000金币】</span>
            </span>
            <span class="table-row">
              <span class="table-cell gray">第五次奖励 </span>
              <span class="table-cell yellow">【2220金币】</span>
              <span class="table-cell pink">【2220金币】</span>
            </span>
            <span class="table-row">
              <span class="table-cell gray">第六次奖励 </span>
              <span class="table-cell yellow">【12000金币】</span>
              <span class="table-cell pink red super">【12000金币】</span>
            </span>
          </div>
          <div class="txt3">
            <span>
              发放条件：
              <label>每日徒弟阅读获得
                <label style="color:#d53c3e">150金币</label>，即可满足师傅获得一次奖励条件，奖励分6天发放。</label>
            </span>
            <span>
              活动时间：
              <label>3月1号-7月31号</label>
            </span>
          </div>
        </div>
      </div>
      <div class="howhuanxing" v-show="howhuanxing" @touchmove.prevent>
        <div class="bagrbg">
          <span class="iconfont fork" @click="showhuanxing()">&#xe685;</span>
          <div class="step">
            <div class="makeMoney">
              <img src="../../../assets/images/NewInvitepupil/howhx.png">
            </div>
            <div class="content">成功唤醒后师傅获得5000金币，徒弟得1500金币，唤醒徒弟越多奖励越多。</div>
            <div class="success">什么是成功唤醒？</div>
            <div class="cloumn">
              <div class="red">1.师傅发送唤醒链接给徒弟；</div>
              <div class="red">2.徒弟需要点击师傅的链接并登陆超级头条；</div>
              <div class="red">3.徒弟需要通过阅读资讯获得150金币。</div>
            </div>
            <div class="tips">
              注：唤醒链接3天内有效，3天后需重新唤醒。
            </div>
          </div>
        </div>
      </div>
      <div class="sendmessage" v-show="howsendmessage" @touchmove.prevent>
        <div class="bagrbg">
          <span class="iconfont fork" @click="closesendmessage">&#xe685;</span>
          <div class="step">
            <div class="makeMoney">
              <img src="../../../assets/images/NewInvitepupil/sharehuanxing.png">
            </div>
            <div class="content">马上发消息提醒TA</div>
            <div class="success">选择唤醒方式</div>
            <ul class="clear">
              <li class="left weixin">
                <div class="icon" @click="shareweixinhx('唤醒')">
                  <img src="../../../assets/images/wx.png">
                </div>
                <div class="tips">(徒弟在微信)</div>
                <div class="share">微信唤醒</div>
              </li>
              <li class="left qq">
                <div class="icon" @click="shareqqhx">
                  <img src="../../../assets/images/NewInvitepupil/qqbg.png">
                </div>
                <div class="tips">(徒弟在QQ)</div>
                <div class="share">QQ唤醒</div>
              </li>
              <li class="left qq">
                <div class="icon" @click="sms">
                  <img src="../../../assets/images/NewInvitepupil/sendmessage.png">
                </div>
                <div class="tips">(徒弟已绑定手机)</div>
                <div class="share">短信唤醒</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="modifyName" v-show="showModifyName" @touchmove.prevent>
        <div class="bagrbg">
          <span class="iconfont fork" @click="closemodify">&#xe685;</span>
          <div class="step">
            <div class="title">备注好友名字</div>
            <div class="input">
              <input placeholder="6个字以内" type="text" v-model="modifyNick" maxlength="6">
            </div>
            <div class="confirm">
              <div class="no left" @click="closemodify">取消</div>
              <div class="yes right" @click="modify">确定</div>
            </div>
          </div>
        </div>
      </div>
      <div class="toast-success" v-show="modifySuccess">
        <span class="iconfont">&#xe60c;</span>设置成功
      </div>
      <div class="toast-erro" v-show="modifyErro">
        <span class="iconfont">&#xe636;</span>设置失败
      </div>
    </div>
  </div>
</template>

<script>
require("swiper/dist/css/swiper.css");
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import nvLoadmore from "@/components/loadmore.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";
import pagers from "@/assets/js/pagers";
import nvMarquee from "@/components/marquee";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "invitepupil",
  data() {
    return {
      loading: true,
      swiperOption: {
        loop: false,
        pagination: ".swiper-pagination",
        paginationClickable: false,
        autoplay: 3000
      },
      scrollbarData: [],
      wakes: [],
      urlList: [],
      initData: [],
      invitecode: "",
      iospedding: false,
      marqueePlay: false,
      register: true,
      income: "0.00",
      tab: 1,
      tribute: 0,
      showshare: false,
      showbagopend: false,
      howApprentice: false,
      copyCodeshow: false,
      showModifyName: false,
      isLogin: false,
      showrole: false,
      mdmModalShow: false,
      QRImg: "",
      allLoaded: false,
      wakepage: 0,
      waketxt:
        "嗨~你好久没来[超级头条]啦！你不在的日子我都赚了好几十块钱了，快来吧，我和红包奖励都在等你呢。",
      howhuanxing: false,
      howsendmessage: false,
      searchBarFixed: true,
      phone: "",
      invited: "",
      modifyNick: "",
      apprentice_id: "",
      modifySuccess: false,
      modifyErro: false,
      urlList: [],
      eiaiUrl: [],
      OriginalData:[],
      thirdArr:[]
    };
  },
  components: {
    nvHead,
    nvLoading,
    nvMarquee,
    swiper,
    swiperSlide,
    nvLoadmore
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  async created() {
     // ios 提审状态
      this.iospedding = await appcall.getReviewStatus();
      if (this.iospedding) {
        window.location.replace(this.$h5url + '/main/user.html#/invitepupilOld')
      }
    this.$Progress.start();
    window.addEventListener("scroll", this.handleScroll);
    this.scrollbar();
    this.pullDown();
    this.adType();
  },
  mounted() {
    if (this.$utils.getUrlQuery("pupil")) {
      this.tab = 2;
    }
    window.afterPullDown = function() {
      this.pullDown();
    }.bind(this);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    /**
     * 下拉获取新数据
     */
    async pullDown() {
      let appdata = await appcall.getAppData();
      if (!appdata.uid || !appdata.token) {
        this.isLogin = false;
        this.$Progress.finish();
        this.loading = false;
      } else {
        this.isLogin = true;
        this.getInvitecode();
        this.getApprenticeCount();
        this.getAllCoin();
        this.getHuanxings();
        this.markUnreadmsg();
      }
    },
    togglebtns(position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      this.showshare = !this.showshare;
    },
    bagtns(position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      this.showbagopend = !this.showbagopend;
    },
    how(position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      this.howApprentice = !this.howApprentice;
    },
    close() {
      this.QRImg = "";
      this.mdmModalShow = !this.mdmModalShow;
    },
    togglerole(position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      this.showrole = !this.showrole;
    },
    showhuanxing(position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      this.howhuanxing = !this.howhuanxing;
    },
    showmodify(index, apprentice_id,position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      if (apprentice_id) {
        this.apprentice_id = apprentice_id;
        this.apprentice_index = index;
      }
      this.showModifyName = true;
    },
    closemodify() {
      this.showModifyName = false;
    },
    sendmessage(item,position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      this.phone = item.phone;
      this.invited = item.invited;
      this.howsendmessage = true;
    },
    closesendmessage() {
      this.howsendmessage = false;
    },
    copy() {
      let self = this;
      if (JKEventHandler.browser().ios) {
        appcall.invite_copy({
          code: this.invitecode
        });
        this.copyCodeshow = !this.copyCodeshow;
      } else {
        this.$copyText(this.invitecode).then(
          ok => {
            this.copyCodeshow = !this.copyCodeshow;
          },
          err => {}
        );
      }
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = 100;
      if (scrollTop > offsetTop) {
        this.searchBarFixed = false;
      } else {
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
    //去登陆
    goLogin(position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      appcall.login();
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
    toggletab(index,position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      this.tab = index;
    },
    /**
     * 头部滚动条
     */
    async scrollbar() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/tasks/get_user_withdraw",
        comm,
        params
      );
      if (rs && rs.code === 1001) {
        this.scrollbarData = rs.data.list;

        setTimeout(() => {
          this.marqueePlay = true;
        }, 0);
      } else if (rs && rs.code === 1008) {
        // 暂无数据
        this.scrollbarData = [];
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 发信息唤醒
     */
    async sms() {
      let params = {
        appr_id: this.invited,
        share_where: 5
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/task/get_wake_up_content",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        let params = {
          phone: this.phone,
          sms: rs.data.title + " " + rs.data.description + " " + rs.data.url
        };
        appcall.sms(params);
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 表单提交修改姓名
     */
    async modify() {
      if(!this.modifyNick)return false;
      let params = {
        apprentice_id: this.apprentice_id,
        nickname: this.modifyNick
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/user/apprentice_nickname",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.wakes[this.apprentice_index].apprentice_nickname = this.modifyNick;
        this.modifySuccess = true;
        this.showModifyName = false;
		    this.modifyNick='';
        setTimeout(() => {
          // this.reviewHuanxings(),
          this.modifySuccess = false;
        }, 2000);
      } else if (rs && rs.code == 1003) {
        this.modifyErro = true;
        setTimeout(() => {
          this.modifyErro = false;
          this.showModifyName = false;
        }, 2000);
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
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
        this.$apiurl + "/invitation/get_invited_list",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.wakes = this.wakes.concat(rs.data.list);
        let noRepeatWakes=[];
        for(let i = 0; i < this.wakes.length; i++){
          for(let j = i + 1; j < this.wakes.length; j++){
            if(this.wakes[i].invited == this.wakes[j].invited){
              j = ++i;
            }
          }
          noRepeatWakes.push(this.wakes[i]);
        }
        this.wakes=noRepeatWakes;
      } else if ((rs && rs.code === 1007) || rs.code === 1008) {
        this.allLoaded = true;
        // if (this.wakepage > 0) {
        //   this.$toast("没有更多了");
        // }
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 获取待唤醒徒弟列表
     */
    async reviewHuanxings() {
      let params = {
        page: this.wakepage,
        size: 10
      };
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/invitation/get_invited_list",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        (this.wakes = []), (this.wakes = rs.data.list);
      } else if ((rs && rs.code === 1007) || rs.code === 1008) {
        this.allLoaded = true;
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
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
      this.$Progress.finish();
      if (rs && rs.code === 1001 && rs.data) {
        this.loading = false;
        this.tribute = rs.data.num;
      } else if ((rs && rs.code === 1007) || rs.code === 1008) {
        this.loading = false;
        this.tribute = 0;
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 获取收徒收入
     */
    async getAllCoin() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax(
        "post",
        this.$apiurl + "/invitation/get_tribute_amount",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.initData = rs.data;
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 获取邀请码
     */
    async getInvitecode() {
      let rs = await appcall.getUserInfo();
      this.invitecode = rs.invitecode;
    },
    /**
     * 分享到朋友圈
     */
    async sharepyq(position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      if (this.isLogin) {
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
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }
      } else {
        appcall.login();
      }
    },
    /**
     * 分享到微信好友
     */
    async shareweixin(position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      if (this.isLogin) {
        let params = {
          share_where: 2
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
            title: data.title,
            url: data.url,
            desc: data.description,
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
      } else {
        appcall.login();
      }
    },
    /**
     * 唤醒微信好友
     */
    async shareweixinhx(position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      if (this.isLogin) {
        let params = {
          share_where: 2,
          appr_id: this.invited
        };
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "post",
          this.$apiurl + "/task/get_wake_up_content",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let data = rs.data;
          let params = {
            type: 6,
            title: data.title,
            url: data.url,
            desc: data.description,
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
      } else {
        appcall.login();
      }
    },
    /**
     * 分享到QQ好友
     */
    async shareqq(position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      if (this.isLogin) {
        let params = {
          share_where: 3
        };
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "post",
          this.$apiurl + "/task/share_invitation_img",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let images = rs.data.url;
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
      } else {
        appcall.login();
      }
    },
    /**
     * 唤醒QQ好友
     */
    async shareqqhx() {
      if (this.isLogin) {
        let params = {
          share_where: 3,
          appr_id: this.invited
        };
        let comm = await appcall.getRequestData(params);
        let rs = await ajax(
          "post",
          this.$apiurl + "/task/get_wake_up_content",
          comm,
          params
        );
        if (rs && rs.code === 1001) {
          let images = rs.data.img_url;
          let params = {
            type: 7,
            title: rs.data.title,
            url: rs.data.url,
            desc: rs.data.description,
            images: rs.data.img_url
          };
          appcall.invite(params);
        } else if (rs && rs.code == 1005) {
          this.$alert(rs.msg).then(ok => {
            appcall.login();
          });
        } else {
          this.$alert(rs.msg);
        }
      } else {
        appcall.login();
      }
    },
    /**
     * 面对面
     */
    mdmshare(position) {
      if(!!position){_hmt.push(['_trackEvent', 'invitepupil', 'click', position])}
      if (this.isLogin) {
        this.mdmModalShow = true;
        this.getQR();
      } else {
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
        this.$apiurl + "/invitation/invite_disciple",
        comm,
        params,
        false
      );
      if (rs && rs.code === 1001) {
        this.QRImg = rs.data.qrcode_name;
      } else if (rs && rs.code == 1005) {
        this.$alert(rs.msg).then(ok => {
          appcall.login();
        });
      } else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 页面广告位数据结构
     */
    async adType() {
      let params = {};
      let comm = await appcall.getRequestData(params);
      // let comm={
      //   uid:'11009069',
      //   token:'4870fd0dc3898163bda6737599de86f6',
      //   api_debug:'1',
      //   platform_code:'android_h5',
      //   device_id:'123456'
      // }
      let rs = await ajax(
        "post",
        this.$apiurl + "/carousel/activity_banner",
        comm,
        params
      );
      if (rs && rs.code === 1001 && rs.data) {
        this.OriginalData = rs.data.list;
        this.adChoose(rs.data.list);
      }else if(rs.code === 1008){
        
      }  else {
        this.$alert(rs.msg);
      }
    },
    /**
     * 广告类型判断
     */
    adChoose(data) {
      let eiaiArr = [];
      let thirdArr = [];
      let activeArr = [];
      data.forEach((item, i) => {
        if (item.type == "ad") {
          if (item.ad_source == "eiai") {
            eiaiArr.push(item);
          } else {
            thirdArr.push(item);
          }
        } else {
          activeArr.push(item);
        }
      });
      if (eiaiArr.length != 0) {
        eiaiArr.forEach(async(item, index) => {
          this.eiaiUrl = this.eiaiUrl.concat(await this.getAiAd(item));
          // this.adEiai(eiaiArr[index].slot_id, item);
        });
      }
      if (thirdArr.length != 0) {
        this.thirdArr = thirdArr
        this.thirdAd(thirdArr);
      }
      if (activeArr.length != 0) {
        this.urlList = activeArr;
      }
    },
    /**
     * 获取eiai广告
     */
    async getAiAd(item){
      let adFeed = {};
      let params = {
        slot_id: item.slot_id,
      };
      let comm = await appcall.getRequestData(params);
      // let comm={
      //   uid:'11009069',
      //   token:'4870fd0dc3898163bda6737599de86f6',
      //   api_debug:'1'
      // }
      let rs = await ajax(
        "GET",
        this.$adApi + "/slot/creative-info",
        comm,
        params,
        false
      );
      if (rs && rs.code === 1001 && rs.data) {
        if (!rs.data.hasOwnProperty("creative_id")) return false;
        let exporsureData = {
          creative_id: rs.data.creative_id,
          slot_id: item.slot_id,
          ad_source: item.ad_source
        };
        this.exposure(exporsureData);
        adFeed = rs.data;
      }else if (rs.code === 1008){

      }else {
        // this.$alert(rs.msg);
        appcall.showToast(rs.msg);
      }
      return adFeed;
    },
    /**
     * 第三方广告
     */
    thirdAd(data) {
      data.forEach(item => {
        switch (item.ad_source) {
          case "baidu":
            setTimeout(()=>{
              BAIDU_CLB_fillSlotAsync(item.slot_id, "hancr_001");
            },1000)
            break;
          case "xunfei":
            break;
          case "xiaomi":
            break;
          case "adview":
            break;
          case "gdt":
            break;
          default:
            break;
        }
      });
    },
    /**
     *曝光接口
     */
    async exposure(item) {
      let params = {
        slot_id: item.slot_id,
        creative_id: item.creative_id,
        ad_source: item.ad_source
      };
      let comm = await appcall.getRequestData(params);
      ajax("post", this.$adApi + "/log/exposure-log", comm, params,false);
    },
    /**
     *广告点击记录
     */
    async Adclicks(item) {
      let params = {
        slot_id: item.slot_id,
        creative_id: item.creative_id,
        ad_source: item.ad_source
      };
      let comm = await appcall.getRequestData(params);
      ajax("post", this.$adApi + "/log/click-log", comm, params);
    },
    /*
       * 活动页跳转
       */
    adJump(item) {
      appcall.navigator({
        title: item.name,
        url: item.url
      });
    },
    /*
       * eiai广告跳转
       */
    eiaiJump(item) {
      let exporsureData = {
        creative_id: item.creative_id,
        slot_id: item.slot_id,
        ad_source: "eiai"
      };
      appcall.navigator_ad({
        url: item.source_url
      });
      this.Adclicks(exporsureData);
    }
  },
  filters: {
    nickname: function(value) {
      if(!value) return '';
      return value.length < 5 ? value : value.slice(0, 4) + "...";
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin";
.invitepupil {
  .spacer {
    background: #f8f8f8;
  }
  header {
    width: 100%;
    height: 3.8rem;
    .background("NewInvitepupil/invitepupil_bg_v120.png");
    position: relative;
    .maskLayer {
      height: 0.6rem;
      line-height: 0.6rem;
      background: rgba(255, 182, 62, 0.5);
      overflow: hidden;
    }
    .flushCroll {
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
      overflow: hidden;
      z-index: -1;
      height: 0.6rem !important;
      ul {
        height: 0.6rem !important;
      }
      li {
        height: 0.6rem !important;
        line-height: 0.6rem !important;
        font-size: 0.24rem;
        color: #ffdb9f;
      }
    }
    .rightTips {
      font-size: 0.24rem;
      color: #fff;
      text-align: right;
      font-weight: bold;
      line-height: 0.4rem;
      height: 0.4rem;
      width: 1rem;
      border: 1px solid #fff;
      border-right: 0;
      border-top-left-radius: 0.54rem;
      border-bottom-left-radius: 0.54rem;
      padding-right: 0.2rem;
      margin-top: 0.19rem;
    }
    .tipsMessage {
      text-align: center;
      margin: 0.6rem auto 0.46rem;
      line-height: 1;
      color: #fff;
      font-size: 0.72rem;
      font-weight: bold;
    }
    .topBtn {
      display: block;
      background: linear-gradient(135deg, #ffe24a, #ffba44);
      color: #f12926;
      width: 3.2rem;
      height: 0.8rem;
      font-size: 0.32rem;
      border-radius: 0.8rem;
      margin: 1.46rem auto 0.3rem;
      font-weight: bold;
      box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.09);
    }

    .viewCode {
      margin: 0;
      padding: 0;
      text-align: center;
      a {
        line-height: 1;
        color: #fff;
        font-size: 0.26rem; // text-decoration: underline;
      }
    }
    .noRegister {
      color: #fff;
      font-size: 0.26rem;
      text-align: center;
      margin-top: 0.3rem;
    }
  }
  section {
    margin-bottom: 1.08rem;
    .incomeData {
      height: 1.6rem;
      padding: 0.2rem;
      background: #f8f8f8;
      .goInvite {
        width: 100%;
        height: 1.2rem;
        background: #fff;
        border-radius: 0.6rem;
        padding: 0.26rem 0.3rem;
        .right {
          background: linear-gradient(135deg, #ff794b, #f12926);
          width: 1.4rem;
          margin-top: 0.07rem;
          height: 0.52rem;
          border-radius: 0.35rem;
          color: #fff;
          text-align: center;
          font-size: 0.26rem;
        }
        .left {
          position: relative;
          .img {
            position: absolute;

            width: 0.58rem;
            height: 0.66rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .txt {
            position: relative;
            height: 0.66rem;
            width: 4rem;
            margin-left: 0.8rem;
            .first {
              position: absolute;
              top: 0;
              color: #333;
              font-size: 0.3rem;
              line-height: 1;
            }
            .mes {
              position: absolute;
              bottom: 0;
              color: #999999;
              font-size: 0.24rem;
              line-height: 1;
            }
          }
        }
      }
    }
    .tapStyle {
      margin-bottom: 0.3rem;
      border-bottom: 1px solid #ececec;
      ul {
        li {
          width: 50%;
          height: 0.9rem;
          line-height: 0.9rem;
          display: block;
          text-align: center;
          font-size: 0.3rem;
          position: relative;
          &.active:after {
            content: " ";
            bottom: 0;
            left: 42%;
            position: absolute;
            background: linear-gradient(
              135deg,
              rgba(255, 121, 75, 1),
              rgba(241, 41, 38, 1)
            );
            width: 0.6rem;
            height: 0.06rem;
            border-radius: 0.04rem;
            margin: 0 auto;
            display: block;
          }
          &.active {
            color: #f12926;
          }
        }
        .criclePosition::before {
          position: absolute;
          content: ""; 
          .background("NewInvitepupil/zhuanqian_v120.png");
          top: 0rem;
          right: 0.29rem;
          width: 0.96rem;
          height: 0.96rem;
          display: inline-block;
        }
      }
    }
    .baidu{
      width: 6.9rem;
      height: 1.4rem;
      margin: .3rem auto 0;
    }
    .taskCenter_swiper {
      width: 6.9rem;
      margin: 0 auto;
      .swiper-container {
        width: 100%;
        height: 1.4rem;
        border-radius: .08rem;
        overflow: hidden;
        z-index: 0;
        img {
          width: 100%;
        }
      }
    }

    .tabContiner {
      padding: 0 0.3rem;
      .makeMoney {
        margin: 0.55rem auto 0;
        width: 4.36rem;
        height: auto;
        .immediately {
          margin-top: 0.2rem;
          text-align: center;
          font-size: 0.28rem;
          color: #999;
        }
      }
      .rule {
        margin-top: 0.4rem;
        .roker {
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          .list {
            width: 2.16rem;
            height: 3.1rem;
            background: #f8f8f8;
            .roker_a {
              margin: 0.4rem auto 0.26rem;
              width: 0.72rem;
              height: 0.72rem;
              text-align: center;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .roker_b {
              color: #f12926;
              font-size: 0.3rem;
              line-height: 1;
              text-align: center;
              margin-top: 0.2rem;
              font-weight: bold;
            }
            .roker_c {
              color: #333333;
              font-size: 0.28rem;
              line-height: 1;
              text-align: center;
              margin-top: 0.2rem;
            }
            .roker_d {
              color: #333333;
              font-size: 0.28rem;
              line-height: 1;
              text-align: center;
              margin-top: 0.1rem;
              i {
                color: #f12926;
              }
            }
          }
        }
        .ruleTips {
          text-align: center;
          font-size: 0.26rem;
          color: #999;
          margin: 0.4rem auto;
          i {
            .wh(0.12rem, 0.2rem);
            .background("ico_next_small.png");
            display: inline-block;
            margin-left: 0.14rem;
          }
        }
        .demoCase {
          margin-bottom: 0.4rem;
          width: 6.9rem;
          height: 0.8rem;
          border-radius: 0.4rem;
          border: 1px solid #ff7900;
          font-size: 0.3rem;
          color: #ff7900;
          text-align: center;
          line-height: 0.76rem;
          b {
            font-weight: bold;
            color: #ff7900;
            margin-right: 0.2rem;
          }
        }
      }
    }
    .case {
      margin-top: 1rem;
      width: 100%;
      height: 1.3rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tipsContiner {
      padding: 0.6rem 0.3rem 0.2rem;
      .makeMoney {
        margin: 0 auto;
        width: 4.36rem;
        height: auto;
        .immediately {
          margin-top: 0.2rem;
          text-align: center;
          font-size: 0.28rem;
          color: #999;
        }
      }
      .rule {
        margin-top: 0.4rem;
        .rule_bg:nth-child(1) {
          .earnMoney {
            .background("NewInvitepupil/skill_one.png");
            background-position: 0 0.45rem;
            background-size: 0.52rem;
            padding-left: 0.71rem;
          }
        }
        .rule_bg:nth-child(2) {
          .earnMoney {
            .background("NewInvitepupil/skill_two.png");
            background-position: 0 0.45rem;
            background-size: 0.52rem;
            padding-left: 0.71rem;
          }
        }
        .rule_bg:nth-child(3) {
          .earnMoney {
            .background("NewInvitepupil/skill_three.png");
            background-position: 0 0.45rem;
            background-size: 0.52rem;
            padding-left: 0.71rem;
          }
        }
        .rule_bg {
          background: #f8f8f8;
          margin-bottom: 0.2rem;
          height: 1.4rem;
          padding-left: 0.3rem;
          .earnMoney {
            width: 100%;
            height: 1.4rem;
            padding: 0.28rem 0.3rem;
            line-height: 0.48rem;
            span {
              margin-left: 0 !important;
            }
            .text {
              margin-left: 0.27rem;
              font-size: 0.28rem;
              color: #333;
              line-height: 0.42rem;
              .red {
                color: #f83c37;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .step {
      padding: 0.6rem 0.3rem 0.4rem;
      .makeMoney {
        margin: 0 auto;
        width: 4.36rem;
        height: auto;
        .immediately {
          margin-top: 0.2rem;
          text-align: center;
          font-size: 0.28rem;
          color: #999;
        }
      }
      .line {
        margin-top: 0.29rem;
        width: 0.76rem;
      }
      .rule {
        margin-top: 0.6rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        .list {
          display: -webkit-flex;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-content: center;
          align-items: center;
          .artImg {
            width: 1rem;
            height: 1rem;
            .art {
              width: 1rem;
            }
          }
          .text {
            width: 100%;
            margin-top: 0.2rem;
            font-size: 0.3rem;
            color: #333;
            text-align: center;
            font-weight: bold;
          }
        }
      }
      .tips {
        margin-top: 0.4rem;
        font-size: 0.24rem;
        color: #999;
        height: 0.7rem;
      }
    }
    .bigspacer {
      width: 100%;
      height: 0.6rem;
      background: #f8f8f8;
    }
    .template2 {
      margin-bottom: 1.08rem;
      .manlist {
        .awaken {
          width: 7.5rem;
          height: 1rem;
          background: #f5f5f5;
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          .super {
            display: inline-block;
            vertical-align: middle;
            font-size: 0.24rem;
            .red {
              color: #f83c37;
            }
            .big {
              font-size: 0.24rem;
              color: #999999;
              margin-left: 0.6rem;
            }
          }
        }
        .listscroll {
          height: 7rem;
          overflow-y: scroll;
          .user {
            padding: 0 0.3rem;
            overflow: hidden;
            overflow-y: scroll;
            li {
              height: 1.2rem;
              width: 100%;
              border-bottom: 1px solid #e5e5e5;
              display: flex;
              display: -webkit-flex;
              justify-content: space-between; // align-content: center;
              align-items: center;
              .top {
                display: flex;
                display: -webkit-flex;
                justify-content: flex-start;
                align-items: center;
                .tou {
                  height: 0.6rem;
                  width: 0.6rem;
                  border-radius: 50%;
                  overflow: hidden;
                }
                .body {
                  display: -webkit-inline-flex;
                  display: inline-flex;
                  flex-direction: column;
                  justify-content: space-around;
                  height: 0.9rem;
                  margin-left: 0.21rem;
                  padding-right: .1rem;
                  .name {
                    color: #333333;
                    font-size: 0.26rem;
                    line-height: 1;
                    text-align: left;
                    .iconfont {
                      color: #68c5ff;
                      font-size: 0.22rem;
                    }
                  }
                  .tel {
                    color: #999999;
                    font-size: 0.22rem;
                    line-height: 1;
                  }
                }
              }
              .tips {
                display: -webkit-inline-flex;
                display: inline-flex;
                flex-direction: column;
                justify-content: space-around;
                height: 0.9rem;
                .money {
                  text-align: right;
                  color: #333;
                  font-size: 0.3rem;
                  line-height: 1;
                  font-weight: bold;
                }
                .txt {
                  text-align: right;
                  color: #999999;
                  font-size: 0.22rem;
                  line-height: 1;
                }
              }
              .btntips {
                display: -webkit-inline-flex;
                display: inline-flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                align-content: center;
                height: 0.9rem;
                .txt {
                  color: #999999;
                  font-size: 0.22rem;
                  line-height: 1;
                  width: 100%;
                  text-align: right;
                }
                .huan {
                  color: #fff;
                  background: #f83c37;
                  width: 2.44rem;
                  height: 0.5rem;
                  line-height: 0.5rem;
                  font-size: 0.26rem;
                  text-align: center;
                  border-radius: 0.25rem;
                  background: linear-gradient(135deg, #ff794b, #f12926);
                }
              }
            }
          }
        }
      }
      .tipsTwo {
        padding: 0.6rem 0.3rem 0;
        .makeMoney {
          margin: 0 auto;
          width: 4.36rem;
          height: auto;
          .immediately {
            margin-top: 0.2rem;
            text-align: center;
            font-size: 0.28rem;
            color: #999;
          }
        }
        .rule {
          margin-top: 0.4rem;
          .rule_bg:nth-child(1) {
            .earnMoney {
              .background("NewInvitepupil/skill_one.png");
              background-position: 0 0.45rem;
              background-size: 0.52rem;
              padding-left: 0.71rem;
            }
          }
          .rule_bg:nth-child(2) {
            .earnMoney {
              .background("NewInvitepupil/skill_two.png");
              background-position: 0 0.45rem;
              background-size: 0.52rem;
              padding-left: 0.71rem;
            }
          }
          .rule_bg:nth-child(3) {
            .earnMoney {
              .background("NewInvitepupil/skill_three.png");
              background-position: 0 0.45rem;
              background-size: 0.52rem;
              padding-left: 0.71rem;
            }
          }
          .rule_bg {
            background: #f8f8f8;
            margin-bottom: 0.2rem;
            height: 1.4rem;
            padding-left: 0.3rem;
            .earnMoney {
              width: 100%;
              height: 1.4rem;
              padding: 0.28rem 0.3rem;
              line-height: 0.48rem;
              span {
                margin-left: 0 !important;
              }
              .text {
                margin-left: 0.27rem;
                font-size: 0.28rem;
                line-height: 1;
                color: #666;
                .red {
                  color: #f83c37;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
      .animate {
        padding-bottom: 0.5rem;
        .message {
          margin: 0.61rem auto 0.41rem;
          text-align: center;
          font-size: 0.3rem;
        }
        .heart {
          width: 0.69rem;
          animation: floated 0.8s linear infinite;
        }
      }
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: -webkit-flex;
    display: flex;
    background-color: white;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.09);
    .xiala {
      position: absolute;
      top: -1rem;
      left: 50%;
      margin-left: -0.225rem;
      width: 0.45rem;
      height: 0.49rem;
      .img {
        width: 0.45rem;
      }
      animation: floated 0.8s linear infinite;
    }
    .box {
      width: 25%;
      height: 1.08rem;
      display: -webkit-inline-flex;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;
      .base {
        color: #333;
        font-size: 0.24rem;
      }
      .mian {
        font-size: 0.46rem;
        color: rgb(0, 157, 255);
      }
      .orther {
        width: 0.46rem;
      }
      .black {
        color: rgb(25, 209, 0);
        font-size: 0.46rem;
      }
      .white {
        width: 0.7rem;
        padding-left: 0.3rem;
        position: relative;
      }
    }
  }
  .invitecodeDetail_modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
  }
  .invitecodeDetail_sharebtns {
    position: fixed;
    width: 100%;
    height: 6.4rem;
    bottom: 0;
    background: #fbf9f9;
    z-index: 1;
    ul {
      margin: 0 0.4rem auto;
      height: 5.4rem;
      li {
        width: 50%;
        height: 46%;
        text-align: center;
        .icon {
          width: 1.3rem;
          height: 1.3rem;
          text-align: center;
          margin: 0.35rem auto 0;
          border-radius: 1.3rem;
          border: 1px solid #f1f1f1;
          background: #fff;
          img {
            width: 0.66rem;
            height: 0.66rem;
            margin: 0.3rem auto;
          }
        }
        .tips {
          margin: 0.21rem 0 0.14rem;
          font-size: 0.22rem;
          line-height: 1;
        }
        .share {
          line-height: 1;
          font-size: 0.28rem;
          color: #333333;
          font-weight: bold;
        }
      }
    }
    .cancel {
      height: 1rem;
      line-height: 1rem;
      display: block;
      background: #fff;
      font-size: 0.36rem;
      text-align: center;
    }
  }
  .bagopend {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      background: #fff;
      display: block;
      width: 6.41rem;
      height: 11.16rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -5.58rem auto;
      border-radius: 0.2rem;
      overflow: hidden;
      .fork {
        position: absolute;
        right: 0rem;
        top: 0rem;
        color: #fff;
        font-size: 0.3rem;
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
      }
      .steps {
        padding: 0 0.3rem;
        margin-top: 0.34rem;
        .top {
          font-size: 0.32rem;
          color: #ff3802;
          font-style: italic;
          line-height: 1;
        }
        .message {
          margin: 0.36rem 0 0.27rem;
          font-size: 0.24rem;
          color: #999;
          line-height: 1;
        }
        .listMoney {
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          border-bottom: 1px solid #e5e5e5;
          .listTips {
            display: inline-flex;
            display: -webkit-inline-flex;
            height: 0.55rem;
            align-content: center;
            align-items: center;
            .num {
              font-size: 0.26rem;
              color: #454545;
            }
            .money {
              font-size: 0.26rem;
              color: #454545;
              .red {
                color: #ff3802;
              }
            }
            .first {
              margin-left: 1.72rem;
            }
            .two {
              margin-left: 1.44rem;
            }
            .three {
              margin-left: 1.3rem;
            }
            .lastfirst {
              margin-left: 1.5rem;
            }
            .lasttwo {
              margin-left: 1.24rem;
            }
            .lastthree {
              margin-left: 1.1rem;
            }
          }
        }
      }
      .all {
        padding: 0.3rem 0.3rem;
        font-style: italic;
        font-size: 0.32rem;
        color: #333;
        font-weight: bold;
        line-height: 1;
      }
      .orgine {
        line-height: 1;
        padding: 0 0.3rem;
        font-style: italic;
        font-size: 0.36rem;
        color: #ff3802;
        font-weight: bold;
        .big {
          color: #ff3802;
          font-size: 0.48rem;
        }
      }
    }
  }
  .howApprentice {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      background: #fff;
      display: block;
      width: 6.41rem;
      height: 10rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -5rem auto;
      border-radius: 0.2rem;
      overflow: hidden;
      .fork {
        position: absolute;
        right: 0rem;
        top: 0rem;
        color: #ccc;
        font-size: 0.3rem;
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
      }
      .top {
        color: #333;
        font-size: 0.36rem;
        text-align: center;
        height: 0.95rem;
        line-height: 0.95rem;
      }
      .iframe {
        padding: 0 0.3rem;
        height: 3.17rem;
        iframe {
          z-index: 100;
          width: 100%;
          height: 100%;
        }
        video {
          z-index: 100;
          width: 100%;
          height: 100%;
        }
      }
      .step {
        padding: 0.6rem 0.3rem 0.4rem;
        .makeMoney {
          margin: 0 auto;
          width: 4.36rem;
          height: auto;
          .immediately {
            margin-top: 0.2rem;
            text-align: center;
            font-size: 0.28rem;
            color: #999;
          }
        }
        .line {
          margin-top: 0.29rem;
          width: 0.76rem;
        }
        .rule {
          margin-top: 0.6rem;
          display: flex;
          display: -webkit-flex;
          justify-content: space-around;
          .list {
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            .artImg {
              width: 1rem;
              height: 1rem;
              .art {
                width: 1rem;
              }
            }
            .text {
              width: 100%;
              margin-top: 0.2rem;
              font-size: 0.3rem;
              color: #333;
              text-align: center;
              font-weight: bold;
            }
          }
        }
        .tips {
          margin-top: 0.4rem;
          font-size: 0.24rem;
          color: #999;
          height: 0.7rem;
        }
      }
    }
  }
  .copyCode {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      background: #fff;
      display: block;
      width: 6rem;
      height: 9.68rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -4.84rem auto;
      border-radius: 0.2rem;
      overflow: hidden;
      .top {
        width: 100%;
        height: 1.5rem;
        background: linear-gradient(
          135deg,
          rgba(250, 217, 97, 1),
          rgba(247, 107, 28, 1)
        );
        .head {
          padding: 0.4rem 0 0 1.44rem;
          .yes {
            width: 0.76rem;
            height: 0.76rem;
          }
          .code {
            margin-left: 0.2rem;
            .txt {
              color: #fff;
              font-size: 0.36rem;
              line-height: 1;
            }
            .how {
              margin-top: 0.15rem;
              color: #fff;
              font-size: 0.24rem;
              line-height: 1;
            }
          }
        }
      }
      .list {
        margin-top: 0.64rem;
        .title {
          padding: 0 0.3rem;
          .cricle {
            width: 0.36rem;
            height: 0.36rem;
          }
          .text {
            margin-left: 0.14rem;
            height: 0.36rem;
            line-height: 0.36rem;
          }
        }
        .share {
          margin: 0.34rem auto 0;
          width: 5.4rem;
          height: 0.86rem;
          img {
            width: 100%;
          }
        }
      }
      .listbottom {
        margin-top: 0.4rem;
        .title {
          padding: 0 0.3rem;
          .cricle {
            width: 0.36rem;
            height: 0.36rem;
          }
          .text {
            margin-left: 0.14rem;
            height: 0.36rem;
            line-height: 0.36rem;
          }
        }
        .share {
          margin: 0.3rem auto 0;
          width: 5.4rem;
          height: 0.86rem;
        }
      }
      .center {
        margin-top: 0.6rem;
        .title {
          padding: 0 0.3rem;
          .cricle {
            width: 0.36rem;
            height: 0.36rem;
          }
          .text {
            margin-left: 0.14rem;
            height: 0.36rem;
            line-height: 0.36rem;
          }
        }
        .share {
          margin: 0 auto;
          width: 5.4rem;
          height: 1.28rem;
        }
      }
      .btn {
        background: linear-gradient(
          135deg,
          rgba(255, 121, 75, 1),
          rgba(241, 41, 38, 1)
        );
        border-radius: 0.42rem;
        width: 5.4rem;
        height: 0.8rem;
        color: #ffffff;
        font-size: 0.32rem;
        line-height: 0.8rem;
        margin: 0.6rem auto 0;
        display: block;
      }
    }
  }
  .v-modal {
    .mask;
    text-align: center;
    .winningModal {
      position: absolute;
      .background("activities/winning.png");
      background-size: 100% 100%;
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
        span {
          font-size: 1rem;
          color: #ffffff;
          -webkit-text-stroke: 0.06rem #be0b02;
          position: relative;
          font-weight: bold;
          letter-spacing: -3px;
          i {
            font-size: 0.55rem;
            color: #ffffff;
            position: absolute;
            top: 28%;
            left: 108%;
            font-weight: bold;
            -webkit-text-stroke: 0.04rem #be0b02;
          }
        }
      }
      button {
        width: 2rem;
        height: 0.8rem;
        background: wheat;
      }
    }
    .tipsModal {
      position: absolute;
      background-color: #fff0ca;
      width: 4.8rem;
      height: 5.2rem;
      top: 50%;
      margin-top: -2.6rem;
      left: 50%;
      margin-left: -2.4rem;
      border-radius: 0.5rem;
      .close {
        position: absolute;
        top: 0.36rem;
        right: 0.36rem;
        font-size: 0.3rem;
        color: #d0bb87;
      }
      .imgBox {
        width: 1.47rem;
        height: 2rem;
        margin: 0.6rem auto 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .tipsBox {
        text-align: center;
        font-size: 0.36rem;
        color: #666666;
        line-height: 1;
        margin: 0.46rem 0 0.37rem;
      }
      button {
        width: 4rem;
        height: 0.88rem;
        background: #ff3701;
        border-radius: 0.44rem;
        box-shadow: 0 0.1rem 0.1rem 0 rgba(233, 19, 3, 0.33);
        color: #ffffff;
        font-size: 0.36rem;
        text-align: center;
      }
    }
    .rulesModal {
      position: absolute;
      background-color: #fff0ca;
      width: 6.9rem;
      height: 6.8rem;
      top: 50%;
      margin-top: -3.4rem;
      left: 50%;
      margin-left: -3.45rem;
      border-radius: 0.5rem;
      .close {
        position: absolute;
        top: 0.36rem;
        right: 0.36rem;
        font-size: 0.3rem;
        color: #d0bb87;
      }
      .tipsBox {
        position: absolute;
        top: 0.48rem;
        left: 0.33rem;
        width: 1.83rem;
        height: 0.81rem;
        .background("activities/rulesTips.png");
        background-size: 100% 100%;
        text-align: center;
        font-size: 0.34rem;
        color: #ffffff;
        line-height: 1;
        padding-top: 0.13rem;
      }
      ul {
        width: 6.1rem;
        text-align: justify;
        margin: 1.65rem auto 0;
        line-height: 0.5rem;
        padding-left: 0.47rem;
        li {
          color: #666666;
          font-size: 0.3rem;
          position: relative;
          word-break: normal;
          margin-bottom: 0.05rem;
          i {
            position: absolute;
            top: 0.1rem;
            left: -0.47rem;
            display: block;
            width: 0.34rem;
            height: 0.34rem;
            background: #ff3701;
            border-radius: 100%;
            font-size: 0.24rem;
            color: #ffffff;
            line-height: 0.36rem;
            text-align: center;
          }
          span {
            color: #ff3701;
          }
        }
      }
    }
    .mdmModal {
      position: absolute;
      width: 7.5rem;
      height: 9.9rem;
      top: 50%;
      margin-top: -4.95rem;
      left: 0;
      .mdmBg {
        width: 7.5rem;
        height: 9.5rem;
        margin-top: 0;
      }
      .close {
        font-size: 0.54rem;
        color: #ffffff;
      }
      .QRcode {
        position: absolute;
        top: 1.53rem;
        left: 2.13rem;
        width: 3.2rem;
        height: 3.2rem;
        background: #eeeeee;
        img {
          width: 100%;
          height: 100%;
        }
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
      top: 50%;
      left: 0;
      right: 0;
      margin: -3.8rem auto;
      border-radius: 0.2rem;
      padding: 0.7rem 0 0.25rem;
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
        width: 2.49rem;
        height: 0.38rem;
        margin: 0 auto;
        .background("NewInvitepupil/ruleImg.png");
      }
      .txt1 {
        margin: 0.2rem auto;
        font-size: 0.3rem;
        line-height: 0.36rem;
        padding-left: 0.3rem;
        span {
          font-size: 0.3rem;
          display: block;
          .red {
            color: #d53c3e;
            font-weight: bold;
          }
        }
        span:first-child {
          font-size: 0.34rem;
        }
      }
      .award {
        font-size: 0.26rem;
        line-height: 0.42rem;
        .th {
          font-size: 0.3rem;
          padding-top: 0.2rem;
        }
        .gray {
          color: #666;
          background: #f7f7f7;
        }
        .yellow {
          color: #555;
          background: #fafff0;
        }
        .pink {
          color: #333;
          background: #ffe5e0;
          font-weight: bold;
        }
        .super {
          color: #d53c3e;
        }
        .table-row .table-cell:first-child {
          padding-left: 0.2rem;
        }
        .table-row:last-child .table-cell {
          padding-bottom: 0.15rem;
        }
      }
      .txt3 {
        margin: 0 auto;
        font-size: 0.24rem;
        padding: 0.2rem 0.3rem;
        span {
          color: #333;
          display: block;
          &:first-child {
            margin-bottom: 0.15rem;
          }
          label {
            color: #999;
          }
        }
      }
      .tt2 {
        width: 3.86rem;
        margin: 0 auto;
        .background("pop_td_jiangli.png");
        color: #fff;
        text-align: center;
        line-height: 0.5rem;
        font-size: 0.32rem;
      }
      .txt2 {
        .ico {
          width: 1.53rem;
          height: 1.87rem;
          .background("pop_td_cash.png");
          margin: 0.6rem 0.3rem 0 0.1rem;
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
  .howhuanxing {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      background: #fff;
      display: block;
      width: 6.41rem;
      height: 5.83rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -2.915rem auto;
      border-radius: 0.2rem;
      overflow: hidden;
      .fork {
        position: absolute;
        right: 0rem;
        top: 0rem;
        color: #ccc;
        font-size: 0.3rem;
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
      }
      .step {
        padding: 0 0.3rem;
        .makeMoney {
          margin: 0.6rem auto 0;
          width: 1.47rem;
          height: auto;
        }
        .content {
          margin-top: 0.55rem;
          font-size: 0.28rem;
          color: #333;
          font-weight: bold;
        }
        .success {
          margin-top: 0.4rem;
          color: #ff2121;
          font-size: 0.28rem;
          font-weight: bold;
          text-align: center;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            width: 1rem;
            height: 0.02rem;
            top: 0.2rem;
            left: 0.6rem;
            background: #ff2121;
          }
          &::after {
            content: "";
            position: absolute;
            width: 1rem;
            height: 0.02rem;
            top: 0.2rem;
            right: 0.6rem;
            background: #ff2121;
          }
        }
        .cloumn {
          margin-top: 0.17rem;
          .red {
            height: 0.5rem;
            color: #ff2121;
            font-size: 0.28rem;
            line-height: 0.5rem;
          }
        }
        .tips {
          margin-top: 0.3rem;
          font-size: 0.24rem;
          color: #999;
          height: 0.7rem;
        }
      }
    }
  }
  .sendmessage {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      background: #fff;
      display: block;
      width: 6.41rem;
      height: 5.83rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -2.915rem auto;
      border-radius: 0.2rem;
      overflow: hidden;
      .fork {
        position: absolute;
        right: 0rem;
        top: 0rem;
        color: #ccc;
        font-size: 0.3rem;
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
      }
      .step {
        .makeMoney {
          margin: 0.6rem auto 0;
          width: 1.47rem;
          height: auto;
        }
        .content {
          margin-top: 0.21rem;
          font-size: 0.24rem;
          color: #868686;
          font-weight: bold;
          text-align: center;
        }
        .success {
          margin-top: 0.61rem;
          color: #ff2121;
          font-size: 0.3rem;
          font-weight: bold;
          text-align: center;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            width: 1rem;
            height: 0.02rem;
            top: 0.2rem;
            left: 0.9rem;
            background: #ff2121;
          }
          &::after {
            content: "";
            position: absolute;
            width: 1rem;
            height: 0.02rem;
            top: 0.2rem;
            right: 0.9rem;
            background: #ff2121;
          }
        }
        ul {
          margin: 0.2rem auto;
          li {
            width: 33%;
            text-align: center;
            .icon {
              width: 1.3rem;
              height: 1.3rem;
              text-align: center;
              margin: 0.35rem auto 0;
              border-radius: 1.3rem;
              border: 1px solid #f1f1f1;
              background: #eeeeee;
              img {
                width: 0.66rem;
                height: 0.66rem;
                margin: 0.3rem auto;
              }
            }
            .tips {
              margin: 0.21rem 0 0.14rem;
              font-size: 0.22rem;
              line-height: 1;
            }
            .share {
              line-height: 1;
              font-size: 0.28rem;
              color: #333333;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .modifyName {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .bagrbg {
      position: relative;
      background: #fff;
      display: block;
      width: 6rem;
      height: 3.25rem;
      top: 50%;
      left: 0;
      right: 0;
      margin: -1.625rem auto;
      border-radius: 0.2rem;
      .fork {
        position: absolute;
        right: 0rem;
        top: 0rem;
        color: #ccc;
        font-size: 0.3rem;
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
      }
      .step {
        padding-top: 0.4rem;
        .title {
          font-size: 0.36rem;
          color: #333;
          line-height: 1;
          text-align: center;
          margin: 0 auto;
        }
        .input {
          width: 5.31rem;
          height: 0.8rem;
          margin: 0.4rem auto 0;
          input {
            width: 100%;
            height: 100%;
            line-height: 0.8rem;
            background: #f8f8f8;
            padding-left: 0.3rem;
            color: #ccc;
            -webkit-touch-callout: auto;
            -webkit-user-select: auto;
            -khtml-user-select: auto;
            -moz-user-select: auto;
            -ms-user-select: auto;
            user-select: auto;
            -webkit-appearance: none;
          }
          input::-webkit-input-placeholder {
            /* WebKit browsers */
            line-height: 0.8rem; //placeholder
          }
          input:focus {
            color: #000;
          }
        }
        .confirm {
          width: 100%;
          height: 0.88rem;
          position: absolute;
          bottom: 0;
          border-top: 1px solid #dfdfdf;
          .no {
            height: 100%;
            width: 50%;
            text-align: center;
            line-height: 0.88rem;
            color: #333;
            border-right: 1px solid #dfdfdf;
          }
          .yes {
            line-height: 0.88rem;
            text-align: center;
            height: 100%;
            width: 50%;
            color: #f12926;
          }
        }
      }
    }
  }
  .toast-success {
    position: fixed;
    bottom: 1.55rem;
    left: 50%;
    margin-left: -1.17rem;
    width: 2.34rem;
    height: 0.9rem;
    background: #000;
    color: #fff;
    font-size: 0.3rem;
    line-height: 0.9rem;
    text-align: center;
    border-radius: 0.1rem;
    .iconfont {
      margin-right: 0.14rem;
      color: rgb(0, 197, 73);
    }
  }
  .toast-erro {
    position: fixed;
    bottom: 1.55rem;
    left: 50%;
    margin-left: -1.17rem;
    width: 2.34rem;
    height: 0.9rem;
    background: #000;
    color: #fff;
    font-size: 0.3rem;
    line-height: 0.9rem;
    text-align: center;
    border-radius: 0.1rem;
    .iconfont {
      margin-right: 0.14rem;
      color: rgb(0, 197, 73);
    }
  }

  @keyframes floated {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
    }
  }
  .swiper-pagination {
    bottom: 0;
  }
}
</style>