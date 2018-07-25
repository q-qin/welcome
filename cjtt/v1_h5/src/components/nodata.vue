<template>
	<div class="nodata" >
		<img src="../images/nodata.png">
		<span>抱歉，暂无数据</span>
	</div>
</template>

<script>
	export default {
		replace: true,
	}
</script>
<style  lang="less" scoped>
	.nodata{
		font-size: .32rem;
		text-align: center;
		padding-top: 2rem;
		img{
			width: 2.4rem;
			margin: 0 auto;
			display: block;
		}
		span{
			display: block;
			margin-top: .4rem;
			color: #999;
			font-size: .3rem;
		}
	}
</style>