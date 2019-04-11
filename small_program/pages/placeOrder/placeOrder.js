// pages/placeOrder/placeOrder.js
import url from'../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 手机号码错误提示
    phoneerr:'',
    // 底部弹框
    show: false,
    showCar:false,
    // 时间底部弹框
    time:false,
    // 服务类型
    serveType:[],
    obj:{
      oTel: '',
      oAddress:'',
      oType:'',
      oTime:'',
      oRemark:'',
      openId:'',
      oTypeIndex:1,
      oName:''
    },    
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    // yuyan
    language:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // 页面加载获取所有服务类型
    if (wx.getStorageSync('Serve')) {
      // 本地缓存已有数据
      var serveType=[];
      var arr = wx.getStorageSync('Serve').serve;
      for (var i = 0; i < arr.length;i++){
        serveType.push(arr[i].name)
      }
      this.setData({
        serveType
      });
      console.log(this.data.serveType)
    } else {
      this.getServeType();
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
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  // 获取服务类型
  getServeType(){
    wx.showLoading({
      title: '正在加载数据...',
      mask:true
    })
    var opt={
      url: url.url + 'buff',
      method: "GET",
      data: {},
    };
    url.ajax(opt)
      .then((res)=>{
        if (res.code == 200) {
          wx.hideLoading();
          wx.setStorageSync('Serve', res.data)
          var serveType = [];
          var arr = wx.getStorageSync('Serve').serve;
          console.log(arr)
          console.log('_________')
          for (var i = 0; i < arr.length; i++) {
            serveType.push(arr[i].name)
          }
          this.setData({
            serveType
          });
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
  // 点击小图标提示功能
  onClickIcon(e){
    wx.showToast({
      title: "亲,输入你的手机号方便联系你哦!",
      icon:'none'
    })
  },
  // 显示选择地址
  getAddress(){
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.chooseLocation({
          success: function (res) {
            console.log(res)
            if (res.address) {
              console.log(that.data.obj.oTime)
              var obj = {
                oTel: that.data.obj.oTel,
                oAddress: res.address,
                oType: that.data.obj.oType,
                oTime: that.data.obj.oTime,
                oRemark: that.data.obj.oRemark,
                openId: that.data.obj.openId,
                oTypeIndex: that.data.obj.oTypeIndex,
                oName: that.data.obj.oName
              };
              console.log(obj)
              that.setData({
                obj
              });
            } else {
              if (!that.data.obj.oAddress){
                wx.showToast({
                  title: '亲！请选择预约地点哦。',
                  icon: 'none'
                })
              }
            }
          },
        })
      }
    })
  },
  // 选择预约时间
  getTime(event){
    this.setData({
      time: !this.data.time,
      show: false
      // currentDate: event.detail.value
    });
  },
  // 时间变化
  onChangeTime(event){
    console.log(event)
  },
  // 时间确定
  onConfirmTime(event){
    var obj = {
      oTel: this.data.obj.oTel,
      oAddress: this.data.obj.oAddress,
      oType: this.data.obj.oType,
      oTime: url.formatTime(event.detail,'Y-M-D h:m:s'),
      oRemark: this.data.obj.oRemark,
      openId: this.data.obj.openId,
      oTypeIndex: this.data.obj.oTypeIndex,
      oName: this.data.obj.oName
    };
    this.setData({
      time: false,
      currentDate: event.detail,
      obj
    });
    console.log(this.data.obj)
  },
  // 时间取消
  onCancelTime(event){
    this.setData({
      time: false,
    });
  },
  // 选择服务类型
  getType(){
    this.setData({ 
      time: false,
      show: !this.data.show
    });
  },
  // 选择服务变动时
  onChangeServeType(e){
    console.log(e)
    var serveType = wx.getStorageSync('Serve').serve[e.detail.index].name;
    console.log(wx.getStorageSync('Serve').serve[e.detail.index]);
    var obj= {
      oTel: this.data.obj.oTel,
      oAddress: this.data.obj.oAddress,
      oType: serveType,
      oTime: this.data.obj.oTime,
      oRemark: this.data.obj.oRemark,
      openId: this.data.obj.openId,
      oTypeIndex: wx.getStorageSync('Serve').serve[e.detail.index].id,
      oName: this.data.obj.oName
    };
    this.setData({
      obj
    })
    console.log(this.data.obj)
    this.setData({ show: false });
  },
  // 选择服务类型取消
  onCancelServeType(e){
    this.setData({ show: false });
    console.log(e)
  },
  // 控制底部弹框
  onClose() {
    this.setData({ show: false });
  },
  // 控制底部弹框
  onCloseCar() {
    this.setData({ showCar: false });
  },
  // 留言触发事件
  leMessage(e){
    console.log(e)
    var obj = {
      oTel: this.data.obj.oTel,
      oAddress: this.data.obj.oAddress,
      oType: this.data.obj.oType,
      oTime: this.data.obj.oTime,
      oRemark: e.detail,
      openId: this.data.obj.openId,
      oTypeIndex: this.data.obj.oTypeIndex,
      oName: this.data.obj.oName
    };
    this.setData({
      obj,
    })
  },
  // 输入手机号出发事件
  getPhone(e){
    if ((/^1[34578]\d{9}$/.test(e.detail))) {
      var obj = {
        oTel: e.detail,
        oAddress: this.data.obj.oAddress,
        oType: this.data.obj.oType,
        oTime: this.data.obj.oTime,
        oRemark: this.data.obj.oRemark,
        openId: this.data.obj.openId,
        oTypeIndex: this.data.obj.oTypeIndex,
        oName: this.data.obj.oName
      };
      this.setData({
        obj,
        phoneerr:'',
      })
    }else{
      var obj = {
        oTel: e.detail,
        oAddress: this.data.obj.oAddress,
        oType: this.data.obj.oType,
        oTime: this.data.obj.oTime,
        oRemark: this.data.obj.oRemark,
        openId: this.data.obj.openId,
        oTypeIndex: this.data.obj.oTypeIndex,
        oName: this.data.obj.oName
      };
      this.setData({
        obj,
        phoneerr:'亲，请输入正确手机号码！'
      });
      console.log(e)
    }
  },
  // 姓名
  getName(e){
    console.log(e)
    var obj = {
      oTel: this.data.obj.oTel,
      oAddress: this.data.obj.oAddress,
      oType: this.data.obj.oType,
      oTime: this.data.obj.oTime,
      oRemark: this.data.obj.oRemark,
      openId: this.data.obj.openId,
      oTypeIndex: this.data.obj.oTypeIndex,
      oName: e.detail
    };
    this.setData({
      obj
    })
  },
  // 预约按钮
  makeAppointment(){
    // 判断是否为空
    // 修改服务类型
  
    var arr = JSON.parse(JSON.stringify(this.data.obj));
    arr.openId = wx.getStorageSync("openid").openid,
    console.log(arr)
    if (arr.oTel != '' && arr.oAddress != '' && arr.oType != '' && arr.openId != '' && arr.oName!=''){
      if ((/^1[34578]\d{9}$/.test(arr.oTel))){
        console.log("______________________")
        wx.showLoading({
          title: '正在预约..',
          mask:true
        });
        console.log(this.data.obj)
        arr.oType = this.data.obj.oTypeIndex;
        arr.oTime = new Date().getTime();
        console.log(this.data.obj)
        console.log(arr)
        var opt = {
          url: url.url + 'order/addOrder',
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: arr
        };
        url.ajax(opt)
          .then((res) => {
            console.log(res)
            if(res.code==200){
              wx.hideLoading();
              wx.showToast({
                title: res.msg,
                icon:'success'
              });
              setTimeout(()=>{
                wx.navigateBack();
              },1000)
            }else{
              wx.showToast({
                title: res.msg,
                icon: 'none'
              })
            }
          })
      }else{
        wx.showToast({
          title: '请输入正确手机号！！',
          icon:'none'
        })
      }
    }else{
      wx.showToast({
        title: '亲。请完善基本信息！',
        icon: 'none'
      });
    }
  }
})