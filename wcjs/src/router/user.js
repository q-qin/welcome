import user from '@/views/main/user/user.vue'
import login from '@/views/main/user/login.vue'
import account from '@/views/main/user/account.vue'

const routers = [{
        name: 'index',
        path: '/',
        meta: {
            title: '用户中心'
        },
        component: user
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: login
    },
    {
        name: 'account',
        path: '/account',
        meta: {
            title: '用户中心'
        },
        component: account
    }
]

export default routers