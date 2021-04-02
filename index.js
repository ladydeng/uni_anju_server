// uni-app服务器
const http = require('http');
const queryString = require('querystring');
const express = require("express");
const pool = require("./pool");
const { query } = require('./pool');

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
        params = queryString.parse(params);

        // 获取用户传过来的账号密码
        var account = params.userAccount;
        var password = params.userPassword

        // 5.处理路由
        if (path == "/login") {
            // console.log('处理登录请求', params);
            var sql1 = "SELECT * FROM t_user WHERE userAccount=? AND userPassword=?";
            pool.query(sql1, [account, password], (err, result, fields) => {
                if (err) throw err

                // console.log(fields)

                if (result.length == 0) {
                    //  没有查询到数据
                    res.end("400")
                } else {
                    res.end("200")
                }
            })
        }

        if (path == "/register") {
            console.log('处理注册请求', params);
            // 1.查询数据库是否已存在该用户
            var sql2 = "SELECT * FROM t_user WHERE userAccount=?";
            pool.query(sql2, [account], (err, result, fields) => {
                // 数据库中没有该用户
                if (result.length == 0) {
                    // 2.向数据库中插入数据
                    var sql3 = "INSERT INTO t_user SET userAccount=? , userPassword=?";
                    pool.query(sql3, [account, password], (err, result, fields) => {
                        // if (err) throw err
                        console.log("进入sql语句体")
                        if (err) {
                            throw err
                            res.end("500")
                        } else {
                            console.log("保存用户数据成功")
                            res.end("200")
                        }
                    })
                } else {
                    // 数据库中存在该用户
                    res.end("400")
                }
            });
        }
    } else if (method === 'post') {
        // 4.处理请求参数
        // 每次发送的数据
        req.on('data', (chuck) => {
            params += chuck;
        });
        // 每次数据发送完
        req.on('end', () => {
            params = queryString.parse(params);
            // 获取用户传过来的账号密码
            var account = params.userAccount;
            var password = params.userPassword

            // 5.处理路由
            if (path === '/login') {
                console.log('post处理登录请求', params);
                var sql4 = "SELECT * FROM t_user WHERE userAccount=? AND userPassword=?";
                pool.query(sql4, [account, password], (err, result, fields) => {
                    if (err) throw err

                    if (result.length == 0) {
                        //  没有查询到数据
                        res.end("400")
                    } else {
                        res.end("200")
                    }
                })
            } else if (path === '/register') {
                console.log('post处理注册请求', params);
                // 1.查询数据库是否已存在该用户
            var sql5 = "SELECT * FROM t_user WHERE userAccount=?";
            pool.query(sql5, [account], (err, result, fields) => {
                // 数据库中没有该用户
                if (result.length == 0) {
                    // 2.向数据库中插入数据
                    var sql6 = "INSERT INTO t_user SET userAccount=? , userPassword=?";
                    pool.query(sql6, [account, password], (err, result, fields) => {
                        // if (err) throw err
                        console.log("进入sql语句体")
                        if (err) {
                            throw err
                            res.end("500")
                        } else {
                            console.log("保存用户数据成功")
                            res.end("200")
                        }
                    })
                } else {
                    // 数据库中存在该用户
                    res.end("400")
                }
            });
            }
        });
    }
});
// 4.指定监听的端口号
server.listen(4000, () => {
    console.log("服务器运行成功")
});