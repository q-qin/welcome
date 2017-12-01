<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="true"
	            :fix-head="true"
	            :show-back="false"
	            :show-menu="true"
	            :page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="main" :class="{'fix-head':true}" v-show="!loading">
	    	<mt-loadmore  :top-method="loadTop"  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange" >
	    	<ul class="posts-list" >
    			<router-link v-for="item in list" :key="item.id" :to="{name:'detail',params:{id:item.id}}">
	    			<li >
	    				<img :src="item.img" height="100%">
	    				<span>{{item.name}}</span>
	    			</li>
    			</router-link>
	    	</ul>
	    	</mt-loadmore>
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
	name: 'a_detail',
	data(){
		return{
			loading:true,
			allLoaded:false,
			list:[],
			hot:[{
				id:1,
				name:'奶茶1号',
				img:require('../../images/tea1.jpg')
			},{
				id:2,
				name:'奶茶2号',
				img:require('../../images/tea1.jpg')
			}],
			new:[{
				id:3,
				name:'奶茶3号',
				img:require('../../images/tea1.jpg')
			},{
				id:4,
				name:'奶茶4号',
				img:require('../../images/tea1.jpg')
			}],
			all:[{
				id:1,
				name:'奶茶1号',
				img:require('../../images/tea1.jpg')
			},{
				id:2,
				name:'奶茶2号',
				img:require('../../images/tea1.jpg')
			},{
				id:3,
				name:'奶茶3号',
				img:require('../../images/tea1.jpg')
			},{
				id:4,
				name:'奶茶4号',
				img:require('../../images/tea1.jpg')
			}],
			searchKey:{},
		}
	},
  	components: {
  		nvHead,
  		nvLoading,
  		nvTop
  	},
    created(){
		this.searchKey.tab = this.$route.query.tab?this.$route.query.tab:'all';
    	this.getlist();
        
    },
  	computed: {
  		
  	},
    mounted(){
    },
    methods:{
    	handleTopChange: function (status) {
            this.topStatus = status;
        },
    	loadTop(){
    		if (this.loadingmore) {
			    return false
			}
			this.loadingmore = true
    		setTimeout(()=>{
    			this.$refs.loadmore.onTopLoaded();
    			this.loadingmore = false
    		},1500)
    	},
    	loadBottom(){
    		//this.$refs.loadmore.onBottomLoaded();
    	},
    	async getlist(){
    		switch(this.searchKey.tab){
    			case 'hot':
    				this.list = this.hot;
    				break;
    			case 'new':
    				this.list = this.new;
    				break;
    			case 'all':
    				this.list = this.all;
    				break;
    		}
    		setTimeout(()=>{
				this.loading = false;
    		},100)
    	},
    },
    watch: {
        // 切换页面
        '$route' (to, from) {
            // 如果是当前页面切换分类的情况
            if (to.query && to.query.tab) {
                this.searchKey.tab = to.query.tab;
                this.list = [];
				this.loading = true;
            }
            this.getlist();
            // 隐藏导航栏
            this.$refs.head.menuToggle = false;
        }
    },
}
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
	.posts-list {
	    background-color: #fff;
        a{
        	display: block;
        }
	    li {
	        margin: 0 .25rem .25rem .25rem;
	        height: 15rem;
        	overflow: hidden;
        	position: relative;
        	span{
        		position: absolute;
        		left: 0;
        		right: 0;
        		bottom: 0;
        		text-align: center;
        		display: block;
        		background: #000;
        		opacity: .5;
        		color:#fff;
        		line-height: 2rem;
        	}
	    }
	}
</style>
