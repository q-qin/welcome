<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="inviteIncome" v-show="!loading" >
	    	<ta ble cellpadding="0" cellspacing="0">
	    		<colgroup>
	    		    <col span="4" width="25%">
	    		</colgroup>
	    		<thead>
	    			<tr>
	    				<th class="user">用户ID</th>
	    				<th class="tel">手机号</th>
	    				<th class="type">类型</th>
	    				<th class="score">贡献金币</th>
	    			</tr>
	    		</thead>
	    		<tbody>
	    			<tr v-for="(item,$index) in list" :key="$index">
	    				<td class="user">{{item.userid}}</td>
	    				<td class="tel">{{item.phone}}</td>
	    				<td class="type">注册</td>
	    				<td class="score">0</td>
	    			</tr>
	    		</tbody>
	    	</ta>
	    	<nv-nodata v-show="list.length == 0"></nv-nodata>
	    </div>
	</div>
</template>
<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import nvNodata from '@/components/nodata.vue';
import ajax from '@/config/ajax'
import appcall from  '@/config/appcall'

export default {
	name: 'inviteIncome',
	data(){
		return{
			loading:true,
			list:[],
		}
	},
  	components: {
  		nvHead,
  		nvLoading,
  		nvNodata
  	},
    created(){
    },
    async mounted(){
 		this.getlist();
    },
    methods:{
    	/**
		 * 获取列表
    	 */
    	async getlist(){
    		let params = {};
			let comm = await appcall.getRequestData(params);

	      	let rs = await ajax('post',this.$apiurl+'/users/get_friend_list',comm,params);
      		if(rs && rs.code === 1001 ){
  				this.loading = false;
  				this.list = rs.data.list;
      		}else if(rs && rs.code === 1008){
  				this.loading = false;
  				this.list = [];
      		}else if(rs && rs.code == 1005){
    			this.$alert(rs.msg).then(ok=>{
    				appcall.login();
    			})
    		}else{
      			this.$alert(rs.msg);
      		}
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
		}
	}
</style>
