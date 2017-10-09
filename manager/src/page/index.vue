<template>
  <div>
    首页
    <v-dialog/>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';

export default {
  name: 'home',
  data() {
    return {

    }
  },
  mounted() {
    console.log('app init')
    let _self = this;
    _self.getData()
  },
  computed: {
  },
  components: {
  },
  methods: {
    // 获取首页数据
    getData() {
      let _self = this;
      _self.$http.post(_self.$conf.apiUrl + '/front/', {}, { emulateJSON: true }).then(response => {
        let res = response.body;
        if (res.code == 0) {
          let data = res.data;
        } else {
          this.$modal.show('dialog', {
            title: '温馨提示',
            text: res.msg,
            buttons: [{ title: '关闭' }]
          })
        }
      }, response => {
        this.$modal.show('dialog', {
          title: '温馨提示',
          text: '请求异常，请稍后重试！',
          buttons: [{ title: '关闭' }]
        })
      });
    },
  },
}

</script>
<style lang="less" scoped>
  // @import url('../style/index');
</style>
