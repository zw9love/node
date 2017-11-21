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