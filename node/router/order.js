
'use strict'

const express = require('express')
const router = express.Router()
const pool = require('../pool.js')
const md5 = require('md5')

router.get('/allorder', (req, res) => {
  let sql = `SELECT * FROM the_order`
  
  pool.query(sql,[],(err,result)=>{
    console.log(result);
    res.send('123aa')
  })
})

module.exports = router