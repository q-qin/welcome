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
		font-size: .8rem;
		text-align: center;
		padding-top: 5rem;
		img{
			width: 9.7rem;
			margin:auto;
			display: block;
		}
		span{
			display: block;
			margin-top: 2rem;
			color:#999;
			font-size: .75rem;
		}
	}
</style>