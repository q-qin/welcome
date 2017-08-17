// pages/user/index.js
var app = getApp()
Page({
  data:{
    userInfo: {},
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this
    app.getUserInfo(function(userInfo){
      //更新数据
      _this.setData({
        userInfo:userInfo
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})