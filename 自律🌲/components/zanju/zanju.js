// component/zanju/zanju.js
var util = require('../../utils/util')
const app = getApp();

Page({
  data: {
    TabCur: 0,
    scrollLeft: 0
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})

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
    colors: [
      "red", "orange", "olive", "green",
      "cyan", "mauve", "purple"
    ],
    currentDate: "",
    currentLoc: 0,
    Notes: [],
    words: '*',
    id1: ""
  },


  lifetimes: {
    attached: function () {
      this.getCached()
      //获取主题色
      this.setData({
        themeColor: wx.getStorageSync('themeColor')
      })
    },
    detached: function () {
      this.setCached()
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {

    getDate: function () {
      return util.formatDate(new Date())
    },

    addInput: function (event) { // 添加便签逻辑
      //点击创建按钮后，会调用该方法
      var lists = this.data.Notes
      var nowDate = this.getDate()
      if (nowDate !== this.currentDate) {
        // 该时段创建的第一个便签，则添加一个时间项
        this.currentDate = nowDate
        var element = {
          value: nowDate,
          iconStyle: "cu-time",
          cardStyle: "",
          noteShake: false,
        }
        lists.push(element)
      }

      //添加便签数据
      var index = event.currentTarget.dataset.id
      wx.cloud.database().collection('note')
        .add({ //添加数据
          data: {
            index: index,
            notes: this.data.Notes[index].value
          }
        })
        .then(res => {
          console.log('添加成功', index, res, this.data.id1)
          var randomColor = this.data.colors[Math.floor(Math.random() * this.data.colors.length)]
          // 创建随机颜色的便签
          var element = {
            value: "新的标签",
            iconStyle: "cu-item",
            cardStyle: randomColor,
            noteShake: false,
            lock: false,
            _id: res._id
          }
          lists.push(element)
          this.setData({
            Notes: lists,
          })
        })
        .catch(err => {
          console.log('添加失败', err)
        })
    },

    // shakeNote: function (event) {
    //   // 便签锁定时的抖动逻辑
    //   var that = this
    //   var index = event.currentTarget.dataset.id
    //   var notes = this.data.Notes
    //   //设为允许抖动
    //   notes[index].noteShake = true
    //   that.setData({
    //     Notes: notes
    //   })
    //   setTimeout(function () {
    //     notes[index].noteShake = false
    //     that.setData({
    //       Notes: notes
    //     })
    //   }, 1000)
    // },

    // lockNote: function (event) {
    //   // 锁定便签
    //   var that = this
    //   var notes = this.data.Notes
    //   var index = event.currentTarget.dataset.id
    //   notes[index].lock = (!notes[index].lock)
    //   // 便签样式设定为锁定或解锁
    //   notes[index].iconStyle = notes[index].lock ? 'cu-item cuIcon-lock' : 'cu-item cuIcon-unlock'
    //   that.setData({
    //     Notes: notes
    //   })
    // },

    showCuNote: function (event) {
      // 点击标签，将会展示便签细节
      var that = this
      var index = event.currentTarget.dataset.id
      that.setData({
        currentLoc: index
      })
      //缓存页面信息
      wx.setStorageSync('currentLoc', this.data.currentLoc)
      wx.setStorageSync('Notes', this.data.Notes)
      //跳转到便签详情界面
      console.log('访问数据的id', this.data, this.data.Notes)
      wx.navigateTo({
        url: '../../pages/zanjuDetails/zanjuDetails?id=' + this.data.Notes[index]._id, //传递id
      })
    },

    getCached: function () {
      // 获取缓存的便签数据
      let cachedNotes = this.data.Notes.concat(
        wx.getStorageSync('Notes')
      )
      this.setData({
        Notes: cachedNotes
      })
    },

    updateCached: function () {
      // 更新页面上的便签数据
      this.setData({
        Notes: wx.getStorageSync('Notes')
      })

      //更新数据库便签数据
      var id = this.data.Notes[this.data.currentLoc]._id
      wx.cloud.database().collection('note')
        .doc(id) //更新数据的id
        .update({
          data: {
            notes: this.data.Notes[this.data.currentLoc].value
          }
        })
        .then(res => {
          console.log('更新成功', res, this.data.Notes[this.data.currentLoc].value)
        })
        .catch(err => {
          console.log('更新失败', err)
        })
    },

    setCached: function () {
      // 缓存当前的便签数据
      wx.setStorageSync('Notes', this.data.Notes)
      wx.setStorageSync('currentLoc', this.data.currentLoc)
    }

  },

})