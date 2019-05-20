var appid = 'wx95f9d0da92ac236f';
// var url ='https://995de706.ngrok.io/';
// var url = 'http://localhost:8080/';
var url ='https://www.webbok.cn:3000/';

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function toDate(number) {

  var n = number * 1000;
  
  var date = new Date(n);

  var Y = date.getFullYear() + '/';

  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';

  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return (Y + M + D)

}
var formatTime = function (number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
function isHttpSuccess(status) {
  return status >= 200 && status < 300 || status === 304;
}
function ajax(options = {}) {
  let {
    url,
    data,
    method,
    header,
    dataType,
    responseType,
    success,
    fail,
    complete
  } = options;
  return new Promise((res, rej) => {
    wx.request({
      url,
      data,
      header,
      method,
      // dataType,
      // responseType,
      success(r) {
        console.log(r.statusCode)
        const isSuccess = isHttpSuccess(r.statusCode);
        if (isSuccess) {  // 成功的请求状态（200）
          res(r.data);
        } else {          // 失败的请求状态（404，500等）
          rej({
            msg: `网络错误:${r.statusCode}`,
            detail: r
          });
        }
      },
      fail(err) {
        rej(err);
      },
      complete() {

      }
    });
  });
}
module.exports = {
  appid: appid,
  url: url,
  formatTime: formatTime,
  toDate: toDate,
  ajax: ajax
}
