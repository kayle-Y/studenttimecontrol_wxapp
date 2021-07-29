// pages/noteDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prevPage: null,
    currentLoc: 0,
    Notes: [],
    words: '*',
    limit: 180
  },
  data1: {
    id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取主题色
    this.setData({
      themeColor: wx.getStorageSync('themeColor')
    })
    //调试：
    this.data1.id = options.id
    // console.log('传递的id1:',options.id,this.data1.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getNeedData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  calWords: function (e) {
    // 实时计算textarea内的文本长度
    this.setData({
      words: parseInt(e.detail.value.length)
    })
  },

  storeNote: function (event) {
    var that = this
    var notes = this.data.Notes
    var text = event.detail.value
    notes[that.data.currentLoc].value = text
    wx.setStorageSync('Notes', notes)
    this.updatePrev()
  },

  updatePrev: function () {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    var pNote = prevPage.selectComponent('#note')
    pNote.updateCached()
  },

  getNeedData: function () {
    let cachedNotes = this.data.Notes.concat(
      wx.getStorageSync('Notes')
    )
    this.setData({
      Notes: cachedNotes,
      currentLoc: wx.getStorageSync('currentLoc')
    })
    if (this.data.Notes[this.data.currentLoc].iconStyle === "cu-time") {
      this.setData({
        limit: 10
      })
    }
  },

  deleteNote: function (options) {
    // 点击删除图标触发
    var loc = this.data.currentLoc
    var notes = this.data.Notes
    // console.log('传递的id2:',this.data1.id)
    if (loc !== 0 && notes[loc - 1].iconStyle === "cu-time") {
      // 如果该天标签都被删除则删除时间项
      if (notes.length - 1 === loc || notes[loc + 1].iconStyle === "cu-time") {
        notes.splice(loc - 1, 2)
      } else {
        notes.splice(loc, 1)
      }
    } else {
      notes.splice(loc, 1)
    }

    //删除便签数据
    wx.cloud.database().collection('note')
      .doc(this.data1.id) //删除第index条数据
      .remove() //删除数据
      // .get()
      .then(res => {
        console.log('删除成功', this.data1.id)
      })
      .catch(err => {
        console.log('删除失败', err)
      })

    wx.setStorageSync('Notes', notes)
    //缓存并更新标签数据，返回标签列表
    this.updatePrev()
    wx.navigateBack({
      delta: 1
    })
  },

  onlocationtap:function(){
    wx.getSetting({
      successs: res =>{
        const islocation = res.authSetting['Scope.userLocation'];
        if(islocation){
          wx.chooseLocation({
           success: res=>{
             console.log(res);
           }
          })

        }else{
          wx.authorize({
            scope: "scope.userLocation",
            success: res=>{
             wx.chooseLocation({
               success: res=>{
                 console.log(res);
               }
              })
            }
          })
        }
      }
    })
 },

})