<template>
    <div>
        <nv-head page-type="用户信息" :fix-head="true" :show-menu="false" :need-add="true" ></nv-head>
        <section class="userinfo">
            <div class="u-img" />
            <p>
                <p class="u-name" v-text="userInfo.username"></p>
                <br/>
                <p class="u-name red" >账户余额：￥{{balance}}</p>
            </p>
        </section>
        <section class="topics">
            <ul class="user-tabs">
                <li class="item selected" >已购性息</li>
            </ul>
            <div class="message" v-for="item in currentData">
                <section class="user">
                    <router-link class="info" :to="{name:'detail',params:{id:item.id}}">
                        <div class="t-title">{{item.name}}</div>
                        <span class="cl mt12">
                            <span class="name">{{item.area}}</span>
                        </span>
                        <span class="cr mt12">
                            <span class="name" >{{item.createtime | getLastTimeStr(true)}}</span>
                        </span>
                    </router-link>
                </section>
            </div>
            <div class="no-data" v-show="currentData.length === 0">
                <i class="iconfont icon-empty">&#xe60a;</i>
                暂无数据!
            </div>
        </section>
    </div>
</template>
<script>
    import $ from 'webpack-zepto';
    import utils from '../libs/utils.js';
    import nvHead from '../components/header.vue';
    import {
        mapGetters
    } from 'vuex';

    export default {
        data() {
            return {
                user: {},
                currentData: [],
                selectItem: 1,
                balance: 0
            };
        },
        mounted() {
            this.getUser();
        },
        computed: {
            ...mapGetters({
                userInfo: 'getUserInfo'
            })
        },
        methods: {
            getLastTimeStr(date, friendly) {
                return utils.getLastTimeStr(date, friendly);
            },
            getUser() {
                console.log(this.userInfo.id);
                let userInfo = this.userInfo;
                if (!userInfo.id) {
                    this.$alert('缺少用户名参数');
                    this.$router.push({
                        path: '/'
                    });
                    return false;
                }
                $.post('http://115.159.63.110:4001/appbalance/', {userid: this.userInfo.id}, (d) => {
                    if (d && d.code === 0 && d.data) {
                        let data = d.data;
                        this.balance = data[0].balance;
                    }
                });
                $.post('http://115.159.63.110:4001/apporder', {userid: userInfo.id}, (d) => {
                    if (d && d.data) {
                        let data = d.data;
                        this.user = data;
                        if (data.length > 0) {
                            this.currentData = data;
                        }
                    }
                });
            }
        },
        watch: {
            // 切换页面
            '$route' (to, from) {
                this.getUser();
            }
        },
        components: {
            nvHead
        }
    };
</script>
