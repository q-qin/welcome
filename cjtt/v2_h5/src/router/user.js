import user from '@/views/main/user/user.vue'
const routers = [{
        name: 'index',
        path: '/',
        meta: {
            title: '用户中心'
        },
        component: user
    },
]

export default routers