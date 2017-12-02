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

/*#####  推广相关  ####*/
const tuiguang = r => require.ensure([], () => r(require('@/page/tuiguang/huadong')), 'tuiguang')

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
        name:'tuiguang',
        meta:{
            title:'推广页面'
        },
        path: '/tuiguang',
        component: tuiguang,
    },{
        name:'list',
        meta:{
            title:'玉点喜茶列表'
        },
        path: '/list',
        component: list,
    },{
        name:'detail',
        meta:{
            title:'玉点喜茶详情'
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