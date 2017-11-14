/* 原生起 */

// let http = require("http"); 

// http.createServer(function(request, response) { 

//     response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*"}); 

//     let json = {
//         "name": "大熊",
//         "sex": "男",
//         "age": 20
//     }

//     response.write(JSON.stringify(json)); 

//     response.end(); 

// }).listen(9090);


/* express 框架*/

let express = require('express');
let opn = require('opn') // 一个可以强制打开浏览器并跳转到指定 url 的插件
let app = express();

// 相当于拦截器
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置响应头属性值
    res.header("Content-Type", "application/json;charset=UTF-8"); //设置响应头属性值
    next();
});


app.use(function (request, response, next) {

    let json = {
        "data": [],
        "msg": "",
        "status": 200
    }

    if (request.method === 'POST') {
        switch (request.url) {
            case '/':
                json.msg = '首页'
                response.send(JSON.stringify(json));
                break
            case '/about':
                json.msg = '关于'
                response.send(JSON.stringify(json));
                break
            default:
                json.msg = '不知道你要去哪'
                response.send(JSON.stringify(json));
        }
    } else {
        response.send('get请求你啥也看不到。')
    }

});


let server = app.listen(9090, function () {
    let host = server.address().address
    let port = server.address().port
    let uri = 'http://localhost:' + port
    console.log("Listening at: http://localhost:" + port)
    opn(uri)
})
