// pages/binde/binde.js
const obj=require('../../utils/haizi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {

  },
  data: {
    inputValue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {

  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

change:function(e){
    if(e.currentTarget.dataset.value == ''){
      wx.showToast({
          title: '请输入',
          icon: 'none',
      });
    }else{
      this.setData({
        inputValue:e.currentTarget.dataset.value,
        currentstartTimer:Number(e.currentTarget.dataset.value)*60,
        show:true
      });
      
      this.setTime()
  }
  },
  bindRegionChange(evt){
    console.log(evt.detail);
  },
  dopost(evt){
    console.log(evt.detail.value);
  },
  goto:function(){
    wx.navigateTo({
      url: '/components0/stickyNotes/stickyNotes',
    })
  },
  goto1:function(){
    wx.navigateTo({
      url: '/components0/stickyNotes1/stickyNotes',
    })
  },
  goto2:function(){
    wx.navigateTo({
      url: '/components0/stickyNotes2/stickyNotes',
    })
  }
   
  
})