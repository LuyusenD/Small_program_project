//index.js
//获取应用实例
const app = getApp()
import url from'../../utils/config.js'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

   },
   onShow:function(){
     var _this = this;
     if (!wx.getStorageSync('info')) {
       wx.navigateTo({
         url: "/pages/userInfo/userInfo"
       })
     } else {
       console.log(wx.getStorageSync('logs'))
       console.log('用户已授权')
     }
     if (!wx.getStorageSync('openid')) {
       // 获取code
       wx.login({
         success: function (res) {
           if (res.code) {
             _this.getOpenid(res.code)
           } else {
             console.log('登录失败！' + res.errMsg)
           }
         }
       });
     } else {
       console.log(wx.getStorageSync('openid'))
       console.log('本地有openid')
     }
   },
  getOpenid(code){
    wx.request({
      url: url.url +'user/getopenid',
      method:"GET",
      header:{
       "content-type":"application/json"
      },
      data:{
        code:code,
        appid:url.appid
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==200){
          wx.setStorageSync("openid", res.data.data)
        }else{
          console.log('获取openid失败')
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  jump(e){
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  }
})
