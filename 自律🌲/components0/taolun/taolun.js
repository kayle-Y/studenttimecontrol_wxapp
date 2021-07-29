const obj= require('../../utils/haizi');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     styles:[
       {class:'now',text:'吐槽区'},
       {class:'',text:'打卡区'},
       {class:'',text:'专家答疑'},
     ],
     index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {

  },
   tab(evt){
     let index=evt.target.dataset.index;
     let styles = this.data.styles;
     let ret=obj.fn(styles,index);
     this.setData(ret);
   },
   changetab(evt){
    let index=evt.detail.current;
     let styles = this.data.styles;
     let ret=obj.fn(styles,index);
     this.setData(ret);
   }
   
})
