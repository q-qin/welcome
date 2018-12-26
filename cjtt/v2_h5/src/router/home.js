import index from '@/views/main/home/index.vue'
import form from '@/views/main/home/form.vue'
import detail from '@/views/main/home/detail.vue'

const routers = [{
        name: 'index',
        path: '/',
        meta: {
            title: '首页'
        },
        component: index
    },{
        name: 'form',
        path: '/form',
        meta: {
            title: '表单提交'
        },
        component: form
    },{
        name: 'detail',
        path: '/detail/:id',
        meta: {
            title: '查看详情'
        },
        component: detail
    },
]

export default routers