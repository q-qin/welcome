<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="withdrawBills" v-show="!loading">
	    	<table cellpadding="0" cellspacing="0">
	    		<colgroup>
	    		    <col width="35%">
	    		    <col width="35%">
	    		    <col width="30%">
	    		</colgroup>
	    		<thead>
	    			<tr>
	    				<th class="count">数额（元）</th>
	    				<th class="time">时间</th>
	    				<th class="type">状态</th>
	    			</tr>
	    		</thead>
	    		<tbody>
	    			<tr v-for="(item,$index) in list" :key="$index">
	    				<td class="count">{{item.record}}</td>
	    				<td class="time">{{item.addtime | ymd}}<br>{{item.addtime | hms}}</td>
	    				<td class="type">{{item.status | status}}</td>
	    			</tr>
	    		</tbody>
	    	</table>
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
	name: 'withdrawBills',
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
		 * 获取提现明细
    	 */
    	async init(){
	      	let rs = await ajax('post',this.$apiurl+'/account/tixian_record_for_h5',this.user);
      		if(rs && rs.code === 1001){
  				this.loading = false;
  				this.list = rs.data.rows;
      		}else if(rs && rs.code === 1003){
  				this.loading = false;
  				this.list = [];
      		}else{
      			this.$alert(rs.msg);
      		}
    	}
    },
    filters:{
    	status(value){
    		switch(value){
    			case 1:
    			return'提现中';
    			case 2:
    			return'完成';
    			case 3:
    			return'未通过';
    			default:
    			return '';
    		}
    	},
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
