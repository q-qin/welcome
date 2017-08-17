<template>

    <section class="reply">
        <a class="button" @click="addReply">购买车辆信息</a>
    </section>

</template>
<script>
    import $ from 'webpack-zepto';
    import {
        mapGetters
    } from 'vuex';

    export default {
        replace: true,
        props: ['ladyId'],
        data() {
            return {
                hasErr: false,
                content: '',
                author_txt: ''
            };
        },
        computed: {
            ...mapGetters({
                userInfo: 'getUserInfo'
            })
        },
        mounted() {

        },
        methods: {
            addReply() {
                console.log(this.$route.params.id);
                $.ajax({
                    type: 'POST',
                    url: `http://115.159.63.110:4001/appbuy`,
                    data: {userid: this.userInfo.id, ladyid: this.$route.params.id},
                    dataType: 'json',
                    success: (res) => {
                        if (res.code === 0) {
                            this.$alert('购买成功');
                            setTimeout(() => {
                                history.go(0);
                            }, 1500);
                        } else {
                            this.$alert('购买失败');
                        }
                    },
                    error: (res) => {
                        this.$alert('请求异常，请稍后重试！');
                        return false;
                    }
                });
            }
        }
    };
</script>
