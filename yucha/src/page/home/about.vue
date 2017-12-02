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
	            <dt>店铺地址：</dt>
	            <dd>
	                曼哈顿广场
	            </dd>
	            <dt>3公里内送茶上门：</dt>
	            <dd>
	                13812786424
	            </dd>
	            <dt>地点坐标：</dt>
	            <dd >
	            	<div class="location">
	            		
	            	</div>
	            </dd>
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
	.location{
		width: 17.25rem;
		height: 12.24rem;
		background: url('../../images/location.png') no-repeat center center ;
		background-size: 100%;
	}
</style>