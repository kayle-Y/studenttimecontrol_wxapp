// components/me/me.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {
    themeModal:false,
    colorList:app.globalData.ColorList.slice(0,8),
    hasUserInfo : false,
    userInfo : {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      if(wx.getStorageSync('userInfo')){
        this.setData({
          userInfo:wx.getStorageSync('userInfo'),
          hasUserInfo:true
        })
      }
       //获取主题色
       this.setData({
        themeColor:wx.getStorageSync('themeColor')
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
     
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取个人信息
    getUserInfo: function(e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.setStorageSync('userInfo',this.data.userInfo)
    },
    onLoad(){
      if(wx.getStorageSync('userInfo')){
        this.setData({
          userInfo:wx.getStorageSync('userInfo'),
          hasUserInfo:true
        })
      }
    },
   
  //更改主题色
    hideModal(e) {
      this.setData({
        themeModal: false
      })
    },
    changeTheme(){
      this.setData({
        themeModal: true
      })
      
    },
    themeSelect(e){
        let id=e.currentTarget.dataset.id
        wx.setStorageSync('themeColor',this.data.colorList[id].name)
        let flag={themeColor:this.data.colorList[id].name}
        this.triggerEvent('themeChange',flag)
        this.setData({
          themeColor:this.data.colorList[id].name
        })
        this.hideModal()
     
    },
    //赞赏支持
    showQrcode() {
      wx.previewImage({
        urls: ['file:///Users/mac/Desktop/%E8%87%AA%E5%BE%8B%F0%9F%8C%B2/images/weixinzhifu.png'],
        current: 'file:///Users/mac/Desktop/%E8%87%AA%E5%BE%8B%F0%9F%8C%B2/images/weixinzhifu.png' // 当前显示图片的http链接      
      })
    },
  
  }
})
