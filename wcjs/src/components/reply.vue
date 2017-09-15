<template>
    <section class="reply">
        <a class="button" @click="addReply">购买车辆信息</a>
    </section>
</template>
<script>
import $ from 'webpack-zepto';
import utils from '../libs/utils.js';
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
            $.ajax({
                type: 'POST',
                url: utils.apiUrl + '/wcjs/buy',
                data: { userid: this.userInfo.id, ladyid: this.$route.params.id },
                dataType: 'json',
                timeout: 5000,
                success: (res) => {
                    if (res.code === 0) {
                        this.$alert('购买成功');
                        setTimeout(() => {
                            history.go(0);
                        }, 1000);
                    } else if (res.code === -2) {
                        this.$alert(res.msg);
                        setTimeout(() => {
                            this.$router.push({
                                name: 'login',
                                params: {
                                    redirect: encodeURIComponent(this.$route.path)
                                }
                            });
                        }, 1000);
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
