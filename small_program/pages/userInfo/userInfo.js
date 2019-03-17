// pages/userInfo/userInfo.js
import url from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

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
  getUserInfo(e) {
    let t = this;
    let s = e.detail;
    console.log(s);
    // console.log(e)
    var e = e.detail;
    var opt = {
      openId: wx.getStorageSync("openid").openid,
      img: e.userInfo.avatarUrl,
      name: e.userInfo.nickName,
      sex: e.userInfo.gender,
      address: e.userInfo.city
    }
    console.log(opt)
    wx.request({
      url: url.url + 'user/adduser',
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: opt,
      success: (res) => {
       if(res.data.code==200){
         if (s.userInfo && s.userInfo.nickName) {
           wx.showModal({
             title: '恭喜',
             content: '登录成功',
             showCancel: 0,
             success() {
               console.log('登录成功');
               wx.setStorageSync("info", e)
                wx.navigateBack()
             }
           })
         } else {
           wx.showModal({
             title: '提示',
             content: '登录失败，请允许授权',
             showCancel: 0,
             success() {
             }
           })
         }
       } else {
         wx.showModal({
           title: '提示',
           content: '登录失败，请允许授权',
           showCancel: 0,
           success() {
           }
         })
       }
      }
    })
  }
})