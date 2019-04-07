// pages/addServe/addServe.js
import url from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oType:'',
    img:'/image/add.png'
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
  getoType(e){
    console.log(e.detail);
    this.setData({
      oType:e.detail
    });
  },
  addoType(){
    if (this.data.oType){
      if (this.data.img =='/image/add.png'){
        wx.showToast({
          title: '亲,请上传图片!',
          icon:'none'
        })
        return;
      }
      var opt={
        url: url.url +"buff/addserve",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data:{
          str:this.data.oType,
          url: this.data.img
        }
      };
      url.ajax(opt)
        .then((res)=>{
          console.log(res);
          if(res.code==200){
            wx.showToast({
              title: '添加成功',
              icon:'success',
              duration:2000
            });
            this.setData({
              oType:''
            });
            setTimeout(()=>{
              wx.navigateBack();
              this.getServeType();
            },2000)
          }
        })
    }else{
      wx.showToast({
        title: '亲,请输入要添加的服务类型',
        icon:'none'
      })
    }
  },
  // 获取服务类型
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
          wx.setStorageSync('Serve', res.data.serve)
          wx.setStorageSync('State', res.data.state)
          var serveType = [];
          var arr = wx.getStorageSync('Serve');
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
  base64(){
    var _this=this;
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        var base64 = wx.arrayBufferToBase64(tempFilePaths);
        console.log(base64);
        // console.log(res)
        console.log(tempFilePaths[0])
        wx.request({
          url: tempFilePaths[0],
          method: 'GET',
          responseType: 'arraybuffer',
          success: function (res) {
            var base64 = 'data:image/jpg;base64,'+wx.arrayBufferToBase64(res.data);
            wx.showLoading({
              title: '正在上传图片',
              mask:true
            })
            _this.uploadImg(base64)
          }
        });
       
      }
    })
  },
  uploadImg(base64){
    var opt={
      url: url.url + 'upload', //仅为示例，非真实的接口地址
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        base: base64
      }
    };
    url.ajax(opt)
      .then((res)=>{
        wx.hideLoading();
        if(res.code==200){
          wx.showToast({
            title: '上传成功',
            icon:'success'
          });
          console.log(res.data.url)
          this.setData({
            img: res.data.url
          });
        }else{
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          });
        }
      })
  }
})