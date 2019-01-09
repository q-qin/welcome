<template>
    <div class="page " :class="{'has-navbar':true}">
      <div class="page-content">
        <!-- header -->
        <von-header theme="light" v-if="true">
            <button class="button button-icon ion-ios-arrow-back" slot="left" @click="$router.back('/')"></button>
            <span slot="title">添加信息</span>
        </von-header>
        <div class="item item-divider">
            基本信息
        </div>
        <datepicker v-model="inputTime" label="时间" date-format="yyyy-mm-dd"></datepicker>
        <von-input type="text" v-model="prodName" placeholder="PS / PVC 等" label="产品"></von-input>
        <von-input type="text" v-model="prodMount" placeholder="单位（个）" label="数量"></von-input>
        <von-input type="text" v-model="inPrice" placeholder="单位（元）" label="进货价"></von-input>
        <von-input type="text" v-model="outPrice" placeholder="单位（元）" label="出货价"></von-input>
        <von-input type="text" v-model="otherOut" placeholder="其他开支" label="支出费用"></von-input>
        <von-input type="text" v-model="prodMemo" placeholder="备注" label="备注"></von-input>
        <div class="item item-divider">
            销售额：{{prodMount * outPrice}} | 利润：{{prodMount * (outPrice - inPrice) - otherOut}}
        </div>
        <md-button class="button button-balanced button-block btnSave" @click.native="save">
            保存
        </md-button>
      </div>
    </div>
</template>
<script>
import ajax from "@/assets/js/ajax";
import { setTimeout } from 'timers';

export default {
    name:'form',
    components: {
    },
    data(){
        return {
            inputTime:'2019-01-07',
            prodName:'',
            prodMount:'',
            inPrice:'',
            outPrice:'',
            otherOut:'',
            prodMemo:'',
        }
    },
    methods:{
        save(){
            $loading.show('处理中...',3000)
            setTimeout(() => {
                $loading.hide()
                $dialog.alert({
                    title: '提示',
                    content: '保存成功',
                    okTheme: 'positive'
                }).then(ok=>{
                    this.$router.go(-1);
                })
            }, 2000)
        },
    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.btnSave{
    width: 80%;
    margin: 0 auto;
}

</style>

