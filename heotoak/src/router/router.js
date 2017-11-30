import App from '../App'

/*#####  主要业务 #####*/
// 首页
const home = r => require.ensure([], () => r(require('@/page/home')), 'home')
// 文章详情
const detail = r => require.ensure([], () => r(require('@/page/home/detail')), 'detail')
// 资讯列表
const list = r => require.ensure([], () => r(require('@/page/home/list')), 'list')
// 关于我们
const about = r => require.ensure([], () => r(require('@/page/home/about')), 'about')

/*#####  账户相关  ####*/
const login = r => require.ensure([], () => r(require('@/page/account/login')), 'login')
const user = r => require.ensure([], () => r(require('@/page/account/user')), 'user')

export default [{
    path: '/',
    component: App,
    children: [{
        name:'',
        meta:{
            title:'首页'
        },
        path: '',
        component: home
    },{
        name:'login',
        meta:{
            title:'登录'
        },
        path: '/login',
        component: login,
    },{
        name:'user',
        meta:{
            title:'用户中心'
        },
        path: '/user',
        component: user,
    },{
        name:'list',
        meta:{
            title:'奶茶列表'
        },
        path: '/list',
        component: list,
    },{
        name:'detail',
        meta:{
            title:'奶茶详情'
        },
        path: '/detail/:id',
        component: detail,
    },{
        name:'about',
        meta:{
            title:'关于我们'
        },
        path: '/about',
        component: about,
    }]
}]