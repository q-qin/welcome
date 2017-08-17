// pages/find/news.js
Page({
  data:{
    list:[],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    _this.getlist();
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
  },
  getlist:function(){
    var _this = this;
    wx.request({
      url: 'https://www.juzi001.com:3000/newslist', //仅为示例，并非真实的接口地址
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        
      },fail:function(res){
        wx.showModal({
          title: '温馨提示',
          content: '资讯获取失败，暂时显示测试数据',
          showCancel:false,
          success: function(res) {
            _this.setData({
              list:[{
                title:'测试标题1',
                subtitle:'子标题',
                updatetime:'2017/04/06 14:52:00',
                content:'测试内容'
              },{
                title:'测试标题2',
                subtitle:'子标题',
                updatetime:'2017/04/06 14:52:00',
                content:'测试内容'
              },{
                title:'测试标题3',
                subtitle:'子标题',
                updatetime:'2017/04/06 14:52:00',
                content:'测试内容'
              }]
            })
          }
        })
      }
    })
  }
})