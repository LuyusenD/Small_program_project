/**
 * 
 * @authors Alones (7242586@qq.com)
 * @date    2019-03-14 14:29:02
 */


const bodyParse = require("body-parser")
const express=require('express')
let app = express()

app.use(bodyParse.urlencoded({extended:false,limit: '50mb'}))

let order = require('./router/order.js');
let user = require('./router/user.js');
let buff = require('./router/buff.js');
let upload = require('./router/upload.js');

app.listen(3000)

app.use(express.static(__dirname + '/static'))
// 挂载
app.use('/order', order);
app.use('/user', user);
app.use('/upload', upload);
