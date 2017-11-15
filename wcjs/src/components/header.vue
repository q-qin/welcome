<template>
    <div>
        <header id="hd"  :class="{'show':showHead,'hide':!showHead,'fix-header':fixHead,'no-fix':!fixHead}">
            <div class="page-cover"
                    v-if="menuToggle"
                    @click="showMenus">
            </div>
            <div class="nv-toolbar ">
                <div class="toolbar-menu" v-if="showMenu"  @click="showMenus">
                </div>
                <div class="toolbar-nav" v-if="showBack"  @click="goback">
                    <span class="sicon pre" ></span>
                </div>
                <span v-text="pageName"></span>
                <router-link to="/">
                    <i class="icon-refresh"></i>
                </router-link>
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
        z-index: 7;
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
        width: 2.45rem;
        height: 2.2rem;
        position: absolute;
        background: url('../images/nav_icon.png') no-repeat center center;
        background-size: .95rem .8rem;
        margin: 0;
        z-index: 7;
        top: 0;
        left: 0;
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
            height: 2.2rem;
            z-index: 1;
            line-height: 2.3rem;
            text-indent: 1.3rem;
            font-size: .8rem;
            color: #666;
            .sicon{
                position: absolute;
                top:.65rem;
                left: .5rem;
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
    }
    .icon-refresh{
        width: 2.2rem;
        height: 2.2rem;
        display: block;
        background: url('../images/refresh.png') no-repeat center center;
        background-size: .95rem .95rem;
    }
</style>