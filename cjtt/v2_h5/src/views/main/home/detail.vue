<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="true" :fix-head="false" page-name="查看详情">
    </nv-head>
    <div class="detail" >
        <ul>
            <li>
                <span class="name">时间：</span>
                <label >2018-01-01</label>
            </li>
            <li>
                <span class="name">产品：</span>
                <label >ps</label>
            </li>
            <li>
                <span class="name">数量(个)：</span>
                <label >100</label>
            </li>
            <li >
                <span class="name">进货价(元)：</span>
                <label >100</label>
            </li>
            <li >
                <span class="name">出货价(元)：</span>
                <label >150</label>
            </li>
            <li >
                <span class="name">支出费用(元)：</span>
                <label >30</label>
            </li>
            <li >
                <span class="name">备注：</span>
                <label >请吃饭</label>
            </li>
            <li >
                <span class="name">销售额(元)：</span>
                <label >100</label>
            </li>
            <li >
                <span class="name">利润(元)：</span>
                <label >50</label>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import nvHead from "@/components/header.vue";
import ajax from "@/assets/js/ajax";

export default {
    name:'detail',
    components: {
        nvHead
    },
    data(){
        return{

        }
    },
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.detail{
    font-size: .34rem;
    ul li {
        line-height: 1rem;
        border-bottom: 1px solid #eee;
        span{
            .wh(3rem);
            display: inline-block;
            text-align: right;
        }
    }
}

</style>

