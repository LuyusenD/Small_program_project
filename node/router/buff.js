/**
 * 
 * @authors Alones (7242586@qq.com)
 * @date    2019-03-17 01:17:02
 */
'use strict'

const express = require('express')
const router = express.Router()
const pool = require('../pool.js')
const tools = require('../util/generate.js')
// 获取服务类型 及 订单类型缓存
router.get('/',(req,res) => {
  let obj = {}
  new Promise((open) => {
    let sql = `SELECT * FROM serve`
    pool.query(sql,[],(err,result) => {
      obj.serve = result
      open()
    })
  }).then(() => {
    let sql = `SELECT * FROM state`
    pool.query(sql,[],(err,result) => {
      obj.state = result
      res.send({code: 200, data: obj, msg: '获取缓存成功'})
    })
  })
})
// 后台管理 - 添加服务类型
router.get('/addserve',(req,res) => {
  let v = req.query,
      sql = `INSERT INTO serve (name, icon) VALUES (?,?)`,
      parameter = tools.parameter(v,['str','url'])

  if (parameter) {
    res.send(parameter)
    return
  }

  pool.query(sql,[v.str,v.url],(err,result) => {
    result.affectedRows > 0?
      res.send({code: 200, data: null, msg: '添加服务成功'})
    :
      res.send({code: 401, data: null, msg: '添加服务出错'})
  })
})
module.exports = router
