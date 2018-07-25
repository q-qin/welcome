<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="问卷调查">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div v-show="!loading" class="questionNaire">
        <i class="iconfont goBack" @click="goBack" >&#xe697;</i>
        <div class="top">
          <p>用户使用</p>
          <p>情况调查</p>
        </div>
        <ul class="questions clear">
          <li class="question" v-for="(item,$index) in list" :key="$index">
            <div class="ask"><span ><i class="red">{{item.content.require?'*':''}}</i>{{item.item_id}}.</span><span>{{item.title}}{{item.type=='radio'?'(单选)':item.type=='check'?'(多选)':'(选填)'}}</span></div>
            <div class="options">
              <div class="item" v-for="(option,$sel) in item.content.option" :key="$sel">
                <a @click="select(item,option,$sel)">
                  <div :class="[item.type , {'active':option.active}]" ></div>
                  <span>{{option.name}}</span>
                </a>
                <input type="text" v-model="option.ext" placeholder="请填写" maxlength="20" v-if="item.content.ext && $sel==item.content.option.length-1" />
              </div>
            </div>
            <textarea name="" placeholder="请填写..." maxlength="50" v-if="item.type=='text'" v-model="item.text"></textarea>
          </li>
        </ul>
        <div class="bottom">
          <button @click="checkForm">提交（+500金币）</button>
        </div>
    </div>
  </div>
</template>
<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";

export default {
  name: "questionNaire",
  data() {
    return {
      loading: true,
      list:[],
    };
  },
  components: {
    nvHead,
    nvLoading
  },
  created() {
    appcall.hideNavBar();
    this.$Progress.start();
    this.init();
  },
  mounted() {},
  methods: {
    /**
     * 返回
     */
    goBack(){
      appcall.goBack();
    },
    /**
     * 问卷初期化
     */
    async init(){
      let params = {};
      let comm = await appcall.getRequestData(params);
      let rs = await ajax("post", this.$apiurl + "/questionnaire/get_paper", comm, params);
      this.$Progress.finish();
      if(rs && rs.code === 1001 && rs.data){
        this.loading = false;
        rs.data.forEach(n=>{
          n.content = JSON.parse(n.content);
          n.content.option.forEach(m=>{
            m.name = m[Object.keys(m)]
            m.active = false;
          })
        })
        this.list = rs.data;
      }else if(rs.code === 1005 ){
        this.$alert(rs.msg).then(ok=>{
          appcall.login();
        })
      }else{
        this.$alert(rs.msg);
      }
    },
    /**
     * 选择选项
     */
    select(item,option,sel){
      if(item.type == 'radio'){
        item.content.option.forEach((n,i)=>{
          n.active = false;
          if(i==sel){
            n.active = true;
          }
        })
      }else if(item.type == 'check'){
        option.active = !option.active;
      }
    },
    /**
     * 提交表单
     */
    checkForm(){
      let params = [];
      let isOK = true;
      this.list.forEach(n=>{
        let param = {};
        param[n.item_id]={};
        param['type'] = n.type;
        if(n.content.require){
          let sel = [];
          n.content.option.forEach(m=>{
            if(m.active){
              if(n.content.ext ){
                sel.push({option:Object.keys(m)[0],ext:m.ext?m.ext:''})
              }else{
                sel.push({option:Object.keys(m)[0]})
              }
            }
          })
          if(sel.length == 0){
            isOK = false;
            this.$alert('请填写必填选项！');
          }
          param[n.item_id] = sel;
        }
        if(n.type == 'text'){
          param[n.item_id] = new Array({ext:n.text});
        }
        params.push(param);
      })
      let paramsTxt = JSON.stringify(params);
      // console.log(paramsTxt);
      if(isOK){
        this.submit(paramsTxt);
      }
    },
    /**
     * 提交问卷
     */
    async submit(paramsTxt){
      let params = {
        result:paramsTxt
      }
      let comm = await appcall.getRequestData(params);
      let rs = await ajax("post", this.$apiurl + "/questionnaire/save_paper_result", comm, params);
      console.log(rs)
      if(rs && rs.code === 1001 ){
        this.$alert(rs.msg).then(ok=>{
          appcall.goBack();
        });
      }else if(rs.code === 1005 ){
        this.$alert(rs.msg).then(ok=>{
          appcall.login();
        })
      }else{
        this.$alert(rs.msg);
      }
    },
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";

.questionNaire{
  .goBack{
      position: absolute;
      top:0;
      left:0;
      font-size: .72rem;
      color: #fff;
      display: block;
      height: 1rem;
      width: 1rem;
      line-height: 1rem;
    }
  .top{
    width: 7.5rem;
    height: 2.78rem;
    .background('questionNaire/qnaire_bg.png');  
    padding-top:1rem;
    p{
      text-align: center;
      color:#fff;
      font-size: .5rem;
      text-shadow: .05rem .05rem .02rem rgba(209,9,9,.69);
    }
  }
  .questions{
    .question{
      margin: .56rem 0 .4rem;
      padding: 0 .3rem ;
      border-bottom: 1px solid #DFDFDF;
      .ask{
        font-size: .36rem;
        color:#333;
        span:first-child{
          display: inline-block;
          vertical-align: middle;
          width: .5rem;
          text-align: right;
        }
        span:last-child{
          display: inline-block;
          vertical-align: top;
          width: 6.4rem;
        }
      }
      .options{
        margin: .2rem 0 ;
        .item{
          line-height: .8rem;
          font-size: .3rem;
          a{
            display: inline-block;
            vertical-align: text-top;
            line-height: 1;
          }
          .radio{
            width: .36rem;
            height: .36rem;
            display: inline-block;
            vertical-align: text-top;
            margin:0  .1rem 0 .5rem;
            .background('questionNaire/qnaire_ico_kong.png');
            background-size: .34rem .34rem;
            &.active{
              .background('questionNaire/qnaire_ico_shi.png');
              background-size: .34rem .34rem;
            }
          }
          .check{
            width: .34rem;
            height: .34rem;
            vertical-align: text-top;
            display: inline-block;
            margin:0  .1rem 0 .5rem;
            .background('questionNaire/qnaire_ico_kong.png');
            background-size: .34rem .34rem;
            &.active{
              .background('questionNaire/qnaire_ico_duigou.png');
              background-size: .34rem .34rem;
            }
          }
          input{
            width: 4.8rem;
            margin-left:.1rem;
            background: #F8F8F8;
            border-radius: .08rem;
            line-height: .6rem;
            padding-left:.3rem;

            -webkit-touch-callout: auto;
            -webkit-user-select: auto;
            -khtml-user-select: auto;
            -moz-user-select: auto;
            -ms-user-select: auto;
            user-select: auto;
          }
        }
      }
      textarea{
        width: 6.2rem;
        height: 2rem;
        margin:.3rem .3rem .4rem .5rem;
        background: #F8F8F8;
        border-radius: .08rem;
        font-size: .3rem;
        padding:.3rem ;
        font-family: -apple-system, Helvetica Neue, Helvetica;
        
        -webkit-touch-callout: auto;
        -webkit-user-select: auto;
        -khtml-user-select: auto;
        -moz-user-select: auto;
        -ms-user-select: auto;
        user-select: auto;
      }
    }
  }
  .bottom{
    padding:.2rem 0 .6rem; 
    text-align: center;
    button{
      width: 6.1rem;
      color:#fff;
      background: #FF2C2C;
      line-height: .88rem;
      font-size: .32rem;
      border-radius: .44rem;
    }
  }
  .red{
    color:#FF0000;
  }
}
</style>