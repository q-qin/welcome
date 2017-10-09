<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
				<el-col :span="5"><div class="data_list"><span class="data_num">{{apiCount}}</span> API请求量</div></el-col>
			</el-row>
		</section>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import dtime from 'time-formater'
	import {apiCount, userCount, orderCount, apiAllCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    export default {
    	data(){
    		return {
    			apiCount: null,
    			userCount: null,
    			orderCount: null,
                adminCount: null,
                allApiCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
    			sevenDay: [],
    			sevenDate: [[],[],[],[]],
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    		}
    		//this.getSevenData();
    	},
        computed: {

        },
    	methods: {
    		async initData(){
    			const today = dtime().format('YYYY-MM-DD')
    			// Promise.all([apiCount(today), userCount(today), orderCount(today), adminDayCount(today), apiAllCount(), getUserCount(), getOrderCount(), adminCount()])
                Promise.all([apiCount(today)])
    			.then(res => {
    				this.apiCount = res[0].data;
    				this.userCount = res[1].count;
    				this.orderCount = res[2].count;
                    this.adminCount = res[3].count;
                    this.allApiCount = res[4].count;
                    this.allUserCount = res[5].count;
                    this.allOrderCount = res[6].count;
                    this.allAdminCount = res[7].count;
    			}).catch(err => {
    				console.log(err)
    			})
    		},
    		async getSevenData(){
    			const apiArr = [[],[],[],[]];
    			this.sevenDay.forEach(item => {
    				//apiArr[0].push(apiCount(item))
    				// apiArr[1].push(userCount(item))
    				// apiArr[2].push(orderCount(item))
                    // apiArr[3].push(adminDayCount(item))
    			})
    			const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2], ...apiArr[3]]
    			Promise.all(promiseArr).then(res => {
    				const resArr = [[],[],[],[]];
					res.forEach((item, index) => {
						if (item.code == 0) {
							resArr[Math.floor(index/7)].push(item.count)
						}
					})
					this.sevenDate = resArr;
    			}).catch(err => {
    				console.log(err)
    			})
    		}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 24px;
                padding: 0 10px;
                color: #fff;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
