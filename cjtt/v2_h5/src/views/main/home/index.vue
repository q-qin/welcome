<template>
    <div class="page " :class="{'has-navbar':true}">
      <div class="page-content">
        <!-- header -->
        <von-header theme="light" v-if="true" >
          <span slot="title">首页</span>
          <button class="button button-icon ion-navicon" slot="right" @click="toggleSidebarRight"></button>
        </von-header>

        <!-- 页面内容 -->
        <scroll class="page-content"
            :on-refresh="onRefresh"
            :on-infinite="onInfinite">
          <item v-for="(item, index) in items" :key="index" @click.native="onItemClick(index)" :class="{'item-stable': index % 2 == 0}">
            {{ item }}
          </item>

          <div v-if="infiniteCount >= 2" slot="infinite" class="text-center">没有更多数据</div>
        </scroll>
        <md-button class="button button-balanced button-fab btnOption" @click.native="add">
          <i class="icon ion-android-add"></i>
        </md-button>
        <div class="siderBar" ref="sidebarRight" :class="{'on':siderBarShow}" @click="toggleSidebarRight" >
          <div class="content" @click.stop>
            <div class="ctitle">
                通过时间过滤
            </div>
            <datepicker v-model="startDate" label="开始时间" date-format="yyyy-mm-dd"></datepicker>
            <div style="height:10px;"></div>
            <datepicker v-model="endDate" label="结束时间" date-format="yyyy-mm-dd"></datepicker>
            
            <md-button class="button button-balanced btnOK">
                确定
            </md-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import ajax from "@/assets/js/ajax";

export default {
  name: "index",
  components: {},
  data() {
    return {
      items:[],
      infiniteCount: 0,
      startDate:'2019-01-01',
      endDate:'2019-01-05',
      siderBarShow:false,
      month:1,
    };
  },
  async created(){
    this.$Progress.start();
    for (let i = 30; i >= 1; i--) {
      this.items.push('2019-'+(this.month<10?'0'+this.month:this.month)+'-'+(i<10?'0'+i:i))
    }
    this.top = 1
    this.bottom = 20

    $loading.show('正在加载')

    setTimeout(() => {
      this.$Progress.finish();
      $loading.hide()
    }, 2000)
  },
  mounted() {
    try {  
      window.console &&
        window.console.log &&
        (console.log(`%c❤ Front-end ? => joinUs() %c http://www.3keji.com/ `,"color:#c30005",'font-size:15px;color:#009a61;text-shadow: 0 0 3px #009a61;'));
    } catch (e) {}

  },
  methods: {
    toggleSidebarRight(){
      this.siderBarShow= !this.siderBarShow;
    },
    onRefresh(done) {
      setTimeout(() => {
        $toast.show('刷新成功')
        // let start = this.top - 1
        // for (let i = start; i > start - 10; i--) {
        //   this.items.splice(0, 0, i + ' - keep walking, be 2 with you.')
        // }
        this.top = this.top - 10;

        done()
      }, 1500)
    },

    onInfinite(done) {
      setTimeout(() => {
        if (this.infiniteCount < 2) {
          let start = this.bottom + 1
          this.month +=1;
          // for (let i = start; i < start + 10; i++) {
            // this.items.push(i + ' - keep walking, be 2 with you.')
          for (let i = 30; i >= 1; i--) {
            this.items.push('2019-'+ (this.month<10?'0'+this.month:this.month)+'-'+(i<10?'0'+i:i))
          }
          this.bottom = this.bottom + 10;

          this.infiniteCount++
        }

        done()
      }, 1500)
    },

    onItemClick(index) {
      this.$router.push('/detail/'+index)
    },

    add(){
      this.$router.push('/form')
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/mixin";

  .btnOption{
    position: fixed!important;
    bottom: 11px;
    right: 11px;
  }
  .siderBar{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    transition:transform .2s;
    transform: translateX(-100%);
    background:rgba(0,0,0,.5);
    z-index: 10;
    .content{
      .wh(300px,100%);
      background:#f5f5f5;
      .item{
        margin:-1px 0 -1px 0;
      }
    }
    &.on{
      transform:translateX(0);
    }
  }
  .ctitle{
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #e1e1e1;
  }

  .btnOK{
    margin: 10px auto!important;
    position: absolute!important;
    right: 10px;
    width: 120px;
  }

</style>
