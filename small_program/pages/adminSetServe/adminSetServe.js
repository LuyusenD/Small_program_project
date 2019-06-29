// pages/addServe/addServe.js
import url from '../../utils/config.js'
import Dialog from '../../vant-weapp/dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,   
    language: true,
    url: url.url,
    vehicle:false,
    oVehicle:'',
    serveType:[],
    ServeVehicle:[],
    input:'',
    id:'',
    hourMoney:'',
    kilometerMoney:'',
    hourMoneyname:'',
    kilometerMoneyname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getServe();
    if (wx.getStorageSync('Serve')) {
      // 本地缓存已有数据
      var serveType = [];
      var ServeVehicle = [];
      var arr = wx.getStorageSync('Serve').serve;
      for (var i = 0; i < arr.length; i++) {
        serveType.push(arr[i].name)
      }
      var arr1 = wx.getStorageSync('Serve').vehicle;
      for (var i = 0; i < arr1.length; i++) {
        ServeVehicle.push(arr1[i].name)
      }
      var arr1 = wx.getStorageSync('Serve').money;
      this.setData({
        serveType,
        ServeVehicle,
        hourMoney:arr1[0].money,
        hourMoneyname: arr1[0].name,
        kilometerMoney: arr1[1].money,
        kilometerMoneyname:arr1[1].name
      });
      }
      console.log(this.data)
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
  getVehicle() {
    console.log('-')
    this.setData({
      vehicle: !this.data.vehicle,
    })
  },
  onChangeServeType(e) {
    console.log(e)
    var serveType = wx.getStorageSync('Serve').serve[e.detail.index].name;
    console.log(wx.getStorageSync('Serve').serve[e.detail.index]);
   this.setData({
     input: wx.getStorageSync('Serve').serve[e.detail.index].money,
     vehicle: !this.data.vehicle,
     oVehicle: wx.getStorageSync('Serve').serve[e.detail.index].name,
     id: wx.getStorageSync('Serve').serve[e.detail.index].id,
   })
  },
  onCancelServeType(){
    this.setData({
      vehicle:false
    })
  },
  getName(e) {
    console.log(e.detail)
    this.setData({
      input: e.detail
    })
  },
  Setmoney(){
    var opt = {
      url: url.url + "buff/setmoney",
      method: "get",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        type: 'vehicle',
        id: this.data.id,
        money: this.data.input
      }
    };
    wx.showLoading({
      title: this.data.language?'正在加载...':'Loading...',
      mask:true
    })
    if(this.data.input!=''){
      console.log(opt)
      url.ajax(opt)
        .then((res) => {
          wx.hideLoading();
          // console.log(opt)
          if(res.code==200){
            wx.showToast({
              title: this.data.language ? '更新成功' : 'update successfully',
              icon: 'success'
            });
            this.setData({
              oVehicle:'',
              input:''
            })
            this.getServeType();
          }else{
            wx.showToast({
              title: this.data.language ? '更新失败' :'Update failed',
              icon:'none'
            })
          }
        })
    }else{
      wx.showToast({
        title: this.data.language ? '请选择修改的车型' :'Please select the modified model',
        icon:'none'
      })
    }
  },
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
  gethourMoney(e){
    console.log(e.detail)
    this.setData({
      hourMoney: e.detail
    })
  },
  gethourkilometerMoney(e){
    console.log(e.detail)
    this.setData({
      kilometerMoney: e.detail
    })
  },
  Setmoney1(){
    wx.showLoading({
      title: this.data.language ? '正在加载...' : 'Loading...',
      mask: true
    })
    var opt = {
      url: url.url + "buff/updatemoney",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        name: this.data.hourMoneyname,
        money: this.data.hourMoney
      }
    };
    url.ajax(opt)
      .then((res) => {
        if (res.code == 200) {
          var opt = {
            url: url.url + "buff/updatemoney",
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: {
              name: this.data.kilometerMoneyname,
              money: this.data.kilometerMoney
            }
          };
          url.ajax(opt)
            .then((res) => {
              wx.hideLoading();
              if(res.code==200){
                wx.showToast({
                  title: '修改成功',
                  icon:'success'
                })
                  this.getServeType();
              }else{
                wx.showToast({
                  title: '修改失败',
                  icon: 'none'
                })
              }
          })
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        }
      })
  },
  // 获取服务类型
  getServeType() {
    wx.showLoading({
      title: this.data.language ? '正在加载数据...' : 'Loading...',
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
          var serveType = [];
          var ServeVehicle = [];
          var arr = wx.getStorageSync('Serve').serve;
          for (var i = 0; i < arr.length; i++) {
            serveType.push(arr[i].name)
          }
          var arr1 = wx.getStorageSync('Serve').vehicle;
          for (var i = 0; i < arr1.length; i++) {
            ServeVehicle.push(arr1[i].name)
          }
          wx.setStorageSync('Serve', res.data);
          var arr1 = wx.getStorageSync('Serve').money;
          this.setData({
            serveType,
            ServeVehicle,
            hourMoney: arr1[0].money,
            hourMoneyname: arr1[0].name,
            kilometerMoney: arr1[1].money,
            kilometerMoneyname: arr1[1].name
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: this.data.language ? '数据加载失败,清扫后重试!' : 'Data loading failed, clean up and try again!',
            icon: 'none'
          });
          console.log('获取数据失败..')
        }
      })
  },
})