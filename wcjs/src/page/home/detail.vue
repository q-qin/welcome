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
	    		<div class="spacer"></div>
	    		<div class="others clear">
		    		<div class="title">
		    			<span>热门评论</span>
		    		</div>
		    		<ul>
		    			<li class="comment" v-show="comments.length>0" v-for="item in comments">
		    				<div class="head left" :class="{'mr':item.headmr}">
	                			<img :src="item.headimgurl" width="100%" v-show="!item.headmr">
	                			<div v-show="item.headmr"></div>
	                		</div>
	                		<div class="cm left">
	                			<span class="nickname">{{item.nickname}}</span>
	                			<span class="cmt">{{item.content | pinglun}}</span>
	                			<span class="created">{{item.created}}</span>
	                		</div>
		    			</li>
		    		</ul>
		    		<div class="nocomment" v-show="comments.length==0">
		    			暂无评论
		    		</div>
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
import fetch from '@/config/fetch';

export default {
	name: 'detail',
	data(){
		return{
			loading:true,
			height:'height:20rem;',
			loadall:false,
			detail:{},
			comments:[],
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
	  	this.getdetail();
	  	this.pulljd();
    },
    methods:{
    	async getdetail(){
	    	let params ={
	    		tid:this.$route.params.id,
	    		uid:this.userinfo.uid?this.userinfo.uid:'',
	    	}
			let rs = await fetch(this.$apiurl+'/news/detail',params)
			if(rs && rs.code === 0 && rs.data){
					this.loading = false;
					this.detail = rs.data;
	  		}else{
	  			this.$alert(rs.msg);
	  		}
    	},
    	showall(){
    		this.loadall = true;
    		this.height = 'height:auto';
    	},
    	async pulljd(){
    // 		let rs = await fetch(this.$apiurl+'/news/getcomments',{tid:this.$route.params.id}).catch(e=>{
    // 			console.log(e);
    // 		});
    // 		if(rs && rs.code === 0 && rs.data){
				// this.comments = rs.data;
	  	// 	}
    	}
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
			margin-bottom: .25rem;
			overflow: hidden;
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
	.others{
    	.title{
    		height: 2.5rem;
    		line-height: 2.5rem;
    		border-bottom: 1px solid @mbg;
	    	span{
	    		font-size: .85rem;
	    		margin-left: .25rem;
	    	}
	    }
	    .comment{
    		width: 100%;
    		height:4rem;
    		display: block;
    		border-bottom: 1px solid @mbg;
    		padding-top: .5rem;
    		.head{
    			width: 4.75rem;
    			height: 3rem;
    			img{
    				width: 2.5rem;
    				height: 2.5rem;
    				border-radius: 50%;
    				display:block;
    				margin: .25rem auto;
    			}
    			&.mr{
    				div{
	    				width: 2.5rem;
	    				height: 2.5rem;
	    				margin: .25rem auto;
    					background-color: #000;
    					opacity: .5;
    				}
    			}
    		}
    		.cm{
    			width: 13.25rem;
    			.nickname{
    				width: 100%;
					display: block;
    				font-size: .6rem;
    				color:#999;
    				height: 1rem;
    				line-height: 1rem;
    			}
    			.cmt{
    				width: 100%;
					display: block;
    				font-size: .75rem;
    				color:#666;
    				height: 1rem;
    				line-height: 1rem;
    				overflow:hidden;
    			}
    			.created{
    				width: 100%;
					display: block;
    				font-size: .6rem;
    				color:#999;
    				height: 1rem;
    				line-height: 1rem;
    			}
    		}
    	}
    	.nocomment{
    		text-align: center;
    		font-size: .85rem;
    		height: 3rem;
    		line-height: 3rem;
    		color:#999;
    	}
    }
</style>
