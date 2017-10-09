<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
				<el-col :span="24"><div class="data_list">今日 : <span class="data_num">{{today}}</span>  API请求量 : <span class="data_num">{{apiCount}}</span></div></el-col>
			</el-row>
		</section>
        <div class="table_container">
            <el-table :data="apiAll" highlight-current-row border style="width: 100%" >
                <el-table-column type="selection" width="45">
                </el-table-column>
                <el-table-column
                  property="id"
                  label="ID">
                </el-table-column>
                <el-table-column
                  property="origin"
                  label="来源">
                </el-table-column>
                <el-table-column
                  property="date"
                  label="日期">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination 
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange" 
                    :page-sizes="[10,20,50]"
                    :current-page="currentPage" 
                    :page-size="limit" 
                    layout="total, sizes, prev, pager, next, jumper" 
                    :total="apiCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import dtime from 'time-formater'
	import {apiCount,apiAllRecord} from '@/api/getData'
    export default {
    	data(){
    		return {
    			apiCount: null,
                apiAll:[],
                offset:0,
                limit:10,
                currentPage: 1,
                today:dtime().format('YYYY-MM-DD'),
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
    	},
        computed: {

        },
    	methods: {
    		async initData(){
                Promise.all([apiCount(this.today),apiAllRecord(this.today,this.offset,this.limit)])
    			.then(res => {
    				this.apiCount = res[0].data;
    				this.apiAll = res[1].data;
    			}).catch(err => {
    				console.log(err)
    			})
    		},
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.limit = val;
                this.initData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                console.log(this.currentPage, this.offset)
                this.getApis()
            },
            async getApis(){
                try {
                    const Apis = await apiAllRecord(this.today,this.offset,this.limit);
                    if(Apis.code ==0){
                        this.apiAll = Apis.data;
                    }else {
                        throw new Error('获取数据失败');
                    }
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
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
                color: #324057;
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
    .table_container{
        padding: 20px;
    }
</style>
