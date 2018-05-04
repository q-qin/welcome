<template>
    <div>
        <header id="hd"  :class="{'show':showHead,'hide':!showHead,'fix-header':fixHead,'no-fix':!fixHead}">
            <div class="page-cover"
                    v-if="menuToggle"
                    @click="showMenus">
            </div>
            <div class="nv-toolbar ">
                <i class="iconfont toolbar-menu" v-if="showMenu"  @click="showMenus">&#xe614;</i>
                <i class="iconfont toolbar-nav" v-if="showBack"  @click="goback">&#xe6b0;</i>
                <span v-text="pageName"></span>
                <a @click="refresh">
                    <i class="iconfont icon-refresh">&#xe6f3;</i>
                </a>
            </div>
        </header>
        <nv-menu :menu-toggle="menuToggle"
            v-if="showMenu" ></nv-menu>
    </div>
</template>

<script>
    import nvMenu from './menu';
    export default {
        replace: true,
        props: {
            pageName: String,
            showHead:Boolean,
            showBack:Boolean,
            showMenu:Boolean,
            fixHead:Boolean,
        },
        data() {
            return {
                menuToggle:false,
            };
        },
        methods: {
            goback(){
                this.$router.go(-1)
            },
            showMenus(){
                this.menuToggle =!this.menuToggle;
            },
            refresh(){

            }
        },
        components: {
            nvMenu
        }
    };
</script>
<style lang="less" scoped>
    .page-cover{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 2;
    }
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
    .toolbar-menu{
        line-height: 1rem;
        position: absolute;
        font-size: .4rem;
        padding: 0 .2rem;
        color:#666;
        margin: 0;
        z-index: 2;
    }
    .nv-toolbar {
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        position: relative;
        .toolbar-nav{
            position: absolute;
            left:0;
            top:0;
            line-height: 1rem;
            z-index: 1;
            line-height: 1rem;
            padding: 0 .2rem;
            font-size: .4rem;
            color: #666;
        }
        &>span {
            display: block;
            text-align: center;
            height: 100%;
            line-height: 1rem;
            font-size: .3rem;
            width: 100%;
            position: relative;
            z-index: 0;
        }
    }
    .icon-refresh{
        line-height: 1rem;
        display: block;
        font-size: .4rem;
        padding: 0 .2rem;
        color:#666;
    }
</style>