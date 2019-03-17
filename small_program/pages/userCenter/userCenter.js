// pages/userCenter/userCenter.js
var app = getApp();
var util = require('../../utils/util.js');

Page({
  onShow: function () {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    });
  },
})