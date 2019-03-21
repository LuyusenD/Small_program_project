// pages/search/search.js
import url from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    list:[]
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
  // 搜索发生变化触发
  onChageSearch(e){
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },
  // 点击搜索触发
  onSearch(e){
    // console.log(e)
    var opt={
      url: url.url +"order/getorder",
      data:{
        str:this.data.value
      }
    }
  if(this.data.value){
    url.ajax(opt)
      .then((res) => {
        if (res.code == 200) {
          if (res.data.data.length > 0) {
            this.setData({
              list: res.data.data
            })
          } else {
            wx.showToast({
              title: '暂无查到相关订单!!',
              icon: 'none'
            })
          }
        }
      })
  }else{
    wx.showToast({
      title: '亲，亲输入订单号，或手机号',
      icon:'none'
    })
  }
  }
})