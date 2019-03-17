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

module.exports = router
