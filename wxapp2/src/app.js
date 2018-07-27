import { recordOpen, changeQuery } from '/lib/idx.js'
import { apple } from '/config/config.js'

//app.js
App({
  onLaunch (opt) {
    changeQuery(opt.query).then(res => {
      console.log(res)
      recordOpen(res, this)
    })
  },
  globalRecord:{
    channel: 'self',
    fromapp: ''
  },
  globalData: {
    userInfo: null
  },
  global16: {}
})