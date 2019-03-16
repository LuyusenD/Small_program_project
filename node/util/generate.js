/**
 * 
 * @authors Alones (7242586@qq.com)
 * @date    2019-03-14 23:34:02
 */
'use strict'
const md5 = require('md5')

class tools {
  constructor () {
    this.date = new Date()
  }
  generateOid (v) {
    let d = this.date
    return `${v}${d.getFullYear()}${d.getMonth() < 10 ? '0' + (d.getMonth()+1) : d.getMonth()+1}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getTime()}`
  }
  generateTime () {
    let d = this.date
    return `${d.getTime()}`
  }
  parameter () {
    for (let i of arguments[1]) {
      if (!arguments[0][i]) {
        return {code: -1, data: null, msg: '缺少参数', get: arguments[1]}
      }
    }
    return false
  }
  md5 (v) {
    return md5(md5(md5(v))) + 'xn'
  }
}

exports = module.exports = new tools()