import index from '@/views/main/home/index.vue'
import list from '@/views/main/home/list.vue'
import detail from '@/views/main/home/detail.vue'
import about from '@/views/main/home/about.vue'

const routers = [{
        name: 'index',
        path: '/',
        meta: {
            title: '首页'
        },
        component: index
    },{
        name: 'list',
        path: '/list',
        meta: {
            title: '列表页面'
        },
        component: list
    },{
        name: 'about',
        path: '/about',
        meta: {
            title: '关于我们'
        },
        component: about
    },{
        name: 'detail',
        path: '/detail/:id',
        meta: {
            title: '详情页面'
        },
        component: detail
    }
]

export default routers