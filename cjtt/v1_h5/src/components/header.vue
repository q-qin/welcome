<template>
    <div >
        <header id="hd" 
            :class="{'show':showHead,
            'hide':!showHead,
            'fix-header':fixHead,
            'no-fix':!fixHead}">
            <div class="nv-toolbar ">
                <div class="toolbar-nav"  @click="goback">
                    <span class="sicon pre" ></span>
                </div>
                <span v-text="pageName"></span>
                <router-link to="/">
                </router-link>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
        replace: true,
        props: {
            pageName: String,
            showHead:Boolean,
            fixHead:Boolean,
        },
        data() {
            return {
            };
        },
        methods: {
            goback(){
                this.$router.go(-1)
            }
        },
        components: {

        }
    };
</script>
<style lang="less" scoped>
    #hd { 
        border-bottom: 1px solid #e8e8e8;
        box-shadow: 0 0 .2rem rgba(0,0,0,0.25);
        &.fix-header {
            width: 100%;
            background-color: rgba(255, 255, 255, 0.95);
            position: fixed;
            top: 0;
            left: 0;
            transition: all .3s ease;
            box-shadow: 0 0 .2rem rgba(0,0,0,0.25);
            z-index: 6;
        }
        &.no-fix {
            width: 100%;
            background-color: #fff;
            overflow: hidden;
        }
        &.show {
            display: block;
        }
        &.hide{
            display: none;
        }
    }
    .nv-toolbar {
        width: 100%;
        height: 2.2rem;
        display: flex;
        align-items: center;
        position: relative;
        .toolbar-nav{
            position: absolute;
            left:0;
            top:0;
            height: 2.5rem;
            z-index: 1;
            line-height: 2.2rem;
            text-indent: 1.3rem;
            font-size: .8rem;
            color: #666;
            .sicon{
                position: absolute;
                left: .65rem;
                padding-top: .825rem;
                padding-bottom: .825rem;
            }
        }
        &>span {
            display: block;
            text-align: center;
            height: 100%;
            line-height: 2.2rem;
            font-size: .8rem;
            width: 100%;
            position: relative;
            z-index: 0;
        }
        .num {
            background-color: #80bd01;
            color: #fff;
            width: 20px;
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
            text-align: center;
            border-radius: 50%;
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 10;
        }
        .add-icon{
            color: #42b983;
            position: absolute;
            right: 10px;
            top: 5px;
            z-index: 10;
        }
    }

</style>