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
// let express = require('express');
// let bodyParser = require('body-parser');
// let treeify = require('treeify');
// let route = require('./router/index')
// let opn = require('opn') // 一个可以强制打开浏览器并跳转到指定 url 的插件
// let app = express();
// app.use(bodyParser.json());

// // 初始化路由
// routeInit(app);

// let server = app.listen(9090, function () {
//     let host = server.address().address
//     let port = server.address().port
//     let uri = 'http://localhost:' + port
//     console.log("Listening at: http://localhost:" + port)
//     // opn(uri)
// })


let express = require('express');
let bodyParser = require('body-parser');
let treeify = require('treeify');
let opn = require('opn') // 一个可以强制打开浏览器并跳转到指定 url 的插件
let app = express();

function startServer(router){
    app.use(bodyParser.json());
    router(app)
    let server = app.listen(9090, function () {
        let host = server.address().address
        let port = server.address().port
        let uri = 'http://localhost:' + port
        console.log("Listening at: http://localhost:" + port)
        // opn(uri)
    })

}

exports = module.exports = startServer
