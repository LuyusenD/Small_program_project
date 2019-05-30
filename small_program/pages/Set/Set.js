// pages/addServe/addServe.js
import url from '../../utils/config.js'
import Dialog from '../../vant-weapp/dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    oType: '',
    img: '/image/add.png',
    language: true,
    // serve
    serve: [],
    list:[],
    url:url.url,
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
  getServe() {
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
    wx.showLoading({
      title:this.data.language? '加载中...':'Loading...',
      mask:true
    })
      if (this.data.img == '/image/add.png') {
        wx.showToast({
          title: this.data.language ? '亲,请上传图片!' : 'Please enter the amount of service you want to add.',
          icon: 'none'
        })
        return;
      }
      var opt = {
        url: url.url + "banner/add",
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          url: this.data.img,
        }
      };
      url.ajax(opt)
        .then((res) => {
          console.log(res);
          wx.hideLoading();
          if (res.code == 200) {
            wx.showToast({
              title: this.data.language ? '上传成功' : 'Upload success',
              icon: 'success',
              duration: 2000
            });
            this.setData({
              img: '/image/add.png',
            });
          }else{
            wx.showToast({
              title: this.data.language ? '上传失败' : 'Upload failure',
              icon: 'none',
              duration: 2000
            });
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
      url: url.url + 'banner/getbanner',
      method: "GET",
    };
    url.ajax(opt)
      .then((res) => {
        if (res.code == 200) {
          wx.hideLoading();
          this.setData({
            serve: res.data.list
          })
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
        if(this.data.active==0){
          _this.uploadImg(base64)
        }else{
          _this.SetImg(base64)
        }
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
          // wx.showToast({
          //   title: this.data.language ? '上传成功' : 'Upload success',
          //   icon: 'success'
          // });
          console.log(res.data.url)
          this.setData({
            img:  res.data.url
          });
        } else {
          wx.showToast({
            title: this.data.language ? '上传失败' : 'Upload failure',
            icon: 'none'
          });
        }
      })
  },
  SetImg(base64) {
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
          // wx.showToast({
          //   title: this.data.language ? '上传成功' : 'Upload success',
          //   icon: 'success'
          // });
          console.log(res.data.url)
          this.setData({
            img:  res.data.url
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
    if (e.detail.index == 0) {
      console.log('添加');
      this.setData({
        active: e.detail.index
      })
    } else{
      console.log('修改');
      this.getServeType();
      this.setData({
        active: e.detail.index
      })
    }
  },
  set(e) {
    console.log(e.currentTarget.dataset.detail.id)
    this.base64();
  },
  Del(e) {
    console.log(e.currentTarget.dataset.detail.id)
    var opt = {
      url: url.url + 'banner/del', //仅为示例，非真实的接口地址
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        id: e.currentTarget.dataset.detail.id
      }
    };
   
    Dialog.confirm({
      title: this.data.language ? '提示' :'Tips',
      message: this.data.language ? '确定要删除该图片吗?' : 'Are you sure you want to delete the picture?'
    }).then(() => {
      // on confirm
      url.ajax(opt)
        .then((res) => {
          wx.hideLoading();
          if (res.code == 200) {
            wx.showToast({
              title: this.data.language ? '删除成功' : 'Delete successful',
              icon: 'success'
            });
            this.getServeType();
          } else {
            wx.showToast({
              title: this.data.language ? '删除失败' : 'Delete failed',
              icon: 'none'
            });
          }
        })
    }).catch(() => {
      // on cancel
    });
  },
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          // instance.close();
          this.Del(event)
        });
        break;
    }
  }
})