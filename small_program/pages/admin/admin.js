// pages/admin/admin.js
import url from '../../utils/config.js';
import MD5 from '../../utils/MD5.js';
import Dialog from '../../vant-weapp/dist/dialog/dialog';
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
    wx.showLoading({
      title: '正在加载数据...',
      mask:true
    });
    if(wx.getStorageSync("user")){
      wx.hideLoading();
      wx.navigateTo({
        url: '/pages/adminList/adminList',
      })
    }else{
      wx.hideLoading();
      console.log('用户未登录')
    }
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
    if(this.data.uname==''){
      wx.showToast({
        title: '亲，请输入账号哦！',
        icon:'none'
      });
      return;
    }
    if(this.data.paddword==''){
      wx.showToast({
        title: '亲，请输入密码哦！',
        icon:'none'
      });
      return;
    }
    wx.showLoading({
      title: '正在加载..',
      mask: true
    })
    url.ajax(opt)
      .then((res) => {
        wx.hideLoading();
        console.log(res)
        if(res.code==200){
          wx.showToast({
            title: '登录成功!',
            icon:'success'
          });
          wx.setStorageSync('user', res.data);
         setTimeout(()=>{
           wx.navigateTo({
             url: '/pages/adminList/adminList',
             success:()=>{
               this.setData({
                 uname:'',
                 password:''
               })
             }
           })
         },1000)
        }else if(res.code==401){
          Dialog.alert({
            title: '提示',
            message: res.msg
          }).then(() => {
            // on close
          });
        }
      })
  }
})