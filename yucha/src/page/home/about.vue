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
	    <nv-loading :loading="loading"></nv-loading>
        <div class="main" :class="{'fix-head':true}" v-show="!loading">
	        <dl class="about-info">
	            <dt>关于我们：</dt>
	            <dd>
	                玉点奶茶味道好。店铺地址：曼哈顿广场
	            </dd>
	            <dt>作者：</dt>
	            <dd>
	                阿强
	            </dd>
	            <dt>当前版本</dt>
	            <dd>V1.0</dd>
	        </dl>
        </div>
    </div>
</template>
<script>
    import nvHead from '@/components/header.vue';
	import nvLoading from '@/components/loading.vue';
    export default {
    	data(){
    		return{
    			loading:true,
    		}
    	},
    	created(){
    		setTimeout(()=>{ this.loading = false; },100)
    	},
        components: {
            nvHead,
            nvLoading
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