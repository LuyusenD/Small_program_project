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
    language:true
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
    if (uni.getStorageSync('language')) {
      if (uni.getStorageSync('language').language) {
        this.setData({
          language: true
        })
      } else {
        this.setData({
          language: false
        });
        console.log(uni.getStorageSync('language'))
      }
    } else {
      this.setData({
        language: false
      });
      console.log(uni.getStorageSync('language'))
    }
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
    uni.showLoading({
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
        uni.hideLoading();
        this.setData({
          order: this.nextData(this.data.orderList, this.data.pageSize, this.data.page)
        });
        uni.showToast({
          title: this.data.language ? '订单刷新成功' :'Successful order refresh',
          icon: 'success'
        })
      }, 1500)
    } else {
      setTimeout(() => {
        uni.hideLoading();
        uni.showToast({
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
  // 所有订单页面
  getorderListAll(){
    uni.showLoading({
      title: this.data.language?'正在加载数据...':'Loadin...',
      mask: true
    })
    var opt = {
      url: url.url + "order/allOrder",
    };
    url.ajax(opt)
      .then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          if (res.data) {
            var arr = uni.getStorageSync('Serve').serve;
            console.log(res.data.data.length)
            console.log(arr)
            for (var i = 0; i < arr.length; i++) {
              for (var j = 0; j < res.data.data.length; j++) {
                if (res.data.data[j].oType == arr[i].id) {
                  res.data.data[j].oType = arr[i].name;
                  res.data.data[j].img =  arr[i].icon;
                  continue;
                }
              }
            }
            var arr1 = uni.getStorageSync('Serve').vehicle;
            for (var i = 0; i < arr1.length; i++) {
              for (var j = 0; j < res.data.data.length; j++) {
                if (res.data.data[j].oVehicle == arr1[i].id) {
                  res.data.data[j].oVehicle = arr1[i].name;
                  res.data.data[j].price = arr1[i].money;
                  continue;
                }
              }
            }
            this.setData({
              orderList: res.data.data,
              order: this.nextData(res.data.data, this.data.pageSize, this.data.page)
            })
          } else {
            uni.showToast({
              title: this.data.language ? '获取订单信息失败,请稍后重试...' :'Failed to obtain order information. Please try again later.',
              icon: 'none'
            })
          }
        } else {
          uni.showToast({
            title: this.data.language ? '获取订单信息失败,请稍后重试...' : 'Failed to obtain order information. Please try again later.',
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
      title: this.data.language ? '提示' :'Tips',
      message: this.data.language ? '你确定要删除该订单吗?' :'Are you sure you want to delete the order?'
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
              message: this.data.language ? '删除成功' :'Delete successful'
            }).then(() => {
              // on close
              _this.setData({
                // 用户所有订单
                orderList: [],
                // 当前分页显示订单个数
                order: [],
              })
              _this.getorderListAll();
            });
          } else {
            Dialog.alert({
              message: this.data.language ? '删除失败' :'Delete failed'
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
    console.log(e)
    var oId = e.currentTarget.dataset.value;
    console.log(oId);
    Dialog.confirm({
      title: this.data.language ? '提示' :'Tips',
      message: this.data.language ? '你确定要删除该订单吗?' :'Are you sure you want to delete the order?'
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
              message: this.data.language ? '删除成功' :'Delete successful'
            }).then(() => {
              // on close
              this.setData({
                page:1,
                order:[],
                orderList:[]
              })
              _this.getorderListAll();
            });
          } else {
            Dialog.alert({
              message: this.data.language ? '删除失败' :'Delete failed'
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
  // 页面跳转
  jump(e){
    var url=e.currentTarget.dataset.url;
    uni.navigateTo({
      url: url,
    })
  }
})