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
  }
   
  
})