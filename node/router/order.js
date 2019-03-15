/**
 * 
 * @authors Alones (7242586@qq.com)
 * @date    2019-03-14 23:29:02
 */
'use strict'

const express = require('express')
const router = express.Router()
const pool = require('../pool.js')
const md5 = require('md5')
const tools = require('../util/generate.js')

console.log(tools.time())
router.get('/allOrder', (req, res) => {
  let sql = `SELECT * FROM the_order`
  
  pool.query(sql,[],(err,result)=>{
    if (err) throw err;
    res.send({code: 200, data: result})
  })
})

router.post('/addOrder', (req, res) => {
  let sql = `INSERT INTO the_order (oId, oName, oTel, oAddress, createTime, deleteTime, oType, oState, oTime, oRemark, openId) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
  let oId = tools.generateOid(`Z24`),
      time = tools.time(),
      v = req.body
  if (!v.oName || !v.oTel || !v.oAddress || !v.oType || !v.oTime || !v.oRemark || !v.openId ) {
    res.send({code: -1, data: null, msg: '缺少参数'})
    return
  }
  pool.query(sql,[oId,v.oName,v.oTel,v.oAddress,time,0,v.oType,1,v.oTime,v.oRemark,v.openId],(err,result)=>{
    if (err) throw err;
    result ? res.send({code: 200, data: null,msg: '下单成功'}) : res.send({code: 3000, data: null, msg: '下单失败'})
  })
})


module.exports = router