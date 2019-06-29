// pages/orderListDetail/orderListDetail.js
import play from '../../utils/payment.js'
import url from '../../utils/config.js';
import MD5 from '../../utils/MD5.js';
import Dialog from '../../vant-weapp/dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面数据
    list:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.oId){
      wx.showLoading({
        title: '正在加载数据...',
        mask:true
      });
      this.setData({
        oId: options.oId
      });
      this.getListDetail(options.oId);
    }else{
      wx.showToast({
        title: '获取详情失败..',
        icon:'none'
      })
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
    this.getListDetail(this.data.oId);
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
  getListDetail(oId){
    var _this=this;
    var opt={
      url: url.url +'order/getorder',
      method:"GET",
      data:{
        str: oId
      }
    }
    url.ajax(opt)
      .then((res)=>{
        wx.hideLoading();
        if (res.code==200){
          
          console.log(res.data.data[0].createTime)
          var createTime = parseInt(res.data.data[0].createTime)
          res.data.data[0].createTime = res.data.data[0].createTime==0?'无': url.formatTime(createTime, 'Y-M-D h:m:s');
          var arr = wx.getStorageSync('Serve').serve;
            for (var j = 0; j < arr.length; j++) {
              if (res.data.data[0].oType == arr[j].id) {
                res.data.data[0].oType = arr[j].name.split('(')[0];
                res.data.data[0].img = url.url+  arr[j].icon;
                console.log('http://' + arr[j].icon)
                continue;
              }
          }
          var arr1 = wx.getStorageSync('Serve').vehicle;
          for (var i = 0; i < arr1.length; i++) {
            for (var j = 0; j < res.data.data.length; j++) {
              if (res.data.data[j].oVehicle == arr1[i].id) {
                res.data.data[j].oVehicle = arr1[i].name;
                res.data.data[j].price = res.data.data[0].money;
                continue;
              }
            }
          }
          _this.setData({
            list:res.data.data[0]
          })
        }else{
          wx.showToast({
            title: '获取订详情失败..',
            icon:'none'
          })
        }
      })
  },
  //修改金额
  replenishment () {
    play.play(this.data.list)
  },
  cancelOrder(e) {
    var _this = this;
    // 订单编号
    console.log(e)
    var oId = e.currentTarget.dataset.value;
    console.log(oId);
    Dialog.confirm({
      title: this.data.language ? '提示' : 'Tips',
      message: this.data.language ? '你确定要删除该订单吗?' : 'Are you sure you want to delete the order?'
    }).then(() => {
      var opt = {
        url: url.url + 'order/delorder',
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          oId: MD5.md5(MD5.md5(MD5.md5(oId))) + "xn"
        }
      };
      url.ajax(opt)
        .then((res) => {
          if (res.code == 200) {
            Dialog.alert({
              message: this.data.language ? '删除成功' : 'Delete successful'
            }).then(() => {
              // on close
              wx.switchTab({
                url: '/pages/index/index',
              })
            });
          } else {
            Dialog.alert({
              message: this.data.language ? '删除失败' : 'Delete failed'
            }).then(() => {
              // on close
            });
          }
        })
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
 
})