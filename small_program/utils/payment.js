import sha256 from './sha256.js';
import MD5 from './MD5.js';
import url from './config.js';
function play (data) {
  let nonce = Math.random().toString(36).slice(-10)
  let time = new Date().getTime();
  console.log(data.price)
  wx.request({
    url: `https://mpay.royalpay.com.au/api/v1.0/gateway/partners/GDMT/microapp_orders/${data.oId}?time=${time}&nonce_str=${nonce}&sign=${sha256('GDMT&' + time + '&' + nonce + '&sjdtd5vdpsqRLmIEw4eP34nkYImvfWtS')}`,
    method: 'PUT',
    data: {
      description: `${data.oType}-${data.oId}`,
      price: data.price * 100,
      currency: 'AUD',
      operator: `${data.oName}-${data.oTel}`,
      appid: 'wx95f9d0da92ac236f',
      customer_id: `${wx.getStorageSync('openid').openid}`
    },
    success: function (res) {
      console.log(res)
      wx.requestPayment({
        timeStamp: res.data.sdk_params.timeStamp,
        nonceStr: res.data.sdk_params.nonceStr,
        package: res.data.sdk_params.package,
        signType: 'MD5',
        paySign: res.data.sdk_params.paySign,
        success: function (res) {
          res.errMsg === "requestPayment:ok" ? 
          console.log('支付成功'):
          console.log(res)
          var opt = {
            url: url.url + 'order/editstate',
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: {
              oId: MD5.md5(MD5.md5(MD5.md5(data.oId))) + "xn",
              oState:4
            }
          };
          url.ajax(opt)
            .then((res) => {
              if (res.code == 200) {
                console.log('修改成功')
                // wx.redirectTo({
                //   url:'/pages/index/index'
                // })
              }
            })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  })
  console.log(data)
}
 function setStatus(e) {
  // var oId = (e.currentTarget.dataset.value)
  var opt = {
    url: url.url + 'order/editstate',
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: {
      oId: MD5.md5(MD5.md5(MD5.md5(e))) + "xn"
    }
  };
    url.ajax(opt)
      .then((res) => {
        if (res.code == 200) {
          console.log('修改成功')
        }
        })
 

}
module.exports ={
  play,
  setStatus
} 