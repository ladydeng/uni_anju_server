// uni-app服务器test
const express = require("express")
const app = express()

app.get("/login",(req,res) => {
     console.log("获取登录请求！")
     res.send({code:200,msg:'登录成功www ！'})
})

app.listen(4000,() => {
    console.log("你的服务器运行成功！")
})