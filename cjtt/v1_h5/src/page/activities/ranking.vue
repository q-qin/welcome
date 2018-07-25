<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="ranking" v-show="!loading">
			<div class="rank_bg">
				<div class="top">
					<div class="week left" :class="{'active':key=='week'}" @click="getRank('week')">
						周排行
					</div>
					<div class="total right" :class="{'active':key=='total'}"  @click="getRank('total')">
						总排行
					</div>
				</div>
				<div class="bottom">
					<div class="box">
						<div class="content">
							<table cellpadding="0" cellspacing="0">
								<colgroup>
								    <col width="15">
								    <col width="30%">
								    <col width="25%">
								    <col width="30%">
								</colgroup>
								<thead>
									<tr>
										<th class="rank">排名</th>
										<th>用户</th>
										<th>好友数</th>
										<th>总收入(元)</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,$index) in list" :key="$index">
										<td class="rank" :class="{'one':$index==0,'two':$index==1,'three':$index==2}">{{$index+1}}</td>
										<td>{{item.nickname}}</td>
										<td>{{item.friends_num}}</td>
										<td>{{item.rank_income}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
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
	name: 'ranking',
	data(){
		return{
			loading:true,
			key:'',
			week:[],
			total:[],
			list:[],
		}
	},
  	components: {
  		nvHead,
  		nvLoading,
  	},
    created(){
    	this.getRank('total');
    },
    mounted(){},
    methods:{
    	/**
    	 * 获取排行榜list
    	 */
    	async getRank(key){
    		if(this.key != key){
    			if(key == 'week' ){
    				if(this.week.length ==0){
    					let params = {
    						type:1
    					};
						let comm = await appcall.getAppData();
    					let rs = await ajax('post',this.$apiurl+'/rank/users_income_tongji',comm,params);
    					if(rs && rs.code === 1001 && rs.data){
    						this.loading = false;
    						this.week = rs.data.list;
    					}else if(rs && rs.code === 1008){
    						this.loading = false;
    						this.week = [];
    					}else{
    						this.$alert(rs.msg);
    					}
    				}
    				this.list = this.week;
    			}
    			if(key == 'total'){
    				if(this.total.length ==0){
    					let params = {
    						type:2
    					};
						let comm = await appcall.getAppData();
	    				let rs = await ajax('post',this.$apiurl+'/rank/users_income_tongji',comm,params);
    					if(rs && rs.code === 1001 && rs.data){
    						this.loading = false;
    						this.total = rs.data.list;
    					}else if(rs && rs.code === 1008){
    						this.loading = false;
    						this.total = [];
    					}else{
    						this.$alert(rs.msg);
    					}
    				}
    				this.list = this.total;
    			}

				this.key = key;
    		}
    	}
    },
    filters:{}
}

</script>

<style lang="less" scoped>
    @import '../../style/colors';
	.ranking{
		background: #f4fcff url('../../images/activities/rank_top.png') no-repeat top center;
		background-size: 100%;
		padding-top: 5rem;
		.rank_bg{
			position: relative;
			.top{
				position: absolute;
				left: 0;
				top: -.6rem;
				width: 100%;
				.week{
					width: 3.23rem;
					height: 1.02rem;
					background: url('../../images/activities/rank_week.png') no-repeat center center ;
					background-size: 100%;
					text-align: center;
					font-size: .48rem;
					color: #8a64e9;
					line-height: .9rem;
					&.active{
						color: #fff;
						background-image:url('../../images/activities/rank_week_act.png');
					}
				}
				.total{
					width: 3.23rem;
					height: 1.02rem;
					background: url('../../images/activities/rank_total.png') no-repeat center center ;
					background-size: 100%;
					text-align: center;
					font-size: .48rem;
					color: #8a64e9;
					line-height: .9rem;
					&.active{
						color: #fff;
						background-image:url('../../images/activities/rank_total_act.png');
					}
				}
			}
			.bottom{
				background: #fff1ca;
				border-radius: .3rem;
				margin: 0 .2rem 0;
				padding: .6rem .15rem .6rem;
				.box{
					border-top: .09rem solid #ffca61;
					border-radius: .25rem .25rem 0 0;
					.content{
						border-top: .04rem solid #fff1ca;
						background: #fff;
						border-radius: .25rem;
						padding: .28rem .1rem;
						table{
							width: 100%;
							th{
								font-size: .36rem;
								line-height: .5rem;
								font-weight: normal;
								padding: 0 .05rem .2rem;
								text-align: center;
								color: #ffca61;
								border-bottom: 1px solid #ffca61;
							}
							td{
								font-size: .3rem;
								line-height: .4rem;
								padding: .2rem .05rem;
								text-align: center;
								color: #333;
								border-top: 1px solid #fce37d;
								&.rank{
									color:#FFCB11;
									&.one{
										background: url('../../images/activities/rank_one.png') no-repeat center center;
										background-size: .6rem;
										color: #fff;
									}
									&.two{
										background: url('../../images/activities/rank_two.png') no-repeat center center;
										background-size: .6rem;
										color: #fff;
									}
									&.three{
										background: url('../../images/activities/rank_three.png') no-repeat center center;
										background-size: .6rem;
										color: #fff;
									}
								}
							}
							tr:first-child td{
								border-top: 0;
							}
						}

					}
				}
			}
		}
	}
</style>
