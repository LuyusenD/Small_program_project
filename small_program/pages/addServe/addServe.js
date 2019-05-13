// pages/addServe/addServe.js
import url from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    oType: '',
    img: '/image/add.png',
    money: '',
    language: true,
    // serve
    serve:[],
    url:url.url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getServe();
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
  getServe(){
    console.log(wx.getStorageSync("Serve"))
    this.setData({
      serve: wx.getStorageSync("Serve").serve
    })
  },
  getoType(e) {
    console.log(e.detail);
    this.setData({
      oType: e.detail
    });
  },
  addoType() {
    if (this.data.oType) {
      if (this.data.img == '/image/add.png') {
        wx.showToast({
          title: this.data.language ? '亲,请上传图片!' : 'Please enter the amount of service you want to add.',
          icon: 'none'
        })
        return;
      }
      if (!this.data.money) {
        wx.showToast({
          title: this.data.language ? '亲,请输入要添加的服务金额' : 'Kind, please upload pictures!',
          icon: 'none'
        })
        return;
      }
      var opt = {
        url: url.url + "buff/addserve",
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          str: this.data.oType,
          url: this.data.img,
          money: this.data.money
        }
      };
      url.ajax(opt)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            wx.showToast({
              title: this.data.language ? '添加成功' : 'Add success',
              icon: 'success',
              duration: 2000
            });
            this.setData({
              oType: '',
              img:'/image/add.png',
              money:''
            });
            setTimeout(() => {
              this.getServeType();
              wx.navigateBack();
            }, 2000)
          }
        })
    } else {
      wx.showToast({
        title: this.data.language ? '亲,请输入要添加的服务类型' : 'Pro, enter the type of service you want to add',
        icon: 'none'
      })
    }
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
          console.log(111111111111111)
          console.log(111111111111111)
          this.setData({
            serve:res.data.serve
          })
          console.log(this.data.serve)
          wx.setStorageSync('Serve', res.data)
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
  // 价格
  getoMoney(e) {
    console.log(e.detail);
    this.setData({
      money: e.detail
    });
  },
  base64() {
    var _this = this;
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        console.log(wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"))
        // var base64 = wx.arrayBufferToBase64(tempFilePaths);
        // console.log(base64);
        // console.log(res)
        // console.log(tempFilePaths[0])
        // wx.request({
        //   url: tempFilePaths[0],
        //   method: 'GET',
        //   responseType: 'arraybuffer',
        //   success: function (res) {
        //     var base64 = 'data:image/jpg;base64,'+wx.arrayBufferToBase64(res.data);
        //     wx.showLoading({
        //       title: '正在上传图片',
        //       mask:true
        //     })
        //     _this.uploadImg(base64)
        //   }
        // });
        var base64 = 'data:image/jpg;base64,' + wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
        wx.showLoading({
          title: this.data.language ? '正在上传图片' : 'Uploading pictures',
          mask: true
        })
        _this.uploadImg(base64)
      }
    })
  },
  uploadImg(base64) {
    var opt = {
      url: url.url + 'upload', //仅为示例，非真实的接口地址
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        base: base64
      }
    };
    url.ajax(opt)
      .then((res) => {
        wx.hideLoading();
        if (res.code == 200) {
          wx.showToast({
            title: this.data.language ? '上传成功' : 'Upload success',
            icon: 'success'
          });
          console.log(res.data.url)
          this.setData({
            img: res.data.url
          });
        } else {
          wx.showToast({
            title: this.data.language ? '上传失败' : 'Upload failure',
            icon: 'none'
          });
        }
      })
  },
  // 用户选择状态
  activeonChange(e) {
    // console.log(e)
    if(e.detail.index==0){
      console.log('添加');
      this.setData({
        active: e.detail.index
      })
    }else{
      console.log('修改');
      this.setData({
        active: e.detail.index
      })
    }
  },
  setServe(e){
    console.log(e.currentTarget.dataset.detail)
    wx.navigateTo({
      url: '/pages/SetServe/setServe?id=' + e.currentTarget.dataset.detail.id,
    })
  },
  delServe(e){
    console.log(e.currentTarget.dataset.detail)
  }
})