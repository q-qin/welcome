<template>
    <div >
    	<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="false"
	            :show-back="false"
	            :show-menu="false"
	            :page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
        <div class="main"  v-show="!loading">
	        <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
				<!-- slides -->
				<swiper-slide class="swiper-item black">
				 	<p class="clear">2017
				 	<br>
				 	<br>
				 	发生了一件大事
				 	<br>
				 	<br>
				 	<br>
				 	👇
				 	</p>
				</swiper-slide>
				<swiper-slide class="swiper-item orange">
				 	<p class="clear">
				 	玉点喜茶开业了</p>
				 	<div class="jingz"></div>
				 	<div class="goHome">
				 		<router-link to="/">进入首页</router-link>	
				 	</div>
				</swiper-slide>
				<!-- Optional controls -->
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
        </div>
    </div>
</template>
<script>
	var emoji = require('emoji');
	require('swiper/dist/css/swiper.css')
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import nvHead from '@/components/header.vue';
	import nvLoading from '@/components/loading.vue';
    export default {
    	data(){
    		return{
    			loading:true,
    			swiperOption:{
    				direction: 'vertical',
			          slidesPerView: 1,
			          spaceBetween: 30,
			          mousewheel: true,
			          pagination: {
			            el: '.swiper-pagination',
			            clickable: true
			          }
    			},
    		}
    	},
    	created(){
    		sessionStorage.setItem('tuiguang','1');
    		console.log('😎', emoji.unifiedToHTML('😎'));
    		setTimeout(()=>{ this.loading = false; },100)
    	},
	  	computed: {
	      	swiper() {
		     	return this.$refs.mySwiper.swiper
		   	}
	    },
        components: {
            nvHead,
            nvLoading,
	  		swiper,
	 		swiperSlide
        }
    };
</script>
<style lang="less" scoped>
	@import '../colors.less';
	.main{
		width: 100vw;
		height: 100vh;
		&.fix-head{
			margin-top: 2.2rem;
		}
	}
	.swiper-box {
	    width: 100%;
	    height: 100%;
	    margin: 0 auto;
  	}
  	.swiper-item {
	    height: 100%;
	    text-align: center;
	    font-size: 18px ;
	    background: #fff;
	    /* Center slide text vertically */
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
  	}
  	.black{
  		background-color: #1b1b1b;
  		p{
  			font-size: 1.8rem;
  			width: 18.75rem;
  			display: block;
  			color:#fff;
  		}
  	}
  	.orange{
  		background-color: #f4e2d8;
  		p{
			font-size: 1.5rem;
			margin-top: -1rem;
  		}
		color:#666;
		position: relative;
		.jingz{
			position: absolute;
			width: 9rem;
			height: 9rem;
			bottom: 4rem;
			left:0;
			right: 0;
			margin: auto;
			background: url('../../images/jingz.png') no-repeat center center;
			background-size: 100%;
		}
		.goHome {
			position: absolute;
			margin:auto;
			left:0;
			right:0;
			bottom: 1rem;
			background-color: #006324;
			width: 7.5rem;
			height: 2.5rem;
			line-height: 2.5rem;
			a{
				color:#fff;
			}
		}
  	}
</style>