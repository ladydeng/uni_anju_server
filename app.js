// uni-app服务器test
const pool = require("./pool")
const queryString = require("querystring")
const express = require("express")
const app = express()


app.get("/login", (req, res) => {
    console.log("获取登录请求！")
    var params = req.url.split("?")[1]
    //  解析url中携带的参数
    params = queryString.parse(params)
    console.log(params)

    // 根据用户账户查询数据库
    var sql = "SELECT * FROM t_user WHERE userAccount=? AND userPassword=?";
    pool.query(sql, [params.userAccount, params.userPassword], (err, result, fields) => {
        if(result.length == 0){
            res.send({ code: 400, msg: '用户名或密码错误!'})
        }else{
            res.send({ code: 200, msg: '登录成功！' })
        }
    })
})

app.listen(4000, () => {
    console.log("你的服务器运行成功！")
})