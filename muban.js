// 登录注册服务器模板
const http = require('http');
const queryString = require('querystring');
const express = require("express");
// 数据库
const pool = require("./pool");

// 2.通过http模块创建服务对象
const server = http.createServer();
// 3.通过服务对象监听用户请求
server.on('request', (req, res) => {
    console.log('接收到请求');
    //后端设置允许跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    // 1.获取请求类型
    let method = req.method.toLowerCase();
    // 2.获取请求路径
    let url = req.url;
    let path = url.split('?')[0];
    // 3.获取请求参数
    let params = '';
    if (method === 'get') {
        // console.log("请求方法为get")
        // 4.处理请求参数
        params = url.split('?')[1];
        // 当页面发送get请求时，queryString模块会解析获取的路由携带的参数
        params = queryString.parse(params);

        // 获取用户传过来的账号密码
        var account = params.userAccount;
        var password = params.userPassword

        // 5.处理路由
        if (path == "/login") {
            // console.log('处理登录请求', params);
        }

        if (path == "/register") {
            console.log('处理注册请求', params);
        }
    } else if (method === 'post') {
        // 4.处理请求参数
        req.on('data', (chuck) => {
            params += chuck;
        });
        req.on('end', () => {
            params = queryString.parse(params);

            // 5.处理路由
            if (path === '/login') {
                console.log('post处理登录请求', params);
            } else if (path === '/register') {
                console.log('post处理注册请求', params);
            }
        });
    }
});
// 4.指定监听的端口号
server.listen(4000, () => {
    console.log("服务器运行成功")
});