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
	    	<ul class="posts-list" >
    			<router-link v-for="item in list" :key="item.id" :to="{name:'detail',params:{id:item.id}}">
	    			<li class="clear">
	    				<img :src="item.img" height="100%">
	    				<span>{{item.name}}</span>
	    			</li>
    			</router-link>
	    	</ul>
	    	<div class="nodata" v-show="list.length == 0">
	    		暂无数据
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
import products from '@/json/products.json'

export default {
	name: 'a_detail',
	data(){
		return{
			loading:true,
			allLoaded:false,
			list:[],
			hots:[],
			news:[],
			alls:[],
			searchKey:{},
		}
	},
  	components: {
  		nvHead,
  		nvLoading,
  		nvTop
  	},
    created(){
  		this.alls = products;
		this.searchKey.tab = this.$route.query.tab?this.$route.query.tab:'all';
    	this.getlist();

      	products.forEach(n=>{
      		if(n.type === 1){
      			this.hots.push(n);
      		}
      		if(n.type === 2){
      			this.news.push(n);
      		}
      	})
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
				this.$route.meta.title="全部饮品"
    		switch(this.searchKey.tab){
    			case 'hot':
    				this.list = this.hots;
    				this.$route.meta.title="热销饮品"
    				break;
    			case 'new':
    				this.list = this.news;
    				this.$route.meta.title="新品上市"
    				break;
    			case 'all':
    				this.list = this.alls;
    				break;
    			case 'tea':
    				this.list = this.alls;
    				this.$route.meta.title="特色奶茶"
    				break;
    			case 'coffee':
    				this.list = [];
    				this.$route.meta.title="经典咖啡"
    				break;
    			default:
    				this.list = [];
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
			margin-top: 2.5rem;
		}
	}
	.posts-list {
	    background-color: #fff;
        a{
        	display: block;
        }
	    li {
	        margin: .25rem;
	        height: 20rem;
        	overflow: hidden;
        	position: relative;
        	border-radius: .15rem;
        	span{
        		position: absolute;
        		left: 0;
        		right: 0;
        		bottom: 0;
        		text-align: center;
        		display: block;
        		background: #000;
        		opacity: .7;
        		color:#fff;
        		line-height: 2rem;
        	}
	    }
	}
	.nodata{
		text-align: center;
		line-height: 2.5rem;
	}
</style>
