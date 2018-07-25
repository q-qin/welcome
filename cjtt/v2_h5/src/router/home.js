import index from '@/views/main/home/index.vue'
import articleDetail from '@/views/main/home/articleDetail.vue'
import articleDetailAd from '@/views/main/home/articleDetailAd.vue'
import articleDetailClear from '@/views/main/home/articleDetailClear.vue'
import faq from '@/views/main/home/faq.vue'
import faqVideo from '@/views/main/home/faqVideo.vue'
import clause from '@/views/main/home/clause.vue'
import videoDetail from '@/views/main/home/videoDetail.vue'
import videoDetailClear from '@/views/main/home/videoDetailClear.vue'

const routers = [{
        name: 'index',
        path: '/',
        meta: {
            title: '首页'
        },
        component: index
    },
    {
        name: 'articleDetail',
        path: '/articleDetail/:id',
        meta: {
            title: '资讯详情'
        },
        component: articleDetail
    },
    {
        name: 'articleDetailAd',
        path: '/articleDetailAd/:id',
        meta: {
            title: '资讯详情'
        },
        component: articleDetailAd
    },
    {
        name: 'articleDetailClear',
        path: '/articleDetailClear/:id',
        meta: {
            title: '资讯详情纯净版'
        },
        component: articleDetailClear
    },
    {
        name: 'faq',
        path: '/faq',
        meta: {
            title: '常见问题'
        },
        component: faq
    },
    {
        name: 'faqVideo',
        path: '/faqVideo',
        meta: {
            title: '常见问题-视频'
        },
        component: faqVideo
    },
    {
        name: 'clause',
        path: '/clause',
        meta: {
            title: '用户协议'
        },
        component: clause
    },
    {
        name: 'videoDetail',
        path: '/videoDetail/:id',
        meta: {
            title: '视频详情'
        },
        component: videoDetail
    },
    {
        name: 'videoDetailClear',
        path: '/videoDetailClear/:id',
        meta: {
            title: '视频详情纯净版'
        },
        component: videoDetailClear
    }
]

export default routers