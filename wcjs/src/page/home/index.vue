<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
	    <div class="main">
	    	<div class="fenmian"></div>
	    </div>
	</div>
</template>

<script>
import nvHead from '@/components/header.vue';
import ajax from '@/config/ajax'

export default {
	name: 'home',
	data(){
		  return{
			   list:[],
		  }
	},
	components: {
  		nvHead,
	},
  created(){
        
  },
  mounted(){
      	console.log('app init')
      	setTimeout(() => {
	        this.$router.push({
	            name: 'list'
	        });
    	}, 1500);
  },
  methods:{
    
  }
}
</script>

<style lang="less" scoped>
	.main{
		width: 100vw;
		height: 100vh;
		.fenmian{
			width: 100%;
			height: 100%;
			margin-top: 5rem;
			display: block;
			background-image: url('../../images/index.png');
			background-size: 100%;
			background-repeat: no-repeat;
		}
	}
</style>
