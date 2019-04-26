//index.js
//获取应用实例
const app = getApp()
import url from'../../utils/config.js'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 语言 true==>中文
    language:true,
    serve:[
      {
        img: '/image/aircraft.jpg',
        language: {
          Englist: 'immediately',
          Chinese: '机场接送'
        },
        url: "/pages/placeOrder/placeOrder"
      },
      {
        img: '/image/Tourism.jpg',
        language: {
          Englist: 'Chartered Tour',
          Chinese: '包车旅游'
        },
        url: "/pages/placeOrder/placeOrder"
      },
      {
        img: '/image/moving.jpg',
        language: {
          Englist: 'Small piece moving',
          Chinese: '小件搬家'
        },
        url: "/pages/placeOrder/placeOrder"
      },
    ],
    list:[
      {
        img: '/image/seachOrder.png',
        language: {
          Englist: 'Enquiry',
          Chinese: '查询订单'
        },
        url: "/pages/search/search"
      },
      {
        img: '/image/admin.png',
        language: {
          Englist: 'admin',
          Chinese: '管理后台'
        },
        url: "/pages/admin/admin"
      },
      {
        img: '/image/orderMine.png',
        language: {
          Englist: 'My order',
          Chinese: '我的订单'
        },
        url: "/pages/orderList/orderList"
      },
    ],
    login: [
      '/image/login.jpg',
      '/image/login.jpg',
      '/image/login.jpg',
      '/image/login.jpg',
      '/image/login.jpg',
      ]
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
     if (wx.getStorageSync('language')){
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
     }else{
       this.setData({
         language: false
       });
       console.log(wx.getStorageSync('language'))
     }
     var _this = this;
     if (!wx.getStorageSync('info')) {
       wx.navigateTo({
         url: "/pages/userInfo/userInfo"
       })
     } else {
       console.log(wx.getStorageSync('logs'))
       console.log('用户已授权')
     }
     _this.isOpenid();
     _this.getServe();
   },
  //  判断本地是否有openid
  isOpenid(){
    var _this=this;
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
  // 获取服务
  getServe(){
      // 获取serve
      var opt = {
        url: url.url + 'buff',
        method: "GET",
        header: {
          "content-type": "application/json"
        },
        data: {},
      };
      url.ajax(opt)
        .then((res) => {
          if (res.code == 200) {
            wx.setStorageSync("Serve", res.data)
          } else {
            console.log('获取Serve失败')
          }
        })

  },
  getOpenid(code){
    var opt={
      url: url.url + 'user/getopenid',
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      data: {
        code: code,
        appid: url.appid
      },
    };
    url.ajax(opt)
      .then((res)=>{
        if (res.code == 200) {
          wx.setStorageSync("openid", res.data)
        } else {
          console.log('获取openid失败')
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
