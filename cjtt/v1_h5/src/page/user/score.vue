<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="score" v-show="!loading">
	    	<div class="md">
	    		<div class="tt">昨日收益（分）</div>
	    		<div class="income">{{detail.yesterday_coin | decimal}}</div>
	    	</div>
	    	<div class="smd clearfix">
	    		<div class="item left">
	    			<div class="tticome">累计收益（分）</div>
	    			<div class="blicome">{{detail.accumulate_coin | decimal}}</div>
	    		</div>
				<div class="item left">
	    			<div class="tticome">金币余额（分）</div>
	    			<div class="blicome">{{detail.coin | decimal}}</div>
	    		</div>
	    		<div class="item left">
	    			<div class="tticome">兑换汇率</div>
	    			<div class="blicome">{{detail.coin_rate }}</div>
	    		</div>
	    	</div>
	    	<div class="top">
	    		<router-link to="/faq">
		    		<i class="tishi"></i>
		    		为什么很多好友每天能获得上万金币? 新手必看 
		    		<i class="sicon next"></i>
	    		</router-link>
	    	</div>
	    	<div class="spacer"></div>
	    	<div class="items">
	    		<router-link to="/score_mingxi">
		    		<div class="item">
		    			<div class="help"></div>
		    			金币明细
		    			<span class="sicon next"></span>
		    		</div>
	    		</router-link>
	    	</div>
	    	<div class="btn" @click="apply">金币兑换</div>
	    </div>
	</div>
</template>
<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import ajax from '@/config/ajax'
export default {
	name: 'score',
	data(){
		return{
			loading:true,
			detail:{

			},
			user:{}
		}
	},
  	components: {
  		nvHead,
  		nvLoading,
  	},
    created(){
        
    },
    mounted(){
    	JKEventHandler.removeAllCallBacks();
       	JKEventHandler.callNativeFunction('getuserinfo','{}',user=>{
     		this.user = JSON.parse(user);
     		this.init();
	 	})
    },
    methods:{
    	/**
		 * 获取金币明细
    	 */
    	async init(){
	      	let rs = await ajax('post',this.$apiurl+'/account/get_coin_and_cash_info_for_h5',this.user);
      		if(rs && rs.code === 1001){
  				this.loading = false;
  				this.detail = rs.data;
      		}else{
      			this.$alert(rs.msg);
      		}
    	},
    	/**
		 * 兑换动作
    	 */
    	async apply(){
    		let rs = await ajax('post',this.$apiurl+'/users/center',this.user);
      		if(rs && rs.code === 1001){
      			if(rs.data.has_withdraw_account == 1){
      				this.$router.push('/jfdh');
      			}else{
      				JKEventHandler.removeAllCallBacks();
			    	JKEventHandler.callNativeFunction('bindzfb',{type:2},'')
      			}
      		}else{
      			this.$alert(rs.msg);
      		}
    	}
    },
    filters:{
    }
}
</script>

<style lang="less" scoped>
    @import '../../style/colors';
	.score{
		width: 100vw;
		height: 100vh;
		background-color: @mbg;
	}
	.top{
		font-size: .6rem;
	    height: 2.5rem;
	    line-height: 2.5rem;
	    text-align: left;
	    font-size: .7rem;
	    background-color: #fff;
	    color:#59c1bd;
    	position: relative;
		.tishi{
			width: 1.5rem;
		    height: 1.5rem;
		    margin: .5rem;
		    float: left;
		    background-image: url('../../images/icon_help.png');
		    background-size: 100%;
		    background-repeat: no-repeat;
		}
		a{
	    	color:#59c1bd;
		}
    	i.sicon{
    		position: absolute;
    		top:.95rem;
    		bottom: .95rem;
    		right: .65rem;
    	}
	}
	.md{
		height: 5rem;
		text-align: center;
		background-color: @mcolor;
		.tt{
			color: @lcolor;
			height: 2.75rem;
			line-height: 2.75rem;
			font-size: .85rem;
		}
		.income{
			font-size: 1.2rem;
			color:#fff;
		}
	}
	.smd{
		height: 4rem;
		background-color: @mcolor;
		.item{
			width: 6.25rem;
			height: 4rem;
			display: block;
			text-align: center;
			.tticome{
				height: 2rem;
				line-height: 2rem;
				font-size: .6rem;
				color:@lcolor;
			}
			.blicome{
				height: 1.5rem;
				line-height: 1.5rem;
				font-size: .85rem;
				color:#fff;
			}
		}
	}
	.items{
		.item{
			height: 2.5rem;
			line-height: 2.5rem;
			font-size: .75rem;
			position: relative;
			background-color: #fff;
			.help{
				width: 1.5rem;
			    height: 1.5rem;
			    margin: .5rem;
			    float: left;
			    background-image: url('../../images/icon_score.png');
			    background-size: 100%;
			    background-repeat: no-repeat;
			}
			.sicon{
				position: absolute;
				top:.95rem;
				bottom: .95rem;
				right: .65rem;
			}
		}
	}
	.btn{
		width: 100%;
		height: 2.5rem;
		line-height: 2.5rem;
		position: absolute;
		bottom: 0;
		text-align: center;
		background-color: @mcolor;
		color:#fff;
		font-size: .85rem;
	}
</style>
