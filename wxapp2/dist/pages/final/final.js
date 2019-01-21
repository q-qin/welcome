const app = getApp()
import { HasOpenId, HasConfig, UpFormid, IntervalChange } from '../../lib/idx.js'
import { rnd } from '../../utils/util.js'
// import { apple } from '../../config/config.js'
// import { mock16, mock8, mock4, mock2, mock1 } from '../../mock/mock.js'
const apple = {};

Page({
  data: {
    verflag: false,
    hideCanvas: true,
    final16: app.global16,
    final8: {},
    final4: {},
    final2: {},
    final1: {},
    submitok: false,
    imagePath: '',
    intTimes: null,
    intConfigs: {
      moreFix: {},
    },
    guider: true,
    gssani: ''
  },
  onLoad() {
    HasConfig(app).then(res => {
      console.log(app.globalConfig)
      if (!app.globalConfig.version || app.globalConfig.version != apple.version) {
        this.data.verflag = true
      }
      this.setData({
        verflag: this.data.verflag
      })
      this.data.intTimes = IntervalChange(this, app.globalConfig)
      // 延迟关闭提示
      setTimeout(()=>{
        this.closeGuider()
      },2000)
    })
  },
  // 选择至8强
  tapg8 (event) {
    let id = typeof (event) == 'object' ? event.currentTarget.dataset.id : event
    // 16-8
    if (id == 'A1' || id == 'B2') {
      if (!!this.data.final8.A && !!this.data.final4.A && this.data.final8.A.name == this.data.final4.A.name) {
        this.data.final8.A = this.data.final16[id]
        this.tapg4('A')
      }else{
        this.data.final8.A = this.data.final16[id]
      }
    } else if (id == 'C1' || id == 'D2') {
      if (!!this.data.final8.B && !!this.data.final4.A && this.data.final8.B.name == this.data.final4.A.name) {
        this.data.final8.B = this.data.final16[id]
        this.tapg4('B')
      } else {
        this.data.final8.B = this.data.final16[id]
      }
    } else if (id == 'E1' || id == 'F2') {
      if (!!this.data.final8.C && !!this.data.final4.B && this.data.final8.C.name == this.data.final4.B.name) {
        this.data.final8.C = this.data.final16[id]
        this.tapg4('C')
      } else {
        this.data.final8.C = this.data.final16[id]
      }
    } else if (id == 'G1' || id == 'H2') {
      if (!!this.data.final8.D && !!this.data.final4.B && this.data.final8.D.name == this.data.final4.B.name) {
        this.data.final8.D = this.data.final16[id]
        this.tapg4('D')
      } else {
        this.data.final8.D = this.data.final16[id]
      }
    } else if (id == 'B1' || id == 'A2') {
      if (!!this.data.final8.E && !!this.data.final4.C && this.data.final8.E.name == this.data.final4.C.name) {
        this.data.final8.E = this.data.final16[id]
        this.tapg4('E')
      } else {
        this.data.final8.E = this.data.final16[id]
      }
    } else if (id == 'D1' || id == 'C2') {
      if (!!this.data.final8.F && !!this.data.final4.C && this.data.final8.F.name == this.data.final4.C.name) {
        this.data.final8.F = this.data.final16[id]
        this.tapg4('F')
      } else {
        this.data.final8.F = this.data.final16[id]
      }
    } else if (id == 'F1' || id == 'E2') {
      if (!!this.data.final8.G && !!this.data.final4.D && this.data.final8.G.name == this.data.final4.D.name) {
        this.data.final8.G = this.data.final16[id]
        this.tapg4('G')
      } else {
        this.data.final8.G = this.data.final16[id]
      }
    } else if (id == 'H1' || id == 'G2') {
      if (!!this.data.final8.H && !!this.data.final4.D && this.data.final8.H.name == this.data.final4.D.name) {
        this.data.final8.H = this.data.final16[id]
        this.tapg4('H')
      } else {
        this.data.final8.H = this.data.final16[id]
      }
    }

    this.setData({
      final8: this.data.final8
    })
    this.checkBtn()
  },
  // 选择至4强
  tapg4(event) {
    // if (Object.keys(this.data.final8).length >= 8) {
      let id = typeof (event) == 'object' ? event.currentTarget.dataset.id : event
      console.log(id)
      // 8-4
      if (id == 'A' || id == 'B') {
        if (!!this.data.final4.A && !!this.data.final2.A && this.data.final4.A.name == this.data.final2.A.name) {
          this.data.final4.A = this.data.final8[id]
          this.tapg2('A')
        } else {
          this.data.final4.A = this.data.final8[id]
        }
      } else if (id == 'C' || id == 'D') {
        if (!!this.data.final4.B && !!this.data.final2.A && this.data.final4.B.name == this.data.final2.A.name) {
          this.data.final4.B = this.data.final8[id]
          this.tapg2('B')
        } else {
          this.data.final4.B = this.data.final8[id]
        }
      } else if (id == 'E' || id == 'F') {
        if (!!this.data.final4.C && !!this.data.final2.B && this.data.final4.C.name == this.data.final2.B.name) {
          this.data.final4.C = this.data.final8[id]
          this.tapg2('C')
        } else {
          this.data.final4.C = this.data.final8[id]
        }
      } else if (id == 'G' || id == 'H') {
        if (!!this.data.final4.D && !!this.data.final2.B && this.data.final4.D.name == this.data.final2.B.name) {
          this.data.final4.D = this.data.final8[id]
          this.tapg2('D')
        } else {
          this.data.final4.D = this.data.final8[id]
        }
      }

      this.setData({
        final4: this.data.final4
      })
      this.checkBtn()
    // }
  },
  // 选择至2强
  tapg2(event) {
    // if (Object.keys(this.data.final4).length >= 4) {
      let id = typeof (event) == 'object' ? event.currentTarget.dataset.id : event
      // 4-2
      if (id == 'A' || id == 'B') {
        if (!!this.data.final2.A && !!this.data.final1.A && this.data.final2.A.name == this.data.final1.A.name) {
          this.data.final2.A = this.data.final4[id]
          this.tapg1('A')
        } else {
          this.data.final2.A = this.data.final4[id]
        }
      } else if (id == 'C' || id == 'D') {
        if (!!this.data.final2.B && !!this.data.final1.A && this.data.final2.B.name == this.data.final1.A.name) {
          this.data.final2.B = this.data.final4[id]
          this.tapg1('B')
        } else {
          this.data.final2.B = this.data.final4[id]
        }
      }

      this.setData({
        final2: this.data.final2
      })
      this.checkBtn()
    // }
  },
  // 选择至1强
  tapg1(event) {
    // if (Object.keys(this.data.final2).length >= 2) {
      let id = typeof (event) == 'object' ? event.currentTarget.dataset.id : event
      // 2-1
      this.data.final1.A = this.data.final2[id]
      
      this.setData({
        final1: this.data.final1
      })
      this.checkBtn()
    // }
  },
  // 检测按钮状态
  checkBtn() {
    if (Object.keys(this.data.final8).length >= 8 && Object.keys(this.data.final4).length >= 4 && Object.keys(this.data.final2).length >= 2 && Object.keys(this.data.final1).length >= 1){
      this.setData({
        submitok: true
      })
    }
  },
  // 提交
  tapSubmit(event) {
    if (!!this.data.submitok) {
      if (event.detail.userInfo) {
        this.data.nickName = event.detail.userInfo.nickName
        this.data.avatarUrl = event.detail.userInfo.avatarUrl
        this.drawImg()
      } else {
        wx.showToast({
          title: "授权失败",
          icon: "success",
          image: "../../image/error.png",
          duration: 2e3
        });
      }
    }
    
  },
  // 绘制图片
  drawImg() {
    this.setData({
      hideCanvas: false
    }),
    wx.showLoading({
      title: '图片生成中...'
    })
    const t = wx.createCanvasContext('canvas')
    // 背景
    t.drawImage('../../image/canvas.png', 0, 0, 750, 1250)
    wx.getImageInfo({
      src: this.data.avatarUrl,
      success: (res => {
        t.drawImage(res.path, 295, 30, 60, 60)
        drawTemp()
      })
    })
    // 画名字
    t.setFontSize(32), t.setFillStyle("#ffffff"), t.setTextAlign("left")
    t.fillText(this.data.nickName, 375, 73)

    t.setLineWidth(8), t.setStrokeStyle('#04a91c')
    // 画16强
    t.setFontSize(20), t.setFillStyle("#ffffff"), t.setTextAlign("center")
    for (let item in this.data.final16) {
      if (this.data.final16[item].name == this.data.final1.A.name){
        t.setGlobalAlpha(1)
        t.beginPath()
        if (item == 'A1') {
          t.moveTo(60, 263), t.lineTo(130, 263), t.lineTo(130, 316)
        } else if (item == 'B2') {
          t.moveTo(60, 363), t.lineTo(130, 363), t.lineTo(130, 316)
        } else if (item == 'C1') {
          t.moveTo(60, 461), t.lineTo(130, 461), t.lineTo(130, 511)
        } else if (item == 'D2') {
          t.moveTo(60, 562), t.lineTo(130, 562), t.lineTo(130, 511)
        } else if (item == 'E1') {
          t.moveTo(60, 660), t.lineTo(130, 660), t.lineTo(130, 710)
        } else if (item == 'F2') {
          t.moveTo(60, 760), t.lineTo(130, 760), t.lineTo(130, 710)
        } else if (item == 'G1') {
          t.moveTo(60, 857), t.lineTo(130, 857), t.lineTo(130, 905)
        } else if (item == 'H2') {
          t.moveTo(60, 957), t.lineTo(130, 957), t.lineTo(130, 905)
        } else if (item == 'B1') {
          t.moveTo(690, 263), t.lineTo(623, 263), t.lineTo(623, 316)
        } else if (item == 'A2') {
          t.moveTo(690, 363), t.lineTo(623, 363), t.lineTo(623, 316)
        } else if (item == 'D1') {
          t.moveTo(690, 461), t.lineTo(623, 461), t.lineTo(623, 511)
        } else if (item == 'C2') {
          t.moveTo(690, 562), t.lineTo(623, 562), t.lineTo(623, 511)
        } else if (item == 'F1') {
          t.moveTo(690, 660), t.lineTo(623, 660), t.lineTo(623, 710)
        } else if (item == 'E2') {
          t.moveTo(690, 760), t.lineTo(623, 760), t.lineTo(623, 710)
        } else if (item == 'H1') {
          t.moveTo(690, 857), t.lineTo(623, 857), t.lineTo(623, 905)
        } else if (item == 'G2') {
          t.moveTo(690, 957), t.lineTo(623, 957), t.lineTo(623, 905)
        }
        t.stroke()
      } else {
        t.setGlobalAlpha(0.6)
      }
      t.drawImage('../../image/' + this.data.final16[item].img + '.png', mock16[item].x, mock16[item].y, mock16.size.w, mock16.size.h)
      t.fillText(this.data.final16[item].name, mock16[item].x + mock16.size.w / 2, mock16[item].y + mock16.size.h * 2)
    }
    // 画8强
    for (let item in this.data.final8) {
      if (this.data.final8[item].name == this.data.final1.A.name) {
        t.setGlobalAlpha(1)
        t.beginPath()
        if (item == 'A') {
          t.moveTo(127, 315), t.lineTo(229, 315), t.lineTo(229, 412)
        } else if (item == 'B') {
          t.moveTo(127, 511), t.lineTo(229, 511), t.lineTo(229, 412)
        } else if (item == 'C') {
          t.moveTo(127, 710), t.lineTo(229, 710), t.lineTo(229, 809)
        } else if (item == 'D') {
          t.moveTo(127, 904), t.lineTo(229, 904), t.lineTo(229, 809)
        } else if (item == 'E') {
          t.moveTo(625, 315), t.lineTo(523, 315), t.lineTo(523, 412)
        } else if (item == 'F') {
          t.moveTo(625, 511), t.lineTo(523, 511), t.lineTo(523, 412)
        } else if (item == 'G') {
          t.moveTo(625, 710), t.lineTo(523, 710), t.lineTo(523, 809)
        } else if (item == 'H') {
          t.moveTo(625, 904), t.lineTo(523, 904), t.lineTo(523, 809)
        }
        t.stroke()
      } else {
        t.setGlobalAlpha(0.6)
      }
      t.drawImage('../../image/' + this.data.final8[item].img + '.png', mock8[item].x-5, mock8[item].y-3, mock8.size.w+10, mock8.size.h+7)
    }
    // 画4强
    for (let item in this.data.final4) {
      if (this.data.final4[item].name == this.data.final1.A.name) {
        t.setGlobalAlpha(1)
        t.beginPath()
        if (item == 'A') {
          t.moveTo(226, 412), t.lineTo(272, 412), t.lineTo(272, 612)
        } else if(item == 'B') {
          t.moveTo(226, 808), t.lineTo(272, 808), t.lineTo(272, 609)
        } else if (item == 'C') {
          t.moveTo(525, 412), t.lineTo(479, 412), t.lineTo(479, 612)
        } else if (item == 'D') {
          t.moveTo(525, 808), t.lineTo(479, 808), t.lineTo(479, 609)
        }
        t.stroke()
      } else {
        t.setGlobalAlpha(0.6)
      }
      t.drawImage('../../image/' + this.data.final4[item].img + '.png', mock4[item].x-10, mock4[item].y-6, mock4.size.w+20, mock4.size.h+13)
    }
    // 画2强
    for (let item in this.data.final2) {
      if (this.data.final2[item].name == this.data.final1.A.name) {
        t.setGlobalAlpha(1)
        t.beginPath()
        if (item == 'A'){
          t.moveTo(270, 610), t.lineTo(375, 610)
        } else if(item == 'B') {
          t.moveTo(375, 610), t.lineTo(480, 610)
        }
        t.stroke()
      } else {
        t.setGlobalAlpha(0.6)
      }
      t.drawImage('../../image/' + this.data.final2[item].img + '.png', mock2[item].x-15, mock2[item].y-10, mock2.size.w+30, mock2.size.h+20)
    }
    // 画1强
    t.setGlobalAlpha(1)
    t.beginPath(), t.moveTo(375, 580), t.lineTo(375, 613), t.closePath(), t.stroke()
    t.setFontSize(28), t.setFillStyle("#ffffff"), t.setTextAlign("center")
    t.drawImage('../../image/' + this.data.final1.A.img + '.png', mock1.A.x, mock1.A.y, mock1.size.w, mock1.size.h)
    t.fillText(this.data.final1.A.name, mock1.A.x + mock1.size.w / 2, mock1.A.y + mock1.size.h * 2 - 20)
    t.setFontSize(24), t.setFillStyle("#ec6f3d"), t.setTextAlign("center")
    t.fillText(this.data.final1.A.name, 340, 250)
    t.fillText(this.data.final1.A.rank, 438, 286)

    

    // 绘制-生成图片
    const drawTemp = () => {
      t.draw(true, () => {
        wx.canvasToTempFilePath({
          width: 750,
          height: 1250,
          destWidth: 750,
          destHeight: 1250,
          canvasId: "canvas",
          success: (res) => {
            this.setData({
              imagePath: res.tempFilePath,
              gssani: 'gssani'
            });
            wx.hideLoading();
          }
        })
      })
    }
    // 二维码
    if (!!this.data.verflag) {
      t.setFontSize(24), t.setFillStyle("#ffffff"), t.setTextAlign("center")
      t.fillText('长按二维码', 375, 1088)
      t.fillText('生成你的冠军之路', 375, 1118)
      if (!!app.globalConfig.erweima) {
        wx.getImageInfo({
          src: app.globalConfig.erweima[rnd(0, app.globalConfig.erweima.length - 1)],
          success: (res => {
            t.drawImage(res.path, 298, 892, 156, 156)
            drawTemp()
          })
        })
      } else {
        t.drawImage("../../image/erweima.png", 298, 892, 156, 156)
        drawTemp()
      }
    } else {
      drawTemp()
    }
  },
  // 保存
  tapSaveImg: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imagePath,
      success: () => {
        wx.showToast({
          title: "已保存到相册",
          icon: "success",
          duration: 2e3
        })
      }
    })
  },
  // 重选
  tapRefreash() {
    this.setData({
      imagePath: '',
      hideCanvas: true,
    })
  },
  // 跳转小程序埋点
  tapRecord(event) {
    if (!!event && !!event.currentTarget && !!event.currentTarget.dataset && !!event.currentTarget.dataset.appid) {
      let opt = {
        toapp: event.currentTarget.dataset.appid
      }
      recordClick(opt);
    }
  },
  // 分享
  onShareAppMessage() {
    let tit = "[有人@我]决定了，这一次世界杯的走向就是这样了"
    let img = ''
    if (!!app.globalConfig.innerShareTits && app.globalConfig.innerShareTits.length > 0) {
      tit = app.globalConfig.innerShareTits[rnd(0, app.globalConfig.innerShareTits.length - 1)]
    }
    if (!!app.globalConfig.innerShareImgs && app.globalConfig.innerShareImgs.length > 0) {
      let img = app.globalConfig.innerShareImgs[rnd(0, app.globalConfig.innerShareImgs.length - 1)]
    }
    return {
      title: tit,
      imageUrl: img,
      path: "/pages/index/index"
    }
  },
  onShow() {
    if (this.data.intTimes != null) {
      this.data.intTimes = IntervalChange(this, app.globalConfig)
    }
  },
  onHide() {
    clearInterval(this.data.intTimes)
  },
  // 随机选择
  randomSel() {
    // 生成8强
    this.data.final8 = {
      A: rnd(0, 1) == 0 ? this.data.final16.A1 : this.data.final16.B2,
      B: rnd(0, 1) == 0 ? this.data.final16.C1 : this.data.final16.D2,
      C: rnd(0, 1) == 0 ? this.data.final16.E1 : this.data.final16.F2,
      D: rnd(0, 1) == 0 ? this.data.final16.G1 : this.data.final16.H2,
      E: rnd(0, 1) == 0 ? this.data.final16.B1 : this.data.final16.A2,
      F: rnd(0, 1) == 0 ? this.data.final16.D1 : this.data.final16.C2,
      G: rnd(0, 1) == 0 ? this.data.final16.F1 : this.data.final16.E2,
      H: rnd(0, 1) == 0 ? this.data.final16.H1 : this.data.final16.G2
    }
    // 生成4强
    this.data.final4 = {
      A: rnd(0, 1) == 0 ? this.data.final8.A : this.data.final8.B,
      B: rnd(0, 1) == 0 ? this.data.final8.C : this.data.final8.D,
      C: rnd(0, 1) == 0 ? this.data.final8.E : this.data.final8.F,
      D: rnd(0, 1) == 0 ? this.data.final8.G : this.data.final8.H
    }
    // 生成2强
    this.data.final2 = {
      A: rnd(0, 1) == 0 ? this.data.final4.A : this.data.final4.B,
      B: rnd(0, 1) == 0 ? this.data.final4.C : this.data.final4.D
    }
    // 生成1强
    this.data.final1 = {
      A: rnd(0, 1) == 0 ? this.data.final2.A : this.data.final2.B
    }
    this.setData({
      final8: this.data.final8,
      final4: this.data.final4,
      final2: this.data.final2,
      final1: this.data.final1,
      submitok: true
    })
  },
  // 关闭引导
  closeGuider () {
    this.setData({
      guider: false
    })
  }
})
