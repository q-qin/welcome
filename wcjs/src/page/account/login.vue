<template>
    <div class="login-page">
        <!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="true"
	            :fix-head="true"
	            :show-back="true"
	            :show-menu="false"
	            :page-name="$route.meta.title" >
	    </nv-head>
        <section class="page-body">
            <div class="label">
                <input class="txt" type="text" placeholder="帐号" v-model="username" maxlength="12">
            </div>
            <div class="label">
                <input class="txt" type="password" placeholder="密码" v-model="password" maxlength="36">
            </div>
            <div class="label">
                <a class="button" @click="logon">登录</a>
            </div>
        </section>
    </div>
</template>

<script>
    import nvHead from '@/components/header';
	import ajax from '@/config/ajax'

    export default {
        data() {
            return {
                username: '',
                password: ''
            };
        },
        methods: {
            logon() {
                if (this.username === '' || this.password === '') {
                    this.$alert('用户名密码不能为空！');
                    return false;
                }
                let params = {
                	username: this.username,
                	password: this.password
                }
                ajax('post',this.$apiurl+'/user/login',params).then(rs=>{
                	if(rs && rs.code === 0){
                		let user = {
                			id:1,
                			username:'vincent',
                			avatar_url:'http://r3.3keji.com/11_a1.png',
                			balance: 99
                		}
                		window.sessionStorage.user = JSON.stringify(user);
                		this.$store.dispatch('saveuserinfo', user);
                		let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                		this.$router.push({
                			path: redirect
                		})
                	}else{
                		this.$alert(rs.msg);
                	}
                }).catch(e=>{
                	this.$alert('系统繁忙，请稍后重试！');
                })
            }
        },
        components: {
            nvHead
        }
    };
</script>
<style lang="less" scoped>
    .page-body {
        padding: 50px 15px;
        min-height: 400px;
        background-color: #fff;
        .label {
            display: inline-block;
            width: 100%;
            margin-top: 15px;
            position: relative;
            left: 0;
            top: 0;
            .txt {
                padding: 12px 0;
                border: none;
                border-bottom: 1px solid #4fc08d;
                background-color: transparent;
                width: 100%;
                font-size: 14px;
                color: #313131;
            }
            .button {
                display: inline-block;
                width: 99%;
                height: 42px;
                line-height: 42px;
                border-radius: 3px;
                color: #fff;
                font-size: 16px;
                background-color: #4fc08d;
                border: none;
                border-bottom: 2px solid #3aa373;
                text-align: center;
                vertical-align: middle;
            }
            .file {
                position: absolute;
                top: 0;
                left: 0;
                height: 42px;
                width: 48%;
                outline: medium none;
                opacity: 0;
            }
        }
    }
</style>
