<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="scoreList" v-show="!loading">
	    	<table cellpadding="0" cellspacing="0">
	    		<colgroup>
	    		    <col width="35%">
	    		    <col width="30%">
	    		    <col width="35%">
	    		</colgroup>
	    		<thead>
	    			<tr>
	    				<th class="type">收入来源</th>
	    				<th class="count">数量（分）</th>
	    				<th class="time">时间</th>
	    			</tr>
	    		</thead>
	    		<tbody>
	    			<tr v-for="(item,$index) in list" :key="$index">
	    				<td class="type">{{item.task_name}}</td>
	    				<td class="count">{{item.coin}}</td>
	    				<td class="time">{{item.addtime | ymd}}<br>{{item.addtime | hms}}</td>
	    			</tr>
	    		</tbody>
	    	</table>
	    	<div class="items clearfix tishi" v-show="list.length > 0">
	    		系统只保留最近3天的金币明细
	    	</div>
	    	<nv-nodata v-show="list.length == 0"></nv-nodata>
	    </div>
	</div>
</template>
<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import nvNodata from '@/components/nodata.vue';
import ajax from '@/config/ajax'
export default {
	name: 'scoreBills',
	data(){
		return{
			loading:true,
			list:[],
			user:{}
		}
	},
  	components: {
  		nvHead,
  		nvLoading,
  		nvNodata
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
      		let params = {
      			uid:this.user.uid,
      			token:this.user.token,
      			balance_type:'coin'
      		}
	      	let rs = await ajax('post',this.$apiurl+'/account/balance_list_for_h5',params);
      		if(rs && rs.code === 1001){
  				this.loading = false;
  				this.list = rs.data;
      		} else if(rs && rs.code === 1003){
  				this.loading = false;
  				this.list = [];
      		}else{
      			this.$alert(rs.msg);
      		}
    	}
    },
    filters:{
    	ymd(value){
    		value = value.replace(/-/g,"/");
	        return value.split(' ')[0];
	    },
	    hms(value){
    		value = value.replace(/-/g,"/");
	        return value.split(' ')[1];
	    }
    }
}
</script>

<style lang="less" scoped>
    @import '../../style/colors';
    table{
    	width: 100%;
    	th{
    		font-size: .3rem;
    		font-weight: normal;
    		padding: .35rem .1rem;
    		text-align: center;
    		color: #333;
    		border-left: 1px solid @mbg;
    		border-bottom: 1px solid @mbg;
    		&:first-child{
    			border-left: 0;
    		}
    	}
    	td{
    		font-size: .28rem;
    		padding: .35rem .1rem;
    		text-align: center;
    		color: #666;
    		border-left: 1px solid @mbg;
    		border-bottom: 1px solid @mbg;
    		&:first-child{
    			border-left: 0;
    		}
    		&.time{
    			font-size: .24rem;
    			color: #999;
    		}
    	}
    }
	.items{
		&.tishi{
    		padding: .35rem .1rem;
			font-size: .24rem;
    		text-align: center;
    		color: #999;
		}
	}
</style>
