<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="true"
	            :fix-head="false"
	            :show-back="true"
	            :show-menu="false"
	            :page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div v-show="!loading">
	    	<div class="content" >
	    		<h1 >{{detail.title}}</h1>
	    		<div class="tt">
	    			<span class="region">{{detail.sub_title}}</span> 
	    			<span class="time">{{detail.update_time | getLastTimeStr}}</span>
	    		</div>
	    		<div class="article_content" :style="height" v-html="detail.description">
	    			
	    		</div>
	    		<div class="load_all" v-show="!loadall">
	    			<a @click="showall">展开显示全文 <i class="zhankai"></i> </a>
	    			<em></em>
	    		</div>
	    	</div>
	    </div>
	    <nv-top></nv-top>
	</div>
</template>

<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import nvTop from '@/components/backtotop.vue';
import {mapState} from 'vuex';
import ajax from '@/config/ajax';

export default {
	name: 'detail',
	data(){
		return{
			loading:true,
			height:'height:2rem;',
			loadall:false,
			detail:{},
			id:0,
		}
	},
  	components: {
  		nvHead,
  		nvLoading,
  		nvTop
  	},
    created(){
        
    },
  	computed: {
  		...mapState(['userinfo'])
  	},
    mounted(){
    	let params ={
    		tid:this.$route.params.id,
    		uid:this.userinfo.uid,
    	}
		ajax('post',this.$apiurl+'/news/detail',params).then(rs=>{
	  		if(rs && rs.code === 0 && rs.data){
					this.loading = false;
					this.detail = rs.data;
	  		}else{
	  			this.$alert(rs.msg);
	  		}
	  	})
    },
    methods:{
    	showall(){
    		this.loadall = true;
    		this.height = 'height:auto';
    	},
    },
    filters: {
    	getLastTimeStr(dateStr){
    		let date = new Date(dateStr);
    		let yyyy = date.getFullYear(),
    			MM = date.getMonth() +1,
    			dd = date.getDate(),

    			HH = date.getHours(),
    			mm = date.getMinutes(),
    			ss = date.getSeconds();
    		return yyyy+'/'+MM+'/'+dd +' '+HH+':'+mm+':'+ss;
    	}
    },
}
</script>

<style lang="less" scoped>
	@import '../colors.less';
	.content{
		overflow: hidden;
		width: 100vw;
		padding: 1rem .5rem 0 .5rem;
		.tt{
			height: 2.15rem;
			line-height: 2.15rem;
			font-size: .7rem;
		}
		.region{
			color:#999;
			margin-right: .5rem;
		}
		.time{
			color:#999;
		}
		.article_content{
			overflow: hidden;
			.img{
				width: 100%;
			}
		}
		.load_all{
            position: relative;
			width: 100%;
            height: 3rem;
            margin-top:-1rem;
		}
		.load_all a{
			width: 14.5rem;
            height: 2.25rem;
            border:1px solid @mcolor;
            border-radius: .25rem;
            display: block;
            line-height: 2.25rem;
            text-align: center;
            color:@mcolor;
            margin:2rem auto;
            font-size: .85rem;
            position: relative;
            left: 0;
            right: 0;
            bottom: 0;
            i.zhankai{
            	width: .75rem;
            	height: .6rem;
            	display: inline-block;
            	background-image: url('../../images/zhankai.png');
            	background-size: 100%;
            	background-repeat: no-repeat;
            }
		}
		.load_all em{
            position: absolute;
            top: -3rem;
            left: 0;
            width: 100%;
            display: block;
            height: 3rem;
            background: -webkit-linear-gradient(top,rgba(255,255,255,0) 0,rgba(255,255,255,.8) 50%,rgba(255,255,255,.9) 55%,rgba(255,255,255,.93) 60%,rgba(255,255,255,.96) 65%,#FFF 100%);
        }
	}
</style>
