//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    imgUrls: [
      'http://r3.3keji.com/banner.jpg',
      'http://r3.3keji.com/banner.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  //事件处理函数
  onShareAppMessage: function () {
    return {
      title: '桔子精选婚庆，新人必上的结婚网！',
      path: 'pages/index/index',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  comingsoon:function(){
    wx.showModal({
      title: '温馨提示',
      content: '即将开启',
      showCancel:false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
})
