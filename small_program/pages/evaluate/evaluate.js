// pages/evaluate/evaluate.js
import url from '../../utils/config.js';
import MD5 from '../../utils/MD5.js';
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
    language:true
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
    if (wx.getStorageSync('language')) {
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
    } else {
      this.setData({
        language: false
      });
      console.log(wx.getStorageSync('language'))
    }
    this.setData({
      // 用户所有订单
      orderList: [],
      // 当前分页显示订单个数
      order: [],
      // 当前页数
      page: 1,
      // 当前页数显示个数
      pageSize: 6,
    })
    this.getOrderList();
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
      title: this.data.language?'正在加载数据...':'Loading...',
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
          title: this.data.language ? '订单刷新成功' :'Successful order refresh',
          icon: 'success'
        })
      }, 1500)
    } else {
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: this.data.language ? '亲,没有更多订单了!' :'No more orders, dear!',
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
  // 获取用户未评价所有订单
  getOrderList() {
    wx.showLoading({
      title: this.data.language?'正在加载数据...':'Loading...',
      mask: true
    })
    var opt = {
      url: url.url + "order/getnotvaluate",
      method:"GET",
      data: {
        openId: wx.getStorageSync('openid').openid
      }
    };
    url.ajax(opt)
      .then((res) => {
        console.log(res)
        wx.hideLoading();
        if (res.code == 200) {
          if (res.data) {
            var arr = wx.getStorageSync('Serve').serve;
            console.log(res.data.data.length)
            for (var i = 0; i < arr.length; i++) {
              for (var j = 0; j < res.data.data.length; j++) {
                if (res.data.data[j].oType == arr[i].id) {
                  res.data.data[j].oType = arr[i].name;
                  res.data.data[j].img = 'http://' + arr[i].icon;
                  continue;
                }
              }
            }
            this.setData({
              orderList: res.data.data,
              order: this.nextData(res.data.data, this.data.pageSize, this.data.page)
            });
            console.log("__________")
            console.log(this.data.order)
          } else {
            wx.showToast({
              title: this.data.language ? '你还没有订单完成呢！' :"You haven't finished the order yet.",
              icon: 'none'
            });
            this.setData({
              orderList: [],
              order: []
            })
          }
        } else {
          wx.showToast({
            title: this.data.language ? '获取订单信息失败,请稍后重试...' :'Failed to obtain order information. Please try again later.',
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
    console.log(arr)
    // order.push()
    // this.setData({
    //   order
    // });
    // console.log(order[0])
    // var arr= this.data.order;
    for (var i = 0; i < arr.length; i++) {
      order.push(arr[i])
    }
    // console.log(order)
    return order;
  },
  // 跳转页面
  jump(e){
    var url = e.currentTarget.dataset.url;
    console.log(url)
    wx.navigateTo({
      url: url,
    })
  }
})