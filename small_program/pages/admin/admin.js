// pages/admin/admin.js
import url from '../../utils/config.js';
import MD5 from '../../utils/MD5.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:'',
    paddword:''
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
    console.log(e.detail.value)
    this.setData({
      uname: e.detail.value
    })
  },
  // 密码
  getPassword(e) {
    this.setData({
      paddword: e.detail.value
    })
    console.log(e.detail.value)
  },
  // 登录
  submit(e){
    // console.log(e)
    var opt={
      url: url.url +'user/login',
      method:"POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        username:this.data.uname,
        password:this.data.paddword
      }
    };
    url.ajax(opt)
      .then((res)=>{
        console.log(res)
      })
  }
})