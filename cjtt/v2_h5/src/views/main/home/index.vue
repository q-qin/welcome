<template>
    <div class="page " :class="{'has-navbar':true}">
      <div class="page-content">
        <!-- header -->
        <von-header theme="light" v-if="true">
          <span slot="title">首页</span>
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
        <md-button class="button button-balanced button-fab option" @click.native="add">
          <i class="icon ion-android-add"></i>
        </md-button>
        <md-button class="button button-positive button-fab funnel" @click.native="showFilter">
          <i class="icon ion-android-funnel"></i>
        </md-button>
        <div v-if="filterShow"></div>
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
      startDate:'',
      endDate:'',
      filterShow:false,
    };
  },
  async created(){
    this.$Progress.start();
    for (let i = 1; i <= 20; i++) {
      this.items.push(i + ' - stay floosh stay hungry.')
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
    showFilter(){
      this.filterShow = !this.filterShow;
    },
    onRefresh(done) {
      setTimeout(() => {
        let start = this.top - 1
        for (let i = start; i > start - 10; i--) {
          this.items.splice(0, 0, i + ' - keep walking, be 2 with you.')
        }
        this.top = this.top - 10;

        done()
      }, 1500)
    },

    onInfinite(done) {
      setTimeout(() => {
        if (this.infiniteCount < 2) {
          let start = this.bottom + 1
          for (let i = start; i < start + 10; i++) {
            this.items.push(i + ' - keep walking, be 2 with you.')
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

  .option{
    position: fixed;
    bottom: 11px;
    right: 11px;
  }
  .funnel{
    position: fixed;
    bottom: 11px;
    right: 66px;
  }
</style>
