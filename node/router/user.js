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
const os = require('os')

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
    let obj = JSON.parse(body)
    if (obj.session_key && obj.openid) {
      res.send({code: 200, data: obj, msg: '请求openId成功'})
    } else {
      res.send({code: -1, data: obj, msg: '请求出错'})
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

router.post('/login',(req,res) => {
  let network = os.networkInterfaces(),
      ip = network[Object.keys(network)[0]][1].address,
      v = req.body,
      arr = ["username","password"],
      parameter = tools.parameter(v,arr)

  if (parameter) {
    res.send(parameter)
    return
  }
  
  new Promise((open) => {
    let sql = `SELECT * FROM admin WHERE username = ? && password = ?`

    pool.query(sql,[v.username,v.password],(err,result) => {
      if (err) throw err
      if (result.length < 1) {
        res.send({code: 401, data: null, msg: '账号或密码错误'})
        return
      }
      if (result[0].login > 0) {
        res.send({code: 401, data: null, msg: '账号已在登录状态,请在原设备退出登录,再重新登陆'})
        return
      }
      open(result[0])
    })
  })
  .then(v => {
    let {id,username} = v
    let sql = `UPDATE admin SET ip = ?, login = ? WHERE id = ?;`

    pool.query(sql,[ip,1,id],(err,result) => {
      if (result.affectedRows > 0) {
        res.send({code: 200, data: {id, username}, msg: '登录成功'})
        return
      }
    })
  })
  
  // console.log(req.ip)
})

router.post('/out',(req,res) => {
  let v = req.body,
      arr = ["username","id"],
      parameter = tools.parameter(v,arr)

  if (parameter) {
  res.send(parameter)
  return
  }
  new Promise(open => {
    let sql = `SELECT * FROM admin WHERE id = ? && username = ?`
    pool.query(sql,[v.id,v.username],(err,result) => {
      if (result.length < 1) {
        res.send({code: 401, data: null, msg: '非法请求'})
        return
      }
      if (result[0].login < 1) {
        res.send({code: 401, data: null, msg: '账号未登录'})
        return
      }
      open(result[0])
    })
  })
  .then(v => {
    let sql = `UPDATE admin SET ip = ?, login = ? WHERE id = ?;`

    pool.query(sql,['',0,v.id],(err,result) => {
      if (result.affectedRows > 0) {
        res.send({code: 200, data: null, msg: '退出登录成功'})
      }
    })
  })
})

router.post('/addadmin',(req,res) => {
  let v = req.body,
      arr = ["username","password","adminId","adminName"],
      parameter = tools.parameter(v,arr)

  if (parameter) {
  res.send(parameter)
  return
  }
  new Promise(open => {
    let sql = `SELECT * FROM admin WHERE id = ? && username = ?`

    pool.query(sql,[v.adminId,v.adminName],(err,result) => {
      if (result.length < 1) {
        res.send({code: 401, data: null, msg: '非法添加'})
      }
      open()
    })
  })
  .then(() => {
    let sql = `INSERT INTO admin (id, username, password, ip, login) VALUES (NULL, ?, ?, NULL, 0);`

    pool.query(sql,[v.username,v.password],(err,result) => {
      if (result) {
        res.send({code: 200, data: null, msg: '添加管理用户成功'})
      } else {
        res.send({code: 401, data: null, msg: '用户已存在或服务错误'})
      }
    })
  })
})

router.post('/deladmin',(req,res) => {
  let v = req.body,
      arr = ["username","id"],
      parameter = tools.parameter(v,arr)

  if (parameter) {
  res.send(parameter)
  return
  }

  new Promise(open => {
    let sql = `SELECT * FROM admin WHERE id = ? && username = ?`
    pool.query(sql,[v.id,v.username],(err,result) => {
      if (result.length < 1) {
        res.send({code: 401, data: null, msg: '非法请求'})
        return
      }
      open(result[0].id)
    })
  })
  .then(v => {
    let sql = `DELETE FROM admin WHERE id = ?`
    pool.query(sql,[v],(err,result) => {
      if (result.affectedRows > 0)
        res.send({code: 200, data: null, msg: '删除成功'})
      else 
        res.send({code: 401, data: null, msg: '账号不存在'})
    })
  })
})

router.post('/forget', (req,res) => {
  let v = req.body,
      arr = ["id","username","oldpassword","newpassword"],
      parameter = tools.parameter(v,arr)

  if (parameter) {
  res.send(parameter)
  return
  }

  new Promise(open => {
    let sql = `SELECT * FROM admin WHERE id = ? && username = ? && password = ?`
    pool.query(sql,[v.id,v.username,v.oldpassword],(err,result) => {
      if (result.length < 1) {
        res.send({code: 401, data: null, msg: '非法请求'})
        return
      }
      open(v.id)
    })
  })
  .then(id => {
    let sql = `UPDATE admin SET password = ? WHERE id = ?`
    pool.query(sql,[v.newpassword,id],(err,result) => {
      if (result.affectedRows > 0) {
        res.send({code: 200, data: null, msg: '修改密码成功'})
      } else {
        res.send({code: 401, data: null, msg: '服务出错'})
      }
    })
  })
  
})
module.exports = router
