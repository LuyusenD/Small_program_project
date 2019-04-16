// pages/admin/admin.js
import url from '../../utils/config.js';
import MD5 from '../../utils/MD5.js';
import Dialog from '../../vant-weapp/dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:'',
    paddword:'',
    language:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: this.data.language ?'正在加载数据...':'Loading...',
      mask:true
    });
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
    if(wx.getStorageSync("user")){
      wx.hideLoading();
      Dialog.confirm({
        title: this.data.language ? '登录提示' :'Login prompt',
        message: this.data.language ? '是否继续登录' :'Do you want to continue login?'+wx.getStorageSync('user').username
      }).then(() => {
        wx.navigateTo({
          url: '/pages/adminList/adminList',
        })
      }).catch(() => {
        // on cancel
        this.loginOut();
      });
    }else{
      wx.hideLoading();
      console.log('用户未登录')
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
  // 用户名
  getUserName(e){
    console.log(e.detail.value)
    this.setData({
      uname: e.detail.value
    })
  },
  // 密码
  getPassword(e) {
    this.setData({
      paddword: e.detail.value
    })
    console.log(e.detail.value)
  },
  // 登录
  submit(e){
    // console.log(e)
    var opt={
      url: url.url +'user/login',
      method:"POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        username:this.data.uname,
        password:this.data.paddword
      }
    };
    if(this.data.uname==''){
      wx.showToast({
        title: this.data.language ? '亲，请输入账号哦！' :'Kind, please enter the account number!',
        icon:'none'
      });
      return;
    }
    if(this.data.paddword==''){
      wx.showToast({
        title: this.data.language ? '亲，请输入密码哦！' :'Kind, please enter the password!',
        icon:'none'
      });
      return;
    }
    wx.showLoading({
      title: this.data.language ?'正在加载..':'Loading...',
      mask: true
    })
    url.ajax(opt)
      .then((res) => {
        wx.hideLoading();
        console.log(res)
        if(res.code==200){
          wx.showToast({
            title: this.data.language ? '登录成功!' :'Login successfully!',
            icon:'success'
          });
          wx.setStorageSync('user', res.data);
         setTimeout(()=>{
           wx.navigateTo({
             url: '/pages/adminList/adminList',
             success:()=>{
               this.setData({
                 uname:'',
                 password:''
               })
             }
           })
         },1000)
        }else if(res.code==401){
          Dialog.alert({
            title: this.data.language ? '提示' :'Tips',
            message: this.data.language ?"账号或密码错误或已在别处登录" :'Account or password error or login elsewhere'
          }).then(() => {
            // on close
          });
        }
      })
  },
  // 忘记密码
  forgetPassword(){
    wx.navigateTo({
      url: '/pages/forgetPassword/forgetPassword',
    })
    // wx.showToast({
    //   title: this.data.language ? '请联系管理员!' :'Please contact the administrator',
    //   icon:'none'
    // })
  },
  // 退出登录
  loginOut() {
    var user = wx.getStorageSync('user')
    var opt = {
      url: url.url + "user/out",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        id: user.id,
        username: user.username
      }
    };
    url.ajax(opt)
      .then((res) => {
        if (res.code == 200) {
            wx.removeStorage({
              key: 'user',
              success(res) {
                console.log(res)
              }
            }) 
        }
      })
  }
})