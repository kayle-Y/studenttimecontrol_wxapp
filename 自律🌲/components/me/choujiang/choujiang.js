// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    random:'',
    trasn:0,
  },
  zhuanin:function(e){
    let that = this
    let num = 0
    that.setData({
      random:Math.floor(Math.random() * 360),
      trasn:0,
    })
    let a = setInterval(function () {
      that.setData({
        trasn:that.data.trasn+5
      })
      if(360 <= that.data.trasn){
        that.data.trasn = 0
        num = num + 1
      }
      if(num == 3){
        that.currinl()
        clearInterval(a)
      }
    },5)
  },
  currinl:function(e){
    let that = this
    let name = ''
    if(that.data.random == 30 || that.data.random == 90 || that.data.random == 150 || that.data.random == 210 || that.data.random == 330){
      that.setData({
        random:that.data.random + 1
      })
    }
    if(that.data.random < 30 || 330 < that.data.random){
      name = '60分钟，恭喜你欧皇'
    }else if(that.data.random > 30 && that.data.random < 90){
      name = '30分钟'
    }else if(that.data.random > 90 && that.data.random < 150){
      name = '15分钟'
    }else if(that.data.random > 150 && that.data.random < 210){
      name = '10分钟'
    }else if(that.data.random > 210 && that.data.random < 270){
      name = "5分钟"
    }else{
      name = "1分钟，再接再厉吧"
    }
    let b = setInterval(function () {
      that.setData({
        trasn:that.data.trasn+2
      })
      if(that.data.random <= that.data.trasn){
        wx.showToast({
          title: name,
          icon: 'none',
          duration: 2000
        })
        clearInterval(b)
      }
    },10)
  },
})