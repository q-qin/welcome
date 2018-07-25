<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
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
			   iconLink:''
		  }
	},
	components: {
  		nvHead,
	},
  created(){
        
  },
  mounted(){
      console.log('app init')
      //setTimeout(()=>{ this.$router.push('tg_haibao') },0)
  },
  methods:{
    
  }
}
</script>

<style lang="less" scoped>
    @import '../../style/colors';

</style>
