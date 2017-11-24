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
	    		<li v-for="item in list" :key="item._id">
	    			<router-link :to="{name:'detail',params:{id:item._id}}">
	    				<h3 v-text="item.title"
                            :class="getTabInfo(item.type, true)"
                            :title="getTabInfo(item.type, false)">
                    	</h3>
                    	<div class="content">
	                        <div class="info">
	                            <p>
	                                <span class="name">
	                                    摘要：{{item.sub_title}}
	                                </span>
	                            </p>
	                            <p>
	                            	<span class="time">发布时间：{{item.update_time | getLastTimeStr}}</span>
	                            </p>
	                        </div>
                    	</div>
	    			</router-link>
	    		</li>
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
			searchKey:{
				offset:0,
				limit:20,
				tab:'all'
			},
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
  		
  	},
    mounted(){
    	this.getlist();
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
	    	let params ={
	    		offset:0,
	    		limit:20,
	    		tab:this.searchKey.tab,
	    	}
			let rs = await fetch(this.$apiurl+'/news/list',params)
	  		if(rs && rs.code === 0 && rs.data){
				this.loading = false;
				this.list = rs.data;
	  		}else{
	  			this.$alert(rs.msg);
	  		}
    	},
    	// 获取不同tab的样式或者标题
    	getTabInfo(type, isClass){
    		let str = '';
		    let className = '';
		    switch (type) {
		        case '0':
		            str = '置顶';
		            className = 'top';
		            break;
		        case '1':
		            str = '精华';
		            className = 'good';
		            break;
		        case '2':
		            str = '分享';
		            className = 'share';
		            break;
		        case '3':
		            str = '打假';
		            className = 'ask';
		            break;
		        default:
		            str = '暂无';
		            className = 'default';
		            break;
		    }
		    return isClass ? className : str;
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
    watch: {
        // 切换页面
        '$route' (to, from) {
            // 如果是当前页面切换分类的情况
            if (to.query && to.query.tab) {
                this.searchKey.tab = to.query.tab;
                this.searchKey.offset = 0;
                this.list = [];
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
	    li {
	        padding: .5rem .75rem;
	        border-bottom: 1px solid @mborder;
	    }
	    h3 {
	        &:before {
	            content: attr(title);
	            margin-right: 10px;
	            margin-top: -3px;
	            color: #fff;
	            border-radius: .2rem;
	            font-size: .5rem;
	            padding:.25rem .3rem;
	            text-align:center;
	            vertical-align:middle;
	        }
	        &.top:before {
	            background: #E74C3C;
	        }
	        &.ask:before {
	            background: #3498DB;
	        }
	        &.good:before {
	            background: #E67E22;
	        }
	        &.job:before {
	            background: #9B59B6;
	        }
	        &.share:before {
	            background: #1ABC9C;
	        }
	    }
	    .content {
	        padding-top: 10px;
	        display: flex;
	    }
	    .Audi{
	        background-image:url('../../images/car/Audi.png');
	    }
	    .Bentley{
	        background-image:url('../../images/car/Bentley.png');
	    }
	    .Benz{
	        background-image:url('../../images/car/Benz.png');
	    }
	    .BMW{
	        background-image:url('../../images/car/BMW.png');
	    }
	    .Buick{
	        background-image:url('../../images/car/Buick.png');
	    }
	    .Cadillac{
	        background-image:url('../../images/car/Cadillac.png');
	    }
	    .Ford{
	        background-image:url('../../images/car/Ford.png');
	    }
	    .Honda{
	        background-image:url('../../images/car/Honda.png');
	    }
	    .Infinity{
	        background-image:url('../../images/car/Infinity.png');
	    }
	    .Kia{
	        background-image:url('../../images/car/Kia.png');
	    }
	    .Lexus{
	        background-image:url('../../images/car/Lexus.png');
	    }
	    .Mazda{
	        background-image:url('../../images/car/Mazda.png');
	    }
	    .Mini{
	        background-image:url('../../images/car/Mini.png');
	    }
	    .Nisan{
	        background-image:url('../../images/car/Nisan.png');
	    }
	    .Skoda{
	        background-image:url('../../images/car/Skoda.png');
	    }
	    .Toyota{
	        background-image:url('../../images/car/Toyota.png');
	    }
	    .Volkswagen{
	        background-image:url('../../images/car/Volkswagen.png');
	    }
	    .info {
	        display: block;
	        width: 100%;
	        flex: 1;
	    }
	    p {
	        padding: 3px 0;
	        display: flex;
	        font-size: .75rem;

	        &:first-child {
	            font-size: .7rem;
	        }
	        .name{
	           display: block;
	           width: 100%;
	           flex: 1;
	        }
	        .time{
	           display: block;
	           	width: 100%;
	        	color:#666;
	        }
	        b {
	            color: #42b983;
	        }
	    }
	}
</style>
