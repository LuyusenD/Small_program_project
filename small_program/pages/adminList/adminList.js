// pages/adminList/adminList.js
import url from '../../utils/config.js';
import MD5 from '../../utils/MD5.js';
import Dialog from '../../vant-weapp/dist/dialog/dialog';
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
    var user=wx.getStorageSync('user');
    if(!user){
      Dialog.alert({
        title: '提示',
        message: '该账号已过期，请重新登录！'
      }).then(() => {
        // on close
        wx.navigateBack();
      });

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
  // 页面跳转
  jump(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },
  // 是否退出的登录
  isloginOut(){
    var _this=this;
    Dialog.confirm({
      title: '提示',
      message: '是否确认退出该账号？'
    }).then(() => {
      console.log('弹框后点取消');
      _this.loginOut()
    }).catch(() => {
      console.log('弹框后点取消')
    });
  },
  // 退出登录
  loginOut() {
    var user=wx.getStorageSync('user')
    var opt={
      url: url.url +"user/out",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        id: user.id,
        username: user.username
      }
    };
    url.ajax(opt)
      .then((res)=>{
        if(res.code==200){
          wx.showLoading({
            title: '正在退出登录..',
          })
          setTimeout(()=>{
            wx.hideLoading();
            wx.removeStorage({
              key: 'user',
              success(res) {
                console.log(res)
              }
            })  
            wx.navigateBack();
          },1000)
        }
      })
  }
})