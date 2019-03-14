/**
 * 
 * @authors Alones (7242586@qq.com)
 * @date    2019-03-14 23:34:02
 */
'use strict'

class tools {
  generateOid (v) {
    let d = new Date()
    return `${v}${d.getFullYear()}${d.getMonth() < 10 ? '0' + (d.getMonth()+1) : d.getMonth()+1}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getTime()}`
  }
  time () {
    let d = new Date()
    return `${d.getTime()}`
  }
}

exports = module.exports = new tools()