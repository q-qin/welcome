<template>
    <div style="height: 100%;">
        <nv-head page-type="关于" :fix-head="true" :need-add="true" ></nv-head>
        
        <dl class="about-info">

            <dt>关于项目：</dt>
            <dd>
                江苏省各大城市的车辆信息，感谢各位车友的分享与支持，写代码不容易，老哥们赏个饮料钱。
            </dd>
        
            <dt>作者：</dt>
            <dd>
                js 阿强
            </dd>
            
            <dt>当前版本</dt>
            <dd>V1.0</dd>

        </dl>
    </div>
</template>
<script>
    import nvHead from '../components/header.vue';
    export default {
        components: {
            nvHead
        }
    };
</script>