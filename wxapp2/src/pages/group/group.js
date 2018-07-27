const app = getApp()
import { HasOpenId, HasConfig, UpFormid } from '../../lib/idx.js'
import { rnd } from '../../utils/util.js'
import { apple } from '../../config/config.js'
import { mockList } from '../../mock/mock.js'

Page({
  data: {
    verflag: false,
    groups: mockList,
    submitok: false
  },
  onLoad () {
    HasOpenId().then(res => {})
  },
  // 选择
  selItem(event) {
    let dx = event.currentTarget.dataset
    let group = this.data.groups[dx.idx], country = group.country[dx.jdx]
    if (country.cls == 'sel1' || country.cls == 'sel2'){
      // 当前已选中：删除此选择
      country.cls = ''
      group.count--
    } else {
      // 当前未选中：判定已选中数量
      if (this.data.groups[dx.idx].count <= 0) {
        // 0个选中：增加sel1
        country.cls = 'sel1'
        group.count = 1
      } else if (this.data.groups[dx.idx].count == 1) {
        // 1个选中：判定被选中的是谁
        for (let i = 0; i < group.country.length; i++) {
          if (group.country[i].cls == 'sel1') {
            // 当前应该为sel2
            country.cls = 'sel2'
            group.count = 2
            break;
          } else if (group.country[i].cls == 'sel2') {
            // 当前应该为sel1
            country.cls = 'sel1'
            group.count = 2
            break;
          }
        }
      }
    }
    // 判定按钮高亮
    this.data.submitok = true;
    for (let i = 0; i < this.data.groups.length; i++) {
      if (this.data.groups[i].count <= 1) {
        this.data.submitok = false;
        break;
      }
    }
    this.setData({
      groups: this.data.groups,
      submitok: this.data.submitok
    })
  },
  // 提交淘汰赛
  tapSubmit () {
    if (!!this.data.submitok) {
      for (let i = 0; i < this.data.groups.length; i++) {
        let countries = this.data.groups[i].country
        for (let j = 0; j < countries.length; j++){
          if (countries[j].cls == 'sel1') {
            app.global16[this.data.groups[i].name + '1'] = countries[j]
          } else if (countries[j].cls == 'sel2') {
            app.global16[this.data.groups[i].name + '2'] = countries[j]
          }
        }
      }
      wx.navigateTo({
        url: '../final/final',
      })
    }
  },
  // 分享
  onShareAppMessage () {
    let tit = "2018世界杯冠军之路，你能否猜到？"
    let img = ''
    if (!!app.globalConfig.indexShareTits && app.globalConfig.indexShareTits.length > 0) {
      tit = app.globalConfig.indexShareTits[rnd(0, app.globalConfig.indexShareTits.length - 1)]
    }
    if (!!app.globalConfig.indexShareImgs && app.globalConfig.indexShareImgs.length > 0) {
      let img = app.globalConfig.indexShareImgs[rnd(0, app.globalConfig.indexShareImgs.length - 1)]
    }
    return {
      title: tit,
      imageUrl: img,
      path: "/pages/index/index"
    }
  },
  // 随机选择
  randomSel () {
    let randomArray = [];
    // 生成随机数组
    for (let i = 0; i < this.data.groups.length; i++) {
      randomArray[i] = []
      randomArray[i][0] = (rnd(0, this.data.groups[i].country.length - 1))
      let rnd2 = rnd(0, this.data.groups[i].country.length - 1)
      while (rnd2 == randomArray[i][0]){
        rnd2 = rnd(0, this.data.groups[i].country.length - 1)
      }
      randomArray[i][1] = rnd2
    }
    // 根据数组选择队伍
    for (let i = 0; i < this.data.groups.length; i++) {
      for (let j = 0; j < this.data.groups[i].country.length; j++) {
        if (j == randomArray[i][0]) {
          this.data.groups[i].country[j].cls = 'sel1'
        } else if (j == randomArray[i][1]) {
          this.data.groups[i].country[j].cls = 'sel2'
        } else {
          this.data.groups[i].country[j].cls = ''
        }
      }
      this.data.groups[i].count = 2;
    }
    this.setData({
      groups: this.data.groups,
      submitok: true
    })
  }
})
