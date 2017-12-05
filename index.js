/**
 * @author zengwei
 */


let router = require('./router/index')
let startServer = require('./server/index')
var fs = require("fs");

startServer(router)

// buf = new Buffer(256);
// len = buf.write("www.runoob.com");

// console.log("写入字节数 : " + len);

// var buf = new Buffer('www.runoob.com');
// var json = buf.toJSON(buf);

// console.log(json);

// let { connectDatabaseTransaction } = require('./dao/index')

// `UPDATE user SET money = money - 100 where name = 'zhangsan'`
// `UPDATE user SET money = money + 100 where name = lisi'
// let data = [
//     { sql: `UPDATE user SET money = money - ? where id = ?`, dataArr: [100, 1] },
//     { sql: `UPDATE user SET money = money + ? where id = ?`, dataArr: [100, 3] }
// ]

// connectDatabaseTransaction(data)


// var express = require('express');
// var fork = require('child_process').fork;
// var app = express();
// app.get('/', function (req, res) {
//     var worker = fork('./work_fibo.js') //创建一个工作进程
//     worker.on('message', function (m) {//接收工作进程计算结果
//         if ('object' === typeof m && m.type === 'fibo') {
//             worker.kill();//发送杀死进程的信号
//             res.send(m.result.toString());//将结果返回客户端
//         }
//     });
//     console.log(req.query)
//     worker.send({ type: 'fibo', num: ~~req.query.n || 1 });
//     //发送给工作进程计算fibo的数量
// });
// app.listen(8124);

// var express = require('express');
// var spawn = require('child_process').spawn;
// var app = express();
// var spawn_worker = function (n, end) {//定义工作函数
//     end()
//     // end(89)
//     // return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
//     // var fibo = function fibo(n) {
//     //     return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
//     // }
//     // end(fibo(n));
// }
// var spawn_end = function (result) {//定义工作函数结束的回调函数参数
//     console.log(result);
//     process.exit();
// }
// app.get('/', function (req, res) {
//     var n = ~~req.query.n || 1;
//     //拼接-e后面的参数
//     var spawn_cmd = '(' + spawn_worker.toString() + '(' + n + ',' + spawn_end.toString() + '));'
//     // console.log(spawn_cmd);//注意这个打印结果
//     var worker = spawn('node', ['-e', spawn_cmd]);//执行node -e "xxx"命令
//     var fibo_res = '';
//     worker.stdout.on('data', function (data) { //接收工作函数的返回
//         // console.log(data.toString())
//         console.log('onData事件')
//         fibo_res += data.toString();
//     });
//     worker.on('close', function (code) {//将结果响应给客户端
//         console.log('onClose事件')
//         console.log(code)
//         res.send(fibo_res);
//     });
// });
// app.listen(8124);