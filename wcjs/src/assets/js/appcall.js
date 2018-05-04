var appcall = {
    // 获取设备信息等公共参数
    getAppData: function () {
      return new Promise((resolve, reject) => {
        try {
          //resolve({uid:1,token:2})
          JKEventHandler.callNativeFunction('getAppData', '{}', data => {
            let rs = JSON.parse(data);
            resolve(rs);
          });
        } catch (e) {
          resolve({})
        }
      })
    },
    // 获取签名
    getSign: function (requestParams) {
      return new Promise((resolve, reject) => {
        try {
          //resolve({sign:this.i++})
          JKEventHandler.callNativeFunction('getSign', requestParams, data => {
            let rs = JSON.parse(data);
            resolve(rs);
          });
        } catch (e) {
          resolve({})
        }
      })
    },
    // 获取用户信息
    getUserInfo: function () {
      return new Promise((resolve, reject) => {
        try {
          JKEventHandler.callNativeFunction('getUserInfo', '{}', data => {
            let rs = JSON.parse(data);
            resolve(rs);
          });
        } catch (e) {
          resolve({})
        }
      })
    },
    // 获取带签名的公共参数
    getRequestData: function (requestParams) {
      return new Promise(async(resolve, reject) => {
        try {
          let params = {};
          let appdata = await this.getAppData();
          // app参数 => params
          Object.assign(params, appdata, {});
          // app参数+业务参数 => sign
          let signParams = Object.assign({}, appdata, requestParams);
          let sign = await this.getSign(signParams);
          // params+sign => params;
          Object.assign(params, sign, params);
          resolve(params);
        } catch (e) {
          resolve({})
        }
      })
    },
    // 获取字体大小 默认中号字体2
    getFontSize: function () {
      return new Promise((resolve, reject) => {
        try {
          JKEventHandler.callNativeFunction('getFontSize', '{}', data => {
            let rs = JSON.parse(data);
            resolve(rs);
          });
        } catch (e) {
          resolve({
            type: 2
          })
        }
      })
    },
    // 获取ios提审状态
    getReviewStatus: function () {
      return new Promise(async(resolve, reject) => {
        if (JKEventHandler.browser().ios) {
          let appdata = await this.getAppData();
          // 低版本默认审核通过(无reviewstatus字段)
          if (appdata && appdata.reviewstatus == 1) {
            resolve(true);
          } else {
            resolve(false)
          }
        } else {
          resolve(false)
        }
      })
    },
  
    // 跳转资讯列表.sc_catid栏目分类id
    articles: function (params={}) {
      JKEventHandler.callNativeFunction('task_complete', params, '')
    },
    // 跳转视频列表.sc_catid栏目分类id
    videos: function (params={}) {
      JKEventHandler.callNativeFunction('task_spgk', params, '')
    },
    // 打开内嵌H5页面 参数：title + url
    navigator: function (params={}) {
      JKEventHandler.callNativeFunction('navigator', params, '')
    },
    // 登录
    login: function () {
      JKEventHandler.callNativeFunction('login', '{}', '')
    },
    // 分享
    // type:1微信朋友2朋友圈3晒海报4晒百宝箱5qq好友6微信纯文字7qq纯文字
    invite: function (params) {
      JKEventHandler.callNativeFunction('my_invite', params, '')
    },
    // 文章分享
    // type:1微信朋友2微信朋友圈3qq好友4qq空间
    shareArticle: function (params,callback) {
      JKEventHandler.callNativeFunction('shareArticle', params, data => {
        callback(data);
      })
    },
    // 打开某条特定资讯 参数：资讯id
    gotoarticle: function (params) {
      JKEventHandler.callNativeFunction('gotoarticle', params, '')
    },
    // 打开其他资讯 type:1文章2视频,id:资讯id
    openother: function (params) {
      JKEventHandler.callNativeFunction('openother', params, '')
    },
    // 评论 type:1文章2视频
    comment: function (params) {
      JKEventHandler.callNativeFunction('comment', params, '')
    },
    // 查看更多评论type:1文章2视频
    morecomment: function (params) {
      JKEventHandler.callNativeFunction('morecomment', params, '')
    },
    // 在线客服
    onlinekf: function () {
      JKEventHandler.callNativeFunction('onlinekf', '{}', '')
    },
    // 邀请码设置成功
    user_binding: function () {
      JKEventHandler.callNativeFunction('user_binding', '{}', '')
    },
    // 复制 code:1111
    invite_copy: function (params) {
      JKEventHandler.callNativeFunction('invite_copy', params, '')
    },
    //打开微信添加好友
    openWechat: function (params) {
      JKEventHandler.callNativeFunction('openWechat', params, '')
    },
    // 跳转来源主页
    regionHomepage: function (params) {
      JKEventHandler.callNativeFunction('regionHomepage', params, '')
    },
    // 绑定支付宝
    bindzfb: function () {
      JKEventHandler.callNativeFunction('bindzfb', '{}', '')
    },
    // 展示原生toast
    showToast:function(message){
      JKEventHandler.callNativeFunction('showToast', { message:message }, '')
    },
    // 发送短信
    sms:function(params){
      JKEventHandler.callNativeFunction('sendSms', params, '')
    },
  };
  
  export default appcall
  