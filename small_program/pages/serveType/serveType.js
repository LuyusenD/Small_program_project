import url from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    language: true,
    list: [],
    show: false,
    isType:false,
    serve:['清洁服务','家具安装'],
    title:'',
    obj:{
      type:'',
      typeIndex:'',
      title:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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
  onCancelisTypey(){
    this.setData({
      isType:false,
      show:true
    })
  },
  onChange(e){
    console.log(e)
    let obj=this.data.obj;
    obj.title=e.detail;
    this.setData({
      obj
    })
  },
  onChangeisType(e){
    let obj=this.data.obj;
    obj.typeIndex=this.data.serve[e.detail.index]
    obj.type=e.detail.index+1;
    console.log(obj)
    this.setData({
      isType: false,
      show: true,
      obj
    })
  },
  click(){
    this.setData({ isType: !this.data.isType,show:false });
  },
  getList() {
    wx.showLoading({
      title: this.data.language?'加载中...':'Loading...',
      mask:true
    })
    var opt = {
      url: url.url + 'buff/sercont',
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      data: {},
    };
    url.ajax(opt)
      .then(res => {
        wx.hideLoading();
        if(res.code==200){
          this.setData({
            list:res.data
          })
        }else{
          wx.showToast({
            title: '加载失败....',
            icon:'none'
          })
        }
        console.log(res)
      })
  },
  add(){
    this.setData({ show: true,title:this.data.language?'添加':'add' });
  },
  upload(item){
    this.setData({ show: true, title:this.data.language? '修改': 'set' });
    var item = item.currentTarget.dataset.item
    console.log(item)
    let obj=this.data.obj;
    obj.type=item.type;
    obj.title=item.title;
    obj.typeIndex=this.data.serve[item.type-1];
    obj.id=item.id;
    this.setData({
      obj
    })
  },
  add1(){
    console.log(this.data.obj)
    if(!this.data.obj.type){
      wx.showToast({
        title: this.data.language ? '请选择类型' :'Please select type',
        icon:'none'
      })
      return;
    }
    if(!this.data.obj.title){
      wx.showToast({
        title: this.data.language ? '请输入服务内容' :'Please enter the service content',
        icon:'none'
      })
      return;
    }
    console.log(this.data.obj)
    var obj=this.data.obj;
    var o = this.data.title == '添加' || this.data.title == 'add' ? 'buff/sercont/add' : 'buff/sercont/update';
    var opt = {
      url: url.url + o,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      data: this.data.obj,
    };
    wx.showLoading({
      title: this.data.language?'加载中...':'Loading...',
      mask:true
    })
    url.ajax(opt)
    .then(res=>{
      console.log(res)
      if(res.code==200){
        wx.showToast({
          title: this.data.language ? '添加成功!' :'successfully added',
          icon:'success'
        })
        this.setData({
          show: false,
          isType: false,
          obj: {
            type: '',
            typeIndex: '',
            title: ''
          }
        });
        this.getList();
      }else{
        wx.showToast({
          title: this.data.language ? '添加失败!' : 'fail to add',
          icon: 'none'
        })
        this.setData({
          show: false,
          isType: false,
          obj: {
            type: '',
            typeIndex: '',
            title: ''
          }
        });
        this.getList();
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
  del(item){
   var id=item.currentTarget.dataset.item.id;
    var opt = {
      url: url.url + 'buff/sercont/del',
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      data: {id:id},
    };
    wx.showLoading({
      title: this.data.language ? '加载中...' : 'Loading...',
      mask: true
    })
    url.ajax(opt)
    .then(res=>{
      wx.hideLoading();
      console.log(res)
      if(res.code==200){
        wx.showToast({
          title: this.data.language ? '删除成功!' : 'successfully delete',
          icon: 'none'
        });
        this.getList();
      }else{
        wx.showToast({
          title: this.data.language ? '删除失败!' : 'fail to delete',
          icon: 'none'
        })
      }
    })
  },
  onClose1() {
    let obj={
      title:'',
      type:'',
      typeIndex:''
    }
    this.setData({ show: false,obj });
  },
  onClose(event) {
    const {
      position,
      instance
    } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close();
        });
        break;
    }
  }
})