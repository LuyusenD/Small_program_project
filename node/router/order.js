/**
 * 
 * @authors Alones (7242586@qq.com)
 * @date    2019-03-14 23:29:02
 */
'use strict'

const express = require('express')
const router = express.Router()
const pool = require('../pool.js')
const tools = require('../util/generate.js')
let arr = ['id','oId','oName','oTel','oAddress','createTime','deleteTime','oType','oState','oTime','oRemark','evaluate']
// 后台管理 - 获取订单接口
router.get('/allorder', (req, res) => {
  let sql = `SELECT ${arr.join(',')}  FROM the_order WHERE deleteTime = 0`
  pool.query(sql,[],(err,result)=>{
    if (err) throw err;
    res.send({code: 200, data: {total: result.length, data: result}})
  })
})
// 立即下单
router.post('/addorder',(req, res) => {
  let sql = `INSERT INTO the_order (oId, oName, oTel, oAddress, createTime, deleteTime, oType, oState, oTime, oRemark, openId, md5) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
  let oId = tools.generateOid(`Z24`),
      time = tools.generateTime(),
      ciphertext = tools.md5(oId),
      v = req.body,
      arr = ["oName","oTel","oAddress","oType","oTime","openId"],
      parameter = tools.parameter(v,arr)

  if (parameter) {
    res.send(parameter)
    return
  }

  new Promise((open,err) => {
    let testSql = `SELECT id,name FROM serve WHERE id = ?`
    pool.query(testSql,[v.oType],(err,result) => {
      if (err) throw err;
      if (result[0]) 
        open()
      else
        res.send({code: -1, data: null, msg: '服务类型错误'})
    })
  }).then(() => {
    pool.query(sql,[oId,v.oName,v.oTel,v.oAddress,time,0,v.oType,1,v.oTime,v.oRemark || '',v.openId,ciphertext],(err,result)=>{
      if (err) throw err;
      result ? res.send({code: 200, data: null,msg: '下单成功'}) : res.send({code: 3000, data: null, msg: '下单失败'})
    })
  }).catch(() => {
    res.send({code: 500, msg: '服务出错'})
  })
})
// 用户取消订单 / 后台管理订单取消
router.post('/delorder',(req,res) => {
  let sql = `UPDATE the_order SET deleteTime = ? WHERE md5 = ?`,
      time = tools.generateTime(),
      v = req.body,
      parameter = tools.parameter(v,['oId'])

  if (parameter) {
    res.send(parameter)
    return
  }
  new Promise((open,err) => {
    let testSql = `SELECT deleteTime FROM the_order WHERE md5 = ?`
    pool.query(testSql,[v.oId],(err,result) => {
      if (!result[0]) {
        res.send({code: 401, msg: '订单不存在'})
      } else {
        if (result[0].deleteTime == 0)
          open()
        else
          res.send({code: 401, data: null, msg: `订单已取消,请勿重复取消订单`})
      }
    })
  }).then(() => {
    pool.query(sql,[time,v.oId],(err,result) => {
      if (result.affectedRows > 0) 
        res.send({code: 200, data: null, msg: '取消订单成功'})
      else
        res.send({code: 3000, data: null, msg: '取消订单失败'})
    })
  }).catch(() => {
    res.send({code: 500, msg: '服务出错'})
  })
})
// 用户完成订单 / 已支付接口更新 / 后台管理订单状态
router.post('/editstate',(req,res) => {
  let sql = `UPDATE the_order SET oState = ? WHERE md5 = ?`,
      v = req.body,
      parameter = tools.parameter(v,['oId'])

  if (parameter) {
    res.send(parameter)
    return
  }
  pool.query(sql,[v.oState,v.oId],(err,result) => {
    if (result.affectedRows > 0) {
      res.send({code: 200, data: null, msg: '修改状态成功'})
    } else {
      res.send({code: 401, data: null, msg: '修改失败,订单ID或订单状态错误'})
    }
  })
})
// 用户评论
router.get('/addevaluate',(req,res) => {
  let sql = 'UPDATE the_order SET evaluate = ? WHERE md5 = ?',
      v = req.query,
      parameter = tools.parameter(v,['evaluate','oId'])

  if (parameter) {
    res.send(parameter)
    return
  }
  new Promise(open => {
    let testSql = `SELECT evaluate, oState, createTime, deleteTime FROM the_order WHERE md5 = ?`
    pool.query(testSql,[v.oId],(err,result) => {
      let {evaluate, oState, createTime, deleteTime} = result[0]
      if (evaluate == null) 
        if (oState == 4 && createTime > 0 && deleteTime > 0) // 订单完成的id 待优化
          open()
        else {
          res.send({code: 401, data: null, msg: '请在订单完成后评论,评论失败'})
          return
        }
      else
        res.send({code: 401, data: null, msg: '已评价,请勿重复评价'})
    })
  }).then(() => {
    pool.query(sql,[v.evaluate,v.oId],(err,result) => {
      if (result.affectedRows > 0) {
        res.send({code: 200, data: null, msg: '评价成功'})
      } else {
        res.send({code: 401, data: null, msg: '评价出错'})
      }
    })
  })
})
// 获取用户订单列表
router.get('/userorder',(req,res) => {
  let sql = `SELECT ${arr.join(',')} FROM the_order WHERE openId = ? `,
      v = req.query,
      parameter = tools.parameter(v,['openId'])

  if (parameter) {
    res.send(parameter)
    return
  }

  pool.query(sql,[v.openId],(err,result) => {
    if (err) throw err
    if (result.length > 0) {
      res.send({code: 200, data: {total: result.length, data: result}, msg: '请求用户订单成功'})
    } else {
      res.send({code: 200, data: null, msg: '该用户暂无订单'})
    }
  })
})
// 根据手机号码或者订单号返回订单信息
router.get('/getorder',(req,res) => {
  let v = req.query,
      sql = `SELECT * FROM the_order WHERE oId = ? OR oTel = ?`,
      parameter = tools.parameter(v,['str'])

  if (parameter) {
    res.send(parameter)
    return
  }

  pool.query(sql,[v.str,v.str],(err,result) => {
    if (err) throw err
    res.send({code: 200, data: {total: result.length, data: result}, msg: '查询成功'})
  })
})
module.exports = router
