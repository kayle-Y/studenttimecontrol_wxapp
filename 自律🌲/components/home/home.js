var interval;



Component({


  properties: {
    show:Boolean,

  },

  data: {
    countDownDay: '00',
    countDownHour: '00',
    countDownMinute: '00',
    countDownSecond: '00',
    currentstartTimer:'',
    interval:'',
    // show:true 
  },

  lifetimes: {
    created:function(){
    }
    ,
    attached:function(){
      console.log('attach')
      wx.cloud.database().collection('time')
    .doc('8937eaa961026b4f00aae13758fb8ed3')  //修改数据的_id
    .get()
      .then(res => {
        console.log('添加时间成功', res.data.time)
        this.setData({
        currentstartTimer:res.data.time*60,
        // show:true
      })
      this.setTime()
      })
      .catch(err => {
        console.log('更改时间失败', err)
      })
      
      

    },

    detached:function(){
      this.startTimer()
      console.log('detached')
    }
  },

  methods: {
  setTime:function () {
    const that = this;
    var currentstartTimer = that.data.currentstartTimer;

    var second = currentstartTimer;
    var currentstartTimer = wx.setStorageSync("time",currentstartTimer);
    var day = Math.floor(second / 3600 / 24);
    var dayStr = day.toString();
    if (dayStr.length == 1) dayStr = '0' + dayStr;

    var hr = Math.floor((second - day * 3600 * 24) / 3600);
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;

    this.setData({
      countDownDay: dayStr,
      countDownHour: hrStr,
      countDownMinute: minStr,
      countDownSecond: secStr,
    });
    currentstartTimer--;
    console.log("---12-12---- " + currentstartTimer);
    if (currentstartTimer <= 0) {
      clearInterval(interval);
      this.setData({
        countDownDay: '00',
        countDownHour: '00',
        countDownMinute: '00',
        countDownSecond: '00',
      });
    }
  },

  startTimer: function(currentstartTimer) {
    const that = this;
    var currentstartTimer = wx.getStorageSync('time',currentstartTimer)
    clearInterval(interval);
    interval = setInterval(function() {
    
      var second = currentstartTimer;
     
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
 
   
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
 
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
 

      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
 
      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,

      });
      currentstartTimer--;
      console.log("---12-12---- " + currentstartTimer);
   
      wx.setStorageSync('time', currentstartTimer)
      if (currentstartTimer <= 0) {
        clearInterval(interval);
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },

  stopTimeTap:function () {

    clearInterval(interval);
  },
},

pageLifetimes: {
  show: function() {
    showModal3();
    this.stopTimeTap();
    
    
  },
  hide: function() {
    this.startTimer();
   
  },
  
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
      }
    }
  })
},

})










