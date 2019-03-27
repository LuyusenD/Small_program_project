/**
 * 
 * @authors Alones (7242586@qq.com)
 * @date    2019-03-14 14:29:02
 */

const mysql = require('mysql');

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'smallsql',
  connectionLimit: 10
});

module.exports = pool;
