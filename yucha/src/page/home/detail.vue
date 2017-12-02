<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="true"
	            :fix-head="false"
	            :show-back="true"
	            :show-menu="false"
	            :page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div v-show="!loading">
	    	<div class="content" >
	    		<h3 >{{detail.name}}</h3>
                <br>
	    		<div class="">
	    			<img :src="detail.img">
	    		</div>
            </div>
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
import products from '@/json/products.json'

export default {
	name: 'detail',
	data(){
		return{
			loading:true,
			height:'height:20rem;',
			loadall:false,
			detail:{},
			id:0,
		}
	},
  	components: {
  		nvHead,
  		nvLoading,
  		nvTop
  	},
    created(){
        this.id = this.$route.params.id
    },
  	computed: {
  		...mapState(['userinfo'])
  	},
    mounted(){
        setTimeout(()=>{ this.loading = false;},100)
	  	this.getdetail();
    },
    methods:{
    	async getdetail(){
            products.forEach(n=>{
                if(n.id == this.id){
                    this.detail = n;
                }
            })
    	},
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
}
</script>

<style lang="less" scoped>
	@import '../colors.less';
	.content{
		overflow: hidden;
		width: 100vw;
		padding: 1rem .5rem 0 .5rem;
        h3{
            text-align: center;
        }
	}
</style>
