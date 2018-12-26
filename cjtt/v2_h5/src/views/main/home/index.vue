<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="首页">
    </nv-head>
    <div class="index" >
      <ul class="list">
        <li v-for="(item,$index) in list" :key="$index" :class="{'blur':$index%2==1}" @click="detail($index)">
          <span class="title">{{item.date}}</span>
        </li>
      </ul>
      <span class="total">合计:{{total}}</span>
    </div>
    <div class="iconfont add" @click="addForm">&#xe658;</div>
  </div>
</template>

<script>
import nvHead from "@/components/header.vue";
import ajax from "@/assets/js/ajax";

export default {
  name: "index",
  components: {
    nvHead
  },
  data() {
    return {
      list:[
        {date:'2018-01-01'},
        {date:'2018-01-02'},
        {date:'2018-01-03'},
        {date:'2018-01-04'},
        {date:'2018-01-05'},
        {date:'2018-02-01'},
        {date:'2018-02-02'},
        {date:'2018-02-03'},
        {date:'2018-02-04'},
        {date:'2018-02-05'},
        {date:'2018-01-05'},
        {date:'2018-02-01'},
        {date:'2018-02-02'},
        {date:'2018-02-03'},
        {date:'2018-02-04'},
        {date:'2018-02-05'}
      ],
      total:100,
    };
  },
  mounted() {
    try {  
      window.console &&
        window.console.log &&
        (console.log(`%c❤ Front-end ? => joinUs() %c http://www.3keji.com/ `,"color:#c30005",'font-size:15px;color:#009a61;text-shadow: 0 0 3px #009a61;'));
    } catch (e) {}

  },
  methods: {
    addForm(){
      this.$router.push('/form')
    },
    detail(id){
      this.$router.push('/detail/'+id)
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/mixin";
.index {
  font-size: 0.34rem;
  .title{
    .wh(7.5rem);
    line-height: 1rem;
    display: block;
    text-align: left;
    padding-left: .3rem;
  }
  .list li{
    text-align: center;
    line-height: .8rem;
    border-bottom: 1px solid #f1f1f1;
    &.blur{
      background: #f1f1f1;
    }
  }
  .total{
    text-align: right;
    display: block;
    line-height: 1rem;
    padding-right: .3rem;
  }
}
  .add{
    position: fixed;
    bottom: .5rem;
    right: .5rem;
    .wh(1rem,1rem);
    border-radius: 100%;
    border:1px solid #333;
    text-align: center;
    color:#333;
    line-height: 1rem;
    font-size: .6rem;
  }
</style>
