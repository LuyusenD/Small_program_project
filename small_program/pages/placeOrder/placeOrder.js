// pages/placeOrder/placeOrder.js
import url from'../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 底部弹框
    show: false,
    // 服务类型
    serveType:[],
    obj:{
      oTel: '',
      oAddress:'',
      oType:'',
      oTime:'',
      oRemark:'',
      openId:''
    },    
    sex:[
      {
        name: '男',
        value: 1
      },
      {
        name: '男',
        value: 1
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // 页面加载获取所有服务类型
    if (wx.getStorageSync('Serve') && wx.getStorageSync('State')) {
      // 本地缓存已有数据
      var serveType=[];
      var arr = wx.getStorageSync('Serve');
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
    var opt={}
    wx.request({
      url: url.url +'buff',
      method:"GET",
      data:opt,
      success:(res)=>{
        if(res.data.code==200){
          wx.hideLoading();
          wx.setStorageSync('Serve', res.data.data.serve)
          wx.setStorageSync('State', res.data.data.state)
          var serveType = [];
          var arr = wx.getStorageSync('Serve');
          for (var i = 0; i < arr.length; i++) {
            serveType.push(arr[i].name)
          }
          this.setData({
            serveType
          });
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '数据加载失败,清扫后重试!',
            icon:'none'
          });
          console.log('获取数据失败..')
        }
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

  },
  // 选择预约时间
  getTime(){

  },
  // 选择服务类型
  getType(){
    this.setData({ show: true });
  },
  // 选择服务变动时
  onChangeServeType(e){
    var serveType = e.detail.value;
    // console.log(serveType)
    var obj= {
      oTel: this.data.obj.oTel,
      oAddress: this.data.obj.oAddress,
      oType: serveType,
      oTime: this.data.obj.oTime,
      oRemark: this.data.obj.oRemark,
      openId: this.data.obj.openId
    };
    this.setData({
      obj
    })
    // console.log(this.data.obj.oType)
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
  
})