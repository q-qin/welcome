<template>
    <div>
        <nv-head page-type="内容详情"
                :show-menu="showMenu"
                :need-add="true"
                :fix-head="true">
        </nv-head>

        <div id="page"
                :class="{'show-menu':showMenu}"
                v-if="detail._id">

            <h2 class="topic-title" v-text="detail.title"></h2>
            <section class="author-info">
                <!-- <div class="avatar" :class="detail.logo" ></div> -->
                <div class="col">
                    <span>{{detail.name}}</span>
                    <time>
                        发布于:{{detail.update_time | getLastTimeStr(true)}}
                    </time>
                </div>
                <div class="right">
                    <span class="tag"
                            :class="getTabInfo(detail.type, true)"
                            v-text="getTabInfo(detail.type, false)">
                    </span>
                </div>
            </section>

            <section class='markdown-body topic-content' >
                <!-- <p>车辆归属地：</p>
                <p class="pp" >{{detail.area}}</p>
                <p>车辆简介：</p>
                <p class="pp" v-html="detail.profile"></p>
                <p>车辆照片：</p>
                <p class="pp" v-if="detail.photo === '***'">***</p>
                <img v-if="detail.photo !== '***'" :src="detail.photo" />
                <p>联系方式：</p>
                <p class="pp" v-html="detail.contact"></p>
                <p>车辆价格：</p>
                <p class="pp" v-html="detail.description"></p> -->
                <p>摘要：</p>
                <p class="pp" >{{detail.sub_title}}</p>
                <p>正文：</p>
                <p class="pp" v-html="detail.description"></p>
            </section>

            
            <nv-top></nv-top>
            <nv-reply v-if="detail.profile === '***'"
                    :topic-id="ladyId">
            </nv-reply>
        </div>

        <div class='no-data' v-if="noData">
            <i class="iconfont icon-empty">&#xe60a;</i>
            该话题不存在!
        </div>
    </div>
</template>
<script>
    import $ from 'webpack-zepto';
    import utils from '../libs/utils.js';
    import nvHead from '../components/header.vue';
    import nvReply from '../components/reply.vue';
    import nvTop from '../components/backtotop.vue';
    import {
        mapGetters
    } from 'vuex';

    export default {
        data() {
            return {
                showMenu: false, // 是否展开左侧菜单
                detail: {}, // 主题
                noData: false,
                ladyId: '',
                curReplyId: ''
            };
        },
        computed: {
            ...mapGetters({
                userInfo: 'getUserInfo'
            })
        },
        mounted() {
            // 隐藏左侧展开菜单
            this.showMenu = false;

            // 获取url传的tab参数
            this.ladyId = this.$route.params.id;

            // 加载主题数据
            let userid = this.userInfo.id ? this.userInfo.id : 0;
            $.post(utils.apiUrl + '/news/detail', { tid: this.ladyId, uid: userid }, (d) => {
                if (d && d.code === 0 && d.data) {
                    this.detail = d.data;
                } else {
                    this.noData = true;
                }
            });
        },
        methods: {
            getTabInfo(type, isClass) {
                return utils.getTabInfo(type, isClass);
            },
            getLastTimeStr(time, ago) {
                return utils.getLastTimeStr(time, ago);
            },
            isUps(ups) {
                return $.inArray(this.userInfo.id, ups) >= 0;
            },
            addReply(id) {
                this.curReplyId = id;
                if (!this.userInfo.id) {
                    this.$router.push({
                        name: 'login',
                        params: {
                            redirect: encodeURIComponent(this.$route.path)
                        }
                    });
                }
            },
            hideItemReply() {
                this.curReplyId = '';
            }
        },
        components: {
            nvHead,
            nvReply,
            nvTop
        }
    };
</script>
