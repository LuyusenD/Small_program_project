/**
 * 
 * @authors Alones (7242586@qq.com)
 * @date    2019-03-14 23:34:02
 */
'use strict'

class tools {
  constructor () {
    this.date = new Date()
  }
  generateOid (v) {
    let d = this.date
    return `${v}${d.getFullYear()}${d.getMonth() < 10 ? '0' + (d.getMonth()+1) : d.getMonth()+1}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getTime()}`
  }
  time () {
    let d = this.date
    return `${d.getTime()}`
  }
}

exports = module.exports = new tools()