<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="true" :fix-head="false" page-name="添加信息">
    </nv-head>
    <div class="form" >
        <ul>
            <li >
                <span class="name">时间：</span>
                <input type="text" placeholder="如2018-01-01">
            </li>
            <li >
                <span class="name">产品：</span>
                <input type="text" placeholder="ps pvc 等">
            </li>
            <li >
                <span class="name">数量(个)：</span>
                <input type="text" placeholder="" v-model="mount">
            </li>
            <li >
                <span class="name">进货价(元)：</span>
                <input type="text" placeholder="" v-model="inPrice">
            </li>
            <li >
                <span class="name">出货价(元)：</span>
                <input type="text" placeholder="" v-model="outPrice">
            </li>
            <li >
                <span class="name">支出费用(元)：</span>
                <input type="text" placeholder="" v-model="otherOut">
            </li>
            <li >
                <span class="name">备注：</span>
                <input type="text" placeholder="备注信息，选填">
            </li>
            <li >
                <span class="name">销售额(元)：</span>
                <label>{{mount * outPrice}}</label>
            </li>
            <li >
                <span class="name">利润(元)：</span>
                <label>{{mount * (outPrice - inPrice) - otherOut}}</label>
            </li>
        </ul>
        <button class="submit">保存</button>
    </div>
  </div>
</template>
<script>
import nvHead from "@/components/header.vue";
import ajax from "@/assets/js/ajax";

export default {
    name:'form',
    components: {
        nvHead
    },
    data(){
        return {
            mount:'',
            inPrice:'',
            outPrice:'',
            otherOut:'',
        }
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.form{
    font-size: .34rem;
    ul li {
        line-height: 1rem;
        border-bottom: 1px solid #eee;
        span{
            .wh(3rem);
            display: inline-block;
            text-align: right;
        }
        input{
            font-size: .34rem;

        }
    }
    .submit{
        line-height: 1rem;
        background: #c30005;
        color:#fff;
        text-align: center;
        display: block;
        width: 7.5rem;
        font-size: .4rem;
        margin-top: .2rem;
    }
}

</style>

