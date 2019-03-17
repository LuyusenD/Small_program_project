/**
 * 
 * @authors Alones (7242586@qq.com)
 * @date    2019-03-16 16:17:02
 */
'use strict'

const express = require('express')
const router = express.Router()
const pool = require('../pool.js')
const tools = require('../util/generate.js')
const request = require('request')

router.get('/getopenid',(req,res) => {
  let v = req.query,
      arr = ["appid","code"],
      parameter = tools.parameter(v,arr)

  if (parameter) {
    res.send(parameter)
    return
  }
  
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${v.appid}&secret=bb0444e17996d8a233b5a5f6f2a61a67&js_code=${v.code}&grant_type=authorization_code`

  request(url, (error, response, body) => {
    if (body.session_key && body.openid) {
      res.send({code: 200, data: body, msg: '请求openId成功'})
    } else {
      res.send({code: -1, data: body, msg: '请求出错'})
    }
  });
})

router.post('/adduser',(req,res) => {
  let v = req.body,
      sql = `INSERT INTO user (openId, img, name, sex, address) VALUES (?,?,?,?,?)`,
      arr = ["openId","img","name","sex","address"],
      parameter = tools.parameter(v,arr)

  if (parameter) {
    res.send(parameter)
    return
  }

  pool.query(sql,[v.openId,v.img,v.name,v.sex,v.address],(err,result) => {
    if (err) throw err;
    result.affectedRows > 0 ?
      res.send({code: 200, data: null, msg: '登记用户成功'})
    :
      res.send({code: 401, data: null, msg: '登记失败'})
  })
})

module.exports = router
