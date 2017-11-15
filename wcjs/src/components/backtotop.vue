<template>
    <div class="icon-top" v-show="show" @click="goTop"></div>
</template>
<script>
    export default {
        replace: true,
        data() {
            return {
                show: false
            };
        },
        mounted() {
            window.addEventListener('scroll',()=>{
                //console.log(window.scrollY)
                if(window.scrollY > 100){
                    this.show = true;
                }else{
                    this.show = false;
                }
            })
        },
        methods: {
            goTop() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                this.show = false;
            }
        }
    };
</script>
<style lang="less" scoped>
    .icon-top {
        position: fixed;
        right: 1rem;
        bottom: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        border:.05rem solid #999;
        z-index: 99;
        color: #FEA500;
        background-image: url(../images/topback.png) ;
        background-size: 75%;
        background-repeat: no-repeat;
        background-position: center;
        box-shadow: 0 0 .2rem #999;
    }
</style>