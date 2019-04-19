// pages/userCenter/userCenter.js
var app = getApp();
var util = require('../../utils/util.js');
import Dialog from '../../vant-weapp/dist/dialog/dialog';
Page({
  data:{
    checked: true,
    order:
      {
        Englist:'My order',
        Chinese:'我的订单',
        url:"/pages/orderList/orderList"
      },
    evaluate:{
        Englist:'To be evaluated',
        Chinese:'待评价',
        url:"/pages/evaluate/evaluate"
      },
    Feedback:{
        Englist:'Feedback',
        Chinese:'意见反馈'
        },
    language:{
        Englist:'Choice language',
        Chinese:'选择语言'
      },
  },
  onShow: function () {
    var that = this;
    that.setData({
      userInfo: wx.getStorageSync('info').userInfo
    });
    if (wx.getStorageSync('language')) {
      if (wx.getStorageSync('language').language) {
        this.setData({
          checked: true
        })
      } else {
        this.setData({
          checked: false
        });
        console.log(wx.getStorageSync('language'))
      }
    } else {
      this.setData({
        checked: false
      });
      console.log(wx.getStorageSync('language'))
    }
  },
  onChange(e) {
    console.log(e)
    var language,
        title;
    if (e.detail.value){
      console.log('中文');
      language='你确定要切换为English语言吗?';
      title = "提示";
    }else{
      console.log('English');
      language = 'Are you sure you want to switch to Chinese?';
      title ='Tips';
    }
    console.log(language, title)
    Dialog.confirm({
      title: title,
      message: language
    }).then(() => {
      // on confirm
      this.setData({
        checked: e.detail.value
      })
      // language true==>中文   false==>英文
      wx.setStorageSync("language", {'language':this.data.checked})
    }).catch(() => {
      // on cancel
    });
    // 需要手动对 checked 状态进行更新
   
  }
})