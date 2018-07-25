import user from '@/views/main/user/user.vue'
import redeem from '@/views/main/user/redeem.vue'
import redeemBills from '@/views/main/user/redeemBills.vue'
import redeemDetail from '@/views/main/user/redeemDetail.vue'
import incomeBills from '@/views/main/user/incomeBills.vue'
import incomeBillsV120 from '@/views/main/user/incomeBillsV120.vue'
import ranking from '@/views/main/user/ranking.vue'
import rankingV120 from '@/views/main/user/rankingV120.vue'
import invitepupil from '@/views/subject/invitepupil/invitepupil.vue'
import invitepupilOld from '@/views/main/user/invitepupil.vue'
import invitepupilNearby from '@/views/main/user/invitepupilNearby.vue'
import invitecodeDetail from '@/views/main/user/invitecodeDetail.vue'
import invitecodeExchange from '@/views/main/user/invitecodeExchange.vue'
import withdrawal from '@/views/main/user/withdrawal.vue'
const routers = [{
        name: 'index',
        path: '/',
        meta: {
            title: '用户中心'
        },
        component: user
    }, {
        name: 'redeem',
        path: '/redeem',
        meta: {
            title: '零钱兑换'
        },
        component: redeem
    }, {
        name: 'redeemBills',
        path: '/redeemBills',
        meta: {
            title: '兑换明细'
        },
        component: redeemBills
    }, {
        name: 'redeemDetail',
        path: '/redeemDetail/:id',
        meta: {
            title: '兑换详情'
        },
        component: redeemDetail
    },
    {
        name: 'incomeBills',
        path: '/incomeBills',
        meta: {
            title: '收入明细'
        },
        component: incomeBills
    },
    {
        name: 'incomeBillsV120',
        path: '/v120/incomeBills',
        meta: {
            title: '我的钱包'
        },
        component: incomeBillsV120
    },
    {
        name: 'ranking',
        path: '/ranking',
        meta: {
            title: '排行榜'
        },
        component: ranking
    },
    {
        name: 'ranking',
        path: '/v120/ranking',
        meta: {
            title: '排行榜'
        },
        component: rankingV120
    },
    {
        name: 'invitepupil',
        path: '/invitepupil',
        meta: {
            title: '邀请好友'
        },
        component: invitepupil
    },
    {
        name: 'invitepupilOld',
        path: '/invitepupilOld',
        meta: {
            title: '邀请好友'
        },
        component: invitepupilOld
    },
    {
        name: 'invitepupilNearby',
        path: '/invitepupilNearby',
        meta: {
            title: '面对面邀请'
        },
        component: invitepupilNearby
    },
    {
        name: 'invitecodeDetail',
        path: '/invitecodeDetail',
        meta: {
            title: '邀请码说明'
        },
        component: invitecodeDetail
    },
    {
        name: 'invitecodeExchange',
        path: '/invitecodeExchange',
        meta: {
            title: '邀请码兑换'
        },
        component: invitecodeExchange
    },
    {
        name: 'withdrawal',
        path: '/withdrawal',
        meta: {
            title: '我要提现'
        },
        component: withdrawal
    }
]

export default routers