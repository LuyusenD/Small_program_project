// pages/adminAddUser/adminAddUser.js
import url from '../../utils/config.js';
import MD5 from '../../utils/MD5.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:''
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
  // 用户名
  getUserName(e){
    console.log(e)
    this.setData({
      username: e.detail
    })
  },
  // 密码
  getPassword(e){
    console.log(e)
    this.setData({
      password: e.detail
    })
  },
  // iocn 图标
  onClickIcon(){
    wx.showToast({
      title: '用于登录后台的账号!',
      icon:'none'
    })
  },
  // 注册
  register(){
    var opt={
      url: url.url +"user/addadmin",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        adminId: wx.getStorageSync('user').id,
        adminName: wx.getStorageSync('user').username,
        username: this.data.username,
        password: this.data.password
      }
    };
    if(this.data.username&&this.data.password){
      url.ajax(opt)
        .then((res)=>{
          console.log(res);
          if(res.code==200){
            wx.showToast({
              title: '注册成功！',
              icon:'success'
            })
            this.setData({
              username:"",
              password:""
            })
            setTimeout(()=>{
              wx.navigateBack();

            },1000)
          }else{
            wx.showToast({
              title: res.msg,
              icon:'none'
            })
          }
        })
    }else{
      wx.showToast({
        title: '请先输入用户名和密码！',
        icon:'none'
      })
    }
  },
  // 忘记密码
  forgetPassword(){
    wx.navigateTo({
      url: '/',
    })
  }
})