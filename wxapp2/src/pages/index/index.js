const app = getApp()
import { HasOpenId, HasConfig, UpFormid, IntervalChange, recordClick} from '../../lib/idx.js'
import { rnd } from '../../utils/util.js'
import { apple } from '../../config/config.js'
Page({
  data: {
    verflag: false,
    intTimes: null,
    intConfigs: {
      moreFun: {},
      wxad: '',
      moreFix: {},
      moreAd: {}
    }
  },
  onLoad() {
    HasOpenId().then(res => {})
    HasConfig(app).then(res => {
      console.log(app.globalConfig)
      if (!app.globalConfig.version || app.globalConfig.version != apple.version) {
        this.data.verflag = true
      }
      this.setData({
        verflag: this.data.verflag
      })
      this.data.intTimes = IntervalChange(this, app.globalConfig)
    })
  },
  // 开始
  tapBegin (event) {
    UpFormid(event.detail.formId).then(()=>{})
    wx.navigateTo({
      url: '../group/group',
    })
  },
  // 跳转小程序埋点
  tapRecord (event) {
    if (!!event && !!event.currentTarget && !!event.currentTarget.dataset && !!event.currentTarget.dataset.appid){
      let opt = {
        toapp: event.currentTarget.dataset.appid
      }
      recordClick(opt);
    }
  },
  // 分享
  onShareAppMessage () {
    let tit = "2018世界杯冠军之路，你能否猜到？"
    let img = ''
    if (!!app.globalConfig.indexShareTits && app.globalConfig.indexShareTits.length > 0){
      tit = app.globalConfig.indexShareTits[rnd(0, app.globalConfig.indexShareTits.length - 1)]
    }
    if (!!app.globalConfig.indexShareImgs && app.globalConfig.indexShareImgs.length>0){
      let img = app.globalConfig.indexShareImgs[rnd(0, app.globalConfig.indexShareImgs.length - 1)]
    }
    return {
      title: tit,
      imageUrl: img,
      path: "/pages/index/index"
    }
  },
  onShow() {
    if (this.data.intTimes != null){
      this.data.intTimes = IntervalChange(this, app.globalConfig)
    }
  },
  onHide() {
    clearInterval(this.data.intTimes)
  }
})
