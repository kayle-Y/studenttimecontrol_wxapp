const app = getApp();
Page({
  data: {
  T:5,
  Y:5,
  },
  onLoad(){

  },
  onShow:function(){
    if(1)
     this.showModal3()
  },
showModal(e) {


  // daojishi(
  //   end{
  //     this.setData({
  //       modalName: 'modalname'
      
  //   })
  // }
  // )

    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
    modalName: null
    })
  },
  showModal1(e) {
    this.setData({
      modalName: null
    })
    wx.showModal({
      content:'【健康系统】同学你好，你今天的手机使用时长已达到上限。温馨提示：今日内部分APP的使用将受到限制，请眺望一下远方，活动活动身体，注意劳逸结合哟。',
      showCancel:false
    })


  },

  showModal2(e) {
    this.setData({
      modalName: null
    })

    wx.showModal({
      title: '锻炼',
      content: '请选择锻炼程度',
      cancelText:'轻',
      confirmText:'重',
      success: function (res) {
        if (res.confirm) {  
          wx.navigateTo({
            url: '/pages/basics/text1/text1',
          })
        } else {   
          wx.navigateTo({
            url: '/pages/basics/text/text',
          })
        }
      }
  })
  },
  showModal3(e) {
    this.setData({
      modalName:null
    })
    wx.showModal({
      title: '提示',
      content: '今日手机时间到上限了哦，要不要选择进行锻炼锻炼，活动活动筋骨呢？',
      cancelText:'不要',
      confirmText:'可以',
      success: function (res) {
        if (res.confirm) {  
          wx.showModal({
            title: '锻炼',
            content: '请选择锻炼程度',
            cancelText:'轻',
            confirmText:'重',
            success: function (res) {
              if (res.confirm) {  
                wx.navigateTo({
                  url: '/components/text/text1/text1',
                })
              } else {   
                wx.navigateTo({
                  url: '/components/text/text/text',
                })
              }
            }
          })
        } else {   
          wx.showModal({
            content:'【健康系统】同学你好，你今天的手机使用时长已达到上限。温馨提示：今日内部分APP的使用将受到限制，请眺望一下远方，活动活动身体，注意劳逸结合哟。',
            showCancel:false
           
          })
         /* wx.navigateTo({
            url: '/pages/index/index',
          })*/
        }
      }
    })
  },

})


