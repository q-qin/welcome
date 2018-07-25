'use strict'
import App from '../App'

/*#####  主要业务 #####*/
// 首页
const home = r => require.ensure([], () => r(require('@/page/home')), 'home')
// 文章详情
const articleDetail = r => require.ensure([], () => r(require('@/page/home/articleDetail')), 'articleDetail')
// 文章详情_纯净的
const articleDetailClear = r => require.ensure([], () => r(require('@/page/home/articleDetailClear')), 'articleDetailClear')
// 视频详情
const videoDetail = r => require.ensure([], () => r(require('@/page/home/videoDetail')), 'videoDetail')
// 视频详情_纯净的
const videoDetailClear = r => require.ensure([], () => r(require('@/page/home/videoDetailClear')), 'videoDetailClear')
// 常见问题
const faq = r => require.ensure([], () => r(require('@/page/home/faq')), 'faq')
// 常见问题1
const faqVideo = r => require.ensure([], () => r(require('@/page/home/faqVideo')), 'faqVideo')
// 用户协议
const clause = r => require.ensure([], () => r(require('@/page/home/clause')), 'clause')
// 邀请列表
const inviteList = r => require.ensure([], () => r(require('@/page/home/inviteList')), 'inviteList')
// 邀请收益
const inviteIncome = r => require.ensure([], () => r(require('@/page/home/inviteIncome')), 'inviteIncome')

/*#####  用户体系 #####*/
// 零钱收益
const cash = r => require.ensure([], () => r(require('@/page/user/cash')), 'cash')
// 零钱明细
const cashBills = r => require.ensure([], () => r(require('@/page/user/cashBills')), 'cashBills')
// 积分收益
const score = r => require.ensure([], () => r(require('@/page/user/score')), 'score')
// 积分明细
const scoreBills = r => require.ensure([], () => r(require('@/page/user/scoreBills')), 'scoreBills')
// 积分兑换
const redeemOld = r => require.ensure([], () => r(require('@/page/user/redeemOld')), 'redeemOld')
const redeem = r => require.ensure([], () => r(require('@/page/user/redeem')), 'redeem')
// 兑换明细
const redeemBills = r => require.ensure([], () => r(require('@/page/user/redeemBills')), 'redeemBills')
// 兑换详情
const redeemDetail = r => require.ensure([], () => r(require('@/page/user/redeemDetail')), 'redeemDetail')
// 零钱提现
const withdraw = r => require.ensure([], () => r(require('@/page/user/withdraw')), 'withdraw')
// 提现明细
const withdrawBills = r => require.ensure([], () => r(require('@/page/user/withdrawBills')), 'withdrawBills')
// 收入及明细
const incomeBills = r => require.ensure([], () => r(require('@/page/user/incomeBills')), 'incomeBills')
// 邀请好友
const invitepupil = r => require.ensure([], () => r(require('@/page/user/invitepupil')), 'invitepupil')
// 面对面邀请
const invitepupilNearby = r => require.ensure([], () => r(require('@/page/user/invitepupilNearby')), 'invitepupilNearby')
// 兑换邀请码
const invitecodeExchange = r => require.ensure([], () => r(require('@/page/user/invitecodeExchange')), 'invitecodeExchange')
// 邀请码说明
const invitecodeDetail = r => require.ensure([], () => r(require('@/page/user/invitecodeDetail')), 'invitecodeDetail')

/*#####  活动 #####*/
// 签到活动
const taskCenter = r => require.ensure([], () => r(require('@/page/activities/taskCenter')), 'taskCenter')
// 签到活动new
const taskCenter1 = r => require.ensure([], () => r(require('@/page/activities/taskCenter.1')), 'taskCenter.1')
// 晒收入
const shareIncome = r => require.ensure([], () => r(require('@/page/activities/shareIncome')), 'shareIncome')
// 排行榜
const ranking = r => require.ensure([], () => r(require('@/page/activities/ranking')), 'ranking')
// 红包88888活动-old
const sendcrash = r => require.ensure([], () => r(require('@/page/activities/sendcrash')), 'sendcrash')
// 红包88888活动-new
const activesendcrash = r => require.ensure([], () => r(require('@/page/activities/sendcrash')), 'activesendcrash')
// 红包88888活动-徒弟列表
const sendcrashPupillist = r => require.ensure([], () => r(require('@/page/activities/sendcrashPupillist')), 'sendcrashPupillist')
// 新手阅读奖励
const noviceReadTask = r => require.ensure([], () => r(require('@/page/activities/noviceReadTask')), 'noviceReadTask')
// 注册成功
const registerSuccess = r => require.ensure([], () => r(require('@/page/activities/registerSuccess')), 'registerSuccess')
// 新手答题
const noviceAsk = r => require.ensure([], () => r(require('@/page/activities/noviceAsk')), 'noviceAsk')
// 1元活动tips
const noviceAskTips = r => require.ensure([], () => r(require('@/page/activities/noviceAskTips')), 'noviceAskTips')
// 愚人节活动
const aprilFoolsDay = r => require.ensure([], () => r(require('@/page/activities/aprilFoolsDay')), 'aprilFoolsDay')
// 愚人节活动
const aprilFoolsDayShare = r => require.ensure([], () => r(require('@/page/activities/aprilFoolsDayShare')), 'aprilFoolsDayShare')
export default [{
  path: '/',
  component: App,
  children: [{
    name: '',
    path: '',
    component: home
  }, {
    name: 'articleDetail',
    meta: {
      title: '资讯详情'
    },
    path: '/a_detail/:id',
    component: articleDetail,
  },{
    name: 'articleDetailClear',
    meta: {
      title: '资讯详情'
    },
    path: '/a_detail_c/:id',
    component: articleDetailClear,
  }, {
    name: 'videoDetail',
    meta: {
      title: '视频详情'
    },
    path: '/v_detail/:id',
    component: videoDetail
  },  {
    name: 'videoDetailClear',
    meta: {
      title: '视频详情'
    },
    path: '/v_detail_c/:id',
    component: videoDetailClear
  },{
    name: 'taskCenter',
    meta: {
      title: '签到活动'
    },
    path: '/qiandao',
    component: taskCenter
  },{
    name: 'taskCenter1',
    meta: {
      title: '签到活动1'
    },
    path: '/qiandao1',
    component: taskCenter1
  }, {
    name: 'shareIncome',
    meta: {
      title: '晒晒收入'
    },
    path: '/shai',
    component: shareIncome
  }, {
    name: 'sendcrash',
    meta: {
      title: '现金大派送'
    },
    path: '/sendcrash',
    component: activesendcrash
  }, {
    name: 'noviceReadTask',
    meta: {
      title: '新手阅读奖励'
    },
    path: '/noviceReadTask',
    component: noviceReadTask
  }, {
    name: 'registerSuccess',
    meta: {
      title: '注册成功'
    },
    path: '/registerSuccess',
    component: registerSuccess
  },{
    name: 'noviceAsk',
    meta: {
      title: '新手答题'
    },
    path: '/noviceAsk',
    component: noviceAsk
  },{
    name: 'noviceAskTips',
    meta: {
      title: '详细介绍'
    },
    path: '/noviceAskTips',
    component: noviceAskTips
  },{
    name: 'aprilFoolsDay',
    meta: {
      title: '愚人节活动'
    },
    path: '/aprilFoolsDay',
    component: aprilFoolsDay
  }, {
    name: 'aprilFoolsDayShare',
    meta: {
      title: '愚人节活动分享'
    },
    path: '/aprilFoolsDayShare',
    component: aprilFoolsDayShare
  },{
    name: 'sendcrashPupillist',
    meta: {
      title: '徒弟列表'
    },
    path: '/sendcrashPupillist',
    component: sendcrashPupillist
  }, {
    name: 'invitepupil',
    meta: {
      title: '邀请好友'
    },
    path: '/invite',
    component: invitepupil
  }, {
    name: 'invitecodeDetail',
    meta: {
      title: '邀请码说明'
    },
    path: '/invitecode_detail',
    component: invitecodeDetail
  }, {
    name: 'inviteList',
    meta: {
      title: '邀请列表'
    },
    path: '/inviteList',
    component: inviteList
  }, {
    name: 'inviteIncome',
    meta: {
      title: '邀请收益'
    },
    path: '/inviteIncome',
    component: inviteIncome
  }, {
    name: 'invitepupilNearby',
    meta: {
      title: '面对面邀请'
    },
    path: '/invitepupilNearby',
    component: invitepupilNearby
  }, {
    name: 'cash',
    meta: {
      title: '零钱'
    },
    path: '/cash',
    component: cash
  }, {
    name: 'invitecodeExchange',
    meta: {
      title: '邀请码'
    },
    path: '/invite_code',
    component: invitecodeExchange
  }, {
    name: 'cashBills',
    meta: {
      title: '零钱明细'
    },
    path: '/cashBills',
    component: cashBills
  }, {
    name: 'score',
    meta: {
      title: '积分'
    },
    path: '/score',
    component: score
  }, {
    name: 'scoreBills',
    meta: {
      title: '积分明细'
    },
    path: '/scoreBills',
    component: scoreBills
  }, {
    name: 'redeemOld',
    meta: {
      title: '积分兑换'
    },
    path: '/jfdh',
    component: redeemOld
  },{
    name: 'redeem',
    meta: {
      title: '积分兑换'
    },
    path: '/redeem',
    component: redeem
  }, {
    name: 'redeemBills',
    meta: {
      title: '兑换列表'
    },
    path: '/redeemBills',
    component: redeemBills
  }, {
    name: 'redeemDetail',
    meta: {
      title: '兑换详情'
    },
    path: '/redeemDetail/:id',
    component: redeemDetail
  }, {
    name: 'withdraw',
    meta: {
      title: '零钱提现'
    },
    path: '/withdraw',
    component: withdraw
  }, {
    name: 'withdrawBills',
    meta: {
      title: '提现明细'
    },
    path: '/withdrawBills',
    component: withdrawBills
  }, {
    name: 'faq',
    meta: {
      title: '新人问答'
    },
    path: '/faq',
    component: faq
  },{
    name: 'faqVideo',
    meta: {
      title: '常见问题视频'
    },
    path: '/faqVideo',
    component: faqVideo
  },
   {
    name: 'clause',
    meta: {
      title: '用户协议'
    },
    path: '/clause',
    component: clause
  }, {
    name: 'ranking',
    meta: {
      title: '收入排行榜'
    },
    path: '/ranking',
    component: ranking
  }, {
    name: 'incomeBills',
    meta: {
      title: '我的收入'
    },
    path: '/user_income/:type',
    component: incomeBills
  }]
}]
