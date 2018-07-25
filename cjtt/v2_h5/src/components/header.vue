<template>
    <div >
        <header id="hd" 
            :class="{'show':showHead,
            'hide':!showHead,
            'fix-header':fixHead,
            'no-fix':!fixHead}">
            <div class="nv-toolbar ">
                <div class="toolbar-nav"  @click="goback">
                    <i class="iconfont" >&#xe697;</i>
                </div>
                <span v-text="pageName"></span>
                <a href="/"></a>
            </div>
        </header>
    </div>
</template>

<script>
export default {
  replace: true,
  props: {
    pageName: String,
    showHead: Boolean,
    fixHead: Boolean
  },
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
#hd {
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.25);
  &.fix-header {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    position: fixed;
    top: 0;
    left: 0;
    transition: all 0.3s ease;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.25);
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
  &.hide {
    display: none;
  }
}
.nv-toolbar {
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  position: relative;
  .toolbar-nav {
    position: absolute;
    left: 0;
    top: 0;
    height: 1rem;
    line-height: 1rem;
    z-index: 1;
    text-indent: .15rem;
    font-size: 0.36rem;
    color: #666;
    .iconfont{
      font-size: .5rem;
    }
  }
  & > span {
    display: block;
    text-align: center;
    height: 100%;
    line-height: 1rem;
    font-size: 0.36rem;
    width: 100%;
    position: relative;
    z-index: 0;
  }
}
</style>