// pages/evaluateDetail/evaluateDetail.js
import url from '../../utils/config.js';
import MD5 from '../../utils/MD5.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单相情感
    list:[],
    // 打分
    value:'',
    // 评价内容
    content:'',
    // 订单编号
    oId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      oId: options.oId
    })
    this.getOrderDetail(options.oId)
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
  // 获取订单详情
  getOrderDetail(oId){
    wx.showLoading({
      title: '正在加载数据...',
      mask:true
    })
    var opt={
      url: url.url +'order/getorder',
      method:"GET",
      data:{
        str:oId
      }
    };
    url.ajax(opt)
      .then((res)=>{
        console.log(res)
        wx.hideLoading();
        if(res.code==200){
          if (res.data) {
            var arr = wx.getStorageSync('Serve').serve;
            for (var i = 0; i < arr.length; i++) {
                if (res.data.data[0].oType == arr[i].id) {
                  res.data.data[0].oType = arr[i].name;
                  res.data.data[0].img = 'http://' + arr[i].icon;
                  continue;
              }
            }
            this.setData({
              list: res.data.data[0],
            });
            console.log(this.data.list)
          } else {
            wx.showToast({
              title: '获取信息失败..',
              icon: 'none'
            })
          }
        }else{
          wx.showToast({
            title: '获取信息失败..',
            icon:'none'
          })
        }
      })
  },
  onChange(event) {
    console.log(event)
    this.setData({
      value: event.detail*20
    });
  },
  textValue(e) {
    console.log(e)
    var value = e.detail.value;
    this.setData({
      content: value
    })
  },
  // 提交
  sub() {
    if (this.data.content.length > 20) {
      if(this.data.value==''){
        return;
      }
      this.req()
    } else {
      wx.showToast({
        title: '亲,评价至少要20个字哦！',
        icon: 'none'
      })
    }
  },
  req(){
    var opt={
      url: url.url +'order/addevaluate',
      method:"POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        oId: MD5.md5(MD5.md5(MD5.md5(this.data.oId)))+'xn',
        evaluate:this.data.content,
        score:this.data.value
      }
    };
    url.ajax(opt)
      .then((res)=>{
        console.log(res);
        if(res.code==200){
          wx.showToast({
            title: '感谢你的评价！',
            icon:'none'
          });
          setTimeout(()=>{
            wx.navigateBack()
          },2000)
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
      })
  }
})