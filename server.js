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
let bodyParser = require('body-parser');
let treeify = require('treeify');
// ./不能忽略
let host = require('./web/host/index')
let opn = require('opn') // 一个可以强制打开浏览器并跳转到指定 url 的插件
let app = express();
app.use(bodyParser.json());

// 相当于拦截器
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置响应头属性值
    res.header("Content-Type", "application/json;charset=UTF-8"); //设置响应头属性值
    next();
});


app.use(function (request, response, next) {
    if (request.method === 'POST') {
        switch (request.url) {
            case '/host/get':
                console.log('调用了/host/get接口')
                host.getData(response)
                break
            case '/host/delete':
                console.log('调用了/host/delete接口')
                let ids = request.body.ids || null
                host.deleteDataById(ids, response)
                break
            case '/host/put':
                console.log('调用了/host/put接口')
                host.upDateData(request.body, response)
                break
            case '/host/post':
                console.log('调用了/host/post接口')
                host.addData(request.body, response)
                break
            default:
                console.log('有人瞎调用接口')
                let json = {
                    "data": [],
                    "msg": "不知道你要去哪",
                    "status": 200
                }
                response.send(JSON.stringify(json));
        }
    } else {
        response.send('get请求你就啥也看不到。')
    }

});


let server = app.listen(9090, function () {
    let host = server.address().address
    let port = server.address().port
    let uri = 'http://localhost:' + port
    console.log("Listening at: http://localhost:" + port)
    // opn(uri)
})
