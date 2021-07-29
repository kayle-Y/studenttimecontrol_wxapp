// pages/binde/binde.js
const obj=require('../../utils/haizi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {

  },
  
  bindRegionChange(evt){
    console.log(evt.detail);
  },
  dopost(evt){
    console.log(evt.detail.value);
  },
  goto:function(){
    wx.navigateTo({
      url: '/components0/chart/chart',
    })
  },
  goto1:function(){
    wx.navigateTo({
      url: '/components0/chart1/chart',
    })
  },
  goto2:function(){
    wx.navigateTo({
      url: '/components0/chart2/chart',
    })
  }
   
  
})