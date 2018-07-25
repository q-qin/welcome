<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="withdraw" v-show="!loading">
	    	<div class="top">
	    		<router-link to="/faq">
		    		<i class="tishi"></i>
		    		为什么很多好友每天能获得上百零钱? 新手必看
		    		<i class="sicon next"></i>
	    		</router-link>
	    	</div>
	    	<div class="spacer"></div>
	    	<div class="item ">
	    		<i class="icon"></i>
	    		<span>申请提现</span>
	    		<span class="right">
	    			<router-link to="/tixian_mingxi">提现记录</router-link><!-- <i class="sicon next"></i> -->
	    		</span>
	    	</div>
	    	<div class="mdl">
	    		<div class="ico">￥</div>
	    		<input type="tel" placeholder="请输入提现金额" :model="money" :value="money" @input="money=$event.target.value">
	    		<span class="right">
	    			<span class="btn" @click="all">全部提现</span><!-- <i class="sicon next"></i> -->
	    		</span>
	    	</div>
	    	<div class="item tip" v-show="showtip">
	    		提现 <span class="red">{{money}}</span> 元消耗 <span class="red">{{money * 300}}</span> 金币
	    	</div>
	    	<div class="spacer"></div>
	    	<div class="item ">
	    		<i class="yicon"></i>
	    		<span>提现方式</span>
	    	</div>
	    	<div class="item zfb">
	    		<div class="radiolist">
	    			<span class="radio">
	    				<input type="radio" checked class="radio-input" value="zfb">
	    				<span class="radio-core"></span>
	    			</span>
	    			<span class="radio-label">支付宝</span>
	    		</div>
	    	</div>
	    	<div class="content">
	    		<div class="btn" @click="tixian">
	    			申请提现
	    		</div>
	    		<div class="desc">
	    			<p>1.周一到周五每天可正常提现；周六周日申请的提现，下周一进行处理；</p>
	    			<p>2.当前只可提现到支付宝，申请提现后，如长时间（周一到周五正常上班时间）没有得到处理，请加QQ群：462313024.</p>
	    		</div>
	    	</div>
	    </div>
	</div>
</template>
<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import ajax from '@/config/ajax';
import appcall from '@/config/appcall';

export default {
	name: 'withdraw',
	data(){
		return{
			loading:false,
			money:'',
			showtip:false,
			user:{},
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
		 * 获取提现信息
    	 */
    	async init(){
	      	let rs = await ajax('post',this.$apiurl+'/account/get_tixian_info_for_h5',this.user);
      		if(rs && rs.code === 1001){
  				this.loading = false;
  				this.detail = rs.data;
      		}else{
      			this.$alert(rs.msg);
      		}
    	},
    	all(){
    		this.money = parseInt(this.detail.balance_cash)+'';
    	},
    	/**
		 * 提现动作
    	 */
    	async tixian(){
    		if(!this.money){
		        this.$alert('请输入提现金额！');
		        return;
    		}
    		// if (Number(this.money < 10)) {
		    //     this.$alert('提现最低金额为10元！');
		    //     return;
		    // }
    		if(Number(this.money) > Number(this.detail.balance_cash)){
    			this.$alert('提现金额不能大于余额！');
		        return;
    		}
		    let params = {
		    	uid:this.user.uid,
		    	token:this.user.token,
		    	input_money:this.money,
		    }
		    let rs = await ajax('post',this.$apiurl+'/account/apply_tixian_for_h5',params);
      		if(rs && rs.code === 1001){
      			this.$alert('提现申请成功').then(rs=>{
      				this.$router.push('/tixian_mingxi');
      			})
      		}else if(rs && rs.code === 1006){
      			this.$confirm(rs.msg,'温馨提示',{confirmButtonText:'去赚金币'}).then(ok=>{
      				// JKEventHandler.removeAllCallBacks();
      				// JKEventHandler.callNativeFunction('gototask','{}','')
      				appcall.navigator({
                        title:'任务系统',
                        url:this.$h5url+'qiandao',
                    })
      			},no=>{})
      		}else{
      			this.$alert(rs.msg);
      		}
    	}
    },
    computed:{
    },
    watch:{
    	money:function(val,oldval){
    		this.money = this.money.replace(/[^\d]/g,'');
    		if(this.money.length>8){
    			this.money = this.money.substr(0,8);
    		}
    		if(val >0){
    			this.showtip= true;
    		}else{
    			this.showtip = false;
    		}
    	}
    }
}
</script>

<style lang="less" scoped>
    @import '../../style/colors';

	::-webkit-input-placeholder{
		font-size: 1rem;
	}
	.withdraw{
		width: 100vw;
		height: 100vh;
		background: @mbg;
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
	.mdl{
	    background-color: #fff;
	    height: 3.5rem;
	    line-height: 3.5rem;
	    position: relative;
	    .ico{
	    	font-size: 1.5rem;
	    	margin:0 .5rem 0 .5rem;
	    	vertical-align: middle;
	    	float: left;
	    	color:#666;
	    }
    	input{
    		height: 3.5rem;
    		line-height: 3.5rem;
    		font-size: 1.1rem;
    		float: left;
    	}
	    .right{
	    	position: absolute;
	    	right: .5rem;
	    	a{
	    		color:#999;
	    	}
	    	.btn{
	    		color:#59c1bd;
	    		font-size: .7rem;
	    	}
	    }
	}
	.item{
	    height: 2.5rem;
	    line-height: 2.5rem;
	    font-size: 1rem;
	    background-color: #fff;
	    border-bottom: 1px solid @mbg;
	    font-size: .75rem;
	    .yicon{
	    	width: 1.5rem;
		    height: 1.5rem;
		    margin: .5rem;
		    display: block;
		    float: left;
		    background-image: url('../../images/icon_tixian.png');
		    background-size: 100%;
		    background-repeat: no-repeat;
	    }
	    .icon{
	    	width: 1.5rem;
		    height: 1.5rem;
		    margin: .5rem;
		    display: block;
		    float: left;
		    background-image: url('../../images/icon_tixianjl.png');
		    background-position: center center;
		    background-size: 100%;
		    background-repeat: no-repeat;
	    }
	    .right{
	    	padding-right: .5rem;
	    	position: relative;
	    	a{
	    		color:#999;
	    	}
	    	.btn{
	    		background: @mcolor;
	    		padding: .25rem .5rem .25rem .5rem;
	    		border-radius: .5rem;
	    		color:#fff;
	    		font-size: .65rem;
	    	}
	    }
	    &.tip{
	    	padding-left: .5rem;
	    	color:#999;
	    	font-size: .7rem;
	    	.red{
	    		color:@mcolor;
	    	}
	    }
	}
	.content{
		padding-top: 1.5rem ;
		.btn{
			width: 17.75rem;
			height: 2.25rem;
			line-height: 2.25rem;
			border-radius: .25rem;
			background: @mcolor;
			text-align: center;
			margin: 0 auto;
			color:#fff;
		}
		.desc{
			width: 17.75rem;
			margin: 0 auto;
			margin-top: 1rem;
			p{
				font-size: .7rem;
				color: #999;
			}
		}
	}
	.radio{
		margin:0 .5rem 0 .75rem;
	}
	.radio-input{
		display: none;
	}
	.radio-core{
		box-sizing: border-box;
	    display: inline-block;
	    background-color: #fff;
	    border-radius: 100%;
	    border: 1px solid #ccc;
	    position: relative;
	    width: 20px;
	    height: 20px;
	    vertical-align: middle;
	}
	.radio-core::after{
		content: " ";
	    border-radius: 100%;
	    top: 5px;
	    left: 5px;
	    position: absolute;
	    width: 8px;
	    height: 8px;
	    -webkit-transition: -webkit-transform .2s;
	    transition: -webkit-transform .2s;
	    transition: transform .2s;
	    transition: transform .2s, -webkit-transform .2s;
	    -webkit-transform: scale(0);
	    transform: scale(0);
	}
	.radio-input + .radio-core{
		background-color:#fff;
		border-color:#f2f2f2;
	}
	.radio-input:checked + .radio-core{
		background-color:#fff;
		border-color:@mcolor;
	}
	.radio-input:checked + .radio-core::after{
		background-color: @mcolor;
	    -webkit-transform: scale(1);
	    transform: scale(1);
	}
	.radio-label{
		vertical-align: middle;
	}
</style>
