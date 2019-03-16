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
      url = `https://api.weixin.qq.com/sns/jscode2session?appid=${v.appid}&secret=SECRET&js_code=${v.code}&grant_type=authorization_code`

  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send({code: 200, data: {openId: body.openId, session_key: body.session_key}, msg: '请求openId成功'})
    }
  });
})

router.get('/adduser',(req,res) => {
  let v = req.query,
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
