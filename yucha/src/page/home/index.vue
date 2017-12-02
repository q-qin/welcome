<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false">
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="main" v-show="!loading">
	    	<div class="swiper">
		    	<mt-swipe :auto="3000">
				  <mt-swipe-item>
				  	<img src="../../images/banner1.jpg">
				  </mt-swipe-item>
				  <mt-swipe-item>
				  	<img src="../../images/banner2.jpg">
				  </mt-swipe-item>
				</mt-swipe>
	    	</div>
	    	<div class="spacer"></div>
	    	<div>
		    	<mt-cell title="热销饮品" to="/list?tab=hot" is-link value="更多">
				</mt-cell>
	    	</div>
			<ul class="items clear">
				<li class="item left" v-for="item in hots">
					<router-link :key="item.id" :to="{name:'detail',params:{id:item.id}}">
						<img :src="item.img" height="100%">
						<span>{{item.name}}</span>
					</router-link>
				</li>
			</ul>
			<div>
		    	<mt-cell title="新品上市" to="/list?tab=new" is-link value="更多">
				</mt-cell>
			</div>
			<ul class="items clear">
				<li class="item left" v-for="item in news">
					<router-link :key="item.id" :to="{name:'detail',params:{id:item.id}}">
						<img :src="item.img" height="100%">
						<span>{{item.name}}</span>
					</router-link>
				</li>
			</ul>
			<div class="more">
				<router-link to="list">
					— 查看全部饮品 —
				</router-link>
			</div>
			<ul class="footer clear">
				<li class="item left" @click="jiamubiao">
					价目表
				</li>
				<li class="item left" @click="dianpu">
					店内环境
				</li>
				<li class="item left">
					<router-link to="/about">关于我们</router-link>	
				</li>
			</ul>
			<mt-popup v-model="jmbPop" position="left" popup-transition="popup-fade">
				<div >
					<img src="../../images/jiamubiao.jpg" height="100%">
				</div>
			</mt-popup>
			<mt-popup v-model="dpPop" position="left" popup-transition="popup-fade">
				<div >
					<img src="../../images/diannei.jpg" height="100%">
				</div>
			</mt-popup>
	    </div>
	</div>
</template>

<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import ajax from '@/config/ajax'
import products from '@/json/products.json'

export default {
	name: 'home',
	data(){
	  	return{
	  		loading:true,
	   		jmbPop:false,
	   		dpPop:false,
	   		hots:[],
	   		news:[],
	  	}
	},
	components: {
  		nvHead,
  		nvLoading
	},
  created(){
        if(!sessionStorage.getItem('tuiguang')){
        	this.$router.push('/tuiguang');
        }
  },
  async mounted(){
      	console.log('app init')
      	setTimeout(()=>{ this.loading = false; },100)

      	products.forEach(n=>{
      		if(n.type === 1){
      			this.hots.push(n);
      		}
      		if(n.type === 2){
      			this.news.push(n);
      		}
      	})
  },
  methods:{
  	jiamubiao(){
  		this.jmbPop = true;
  	},
  	dianpu(){
  		this.dpPop = true;
  	}
  }
}
</script>

<style lang="less" scoped>
	.mint-cell:last-child{
		background-position:top;
	}
	.main{
		width: 100vw;
		height: 100vh;
		.swiper{
			width: 100%;
			height: 9rem;
			display: block;
		}
		.mint-cell{
			border-top:1px solid #f2f2f2;
		}
		.items{
			margin-bottom: .5rem;
			.item{
				width: 6.25rem;
				height: 5rem;
				display: block;
				position: relative;
				img{
					width: 4rem;
					margin: auto;
					position: absolute;
					left: 0;
					right: 0;

				}
				span{
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					text-align: center;
					background: #000;
					opacity: .7;
					border-radius: .5rem;
					font-size: .5rem;
					margin: 0 .5rem 0 .5rem;
					padding: .05rem 0 .05rem 0;
					color:#fff;
				}
			}
		}
		.more{
			text-align: center;
			line-height: 3rem;
			a{
				color:#999;
			}
		}
		.footer{
			height: 2.5rem;
			line-height: 2.5rem;
			.item{
				width: 6.25rem;
				font-size: .75rem;
				text-align: center;
				color:#666;
				a{
				color:#666;
				}
			}
		}
	}
</style>
