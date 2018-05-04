import index from '@/views/main/home/index.vue'
import list from '@/views/main/home/list.vue'

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
            title: '小说列表'
        },
        component: list
    }
]

export default routers