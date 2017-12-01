<template>
    <section id="sideBar" class="nav-list" :class="{'show':menuToggle}">
        <section class="list-ul">
            <router-link class="icon-quanbu iconfont item" :to="{'name':'list',query:{tab:'all'}}" >全部</router-link>
            <router-link class="icon-hao iconfont item" :to="{'name':'list',query:{tab:'tea'}}" >奶茶</router-link>
            <router-link class="icon-fenxiang iconfont item" :to="{'name':'list',query:{tab:'coffee'}}" >咖啡</router-link>
        </section>
    </section>
</template>
<script>
	import userInfo from './userinfo'
    export default {
        replace: true,
        props: ['menuToggle'],
        components: {
        	userInfo
        },
        methods:{
        	flushCom(){
        		this.$router.go(0);
        	}
        }
    };
</script>

<style lang="less" scoped>
    /*侧边栏*/
    
    .nav-list {
        position: fixed;
        top: 0;
        bottom: 0;
        left: -200px;
        width: 200px;
        background-color: #fff;
        color: #313131;
        transition: all .3s ease;
        z-index: 99;
        &.show {
            transform: translateX(200px);
        }
    }
    /*侧边栏列表*/
    
    .list-ul {
        margin: 0 24px;
        overflow: hidden;
        padding-top: 9%;
        .item {
            display: block;
            font-size: 14px;
            font-weight: 200;
            padding: 9% 0;
            text-align: left;
            text-indent: 1px;
            line-height: 15px;
            color: #313131;
            font-weight: 700;
            &:last-child {
                margin-bottom: 50px;
            }
            &:before {
                color: #2c3e50;
            }
        }
        .line {
            border-top: 1px solid #d4d4d4;
        }
    }
</style>