// pages/adminAddUser/adminAddUser.js
import url from '../../utils/config.js';
import MD5 from '../../utils/MD5.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    email: '',
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
  // 用户名
  getuserName(e) {
    console.log(e)
    this.setData({
      username: e.detail
    })
  },
  // 邮箱
  getEmail(e) {
    console.log(e)
    this.setData({
      email: e.detail
    })
  },
  // 获取密码
  getPassword() {
    var opt = {
      url: url.url + "user/forget",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        username:this.data.username,
        email: this.data.email
      }
    };
    if (this.data.email) {
      if (!this.data.username) {
        wx.showToast({
          title: this.data.language ? '请输入忘记密码的用户名!' : 'Please enter the username with forgotten password!',
          icon: 'none'
        })
        return;
      }
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.data.email)) {
        wx.showToast({
          title: this.data.language ? '邮箱格式不正确！' :'The mailbox format is incorrect!',
          icon: 'none'
        })
        return;
      }
      url.ajax(opt)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            wx.showToast({
              title: this.data.language ? '已发送至邮箱' :'Send to mailbox',
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
              title: this.data.language ? '未找到用户名或邮箱' :'No username or mailbox was found',
              icon: 'none'
            })
          }
        })
    } else {
      wx.showToast({
        title: this.data.language ? '请先输入所绑定的邮箱！' :'Please enter the bound mailbox first!',
        icon: 'none'
      })
    }
  }
})