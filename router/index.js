// ./不能忽略
let host = require('../web/host/index')

function route(app){
    // 相当于拦截器
    app.all("*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); //设置允许客户端跨域请求
        res.header("Content-Type", "application/json;charset=UTF-8"); //设置响应头数据类型
        next();
    });

    /*
        路由块
    */

    // host路由
    app.get('/host/delete/:ids', function (request, response, next) {
        let host_ids = request.params.ids || null
        host.deleteDataById(host_ids, response, next)
    })

    app.post('/host/get', function (request, response, next) {
        let host_ids = request.body.host_ids || null
        host.getData(host_ids, response, next)
    })

    app.post('/host/delete', function (request, response, next) {
        let idsArr = request.body || []
        host.deleteDataBatch(idsArr, response, next)
    })

    app.post('/host/put', function (request, response, next) {
        host.upDateData(request.body, response, next)
    })

    app.post('/host/post', function (request, response, next) {
        host.addData(request.body, response, next)
    })


    // 


}

exports = module.exports = route