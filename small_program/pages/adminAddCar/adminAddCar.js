// pages/adminAddCar/adminAddCar.js
import url from '../../utils/config.js';
import Dialog from '../../vant-weapp/dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    oType: '',
    money: '',
    language: true,
    serve:[]
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
  getServe() {
    console.log(wx.getStorageSync("Serve"))
    this.setData({
      serve: wx.getStorageSync("Serve").vehicle
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getServe();
    this.getServeType();
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
  getoType(e) {
    console.log(e.detail);
    this.setData({
      oType: e.detail
    });
  },
  getMoeny(e) {
    console.log(e.detail);
    var reg= /^\d{1,}$/;
    var pattern = new RegExp(reg);
    if (pattern.test(e.detail)){
      this.setData({
        money: Number(e.detail)
      });
    }else{
      wx.showToast({
        title: this.data.language?'只能输入数字哦!':'You can only enter numbers.',
        icon:'none'
      });
      this.setData({
        money:''
      });
    }

  },
  addSub(){
    if(!this.data.oType){
      wx.showToast({
        title: this.data.language ? '请输入要添加的车型！' :'Please enter the model you want to add!',
        icon:'none'
      });
      return;
    }
    if(!this.data.money){
      wx.showToast({
        title: this.data.language ? '请输入该车型对应的价格！' :'Please enter the corresponding price for this model!',
        icon:'none'
      });
      return;
    }
    var opt={
      url: url.url +'buff/addvehicle',
      method:"POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        name:this.data.oType,
        money: Number(this.data.money)
      }
    };
    url.ajax(opt)
      .then((res)=>{
        console.log(res);
        if (res.code == 200) {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          });
          this.setData({
            oType: '',
            money:'',
          });
          setTimeout(() => {
            this.getServeType();
            wx.navigateBack();
          }, 2000)
        }
      })
  },
  getServeType() {
    wx.showLoading({
      title: '正在加载数据...',
      mask: true
    })
    var opt = {
      url: url.url + 'buff',
      method: "GET",
      data: {},
    };
    url.ajax(opt)
      .then((res) => {
        if (res.code == 200) {
          wx.hideLoading();
          console.log(111111111111111)
          console.log(111111111111111)
          this.setData({
            serve: res.data.vehicle
          })
          console.log(this.data.vehicle)
          wx.setStorageSync('Serve', res.data)
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '数据加载失败,清扫后重试!',
            icon: 'none'
          });
          console.log('获取数据失败..')
        }
      })
  },
  // 用户选择状态
  activeonChange(e) {
    // console.log(e)
    if (e.detail.index == 0) {
      console.log('添加');
      this.setData({
        active: e.detail.index
      })
    } else {
      console.log('修改');
      this.setData({
        active: e.detail.index
      })
    }
  },
  SetCar(e){
    wx.navigateTo({
      url: '/pages/SetCar/SetCar?id=' + e.currentTarget.dataset.detail.id,
    })
  },
  delCar(e){
    console.log(e.currentTarget.dataset.detail)
    var opt = {
      url: url.url + 'buff/delvehicle', //仅为示例，非真实的接口地址
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        id: e.currentTarget.dataset.detail.id
      }
    };
    Dialog.confirm({
      title: this.data.language ? '提示' : 'Tips',
      message: this.data.language ? '你确定要删除该订单吗?' : 'Are you sure you want to delete the order?'
    }).then(() => {
      url.ajax(opt)
        .then((res) => {
          console.log(res)
          if (res.code == 200) {
            Dialog.alert({
              message: this.data.language ? '删除成功' : 'Delete successful'
            }).then(() => {
              this.getServeType();
            });
          } else {
            Dialog.alert({
              message: this.data.language ? '删除失败' : 'Delete failed'
            }).then(() => {
              // on close
            });
          }
        })
    }).catch(() => {
      // on cancel
    });
  }
})