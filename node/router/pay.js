//引入模块 pool  express
const express=require('express');
const router=express.Router();
const pool=require('../pool');
const crypto = require('crypto');
var request = require('request')
//创建路由对象
var key='asd5d56a3asd35a35d3a5sd5a3sd3as5'
//处理请求  /list 返回所有图片轮播数据
router.get('/notifypay', (req, res) => {
     console.log(req)
 })
 router.post('/wxpay', (req, res) => {
     var apiUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
     var total_fee =  1*100
     var openid= "o9hJO5VUogUDmAeeu4wsEoxOf4FE"
     var body = req.body.body;
     var bookingNo = req.body.bookingNo
     var wxConfig = {
         appid:'wxde4b745f6eceacd9', //appid
         mch_id : '1526979381'  //商户号
     };
     var timeStamp = createTimeStamp(); //时间节点
     var nonce_str = createNonceStr() + createTimeStamp(); //随机字符串
     var create_ip = get_client_ip(req); //请求ip
     var notify_url ='https://xxx.com';  
     var formData = "<xml>";
     formData += "<appid>"+wxConfig['appid']+"</appid>"; //appid
     formData += "<mch_id>"+wxConfig['mch_id']+"</mch_id>"; //商户号
     formData += "<nonce_str>"+nonce_str+"</nonce_str>"; //随机字符串
     formData += "<body>" + body + "</body>"; //商品描述
     formData += "<notify_url>"+notify_url+"</notify_url>";
     formData += "<openid>" + openid + "</openid>";
     formData += "<out_trade_no>" + bookingNo + "</out_trade_no>";//订单号
     formData += "<spbill_create_ip>"+create_ip+"</spbill_create_ip>";
     formData += "<total_fee>" + total_fee + "</total_fee>";
     formData += "<trade_type>JSAPI</trade_type>";
     formData += "<sign>" + paysignjsapi(wxConfig['appid'],body,wxConfig['mch_id'],nonce_str,notify_url,openid,bookingNo,create_ip,total_fee,'JSAPI') + "</sign>";
     formData += "</xml>";
     // console.log(formData);
    request({
         url: apiUrl,
         method: 'POST',
         json: true,
		    headers: {
		        "content-type": "application/json",
		    },
         body: formData
     },function (err, response, body) {
         if (!err && response.statusCode === 200){
             // console.log(body);
             var result_code = getXMLNodeValue('result_code', body.toString("utf-8"));
             var resultCode = result_code.split('[')[2].split(']')[0];
             if(resultCode === 'SUCCESS'){ 
                 //成功
                 var prepay_id = getXMLNodeValue('prepay_id', body.toString("utf-8")).split('[')[2].split(']')[0]; //获取到prepay_id
                 //签名
                 var _paySignjs = paysignjs(wxConfig['appid'], nonce_str, 'prepay_id='+ prepay_id,'MD5',timeStamp);
                 var args = {
                     appId: wxConfig['appid'],
                     timeStamp: timeStamp,
                     nonceStr: nonce_str,
                     signType: "MD5",
                     package: "prepay_id="+prepay_id,
                     paySign: _paySignjs,
                     status:200
                 };
 
                 res.write(JSON.stringify(args));
                 res.end();
             }else{                         
                 //失败
                 var err_code_des = getXMLNodeValue('err_code_des',body.toString("utf-8"));
                 var errDes = err_code_des.split('[')[2].split(']')[0];
                var errArg = {
                    status:400,
                    errMsg: errDes
                };
                res.write(JSON.stringify(errArg));
                res.end();
             }
             // console.log('prepay_id是'+resultCode)
         }
     })
 })
 
 function paysignjs(appid, nonceStr, package, signType, timeStamp) {
     var ret = {
         appId: appid,
         nonceStr: nonceStr,
         package: package,
         signType: signType,
         timeStamp: timeStamp
     };
     var string = raw1(ret);
     string = string + '&key='+key;
     // console.log(string);
     var crypto = require('crypto');
     return crypto.createHash('md5').update(string, 'utf8').digest('hex');
 }
 
 function raw1(args) {
     var keys = Object.keys(args);
     keys = keys.sort()
     var newArgs = {};
     keys.forEach(function(key) {
         newArgs[key] = args[key];
     });
 
     var string = '';
     for(var k in newArgs) {
         string += '&' + k + '=' + newArgs[k];
     }
     string = string.substr(1);
     return string;
 }
 
 //生成签名
 function paysignjsapi(appid,body,mch_id,nonce_str,notify_url,openid,out_trade_no,spbill_create_ip,total_fee,trade_type) {
     var ret = {
         appid: appid,
         body: body,
         mch_id: mch_id,
         nonce_str: nonce_str,
         notify_url: notify_url,
         openid: openid,
         out_trade_no: out_trade_no,
         spbill_create_ip: spbill_create_ip,
         total_fee: total_fee,
         trade_type: trade_type
     };
     var string = raw(ret);
     string = string + '&key='+ key;
     var sign = crypto.createHash('md5').update(string, 'utf8').digest('hex');
     return sign.toUpperCase()
 }
 
 function raw(args) {
     var keys = Object.keys(args);
     keys = keys.sort();
     var newArgs = {};
     keys.forEach(function(key) {
         newArgs[key.toLowerCase()] = args[key];
     });
     var string = '';
     for(var k in newArgs) {
         string += '&' + k + '=' + newArgs[k];
     }
     string = string.substr(1);
     return string;
 }
 //解析xml
 function getXMLNodeValue(node_name, xml) {
     var tmp = xml.split("<" + node_name + ">");
     // console.log(tmp)
     var _tmp = tmp[1].split("</" + node_name + ">");
     return _tmp[0];
 }
 //获取url请求客户端ip
 var get_client_ip = function(req) {
     var ip = req.headers['x-forwarded-for'] ||
         req.ip ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress || '';
     if(ip.split(',').length>0){
         ip = ip.split(',')[0]
     }
     return ip;
 };
 
 // 随机字符串产生函数
 function createNonceStr() {
     return Math.random().toString(36).substr(2, 15)
 }
 // 时间戳产生函数
 function createTimeStamp() {
     return parseInt(new Date().getTime() / 1000) + ''
 }
 module.exports = router;   //暴露这个 router模块