/**
 * Created by zengwei on 2017/11/15
 */

let mysql = require('mysql');
let async = require('async');
let databaseData = {
    host: 'localhost',
    port: '3306',
    database: 'beeeyehced',
    // database: 'zengwei',
    user: 'root',
    password: '159357',
}

let { host, port, database, user, password } = databaseData


// 普通增删改查操作
function connectDatabase(sql, dataArr, successFn, errorFn) {

    let connection = mysql.createConnection({
        host: host,
        port: port,
        database: database,
        user: user,
        password: password,
    });

    connection.connect();

    connection.query(sql, dataArr, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            // console.log(errorFn)
            if (errorFn) {
                errorFn()
            }
            return;
        }

        if (successFn) {
            successFn(result)
        }

    });

    connection.end();

}

// 开启事务操作

function connectDatabaseTransaction(taskArr, successFn, errorFn) {

    let connection = mysql.createConnection({
        host: host,
        port: port,
        database: database,
        user: user,
        password: password,
    });

    connection.connect()

    connection.beginTransaction(function (err) {
        if (err) {
            console.log(err);
            return;
        }

        let taskData = []

        taskArr.forEach((o, i) => {
            // console.log(o.sql)
            let task = function (callback) {
                var query = connection.query(o.sql, o.dataArr, function (err, result) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                        return;
                    }
                    // console.log('第' + (i + 1)+ '次成功!')
                    callback(null, result);
                    // console.log(query.sql)
                    // console.log(result)
                })
            }
            taskData.push(task)
        })

        // var task1 = function (callback) {
        //     connection.query(`UPDATE user SET money = money - 100 where name = 'zhangsan'`, function (err, result) {
        //         if (err) {
        //             console.log(err);
        //             callback(err, null);
        //             return;
        //         }
        //         console.log('第1次成功!');
        //         callback(null, result);
        //     })
        // }
        // var task2 = function (callback) {
        //     connection.query(`UPDATE user SET money = money + 100 where name = lisi'`, function (err, result) {
        //         if (err) {
        //             console.log(err);
        //             callback(err, null);
        //             return;
        //         }
        //         console.log('第2次成功!');
        //         callback(null, result);
        //     })
        // }

        async.series(taskData, function (err, result) {
            if (err) {
                console.log(err);
                //回滚
                connection.rollback(function () {
                    console.log('出现错误,回滚!');
                    //释放资源
                    connection.end();
                });
                return;
            }
            let flag = true
            result.forEach(o => {
                if (o.affectedRows === 0) {
                    flag = false
                }
            })
            if (!flag) {
                connection.rollback(function () {
                    console.log('出现错误,回滚!');
                    //释放资源
                    connection.end();
                });
                return;
            }
            //提交
            connection.commit(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log('成功,提交!');
                //释放资源
                connection.end();
            });
        })
    });

}


exports = module.exports = {
    connectDatabase,
    connectDatabaseTransaction
}