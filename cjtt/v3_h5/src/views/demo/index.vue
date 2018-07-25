<template>
  <div class="a">
    <img :src="img">
  <p>
    这是main模块
    <router-link to="faq">去faq</router-link>
  </p>
  </div>  
</template>
<script>
export default {
  data(){
    return{
      img:require('./assets/730-1-120.png'),
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/mixin";
  .a{
    text-align: center;
  }
</style>


