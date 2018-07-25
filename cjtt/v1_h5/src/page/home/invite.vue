<template>
	<div class="vInvite">
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
	    <div >
	    	<nv-loading :loading="loading"></nv-loading>
	    	<div class="main" v-show="!loading">
	    		<div class="top">
	    			<img src="../../images/bg1.jpg" width="100%">
	    		</div>
	    		<div class="list">
    				<router-link to="/invite_list">
		    			<div class="item">
		    				<img src="../../images/hy.png" >
		    				<p>我的好友</p>
			    				<!-- <span class="sicon next"></span> -->
			    			<i class="iconfont">&#xe6a7;</i>
		    			</div>
	    			</router-link>
    				<router-link to="/invite_income">
		    			<div class="item">
		    				<img src="../../images/sy.png" >
		    				<p>好友提供的收益</p>
		    					<!-- <span class="sicon next"></span> -->
			    			<i class="iconfont">&#xe6a7;</i>
		    			</div>
    				</router-link>
	    		</div>
	    		<div class="share">
	    			<div class="tp">
	    				<div class="middle">
	    					通过以下方式
	    					<br>
	    					邀请好友让您得更多
	    				</div>
	    			</div>
	    			<div class="md clearfix">
	    				<div class="share_item left weixin">
	    					<img src="../../images/wx.png" @click="wxshare">
	    					<div>微信邀请（推荐）</div>
	    				</div>
	    				<div class="share_item left pyq">
	    					<img src="../../images/pyq.png" @click="pyqshare">
	    					<div>朋友圈邀请</div>
	    				</div>
	    				<div class="share_item left mdm">
	    					<img src="../../images/mdm.png" @click="mdmshare">
	    					<div>面对面邀请</div>
	    				</div>
	    			</div>
	    		</div>
	    		<div class="spacer"></div>
	    		<div class="rule">
	    			<p class="red">【邀请规则】</p>
	    			<div class="content">
		    			<p class="tt">1.邀请好友奖励</p>
		    			<p class="txt">每成功一名好友，可获得<span class="red">3元</span>奖励，好友越多，奖励越多。</p>
		    			<p class="tt">2.阅读奖励</p>
		    			<p class="txt">每天认真阅读资讯，累计3篇以上系统会给予一定的金币奖励，保持平常心阅读，获得更多金币。</p>
		    			<p class="tt">3.提现无上限</p>
		    			<p class="txt">超过平台提现额度，可自由提现。</p>
		    			<img class="iconh" src="../../images/crown.png">
	    			</div>
	    		</div>
	    	</div>
	    </div>
	</div>
</template>
<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import ajax from '@/config/ajax'
import appcall from  '@/config/appcall'

export default {
	name: 'invite',
	data(){
		return{
			loading:true,
		}
	},
  	components: {
  		nvHead,
  		nvLoading
  	},
    created(){
    },
    async mounted(){
    	setTimeout(()=>{
    		this.loading = false;
    	},0)
    },
    methods:{
    	/**
		 * 微信好友邀请
    	 */
    	async wxshare(){
    		let params = {};
			let comm = await appcall.getRequestData(params);

    		let rs = await ajax('post',this.$apiurl+'/tasks/get_rand_domain_invite',comm,params);
			if(rs && rs.code === 1001){
    			let url = rs.data;
    			let params = {
    				type:1,
    				title:'我刚加入了超级头条，还不错，邀请你加入',
    				url:rs.data+'/register?uid='+this.appdata.uid,
    				desc:'轻松领零花，好玩又有趣',
    				images:'',
    			}
    			appcall.invite(params);
    		}else if(rs && rs.code == 1005){
    			this.$alert(rs.msg).then(ok=>{
    				appcall.login();
    			})
    		}else{
    			this.$alert(rs.msg);
    		}
    	},
    	/**
		 * 微信朋友圈邀请
    	 */
    	async pyqshare(){
    		let params = {
    			share_where:1,
    		};
    		let comm = await appcall.getRequestData(params);

    		let rs = await ajax('post',this.$apiurl+'/tasks/get_task_share_timeline',comm,params);
			if(rs && rs.code === 1001){
    			let images = rs.data.image.join(';');
    			let params = {
    				type:2,
    				title:'',
    				url:'',
    				desc:'免费送钱啦！看新闻能赚零花！随便攒攒就可以马上提现了~还等什么，感兴趣的朋友，可以扫／码一起来玩',
    				images:images,
    			}
    			appcall.invite(params);
    		}else if(rs && rs.code == 1005){
    			this.$alert(rs.msg).then(ok=>{
    				appcall.login();
    			})
    		}else{
    			this.$alert(rs.msg);
    		}
    	},
    	mdmshare(){
    		this.$router.push('invite_nearby');
    	}
    }
}
</script>

<style lang="less" scoped>
    @import '../../style/colors';
    .vInvite{
    	background: #fbf9f9;
    }
	.main{
		.top{
			margin-bottom: .1rem;
			img{
				display: block;
			}
		}
		.list{
			margin-bottom: .1rem;
			padding: 0 .2rem;
			background: #fff;
			.item{
				width: 100%;
				position: relative;
				padding: .32rem 0;
				border-top: 1px solid #eee;
				img{
					position: absolute;
					left: 0;
					top: .32rem;
					float: left;
					width: .4rem;
				}
				p{
					line-height: 2.5rem;
					padding-left: .6rem;
					font-size: .3rem;
					line-height: .4rem;
					color: #333;
				}
				.iconfont{
					position: absolute;
					top: .32rem;
					right: 0;
					color: #999;
					font-size: .3rem;
					line-height: .4rem;
				}
				.sicon{
					position: absolute;
					right: .65rem;
					padding-top:1rem;
					padding-bottom: 1rem;
				}
			}
			a:first-child .item{
				border-top: 0;
			}
		}
		.share{
			margin-bottom: .1rem;
			padding: .3rem .2rem .4rem;
			background: #fff;
			.tp{
				position: relative;
				margin-bottom: .5rem;
				.middle{
					width: 2.7rem;
					height: .68rem;
					font-size: .28rem;
					line-height: .34rem;
					margin: 0 auto;
					background: #fff;
					color: #333;
					text-align: center;
					position: relative;
				}
				&:before{
					content: '';
					width: 100%;
					height: 1px;
					background: @mcolor;
					display: block;
					position: absolute;
					top: 50%;
					left: 0;
				}
			}
			.md{
				.share_item{
					width: 33.333333%;
					text-align: center;
					font-size: .28rem;
					color: #333;
					img{
						width: 1rem;
						margin: 0 auto .3rem;
					}
				}
			}
		}
		.rule{
			text-align: center;
			padding: .3rem .2rem .7rem;
			background: #fff;
			.red{
				color: @mcolor;
				font-size: .3rem;
				margin-bottom: .2rem;
			}
			.content{
				border-radius: .3rem;
				border:1px solid #dacbba;
				position: relative;
				margin: 0 .15rem;
				padding: .44rem .3rem .2rem;
				.iconh{
					position: absolute;
					left: -.12rem;
					top: -.55rem;
					width: .65rem;
				}
				.tt{
					padding-top: .3rem;
					border-top: 1px dashed #c6beb6;
					text-align: left;
					font-size: .28rem;
					color: #666;
					margin-bottom: .2rem;
					&:first-child{
						border-top: 0;
						padding-top: 0;
					}
				}
				.txt{
					text-align: left;
					font-size: .28rem;
					line-height: .36rem;
					color: #999;
					margin-bottom: .2rem;
				}
			}
		}
	}
</style>
