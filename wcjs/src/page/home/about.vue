<template>
    <div >
    	<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="true"
	            :fix-head="true"
	            :show-back="true"
	            :show-menu="false"
	            :page-name="$route.meta.title" >
	    </nv-head>
        <div class="main" :class="{'fix-head':true}">
	        <dl class="about-info">
	            <dt>关于项目：</dt>
	            <dd>
	                江苏省各大城市的车辆信息，感谢各位车友的分享与支持，写代码不容易，老哥们赏个饮料钱。
	            </dd>
	            <dt>作者：</dt>
	            <dd>
	                js 阿强
	            </dd>
	            <dt>当前版本</dt>
	            <dd>V1.0</dd>
	        </dl>
        </div>
    </div>
</template>
<script>
    import nvHead from '@/components/header.vue';
    export default {
        components: {
            nvHead
        }
    };
</script>
<style lang="less" scoped>
	@import '../colors.less';
	.main{
		width: 100vw;
		height: 100vh;
		&.fix-head{
			margin-top: 2.2rem;
		}
	}
	.about-info {
		height: 100%;
		padding: 50px 15px;
		line-height: 1.5;
		background: #f7f7f7; 
	}
  	.about-info dt {
    	padding: 1em 0;
    	font-weight: bold; }
  	.about-info dd {
    	padding-bottom: 15px;
    	font-size: 14px;
    	border-bottom: 1px solid #d5dbdb; }
  	.about-info a {
    	color: #42b983; 
	}
</style>