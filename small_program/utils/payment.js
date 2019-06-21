import sha256 from './sha256.js'
function play (data) {
  let nonce = Math.random().toString(36).slice(-10)
  let time = new Date().getTime()
  wx.request({
    url: `https://mpay.royalpay.com.au/api/v1.0/gateway/partners/GDMT/microapp_orders/${data.oId}?time=${time}&nonce_str=${nonce}&sign=${sha256('GDMT&' + time + '&' + nonce + '&sjdtd5vdpsqRLmIEw4eP34nkYImvfWtS')}`,
    method: 'PUT',
    data: {
      description: `${data.oType}-${data.oId}`,
      price: 10,
      currency: 'CNY',
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
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  })
  console.log()
  console.log(data)
}

export default play