<template>
    <div class="page " :class="{'has-navbar':true}">
      <div class="page-content">
        <!-- header -->
        <von-header theme="light" v-if="true">
            <button class="button button-icon ion-ios-arrow-back" slot="left" @click="$router.back('/')"></button>
            <span slot="title">查看详情</span>
        </von-header>
        <div class="detail" >
            <ul>
                <li class="item">
                    <span class="table-cell">时间：</span>
                    <span class="table-cell">2018-01-01</span>
                </li>
                <li class="item">
                    <span class="table-cell">产品：</span>
                    <span class="table-cell">ps</span>
                </li>
                <li class="item">
                    <span class="table-cell">数量(个)：</span>
                    <span class="table-cell" >100</span>
                </li>
                <li class="item">
                    <span class="table-cell">进货价(元)：</span>
                    <span class="table-cell" >100</span>
                </li>
                <li class="item">
                    <span class="table-cell">出货价(元)：</span>
                    <span class="table-cell" >150</span>
                </li>
                <li class="item">
                    <span class="table-cell">支出费用(元)：</span>
                    <span class="table-cell" >30</span>
                </li>
                <li class="item">
                    <span class="table-cell">备注：</span>
                    <span class="table-cell" >请吃饭</span>
                </li>
                <li class="item">
                    <span class="table-cell">销售额(元)：</span>
                    <span class="table-cell" >100</span>
                </li>
                <li class="item">
                    <span class="table-cell">利润(元)：</span>
                    <span class="table-cell" >50</span>
                </li>
            </ul>
        </div>
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
.detail ul .item span:first-child{
    .wh(2rem);
    text-align: right;
}
</style>

