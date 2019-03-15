/**
 * 
 * @authors Alones (7242586@qq.com)
 * @date    2019-03-14 14:29:02
 */


const bodyParse = require("body-parser")
const express=require('express')
let app = express()

app.use(bodyParse.urlencoded({extended:false}))

let order=require('./router/order.js');

app.listen(3000)

app.use(express.static(__dirname + '/static'))
// 挂载
app.use('/order', order);
