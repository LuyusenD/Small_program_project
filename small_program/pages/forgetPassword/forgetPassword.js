// pages/adminAddUser/adminAddUser.js
import url from '../../utils/config.js';
import MD5 from '../../utils/MD5.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password1: '',
    password2: '',
    password3: '',
    language:true
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
    if (wx.getStorageSync('language')) {
      if (wx.getStorageSync('language').language) {
        this.setData({
          language: true
        })
      } else {
        this.setData({
          language: false
        });
        console.log(wx.getStorageSync('language'))
      }
    } else {
      this.setData({
        language: false
      });
      console.log(wx.getStorageSync('language'))
    }
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
  // 旧密码
  getPassword1(e) {
    console.log(e)
    this.setData({
      password1: e.detail
    })
    console.log(1)
  },
  // 新密码
  getPassword2(e) {
    console.log(e)
    this.setData({
      password2: e.detail
    })
    console.log(2)
  },
  // 确认密码
  getPassword3(e) {
    console.log(e)
    this.setData({
      password3: e.detail
    });
    console.log(3)
  },
  // 修改密码
  setPassword() {
    var opt = {
      url: url.url + "user/forget",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        id: wx.getStorageSync('user').id,
        username: wx.getStorageSync('user').username,
        oldpassword: this.data.password1,
        newpassword: this.data.password2
      }
    };
    if (this.data.password1 && this.data.password2) {
      if (this.data.password2 != this.data.password3) {
        wx.showToast({
          title: this.data.language ? '两次密码输入不一致！' :'Two password input inconsistencies!',
          icon: 'none'
        })
        return;
      }
      url.ajax(opt)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            wx.showToast({
              title: this.data.language ? '修改成功！' :'Successful revision!',
              icon: 'success'
            })
            this.setData({
              password1: "",
              password2: "",
              password3: ""
            })
            setTimeout(() => {
              wx.navigateBack();

            }, 1000)
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
    } else {
      wx.showToast({
        title: this.data.language ? '请先输入旧密码和修改后密码！':'Please enter the old password and the modified password first!',
        icon: 'none'
      })
    }
  }
})