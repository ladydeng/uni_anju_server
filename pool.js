const mysql = require("mysql")

// 创建连接池对象
var pool = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'anju'
})

// 导出连接池对象
module.exports = pool