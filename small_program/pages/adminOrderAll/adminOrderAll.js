// pages/adminOrderAll/adminOrderAll.js
import url from '../../utils/config.js';
import MD5 from '../../utils/MD5.js';
import Dialog from '../../vant-weapp/dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户所有订单
    orderList: [],
    // 当前分页显示订单个数
    order: [],
    // 当前页数
    page: 1,
    // 当前页数显示个数
    pageSize: 6,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getorderListAll();
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
    wx.showLoading({
      title: '正在加载数据...',
      mask: true
    });
    console.log(this.data.orderList.length / this.data.pageSize)
    console.log(this.data.page)
    if (this.data.orderList.length / this.data.pageSize > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
      setTimeout(() => {
        wx.hideLoading();
        this.setData({
          order: this.nextData(this.data.orderList, this.data.pageSize, this.data.page)
        });
        wx.showToast({
          title: '订单刷新成功',
          icon: 'success'
        })
      }, 1500)
    } else {
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: '亲,没有更多订单了!',
          icon: 'none'
        })
      }, 1500)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 所有订单页面
  getorderListAll(){
    wx.showLoading({
      title: '正在加载数据...',
      mask: true
    })
    var opt = {
      url: url.url + "order/allOrder",
    };
    url.ajax(opt)
      .then((res) => {
        wx.hideLoading();
        if (res.code == 200) {
          if (res.data) {
            var oType = wx.getStorageSync("Serve");
            for (var i = 0; i < oType.length;i++){
              for (var j = 0; j < res.data.data.length;j++){
                if (res.data.data[j].oType==oType[i].id){
                  res.data.data[j].oType = oType[i].name
                }
              }
            }
            this.setData({
              orderList: res.data.data,
              order: this.nextData(res.data.data, this.data.pageSize, this.data.page)
            })
          } else {
            wx.showToast({
              title: '获取订单信息失败,请稍后重试...',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: '获取订单信息失败,请稍后重试...',
            icon: 'none'
          })
        }
      })
  },
  // 页面分页逻辑
  nextData(arr, pageSize, page) {
    var start = (page - 1) * pageSize;
    var end = start + pageSize;
    var order = this.data.order;
    var arr = arr.slice(start, end);
    // order.push()
    // this.setData({
    //   order
    // });
    // console.log(order[0])
    // var arr= this.data.order;
    for (var i = 0; i < arr.length; i++) {
      order.push(arr[i])
    }
    console.log(order)
    return order;
  },
  // 取消订单
  cancelOrder(e) {
    var _this = this;
    // 订单编号
    var oId = e.currentTarget.dataset.value.oId;
    console.log(oId);
    Dialog.confirm({
      title: '提示',
      message: '你确定要删除该订单吗?'
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
              message: '删除成功'
            }).then(() => {
              // on close
              _this.getOrderList();
            });
          } else {
            Dialog.alert({
              message: '删除失败' + res.msg
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
  cancelOrder(e) {
    var _this = this;
    // 订单编号
    var oId = e.currentTarget.dataset.value.oId;
    console.log(oId);
    Dialog.confirm({
      title: '提示',
      message: '你确定要删除该订单吗?'
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
              message: '删除成功'
            }).then(() => {
              // on close
              _this.getOrderList();
            });
          } else {
            Dialog.alert({
              message: '删除失败' + res.msg
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